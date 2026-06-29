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
      copyAll: "Copy all",
      copiedAll: "Copied all",
      favorite: "Favorite",
      saved: "Saved",
      quality: "Quality score",
      checks: ["Easy to say", "Memorable", "Flexible"],
      search: "Search web",
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
      copyAll: "전체 복사",
      copiedAll: "전체 복사됨",
      favorite: "저장",
      saved: "저장됨",
      quality: "실용 점수",
      checks: ["부르기 쉬움", "기억하기 좋음", "확장 가능"],
      search: "웹 검색",
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
      copyAll: "すべてコピー",
      copiedAll: "すべてコピー済み",
      favorite: "保存",
      saved: "保存済み",
      quality: "実用スコア",
      checks: ["言いやすい", "覚えやすい", "展開しやすい"],
      search: "Web検索",
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

  const nameResources = {
    en: {
      gaming: {
        roots: ["vex", "nova", "rift", "dash", "zero", "flux", "bolt", "kai", "frost", "blade", "pulse", "drift", "rogue", "quake", "echo", "flare", "nyx", "onyx", "raze", "orbit", "vector", "strike"],
        prefixes: ["Neo", "Void", "Hyper", "Shadow", "Aero", "Iron", "Pixel", "Night", "Turbo", "Ghost", "Rapid", "Storm"],
        suffixes: ["X", "Rush", "Core", "Byte", "Wolf", "Edge", "Mode", "Ops", "Run", "Aim", "Arc", "Sync"],
        compounds: ["NovaStrike", "VoidRift", "PixelAce", "FrostVex", "DashCore", "RiftRunner", "ZeroPulse", "BoltFang", "KaiVector", "GhostOrbit"]
      },
      youtube: {
        roots: ["daily", "pixel", "bright", "loop", "craft", "nest", "spark", "story", "signal", "frame", "vibe", "room", "pilot", "journal", "lens", "studio", "corner", "works", "scene", "channel"],
        prefixes: ["Hello", "Fresh", "True", "Open", "Simple", "Tiny", "Bold", "Curious", "Modern", "Cozy", "Next", "Prime"],
        suffixes: ["Studio", "Show", "Journal", "Room", "Lab", "Club", "Cast", "Edit", "Files", "Notes", "Stories", "Daily"],
        compounds: ["BrightLoop", "CreatorNest", "PixelJournal", "DailyForge", "StorySignal", "CraftRoom", "FreshFrame", "CozyPilot", "SparkStudio", "OpenScene"]
      },
      business: {
        roots: ["core", "luma", "vela", "north", "forge", "axis", "nexa", "ora", "atlas", "clear", "terra", "civic", "nova", "stride", "aura", "field", "prime", "harbor", "kindle", "merit"],
        prefixes: ["Aster", "Blue", "Clear", "Ever", "Horizon", "Luma", "Noble", "North", "Open", "Silver", "Urban", "Vertex"],
        suffixes: ["Labs", "Works", "Group", "Studio", "Systems", "Collective", "Co", "HQ", "Stack", "Point", "Bridge", "Base"],
        compounds: ["Corevia", "LumaWorks", "Northbyte", "Velora", "AxisBridge", "NexaPoint", "HarborStack", "OpenMerit", "AsterBase", "ClearForge"]
      },
      fantasy: {
        roots: ["ael", "dor", "wyn", "thorn", "vale", "myr", "ember", "loria", "cael", "seren", "dusk", "rune", "eira", "brann", "nyra", "varyn", "oriel", "maelis", "draven", "syl"],
        prefixes: ["Ael", "Elden", "Moon", "Dusk", "Thorn", "Silver", "Ashen", "Star", "Myth", "Rune", "Ebon", "Vale"],
        suffixes: ["dor", "wyn", "mere", "vale", "rion", "thas", "oria", "mar", "dell", "keep", "fall", "spire"],
        compounds: ["Aeloria", "Duskmar", "Thornvale", "Eryndor", "Moonspire", "Runekeep", "Ashenmere", "Silverwyn", "Mythfall", "Ebonvale"]
      },
      pet: {
        roots: ["mochi", "biscuit", "lulu", "pip", "coco", "sunny", "bean", "nori", "milo", "peanut", "poppy", "toto", "maple", "berry", "miso", "bambi", "daisy", "nana", "cookie", "bonbon"],
        prefixes: ["Tiny", "Little", "Sweet", "Happy", "Sunny", "Baby", "Mellow", "Lucky", "Soft", "Mini", "Cozy", "Peppy"],
        suffixes: ["bean", "boo", "pop", "bun", "kins", "paw", "pie", "bug", "bear", "belle", "tail", "chip"],
        compounds: ["Sunnybean", "Mochi", "Biscuit", "Lulu", "CocoPaw", "MapleBun", "PeanutPop", "MisoBear", "PoppyPie", "TinyNori"]
      }
    },
    ko: {
      gaming: {
        roots: ["섀도", "네온", "블리츠", "스톰", "제로", "레이븐", "카이", "볼트", "팬텀", "루나", "리프트", "블레이드", "에코", "플럭스", "오닉스", "스파크"],
        prefixes: ["다크", "네오", "하이퍼", "스톰", "고스트", "아이언", "블랙", "라이트", "터보", "나이트"],
        suffixes: ["엑스", "러시", "코어", "바이트", "엣지", "헌터", "러너", "싱크", "에임", "아크"],
        compounds: ["네온블리츠", "섀도리프트", "제로펄스", "스톰카이", "볼트레이븐", "팬텀엣지", "루나스트라이크", "오닉스러너"]
      },
      youtube: {
        roots: ["데일리", "픽셀", "브라이트", "루프", "크래프트", "네스트", "스파크", "로그", "스토리", "프레임", "시그널", "스튜디오", "룸", "노트", "렌즈", "코지"],
        prefixes: ["헬로", "프레시", "오픈", "심플", "모던", "코지", "볼드", "큐리어스", "넥스트", "트루"],
        suffixes: ["스튜디오", "쇼", "저널", "룸", "랩", "클럽", "캐스트", "에딧", "노트", "스토리"],
        compounds: ["브라이트루프", "크리에이터네스트", "픽셀저널", "데일리포지", "스토리시그널", "코지프레임", "스파크룸", "오픈로그"]
      },
      business: {
        roots: ["코어", "루마", "벨라", "노스", "포지", "엑시스", "넥사", "오라", "아틀라스", "클리어", "테라", "프라임", "하버", "메리트", "브릿지", "필드"],
        prefixes: ["블루", "클리어", "에버", "호라이즌", "루마", "노블", "노스", "오픈", "실버", "어반"],
        suffixes: ["랩스", "웍스", "그룹", "스튜디오", "시스템즈", "컬렉티브", "코", "스택", "포인트", "베이스"],
        compounds: ["코어비아", "루마웍스", "노스바이트", "벨로라", "엑시스브릿지", "넥사포인트", "하버스택", "클리어포지"]
      },
      fantasy: {
        roots: ["아엘", "도르", "윈", "가온", "루나", "미르", "엘라", "아린", "세렌", "카엘", "에이라", "바린", "오리엘", "드라벤", "실라", "아르덴"],
        prefixes: ["아엘", "고대", "달빛", "황혼", "가시", "은빛", "잿빛", "별", "룬", "검은"],
        suffixes: ["도르", "윈", "미어", "베일", "리온", "시아", "오리아", "마르", "스파이어", "킨"],
        compounds: ["아엘로리아", "더스크마르", "손베일", "에린도르", "문스파이어", "룬킨", "은빛윈", "미르오리아"]
      },
      pet: {
        roots: ["모찌", "보리", "루루", "콩이", "초코", "두부", "나리", "해피", "밀로", "쿠키", "단추", "밤비", "나나", "베리", "코코", "토토"],
        prefixes: ["작은", "햇살", "달콤", "해피", "말랑", "럭키", "미니", "포근", "방울", "몽글"],
        suffixes: ["콩", "뽀", "빵", "복", "별", "발", "꼬리", "칩", "링", "밤"],
        compounds: ["햇살콩이", "모찌", "보리", "루루", "코코발", "단추별", "초코빵", "두부링"]
      }
    },
    ja: {
      gaming: {
        roots: ["シャドウ", "ネオン", "ブリッツ", "ストーム", "ゼロ", "レイヴン", "カイ", "ボルト", "ファントム", "ルナ", "リフト", "ブレード", "エコー", "フラックス", "オニキス", "スパーク"],
        prefixes: ["ダーク", "ネオ", "ハイパー", "ストーム", "ゴースト", "アイアン", "ブラック", "ライト", "ターボ", "ナイト"],
        suffixes: ["エックス", "ラッシュ", "コア", "バイト", "エッジ", "ハンター", "ランナー", "シンク", "エイム", "アーク"],
        compounds: ["ネオンブリッツ", "シャドウリフト", "ゼロパルス", "ストームカイ", "ボルトレイヴン", "ファントムエッジ", "ルナストライク", "オニキスランナー"]
      },
      youtube: {
        roots: ["デイリー", "ピクセル", "ブライト", "ループ", "クラフト", "ネスト", "スパーク", "ログ", "ストーリー", "フレーム", "シグナル", "スタジオ", "ルーム", "ノート", "レンズ", "コージー"],
        prefixes: ["ハロー", "フレッシュ", "オープン", "シンプル", "モダン", "コージー", "ボールド", "キュリアス", "ネクスト", "トゥルー"],
        suffixes: ["スタジオ", "ショー", "ジャーナル", "ルーム", "ラボ", "クラブ", "キャスト", "エディット", "ノート", "ストーリー"],
        compounds: ["ブライトループ", "クリエイターネスト", "ピクセルジャーナル", "デイリーフォージ", "ストーリーシグナル", "コージーフレーム", "スパークルーム", "オープンログ"]
      },
      business: {
        roots: ["コア", "ルマ", "ヴェラ", "ノース", "フォージ", "アクシス", "ネクサ", "オーラ", "アトラス", "クリア", "テラ", "プライム", "ハーバー", "メリット", "ブリッジ", "フィールド"],
        prefixes: ["ブルー", "クリア", "エバー", "ホライゾン", "ルマ", "ノーブル", "ノース", "オープン", "シルバー", "アーバン"],
        suffixes: ["ラボ", "ワークス", "グループ", "スタジオ", "システムズ", "コレクティブ", "コ", "スタック", "ポイント", "ベース"],
        compounds: ["コアヴィア", "ルマワークス", "ノースバイト", "ヴェロラ", "アクシスブリッジ", "ネクサポイント", "ハーバースタック", "クリアフォージ"]
      },
      fantasy: {
        roots: ["アエル", "ドル", "ウィン", "カオン", "ルナ", "ミル", "エラ", "アリン", "セレン", "カエル", "エイラ", "ヴァリン", "オリエル", "ドラヴェン", "シラ", "アルデン"],
        prefixes: ["アエル", "古代", "月影", "黄昏", "茨", "銀", "灰", "星", "ルーン", "黒"],
        suffixes: ["ドル", "ウィン", "ミア", "ヴェイル", "リオン", "シア", "オリア", "マル", "スパイア", "キン"],
        compounds: ["アエロリア", "ダスクマル", "ソーンヴェイル", "エリンドル", "ムーンスパイア", "ルーンキン", "シルバーウィン", "ミルオリア"]
      },
      pet: {
        roots: ["モチ", "ボリ", "ルル", "マメ", "チョコ", "トーフ", "ナリ", "ハッピー", "ミロ", "クッキー", "ボタン", "バンビ", "ナナ", "ベリー", "ココ", "トト"],
        prefixes: ["ちび", "ひなた", "スイート", "ハッピー", "ふわ", "ラッキー", "ミニ", "ぽかぽか", "まる", "もこ"],
        suffixes: ["まめ", "ぽん", "パン", "ふく", "ほし", "パウ", "しっぽ", "チップ", "リン", "まる"],
        compounds: ["ひなたマメ", "モチ", "ボリ", "ルル", "ココパウ", "ボタンほし", "チョコパン", "トーフリン"]
      }
    }
  };

  const contentLabels = {
    en: {
      what: "What is this generator?",
      how: "How to use it",
      tips: "Tips for choosing a good name",
      examples: "Example name styles",
      faq: "FAQ",
      related: "Related generators",
      namingGuide: "Naming guide",
      checklist: "Validation checklist"
    },
    ko: {
      what: "이 생성기는 무엇인가요?",
      how: "사용 방법",
      tips: "좋은 이름을 고르는 팁",
      examples: "예시 이름 스타일",
      faq: "자주 묻는 질문",
      related: "관련 생성기",
      namingGuide: "네이밍 가이드",
      checklist: "검증 체크리스트"
    },
    ja: {
      what: "このジェネレーターとは",
      how: "使い方",
      tips: "良い名前を選ぶコツ",
      examples: "名前スタイルの例",
      faq: "FAQ",
      related: "関連ジェネレーター",
      namingGuide: "ネーミングガイド",
      checklist: "検証チェックリスト"
    }
  }[lang] || {};

  const generatorCopy = {
    en: {},
    ko: {
      gaming: {
        title: "게이머태그 생성기",
        description: "경쟁 게임, 클랜, 온라인 프로필에 어울리는 짧고 강한 이름을 만듭니다.",
        placeholder: "섀도, 네온, 에이스, 스톰...",
        what: "게이머태그 생성기는 로비, 점수판, 프로필 카드, 스트리밍 오버레이에서 또렷하게 보이는 짧은 이름에 초점을 맞춥니다. 힘 있는 소리와 간결한 음절을 우선합니다.",
        how: "플레이 스타일, 좋아하는 요소, 역할, 분위기를 키워드로 입력하세요. 경쟁적인 이름은 강렬한 스타일을, 캐주얼한 프로필은 아케이드나 장난스러운 톤을 선택하면 좋습니다.",
        tips: ["음성 채팅에서 부르기 쉬운 이름을 고르세요.", "무작위 숫자 나열은 피하세요.", "여러 게임에서 함께 사용할 수 있는 이름이 좋습니다."],
        faqs: [["좋은 게이머태그의 기준은 무엇인가요?", "짧고 말하기 쉬우며 시각적으로 구분되고 플레이 스타일과 잘 맞는 이름이 좋습니다."], ["숫자를 넣어도 되나요?", "의미가 있을 때만 사용하세요. 무작위 숫자는 기억하기 어렵게 만듭니다."]]
      },
      youtube: {
        title: "유튜브 이름 생성기",
        description: "기억하기 쉽고 브랜드화하기 좋은 크리에이터형 채널 이름을 찾아보세요.",
        placeholder: "여행, 테크, 코지, 금융...",
        what: "유튜브 이름 생성기는 채널, 팟캐스트, 뉴스레터, 크리에이터 커뮤니티에 맞춘 이름을 제안합니다. 주제가 분명하면서도 향후 콘텐츠 확장 여지를 남기는 방향을 우선합니다.",
        how: "여행, 기술, 금융, 뷰티, 게임, 학습처럼 주제 키워드를 입력하세요. 개인형, 스튜디오형, 편집형, 바이럴형 중 원하는 인상을 선택합니다.",
        tips: ["콘텐츠가 확장되어도 어색하지 않은 이름을 고르세요.", "소리 내어 읽었을 때 자연스러운지 확인하세요.", "이미 유명한 크리에이터와 너무 비슷한 이름은 피하세요."],
        faqs: [["채널 이름에 주제를 넣어야 하나요?", "도움이 될 수 있지만 콘텐츠 방향이 바뀔 가능성도 고려해야 합니다."], ["이름 길이는 어느 정도가 좋나요?", "보통 한 단어에서 세 단어 사이가 기억하기 쉽습니다."]]
      },
      business: {
        title: "비즈니스 이름 생성기",
        description: "스타트업, 제품, 스튜디오, 에이전시, 소규모 비즈니스를 위한 깔끔한 브랜드 이름을 생성합니다.",
        placeholder: "금융, 디자인, 클라우드, 헬스...",
        what: "비즈니스 이름 생성기는 제품, 에이전시, SaaS 아이디어, 숍, 독립 스튜디오에 어울리는 브랜드형 이름을 만듭니다. 발음, 신뢰감, 첫인상을 중요하게 다룹니다.",
        how: "시장, 고객이 얻는 이점, 전달하고 싶은 감정을 키워드로 시작하세요. 전문 서비스는 프리미엄이나 미니멀 스타일이 좋고, 차별성이 필요하면 조어형을 선택하세요.",
        tips: ["도메인과 상표 사용 가능성을 확인하세요.", "철자가 쉬운 이름을 우선하세요.", "사업 확장 가능성이 있다면 너무 좁은 이름은 피하세요."],
        faqs: [["생성된 이름을 상업적으로 써도 되나요?", "아이디어 출발점으로 사용하되 공개 전 법적 사용 가능성을 직접 확인해야 합니다."], ["브랜드화하기 좋은 이름은 무엇인가요?", "기억하기 쉽고 발음 가능하며 차별적이고 향후 제품 확장에도 유연한 이름입니다."]]
      },
      fantasy: {
        title: "판타지 이름 생성기",
        description: "캐릭터, 장소, 클랜, 왕국, 유물에 어울리는 신화적이고 세계관 있는 이름을 만듭니다.",
        placeholder: "달, 불씨, 숲, 고대...",
        what: "판타지 이름 생성기는 작가, 게임 마스터, 세계관 제작자가 신화적 질감이 있는 이름을 만들 때 유용합니다. 인물, 지역, 세력, 유물, 주문, 가상 언어에 활용할 수 있습니다.",
        how: "상징, 원소, 문화적 단서, 분위기를 입력하세요. 엘프풍이나 왕실 이름은 우아한 스타일을, 악역과 저주받은 장소는 어두운 스타일을 선택하면 좋습니다.",
        tips: ["이름의 소리가 문화나 지역과 맞는지 확인하세요.", "연관된 장소에는 비슷한 어미를 반복해 일관성을 주세요.", "중요한 캐릭터 이름은 발음하기 쉽게 유지하세요."],
        faqs: [["소설이나 게임에 써도 되나요?", "창작 영감으로 사용할 수 있지만 최종 사용 전 독창성을 검토하고 다듬는 것이 좋습니다."], ["이름들이 같은 세계관처럼 느껴지게 하려면?", "소리 패턴, 음절 끝, 명명 규칙을 그룹 안에서 반복하세요."]]
      },
      pet: {
        title: "반려동물 이름 생성기",
        description: "강아지, 고양이, 작은 반려동물과 귀여운 프로젝트에 어울리는 친근한 이름을 찾아보세요.",
        placeholder: "복슬, 햇살, 작은, 코코아...",
        what: "반려동물 이름 생성기는 따뜻하고 부르기 쉬우며 일상에서 자연스러운 이름에 초점을 맞춥니다. 강아지, 고양이, 토끼, 작은 반려동물, 친근한 사이드 프로젝트에 잘 맞습니다.",
        how: "성격, 색깔, 음식, 계절, 크기 같은 단서를 입력하세요. 귀여운 느낌은 큐트나 푸드 스타일을, 차분한 반려동물은 부드러운 톤을 선택하세요.",
        tips: ["매일 부르기 쉬운 이름을 고르세요.", "기본 명령어와 비슷하게 들리는 이름은 피하세요.", "며칠 동안 불러본 뒤 확정해도 좋습니다."],
        faqs: [["어떤 반려동물 이름이 쓰기 쉬운가요?", "짧고 소리가 분명한 이름이 일상에서 가장 편합니다."], ["사람 이름을 써도 되나요?", "네. 사람 이름은 따뜻하거나 재미있거나 클래식한 느낌을 줄 수 있습니다."]]
      }
    },
    ja: {
      gaming: {
        title: "ゲーマータグジェネレーター",
        description: "対戦ゲーム、クラン、オンラインプロフィールに合う短く印象的な名前を作成します。",
        placeholder: "シャドウ、ネオン、エース、ストーム...",
        what: "ゲーマータグジェネレーターは、ロビー、スコアボード、プロフィール、配信画面で目立つ短い名前に重点を置きます。力強い響きと呼びやすい音を優先します。",
        how: "プレイスタイル、好きな要素、役割、雰囲気をキーワードに入力してください。競技向けならシャープなスタイル、カジュアルならアーケードや遊び心のあるトーンが合います。",
        tips: ["ボイスチャットで呼びやすい名前を選びましょう。", "意味のない数字の連続は避けましょう。", "複数のゲームで使える名前が便利です。"],
        faqs: [["良いゲーマータグとは何ですか？", "短く、言いやすく、見分けやすく、プレイスタイルに合う名前です。"], ["数字を入れてもよいですか？", "意味がある場合だけ使いましょう。ランダムな数字は覚えにくくなります。"]]
      },
      youtube: {
        title: "YouTube名前ジェネレーター",
        description: "覚えやすく、ブランド化しやすいクリエイター向けチャンネル名を探せます。",
        placeholder: "旅行、テック、コージー、金融...",
        what: "YouTube名前ジェネレーターは、チャンネル、ポッドキャスト、ニュースレター、クリエイターコミュニティ向けの名前を提案します。テーマの明確さと将来の拡張性のバランスを重視します。",
        how: "旅行、テック、金融、美容、ゲーム、学習などのテーマを入力してください。個人風、スタジオ風、編集風、バイラル風から印象を選びます。",
        tips: ["コンテンツが広がっても使える名前を選びましょう。", "声に出して自然に聞こえるか確認しましょう。", "既存の有名クリエイターに近すぎる名前は避けましょう。"],
        faqs: [["チャンネル名にジャンルを入れるべきですか？", "役立つ場合がありますが、将来の方向転換も考慮してください。"], ["長さはどのくらいがよいですか？", "一語から三語程度が覚えやすいことが多いです。"]]
      },
      business: {
        title: "ビジネス名ジェネレーター",
        description: "スタートアップ、商品、スタジオ、代理店、小規模ビジネス向けの洗練された名前を生成します。",
        placeholder: "金融、デザイン、クラウド、ヘルス...",
        what: "ビジネス名ジェネレーターは、商品、代理店、SaaS案、ショップ、独立スタジオに合うブランド向けの名前を作ります。発音、信頼感、第一印象を重視します。",
        how: "市場、顧客への価値、伝えたい感情をキーワードにしてください。専門サービスにはプレミアムやミニマル、差別化したい場合は造語風が向いています。",
        tips: ["ドメインと商標の利用可能性を確認しましょう。", "綴りやすい名前を優先しましょう。", "事業拡大の可能性がある場合は狭すぎる名前を避けましょう。"],
        faqs: [["商用利用できますか？", "出発点として使い、公開前に法的な利用可能性を確認してください。"], ["ブランド化しやすい名前とは？", "覚えやすく、発音しやすく、独自性があり、将来の展開にも柔軟な名前です。"]]
      },
      fantasy: {
        title: "ファンタジー名前ジェネレーター",
        description: "キャラクター、場所、クラン、王国、アーティファクト向けの神話的な名前を作成します。",
        placeholder: "月、火種、森、古代...",
        what: "ファンタジー名前ジェネレーターは、作家、ゲームマスター、世界観制作者が神話的な質感の名前を作るためのツールです。人物、地域、勢力、遺物、呪文、架空言語に使えます。",
        how: "象徴、元素、文化的な手がかり、雰囲気を入力してください。エルフ風や王族名には優雅なスタイル、悪役や呪われた場所にはダークなスタイルが合います。",
        tips: ["音の響きが文化や地域に合うか確認しましょう。", "関連する場所には似た語尾を使うと統一感が出ます。", "重要なキャラクター名は発音しやすく保ちましょう。"],
        faqs: [["小説やゲームに使えますか？", "創作の出発点として使えますが、最終利用前に独自性を確認して調整しましょう。"], ["同じ世界の名前らしくするには？", "音のパターン、語尾、命名ルールをグループ内で繰り返します。"]]
      },
      pet: {
        title: "ペット名前ジェネレーター",
        description: "犬、猫、小さなペット、かわいいプロジェクトに合う親しみやすい名前を探せます。",
        placeholder: "ふわふわ、ひなた、小さい、ココア...",
        what: "ペット名前ジェネレーターは、温かく呼びやすく、日常で使いやすい名前に重点を置きます。犬、猫、うさぎ、小さなペット、親しみやすいサイドプロジェクトに合います。",
        how: "性格、色、食べ物、季節、サイズなどの手がかりを入力してください。かわいい印象ならキュートやフード系、落ち着いたペットならやさしいトーンが合います。",
        tips: ["毎日呼びやすい名前を選びましょう。", "一般的な指示語に似た響きの名前は避けましょう。", "数日呼んでみてから決めても大丈夫です。"],
        faqs: [["使いやすいペット名は？", "短く、音がはっきりした名前が日常では使いやすいです。"], ["人の名前を使ってもよいですか？", "はい。人名は温かさ、面白さ、クラシックな雰囲気を出せます。"]]
      }
    }
  }[lang] || {};

  const panel = document.querySelector("#generatorPanel");
  const results = document.querySelector("#resultGrid");
  const content = document.querySelector("#generatorContent");
  const copyAllButton = document.querySelector("#copyAllButton");
  const recentKey = `nameforge-recent-${lang}-${generator.slug}`;
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

  function variedChoice(items, offset = 0) {
    if (!items.length) return "";
    return items[(randomInt(items.length) + offset) % items.length];
  }

  function titleCase(value) {
    if (lang !== "en") return value;
    return value
      .split(/(\s+)/)
      .map((part) => (/^\s+$/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()))
      .join("");
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

  function joinName(parts, separator = "") {
    return parts
      .filter(Boolean)
      .map((part) => titleCase(normalizeKeyword(part)))
      .join(separator);
  }

  function getNameKit() {
    const langResources = nameResources[lang] || nameResources.en;
    return langResources[generator.slug] || langResources.business;
  }

  function getJoiner() {
    if (lang !== "en") return "";
    if (generator.slug === "youtube" || generator.slug === "business") return randomInt(4) === 0 ? " " : "";
    return "";
  }

  function getRecentNames() {
    try {
      const parsed = JSON.parse(localStorage.getItem(recentKey) || "[]");
      return Array.isArray(parsed) ? parsed.filter(Boolean).slice(0, 80) : [];
    } catch (error) {
      return [];
    }
  }

  function rememberNames(items) {
    const next = [...items.map((item) => item.name), ...getRecentNames()];
    localStorage.setItem(recentKey, JSON.stringify([...new Set(next)].slice(0, 80)));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getLocalizedGeneratorText(slug = generator.slug) {
    const base = generators.find((item) => item.slug === slug) || generator;
    const translated = generatorCopy[slug] || {};
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
    const styles = localized.styles[generator.slug] || localized.styles.business;
    const tones = localized.tones[generator.slug] || localized.tones.business;
    const text = getLocalizedGeneratorText();
    document.title = `${text.title} - NameForge`;
    panel.innerHTML = `
      <div>
        <p class="eyebrow">${escapeHtml(localized.categories[generator.category] || generator.category)}</p>
        <h1>${escapeHtml(text.title)}</h1>
        <p>${escapeHtml(text.description)}</p>
      </div>
      <form class="generator-form" id="nameForm">
        <label for="keyword">${ui.keyword}</label>
        <input id="keyword" name="keyword" type="text" value="${escapeHtml(initialKeyword)}" placeholder="${escapeHtml(text.placeholder)}">
        <div class="form-grid">
          <label>${ui.style}<select name="style">${styles.map((item) => `<option>${escapeHtml(item)}</option>`).join("")}</select></label>
          <label>${ui.length}<select name="length"><option value="Short">${ui.short}</option><option value="Medium" selected>${ui.medium}</option><option value="Long">${ui.long}</option></select></label>
          <label>${ui.tone}<select name="tone">${tones.map((item) => `<option>${escapeHtml(item)}</option>`).join("")}</select></label>
        </div>
        <button class="button primary" type="submit">${ui.generate}</button>
      </form>
    `;
  }

  function makeName(keyword, style, length, attempt = 0) {
    const kit = getNameKit();
    const key = normalizeKeyword(keyword);
    const rootA = variedChoice(kit.roots, attempt);
    const rootB = variedChoice(kit.roots, attempt + 5);
    const prefix = variedChoice(kit.prefixes, attempt + 2);
    const suffix = variedChoice(kit.suffixes, attempt + 3);
    const compound = variedChoice(kit.compounds, attempt + 7);
    const styleWord = normalizeKeyword(style);
    const variant = localized.variants[attempt % localized.variants.length];
    const joiner = getJoiner();
    const useKeyword = key && attempt % 4 !== 1;
    const patterns = {
      Short: [
        () => joinName([prefix, rootA]),
        () => joinName([rootA, suffix]),
        () => titleCase(compound),
        () => joinName([useKeyword ? key : rootA, suffix])
      ],
      Medium: [
        () => joinName([prefix, rootA, suffix]),
        () => joinName([rootA, rootB]),
        () => joinName([useKeyword ? key : prefix, rootA], joiner),
        () => joinName([rootA, variant]),
        () => titleCase(compound)
      ],
      Long: [
        () => joinName([useKeyword ? key : prefix, styleWord, rootA], joiner),
        () => joinName([prefix, rootA, rootB, suffix]),
        () => joinName([rootA, styleWord, rootB]),
        () => joinName([compound, variant], joiner),
        () => joinName([useKeyword ? key : rootA, prefix, suffix], joiner)
      ]
    };
    const pool = patterns[length] || patterns.Medium;
    return pool[attempt % pool.length]();
  }

  function scoreName(name) {
    const length = Array.from(name).length;
    let score = 72;
    if (length >= 4 && length <= 12) score += 10;
    if (length > 16) score -= 8;
    if (!/[0-9]/.test(name)) score += 6;
    if (new Set(Array.from(name.toLowerCase())).size >= Math.min(5, length)) score += 7;
    return Math.max(58, Math.min(96, score));
  }

  function buildCheckList(name) {
    const score = scoreName(name);
    return ui.checks
      .map((label, index) => {
        const passed = index === 0 ? Array.from(name).length <= 14 : index === 1 ? score >= 78 : Array.from(name).length >= 4;
        return `<li class="${passed ? "pass" : "review"}">${escapeHtml(label)}</li>`;
      })
      .join("");
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
    } while ((usedNames.has(name) || !name) && attempt < 120);

    usedNames.add(name);
    const category = localized.categories[generator.category] || generator.category;
    const seed = keyword.trim() || style;

    return {
      id: `${lang}-${generator.slug}-${name}-${style}-${index}`.toLowerCase(),
      name,
      category,
      meaning: ui.meaning(name, tone, category, seed),
      bestFor: localized.bestFor[generator.slug],
      style,
      score: scoreName(name)
    };
  }

  function renderResults(items) {
    latestResults = items;
    if (copyAllButton) {
      copyAllButton.hidden = !items.length;
      copyAllButton.textContent = ui.copyAll;
    }
    results.innerHTML = "";
    items.forEach((item) => {
      const encodedName = encodeURIComponent(item.name);
      const card = document.createElement("article");
      card.className = "result-card";
      card.innerHTML = `
        <p class="card-kicker">${escapeHtml(item.category)}</p>
        <div class="result-title-row">
          <h3>${escapeHtml(item.name)}</h3>
          <span class="score-badge">${escapeHtml(ui.quality)}: ${item.score}</span>
        </div>
        <p>${escapeHtml(item.meaning)}</p>
        <dl><dt>${escapeHtml(ui.bestFor)}</dt><dd>${escapeHtml(item.bestFor)}</dd><dt>${escapeHtml(ui.style)}</dt><dd>${escapeHtml(item.style)}</dd></dl>
        <ul class="result-checks">${buildCheckList(item.name)}</ul>
        <div class="button-row">
          <button class="button ghost" type="button" data-copy="${escapeHtml(item.name)}">${escapeHtml(ui.copy)}</button>
          <button class="button ghost" type="button" data-favorite="${escapeHtml(item.id)}">${storage.isFavorite(item.id) ? escapeHtml(ui.saved) : escapeHtml(ui.favorite)}</button>
          <a class="button ghost" href="https://www.google.com/search?q=${encodedName}" target="_blank" rel="noopener">${escapeHtml(ui.search)}</a>
        </div>
      `;
      card.favoriteItem = item;
      results.appendChild(card);
    });
  }

  function renderContent() {
    const text = getLocalizedGeneratorText();
    content.innerHTML = `
      <section class="content-card">
        <h2>${escapeHtml(contentLabels.what)}</h2>
        <p>${escapeHtml(text.what)}</p>
        <h2>${escapeHtml(contentLabels.how)}</h2>
        <p>${escapeHtml(text.how)}</p>
        <h2>${escapeHtml(contentLabels.tips)}</h2>
        <ul>${text.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ul>
        <h2>${escapeHtml(contentLabels.examples)}</h2>
        <div class="pill-row">${text.examples.map((example) => `<span>${escapeHtml(example)}</span>`).join("")}</div>
        <h2>${escapeHtml(contentLabels.faq)}</h2>
        ${text.faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}
        <h2>${escapeHtml(contentLabels.related)}</h2>
        <div class="pill-row">${generator.related.map((slug) => {
          const related = generators.find((item) => item.slug === slug);
          const relatedText = getLocalizedGeneratorText(related.slug);
          return `<a href="generator.html?type=${related.slug}">${escapeHtml(relatedText.title)}</a>`;
        }).join("")}<a href="naming-guide.html">${escapeHtml(contentLabels.namingGuide)}</a><a href="brand-name-checklist.html">${escapeHtml(contentLabels.checklist)}</a></div>
      </section>
    `;
  }

  function setupEvents() {
    panel.querySelector("#nameForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const usedNames = new Set(getRecentNames());
      const items = Array.from({ length: 10 }, (_, index) => buildResult(formData, index, usedNames));
      rememberNames(items);
      renderResults(items);
    });

    if (copyAllButton) {
      copyAllButton.textContent = ui.copyAll;
      copyAllButton.addEventListener("click", async () => {
        if (!latestResults.length) return;
        const text = latestResults.map((item) => `${item.name} - ${item.meaning}`).join("\n");
        await navigator.clipboard.writeText(text);
        copyAllButton.textContent = ui.copiedAll;
      });
    }

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
