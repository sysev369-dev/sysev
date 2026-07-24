const page = document.body.dataset.page || "home";

const navItems = [
  ["home", "Home", "index.html"],
  ["scooters", "Scooters", "scooters.html"],
  ["about", "About", "about.html"],
  ["faq", "FAQ", "faq.html"],
  ["contact", "Contact", "contact.html"]
];

const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const brand = `
  <img class="brand-emblem" src="assets/sys-ev-emblem.png" alt="">
  <span class="brand-name">SYS <span>EV</span></span>`;

const header = document.getElementById("site-header");
if (header) {
  header.className = "site-header";
  header.innerHTML = `
    <div class="container nav-row">
      <a class="brand" href="index.html" aria-label="SYS EV home">${brand}</a>
      <nav class="main-nav" aria-label="Primary navigation">
        ${navItems.map(([id, label, href]) => `<a href="${href}" class="${page === id ? "active" : ""}">${label}</a>`).join("")}
      </nav>
      <div class="nav-actions">
        <a class="icon-button whatsapp-button" href="https://wa.me/9779714571009?text=Hello%20SYS%20EV%2C%20I%20would%20like%20to%20know%20more%20about%20your%20scooters." target="_blank" rel="noopener" aria-label="Chat with SYS EV on WhatsApp" title="Chat on WhatsApp">${icon("message-circle")}</a>
        <a class="btn" href="test-ride.html">${icon("calendar-check")} Book a test ride</a>
        <button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
      </div>
    </div>
    <nav class="mobile-nav" aria-label="Mobile navigation">
      ${navItems.map(([id, label, href]) => `<a href="${href}">${label}</a>`).join("")}
      <a class="btn" href="test-ride.html">Book a test ride</a>
    </nav>`;
}

const footer = document.getElementById("site-footer");
if (footer) {
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html">${brand}</a>
          <p class="footer-copy">Premium electric scooters with long-range battery options, smart features, and local support in Kathmandu.</p>
        </div>
        <div class="footer-col">
          <h3>Explore</h3>
          <ul>
            <li><a href="scooters.html">M5 & FX scooters</a></li>
            <li><a href="scooters.html#pricing">Pricing</a></li>
            <li><a href="scooters.html#specifications">Specifications</a></li>
            <li><a href="test-ride.html">Book a test ride</a></li>
            <li><a href="contact.html?topic=dealer#enquiry">Become a dealer</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Contact</h3>
          <ul>
            <li><a href="https://wa.me/9779714571009" target="_blank" rel="noopener">WhatsApp: +977-9714571009</a></li>
            <li><a href="mailto:sys-ev@outlook.com">sys-ev@outlook.com</a></li>
            <li><a href="https://maps.app.goo.gl/q1CazRJc4amtG4V78?g_st=aw" target="_blank" rel="noopener">Kanchhan Basti, Chandragiri-10</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 SYS EV Pvt. Ltd. All rights reserved.</span>
        <span>Kathmandu, Nepal</span>
      </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();

  const menuButton = document.querySelector(".menu-button");
  const mobileNav = document.querySelector(".mobile-nav");
  menuButton?.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuButton.innerHTML = icon(open ? "x" : "menu");
    if (window.lucide) window.lucide.createIcons();
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("in"));
  }

  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  document.querySelectorAll("[data-whatsapp-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const details = [...data.entries()]
        .filter(([, value]) => String(value).trim())
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
      window.open(`https://wa.me/9779714571009?text=${encodeURIComponent(`Hello SYS EV,\n\n${details}`)}`, "_blank", "noopener");
      form.querySelector(".form-success")?.classList.add("show");
    });
  });

  initModelStage();
  initSpecTabs();
  initHeroSlider();
  selectQueryTopic();
  initScooterCatalog();
  initMotionShowcase();
});

function initMotionShowcase() {
  const showcase = document.querySelector("[data-motion-showcase]");
  if (!showcase) return;

  const video = showcase.querySelector("video");
  const toggle = showcase.querySelector("[data-video-toggle]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const syncButton = () => {
    const playing = !video.paused;
    toggle.innerHTML = icon(playing ? "pause" : "play");
    toggle.setAttribute("aria-label", playing ? "Pause showcase video" : "Play showcase video");
    toggle.title = playing ? "Pause video" : "Play video";
    if (window.lucide) window.lucide.createIcons();
  };

  toggle.addEventListener("click", () => {
    if (video.paused) {
      video.play().catch(syncButton);
    } else {
      video.pause();
    }
  });
  video.addEventListener("play", syncButton);
  video.addEventListener("pause", syncButton);

  if (reduceMotion) video.pause();
  syncButton();
}

const products = {
  m5: {
    name: "SYS EV M5",
    subtitle: "Flagship long-range edition",
    description: "For riders who want maximum range without giving up performance, storage, or smart everyday convenience.",
    range: "330-350 km",
    battery: "72V-105Ah LFP",
    price: "NPR 385,000",
    warranty: "3 years",
    colors: [
      ["Eco Green", "assets/M5GREENSYSEV.jpg", "#7ed321"],
      ["Solar Orange", "assets/M5 ORANGE SYS EV.jpg", "#ef5b12"],
      ["Rose Flash", "assets/M5PINKREDSYSEV.jpg", "#d92e58"]
    ]
  },
  fx: {
    name: "SYS EV FX",
    subtitle: "Smart city performance",
    description: "A premium urban scooter in 72V-38Ah Graphene, 72V-30Ah LFP, and 72V-50Ah LFP configurations.",
    range: "90-200 km",
    battery: "30Ah / 38Ah / 50Ah",
    price: "From NPR 210,000",
    warranty: "1-3 years",
    colors: [
      ["Premium Orange", "assets/fx sys orange.jpg", "#ef5b12"],
      ["Metallic Rose Pink", "assets/fx sys rose pink.jpg", "#d86e92"],
      ["Sky Blue", "assets/fx sys sky blue.jpg", "#8fc9e8"]
    ]
  }
};

function initModelStage() {
  const stage = document.querySelector("[data-model-stage]");
  if (!stage) return;
  const tabs = stage.querySelectorAll("[data-model]");
  let selected = stage.dataset.defaultModel || "m5";

  const render = () => {
    const product = products[selected];
    stage.querySelector("[data-model-image]").src = product.colors[0][1];
    stage.querySelector("[data-model-image]").alt = `${product.name} in ${product.colors[0][0]}`;
    stage.querySelector("[data-model-name]").textContent = product.name;
    stage.querySelector("[data-model-subtitle]").textContent = product.subtitle;
    stage.querySelector("[data-model-description]").textContent = product.description;
    stage.querySelector("[data-range]").textContent = product.range;
    stage.querySelector("[data-battery]").textContent = product.battery;
    stage.querySelector("[data-price]").textContent = product.price;
    stage.querySelector("[data-warranty]").textContent = product.warranty;
    stage.querySelector("[data-model-link]").href = `scooters.html?model=${selected}&tab=specifications`;
    stage.querySelector("[data-color-name]").textContent = product.colors[0][0];
    stage.querySelector("[data-colors]").innerHTML = product.colors.map(([name, src, color], index) =>
      `<button class="color-swatch ${index === 0 ? "active" : ""}" type="button" style="background:${color}" data-src="${src}" data-name="${name}" aria-label="View ${name}"></button>`
    ).join("");
    tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.model === selected));
    stage.querySelectorAll(".color-swatch").forEach(swatch => {
      swatch.addEventListener("click", () => {
        stage.querySelector("[data-model-image]").src = swatch.dataset.src;
        stage.querySelector("[data-model-image]").alt = `${product.name} in ${swatch.dataset.name}`;
        stage.querySelector("[data-color-name]").textContent = swatch.dataset.name;
        stage.querySelectorAll(".color-swatch").forEach(item => item.classList.toggle("active", item === swatch));
      });
    });
  };

  tabs.forEach(tab => tab.addEventListener("click", () => {
    selected = tab.dataset.model;
    render();
  }));
  render();
}

function initSpecTabs() {
  const buttons = document.querySelectorAll("[data-spec-target]");
  if (!buttons.length) return;
  buttons.forEach(button => button.addEventListener("click", () => {
    buttons.forEach(item => item.classList.toggle("active", item === button));
    document.getElementById(button.dataset.specTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}

function initHeroSlider() {
  const slider = document.querySelector("[data-hero-slider]");
  if (!slider) return;
  const slides = [...slider.querySelectorAll("[data-hero-slide]")];
  const dots = [...slider.querySelectorAll("[data-hero-dot]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let timer;

  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle("active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  };

  const stop = () => window.clearInterval(timer);
  const start = () => {
    if (reduceMotion) return;
    stop();
    timer = window.setInterval(() => show(current + 1), 6500);
  };

  slider.querySelector("[data-hero-next]")?.addEventListener("click", () => {
    show(current + 1);
    start();
  });
  slider.querySelector("[data-hero-prev]")?.addEventListener("click", () => {
    show(current - 1);
    start();
  });
  dots.forEach((dot, index) => dot.addEventListener("click", () => {
    show(index);
    start();
  }));
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  slider.addEventListener("focusin", stop);
  slider.addEventListener("focusout", start);
  show(0);
  start();
}

function selectQueryTopic() {
  const topic = new URLSearchParams(window.location.search).get("topic");
  const select = document.getElementById("contact-topic");
  if (topic && select && [...select.options].some(option => option.value === topic)) {
    select.value = topic;
  }
}

const catalogModels = {
  m5: {
    name: "SYS EV M5",
    shortName: "M5",
    subtitle: "Flagship long-range edition",
    description: "Maximum range, a high-density LFP battery, and the full SYS EV smart feature suite for riders who want fewer charging stops.",
    image: "assets/M5GREENSYSEV.jpg",
    brochure: "assets/m5-brochure.jpg",
    colors: [
      ["Eco Green", "assets/M5GREENSYSEV.jpg", "#7ed321"],
      ["Solar Orange", "assets/M5 ORANGE SYS EV.jpg", "#ef5b12"],
      ["Rose Flash", "assets/M5PINKREDSYSEV.jpg", "#d92e58"]
    ],
    stats: [
      ["330-350 km", "Claimed range*"],
      ["72V-105Ah", "LFP battery"],
      ["75 km/h", "Top speed"],
      ["3 years", "Battery warranty"]
    ],
    performance: [
      ["gauge", "2500W liquid-cooled motor", "All-new Yuma liquid-cooled pure copper 12-inch motor engineered for strong, consistent output."],
      ["zap", "Instant torque", "Immediate electric acceleration for confident starts and responsive city riding."],
      ["mountain", "Strong hill climbing", "Power delivery designed for slopes and changing road gradients."],
      ["disc-3", "Front and rear disc brakes", "220 mm front and 220 mm rear disc brakes."],
      ["unfold-vertical", "Balanced suspension", "Front hydraulic suspension and rear spring suspension for stability and shock absorption."],
      ["route", "Long-range LFP power", "330-350 km brochure-listed claimed range under ideal conditions."]
    ],
    smart: [
      ["monitor", "HD LED display", "Speed, battery, lighting, turn signals, hazard lights, mileage, and diagnostics."],
      ["nfc", "NFC unlock", "Start and unlock using the supplied NFC functionality."],
      ["smartphone", "Mobile app", "Mobile phone starting and connected vehicle information."],
      ["bluetooth", "Bluetooth audio", "Integrated Bluetooth audio connectivity."],
      ["usb", "USB charging", "Convenient charging port for compatible personal devices."],
      ["lightbulb", "Full LED lighting", "Full-vehicle LED lighting for visibility and a modern light signature."],
      ["parking-circle", "Hill-hold parking", "Parking mode with hill-hold parking assistance."],
      ["shield-check", "Smart diagnostics", "Dashboard fault information and battery management protection."],
      ["armchair", "Waterproof seat", "Black waterproof leather seat for everyday use."],
      ["accessibility", "Dual stands", "Easy-lift centre stand and practical side stand."],
      ["scan-eye", "Factory mirrors", "Factory rear-view mirrors included as standard."],
      ["layers-3", "Floor mat", "Factory floor mat included in the standard equipment."]
    ],
    specs: [
      ["Dimensions (L x W x H)", "1880 x 730 x 1100 mm"],
      ["Motor", "2500W Yuma liquid-cooled pure copper, 12-inch"],
      ["Top speed", "75 km/h"],
      ["Battery configuration", "72V-105Ah LFP pack with charger, using brand-new Grade A+ cells"],
      ["Claimed range", "330-350 km per charge, as listed in the supplied brochure*"],
      ["Brakes", "Front and rear disc brakes (220 mm / 220 mm)"],
      ["Suspension", "Front hydraulic / rear spring"],
      ["Tyres", "Front and rear 110/70-12 widened tubeless"],
      ["Rims", "Front and rear 12-inch 'Starry Sky' aluminium alloy"],
      ["Ride modes", "Three speed modes (1 / 2 / 3) plus parking mode"],
      ["Starting method", "Key / NFC / mobile phone"],
      ["Dashboard", "HD LED display with speed, battery, lights, signals, hazards, mileage, and smart diagnostics"],
      ["Standard equipment", "Waterproof leather seat, LED lighting, mirrors, centre and side stands, USB port, floor mat, hill-hold parking"],
      ["Documentation note", "Battery, brake, tyre, and rim details follow the supplied technical specifications. Range, warranty, and additional smart features are brochure-listed."]
    ],
    pricing: [
      ["SYS EV M5", "8.64 kWh LFP", "330-350 km", "3 years", "NPR 385,000"]
    ]
  },
  fx: {
    name: "SYS EV FX",
    shortName: "FX",
    subtitle: "Three battery configurations",
    description: "All three available battery configurations are shown together below.",
    image: "assets/fx sys orange.jpg",
    brochure: "assets/fx-brochure.jpg",
    colors: [
      ["Premium Orange", "assets/fx sys orange.jpg", "#ef5b12"],
      ["Metallic Rose Pink", "assets/fx sys rose pink.jpg", "#d86e92"],
      ["Sky Blue", "assets/fx sys sky blue.jpg", "#8fc9e8"]
    ],
    stats: [
      ["3", "Battery options"],
      ["2500W", "Yuma motor"],
      ["75 km/h", "Top speed"],
      ["220 mm", "Front and rear discs"]
    ],
    performance: [
      ["gauge", "2500W liquid-cooled motor", "Yuma liquid-cooled pure copper 12-inch motor."],
      ["gauge", "75 km/h top speed", "Top speed stated in the supplied technical specification."],
      ["disc-3", "Front and rear disc brakes", "220 mm front and 220 mm rear disc brakes."],
      ["unfold-vertical", "Hydraulic and spring suspension", "Hydraulic front suspension with rear spring suspension."]
    ],
    configurations: [
      ["battery-charging", "72V-38Ah Graphene", "Complete Graphene battery pack with charger."],
      ["battery-charging", "72V-30Ah LFP", "Brand-new Grade A+ cells, complete LFP battery pack, and charger."],
      ["battery-charging", "72V-50Ah LFP", "Brand-new Grade A+ cells, complete LFP battery pack, and charger."]
    ],
    smart: [
      ["monitor", "HD LED display", "Included in every FX configuration."],
      ["nfc", "NFC", "NFC functionality included."],
      ["smartphone", "App connectivity", "App functionality included."],
      ["bluetooth", "Bluetooth", "Bluetooth connectivity included."],
      ["key-round", "Keyless start", "Keyless starting included."],
      ["usb", "USB port", "USB connection included."],
      ["armchair", "Waterproof leather seat", "Waterproof leather seat included."],
      ["accessibility", "Centre and side stands", "Both centre and side stands included."]
    ],
    specs: [
      ["Dimensions (L x W x H)", "1880 x 730 x 1100 mm"],
      ["Motor", "2500W Yuma liquid-cooled pure copper, 12-inch"],
      ["Top speed", "75 km/h"],
      ["Battery configurations", "72V-38Ah Graphene / 72V-30Ah LFP / 72V-50Ah LFP; every configuration includes its charger"],
      ["Battery cells", "Brand-new Grade A+ cells for both LFP configurations"],
      ["Brakes", "Front and rear disc brakes (220 mm / 220 mm)"],
      ["Suspension", "Front hydraulic / rear spring"],
      ["Tyres", "Front 110/70-12 / rear 110/70-12 widened tubeless"],
      ["Rims", "Front and rear 12-inch 'Starry Sky' aluminium alloy"],
      ["Included features", "HD LED display, NFC, app, Bluetooth, keyless start, waterproof leather seat, centre and side stands, USB"]
    ],
    pricing: [
      ["SYS EV FX", "3.96 kWh LFP", "150-200 km", "3 years", "NPR 300,000"],
      ["SYS EV FX", "2.52 kWh LFP", "90-100 km", "3 years", "NPR 250,000"],
      ["SYS EV FX", "2.52 kWh Graphene", "90-100 km", "2 years", "NPR 235,000"],
      ["SYS EV FX", "2.52 kWh Graphene", "90-100 km", "1 year", "NPR 210,000"]
    ]
  }
};

function initScooterCatalog() {
  const catalog = document.querySelector("[data-scooter-catalog]");
  if (!catalog) return;
  const modelButtons = [...catalog.querySelectorAll("[data-catalog-model]")];
  const detailButtons = [...catalog.querySelectorAll("[data-catalog-tab]")];
  const params = new URLSearchParams(window.location.search);
  const requestedModel = params.get("model");
  const requestedTab = params.get("tab") || window.location.hash.slice(1);
  const validModels = Object.keys(catalogModels);
  const validTabs = detailButtons.map(button => button.dataset.catalogTab);
  let modelKey = validModels.includes(requestedModel) ? requestedModel : (catalog.dataset.defaultModel || "m5");
  let tabKey = validTabs.includes(requestedTab) ? requestedTab : "overview";

  if (params.has("variant")) {
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("variant");
    window.history.replaceState({}, "", cleanUrl);
  }

  const updateAddress = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("model", modelKey);
    url.searchParams.set("tab", tabKey);
    url.searchParams.delete("variant");
    url.hash = "";
    window.history.replaceState({}, "", url);
  };

  const renderColors = model => {
    const colorHost = catalog.querySelector("[data-catalog-colors]");
    colorHost.innerHTML = model.colors.map(([name, src, color], index) =>
      `<button class="catalog-color ${index === 0 ? "active" : ""}" type="button" data-src="${src}" data-name="${name}" aria-label="View ${name}">
        <span style="background:${color}"></span>${name}
      </button>`
    ).join("");
    catalog.querySelector("[data-catalog-color-name]").textContent = model.colors[0][0];
    colorHost.querySelectorAll(".catalog-color").forEach(button => {
      button.addEventListener("click", () => {
        catalog.querySelector("[data-catalog-image]").src = button.dataset.src;
        catalog.querySelector("[data-catalog-image]").alt = `${model.name} in ${button.dataset.name}`;
        catalog.querySelector("[data-catalog-color-name]").textContent = button.dataset.name;
        colorHost.querySelectorAll(".catalog-color").forEach(item => item.classList.toggle("active", item === button));
      });
    });
  };

  const renderDetail = model => {
    const host = catalog.querySelector("[data-catalog-content]");
    if (tabKey === "overview") {
      host.innerHTML = `
        <div class="catalog-stat-grid">${model.stats.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("")}</div>
        <div class="catalog-overview-copy">
          <h3>${model.subtitle}</h3>
          <p>${model.description}</p>
        </div>
        <div class="catalog-quick-grid">
          ${(model.configurations || model.performance.slice(0, 3)).map(([iconName, title, text]) => `<article>${icon(iconName)}<strong>${title}</strong><p>${text}</p></article>`).join("")}
        </div>`;
    } else if (tabKey === "performance") {
      host.innerHTML = `
        <div class="catalog-pane-head"><span>Performance and control</span><h3>Power built for the real road.</h3></div>
        <div class="catalog-detail-grid">
          ${model.performance.map(([iconName, title, text]) => `<article>${icon(iconName)}<div><strong>${title}</strong><p>${text}</p></div></article>`).join("")}
        </div>`;
    } else if (tabKey === "smart") {
      host.innerHTML = `
        <div class="catalog-pane-head"><span>Smart and standard features</span><h3>Technology that stays useful.</h3></div>
        <div class="catalog-smart-grid">
          ${model.smart.map(([iconName, title, text]) => `<article>${icon(iconName)}<strong>${title}</strong><p>${text}</p></article>`).join("")}
        </div>`;
    } else if (tabKey === "specifications") {
      host.innerHTML = `
        <div class="catalog-pane-head"><span>Technical specification</span><h3>${model.name}, row by row.</h3></div>
        <div class="catalog-spec-table" role="table" aria-label="${model.name} specifications">
          ${model.specs.map(([label, value]) => `<div class="catalog-spec-row" role="row"><strong role="rowheader">${label}</strong><span role="cell">${value}</span></div>`).join("")}
        </div>`;
    } else if (tabKey === "pricing") {
      host.innerHTML = `
        <div class="catalog-pane-head"><span>Price, range, and warranty</span><h3>Choose your ${model.shortName} configuration.</h3></div>
        <div class="catalog-price-table">
          <div class="catalog-price-row catalog-price-head"><span>Model</span><span>Battery</span><span>Range*</span><span>Warranty</span><span>MRP</span></div>
          ${model.pricing.map(row => `<div class="catalog-price-row">${row.map(value => `<span>${value}</span>`).join("")}</div>`).join("")}
        </div>
        <div class="catalog-price-actions">
          <a class="btn" href="test-ride.html">Book a test ride</a>
          <a class="btn btn-outline" href="https://wa.me/9779714571009" target="_blank" rel="noopener">${icon("message-circle")} Ask about stock</a>
        </div>`;
    }
    if (window.lucide) window.lucide.createIcons();
  };

  const renderModel = () => {
    const model = catalogModels[modelKey];
    catalog.querySelector("[data-catalog-image]").src = model.image;
    catalog.querySelector("[data-catalog-image]").alt = `${model.name} in ${model.colors[0][0]}`;
    catalog.querySelector("[data-catalog-name]").textContent = model.name;
    catalog.querySelector("[data-catalog-subtitle]").textContent = model.subtitle;
    catalog.querySelector("[data-catalog-brochure]").href = model.brochure;
    catalog.querySelector("[data-catalog-brochure]").setAttribute("aria-label", `Open the full ${model.name} brochure`);
    modelButtons.forEach(button => {
      const active = button.dataset.catalogModel === modelKey;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    detailButtons.forEach(button => {
      const active = button.dataset.catalogTab === tabKey;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    renderColors(model);
    renderDetail(model);
  };

  modelButtons.forEach(button => button.addEventListener("click", () => {
    modelKey = button.dataset.catalogModel;
    tabKey = "overview";
    updateAddress();
    renderModel();
  }));
  detailButtons.forEach(button => button.addEventListener("click", () => {
    tabKey = button.dataset.catalogTab;
    detailButtons.forEach(tab => {
      const active = tab === button;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    updateAddress();
    renderDetail(catalogModels[modelKey]);
  }));
  renderModel();
}
