import { Cost } from "@/types/costs";
import { Card } from "./base/Card";
import { Text } from "./base/Text";
import { VSpace } from "./base/VSpace";
import { Row } from "./base/Row";
import { View } from "react-native";

interface CardSpaceProps {
  name: string;
  costs: Cost[];
}

export const CardSpace = ({ name, costs }: CardSpaceProps) => {
  if (costs.length === 0) {
    return (
      <Card color="empty" padding={16} radius={12}>
        <Text size="md" weight="bold">
          {name}
        </Text>
        <VSpace size={4} />
        <Text color="text">Noch keine laufenden Kosten.</Text>
        <VSpace size={4} />
        <Text color="secondary">
          Hier siehst Du monatliche Gesamtbelastung Kosten pro Space jährliche
          Verpflichtungen
        </Text>
      </Card>
    );
  }

  const total = costs.reduce((sum, cost) => sum + cost.amount, 0);

  // show more information with click options, e.g. show all costs, edit, delete, etc.
  return (
    <Card color="empty" padding={12} radius={12}>
      <Row justify="between" gap={16}>
        <View>
          <Text size="md" weight="bold">
            {name}
          </Text>
          <Text size="xs" color="secondary">
            {costs.length} Einträge
          </Text>
        </View>
        <View>
          <Text size="md" weight="bold" style={{ textAlign: "right" }}>
            {Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(total)}
          </Text>
          <Text size="xs" color="secondary" style={{ textAlign: "right" }}>
            monatliche Kosten
          </Text>
        </View>
      </Row>
    </Card>
  );
};
