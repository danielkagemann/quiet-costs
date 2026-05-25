import { CostService } from "../cost.service";
import { Cost } from "@/types/costs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCost(overrides: Partial<Cost> = {}): Cost {
  return {
    id: 1,
    name: "Netflix",
    amount: 10,
    billingCycle: "monthly",
    isActive: true,
    categoryId: 4,
    spaceId: 1,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// isValid
// ---------------------------------------------------------------------------

describe("CostService.isValid", () => {
  it("returns true for a fully populated cost", () => {
    expect(CostService.isValid(makeCost())).toBe(true);
  });

  it("returns false when name is empty", () => {
    expect(CostService.isValid(makeCost({ name: "" }))).toBe(false);
  });

  it("returns false when name is only whitespace", () => {
    expect(CostService.isValid(makeCost({ name: "   " }))).toBe(false);
  });

  it("returns false when amount is 0", () => {
    expect(CostService.isValid(makeCost({ amount: 0 }))).toBe(false);
  });

  it("returns false when amount is negative", () => {
    expect(CostService.isValid(makeCost({ amount: -5 }))).toBe(false);
  });

  it("returns false when spaceId is 0 (unset)", () => {
    expect(CostService.isValid(makeCost({ spaceId: 0 }))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// getAmount
// ---------------------------------------------------------------------------

describe("CostService.getAmount", () => {
  it("returns the full amount for monthly billing", () => {
    expect(
      CostService.getAmount(makeCost({ amount: 12, billingCycle: "monthly" })),
    ).toBe(12);
  });

  it("returns amount / 3 for quarterly billing", () => {
    expect(
      CostService.getAmount(
        makeCost({ amount: 30, billingCycle: "quarterly" }),
      ),
    ).toBeCloseTo(10);
  });

  it("returns amount / 6 for half_yearly billing", () => {
    expect(
      CostService.getAmount(
        makeCost({ amount: 60, billingCycle: "half_yearly" }),
      ),
    ).toBeCloseTo(10);
  });

  it("returns amount / 12 for yearly billing", () => {
    expect(
      CostService.getAmount(makeCost({ amount: 120, billingCycle: "yearly" })),
    ).toBeCloseTo(10);
  });

  it("returns 0 when cost is inactive", () => {
    expect(
      CostService.getAmount(makeCost({ amount: 100, isActive: false })),
    ).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// getTotalPerMonth
// ---------------------------------------------------------------------------

describe("CostService.getTotalPerMonth", () => {
  it("returns 0 for an empty list", () => {
    expect(CostService.getTotalPerMonth([])).toBe(0);
  });

  it("sums only active costs", () => {
    const costs = [
      makeCost({ amount: 10, isActive: true }),
      makeCost({ amount: 20, isActive: false }),
      makeCost({ amount: 5, isActive: true }),
    ];
    expect(CostService.getTotalPerMonth(costs)).toBeCloseTo(15);
  });

  it("correctly converts mixed billing cycles to monthly", () => {
    const costs = [
      makeCost({ amount: 10, billingCycle: "monthly" }), // 10/mo
      makeCost({ amount: 12, billingCycle: "yearly" }), // 1/mo
      makeCost({ amount: 6, billingCycle: "half_yearly" }), // 1/mo
      makeCost({ amount: 9, billingCycle: "quarterly" }), // 3/mo
    ];
    expect(CostService.getTotalPerMonth(costs)).toBeCloseTo(15);
  });

  it("returns 0 when all costs are inactive", () => {
    const costs = [
      makeCost({ amount: 50, isActive: false }),
      makeCost({ amount: 100, isActive: false }),
    ];
    expect(CostService.getTotalPerMonth(costs)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// getBillingCycle
// ---------------------------------------------------------------------------

describe("CostService.getBillingCycle", () => {
  it.each([
    ["monthly", "Monatlich"],
    ["quarterly", "Vierteljährlich"],
    ["half_yearly", "Halbjährlich"],
    ["yearly", "Jährlich"],
  ] as const)('returns "%s" label for %s', (cycle, expected) => {
    expect(CostService.getBillingCycle(makeCost({ billingCycle: cycle }))).toBe(
      expected,
    );
  });
});

// ---------------------------------------------------------------------------
// formatAmount
// ---------------------------------------------------------------------------

describe("CostService.formatAmount", () => {
  it("formats a positive amount in EUR German locale", () => {
    const result = CostService.formatAmount(9.99);
    expect(result).toContain("9,99");
    expect(result).toContain("€");
  });

  it("formats zero", () => {
    const result = CostService.formatAmount(0);
    expect(result).toContain("0,00");
  });
});

// ---------------------------------------------------------------------------
// groupCostsByCategory
// ---------------------------------------------------------------------------

describe("CostService.groupCostsByCategory", () => {
  it("returns an empty object for an empty list", () => {
    expect(CostService.groupCostsByCategory([])).toEqual({});
  });

  it("groups costs by their categoryId", () => {
    const costs = [
      makeCost({ id: 1, categoryId: 0 }),
      makeCost({ id: 2, categoryId: 4 }),
      makeCost({ id: 3, categoryId: 0 }),
    ];
    const groups = CostService.groupCostsByCategory(costs);
    expect(groups["0"]).toHaveLength(2);
    expect(groups["4"]).toHaveLength(1);
  });

  it("handles costs with undefined categoryId as 'Uncategorized'", () => {
    const cost = { ...makeCost(), categoryId: undefined as unknown as number };
    const groups = CostService.groupCostsByCategory([cost]);
    expect(groups["Uncategorized"]).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// getCategoryWithMostAmount
// ---------------------------------------------------------------------------

describe("CostService.getCategoryWithMostAmount", () => {
  it("returns null for an empty list", () => {
    expect(CostService.getCategoryWithMostAmount([])).toBeNull();
  });

  it("returns null when all costs are inactive (total = 0)", () => {
    const costs = [makeCost({ amount: 50, isActive: false })];
    expect(CostService.getCategoryWithMostAmount(costs)).toBeNull();
  });

  it("returns the category with the highest monthly amount", () => {
    const costs = [
      makeCost({ categoryId: 0, amount: 5 }), // 5/mo
      makeCost({ categoryId: 4, amount: 20 }), // 20/mo
      makeCost({ categoryId: 4, amount: 10 }), // 10/mo — cat 4 total: 30
    ];
    const result = CostService.getCategoryWithMostAmount(costs);
    expect(result).not.toBeNull();
    expect(result![0]).toBe("4");
  });

  it("returns the percentage relative to total", () => {
    const costs = [
      makeCost({ categoryId: 0, amount: 25 }),
      makeCost({ categoryId: 4, amount: 75 }),
    ];
    const result = CostService.getCategoryWithMostAmount(costs);
    expect(result![0]).toBe("4");
    expect(result![1]).toBeCloseTo(75);
  });

  it("handles a single cost — returns 100%", () => {
    const costs = [makeCost({ categoryId: 3, amount: 10 })];
    const result = CostService.getCategoryWithMostAmount(costs);
    expect(result![0]).toBe("3");
    expect(result![1]).toBeCloseTo(100);
  });
});
