import { Cost } from "@/types/costs";
import { Configuration } from "@/utils/configuration";

export const CostService = {
  getTotalPerMonth: (costs: Cost[]) => {
    return costs.reduce((total, cost) => {
      const amount =
        cost.billingCycle === "monthly" ? cost.amount : cost.amount / 12;
      return total + amount;
    }, 0);
  },

  isValid(cost: Cost) {
    return (
      cost.name.trim() !== "" &&
      cost.amount > 0 &&
      cost.start_date instanceof Date
    );
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
        const category =
          Configuration.categories[cost.categoryId] ?? "Uncategorized";
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
