import { Cost } from "@/types/costs";

export const CostService = {
  getTotalPerMonth: (costs: Cost[]) => {
    return costs.reduce((total, cost) => {
      if (!cost.isActive) return total; // ignore inactive costs
      return total + CostService.getAmount(cost);
    }, 0);
  },

  isValid(cost: Cost) {
    return cost.name.trim() !== "" && cost.amount > 0;
  },

  getBillingCycle(cost: Cost) {
    switch (cost.billingCycle) {
      case "monthly":
        return "Monatlich";
      case "quarterly":
        return "Vierteljährlich";
      case "half_yearly":
        return "Halbjährlich";
      case "yearly":
        return "Jährlich";
      default:
        return "Unbekannt";
    }
  },

  getAmount(cost: Cost) {
    if (!cost.isActive) return 0;
    if (cost.billingCycle === "monthly") {
      return cost.amount;
    } else if (cost.billingCycle === "quarterly") {
      return cost.amount / 3;
    } else if (cost.billingCycle === "half_yearly") {
      return cost.amount / 6;
    } else if (cost.billingCycle === "yearly") {
      return cost.amount / 12;
    }
    return cost.amount; // fallback, should not happen
  },

  formatAmount(amount: number) {
    return Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  },

  groupCostsByCategory(costs: Cost[]): Record<string, Cost[]> {
    return costs.reduce(
      (groups, cost) => {
        const category = cost.categoryId ?? "Uncategorized";
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(cost);
        return groups;
      },
      {} as Record<string, Cost[]>,
    );
  },
};
