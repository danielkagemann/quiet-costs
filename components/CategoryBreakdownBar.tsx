import { Cost } from "@/types/costs";
import { CostService } from "@/services/cost.service";
import { Configuration } from "@/utils/configuration";
import { useColors } from "./base/useColors";
import { View } from "react-native";
import { Text } from "./base/Text";
import { Row } from "./base/Row";

interface CategoryBreakdownBarProps {
  costs: Cost[];
}

export function CategoryBreakdownBar({
  costs,
}: Readonly<CategoryBreakdownBarProps>) {
  const colors = useColors();
  const grouped = CostService.groupCostsByCategory(costs);
  const spaceTotal = CostService.getTotalPerMonth(costs);

  if (spaceTotal === 0) return null;

  // build sorted entries: [categoryId, monthlyTotal]
  const entries: [number, number][] = Object.entries(grouped)
    .map(
      ([catId, catCosts]) =>
        [Number(catId), CostService.getTotalPerMonth(catCosts)] as [
          number,
          number,
        ],
    )
    .filter(([, amount]) => amount > 0)
    .sort(([, a], [, b]) => b - a);

  return (
    <View style={{ gap: 10 }}>
      {/* proportional bar */}
      <Row gap={2} style={{ height: 8, borderRadius: 4, overflow: "hidden" }}>
        {entries.map(([catId, amount]) => (
          <View
            key={catId}
            style={{
              flex: amount / spaceTotal,
              backgroundColor:
                Configuration.categoryColors[catId] ?? colors.secondary,
              height: 8,
            }}
          />
        ))}
      </Row>

      {/* legend */}
      <View style={{ gap: 6 }}>
        {entries.map(([catId, amount]) => {
          const pct = ((amount / spaceTotal) * 100).toFixed(0);
          const IconComponent = Configuration.categoryIcons[catId];
          return (
            <Row key={catId} justify="between" gap={8}>
              <Row gap={6} style={{ flex: 1 }}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      Configuration.categoryColors[catId] ?? colors.secondary,
                    marginTop: 2,
                  }}
                />
                {IconComponent && (
                  <IconComponent size={12} color={colors.secondary} />
                )}
                <Text size="sm" color="secondary" style={{ flex: 1 }}>
                  {Configuration.categories[catId]}
                </Text>
              </Row>
              <Row gap={6}>
                <Text size="sm" weight="bold">
                  {CostService.formatAmount(amount)}
                </Text>
                <Text size="xs" color="secondary">
                  {pct}%
                </Text>
              </Row>
            </Row>
          );
        })}
      </View>
    </View>
  );
}
