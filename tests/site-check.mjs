import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const htmlFiles = readdirSync(root).filter((name) => name.endsWith(".html"));
const widths = [1440, 1280, 1024, 768, 480, 375, 320];
const failures = [];

const localReferencePattern = /(?:href|src)="([^"]+)"/g;
for (const htmlFile of htmlFiles) {
  const html = readFileSync(join(root, htmlFile), "utf8");
  if ((html.match(/<h1\b/g) || []).length !== 1) failures.push(`${htmlFile}: deve possuir exatamente um h1`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) failures.push(`${htmlFile}: IDs duplicados: ${[...new Set(duplicateIds)].join(", ")}`);
  for (const [, reference] of html.matchAll(localReferencePattern)) {
    if (/^(?:https?:|mailto:|tel:)/.test(reference)) continue;
    if (reference.startsWith("#")) {
      if (!html.includes(`id="${reference.slice(1)}"`)) failures.push(`${htmlFile}: âncora ausente ${reference}`);
      continue;
    }
    const [pathname, fragment] = reference.split("#");
    const targetPath = resolve(root, pathname);
    try {
      if (!statSync(targetPath).isFile()) failures.push(`${htmlFile}: destino ausente ${reference}`);
      else if (fragment && pathname.endsWith(".html")) {
        const targetHtml = readFileSync(targetPath, "utf8");
        if (!targetHtml.includes(`id="${fragment}"`)) failures.push(`${htmlFile}: âncora ausente ${reference}`);
      }
    } catch {
      failures.push(`${htmlFile}: destino ausente ${reference}`);
    }
  }
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

const server = createServer((request, response) => {
  const requested = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  if (requested === "/favicon.ico") {
    response.writeHead(204).end();
    return;
  }
  const relative = requested === "/" ? "index.html" : requested.replace(/^\//, "");
  const filePath = normalize(resolve(root, relative));
  if (!filePath.startsWith(root)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const body = readFileSync(filePath);
    response.writeHead(200, { "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404).end();
  }
});

await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
const sitePort = server.address().port;
const browserPort = 9333;
const profile = mkdtempSync(join(tmpdir(), "printgrafik-edge-"));
const screenshotDir = mkdtempSync(join(tmpdir(), "printgrafik-shots-"));
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = spawn(edge, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  `--remote-debugging-port=${browserPort}`,
  `--user-data-dir=${profile}`,
  "about:blank"
], { stdio: "ignore" });

const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
let target;
for (let attempt = 0; attempt < 50; attempt += 1) {
  try {
    const response = await fetch(`http://127.0.0.1:${browserPort}/json/new?http://127.0.0.1:${sitePort}/index.html`, { method: "PUT" });
    if (response.ok) {
      target = await response.json();
      break;
    }
  } catch {}
  await delay(100);
}

if (!target) {
  failures.push("Não foi possível iniciar o navegador headless");
} else {
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolveOpen, rejectOpen) => {
    socket.addEventListener("open", resolveOpen, { once: true });
    socket.addEventListener("error", rejectOpen, { once: true });
  });

  let commandId = 0;
  const pending = new Map();
  const consoleErrors = [];
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve: resolveCommand, reject: rejectCommand } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) rejectCommand(new Error(message.error.message));
      else resolveCommand(message.result);
    }
    if (message.method === "Runtime.exceptionThrown") consoleErrors.push(message.params.exceptionDetails.text);
    if (message.method === "Log.entryAdded" && message.params.entry.level === "error") consoleErrors.push(message.params.entry.text);
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") consoleErrors.push("console.error");
  });

  const send = (method, params = {}) => new Promise((resolveCommand, rejectCommand) => {
    const id = ++commandId;
    pending.set(id, { resolve: resolveCommand, reject: rejectCommand });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");

  for (const width of widths) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width <= 480 });
    await send("Page.navigate", { url: `http://127.0.0.1:${sitePort}/index.html` });
    await delay(550);
    if (width === 1440) {
      const initialCounters = await send("Runtime.evaluate", {
        returnByValue: true,
        expression: `[...document.querySelectorAll('.pg-stat__value')].map((item) => item.textContent.trim())`
      });
      if (!initialCounters.result.value.every((value) => value.includes("0"))) {
        failures.push("1440px: indicadores não iniciaram em zero antes da rolagem");
      }
      await send("Runtime.evaluate", {
        expression: "document.querySelector('.pg-stats').scrollIntoView({ block: 'center' })"
      });
      await delay(300);
    }
    await send("Runtime.evaluate", {
      awaitPromise: true,
      expression: `(async () => {
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 70));
        }
        window.scrollTo(0, 0);
        await new Promise((resolve) => setTimeout(resolve, 150));
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      })()`
    });
    if (width === 1440 || width === 375) await delay(1300);
    const evaluation = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        h1Count: document.querySelectorAll('h1').length,
        brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
        menuButtonVisible: getComputedStyle(document.querySelector('[data-menu-toggle]')).display !== 'none',
        finalCtaButtons: document.querySelectorAll('.pg-cta .pg-button').length
      }))()`
    });
    const result = evaluation.result.value;
    if (result.scrollWidth > result.clientWidth) failures.push(`${width}px: rolagem horizontal (${result.scrollWidth} > ${result.clientWidth})`);
    if (result.h1Count !== 1) failures.push(`${width}px: quantidade de h1 inválida`);
    if (result.brokenImages.length) failures.push(`${width}px: imagens quebradas: ${result.brokenImages.join(", ")}`);
    if (result.finalCtaButtons !== 0) failures.push(`${width}px: o CTA final da Home não deve possuir botões`);
    if (width <= 768 && !result.menuButtonVisible) failures.push(`${width}px: botão do menu móvel não está visível`);
    if (width === 375) {
      const menuResult = await send("Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const button = document.querySelector('[data-menu-toggle]');
          const menu = document.querySelector('[data-menu]');
          button.click();
          const opened = button.getAttribute('aria-expanded') === 'true' && menu.dataset.open === 'true';
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
          return { opened, closed: button.getAttribute('aria-expanded') === 'false' && menu.dataset.open === 'false', focused: document.activeElement === button };
        })()`
      });
      const menu = menuResult.result.value;
      if (!menu.opened || !menu.closed || !menu.focused) failures.push("375px: interação acessível do menu móvel falhou");
    }
    if (width === 1440) {
      const finalCounters = await send("Runtime.evaluate", {
        returnByValue: true,
        expression: `[...document.querySelectorAll('.pg-stat__value')].map((item) => item.textContent.trim())`
      });
      const expectedCounters = ["26", "2.000 m²", "+10", "500+"];
      if (JSON.stringify(finalCounters.result.value) !== JSON.stringify(expectedCounters)) {
        failures.push(`1440px: contadores não chegaram aos valores finais (${finalCounters.result.value.join(", ")})`);
      }
    }
    if (width === 1440 || width === 375) {
      await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
      await delay(100);
      const metrics = await send("Page.getLayoutMetrics");
      const capture = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: {
          x: 0,
          y: 0,
          width: metrics.cssContentSize.width,
          height: metrics.cssContentSize.height,
          scale: 1
        }
      });
      writeFileSync(join(screenshotDir, `home-${width}.png`), Buffer.from(capture.data, "base64"));
    }
  }

  for (const width of widths) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width <= 480 });
    await send("Page.navigate", { url: `http://127.0.0.1:${sitePort}/empresa.html` });
    await delay(550);
    await send("Runtime.evaluate", {
      awaitPromise: true,
      expression: `(async () => {
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 60));
        }
        window.scrollTo(0, 0);
        await new Promise((resolve) => setTimeout(resolve, 120));
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      })()`
    });
    const evaluation = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        h1Count: document.querySelectorAll('h1').length,
        brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
        menuButtonVisible: getComputedStyle(document.querySelector('[data-menu-toggle]')).display !== 'none',
        activePage: document.querySelector('.pg-nav__link[aria-current="page"]')?.getAttribute('href'),
        finalCtaButtons: document.querySelectorAll('.pg-company-cta .pg-button').length,
        hiddenReveals: [...document.querySelectorAll('.pg-reveal:not(.pg-reveal--visible)')].map((item) => item.className)
      }))()`
    });
    const result = evaluation.result.value;
    if (result.scrollWidth > result.clientWidth) failures.push(`empresa ${width}px: rolagem horizontal (${result.scrollWidth} > ${result.clientWidth})`);
    if (result.h1Count !== 1) failures.push(`empresa ${width}px: quantidade de h1 inválida`);
    if (result.brokenImages.length) failures.push(`empresa ${width}px: imagens quebradas: ${result.brokenImages.join(", ")}`);
    if (result.activePage !== "empresa.html") failures.push(`empresa ${width}px: estado ativo da navegação incorreto`);
    if (result.finalCtaButtons !== 0) failures.push(`empresa ${width}px: o CTA final não deve possuir botões`);
    if (result.hiddenReveals.length !== 0) failures.push(`empresa ${width}px: elementos animados não revelados (${result.hiddenReveals.join(" | ")})`);
    if (width <= 768 && !result.menuButtonVisible) failures.push(`empresa ${width}px: botão do menu móvel não está visível`);
    if (width === 375) {
      const menuResult = await send("Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const button = document.querySelector('[data-menu-toggle]');
          const menu = document.querySelector('[data-menu]');
          button.click();
          const opened = button.getAttribute('aria-expanded') === 'true' && menu.dataset.open === 'true';
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
          return { opened, closed: button.getAttribute('aria-expanded') === 'false' && menu.dataset.open === 'false', focused: document.activeElement === button };
        })()`
      });
      const menu = menuResult.result.value;
      if (!menu.opened || !menu.closed || !menu.focused) failures.push("empresa 375px: interação acessível do menu móvel falhou");
    }
    if (width === 1440 || width === 375) {
      const metrics = await send("Page.getLayoutMetrics");
      const capture = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: {
          x: 0,
          y: 0,
          width: metrics.cssContentSize.width,
          height: metrics.cssContentSize.height,
          scale: 1
        }
      });
      writeFileSync(join(screenshotDir, `empresa-${width}.png`), Buffer.from(capture.data, "base64"));
    }
  }

  for (const width of widths) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width <= 480 });
    await send("Page.navigate", { url: `http://127.0.0.1:${sitePort}/produtos.html` });
    await delay(550);
    await send("Runtime.evaluate", {
      awaitPromise: true,
      expression: `(async () => {
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 60));
        }
        window.scrollTo(0, 0);
        await new Promise((resolve) => setTimeout(resolve, 120));
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      })()`
    });
    const evaluation = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        h1Count: document.querySelectorAll('h1').length,
        brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
        menuButtonVisible: getComputedStyle(document.querySelector('[data-menu-toggle]')).display !== 'none',
        activePage: document.querySelector('.pg-nav__link[aria-current="page"]')?.getAttribute('href'),
        productCards: document.querySelectorAll('.pg-product-detail').length,
        contactFallbacks: [...document.querySelectorAll('.pg-product-detail [data-smart-contact]')].every((link) => link.getAttribute('href') === 'contato.html'),
        finalCtaButtons: document.querySelectorAll('.pg-products-cta .pg-button').length,
        hiddenReveals: [...document.querySelectorAll('.pg-reveal:not(.pg-reveal--visible)')].map((item) => item.className)
      }))()`
    });
    const result = evaluation.result.value;
    if (result.scrollWidth > result.clientWidth) failures.push(`produtos ${width}px: rolagem horizontal (${result.scrollWidth} > ${result.clientWidth})`);
    if (result.h1Count !== 1) failures.push(`produtos ${width}px: quantidade de h1 inválida`);
    if (result.brokenImages.length) failures.push(`produtos ${width}px: imagens quebradas: ${result.brokenImages.join(", ")}`);
    if (result.activePage !== "produtos.html") failures.push(`produtos ${width}px: estado ativo da navegação incorreto`);
    if (result.productCards !== 5) failures.push(`produtos ${width}px: quantidade de categorias inválida (${result.productCards})`);
    if (!result.contactFallbacks) failures.push(`produtos ${width}px: fallback de contato incorreto`);
    if (result.finalCtaButtons !== 0) failures.push(`produtos ${width}px: o CTA final não deve possuir botões`);
    if (result.hiddenReveals.length !== 0) failures.push(`produtos ${width}px: elementos animados não revelados (${result.hiddenReveals.join(" | ")})`);
    if (width <= 768 && !result.menuButtonVisible) failures.push(`produtos ${width}px: botão do menu móvel não está visível`);
    if (width === 375) {
      const menuResult = await send("Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const button = document.querySelector('[data-menu-toggle]');
          const menu = document.querySelector('[data-menu]');
          button.click();
          const opened = button.getAttribute('aria-expanded') === 'true' && menu.dataset.open === 'true';
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
          return { opened, closed: button.getAttribute('aria-expanded') === 'false' && menu.dataset.open === 'false', focused: document.activeElement === button };
        })()`
      });
      const menu = menuResult.result.value;
      if (!menu.opened || !menu.closed || !menu.focused) failures.push("produtos 375px: interação acessível do menu móvel falhou");
    }
    if (width === 1440 || width === 375) {
      const metrics = await send("Page.getLayoutMetrics");
      const capture = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: {
          x: 0,
          y: 0,
          width: metrics.cssContentSize.width,
          height: metrics.cssContentSize.height,
          scale: 1
        }
      });
      writeFileSync(join(screenshotDir, `produtos-${width}.png`), Buffer.from(capture.data, "base64"));
    }
  }

  if (consoleErrors.length) failures.push(`Console do navegador: ${consoleErrors.join(" | ")}`);
  socket.close();
}

browser.kill();
server.close();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`OK: ${htmlFiles.length} páginas, ${widths.length} larguras, links, imagens, menu e console.`);
  console.log(`Capturas: ${screenshotDir}`);
}
