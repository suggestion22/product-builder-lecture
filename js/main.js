(function () {
  const data = window.NameForgeData;

  function getGenerators() {
    return data ? data.generators : [];
  }

  function createGeneratorCard(generator) {
    const card = document.createElement("article");
    card.className = "generator-card";
    card.dataset.category = generator.category;
    card.innerHTML = `
      <div class="card-icon" aria-hidden="true">${getIcon(generator.slug)}</div>
      <p class="card-kicker">${generator.category}</p>
      <h3>${generator.title}</h3>
      <p>${generator.description}</p>
      <a class="text-link" href="generator.html?type=${generator.slug}">Open generator</a>
    `;
    return card;
  }

  function getIcon(slug) {
    return { gaming: "🎮", youtube: "▶", business: "◆", fantasy: "✦", pet: "♡" }[slug] || "✧";
  }

  function renderPopular() {
    const target = document.querySelector("#popularGenerators");
    if (!target) return;
    getGenerators().forEach((generator) => target.appendChild(createGeneratorCard(generator)));
  }

  function renderGeneratorList() {
    const list = document.querySelector("#generatorList");
    const filters = document.querySelector("#categoryFilters");
    if (!list || !filters) return;

    const categories = ["All", ...new Set(getGenerators().map((generator) => generator.category))];
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.className = "filter-button";
      button.type = "button";
      button.textContent = category;
      button.dataset.category = category;
      if (category === "All") button.classList.add("active");
      filters.appendChild(button);
    });

    getGenerators().forEach((generator) => list.appendChild(createGeneratorCard(generator)));

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      filters.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const category = button.dataset.category;
      list.querySelectorAll(".generator-card").forEach((card) => {
        card.hidden = category !== "All" && card.dataset.category !== category;
      });
    });
  }

  function setupHeroGenerate() {
    const form = document.querySelector("#heroGenerateForm");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const keyword = new FormData(form).get("keyword") || "";
      window.location.href = `generator.html?type=business&q=${encodeURIComponent(keyword)}`;
    });
  }

  function setupMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
  }

  function renderFavoritesPage() {
    const target = document.querySelector("#favoritesList");
    const storage = window.NameForgeStorage;
    if (!target || !storage) return;

    function draw() {
      const favorites = storage.getFavorites();
      target.innerHTML = "";
      if (!favorites.length) {
        target.innerHTML = '<p class="empty-state">No favorites yet. Generate names and save your strongest ideas here.</p>';
        return;
      }
      favorites.forEach((favorite) => {
        const card = document.createElement("article");
        card.className = "result-card";
        card.innerHTML = `
          <p class="card-kicker">${favorite.category}</p>
          <h3>${favorite.name}</h3>
          <p>${favorite.meaning}</p>
          <dl><dt>Best for</dt><dd>${favorite.bestFor}</dd><dt>Style</dt><dd>${favorite.style}</dd></dl>
          <button class="button ghost" type="button" data-remove="${favorite.id}">Remove</button>
        `;
        target.appendChild(card);
      });
    }

    target.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      storage.removeFavorite(button.dataset.remove);
      draw();
    });
    draw();
  }

  renderPopular();
  renderGeneratorList();
  renderFavoritesPage();
  setupHeroGenerate();
  setupMobileNav();
})();
