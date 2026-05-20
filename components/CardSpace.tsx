import { Cost } from "@/types/costs";
import { Card } from "./base/Card";
import { Text } from "./base/Text";
import { VSpace } from "./base/VSpace";
import { Row } from "./base/Row";
import { View } from "react-native";
import { CostService } from "@/services/cost.service";
import { ChevronRight } from "lucide-react-native";
import { Colors } from "./base/Colors";

interface CardSpaceProps {
  name: string;
  costs: Cost[];
}

export const CardSpace = ({ name, costs }: CardSpaceProps) => {
  if (costs.length === 0) {
    return (
      <View>
        <Text size="md" weight="bold">
          {name}
        </Text>
        <VSpace size={4} />

        <Text color="secondary" size="sm">
          Noch keine laufenden Kosten.
        </Text>
        <VSpace size={4} />
      </View>
    );
  }

  const total = CostService.getTotalPerMonth(costs);

  // show more information with click options, e.g. show all costs, edit, delete, etc.
  return (
    <Row justify="between" gap={16}>
      <View style={{ gap: 8 }}>
        <Text size="md" weight="bold">
          {name}
        </Text>
        <Text size="sm" color="secondary">
          {costs.length} Einträge
        </Text>
      </View>
      <View>
        <Row justify="between">
          <View>
            <Text size="md" weight="bold" style={{ textAlign: "right" }}>
              {CostService.formatAmount(total)}
            </Text>
            <Text size="xs" color="secondary" style={{ textAlign: "right" }}>
              monatliche Kosten
            </Text>
          </View>
          <ChevronRight size={24} color="#888" style={{ marginLeft: 8 }} />
        </Row>
      </View>
    </Row>
  );
};
