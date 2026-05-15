import { Cost } from "@/types/costs";

export const CostService = {
  getTotalPerMonth: (costs: Cost[]) => {
    return costs.reduce((total, cost) => {
      const amount =
        cost.billingCycle === "monthly" ? cost.amount : cost.amount / 12;
      return total + amount;
    }, 0);
  },
};
