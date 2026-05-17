import { Cost } from "@/types/costs";
import { Card } from "./base/Card";
import { Row } from "./base/Row";
import { Text } from "./base/Text";
import { Configuration } from "@/utils/configuration";
import { CostService } from "@/services/cost.service";
import { Pressable, View } from "react-native";
import { useState } from "react";
import { Colors } from "./base/Colors";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

interface CardCategoryProps {
  categoryId: number;
  costs: Cost[];
  initiallyOpen?: boolean;
}

export const CardCategory = ({
  categoryId,
  costs,
  initiallyOpen = false,
}: CardCategoryProps) => {
  // hooks
  const router = useRouter();

  // states
  const [isExpanded, setIsExpanded] = useState<boolean>(initiallyOpen);

  /**
   * render item within a category
   * @param cost
   * @param index
   * @returns
   */
  function renderItem(cost: Cost, index: number) {
    let amountText = CostService.formatAmount(cost.amount);
    if (!cost.isActive) {
      amountText = `(${amountText})`;
    }
    return (
      <Pressable
        key={cost.id}
        onPress={() => router.push(`/cost/add?id=${cost.id}`)}
      >
        <Row justify="between">
          {/* name */}
          {!cost.isActive && (
            <View
              style={{
                backgroundColor: Colors.danger,
                paddingVertical: 2,
                paddingHorizontal: 4,
                marginRight: 4,
                borderRadius: 4,
              }}
            >
              <Text size="xs" color={"white"}>
                Inaktiv
              </Text>
            </View>
          )}
          <Text size="sm" color="secondary" style={{ flex: 1 }}>
            {cost.name}
          </Text>

          {/* billing cycle */}
          <View
            style={{
              backgroundColor: Colors.border,
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: 4,
            }}
          >
            <Text size="xs" color="secondary">
              {CostService.getBillingCycle(cost)}
            </Text>
          </View>

          {/* amount */}
          <Row gap={4} style={{ minWidth: 90, justifyContent: "flex-end" }}>
            <Text
              size="sm"
              color={cost.isActive ? "text" : "secondary"}
              weight="semi-bold"
            >
              {amountText}
            </Text>
            <ChevronRight size={16} color={Colors.secondary} />
          </Row>
        </Row>
        {index < costs.length - 1 && (
          <View
            style={{
              height: 1,
              backgroundColor: Colors.border,
              marginVertical: 12,
            }}
          />
        )}
      </Pressable>
    );
  }

  /**
   * render costs for a specific category
   * @returns
   */
  function renderList() {
    if (!isExpanded) return null;

    return (
      <Card color="empty" padding={12} radius={8}>
        {costs.map((cost, index) => renderItem(cost, index))}
      </Card>
    );
  }

  return (
    <>
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
    </>
  );
};
