(function () {
  const generators = window.NameForgeData.generators;
  const storage = window.NameForgeStorage;
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || "gaming";
  const generator = generators.find((item) => item.slug === type) || generators[0];
  const initialKeyword = params.get("q") || "";

  const panel = document.querySelector("#generatorPanel");
  const results = document.querySelector("#resultGrid");
  const content = document.querySelector("#generatorContent");

  const syllables = {
    gaming: ["vex", "nova", "rift", "dash", "zero", "flux", "bolt", "kai"],
    youtube: ["daily", "pixel", "bright", "loop", "craft", "nest", "spark", "story"],
    business: ["core", "luma", "vela", "north", "forge", "axis", "nexa", "ora"],
    fantasy: ["ael", "dor", "wyn", "thorn", "vale", "myr", "ember", "loria"],
    pet: ["mochi", "biscuit", "lulu", "pip", "coco", "sunny", "bean", "nori"]
  };

  function titleCase(value) {
    return value
      .replace(/[^a-z0-9]+/gi, " ")
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("");
  }

  function choice(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function renderPanel() {
    document.title = `${generator.title} - NameForge`;
    panel.innerHTML = `
      <div>
        <p class="eyebrow">${generator.category}</p>
        <h1>${generator.title}</h1>
        <p>${generator.description}</p>
      </div>
      <form class="generator-form" id="nameForm">
        <label for="keyword">Keyword</label>
        <input id="keyword" name="keyword" type="text" value="${initialKeyword}" placeholder="${generator.placeholder}">
        <div class="form-grid">
          <label>Style<select name="style">${generator.styles.map((item) => `<option>${item}</option>`).join("")}</select></label>
          <label>Length<select name="length"><option>Short</option><option selected>Medium</option><option>Long</option></select></label>
          <label>Tone<select name="tone">${generator.tones.map((item) => `<option>${item}</option>`).join("")}</select></label>
        </div>
        <button class="button primary" type="submit">Generate 10 names</button>
      </form>
    `;
  }

  function makeName(keyword, style, length) {
    const bank = syllables[generator.slug] || syllables.business;
    const key = titleCase(keyword);
    const first = titleCase(choice(bank));
    const second = titleCase(choice(bank));
    const styleWord = titleCase(style);

    if (length === "Short") return `${key || first}${choice(["X", "ly", "io", ""])}`;
    if (length === "Long") return `${key || first}${styleWord}${second}`;
    return `${key || first}${second}`;
  }

  function buildResult(formData, index) {
    const keyword = formData.get("keyword").toString();
    const style = formData.get("style").toString();
    const length = formData.get("length").toString();
    const tone = formData.get("tone").toString();
    const name = makeName(keyword, style, length);
    return {
      id: `${generator.slug}-${name}-${style}-${index}`.toLowerCase(),
      name,
      category: generator.category,
      meaning: `${name} suggests a ${tone.toLowerCase()} ${generator.category.toLowerCase()} identity shaped around ${keyword || style.toLowerCase()} energy.`,
      bestFor: generator.title.replace(" Generator", "").toLowerCase(),
      style
    };
  }

  function renderResults(items) {
    results.innerHTML = "";
    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "result-card";
      card.innerHTML = `
        <p class="card-kicker">${item.category}</p>
        <h3>${item.name}</h3>
        <p>${item.meaning}</p>
        <dl><dt>Best for</dt><dd>${item.bestFor}</dd><dt>Style</dt><dd>${item.style}</dd></dl>
        <div class="button-row">
          <button class="button ghost" type="button" data-copy="${item.name}">Copy</button>
          <button class="button ghost" type="button" data-favorite="${item.id}">${storage.isFavorite(item.id) ? "Saved" : "Favorite"}</button>
        </div>
      `;
      card.favoriteItem = item;
      results.appendChild(card);
    });
  }

  function renderContent() {
    content.innerHTML = `
      <section class="content-card">
        <h2>What is this generator?</h2>
        <p>${generator.what}</p>
        <h2>How to use it</h2>
        <p>${generator.how}</p>
        <h2>Tips for choosing a good name</h2>
        <ul>${generator.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
        <h2>Example name styles</h2>
        <div class="pill-row">${generator.examples.map((example) => `<span>${example}</span>`).join("")}</div>
        <h2>FAQ</h2>
        ${generator.faqs.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("")}
        <h2>Related generators</h2>
        <div class="pill-row">${generator.related.map((slug) => {
          const related = generators.find((item) => item.slug === slug);
          return `<a href="generator.html?type=${related.slug}">${related.title}</a>`;
        }).join("")}<a href="naming-guide.html">Naming guide</a><a href="brand-name-checklist.html">Validation checklist</a></div>
      </section>
    `;
  }

  function setupEvents() {
    panel.querySelector("#nameForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      renderResults(Array.from({ length: 10 }, (_, index) => buildResult(formData, index)));
    });

    results.addEventListener("click", async (event) => {
      const copy = event.target.closest("[data-copy]");
      if (copy) {
        await navigator.clipboard.writeText(copy.dataset.copy);
        copy.textContent = "Copied";
        return;
      }
      const favorite = event.target.closest("[data-favorite]");
      if (favorite) {
        const card = favorite.closest(".result-card");
        storage.saveFavorite(card.favoriteItem);
        favorite.textContent = "Saved";
      }
    });
  }

  renderPanel();
  renderContent();
  setupEvents();
})();
