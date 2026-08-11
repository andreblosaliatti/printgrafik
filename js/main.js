"use strict";

const PG_CONTACT_PHONES = Object.freeze({
  director: "(19) 99144-0661",
  sales: "(19) 99425-3333",
  company: "(19) 99246-4807"
});

const PG_SITE_CONFIG = Object.freeze({
  institution: Object.freeze({
    foundation: "março de 2000",
    historyYears: "26",
    factoryArea: "2.000 m²",
    services: "+10",
    clients: "500+"
  }),
  contacts: Object.freeze({
    phone: PG_CONTACT_PHONES.director,
    phones: PG_CONTACT_PHONES,
    whatsapp: null,
    email: "printgrafik@printgrafik.com.br",
    formEndpoint: "https://formsubmit.co/ajax/printgrafik@printgrafik.com.br",
    address: "Rodovia Antonio Forti, nº 2400 — Bairro Morro Amarelo — Capivari/SP",
    businessHours: null,
    whatsappMessage: "Olá! Acessei o site da PrintGráfik e gostaria de informações sobre embalagens para minha empresa."
  }),
  social: Object.freeze({
    facebook: null,
    instagram: "https://www.instagram.com/printgrafik_industriagrafica/",
    linkedin: null
  })
});

const PG_SOCIAL_ICONS = Object.freeze({
  facebook: '<img src="assets/icons/social-facebook.svg" alt="" width="512" height="512">',
  instagram: '<img src="assets/icons/social-instagram.svg" alt="" width="512" height="512">',
  linkedin: '<img src="assets/icons/social-linkedin.svg" alt="" width="512" height="512">'
});

const pgFormatWhatsAppUrl = (number, message) => {
  const digits = String(number).replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : null;
};

const pgApplyInstitutionalData = () => {
  document.querySelectorAll("[data-institution]").forEach((element) => {
    const value = PG_SITE_CONFIG.institution[element.dataset.institution];
    if (value) element.textContent = value;
  });
};

const pgApplyContacts = () => {
  const { contacts } = PG_SITE_CONFIG;
  const whatsappUrl = contacts.whatsapp
    ? pgFormatWhatsAppUrl(contacts.whatsapp, contacts.whatsappMessage)
    : null;

  document.querySelectorAll("[data-smart-contact]").forEach((link) => {
    const label = link.querySelector("[data-contact-label]");
    if (label) {
      label.textContent = link.dataset.contactFallbackLabel || "Fale com nossa equipe";
    }

    if (!whatsappUrl && link.hasAttribute("data-hide-fallback-icon")) {
      link.querySelector(".pg-whatsapp-icon")?.remove();
    } else if (!link.querySelector(".pg-whatsapp-icon")) {
      const icon = document.createElement("img");
      icon.className = "pg-whatsapp-icon";
      icon.src = "assets/icons/whatsapp.svg";
      icon.alt = "";
      icon.width = 64;
      icon.height = 64;
      link.prepend(icon);
    }

    if (whatsappUrl) {
      link.href = whatsappUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  const contactSettings = {
    phone: contacts.phone
      ? { text: contacts.phone, href: `tel:${contacts.phone.replace(/[^\d+]/g, "")}` }
      : null,
    directorPhone: contacts.phones?.director
      ? { text: contacts.phones.director, href: `tel:${contacts.phones.director.replace(/[^\d+]/g, "")}` }
      : null,
    salesPhone: contacts.phones?.sales
      ? { text: contacts.phones.sales, href: `tel:${contacts.phones.sales.replace(/[^\d+]/g, "")}` }
      : null,
    companyPhone: contacts.phones?.company
      ? { text: contacts.phones.company, href: `tel:${contacts.phones.company.replace(/[^\d+]/g, "")}` }
      : null,
    whatsapp: whatsappUrl
      ? { text: contacts.whatsapp, href: whatsappUrl, external: true }
      : null,
    email: contacts.email
      ? { text: contacts.email, href: `mailto:${contacts.email}` }
      : null,
    address: contacts.address
      ? { text: contacts.address, href: null }
      : null,
    businessHours: contacts.businessHours
      ? { text: contacts.businessHours, href: null }
      : null
  };

  Object.entries(contactSettings).forEach(([key, settings]) => {
    if (!settings) return;
    document.querySelectorAll(`[data-contact-item="${key}"]`).forEach((item) => {
      const target = item.querySelector("[data-contact-value]") || item;
      target.textContent = settings.text;
      if (target instanceof HTMLAnchorElement && settings.href) {
        target.href = settings.href;
        if (settings.external) {
          target.target = "_blank";
          target.rel = "noopener noreferrer";
        }
      }
      item.hidden = false;
    });
  });

  if (contacts.address) {
    const encodedAddress = encodeURIComponent(contacts.address);
    document.querySelectorAll("[data-map-link]").forEach((link) => {
      link.href = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      link.hidden = false;
    });
    document.querySelectorAll("[data-map-embed]").forEach((frame) => {
      if (!frame.getAttribute("src")) {
        frame.src = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
      }
    });
    document.querySelectorAll("[data-map-container]").forEach((container) => {
      container.hidden = false;
    });
  }
};

const pgApplySocialLinks = () => {
  const networkLabels = {
    facebook: "Facebook da PrintGráfik",
    instagram: "Instagram da PrintGráfik",
    linkedin: "LinkedIn da PrintGráfik"
  };

  Object.entries(PG_SITE_CONFIG.social).forEach(([network, url]) => {
    document.querySelectorAll(`[data-social="${network}"]`).forEach((placeholder) => {
      placeholder.innerHTML = PG_SOCIAL_ICONS[network] || "";
      if (!url) return;
      const link = document.createElement("a");
      link.className = placeholder.className;
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", networkLabels[network] || network);
      link.dataset.social = network;
      link.innerHTML = placeholder.innerHTML;
      placeholder.replaceWith(link);
    });

    document.querySelectorAll(`[data-social-profile="${network}"]`).forEach((profileLink) => {
      if (!url) return;
      profileLink.href = url;
      profileLink.target = "_blank";
      profileLink.rel = "noopener noreferrer";
      if (!profileLink.textContent.trim()) {
        const profileName = new URL(url).pathname.split("/").filter(Boolean).at(-1);
        profileLink.textContent = profileName ? `@${profileName}` : networkLabels[network] || network;
      }
      profileLink.hidden = false;
    });
  });
};

const pgInitMenu = () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-menu]");
  if (!toggle || !nav) return;

  const closeMenu = ({ returnFocus = false } = {}) => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    nav.dataset.open = "false";
    document.body.classList.remove("pg-menu-open");
    if (returnFocus) toggle.focus();
  };

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
    nav.dataset.open = "true";
    document.body.classList.add("pg-menu-open");
    nav.querySelector("a")?.focus();
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu({ returnFocus: true });
    }
  });

  document.addEventListener("click", (event) => {
    if (
      toggle.getAttribute("aria-expanded") === "true" &&
      !nav.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 821px)");
  const handleViewportChange = (event) => {
    if (event.matches) closeMenu();
  };
  desktopQuery.addEventListener("change", handleViewportChange);
};

const pgSetCurrentYear = () => {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
};

const pgInitContactForm = () => {
  const form = document.querySelector("[data-contact-form]");
  if (!(form instanceof HTMLFormElement)) return;

  const submitButton = form.querySelector("[data-submit-button]");
  const submitLabel = form.querySelector("[data-submit-label]");
  const status = form.querySelector("[data-form-status]");
  const fields = {
    nome: form.elements.namedItem("nome"),
    telefone: form.elements.namedItem("telefone"),
    email: form.elements.namedItem("email"),
    produto: form.elements.namedItem("produto"),
    mensagem: form.elements.namedItem("mensagem"),
    consentimento: form.elements.namedItem("consentimento")
  };

  const setFieldState = (field, isValid) => {
    if (!(field instanceof HTMLElement)) return;
    field.setAttribute("aria-invalid", String(!isValid));
    const error = form.querySelector(`[data-error-for="${field.id}"]`);
    if (error) error.hidden = isValid;
  };

  const validations = {
    nome: (field) => field.value.trim().length > 0,
    telefone: (field) => field.value.replace(/\D/g, "").length >= 8,
    email: (field) => field.value.trim().length > 0 && field.validity.valid,
    produto: (field) => field.value !== "",
    mensagem: (field) => field.value.trim().length >= 10,
    consentimento: (field) => field.checked
  };

  const validateField = (name) => {
    const field = fields[name];
    const isValid = field && validations[name](field);
    setFieldState(field, Boolean(isValid));
    return Boolean(isValid);
  };

  Object.entries(fields).forEach(([name, field]) => {
    if (!field) return;
    const eventName = field instanceof HTMLInputElement && field.type === "checkbox" || field instanceof HTMLSelectElement
      ? "change"
      : "input";
    field.addEventListener(eventName, () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(name);
      if (status) {
        status.textContent = "";
        delete status.dataset.state;
      }
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const validationResults = Object.keys(fields).map((name) => ({ name, isValid: validateField(name) }));
    const invalidField = validationResults.find((result) => !result.isValid)?.name;
    if (invalidField) {
      if (status) {
        status.textContent = "Revise os campos indicados antes de continuar.";
        status.dataset.state = "error";
      }
      fields[invalidField].focus();
      return;
    }

    const honeypot = form.elements.namedItem("_honey");
    if (honeypot instanceof HTMLInputElement && honeypot.value) {
      if (status) {
        status.textContent = "Não foi possível preparar a solicitação. Recarregue a página e tente novamente.";
        status.dataset.state = "error";
      }
      return;
    }

    const endpoint = PG_SITE_CONFIG.contacts.formEndpoint;
    if (!endpoint) {
      if (status) {
        status.textContent = "O envio ainda não está configurado. Use um dos canais de contato disponíveis.";
        status.dataset.state = "error";
      }
      return;
    }

    if (!/^https?:$/.test(window.location.protocol)) {
      if (status) {
        status.textContent = "Para enviar, abra o site por um servidor local ou pelo endereço publicado. O formulário não funciona quando o HTML é aberto diretamente como arquivo.";
        status.dataset.state = "error";
      }
      return;
    }

    const formData = new FormData(form);
    const valueOrNotInformed = (name) => String(formData.get(name) || "").trim() || "Não informado";
    const company = valueOrNotInformed("empresa");
    const subjectReference = company === "Não informado" ? valueOrNotInformed("nome") : company;
    const subject = `Solicitação de orçamento — ${subjectReference}`;
    const submission = Object.fromEntries(formData.entries());
    submission._subject = subject;
    submission._template = "table";
    submission._url = window.location.href;
    submission.consentimento = "Aceito";

    if (submitButton) submitButton.disabled = true;
    if (submitLabel) submitLabel.textContent = "Enviando…";
    if (status) {
      status.textContent = "Enviando sua solicitação…";
      status.dataset.state = "pending";
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(submission)
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false || result?.success === "false") {
        const serviceMessage = typeof result?.message === "string" ? result.message : "";
        const error = new Error("FormSubmit recusou a solicitação.");
        error.formActivationRequired = /needs activation|activate form/i.test(serviceMessage);
        throw error;
      }

      form.reset();
      Object.values(fields).forEach((field) => field?.removeAttribute("aria-invalid"));
      if (status) {
        status.textContent = "Solicitação enviada. Nossa equipe receberá os dados por e-mail.";
        status.dataset.state = "success";
      }
    } catch (error) {
      if (status) {
        status.textContent = error?.formActivationRequired
          ? "O formulário aguarda ativação. A PrintGráfik precisa confirmar o link enviado ao e-mail da empresa."
          : "Não foi possível enviar agora. Tente novamente ou use um dos canais de atendimento.";
        status.dataset.state = "error";
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
      if (submitLabel) submitLabel.textContent = "Enviar solicitação";
    }
  });
};

const pgGetCounterParts = (finalValue) => {
  const firstDigit = finalValue.search(/\d/);
  const digitIndexes = [...finalValue].reduce((indexes, character, index) => {
    if (/\d/.test(character)) indexes.push(index);
    return indexes;
  }, []);
  const lastDigit = digitIndexes.at(-1);

  return {
    target: Number(finalValue.replace(/\D/g, "")),
    prefix: firstDigit > 0 ? finalValue.slice(0, firstDigit) : "",
    suffix: lastDigit !== undefined ? finalValue.slice(lastDigit + 1) : ""
  };
};

const pgAnimateCounter = (element) => {
  if (element.dataset.counterComplete === "true") return;

  const finalValue = element.dataset.counterFinal || element.textContent.trim();
  const { target, prefix, suffix } = pgGetCounterParts(finalValue);
  if (!Number.isFinite(target)) return;

  element.dataset.counterComplete = "true";
  const duration = 1200;
  const startTime = performance.now();

  const update = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(target * easedProgress);
    element.textContent = `${prefix}${currentValue.toLocaleString("pt-BR")}${suffix}`;

    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = finalValue;
  };

  requestAnimationFrame(update);
};

const pgInitScrollMotion = () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = document.querySelectorAll(".pg-stat__value[data-institution]");

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  counters.forEach((counter) => {
    const finalValue = counter.textContent.trim();
    counter.dataset.counterFinal = finalValue;
    counter.setAttribute("aria-label", finalValue);
    const { prefix, suffix } = pgGetCounterParts(finalValue);
    counter.textContent = `${prefix}0${suffix}`;
  });

  const revealGroups = [
    ".pg-section-heading",
    ".pg-product-card",
    ".pg-stat",
    ".pg-feature-card",
    ".pg-purpose-card",
    ".pg-gallery__item",
    ".pg-cta",
    ".pg-company-panel__copy",
    ".pg-company-products-visual",
    ".pg-company-benefit",
    ".pg-company-service__media",
    ".pg-company-service__copy",
    ".pg-company-purpose-card",
    ".pg-company-location__copy",
    ".pg-company-location__map",
    ".pg-company-cta",
    ".pg-product-detail",
    ".pg-products-material-card",
    ".pg-products-step",
    ".pg-products-info-card",
    ".pg-products-cta",
    ".pg-structure-card",
    ".pg-structure-gallery__item",
    ".pg-structure-video-card",
    ".pg-structure-followup__copy",
    ".pg-structure-checklist",
    ".pg-structure-step",
    ".pg-structure-quality__panel",
    ".pg-structure-cta",
    ".pg-contact-form-card",
    ".pg-contact-channels",
    ".pg-contact-note"
  ];

  revealGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("pg-reveal");
      element.style.setProperty("--pg-reveal-delay", `${Math.min(index % 5, 4) * 80}ms`);
    });
  });

  const aboutCopy = document.querySelector(".pg-about__copy");
  const aboutImage = document.querySelector(".pg-about__image");
  aboutCopy?.classList.add("pg-reveal", "pg-reveal--left");
  aboutImage?.classList.add("pg-reveal", "pg-reveal--right");

  const companyIntroCopy = document.querySelector(".pg-company-intro__copy");
  const companyIntroImage = document.querySelector(".pg-company-intro__image");
  companyIntroCopy?.classList.add("pg-reveal", "pg-reveal--left");
  companyIntroImage?.classList.add("pg-reveal", "pg-reveal--right");

  const productsHeroCopy = document.querySelector(".pg-products-hero__copy");
  const productsHeroMedia = document.querySelector(".pg-product-hero-media");
  productsHeroCopy?.classList.add("pg-reveal", "pg-reveal--left");
  productsHeroMedia?.classList.add("pg-reveal", "pg-reveal--right");

  const structureHeroCopy = document.querySelector(".pg-structure-hero__copy");
  const structureHeroImage = document.querySelector(".pg-structure-hero__image");
  structureHeroCopy?.classList.add("pg-reveal", "pg-reveal--left");
  structureHeroImage?.classList.add("pg-reveal", "pg-reveal--right");

  const contactHeroCopy = document.querySelector(".pg-contact-hero__copy");
  const contactHeroImage = document.querySelector(".pg-contact-hero__image");
  contactHeroCopy?.classList.add("pg-reveal", "pg-reveal--left");
  contactHeroImage?.classList.add("pg-reveal", "pg-reveal--right");

  document.querySelector(".pg-structure-followup__copy")?.classList.add("pg-reveal--left");
  document.querySelector(".pg-structure-checklist")?.classList.add("pg-reveal--right");

  document.querySelectorAll(
    ".pg-company-solutions .pg-company-panel__copy, .pg-company-service__media, .pg-company-location__copy"
  ).forEach((element) => element.classList.add("pg-reveal--left"));

  document.querySelectorAll(
    ".pg-company-products-visual, .pg-company-benefit, .pg-company-service__copy, .pg-company-location__map"
  ).forEach((element) => element.classList.add("pg-reveal--right"));

  const revealElement = (element) => {
    element.classList.add("pg-reveal--visible");
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealElement(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px 8%" });

  document.querySelectorAll(".pg-reveal").forEach((element) => {
    revealObserver.observe(element);
  });

  let revealFrame = null;
  let revealTimer = null;
  const revealVisibleElements = () => {
    revealFrame = null;
    document.querySelectorAll(".pg-reveal:not(.pg-reveal--visible)").forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top <= window.innerHeight * 0.94 && bounds.bottom >= 0) {
        revealElement(element);
        revealObserver.unobserve(element);
      }
    });
  };

  const scheduleRevealCheck = () => {
    if (revealFrame === null) revealFrame = requestAnimationFrame(revealVisibleElements);
    window.clearTimeout(revealTimer);
    revealTimer = window.setTimeout(revealVisibleElements, 100);
  };

  window.addEventListener("scroll", scheduleRevealCheck, { passive: true });
  window.addEventListener("resize", scheduleRevealCheck, { passive: true });
  requestAnimationFrame(revealVisibleElements);

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      pgAnimateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.45 });

  counters.forEach((counter) => counterObserver.observe(counter));
};

document.addEventListener("DOMContentLoaded", () => {
  pgApplyInstitutionalData();
  pgApplyContacts();
  pgApplySocialLinks();
  pgInitMenu();
  pgSetCurrentYear();
  pgInitContactForm();
  pgInitScrollMotion();
});
