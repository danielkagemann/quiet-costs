/**
 * Keyword mapping per category index (matches Configuration.categories indices).
 *
 *  0 – Nebenkosten
 *  1 – Versicherung
 *  2 – Steuern & Gebühren
 *  3 – Digitale Dienste
 *  4 – Streaming & Medien
 *  5 – Haus & Instandhaltung
 *  6 – Mobilität
 *  7 – Gesundheit & Fitness
 *  8 – Mitgliedschaften
 *  9 – Sonstiges  (fallback – no keywords)
 */
const CATEGORY_KEYWORDS: Record<number, string[]> = {
  0: [
    "strom",
    "wasser",
    "gas",
    "heizung",
    "fernwärme",
    "internet",
    "dsl",
    "glasfaser",
    "kabel",
    "telefon",
    "mobilfunk",
    "müll",
    "abfall",
    "telekom",
    "vodafone",
    "o2",
    "1&1",
    "unitymedia",
    "netcologne",
    "grundgebühr",
  ],
  1: [
    "versicherung",
    "haftpflicht",
    "hausrat",
    "lebens",
    "kranken",
    "renten",
    "berufsunfähigkeit",
    "rechtsschutz",
    "unfall",
    "reise",
    "zahn",
    "tierkranken",
    "allianz",
    "huk",
    "ergo",
    "axa",
    "zurich",
    "signal iduna",
    "generali",
  ],
  2: [
    "rundfunkbeitrag",
    "gez",
    "grundsteuer",
    "kfz-steuer",
    "hundesteuer",
    "gewerbesteuer",
    "ihk",
    "steuerberater",
    "maut",
    "gema",
    "parkgebühr",
    "verwaltungsgebühr",
    "notargebühr",
    "gerichtskosten",
  ],
  3: [
    "adobe",
    "microsoft 365",
    "office 365",
    "icloud",
    "google one",
    "dropbox",
    "github",
    "chatgpt",
    "openai",
    "notion",
    "figma",
    "canva",
    "1password",
    "lastpass",
    "evernote",
    "slack",
    "zoom",
    "aws",
    "azure",
    "google cloud",
    "hetzner",
    "strato",
    "hostinger",
    "netlify",
    "vercel",
    "linear",
    "jira",
    "confluence",
    "trello",
    "airtable",
  ],
  4: [
    "netflix",
    "disney",
    "amazon",
    "apple",
    "sky",
    "dazn",
    "youtube",
    "spotify",
    "tidal",
    "deezer",
    "audible",
    "kindle unlimited",
    "readly",
    "blendle",
    "spiegel+",
    "zeit+",
    "süddeutsche",
    "magenta tv",
    "wow",
  ],
  5: [
    "miete",
    "hausverwaltung",
    "hausmeister",
    "gartenpflege",
    "reinigung",
    "reparatur",
    "instandhaltung",
    "schornsteinfeger",
    "kaminkehrer",
    "wartung",
    "möbelabo",
    "handwerker",
    "hausordnung",
    "nebenkostenabrechnung",
    "wohngebäude",
    "gebäudeversicherung",
  ],
  6: [
    "deutschlandticket",
    "bahncard",
    "monatskarte",
    "öpnv",
    "bvg",
    "mvv",
    "hvv",
    "rvv",
    "vrr",
    "deutsche bahn",
    "leasing",
    "autofinanzierung",
    "tankstelle",
    "adac",
    "car2go",
    "sharenow",
    "miles",
    "sixt",
    "lime",
    "tier",
    "bird",
    "swapfiets",
    "nextbike",
    "flinkster",
  ],
  7: [
    "fitnessstudio",
    "mcfit",
    "fitness first",
    "urban sports",
    "freeletics",
    "headspace",
    "calm",
    "meditations-app",
    "yoga",
    "pilates",
    "ernährungsberatung",
    "supplements",
    "docmorris",
    "apotheke",
    "zusatzkrankenversicherung",
    "zahnzusatz",
    "brillenversicherung",
    "gympass",
    "wellpass",
  ],
  8: [
    "adac",
    "costco",
    "payback",
    "deutschlandcard",
    "bibliothek",
    "museum",
    "zoo",
    "gartenverein",
    "sportverein",
    "gewerkschaft",
    "berufsverband",
    "linkedin premium",
    "xing premium",
    "clubmitglied",
    "verein",
    "netzwerk",
  ],
};

/**
 * Normalizes a string for fuzzy keyword matching:
 * lowercases, replaces German umlauts, strips remaining diacritics,
 * and collapses extra whitespace.
 */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const CostDetector = {
  /**
   * Detects the most likely category index for a given cost name.
   * Returns the category index (0–9) or -1 if no match is found.
   */
  detectCategory(name: string): number {
    const lower = normalize(name);

    for (const [indexStr, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      for (const keyword of keywords) {
        if (lower.includes(normalize(keyword))) {
          return Number(indexStr);
        }
      }
    }

    return -1;
  },
};
