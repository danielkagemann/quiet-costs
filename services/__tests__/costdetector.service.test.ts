import { CostDetector } from "../costdetector.service";

describe("CostDetector.detectCategory", () => {
  // -------------------------------------------------------------------------
  // 0 – Nebenkosten
  // -------------------------------------------------------------------------
  describe("category 0 — Nebenkosten", () => {
    it.each([
      "Strom",
      "Internet DSL",
      "Vodafone Mobilfunk",
      "Telekom Grundgebühr",
      "Müllabfuhr",
    ])('detects "%s" as Nebenkosten', (name) =>
      expect(CostDetector.detectCategory(name)).toBe(0),
    );
  });

  // -------------------------------------------------------------------------
  // 1 – Versicherung
  // -------------------------------------------------------------------------
  describe("category 1 — Versicherung", () => {
    it.each([
      "Allianz Haftpflicht",
      "HUK Hausrat",
      "Krankenversicherung",
      "Reiseversicherung",
    ])('detects "%s" as Versicherung', (name) =>
      expect(CostDetector.detectCategory(name)).toBe(1),
    );
  });

  // -------------------------------------------------------------------------
  // 2 – Steuern & Gebühren
  // -------------------------------------------------------------------------
  describe("category 2 — Steuern & Gebühren", () => {
    it.each(["GEZ Rundfunkbeitrag", "KFZ-Steuer", "Hundesteuer", "GEMA"])(
      'detects "%s" as Steuern & Gebühren',
      (name) => expect(CostDetector.detectCategory(name)).toBe(2),
    );
  });

  // -------------------------------------------------------------------------
  // 3 – Digitale Dienste
  // -------------------------------------------------------------------------
  describe("category 3 — Digitale Dienste", () => {
    it.each([
      "Adobe Creative Cloud",
      "Microsoft 365",
      "iCloud 200GB",
      "GitHub Pro",
      "ChatGPT Plus",
      "Notion",
    ])('detects "%s" as Digitale Dienste', (name) =>
      expect(CostDetector.detectCategory(name)).toBe(3),
    );
  });

  // -------------------------------------------------------------------------
  // 4 – Streaming & Medien
  // -------------------------------------------------------------------------
  describe("category 4 — Streaming & Medien", () => {
    it.each([
      "Netflix",
      "Disney+",
      "Spotify Premium",
      "Amazon Prime",
      "DAZN",
      "Audible",
    ])('detects "%s" as Streaming & Medien', (name) =>
      expect(CostDetector.detectCategory(name)).toBe(4),
    );
  });

  // -------------------------------------------------------------------------
  // 5 – Haus & Instandhaltung
  // -------------------------------------------------------------------------
  describe("category 5 — Haus & Instandhaltung", () => {
    it.each([
      "Miete Januar",
      "Hausverwaltung",
      "Gartenpflege",
      "Schornsteinfeger",
    ])('detects "%s" as Haus & Instandhaltung', (name) =>
      expect(CostDetector.detectCategory(name)).toBe(5),
    );
  });

  // -------------------------------------------------------------------------
  // 6 – Mobilität
  // -------------------------------------------------------------------------
  describe("category 6 — Mobilität", () => {
    it.each([
      "Deutschlandticket",
      "BahnCard 50",
      "ADAC Mitgliedschaft",
      "Leasing BMW",
    ])('detects "%s" as Mobilität', (name) =>
      expect(CostDetector.detectCategory(name)).toBe(6),
    );
  });

  // -------------------------------------------------------------------------
  // 7 – Gesundheit & Fitness
  // -------------------------------------------------------------------------
  describe("category 7 — Gesundheit & Fitness", () => {
    it.each([
      "McFit Abo",
      "Urban Sports Club",
      "Headspace",
      "Freeletics",
      "Gympass",
    ])('detects "%s" as Gesundheit & Fitness', (name) =>
      expect(CostDetector.detectCategory(name)).toBe(7),
    );
  });

  // -------------------------------------------------------------------------
  // 8 – Mitgliedschaften
  // -------------------------------------------------------------------------
  describe("category 8 — Mitgliedschaften", () => {
    it.each([
      "Costco Mitgliedschaft",
      "LinkedIn Premium",
      "Sportverein Beitrag",
      "Bibliothek Jahresgebühr",
    ])('detects "%s" as Mitgliedschaften', (name) =>
      expect(CostDetector.detectCategory(name)).toBe(8),
    );
  });

  // -------------------------------------------------------------------------
  // -1 – No match (Sonstiges fallback)
  // -------------------------------------------------------------------------
  describe("no match → returns -1", () => {
    it.each(["", "XYZ 123", "Abonnement Unbekannt", "Random Service"])(
      'returns -1 for "%s"',
      (name) => expect(CostDetector.detectCategory(name)).toBe(-1),
    );
  });

  // -------------------------------------------------------------------------
  // Normalization
  // -------------------------------------------------------------------------
  describe("normalization", () => {
    it("is case-insensitive", () => {
      expect(CostDetector.detectCategory("NETFLIX")).toBe(4);
      expect(CostDetector.detectCategory("netflix")).toBe(4);
      expect(CostDetector.detectCategory("NetFlix")).toBe(4);
    });

    it("handles German umlaut variants", () => {
      // "Fitness" → category 7, ensure umlaut normalization doesn't break it
      expect(CostDetector.detectCategory("Fitnessstudio Köln")).toBe(7);
    });

    it("matches keywords that appear mid-string", () => {
      expect(CostDetector.detectCategory("Mein Spotify Premium Abo")).toBe(4);
    });

    it("collapses extra whitespace", () => {
      expect(CostDetector.detectCategory("Microsoft  365")).toBe(3);
    });
  });
});
