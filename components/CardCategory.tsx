import { Cost } from "@/types/costs";
import { Row } from "./base/Row";
import { Text } from "./base/Text";
import { Configuration } from "@/utils/configuration";
import { CostService } from "@/services/cost.service";
import { Pressable, View } from "react-native";
import { useState } from "react";
import { useColors } from "./base/useColors";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { VSpace } from "./base/VSpace";

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
  const colors = useColors();

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
        role="button"
        accessibilityLabel={`Kostenpunkt ${cost.name} mit Betrag ${amountText}`}
        key={cost.id}
        onPress={() => router.push(`/cost/add?id=${cost.id}`)}
      >
        <Row justify="between">
          {/* name */}
          {!cost.isActive && (
            <View
              style={{
                backgroundColor: colors.danger,
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
              backgroundColor: colors.border,
              paddingHorizontal: 5,
              paddingVertical: 1,
              borderRadius: 8,
            }}
          >
            <Text size="xs" color="secondary">
              {CostService.getBillingCycle(cost)}
            </Text>
          </View>

          {/* amount */}
          <Row gap={4} style={{ minWidth: 90, justifyContent: "flex-end" }}>
            <Text size="sm" color={cost.isActive ? "text" : "secondary"}>
              {amountText}
            </Text>
            <ChevronRight size={16} color={colors.secondary} />
          </Row>
        </Row>
        {index < costs.length - 1 && (
          <View
            style={{
              height: 1,
              backgroundColor: colors.border,
              marginTop: 8,
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
      <>
        {costs.map((cost, index) => renderItem(cost, index))}
        <View
          style={{
            height: 2,
            backgroundColor: colors.border,
            marginLeft: -16,
            marginRight: -16,
          }}
        />
        <VSpace size={4} />
      </>
    );
  }

  const IconComponent = Configuration.categoryIcons[categoryId];

  return (
    <>
      <Pressable
        role="button"
        accessibilityLabel={`Kategorie ${Configuration.categories[categoryId]}`}
        onPress={() => setIsExpanded((prev) => !prev)}
        style={{ paddingVertical: 4 }}
      >
        <Row justify="between">
          <View
            style={{
              backgroundColor: colors.border,
              padding: 6,
              borderRadius: 20,
            }}
          >
            <IconComponent size={12} color={colors.secondary} />
          </View>
          <Text size="md" weight="bold" style={{ flex: 1, marginLeft: 8 }}>
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
