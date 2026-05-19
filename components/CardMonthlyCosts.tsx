import { CostService } from "@/services/cost.service";
import { Card } from "./base/Card";
import { Text } from "./base/Text";
import { VSpace } from "./base/VSpace";
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { Colors } from "./base/Colors";

const CHART_W = 130;
const CHART_H = 80;
const LINE = "M 0,72 C 40,70 60,58 90,38 S 115,10 130,6";
const AREA = `M 0,${CHART_H} L 0,72 C 40,70 60,58 90,38 S 115,10 130,6 L 130,${CHART_H} Z`;

interface CardMonthlyCostsProps {
  total: number;
}
export const CardMonthlyCosts = ({ total }: CardMonthlyCostsProps) => {
  return (
    <Card color="primary" padding={16} radius={12}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text size="md" weight="semi-bold" color="primary">
            DEIN ÜBERBLICK
          </Text>
          <VSpace size={8} />
          <Text size="2xl" weight="bold">
            {CostService.formatAmount(total)}
          </Text>
          <VSpace size={2} />
          <Text size="sm">monatliche Kosten</Text>
        </View>
        <Svg width={CHART_W} height={CHART_H}>
          <Path d={AREA} fill={Colors.primary + "30"} />
          <Path
            d={LINE}
            fill="none"
            stroke={Colors.primary}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Circle cx={130} cy={6} r={5} fill={Colors.primary} />
        </Svg>
      </View>
    </Card>
  );
};
