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
  if (!html.includes('class="pg-logo-link pg-logo-link--tagged"') || !html.includes('<span class="pg-logo-tagline">Indústria Gráfica</span>')) failures.push(`${htmlFile}: identificação Indústria Gráfica ausente no cabeçalho`);
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
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4"
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
        heroImage: document.querySelector('.pg-hero__image')?.currentSrc,
        menuButtonVisible: getComputedStyle(document.querySelector('[data-menu-toggle]')).display !== 'none',
        finalCtaButtons: document.querySelectorAll('.pg-cta .pg-button').length,
        displayImage: document.querySelector('.pg-product-card:first-child .pg-product-card__image')?.getAttribute('src'),
        blisterImage: document.querySelector('.pg-product-card:nth-child(2) .pg-product-card__image')?.getAttribute('src'),
        personalizedImage: document.querySelector('.pg-product-card:nth-child(3) .pg-product-card__image')?.getAttribute('src'),
        blankImage: document.querySelector('.pg-product-card:nth-child(4) .pg-product-card__image')?.getAttribute('src'),
        blisterFit: getComputedStyle(document.querySelector('.pg-product-card:nth-child(2) .pg-product-card__image')).objectFit,
        realStructurePhotos: document.querySelectorAll('.pg-gallery__image[src^="assets/estrutura/"]').length,
        structurePlaceholders: [...document.querySelectorAll('.pg-gallery__image[src^="assets/placeholders/estrutura-"]')].map((img) => img.getAttribute('src'))
      }))()`
    });
    const result = evaluation.result.value;
    if (result.scrollWidth > result.clientWidth) failures.push(`${width}px: rolagem horizontal (${result.scrollWidth} > ${result.clientWidth})`);
    if (result.h1Count !== 1) failures.push(`${width}px: quantidade de h1 inválida`);
    if (result.brokenImages.length) failures.push(`${width}px: imagens quebradas: ${result.brokenImages.join(", ")}`);
    const expectedHeroImage = width <= 820 ? "hero-impressao-mobile.jpg" : "hero-impressao-printgrafik.jpg";
    if (!result.heroImage?.endsWith(expectedHeroImage)) failures.push(`${width}px: imagem incorreta no hero da Home (${result.heroImage})`);
    if (result.finalCtaButtons !== 1) failures.push(`${width}px: somente o CTA final da Home deve possuir um botão`);
    if (result.displayImage !== "assets/produtos/caixas-display.jpeg" || result.blisterImage !== "assets/produtos/cartela-blister.jpeg" || result.blisterFit !== "contain") failures.push(`${width}px: fotos reais de produtos incorretas na Home`);
    if (result.personalizedImage !== "assets/produtos/embalagens-personalizadas.png" || result.blankImage !== "assets/produtos/embalagem-em-branco.jpeg") failures.push(`${width}px: fotos de embalagens personalizadas ou em branco incorretas na Home`);
    if (result.realStructurePhotos !== 5) failures.push(`${width}px: a galeria da Home deve possuir cinco fotografias reais da estrutura`);
    if (result.structurePlaceholders.length !== 0) failures.push(`${width}px: a galeria da Home não deve manter placeholders de estrutura`);
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
        locationVisible: !document.querySelector('[data-map-container]')?.hidden,
        mapSource: document.querySelector('[data-map-embed]')?.getAttribute('src'),
        phoneHref: document.querySelector('.pg-company-location [data-contact-item="phone"] a')?.getAttribute('href'),
        emailHref: document.querySelector('.pg-company-location [data-contact-item="email"] a')?.getAttribute('href'),
        instagramHref: document.querySelector('[data-social="instagram"]')?.getAttribute('href'),
        repeatedInstitutionalNumbers: document.querySelectorAll('[data-institution="historyYears"], [data-institution="factoryArea"], [data-institution="services"], [data-institution="clients"]').length,
        hiddenReveals: [...document.querySelectorAll('.pg-reveal:not(.pg-reveal--visible)')].map((item) => item.className)
      }))()`
    });
    const result = evaluation.result.value;
    if (result.scrollWidth > result.clientWidth) failures.push(`empresa ${width}px: rolagem horizontal (${result.scrollWidth} > ${result.clientWidth})`);
    if (result.h1Count !== 1) failures.push(`empresa ${width}px: quantidade de h1 inválida`);
    if (result.brokenImages.length) failures.push(`empresa ${width}px: imagens quebradas: ${result.brokenImages.join(", ")}`);
    if (result.activePage !== "empresa.html") failures.push(`empresa ${width}px: estado ativo da navegação incorreto`);
    if (result.finalCtaButtons !== 0) failures.push(`empresa ${width}px: o CTA final não deve possuir botões`);
    if (!result.locationVisible || !result.mapSource?.startsWith("https://www.google.com/maps?")) failures.push(`empresa ${width}px: mapa da localização não foi configurado`);
    if (result.phoneHref !== "tel:19991440661") failures.push(`empresa ${width}px: telefone oficial incorreto`);
    if (result.emailHref !== "mailto:printgrafik@printgrafik.com.br") failures.push(`empresa ${width}px: e-mail oficial incorreto`);
    if (result.instagramHref !== "https://www.instagram.com/printgrafik_industriagrafica/") failures.push(`empresa ${width}px: Instagram oficial incorreto`);
    if (result.repeatedInstitutionalNumbers !== 0) failures.push(`empresa ${width}px: resumo numérico institucional repetido fora da Home`);
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
        displayImage: document.querySelector('#caixas-display .pg-product-detail__image')?.getAttribute('src'),
        blisterImage: document.querySelector('#cartelas-blister .pg-product-detail__image')?.getAttribute('src'),
        personalizedImage: document.querySelector('#embalagens-personalizadas .pg-product-detail__image')?.getAttribute('src'),
        blankImage: document.querySelector('#embalagens-em-branco .pg-product-detail__image')?.getAttribute('src'),
        flapImage: document.querySelector('#solapas .pg-product-detail__image')?.getAttribute('src'),
        contactFallbacks: [...document.querySelectorAll('.pg-product-detail [data-smart-contact]')].every((link) => link.getAttribute('href') === 'contato.html'),
        finalCtaButtons: document.querySelectorAll('.pg-products-cta .pg-button').length,
        videoPresent: Boolean(document.querySelector('.pg-product-hero-media .pg-product-hero-video')),
        videoSource: document.querySelector('.pg-product-hero-video source')?.getAttribute('src'),
        videoPoster: document.querySelector('.pg-product-hero-video')?.getAttribute('poster'),
        videoControls: document.querySelector('.pg-product-hero-video')?.controls,
        videoAutoplay: document.querySelector('.pg-product-hero-video')?.autoplay,
        videoMuted: document.querySelector('.pg-product-hero-video')?.muted,
        videoPaused: document.querySelector('.pg-product-hero-video')?.paused,
        videoError: document.querySelector('.pg-product-hero-video')?.error?.code ?? null,
        videoPlaceholder: Boolean(document.querySelector('.pg-product-hero-media .pg-video-placeholder')),
        hiddenReveals: [...document.querySelectorAll('.pg-reveal:not(.pg-reveal--visible)')].map((item) => item.className)
      }))()`
    });
    const result = evaluation.result.value;
    if (result.scrollWidth > result.clientWidth) failures.push(`produtos ${width}px: rolagem horizontal (${result.scrollWidth} > ${result.clientWidth})`);
    if (result.h1Count !== 1) failures.push(`produtos ${width}px: quantidade de h1 inválida`);
    if (result.brokenImages.length) failures.push(`produtos ${width}px: imagens quebradas: ${result.brokenImages.join(", ")}`);
    if (result.activePage !== "produtos.html") failures.push(`produtos ${width}px: estado ativo da navegação incorreto`);
    if (result.productCards !== 5) failures.push(`produtos ${width}px: quantidade de categorias inválida (${result.productCards})`);
    if (result.displayImage !== "assets/produtos/caixas-display.jpeg" || result.blisterImage !== "assets/produtos/cartela-blister.jpeg") failures.push(`produtos ${width}px: fotos reais de caixas display ou cartelas blister incorretas`);
    if (result.personalizedImage !== "assets/produtos/embalagens-personalizadas.png" || result.blankImage !== "assets/produtos/embalagem-em-branco.jpeg") failures.push(`produtos ${width}px: fotos de embalagens personalizadas ou em branco incorretas`);
    if (result.flapImage !== "assets/produtos/solapa.jpeg") failures.push(`produtos ${width}px: foto real da solapa incorreta`);
    if (!result.contactFallbacks) failures.push(`produtos ${width}px: fallback de contato incorreto`);
    if (result.finalCtaButtons !== 0) failures.push(`produtos ${width}px: o CTA final não deve possuir botões`);
    if (!result.videoPresent || result.videoSource !== "assets/estrutura/WhatsApp Video 2026-08-07 at 09.52.14.mp4") failures.push(`produtos ${width}px: vídeo real do hero ausente ou com caminho incorreto`);
    if (result.videoPoster !== "assets/estrutura/impressora-offset-man-roland.jpg" || !result.videoControls || !result.videoAutoplay || !result.videoMuted) failures.push(`produtos ${width}px: configuração do vídeo ou do thumbnail incorreta`);
    if (result.videoPaused) failures.push(`produtos ${width}px: autoplay do vídeo não iniciou`);
    if (result.videoError !== null) failures.push(`produtos ${width}px: navegador reportou erro ${result.videoError} ao carregar o vídeo`);
    if (result.videoPlaceholder) failures.push(`produtos ${width}px: placeholder antigo do vídeo ainda está visível`);
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

  for (const width of widths) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width <= 480 });
    await send("Page.navigate", { url: `http://127.0.0.1:${sitePort}/estrutura.html` });
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
      expression: `(() => {
        const photos = [...document.querySelectorAll('.pg-structure-card img, .pg-structure-gallery__item img')];
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          h1Count: document.querySelectorAll('h1').length,
          brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
          menuButtonVisible: getComputedStyle(document.querySelector('[data-menu-toggle]')).display !== 'none',
          activePage: document.querySelector('.pg-nav__link[aria-current="page"]')?.getAttribute('href'),
          processCards: document.querySelectorAll('.pg-structure-card').length,
          galleryItems: document.querySelectorAll('.pg-structure-gallery__item').length,
          followupItems: document.querySelectorAll('.pg-structure-checklist li').length,
          productionSteps: document.querySelectorAll('.pg-structure-step').length,
          qualityItems: document.querySelectorAll('.pg-structure-quality__panel li').length,
          highlights: document.querySelectorAll('.pg-structure-highlight').length,
          factoryAreaMentions: document.querySelectorAll('[data-institution="factoryArea"]').length,
          repeatedInstitutionalNumbers: document.querySelectorAll('[data-institution="historyYears"], [data-institution="services"], [data-institution="clients"]').length,
          uniquePhotos: new Set(photos.map((img) => img.getAttribute('src'))).size,
          allPhotosLazy: photos.every((img) => img.loading === 'lazy'),
          pageTitle: document.querySelector('h1')?.textContent.trim(),
          heroSource: document.querySelector('.pg-structure-hero__image')?.getAttribute('src'),
          heroLoading: document.querySelector('.pg-structure-hero__image')?.getAttribute('loading'),
          heroPriority: document.querySelector('.pg-structure-hero__image')?.getAttribute('fetchpriority'),
          heroButtons: document.querySelectorAll('.pg-structure-hero__actions .pg-button').length,
          finalCtaButtons: document.querySelectorAll('.pg-structure-cta .pg-button').length,
          videos: [...document.querySelectorAll('.pg-structure-video-card video')].map((video) => ({
            source: video.querySelector('source')?.getAttribute('src'),
            poster: video.getAttribute('poster'),
            controls: video.controls,
            autoplay: video.autoplay,
            preload: video.preload,
            caption: video.closest('.pg-structure-video-card')?.querySelector('figcaption')?.textContent.trim()
          })),
          contactFallbacks: [...document.querySelectorAll('.pg-structure-page [data-smart-contact]')].every((link) => link.getAttribute('href') === 'contato.html'),
          hiddenReveals: [...document.querySelectorAll('.pg-reveal:not(.pg-reveal--visible)')].map((item) => item.className)
        };
      })()`
    });
    const result = evaluation.result.value;
    if (result.scrollWidth > result.clientWidth) failures.push(`estrutura ${width}px: rolagem horizontal (${result.scrollWidth} > ${result.clientWidth})`);
    if (result.h1Count !== 1) failures.push(`estrutura ${width}px: quantidade de h1 inválida`);
    if (result.brokenImages.length) failures.push(`estrutura ${width}px: imagens quebradas: ${result.brokenImages.join(", ")}`);
    if (result.activePage !== "estrutura.html") failures.push(`estrutura ${width}px: estado ativo da navegação incorreto`);
    if (result.processCards !== 4 || result.galleryItems !== 4 || result.uniquePhotos !== 8) failures.push(`estrutura ${width}px: devem existir oito fotografias distintas em quatro cards e quatro itens de galeria`);
    if (result.followupItems !== 6 || result.productionSteps !== 6 || result.qualityItems !== 8 || result.highlights !== 0) failures.push(`estrutura ${width}px: conteúdo ou quantidade de blocos da página incorreto`);
    if (result.factoryAreaMentions !== 1 || result.repeatedInstitutionalNumbers !== 0) failures.push(`estrutura ${width}px: dados institucionais repetidos além da área fabril`);
    if (!result.allPhotosLazy) failures.push(`estrutura ${width}px: fotografias abaixo do hero devem usar carregamento tardio`);
    if (result.pageTitle !== "Estrutura") failures.push(`estrutura ${width}px: título principal incorreto`);
    if (result.heroSource !== "assets/estrutura/setor-corte-vinco.jpg" || result.heroLoading !== null || result.heroPriority !== "high") failures.push(`estrutura ${width}px: configuração da imagem no hero incorreta`);
    if (result.heroButtons !== 2 || result.finalCtaButtons !== 0 || !result.contactFallbacks) failures.push(`estrutura ${width}px: CTAs ou fallback de contato incorretos`);
    if (result.videos.length !== 4 || result.videos.some((video) => !video.source || !video.poster || !video.controls || video.autoplay || video.preload !== "metadata")) failures.push(`estrutura ${width}px: configuração da galeria de vídeos incorreta`);
    if (result.videos[0]?.caption !== "Coladeira funcionando") failures.push(`estrutura ${width}px: legenda do primeiro vídeo incorreta`);
    if (result.videos[1]?.source !== "assets/estrutura/WhatsApp Video 2026-08-07 at 09.52.14.mp4") failures.push(`estrutura ${width}px: vídeo de equipamentos de impressão incorreto`);
    if (result.videos[1]?.caption !== "Equipamentos de impressão Roland 305 L") failures.push(`estrutura ${width}px: legenda do vídeo da Roland 305 L incorreta`);
    if (result.hiddenReveals.length !== 0) failures.push(`estrutura ${width}px: elementos animados não revelados (${result.hiddenReveals.join(" | ")})`);
    if (width <= 768 && !result.menuButtonVisible) failures.push(`estrutura ${width}px: botão do menu móvel não está visível`);
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
      if (!menu.opened || !menu.closed || !menu.focused) failures.push("estrutura 375px: interação acessível do menu móvel falhou");
    }
    if (width === 1440 || width === 375) {
      const metrics = await send("Page.getLayoutMetrics");
      const capture = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width: metrics.cssContentSize.width, height: metrics.cssContentSize.height, scale: 1 }
      });
      writeFileSync(join(screenshotDir, `estrutura-${width}.png`), Buffer.from(capture.data, "base64"));
    }
  }

  for (const width of widths) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width <= 480 });
    await send("Page.navigate", { url: `http://127.0.0.1:${sitePort}/contato.html` });
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
      expression: `(() => {
        const form = document.querySelector('[data-contact-form]');
        const controls = [...form.querySelectorAll('input:not([name="_honey"]), select, textarea')];
        const productOptions = [...form.querySelectorAll('#produto option')].map((option) => option.textContent.trim());
        form.requestSubmit();
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          h1Count: document.querySelectorAll('h1').length,
          activePage: document.querySelector('.pg-nav__link[aria-current="page"]')?.getAttribute('href'),
          menuButtonVisible: getComputedStyle(document.querySelector('[data-menu-toggle]')).display !== 'none',
          brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
          heroSource: document.querySelector('.pg-contact-hero__image')?.getAttribute('src'),
          heroLoading: document.querySelector('.pg-contact-hero__image')?.getAttribute('loading'),
          heroPriority: document.querySelector('.pg-contact-hero__image')?.getAttribute('fetchpriority'),
          heroTitle: document.querySelector('.pg-contact-hero h1')?.textContent.trim(),
          heroSmartContacts: document.querySelectorAll('.pg-contact-hero [data-smart-contact]').length,
          phoneChannels: ['directorPhone', 'salesPhone', 'companyPhone'].map((key) => {
            const item = document.querySelector('.pg-contact-hero [data-contact-item="' + key + '"]');
            return {
              key,
              label: item?.querySelector('span')?.textContent.trim(),
              text: item?.querySelector('a')?.textContent.trim(),
              href: item?.querySelector('a')?.getAttribute('href')
            };
          }),
          emailActionPresent: Boolean(document.querySelector('[data-contact-action="email"]')),
          formFields: form.elements.length,
          labeledControls: controls.every((control) => Boolean(document.querySelector('label[for="' + control.id + '"]'))),
          requiredFields: [...form.querySelectorAll('[required]')].map((field) => field.id).sort(),
          invalidFields: [...form.querySelectorAll('[aria-invalid="true"]')].map((field) => field.id).sort(),
          visibleErrors: [...form.querySelectorAll('[data-error-for]:not([hidden])')].map((error) => error.dataset.errorFor).sort(),
          focusedField: document.activeElement?.id,
          productOptions,
          deliveryMethod: form.dataset.deliveryMethod,
          deliveryNotePresent: Boolean(form.querySelector('.pg-contact-form__delivery-note')),
          formStatus: document.querySelector('[data-form-status]')?.textContent.trim(),
          emailHref: document.querySelector('.pg-contact-channels [data-contact-item="email"] a')?.getAttribute('href'),
          addressText: document.querySelector('.pg-contact-channels [data-contact-item="address"] [data-contact-value]')?.textContent.trim(),
          instagramHref: document.querySelector('.pg-contact-channels [data-social-profile="instagram"]')?.getAttribute('href'),
          instagramText: document.querySelector('.pg-contact-channels [data-social-profile="instagram"]')?.textContent.trim(),
          footerSocials: [...document.querySelectorAll('.pg-contact-page .pg-footer .pg-social')].map((item) => item.dataset.social),
          whatsappVisible: getComputedStyle(document.querySelector('.pg-contact-channels [data-contact-item="whatsapp"]')).display !== 'none',
          hoursVisible: getComputedStyle(document.querySelector('.pg-contact-channels [data-contact-item="businessHours"]')).display !== 'none',
          finalButtons: document.querySelectorAll('.pg-contact-note .pg-button').length,
          hiddenReveals: [...document.querySelectorAll('.pg-reveal:not(.pg-reveal--visible)')].map((item) => item.className)
        };
      })()`
    });
    const result = evaluation.result.value;
    const expectedRequired = ["consentimento", "email", "mensagem", "nome", "produto", "telefone"];
    if (result.scrollWidth > result.clientWidth) failures.push(`contato ${width}px: rolagem horizontal (${result.scrollWidth} > ${result.clientWidth})`);
    if (result.h1Count !== 1) failures.push(`contato ${width}px: quantidade de h1 inválida`);
    if (result.activePage !== "contato.html") failures.push(`contato ${width}px: estado ativo da navegação incorreto`);
    if (result.brokenImages.length) failures.push(`contato ${width}px: imagens quebradas: ${result.brokenImages.join(", ")}`);
    if (result.heroSource !== "assets/estrutura/desenvolvimento-tecnico-embalagem.jpg" || result.heroLoading !== null || result.heroPriority !== "high") failures.push(`contato ${width}px: configuração da foto no hero incorreta`);
    if (result.heroTitle !== "Canais de atendimento" || result.heroSmartContacts !== 0) failures.push(`contato ${width}px: conteúdo principal do hero incorreto`);
    const expectedPhones = [
      { key: "directorPhone", label: "Diretor", text: "(19) 99144-0661", href: "tel:19991440661" },
      { key: "salesPhone", label: "Vendas", text: "(19) 99425-3333", href: "tel:19994253333" },
      { key: "companyPhone", label: "Empresa", text: "(19) 99246-4807", href: "tel:19992464807" }
    ];
    if (JSON.stringify(result.phoneChannels) !== JSON.stringify(expectedPhones)) failures.push(`contato ${width}px: telefones de atendimento incorretos`);
    if (result.emailActionPresent) failures.push(`contato ${width}px: o hero não deve possuir botão de e-mail`);
    if (!result.labeledControls || result.formFields !== 11) failures.push(`contato ${width}px: campos ou labels do formulário incompletos`);
    if (JSON.stringify(result.requiredFields) !== JSON.stringify(expectedRequired)) failures.push(`contato ${width}px: campos obrigatórios incorretos`);
    if (JSON.stringify(result.invalidFields) !== JSON.stringify(expectedRequired) || JSON.stringify(result.visibleErrors) !== JSON.stringify(expectedRequired) || result.focusedField !== "nome") failures.push(`contato ${width}px: validação acessível dos campos obrigatórios falhou`);
    if (!result.formStatus.includes("Revise os campos")) failures.push(`contato ${width}px: resumo de validação ausente`);
    if (result.productOptions.includes("Caixinhas Display") || !result.productOptions.includes("Caixas Display") || result.productOptions[0] !== "Selecione uma opção") failures.push(`contato ${width}px: opções de produto incorretas`);
    if (result.deliveryMethod !== "formsubmit-ajax") failures.push(`contato ${width}px: método de envio não documentado no formulário`);
    if (result.deliveryNotePresent) failures.push(`contato ${width}px: texto técnico de envio não deve aparecer abaixo do formulário`);
    if (result.emailHref !== "mailto:printgrafik@printgrafik.com.br" || !result.addressText.includes("Rodovia Antonio Forti") || result.instagramHref !== "https://www.instagram.com/printgrafik_industriagrafica/" || result.instagramText !== "@printgrafik_industriagrafica") failures.push(`contato ${width}px: canais confirmados incorretos`);
    if (JSON.stringify(result.footerSocials) !== JSON.stringify(["facebook", "instagram", "linkedin"])) failures.push(`contato ${width}px: redes sociais do rodapé incompletas`);
    if (result.whatsappVisible || result.hoursVisible) failures.push(`contato ${width}px: canais pendentes não devem ser exibidos`);
    if (result.finalButtons !== 0) failures.push(`contato ${width}px: bloco final não deve possuir botões`);
    if (result.hiddenReveals.length !== 0) failures.push(`contato ${width}px: elementos animados não revelados (${result.hiddenReveals.join(" | ")})`);
    if (width <= 768 && !result.menuButtonVisible) failures.push(`contato ${width}px: botão do menu móvel não está visível`);
    const validSubmissionEvaluation = await send("Runtime.evaluate", {
      awaitPromise: true,
      returnByValue: true,
      expression: `(async () => {
        const form = document.querySelector('[data-contact-form]');
        form.elements.nome.value = 'Cliente Teste';
        form.elements.telefone.value = '(19) 99999-9999';
        form.elements.email.value = 'cliente@example.com';
        form.elements.produto.value = 'Caixas Display';
        form.elements.mensagem.value = 'Gostaria de avaliar uma embalagem para um novo produto.';
        form.elements.consentimento.checked = true;
        const originalFetch = window.fetch;
        let fetchRequest = null;
        let resolveFetch;
        window.fetch = (url, options) => {
          fetchRequest = { url, method: options.method, headers: options.headers, body: JSON.parse(options.body) };
          return new Promise((resolve) => {
            resolveFetch = () => resolve({
              ok: true,
              json: async () => ({ success: true, message: 'mocked' })
            });
          });
        };
        form.requestSubmit();
        const pending = {
          submitDisabled: form.querySelector('[data-submit-button]').disabled,
          submitLabel: form.querySelector('[data-submit-label]').textContent.trim(),
          status: form.querySelector('[data-form-status]').textContent.trim(),
          statusState: form.querySelector('[data-form-status]').dataset.state
        };
        resolveFetch();
        await new Promise((resolve) => setTimeout(resolve, 0));
        await new Promise((resolve) => setTimeout(resolve, 0));
        const result = {
          pending,
          fetchRequest,
          submitDisabled: form.querySelector('[data-submit-button]').disabled,
          submitLabel: form.querySelector('[data-submit-label]').textContent.trim(),
          status: form.querySelector('[data-form-status]').textContent.trim(),
          statusState: form.querySelector('[data-form-status]').dataset.state,
          visibleErrors: form.querySelectorAll('[data-error-for]:not([hidden])').length,
          clearedName: form.elements.nome.value
        };
        window.fetch = originalFetch;
        return result;
      })()`
    });
    const validSubmission = validSubmissionEvaluation.result.value;
    if (!validSubmission.pending.submitDisabled || validSubmission.pending.submitLabel !== "Enviando…" || !validSubmission.pending.status.includes("Enviando") || validSubmission.pending.statusState !== "pending") failures.push(`contato ${width}px: estado de envio pendente incorreto`);
    if (validSubmission.fetchRequest?.url !== "https://formsubmit.co/ajax/printgrafik@printgrafik.com.br" || validSubmission.fetchRequest?.method !== "POST" || validSubmission.fetchRequest?.headers?.["Content-Type"] !== "application/json" || validSubmission.fetchRequest?.body?.nome !== "Cliente Teste" || validSubmission.fetchRequest?.body?.consentimento !== "Aceito" || !validSubmission.fetchRequest?.body?._subject?.includes("Cliente Teste")) failures.push(`contato ${width}px: requisição ao serviço de formulário incorreta`);
    if (validSubmission.submitDisabled || validSubmission.submitLabel !== "Enviar solicitação" || !validSubmission.status.includes("Solicitação enviada") || validSubmission.statusState !== "success" || validSubmission.visibleErrors !== 0 || validSubmission.clearedName !== "") failures.push(`contato ${width}px: confirmação do envio válido falhou`);
    if (width === 1440) {
      const activationEvaluation = await send("Runtime.evaluate", {
        awaitPromise: true,
        returnByValue: true,
        expression: `(async () => {
          const form = document.querySelector('[data-contact-form]');
          form.elements.nome.value = 'Cliente Teste';
          form.elements.telefone.value = '(19) 99999-9999';
          form.elements.email.value = 'cliente@example.com';
          form.elements.produto.value = 'Caixas Display';
          form.elements.mensagem.value = 'Mensagem de teste para validar o retorno de ativação.';
          form.elements.consentimento.checked = true;
          const originalFetch = window.fetch;
          window.fetch = async () => ({
            ok: true,
            json: async () => ({
              success: 'false',
              message: 'This form needs Activation. Click the Activate Form link.'
            })
          });
          form.requestSubmit();
          await new Promise((resolve) => setTimeout(resolve, 0));
          await new Promise((resolve) => setTimeout(resolve, 0));
          const result = {
            status: form.querySelector('[data-form-status]').textContent.trim(),
            statusState: form.querySelector('[data-form-status]').dataset.state,
            retainedName: form.elements.nome.value
          };
          window.fetch = originalFetch;
          return result;
        })()`
      });
      const activation = activationEvaluation.result.value;
      if (!activation.status.includes("aguarda ativação") || activation.statusState !== "error" || activation.retainedName !== "Cliente Teste") failures.push("contato 1440px: aviso de ativação pendente incorreto");
    }
    if (width === 1440 || width === 375) {
      await send("Runtime.evaluate", {
        expression: `(() => {
          const form = document.querySelector('[data-contact-form]');
          form.reset();
          form.querySelectorAll('[aria-invalid]').forEach((field) => field.removeAttribute('aria-invalid'));
          form.querySelectorAll('[data-error-for]').forEach((error) => { error.hidden = true; });
          const status = form.querySelector('[data-form-status]');
          status.textContent = '';
          delete status.dataset.state;
          document.body.tabIndex = -1;
          document.body.focus({ preventScroll: true });
          document.body.removeAttribute('tabindex');
        })()`
      });
    }
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
      if (!menu.opened || !menu.closed || !menu.focused) failures.push("contato 375px: interação acessível do menu móvel falhou");
    }
    if (width === 1440 || width === 375) {
      const metrics = await send("Page.getLayoutMetrics");
      const capture = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width: metrics.cssContentSize.width, height: metrics.cssContentSize.height, scale: 1 }
      });
      writeFileSync(join(screenshotDir, `contato-${width}.png`), Buffer.from(capture.data, "base64"));
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
