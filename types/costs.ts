export interface Cost {
  id: number;
  name: string;
  amount: number;
  start_date: string;
  payment_method: string;
  billingCycle: "monthly" | "yearly";
  categoryId: string;
  spaceId: number;
}
