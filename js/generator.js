(function () {
  const generators = window.NameForgeData.generators;
  const storage = window.NameForgeStorage;
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || "gaming";
  const generator = generators.find((item) => item.slug === type) || generators[0];
  const initialKeyword = params.get("q") || "";
  const supportedLanguages = ["en", "ko", "ja"];
  let lang = "en";

  try {
    const saved = localStorage.getItem("nameforge-language");
    lang = supportedLanguages.includes(saved) ? saved : "en";
  } catch (error) {
    lang = "en";
  }

  const copy = {
    en: {
      keyword: "Keyword",
      keywordHelp: "Use a theme, mood, person, place, product category, or sound cue.",
      nameType: "Name type",
      count: "How many",
      includeMeaning: "Show short meaning notes",
      generate: "Generate names",
      quick: "Quick examples",
      resultsEyebrow: "Generated ideas",
      resultsTitle: "Results",
      empty: "Choose a type, add a keyword, and generate names to see ideas here.",
      favorites: "View favorites",
      bestFor: "Best for",
      copy: "Copy",
      copied: "Copied",
      copyAll: "Copy all",
      copiedAll: "Copied all",
      favorite: "Favorite",
      saved: "Saved",
      quality: "Score",
      checks: ["Readable", "Memorable", "Flexible"],
      search: "Search web",
      fallbackKeyword: "spark",
      content: {
        what: "What is this generator?",
        how: "How to use it",
        tips: "Tips for choosing a good name",
        examples: "Example name styles",
        faq: "FAQ",
        related: "Related generators",
        namingGuide: "Naming guide",
        checklist: "Validation checklist"
      },
      types: {
        common: ["Balanced", "Natural names that are easy to read and remember."],
        pure: ["Soft / native", "Gentler names built from warmer syllables and meaning cues."],
        short: ["Short", "Compact one-word names for IDs, pets, and quick recall."],
        premium: ["Premium", "Polished names for brands, studios, and public projects."],
        fantasy: ["Fantasy", "Worldbuilding names with mythic or character-like texture."]
      },
      categoryNames: { Gaming: "Gaming", Creator: "Creator", Business: "Business", Fantasy: "Fantasy", Lifestyle: "Lifestyle" },
      bestForMap: {
        gaming: "game profiles, clans, and online handles",
        youtube: "creator channels, podcasts, and newsletters",
        business: "brands, products, shops, and studios",
        fantasy: "characters, worlds, places, and artifacts",
        pet: "pets, mascots, and friendly side projects"
      },
      meaning: (name, category, seed, typeLabel) => `${name} is a ${typeLabel.toLowerCase()} ${category.toLowerCase()} name shaped around "${seed}".`
    },
    ko: {
      keyword: "키워드",
      keywordHelp: "주제, 분위기, 인물, 장소, 상품군, 소리 느낌을 입력하세요.",
      nameType: "이름 유형",
      count: "생성 개수",
      includeMeaning: "짧은 설명 함께 보기",
      generate: "이름 생성",
      quick: "빠른 예시",
      resultsEyebrow: "생성된 아이디어",
      resultsTitle: "결과",
      empty: "유형을 고르고 키워드를 입력한 뒤 이름을 생성해 보세요.",
      favorites: "즐겨찾기 보기",
      bestFor: "추천 용도",
      copy: "복사",
      copied: "복사됨",
      copyAll: "전체 복사",
      copiedAll: "전체 복사됨",
      favorite: "저장",
      saved: "저장됨",
      quality: "점수",
      checks: ["읽기 쉬움", "기억하기 좋음", "확장 가능"],
      search: "웹 검색",
      fallbackKeyword: "하루",
      content: {
        what: "이 생성기는 무엇인가요?",
        how: "사용 방법",
        tips: "좋은 이름을 고르는 팁",
        examples: "예시 이름 스타일",
        faq: "자주 묻는 질문",
        related: "관련 생성기",
        namingGuide: "네이밍 가이드",
        checklist: "검증 체크리스트"
      },
      types: {
        common: ["균형형", "읽기 쉽고 기억하기 좋은 자연스러운 이름입니다."],
        pure: ["순우리말 느낌", "부드러운 음절과 의미 단서를 섞은 따뜻한 이름입니다."],
        short: ["짧은 이름", "아이디, 반려동물, 빠른 호명에 맞는 압축형 이름입니다."],
        premium: ["브랜드형", "브랜드, 스튜디오, 공개 프로젝트에 맞는 정돈된 이름입니다."],
        fantasy: ["판타지형", "캐릭터나 세계관에 어울리는 신화적 질감의 이름입니다."]
      },
      categoryNames: { Gaming: "게임", Creator: "크리에이터", Business: "비즈니스", Fantasy: "판타지", Lifestyle: "라이프스타일" },
      bestForMap: {
        gaming: "게임 프로필, 클랜, 온라인 핸들",
        youtube: "크리에이터 채널, 팟캐스트, 뉴스레터",
        business: "브랜드, 상품, 쇼핑몰, 스튜디오",
        fantasy: "캐릭터, 세계관, 장소, 유물",
        pet: "반려동물, 마스코트, 친근한 프로젝트"
      },
      meaning: (name, category, seed, typeLabel) => `${name}은 "${seed}" 키워드를 바탕으로 만든 ${category} ${typeLabel} 이름입니다.`
    },
    ja: {
      keyword: "キーワード",
      keywordHelp: "テーマ、雰囲気、人物、場所、商品カテゴリ、音の印象を入力してください。",
      nameType: "名前タイプ",
      count: "生成数",
      includeMeaning: "短い説明を表示",
      generate: "名前を生成",
      quick: "クイック例",
      resultsEyebrow: "生成アイデア",
      resultsTitle: "結果",
      empty: "タイプを選び、キーワードを入れて名前を生成してください。",
      favorites: "お気に入りを見る",
      bestFor: "向いている用途",
      copy: "コピー",
      copied: "コピー済み",
      copyAll: "すべてコピー",
      copiedAll: "コピー済み",
      favorite: "保存",
      saved: "保存済み",
      quality: "スコア",
      checks: ["読みやすい", "覚えやすい", "展開しやすい"],
      search: "Web検索",
      fallbackKeyword: "そら",
      content: {
        what: "このジェネレーターとは？",
        how: "使い方",
        tips: "良い名前を選ぶコツ",
        examples: "名前スタイル例",
        faq: "FAQ",
        related: "関連ジェネレーター",
        namingGuide: "ネーミングガイド",
        checklist: "検証チェックリスト"
      },
      types: {
        common: ["バランス型", "読みやすく覚えやすい自然な名前です。"],
        pure: ["やわらかい名前", "温かい音と意味の手がかりを混ぜた名前です。"],
        short: ["短い名前", "ID、ペット、呼びやすさを重視した短い名前です。"],
        premium: ["ブランド型", "ブランド、スタジオ、公開プロジェクト向けの整った名前です。"],
        fantasy: ["ファンタジー型", "キャラクターや世界観に合う神話的な名前です。"]
      },
      categoryNames: { Gaming: "ゲーム", Creator: "クリエイター", Business: "ビジネス", Fantasy: "ファンタジー", Lifestyle: "ライフスタイル" },
      bestForMap: {
        gaming: "ゲームプロフィール、クラン、オンラインID",
        youtube: "クリエイターチャンネル、ポッドキャスト、ニュースレター",
        business: "ブランド、商品、ショップ、スタジオ",
        fantasy: "キャラクター、世界、場所、アーティファクト",
        pet: "ペット、マスコット、親しみやすいプロジェクト"
      },
      meaning: (name, category, seed, typeLabel) => `${name}は「${seed}」をもとにした${category}向けの${typeLabel}名前です。`
    }
  }[lang];

  const textBySlug = {
    en: {},
    ko: {
      gaming: {
        title: "게이머태그 생성기",
        description: "경쟁 게임, 클랜, 온라인 프로필에 어울리는 짧고 강한 이름을 만듭니다.",
        placeholder: "그림자, 네온, 폭풍, 에이스...",
        what: "게이머태그 생성기는 로비, 점수판, 프로필 카드, 스트리밍 화면에서 선명하게 보이는 짧은 이름에 초점을 맞춥니다.",
        how: "플레이 스타일, 좋아하는 요소, 역할, 분위기를 키워드로 입력하세요. 유형을 바꾸면 강한 아이디부터 판타지풍 닉네임까지 빠르게 비교할 수 있습니다.",
        tips: ["음성 채팅에서 부르기 쉬운 이름을 고르세요.", "무작위 숫자 나열은 피하세요.", "여러 게임에서 함께 쓸 수 있는 이름이 좋습니다."],
        faqs: [["좋은 게이머태그의 기준은 무엇인가요?", "짧고 말하기 쉬우며 시각적으로 구분되고 플레이 스타일과 맞는 이름입니다."], ["숫자를 넣어도 되나요?", "의미가 있을 때만 사용하세요. 무작위 숫자는 기억하기 어렵게 만듭니다."]]
      },
      youtube: {
        title: "유튜브 이름 생성기",
        description: "기억하기 쉽고 브랜드화하기 좋은 크리에이터형 채널 이름을 찾습니다.",
        placeholder: "여행, 테크, 코지, 금융...",
        what: "유튜브 이름 생성기는 채널, 팟캐스트, 뉴스레터, 크리에이터 커뮤니티에 맞는 이름을 제안합니다.",
        how: "콘텐츠 주제나 분위기를 입력하세요. 개인 브랜드, 스튜디오형, 짧은 채널명, 프리미엄형 이름을 비교할 수 있습니다.",
        tips: ["콘텐츠가 확장되어도 어색하지 않은 이름을 고르세요.", "소리 내어 읽었을 때 자연스러운지 확인하세요.", "기존 유명 채널과 너무 비슷한 이름은 피하세요."],
        faqs: [["채널 이름에 주제를 넣어야 하나요?", "도움이 될 수 있지만 콘텐츠 방향이 바뀔 가능성도 고려해야 합니다."], ["이름 길이는 어느 정도가 좋나요?", "보통 한 단어에서 세 단어 사이가 기억하기 쉽습니다."]]
      },
      business: {
        title: "비즈니스 이름 생성기",
        description: "스타트업, 제품, 스튜디오, 에이전시, 소규모 비즈니스를 위한 브랜드형 이름을 생성합니다.",
        placeholder: "금융, 디자인, 클라우드, 헬스...",
        what: "비즈니스 이름 생성기는 제품, 에이전시, SaaS 아이디어, 숍, 독립 스튜디오에 어울리는 브랜드형 이름을 만듭니다.",
        how: "시장, 고객이 얻는 이점, 전달하고 싶은 감정을 키워드로 입력하세요. 공개 전에 도메인과 상표 가능성은 직접 확인해야 합니다.",
        tips: ["도메인과 상표 사용 가능성을 확인하세요.", "철자가 쉬운 이름을 우선하세요.", "사업 확장 가능성이 있다면 너무 좁은 이름은 피하세요."],
        faqs: [["생성된 이름을 상업적으로 써도 되나요?", "아이디어 출발점으로 사용하되 공개 전 법적 사용 가능성을 확인해야 합니다."], ["브랜드화하기 좋은 이름은 무엇인가요?", "기억하기 쉽고 발음 가능하며 차별적이고 향후 제품 확장에도 유연한 이름입니다."]]
      },
      fantasy: {
        title: "판타지 이름 생성기",
        description: "캐릭터, 장소, 클랜, 왕국, 유물에 어울리는 세계관형 이름을 만듭니다.",
        placeholder: "달, 불꽃, 숲, 고대...",
        what: "판타지 이름 생성기는 작가, 게임 마스터, 세계관 제작자가 신화적 질감의 이름을 만들 때 유용합니다.",
        how: "상징, 원소, 문화 단서, 분위기를 입력하세요. 캐릭터 이름, 지역명, 유물명처럼 쓰임새가 다른 이름을 빠르게 훑어볼 수 있습니다.",
        tips: ["이름의 소리가 문화권이나 지역과 맞는지 확인하세요.", "관련된 장소에는 비슷한 끝소리를 반복해 일관성을 주세요.", "중요 캐릭터 이름은 발음하기 쉽게 유지하세요."],
        faqs: [["소설이나 게임에 써도 되나요?", "창작 영감으로 사용할 수 있지만 최종 사용 전 독창성을 검토하고 다듬는 것이 좋습니다."], ["같은 세계관처럼 느끼게 하려면?", "소리 패턴, 음절 끝, 명명 규칙을 그룹 안에서 반복하세요."]]
      },
      pet: {
        title: "반려동물 이름 생성기",
        description: "강아지, 고양이, 작은 반려동물과 친근한 프로젝트에 어울리는 이름을 찾습니다.",
        placeholder: "복슬, 햇살, 작은, 코코아...",
        what: "반려동물 이름 생성기는 따뜻하고 부르기 쉬우며 일상에서 자연스러운 이름에 초점을 맞춥니다.",
        how: "성격, 색깔, 음식, 계절, 크기 같은 단서를 입력하세요. 짧은 이름과 부드러운 이름을 함께 비교하면 고르기 쉽습니다.",
        tips: ["매일 부르기 쉬운 이름을 고르세요.", "기본 명령어와 비슷하게 들리는 이름은 피하세요.", "며칠 동안 불러본 뒤 정해도 좋습니다."],
        faqs: [["어떤 반려동물 이름이 쓰기 쉬운가요?", "짧고 소리가 분명한 이름이 일상에서 가장 편합니다."], ["사람 이름을 써도 되나요?", "네. 사람 이름은 따뜻하거나 재미있거나 클래식한 느낌을 줄 수 있습니다."]]
      }
    },
    ja: {
      gaming: { title: "ゲーマータグ生成", description: "ゲーム、クラン、オンラインプロフィール向けの短く強い名前を作ります。", placeholder: "shadow, neon, ace...", what: "ロビーやプロフィールで目立つ短い名前に特化したジェネレーターです。", how: "プレイスタイルや好きな要素を入力し、名前タイプを変えて比較してください。", tips: ["声に出しやすい名前を選びましょう。", "意味のない数字の羅列は避けましょう。", "複数のゲームで使える名前が便利です。"], faqs: [["良いゲーマータグとは？", "短く、発音しやすく、見た目で区別できる名前です。"], ["数字を入れてもよいですか？", "意味がある場合だけ使うのがおすすめです。"]] },
      youtube: { title: "YouTube名前生成", description: "覚えやすくブランド化しやすいチャンネル名を探します。", placeholder: "travel, tech, cozy...", what: "チャンネル、ポッドキャスト、ニュースレター向けの名前を提案します。", how: "テーマや雰囲気を入力し、短い名前やブランド型の名前を比較してください。", tips: ["内容が広がっても使える名前を選びましょう。", "声に出して自然か確認しましょう。", "有名チャンネルに近すぎる名前は避けましょう。"], faqs: [["名前にジャンルを入れるべき？", "役立つ場合がありますが、将来の方向転換も考慮しましょう。"], ["長さはどれくらい？", "一語から三語が覚えやすいです。"]] },
      business: { title: "ビジネス名生成", description: "スタートアップ、商品、スタジオ向けのブランド名を生成します。", placeholder: "finance, design, cloud...", what: "商品、SaaS、ショップ、スタジオ向けのブランド化しやすい名前を作ります。", how: "市場、価値、届けたい印象をキーワードにしてください。公開前には商標とドメインを確認しましょう。", tips: ["ドメインと商標を確認しましょう。", "綴りやすい名前を優先しましょう。", "将来広がる事業なら狭すぎる名前は避けましょう。"], faqs: [["商用利用できますか？", "アイデアの出発点として使い、法的確認は必ず行ってください。"], ["良いブランド名とは？", "覚えやすく、発音でき、差別化され、拡張しやすい名前です。"]] },
      fantasy: { title: "ファンタジー名生成", description: "キャラクター、場所、王国、遺物向けの名前を作ります。", placeholder: "moon, ember, forest...", what: "物語やゲームの世界観に合う神話的な名前を作るジェネレーターです。", how: "象徴、元素、文化の手がかり、雰囲気を入力してください。", tips: ["音が地域や文化に合うか確認しましょう。", "関連する場所には似た語尾を使うと統一感が出ます。", "重要な名前は発音しやすくしましょう。"], faqs: [["小説やゲームに使えますか？", "創作の出発点として使い、最終的には独自性を確認してください。"], ["同じ世界観に見せるには？", "音のパターンや語尾を繰り返してください。"]] },
      pet: { title: "ペット名生成", description: "犬、猫、小さなペット向けの親しみやすい名前を探します。", placeholder: "fluffy, sunny, cocoa...", what: "毎日呼びやすく温かい印象の名前に特化しています。", how: "性格、色、食べ物、季節、サイズなどを入力してください。", tips: ["毎日呼びやすい名前を選びましょう。", "しつけの言葉に似た名前は避けましょう。", "数日呼んでから決めてもよいです。"], faqs: [["使いやすいペット名は？", "短く音がはっきりした名前です。"], ["人の名前でもよいですか？", "はい。温かくクラシックな印象になります。"]] }
    }
  }[lang];

  const resources = {
    en: {
      vowels: ["a", "e", "i", "o", "u", "ai", "io"],
      soft: ["luna", "mira", "nori", "sora", "mellow", "coco", "bloom", "honey"],
      roots: {
        gaming: ["vex", "nova", "rift", "dash", "zero", "flux", "bolt", "kai", "frost", "blade", "pulse", "drift"],
        youtube: ["daily", "pixel", "bright", "loop", "craft", "nest", "spark", "story", "signal", "frame", "vibe", "room"],
        business: ["core", "luma", "vela", "north", "forge", "axis", "nexa", "ora", "atlas", "clear", "stride", "harbor"],
        fantasy: ["ael", "dor", "wyn", "thorn", "vale", "myr", "ember", "loria", "cael", "seren", "rune", "eira"],
        pet: ["mochi", "biscuit", "lulu", "pip", "coco", "sunny", "bean", "nori", "milo", "poppy", "maple", "berry"]
      },
      prefixes: ["Neo", "Luma", "Aero", "Mira", "Ever", "North", "Silver", "Tiny", "Prime", "Open", "Star", "Cozy"],
      suffixes: ["ly", "io", "Lab", "Works", "Nest", "Arc", "Wave", "Core", "Studio", "Path", "Bloom", "Point"],
      brandWords: ["Studio", "Works", "Labs", "Collective"],
      fantasyWords: ["Vale", "Rune"]
    },
    ko: {
      vowels: ["아", "이", "오", "유", "라", "루"],
      soft: ["하루", "나래", "소리", "아라", "루미", "보리", "초아", "다온"],
      roots: {
        gaming: ["네온", "폭풍", "칼날", "그림자", "섬광", "제로", "카이", "루나", "블리츠", "에코"],
        youtube: ["하루", "픽셀", "로그", "스튜디오", "브이", "루프", "새봄", "이야기", "온기", "노트"],
        business: ["코어", "루마", "노스", "브릿지", "벨라", "넥사", "오라", "하버", "클리어", "포지"],
        fantasy: ["아엘", "루나", "미르", "가온", "별하", "세렌", "다린", "엘라", "은월", "라온"],
        pet: ["모찌", "보리", "루루", "코코", "초코", "나나", "콩이", "두부", "베리", "복실"]
      },
      prefixes: ["새", "빛", "온", "라온", "루미", "하늘", "달", "별", "고요", "작은", "맑은", "은"],
      suffixes: ["나", "온", "별", "빛", "루", "림", "하", "담", "결", "봄", "스튜디오", "랩"],
      brandWords: ["스튜디오", "웍스", "랩", "컬렉티브"],
      fantasyWords: ["계곡", "룬"]
    },
    ja: {
      vowels: ["a", "i", "u", "e", "o", "ra"],
      soft: ["sora", "mira", "nagi", "luna", "momo", "yuzu", "haru", "rio"],
      roots: {
        gaming: ["nova", "kage", "raiden", "zero", "blade", "kai", "rune", "storm", "flare", "pixel"],
        youtube: ["daily", "pixel", "story", "room", "loop", "studio", "note", "vibe", "craft", "frame"],
        business: ["core", "luma", "nexa", "north", "clear", "harbor", "axis", "terra", "vela", "ora"],
        fantasy: ["ael", "luna", "rune", "syl", "vale", "seren", "eira", "dusk", "myr", "oriel"],
        pet: ["momo", "coco", "mugi", "sora", "yuzu", "nana", "maru", "pipi", "milo", "berry"]
      },
      prefixes: ["Neo", "Luma", "Aoi", "Haru", "Sora", "Mira", "Kira", "Nagi", "Yume", "Luna", "Star", "Momo"],
      suffixes: ["ly", "io", "Lab", "Works", "Nest", "Arc", "Wave", "Core", "Studio", "Path", "Bloom", "Point"],
      brandWords: ["Studio", "Works", "Labs", "Collective"],
      fantasyWords: ["Vale", "Rune"]
    }
  }[lang];

  const panel = document.querySelector("#generatorPanel");
  const results = document.querySelector("#resultGrid");
  const content = document.querySelector("#generatorContent");
  const copyAllButton = document.querySelector("#copyAllButton");
  let latestResults = [];

  function randomInt(max) {
    if (max <= 0) return 0;
    if (window.crypto && window.crypto.getRandomValues) {
      const values = new Uint32Array(1);
      window.crypto.getRandomValues(values);
      return values[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function choice(items, offset = 0) {
    return items[(randomInt(items.length) + offset) % items.length] || "";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeKeyword(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) return "";
    if (lang === "ko") return trimmed.replace(/\s+/g, "");
    return trimmed
      .replace(/[^a-z0-9]+/gi, " ")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("");
  }

  function titleCase(value) {
    if (lang === "ko") return value;
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  }

  function getGeneratorText(slug = generator.slug) {
    const base = generators.find((item) => item.slug === slug) || generator;
    const translated = textBySlug[slug] || {};
    return {
      title: translated.title || base.title,
      description: translated.description || base.description,
      placeholder: translated.placeholder || base.placeholder,
      what: translated.what || base.what,
      how: translated.how || base.how,
      tips: translated.tips || base.tips,
      faqs: translated.faqs || base.faqs,
      examples: base.examples
    };
  }

  function renderPanel() {
    const text = getGeneratorText();
    const typeOptions = Object.entries(copy.types)
      .map(([value, item]) => `<option value="${value}">${escapeHtml(item[0])}</option>`)
      .join("");

    document.title = `${text.title} - NameForge`;
    panel.innerHTML = `
      <div class="generator-intro">
        <p class="eyebrow">${escapeHtml(copy.categoryNames[generator.category] || generator.category)}</p>
        <h1>${escapeHtml(text.title)}</h1>
        <p>${escapeHtml(text.description)}</p>
        <div class="quick-samples" aria-label="${escapeHtml(copy.quick)}">
          <span>${escapeHtml(copy.quick)}</span>
          ${text.examples.map((example) => `<button type="button" data-sample="${escapeHtml(example)}">${escapeHtml(example)}</button>`).join("")}
        </div>
      </div>
      <form class="generator-form enhanced" id="nameForm">
        <div class="form-field">
          <label for="keyword">${escapeHtml(copy.keyword)}</label>
          <input id="keyword" name="keyword" type="text" value="${escapeHtml(initialKeyword)}" placeholder="${escapeHtml(text.placeholder)}">
          <small>${escapeHtml(copy.keywordHelp)}</small>
        </div>
        <div class="form-grid two">
          <div class="form-field">
            <label for="nameType">${escapeHtml(copy.nameType)}</label>
            <select id="nameType" name="nameType">${typeOptions}</select>
          </div>
          <div class="form-field">
            <label for="count">${escapeHtml(copy.count)}</label>
            <select id="count" name="count">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
        <label class="check-control">
          <input type="checkbox" name="includeMeaning" checked>
          <span>${escapeHtml(copy.includeMeaning)}</span>
        </label>
        <button class="button primary" type="submit">${escapeHtml(copy.generate)}</button>
      </form>
    `;
  }

  function getRecentKey() {
    return `nameforge-recent-${lang}-${generator.slug}`;
  }

  function getRecentNames() {
    try {
      const parsed = JSON.parse(localStorage.getItem(getRecentKey()) || "[]");
      return Array.isArray(parsed) ? parsed.filter(Boolean).slice(0, 120) : [];
    } catch (error) {
      return [];
    }
  }

  function rememberNames(items) {
    try {
      localStorage.setItem(getRecentKey(), JSON.stringify([...new Set([...items.map((item) => item.name), ...getRecentNames()])].slice(0, 120)));
    } catch (error) {
      return false;
    }
    return true;
  }

  function join(parts, separator = "") {
    return parts.filter(Boolean).map(titleCase).join(separator);
  }

  function makeName(keyword, nameType, attempt) {
    const roots = resources.roots[generator.slug] || resources.roots.business;
    const key = normalizeKeyword(keyword) || choice(roots, attempt) || copy.fallbackKeyword;
    const rootA = titleCase(choice(roots, attempt + 1));
    const rootB = titleCase(choice(roots, attempt + 7));
    const prefix = titleCase(choice(resources.prefixes, attempt + 2));
    const suffix = titleCase(choice(resources.suffixes, attempt + 3));
    const soft = titleCase(choice(resources.soft, attempt + 4));
    const vowel = choice(resources.vowels, attempt + 5);
    const brand = resources.brandWords;
    const fantasy = resources.fantasyWords;
    const space = lang === "en" && (generator.slug === "youtube" || generator.slug === "business") && attempt % 4 === 0 ? " " : "";
    const patterns = {
      common: [
        () => join([key, rootA], space),
        () => join([prefix, key]),
        () => join([key, suffix], space),
        () => join([rootA, key], space)
      ],
      pure: [
        () => join([soft, key]),
        () => join([key, soft]),
        () => lang === "ko" ? `${key}${vowel}` : join([key, vowel]),
        () => join([soft, rootA])
      ],
      short: [
        () => join([key]).slice(0, lang === "ko" ? 4 : 8),
        () => join([rootA, suffix]).slice(0, lang === "ko" ? 5 : 10),
        () => join([prefix, rootB]).slice(0, lang === "ko" ? 5 : 10),
        () => join([soft]).slice(0, lang === "ko" ? 4 : 8)
      ],
      premium: [
        () => join([key, brand[0]], space),
        () => join([prefix, key, brand[1]], space),
        () => join([key, brand[2]], space),
        () => join([rootA, brand[3]], space)
      ],
      fantasy: [
        () => join([prefix, rootA]),
        () => join([rootA, vowel, rootB]),
        () => join([key, fantasy[0]]),
        () => join([soft, fantasy[1]])
      ]
    };
    const pool = patterns[nameType] || patterns.common;
    return pool[attempt % pool.length]();
  }

  function scoreName(name) {
    const length = Array.from(name).length;
    let score = 70;
    if (length >= 3 && length <= 12) score += 10;
    if (length > 16) score -= 8;
    if (!/[0-9]/.test(name)) score += 6;
    if (new Set(Array.from(name.toLowerCase())).size >= Math.min(5, length)) score += 8;
    return Math.max(58, Math.min(98, score));
  }

  function buildCheckList(name) {
    const score = scoreName(name);
    const length = Array.from(name).length;
    return copy.checks
      .map((label, index) => {
        const passed = index === 0 ? length <= 14 : index === 1 ? score >= 78 : length >= 3 && length <= 18;
        return `<li class="${passed ? "pass" : "review"}">${escapeHtml(label)}</li>`;
      })
      .join("");
  }

  function buildResult(formData, index, usedNames) {
    const keyword = String(formData.get("keyword") || "");
    const nameType = String(formData.get("nameType") || "common");
    const typeLabel = copy.types[nameType][0];
    let name = "";
    let attempt = index;

    do {
      name = makeName(keyword, nameType, attempt);
      attempt += 1;
    } while ((usedNames.has(name) || !name) && attempt < index + 180);

    usedNames.add(name);
    const category = copy.categoryNames[generator.category] || generator.category;
    const seed = keyword.trim() || category;

    return {
      id: `${lang}-${generator.slug}-${name}-${index}`.toLowerCase(),
      name,
      category,
      typeLabel,
      typeDescription: copy.types[nameType][1],
      meaning: copy.meaning(name, category, seed, typeLabel),
      bestFor: copy.bestForMap[generator.slug],
      score: scoreName(name)
    };
  }

  function renderResults(items, showMeaning) {
    latestResults = items;
    if (copyAllButton) {
      copyAllButton.hidden = !items.length;
      copyAllButton.textContent = copy.copyAll;
    }
    results.innerHTML = "";
    items.forEach((item) => {
      const encodedName = encodeURIComponent(item.name);
      const card = document.createElement("article");
      card.className = "result-card";
      card.innerHTML = `
        <p class="card-kicker">${escapeHtml(item.category)} / ${escapeHtml(item.typeLabel)}</p>
        <div class="result-title-row">
          <h3>${escapeHtml(item.name)}</h3>
          <span class="score-badge">${escapeHtml(copy.quality)} ${item.score}</span>
        </div>
        ${showMeaning ? `<p>${escapeHtml(item.meaning)}</p>` : `<p>${escapeHtml(item.typeDescription)}</p>`}
        <dl><dt>${escapeHtml(copy.bestFor)}</dt><dd>${escapeHtml(item.bestFor)}</dd></dl>
        <ul class="result-checks">${buildCheckList(item.name)}</ul>
        <div class="button-row">
          <button class="button ghost" type="button" data-copy="${escapeHtml(item.name)}">${escapeHtml(copy.copy)}</button>
          <button class="button ghost" type="button" data-favorite="${escapeHtml(item.id)}">${storage.isFavorite(item.id) ? escapeHtml(copy.saved) : escapeHtml(copy.favorite)}</button>
          <a class="button ghost" href="https://www.google.com/search?q=${encodedName}" target="_blank" rel="noopener">${escapeHtml(copy.search)}</a>
        </div>
      `;
      card.favoriteItem = item;
      results.appendChild(card);
    });
  }

  function renderContent() {
    const text = getGeneratorText();
    const labels = copy.content;
    content.innerHTML = `
      <section class="content-card">
        <h2>${escapeHtml(labels.what)}</h2>
        <p>${escapeHtml(text.what)}</p>
        <h2>${escapeHtml(labels.how)}</h2>
        <p>${escapeHtml(text.how)}</p>
        <h2>${escapeHtml(labels.tips)}</h2>
        <ul>${text.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ul>
        <h2>${escapeHtml(labels.examples)}</h2>
        <div class="pill-row">${text.examples.map((example) => `<span>${escapeHtml(example)}</span>`).join("")}</div>
        <h2>${escapeHtml(labels.faq)}</h2>
        ${text.faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}
        <h2>${escapeHtml(labels.related)}</h2>
        <div class="pill-row">${generator.related.map((slug) => {
          const relatedText = getGeneratorText(slug);
          return `<a href="generator.html?type=${slug}">${escapeHtml(relatedText.title)}</a>`;
        }).join("")}<a href="naming-guide.html">${escapeHtml(labels.namingGuide)}</a><a href="brand-name-checklist.html">${escapeHtml(labels.checklist)}</a></div>
      </section>
    `;
  }

  async function copyText(text) {
    if (!navigator.clipboard || !window.isSecureContext) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      return false;
    }
  }

  function setupEvents() {
    panel.querySelector("#nameForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const count = Math.max(10, Math.min(30, Number(formData.get("count")) || 10));
      const usedNames = new Set(getRecentNames());
      const items = Array.from({ length: count }, (_, index) => buildResult(formData, index, usedNames));
      rememberNames(items);
      renderResults(items, formData.get("includeMeaning") === "on");
    });

    panel.addEventListener("click", (event) => {
      const sample = event.target.closest("[data-sample]");
      if (!sample) return;
      const input = panel.querySelector("#keyword");
      input.value = sample.dataset.sample;
      input.focus();
    });

    if (copyAllButton) {
      copyAllButton.textContent = copy.copyAll;
      copyAllButton.addEventListener("click", async () => {
        if (!latestResults.length) return;
        const text = latestResults.map((item) => `${item.name} - ${item.meaning}`).join("\n");
        copyAllButton.textContent = (await copyText(text)) ? copy.copiedAll : copy.copyAll;
      });
    }

    results.addEventListener("click", async (event) => {
      const copyButton = event.target.closest("[data-copy]");
      if (copyButton) {
        copyButton.textContent = (await copyText(copyButton.dataset.copy)) ? copy.copied : copy.copy;
        return;
      }
      const favorite = event.target.closest("[data-favorite]");
      if (favorite) {
        const card = favorite.closest(".result-card");
        if (storage.saveFavorite(card.favoriteItem)) favorite.textContent = copy.saved;
      }
    });
  }

  renderPanel();
  renderContent();
  setupEvents();
  document.querySelector("#results-title").textContent = copy.resultsTitle;
  document.querySelector("[aria-labelledby='results-title'] .eyebrow").textContent = copy.resultsEyebrow;
  document.querySelector(".section-heading.split .text-link").textContent = copy.favorites;
  document.querySelector("#resultGrid .empty-state").textContent = copy.empty;
})();
