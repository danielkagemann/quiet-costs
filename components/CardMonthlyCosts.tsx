import { CostService } from "@/services/cost.service";
import { Card } from "./base/Card";
import { Text } from "./base/Text";
import { VSpace } from "./base/VSpace";

interface CardMonthlyCostsProps {
  total: number;
}
export const CardMonthlyCosts = ({ total }: CardMonthlyCostsProps) => {
  return (
    <Card color="primary" padding={16} radius={12}>
      <Text size="md" weight="semi-bold" color="primary">
        DEIN ÜBERBLICK
      </Text>
      <VSpace size={8} />
      <Text size="2xl" weight="bold">
        {CostService.formatAmount(total)}
      </Text>
      <VSpace size={2} />
      <Text size="sm">monatliche Kosten</Text>
    </Card>
  );
};
