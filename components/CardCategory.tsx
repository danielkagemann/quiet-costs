import { Cost } from "@/types/costs";
import { Card } from "./base/Card";
import { Row } from "./base/Row";
import { Text } from "./base/Text";
import { Configuration } from "@/utils/configuration";
import { CostService } from "@/services/cost.service";
import { Pressable, View } from "react-native";
import { Fragment, useState } from "react";
import { Colors } from "./base/Colors";

interface CardCategoryProps {
  categoryId: number;
  costs: Cost[];
}

export const CardCategory = ({ categoryId, costs }: CardCategoryProps) => {
  // states
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function renderList() {
    if (!isExpanded) return null;

    return (
      <>
        <View
          style={{
            height: 1,
            backgroundColor: Colors.border,
            marginVertical: 8,
          }}
        />

        <View style={{ gap: 8 }}>
          {costs.map((cost, index) => (
            <Pressable key={cost.id} onPress={() => null}>
              <Row justify="between">
                <Text size="sm" color="secondary">
                  {cost.name}
                </Text>
                <View
                  style={{
                    backgroundColor: Colors.border,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text size="xs">{CostService.getBillingCycle(cost)}</Text>
                </View>
                <Text size="sm" color="secondary">
                  {CostService.formatAmount(CostService.getAmount(cost))}
                </Text>
              </Row>
              {index < costs.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: Colors.border,
                    marginTop: 8,
                  }}
                />
              )}
            </Pressable>
          ))}
        </View>
      </>
    );
  }

  return (
    <Card color="empty">
      <Pressable onPress={() => setIsExpanded((prev) => !prev)}>
        <Row justify="between">
          <Text size="md" weight="bold">
            {Configuration.categories[categoryId]}
          </Text>
          <Text size="md" color="primary" weight="bold">
            {CostService.formatAmount(
              CostService.getTotalPerMonth(
                costs.filter((c) => c.categoryId === categoryId),
              ),
            )}
          </Text>
        </Row>
      </Pressable>
      {renderList()}
    </Card>
  );
};
