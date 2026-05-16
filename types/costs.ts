export interface Cost {
  id: number;
  name: string;
  amount: number;
  billingCycle: "monthly" | "quarterly" | "half_yearly" | "yearly";
  isActive: boolean;
  categoryId: number;
  spaceId: number;
}
