(function () {
  const generators = window.NameForgeData.generators;
  const storage = window.NameForgeStorage;
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || "gaming";
  const generator = generators.find((item) => item.slug === type) || generators[0];
  const initialKeyword = params.get("q") || "";
  const lang = localStorage.getItem("nameforge-language") || "en";

  const ui = {
    en: {
      keyword: "Keyword",
      style: "Style",
      length: "Length",
      tone: "Tone",
      short: "Short",
      medium: "Medium",
      long: "Long",
      generate: "Generate 10 names",
      resultsEyebrow: "Generated ideas",
      resultsTitle: "Results",
      empty: "Add a keyword and generate names to see ideas here.",
      favorites: "View favorites",
      bestFor: "Best for",
      copy: "Copy",
      copied: "Copied",
      favorite: "Favorite",
      saved: "Saved",
      meaning: (name, tone, category, seed) => `${name} suggests a ${tone.toLowerCase()} ${category.toLowerCase()} identity shaped around ${seed} energy.`
    },
    ko: {
      keyword: "키워드",
      style: "스타일",
      length: "길이",
      tone: "톤",
      short: "짧게",
      medium: "보통",
      long: "길게",
      generate: "이름 10개 생성",
      resultsEyebrow: "생성된 아이디어",
      resultsTitle: "결과",
      empty: "키워드를 입력하고 이름을 생성하면 결과가 표시됩니다.",
      favorites: "즐겨찾기 보기",
      bestFor: "추천 용도",
      copy: "복사",
      copied: "복사됨",
      favorite: "저장",
      saved: "저장됨",
      meaning: (name, tone, category, seed) => `${name}은 ${seed}의 분위기를 바탕으로 한 ${tone} 느낌의 ${category} 이름입니다.`
    },
    ja: {
      keyword: "キーワード",
      style: "スタイル",
      length: "長さ",
      tone: "トーン",
      short: "短め",
      medium: "標準",
      long: "長め",
      generate: "名前を10件生成",
      resultsEyebrow: "生成されたアイデア",
      resultsTitle: "結果",
      empty: "キーワードを入力して生成すると結果が表示されます。",
      favorites: "お気に入りを見る",
      bestFor: "おすすめ用途",
      copy: "コピー",
      copied: "コピー済み",
      favorite: "保存",
      saved: "保存済み",
      meaning: (name, tone, category, seed) => `${name}は、${seed}の雰囲気をもとにした${tone}印象の${category}向けネームです。`
    }
  }[lang] || {};

  const localized = {
    en: {
      categories: { Gaming: "Gaming", Creator: "Creator", Business: "Business", Fantasy: "Fantasy", Lifestyle: "Lifestyle" },
      bestFor: { gaming: "game profiles and clans", youtube: "creator channels", business: "brands and products", fantasy: "characters and worlds", pet: "pets and friendly projects" },
      styles: {
        gaming: ["Sharp", "Cyber", "Arcade", "Elite"],
        youtube: ["Studio", "Personal", "Viral", "Editorial"],
        business: ["Modern", "Premium", "Minimal", "Invented"],
        fantasy: ["Elven", "Ancient", "Dark", "Heroic"],
        pet: ["Cute", "Classic", "Foodie", "Tiny"]
      },
      tones: {
        gaming: ["Cool", "Aggressive", "Mysterious", "Playful"],
        youtube: ["Friendly", "Bold", "Smart", "Warm"],
        business: ["Trustworthy", "Fresh", "Professional", "Global"],
        fantasy: ["Mythic", "Elegant", "Ominous", "Noble"],
        pet: ["Sweet", "Funny", "Gentle", "Cheerful"]
      },
      banks: {
        gaming: ["vex", "nova", "rift", "dash", "zero", "flux", "bolt", "kai"],
        youtube: ["daily", "pixel", "bright", "loop", "craft", "nest", "spark", "story"],
        business: ["core", "luma", "vela", "north", "forge", "axis", "nexa", "ora"],
        fantasy: ["ael", "dor", "wyn", "thorn", "vale", "myr", "ember", "loria"],
        pet: ["mochi", "biscuit", "lulu", "pip", "coco", "sunny", "bean", "nori"]
      },
      variants: ["Prime", "Arc", "Verse", "Lab", "Wave", "Path", "Hive", "Works"],
      suffixes: ["X", "ly", "io", ""]
    },
    ko: {
      categories: { Gaming: "게임", Creator: "크리에이터", Business: "비즈니스", Fantasy: "판타지", Lifestyle: "라이프스타일" },
      bestFor: { gaming: "게임 프로필과 클랜", youtube: "크리에이터 채널", business: "브랜드와 제품", fantasy: "캐릭터와 세계관", pet: "반려동물과 친근한 프로젝트" },
      styles: {
        gaming: ["강렬한", "사이버", "아케이드", "엘리트"],
        youtube: ["스튜디오", "개인형", "바이럴", "매거진형"],
        business: ["모던", "프리미엄", "미니멀", "조어형"],
        fantasy: ["엘프풍", "고대풍", "어두운", "영웅적"],
        pet: ["귀여운", "클래식", "푸드", "작고 아담한"]
      },
      tones: {
        gaming: ["멋진", "공격적인", "신비로운", "장난스러운"],
        youtube: ["친근한", "대담한", "똑똑한", "따뜻한"],
        business: ["신뢰감 있는", "신선한", "전문적인", "글로벌한"],
        fantasy: ["신화적인", "우아한", "음산한", "고귀한"],
        pet: ["사랑스러운", "재미있는", "부드러운", "밝은"]
      },
      banks: {
        gaming: ["섀도", "네온", "블리츠", "스톰", "제로", "레이븐", "카이", "볼트"],
        youtube: ["데일리", "픽셀", "브라이트", "루프", "크래프트", "네스트", "스파크", "로그"],
        business: ["코어", "루마", "벨라", "노스", "포지", "엑시스", "넥사", "오라"],
        fantasy: ["아엘", "도르", "윈", "가온", "루나", "미르", "엘라", "아린"],
        pet: ["모찌", "보리", "루루", "콩이", "초코", "두부", "나리", "해피"]
      },
      variants: ["프라임", "아크", "웨이브", "랩", "하이브", "루트", "포인트", "웍스"],
      suffixes: ["", "온", "아", "빛"]
    },
    ja: {
      categories: { Gaming: "ゲーム", Creator: "クリエイター", Business: "ビジネス", Fantasy: "ファンタジー", Lifestyle: "ライフスタイル" },
      bestFor: { gaming: "ゲームプロフィールとクラン", youtube: "クリエイターチャンネル", business: "ブランドと商品", fantasy: "キャラクターと世界観", pet: "ペットと親しみやすいプロジェクト" },
      styles: {
        gaming: ["シャープ", "サイバー", "アーケード", "エリート"],
        youtube: ["スタジオ", "パーソナル", "バイラル", "エディトリアル"],
        business: ["モダン", "プレミアム", "ミニマル", "造語風"],
        fantasy: ["エルフ風", "古代風", "ダーク", "英雄的"],
        pet: ["かわいい", "クラシック", "フード系", "小さめ"]
      },
      tones: {
        gaming: ["クールな", "攻撃的な", "神秘的な", "遊び心のある"],
        youtube: ["親しみやすい", "大胆な", "知的な", "温かい"],
        business: ["信頼感のある", "新鮮な", "専門的な", "グローバルな"],
        fantasy: ["神話的な", "優雅な", "不穏な", "高貴な"],
        pet: ["甘い", "面白い", "やさしい", "明るい"]
      },
      banks: {
        gaming: ["カゲ", "ネオン", "ライガ", "ゼロ", "ブリッツ", "カイ", "レン", "ボルト"],
        youtube: ["デイリー", "ピクセル", "ブライト", "ループ", "クラフト", "ネスト", "スパーク", "ログ"],
        business: ["コア", "ルマ", "ベラ", "ノース", "フォージ", "アクシス", "ネクサ", "オーラ"],
        fantasy: ["アエル", "ドル", "ウィン", "ルナ", "ミル", "エラ", "アリン", "セラ"],
        pet: ["モチ", "ココ", "ルル", "マロン", "ソラ", "ナナ", "ポポ", "ハル"]
      },
      variants: ["プライム", "アーク", "ウェーブ", "ラボ", "ハイブ", "ルート", "ポイント", "ワークス"],
      suffixes: ["", "ア", "ン", "ル"]
    }
  }[lang] || {};

  const panel = document.querySelector("#generatorPanel");
  const results = document.querySelector("#resultGrid");
  const content = document.querySelector("#generatorContent");

  function choice(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function normalizeKeyword(value) {
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (lang === "en") {
      return trimmed
        .replace(/[^a-z0-9]+/gi, " ")
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join("");
    }
    return trimmed.replace(/\s+/g, "");
  }

  function renderPanel() {
    const styles = localized.styles[generator.slug] || localized.styles.business;
    const tones = localized.tones[generator.slug] || localized.tones.business;
    document.title = `${generator.title} - NameForge`;
    panel.innerHTML = `
      <div>
        <p class="eyebrow">${localized.categories[generator.category] || generator.category}</p>
        <h1>${generator.title}</h1>
        <p>${generator.description}</p>
      </div>
      <form class="generator-form" id="nameForm">
        <label for="keyword">${ui.keyword}</label>
        <input id="keyword" name="keyword" type="text" value="${initialKeyword}" placeholder="${generator.placeholder}">
        <div class="form-grid">
          <label>${ui.style}<select name="style">${styles.map((item) => `<option>${item}</option>`).join("")}</select></label>
          <label>${ui.length}<select name="length"><option value="Short">${ui.short}</option><option value="Medium" selected>${ui.medium}</option><option value="Long">${ui.long}</option></select></label>
          <label>${ui.tone}<select name="tone">${tones.map((item) => `<option>${item}</option>`).join("")}</select></label>
        </div>
        <button class="button primary" type="submit">${ui.generate}</button>
      </form>
    `;
  }

  function makeName(keyword, style, length, attempt = 0) {
    const bank = localized.banks[generator.slug] || localized.banks.business;
    const key = normalizeKeyword(keyword);
    const first = normalizeKeyword(choice(bank));
    const second = normalizeKeyword(choice(bank));
    const styleWord = normalizeKeyword(style);
    const variant = normalizeKeyword(localized.variants[attempt % localized.variants.length]);

    if (length === "Short") return `${key || first}${attempt > 0 ? variant : choice(localized.suffixes)}`;
    if (length === "Long") return `${key || first}${styleWord}${second}${attempt > 0 ? variant : ""}`;
    return `${key || first}${second}${attempt > 0 ? variant : ""}`;
  }

  function buildResult(formData, index, usedNames) {
    const keyword = formData.get("keyword").toString();
    const style = formData.get("style").toString();
    const length = formData.get("length").toString();
    const tone = formData.get("tone").toString();
    let name = "";
    let attempt = 0;

    do {
      name = makeName(keyword, style, length, attempt);
      attempt += 1;
    } while (usedNames.has(name) && attempt < 40);

    usedNames.add(name);
    const category = localized.categories[generator.category] || generator.category;
    const seed = keyword.trim() || style;

    return {
      id: `${lang}-${generator.slug}-${name}-${style}-${index}`.toLowerCase(),
      name,
      category,
      meaning: ui.meaning(name, tone, category, seed),
      bestFor: localized.bestFor[generator.slug],
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
        <dl><dt>${ui.bestFor}</dt><dd>${item.bestFor}</dd><dt>${ui.style}</dt><dd>${item.style}</dd></dl>
        <div class="button-row">
          <button class="button ghost" type="button" data-copy="${item.name}">${ui.copy}</button>
          <button class="button ghost" type="button" data-favorite="${item.id}">${storage.isFavorite(item.id) ? ui.saved : ui.favorite}</button>
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
      const usedNames = new Set();
      renderResults(Array.from({ length: 10 }, (_, index) => buildResult(formData, index, usedNames)));
    });

    results.addEventListener("click", async (event) => {
      const copyButton = event.target.closest("[data-copy]");
      if (copyButton) {
        await navigator.clipboard.writeText(copyButton.dataset.copy);
        copyButton.textContent = ui.copied;
        return;
      }
      const favorite = event.target.closest("[data-favorite]");
      if (favorite) {
        const card = favorite.closest(".result-card");
        storage.saveFavorite(card.favoriteItem);
        favorite.textContent = ui.saved;
      }
    });
  }

  renderPanel();
  renderContent();
  setupEvents();
  document.querySelector("#results-title").textContent = ui.resultsTitle;
  document.querySelector("[aria-labelledby='results-title'] .eyebrow").textContent = ui.resultsEyebrow;
  document.querySelector(".section-heading.split .text-link").textContent = ui.favorites;
  document.querySelector("#resultGrid .empty-state").textContent = ui.empty;
})();
