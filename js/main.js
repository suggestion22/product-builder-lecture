(function () {
  const data = window.NameForgeData;
  const THEME_KEY = "nameforge-theme";
  const LANG_KEY = "nameforge-language";
  const supportedLanguages = ["en", "ko", "ja"];

  const dictionary = {
    en: {
      nav: {
        "generators.html": "Generators",
        "#categories": "Categories",
        "generators.html#categories": "Categories",
        "favorites.html": "Favorites",
        "blog.html": "Blog",
        "about.html": "About",
        "contact.html": "Contact"
      },
      ui: {
        dark: "Dark",
        light: "Light",
        switchDark: "Switch to dark mode",
        switchLight: "Switch to light mode",
        menuOpen: "Open navigation",
        menuClose: "Close navigation",
        openGenerator: "Open generator",
        all: "All",
        remove: "Remove",
        bestFor: "Best for",
        style: "Style",
        emptyFavorites: "No favorites yet. Generate names and save your strongest ideas here."
      },
      pages: {
        "/index.html": [
          [".hero .eyebrow", "AI-style naming tools for every idea"],
          [".hero h1", "Forge the perfect name."],
          [".hero-copy", "Generate unique names for games, creators, brands, fantasy worlds, pets, and more."],
          ["#heroKeyword", "Try: neon, cozy, dragon, studio...", "placeholder"],
          [".hero-search .button", "Generate"],
          ["#category-title", "Start with a creative direction"],
          ["#popular-title", "Name tools people use first"],
          ["#how-title", "From rough idea to useful shortlist"],
          ["#guide-title", "Learn how to choose names that last"]
        ],
        "/generators.html": [
          [".page-hero .eyebrow", "Generator library"],
          [".page-hero h1", "Explore Name Generators"],
          [".page-hero p", "Choose a focused tool for the kind of name you need, then tune it with your own keywords and style."],
          ["#filters-title", "Filter by category"]
        ],
        "/favorites.html": [
          [".page-hero .eyebrow", "Local shortlist"],
          [".page-hero h1", "Saved Favorites"],
          [".page-hero p", "Your favorite names are stored only in this browser using localStorage."]
        ],
        "/contact.html": [
          [".page-hero .eyebrow", "Contact"],
          [".page-hero h1", "Partnership inquiries"],
          [".page-hero p", "Send a short message about partnerships, feedback, or collaboration opportunities."],
          ["label[for='name']", "Name"],
          ["#name", "Your name", "placeholder"],
          ["label[for='email']", "Email"],
          ["#email", "you@example.com", "placeholder"],
          ["label[for='message']", "Message"],
          ["#message", "Tell us what you would like to discuss.", "placeholder"],
          [".contact-form .button", "Send inquiry"]
        ],
        "/about.html": [
          [".page-hero .eyebrow", "About"],
          [".page-hero h1", "NameForge helps ideas find names."],
          [".page-hero p", "NameForge is a clean, global naming platform MVP for people who need practical name ideas without a complicated workflow."]
        ],
        "/blog.html": [
          [".page-hero .eyebrow", "Editorial library"],
          [".page-hero h1", "Naming guides for better decisions."],
          [".page-hero p", "Generators are useful for exploration, but strong names also need judgment. These original guides explain how to evaluate, refine, and safely shortlist names."]
        ]
      },
      categories: {
        Gaming: "Gaming",
        Creator: "Creator",
        Business: "Business",
        Fantasy: "Fantasy",
        Lifestyle: "Lifestyle"
      },
      generators: {
        gaming: ["Gamertag Generator", "Create short, sharp, energetic names for competitive games, clans, and online profiles."],
        youtube: ["YouTube Name Generator", "Find creator-style channel names that feel memorable, flexible, and easy to brand."],
        business: ["Business Name Generator", "Generate clean, brandable names for startups, products, studios, agencies, and small businesses."],
        fantasy: ["Fantasy Name Generator", "Create mythical and worldbuilding-style names for characters, places, clans, kingdoms, and artifacts."],
        pet: ["Pet Name Generator", "Find cute, friendly, everyday names for dogs, cats, small pets, and playful projects."]
      },
      staticCards: {
        categories: [
          ["Gaming", "Cool handles and player tags"],
          ["Creator", "Channel and creator names"],
          ["Business", "Brandable startup names"],
          ["Fantasy", "Worlds, characters, and lore"],
          ["Lifestyle", "Friendly pet and project names"]
        ],
        steps: [
          ["Choose a category", "Pick the generator closest to your naming goal."],
          ["Add your style", "Use keywords, tone, and length to guide the output."],
          ["Generate and save names", "Copy favorites or save them locally for later review."]
        ],
        guides: [
          ["Guide", "How to choose a memorable name", "A practical framework for making names easy to say, easy to remember, and flexible enough for future ideas.", "Read guide"],
          ["Checklist", "Brand name validation checklist", "Use this checklist before you commit to a business, product, channel, or community name.", "Open checklist"],
          ["Creator names", "Creator naming strategy", "Understand when to use a personal name, niche keyword, invented word, or studio-style identity.", "Explore strategy"]
        ],
        blog: [
          ["Naming fundamentals", "How to choose a memorable name", "Learn a simple scoring method for clarity, sound, recall, flexibility, and distinctiveness.", "Read the guide"],
          ["Brand safety", "Brand name validation checklist", "A pre-launch review process for domain checks, search conflicts, pronunciation, and audience fit.", "Open checklist"],
          ["Creator strategy", "Creator naming strategy", "Compare personal brands, niche names, studio names, and invented names before choosing a channel identity.", "Explore strategy"]
        ]
      }
    },
    ko: {
      nav: {
        "generators.html": "생성기",
        "#categories": "카테고리",
        "generators.html#categories": "카테고리",
        "favorites.html": "즐겨찾기",
        "blog.html": "블로그",
        "about.html": "소개",
        "contact.html": "문의"
      },
      ui: {
        dark: "다크",
        light: "라이트",
        switchDark: "다크 모드로 전환",
        switchLight: "라이트 모드로 전환",
        menuOpen: "내비게이션 열기",
        menuClose: "내비게이션 닫기",
        openGenerator: "생성기 열기",
        all: "전체",
        remove: "삭제",
        bestFor: "추천 용도",
        style: "스타일",
        emptyFavorites: "아직 저장한 이름이 없습니다. 이름을 생성한 뒤 마음에 드는 아이디어를 저장해 보세요."
      },
      pages: {
        "/index.html": [
          [".hero .eyebrow", "아이디어를 위한 AI 스타일 네이밍 도구"],
          [".hero h1", "완벽한 이름을 만들어 보세요."],
          [".hero-copy", "게임, 크리에이터, 브랜드, 판타지 세계, 반려동물 등을 위한 독창적인 이름을 생성하세요."],
          ["#heroKeyword", "예: neon, cozy, dragon, studio...", "placeholder"],
          [".hero-search .button", "생성하기"],
          ["#category-title", "창작 방향부터 선택하세요"],
          ["#popular-title", "가장 많이 쓰는 이름 생성기"],
          ["#how-title", "막연한 아이디어를 유용한 후보로"],
          ["#guide-title", "오래 쓰는 이름을 고르는 법"]
        ],
        "/generators.html": [
          [".page-hero .eyebrow", "생성기 라이브러리"],
          [".page-hero h1", "이름 생성기 둘러보기"],
          [".page-hero p", "목적에 맞는 도구를 선택하고 키워드와 스타일로 결과를 조정하세요."],
          ["#filters-title", "카테고리 필터"]
        ],
        "/favorites.html": [
          [".page-hero .eyebrow", "로컬 후보 목록"],
          [".page-hero h1", "저장한 이름"],
          [".page-hero p", "즐겨찾기는 이 브라우저의 localStorage에만 저장됩니다."]
        ],
        "/contact.html": [
          [".page-hero .eyebrow", "문의"],
          [".page-hero h1", "제휴 문의"],
          [".page-hero p", "제휴, 피드백, 협업 기회에 대해 간단히 메시지를 보내 주세요."],
          ["label[for='name']", "이름"],
          ["#name", "이름을 입력하세요", "placeholder"],
          ["label[for='email']", "이메일"],
          ["#email", "you@example.com", "placeholder"],
          ["label[for='message']", "메시지"],
          ["#message", "논의하고 싶은 내용을 알려 주세요.", "placeholder"],
          [".contact-form .button", "문의 보내기"]
        ],
        "/about.html": [
          [".page-hero .eyebrow", "소개"],
          [".page-hero h1", "NameForge는 아이디어가 이름을 찾도록 돕습니다."],
          [".page-hero p", "NameForge는 복잡한 과정 없이 실용적인 이름 아이디어가 필요한 사람들을 위한 글로벌 네이밍 플랫폼 MVP입니다."]
        ],
        "/blog.html": [
          [".page-hero .eyebrow", "콘텐츠 라이브러리"],
          [".page-hero h1", "더 나은 선택을 위한 네이밍 가이드"],
          [".page-hero p", "생성기는 탐색에 유용하지만 좋은 이름에는 판단 기준도 필요합니다. 이 가이드는 이름을 평가하고 다듬는 방법을 설명합니다."]
        ]
      },
      categories: {
        Gaming: "게임",
        Creator: "크리에이터",
        Business: "비즈니스",
        Fantasy: "판타지",
        Lifestyle: "라이프스타일"
      },
      generators: {
        gaming: ["게이머태그 생성기", "경쟁 게임, 클랜, 온라인 프로필에 어울리는 짧고 강한 이름을 만듭니다."],
        youtube: ["유튜브 이름 생성기", "기억하기 쉽고 브랜드화하기 좋은 크리에이터형 채널 이름을 찾아보세요."],
        business: ["비즈니스 이름 생성기", "스타트업, 제품, 스튜디오, 에이전시, 소규모 비즈니스를 위한 깔끔한 브랜드 이름을 생성합니다."],
        fantasy: ["판타지 이름 생성기", "캐릭터, 장소, 클랜, 왕국, 유물에 어울리는 신화적이고 세계관 있는 이름을 만듭니다."],
        pet: ["반려동물 이름 생성기", "강아지, 고양이, 작은 반려동물과 귀여운 프로젝트에 어울리는 친근한 이름을 찾아보세요."]
      },
      staticCards: {
        categories: [
          ["게임", "멋진 핸들과 플레이어 태그"],
          ["크리에이터", "채널과 크리에이터 이름"],
          ["비즈니스", "브랜드화하기 좋은 스타트업 이름"],
          ["판타지", "세계관, 캐릭터, 설정 이름"],
          ["라이프스타일", "친근한 반려동물과 프로젝트 이름"]
        ],
        steps: [
          ["카테고리 선택", "목표에 가장 가까운 이름 생성기를 고르세요."],
          ["스타일 추가", "키워드, 톤, 길이로 결과 방향을 조정하세요."],
          ["생성하고 저장", "마음에 드는 이름을 복사하거나 로컬에 저장하세요."]
        ],
        guides: [
          ["가이드", "기억에 남는 이름 고르는 법", "말하기 쉽고 기억하기 쉬우며 앞으로의 아이디어에도 유연한 이름을 고르는 실전 기준입니다.", "가이드 읽기"],
          ["체크리스트", "브랜드 이름 검증 체크리스트", "비즈니스, 제품, 채널, 커뮤니티 이름을 확정하기 전에 확인해야 할 항목입니다.", "체크리스트 보기"],
          ["크리에이터 이름", "크리에이터 네이밍 전략", "개인 이름, 니치 키워드, 조어, 스튜디오형 정체성을 언제 써야 하는지 비교합니다.", "전략 보기"]
        ],
        blog: [
          ["네이밍 기본기", "기억에 남는 이름 고르는 법", "명확성, 소리, 기억성, 확장성, 차별성을 평가하는 간단한 방법을 배웁니다.", "가이드 읽기"],
          ["브랜드 안전성", "브랜드 이름 검증 체크리스트", "도메인, 검색 충돌, 발음, 대상 고객 적합성을 출시 전에 검토하는 과정입니다.", "체크리스트 보기"],
          ["크리에이터 전략", "크리에이터 네이밍 전략", "채널 정체성을 고르기 전에 개인 브랜드, 니치 이름, 스튜디오 이름, 조어를 비교합니다.", "전략 보기"]
        ]
      }
    },
    ja: {
      nav: {
        "generators.html": "ジェネレーター",
        "#categories": "カテゴリー",
        "generators.html#categories": "カテゴリー",
        "favorites.html": "お気に入り",
        "blog.html": "ブログ",
        "about.html": "概要",
        "contact.html": "お問い合わせ"
      },
      ui: {
        dark: "ダーク",
        light: "ライト",
        switchDark: "ダークモードに切り替え",
        switchLight: "ライトモードに切り替え",
        menuOpen: "ナビゲーションを開く",
        menuClose: "ナビゲーションを閉じる",
        openGenerator: "ジェネレーターを開く",
        all: "すべて",
        remove: "削除",
        bestFor: "おすすめ用途",
        style: "スタイル",
        emptyFavorites: "保存した名前はまだありません。名前を生成して気に入ったアイデアを保存してください。"
      },
      pages: {
        "/index.html": [
          [".hero .eyebrow", "アイデアのためのAI風ネーミングツール"],
          [".hero h1", "理想の名前を作りましょう。"],
          [".hero-copy", "ゲーム、クリエイター、ブランド、ファンタジー世界、ペットなどのユニークな名前を生成します。"],
          ["#heroKeyword", "例: neon, cozy, dragon, studio...", "placeholder"],
          [".hero-search .button", "生成"],
          ["#category-title", "まず方向性を選ぶ"],
          ["#popular-title", "人気の名前ジェネレーター"],
          ["#how-title", "ラフなアイデアを候補リストへ"],
          ["#guide-title", "長く使える名前の選び方"]
        ],
        "/generators.html": [
          [".page-hero .eyebrow", "ジェネレーターライブラリ"],
          [".page-hero h1", "名前ジェネレーターを探す"],
          [".page-hero p", "目的に合うツールを選び、キーワードとスタイルで結果を調整できます。"],
          ["#filters-title", "カテゴリーで絞り込み"]
        ],
        "/favorites.html": [
          [".page-hero .eyebrow", "ローカル候補リスト"],
          [".page-hero h1", "保存した名前"],
          [".page-hero p", "お気に入りはこのブラウザのlocalStorageにのみ保存されます。"]
        ],
        "/contact.html": [
          [".page-hero .eyebrow", "お問い合わせ"],
          [".page-hero h1", "提携のお問い合わせ"],
          [".page-hero p", "提携、フィードバック、協業について短いメッセージをお送りください。"],
          ["label[for='name']", "名前"],
          ["#name", "お名前", "placeholder"],
          ["label[for='email']", "メール"],
          ["#email", "you@example.com", "placeholder"],
          ["label[for='message']", "メッセージ"],
          ["#message", "相談したい内容を入力してください。", "placeholder"],
          [".contact-form .button", "送信"]
        ],
        "/about.html": [
          [".page-hero .eyebrow", "概要"],
          [".page-hero h1", "NameForgeはアイデアに名前を見つけます。"],
          [".page-hero p", "NameForgeは、実用的な名前アイデアをすばやく探したい人のためのグローバルなネーミングMVPです。"]
        ],
        "/blog.html": [
          [".page-hero .eyebrow", "編集ライブラリ"],
          [".page-hero h1", "より良い判断のためのネーミングガイド"],
          [".page-hero p", "ジェネレーターは探索に便利ですが、強い名前には判断基準も必要です。これらのガイドは名前の評価と改善方法を説明します。"]
        ]
      },
      categories: {
        Gaming: "ゲーム",
        Creator: "クリエイター",
        Business: "ビジネス",
        Fantasy: "ファンタジー",
        Lifestyle: "ライフスタイル"
      },
      generators: {
        gaming: ["ゲーマータグジェネレーター", "対戦ゲーム、クラン、オンラインプロフィール向けの短く印象的な名前を作成します。"],
        youtube: ["YouTube名前ジェネレーター", "覚えやすく、ブランド化しやすいクリエイター向けチャンネル名を探せます。"],
        business: ["ビジネス名ジェネレーター", "スタートアップ、商品、スタジオ、代理店、小規模ビジネス向けの洗練された名前を生成します。"],
        fantasy: ["ファンタジー名前ジェネレーター", "キャラクター、場所、クラン、王国、アーティファクト向けの神話的な名前を作成します。"],
        pet: ["ペット名前ジェネレーター", "犬、猫、小さなペット、かわいいプロジェクトに合う親しみやすい名前を探せます。"]
      },
      staticCards: {
        categories: [
          ["ゲーム", "クールなハンドル名とプレイヤータグ"],
          ["クリエイター", "チャンネル名とクリエイター名"],
          ["ビジネス", "ブランド化しやすいスタートアップ名"],
          ["ファンタジー", "世界観、キャラクター、設定名"],
          ["ライフスタイル", "親しみやすいペットとプロジェクト名"]
        ],
        steps: [
          ["カテゴリーを選ぶ", "目的に最も近い名前ジェネレーターを選びます。"],
          ["スタイルを追加", "キーワード、トーン、長さで出力の方向を調整します。"],
          ["生成して保存", "気に入った名前をコピーしたりローカルに保存できます。"]
        ],
        guides: [
          ["ガイド", "覚えやすい名前の選び方", "言いやすく、覚えやすく、将来のアイデアにも対応できる名前を選ぶ実践的な基準です。", "ガイドを読む"],
          ["チェックリスト", "ブランド名検証チェックリスト", "ビジネス、商品、チャンネル、コミュニティ名を決める前に確認する項目です。", "チェックリストを見る"],
          ["クリエイター名", "クリエイターのネーミング戦略", "個人名、ニッチキーワード、造語、スタジオ型の名前をいつ使うべきか比較します。", "戦略を見る"]
        ],
        blog: [
          ["ネーミングの基本", "覚えやすい名前の選び方", "明確さ、音、記憶しやすさ、柔軟性、独自性を評価する簡単な方法を学びます。", "ガイドを読む"],
          ["ブランド安全性", "ブランド名検証チェックリスト", "ドメイン、検索上の衝突、発音、対象読者との適合性を公開前に確認する流れです。", "チェックリストを見る"],
          ["クリエイター戦略", "クリエイターのネーミング戦略", "チャンネルの identity を決める前に、個人ブランド、ニッチ名、スタジオ名、造語を比較します。", "戦略を見る"]
        ]
      }
    }
  };

  function getLanguage() {
    const saved = localStorage.getItem(LANG_KEY);
    if (supportedLanguages.includes(saved)) return saved;
    return "en";
  }

  function getCopy() {
    return dictionary[getLanguage()];
  }

  function getGenerators() {
    return data ? data.generators : [];
  }

  function getIcon(slug) {
    return { gaming: "GM", youtube: "YT", business: "BN", fantasy: "FY", pet: "PT" }[slug] || "NF";
  }

  function localizeCategory(category) {
    return getCopy().categories[category] || category;
  }

  function createGeneratorCard(generator) {
    const copy = getCopy();
    const translated = copy.generators[generator.slug] || [generator.title, generator.description];
    const card = document.createElement("article");
    card.className = "generator-card";
    card.dataset.category = generator.category;
    card.innerHTML = `
      <div class="card-icon" aria-hidden="true">${getIcon(generator.slug)}</div>
      <p class="card-kicker">${localizeCategory(generator.category)}</p>
      <h3>${translated[0]}</h3>
      <p>${translated[1]}</p>
      <a class="text-link" href="generator.html?type=${generator.slug}">${copy.ui.openGenerator}</a>
    `;
    return card;
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const button = document.querySelector("#themeToggle");
    if (!button) return;
    const isDark = theme === "dark";
    const copy = getCopy();
    button.textContent = isDark ? copy.ui.light : copy.ui.dark;
    button.setAttribute("aria-label", isDark ? copy.ui.switchLight : copy.ui.switchDark);
  }

  function setupTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(theme);
    const button = document.querySelector("#themeToggle");
    if (!button) return;
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  function setupLanguage() {
    const select = document.querySelector("#languageSelect");
    if (!select) return;
    select.value = getLanguage();
    select.addEventListener("change", () => {
      localStorage.setItem(LANG_KEY, select.value);
      window.location.reload();
    });
  }

  function translateNavigation() {
    const copy = getCopy();
    document.documentElement.lang = getLanguage();
    document.querySelectorAll(".site-nav a, .site-footer a").forEach((link) => {
      const key = link.getAttribute("href");
      if (copy.nav[key]) link.textContent = copy.nav[key];
    });
    const toggle = document.querySelector(".nav-toggle");
    if (toggle) {
      toggle.textContent = "Menu";
      toggle.setAttribute("aria-label", copy.ui.menuOpen);
    }
  }

  function translatePageText() {
    const path = window.location.pathname.endsWith("/") ? "/index.html" : `/${window.location.pathname.split("/").pop()}`;
    const replacements = getCopy().pages[path] || [];
    replacements.forEach(([selector, value, attr]) => {
      const node = document.querySelector(selector);
      if (!node) return;
      if (attr) node.setAttribute(attr, value);
      else node.textContent = value;
    });
  }

  function translateStaticCards() {
    const copy = getCopy();

    document.querySelectorAll(".category-card").forEach((card, index) => {
      const text = copy.staticCards.categories[index];
      if (!text) return;
      card.querySelector("strong").textContent = text[0];
      card.querySelector("small").textContent = text[1];
    });

    document.querySelectorAll(".step-card").forEach((card, index) => {
      const text = copy.staticCards.steps[index];
      if (!text) return;
      card.querySelector("h3").textContent = text[0];
      card.querySelector("p").textContent = text[1];
    });

    document.querySelectorAll("a[href='naming-guide.html']").forEach((link) => translateGuideLinkCard(link, 0));
    document.querySelectorAll("a[href='brand-name-checklist.html']").forEach((link) => translateGuideLinkCard(link, 1));
    document.querySelectorAll("a[href='creator-name-strategy.html']").forEach((link) => translateGuideLinkCard(link, 2));
  }

  function translateGuideLinkCard(link, index) {
    const copy = getCopy();
    const card = link.closest(".generator-card");
    if (!card) return;
    const source = window.location.pathname.endsWith("blog.html") ? copy.staticCards.blog : copy.staticCards.guides;
    const text = source[index];
    if (!text) return;
    const kicker = card.querySelector(".card-kicker");
    const heading = card.querySelector("h2, h3");
    const description = card.querySelector("p:not(.card-kicker)");
    if (kicker) kicker.textContent = text[0];
    if (heading) heading.textContent = text[1];
    if (description) description.textContent = text[2];
    link.textContent = text[3];
  }

  function renderPopular() {
    const target = document.querySelector("#popularGenerators");
    if (!target) return;
    target.innerHTML = "";
    getGenerators().forEach((generator) => target.appendChild(createGeneratorCard(generator)));
  }

  function renderGeneratorList() {
    const list = document.querySelector("#generatorList");
    const filters = document.querySelector("#categoryFilters");
    if (!list || !filters) return;

    const copy = getCopy();
    const categories = ["All", ...new Set(getGenerators().map((generator) => generator.category))];
    filters.innerHTML = "";
    list.innerHTML = "";

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.className = "filter-button";
      button.type = "button";
      button.textContent = category === "All" ? copy.ui.all : localizeCategory(category);
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
      toggle.setAttribute("aria-label", isOpen ? getCopy().ui.menuClose : getCopy().ui.menuOpen);
    });
  }

  function renderFavoritesPage() {
    const target = document.querySelector("#favoritesList");
    const storage = window.NameForgeStorage;
    if (!target || !storage) return;

    function draw() {
      const copy = getCopy();
      const favorites = storage.getFavorites();
      target.innerHTML = "";
      if (!favorites.length) {
        target.innerHTML = `<p class="empty-state">${copy.ui.emptyFavorites}</p>`;
        return;
      }
      favorites.forEach((favorite) => {
        const card = document.createElement("article");
        card.className = "result-card";
        card.innerHTML = `
          <p class="card-kicker">${favorite.category}</p>
          <h3>${favorite.name}</h3>
          <p>${favorite.meaning}</p>
          <dl><dt>${copy.ui.bestFor}</dt><dd>${favorite.bestFor}</dd><dt>${copy.ui.style}</dt><dd>${favorite.style}</dd></dl>
          <button class="button ghost" type="button" data-remove="${favorite.id}">${copy.ui.remove}</button>
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

  setupLanguage();
  translateNavigation();
  translatePageText();
  translateStaticCards();
  renderPopular();
  renderGeneratorList();
  renderFavoritesPage();
  setupHeroGenerate();
  setupMobileNav();
  setupTheme();
})();
