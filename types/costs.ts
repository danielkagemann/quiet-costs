export interface Cost {
  id: number;
  name: string;
  amount: number;
  start_date: Date;
  payment_method: number;
  billingCycle: "monthly" | "yearly";
  categoryId: number;
  spaceId: number;
}
