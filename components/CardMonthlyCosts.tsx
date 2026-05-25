import { CostService } from "@/services/cost.service";
import { Card } from "./base/Card";
import { Text } from "./base/Text";
import { VSpace } from "./base/VSpace";
import { View } from "react-native";
import { Colors } from "./base/Colors";
import { LineChart, TLineChartPoint } from "react-native-wagmi-charts";
import { Stop } from "react-native-svg";

interface CardMonthlyCostsProps {
  total: number;
  chartData?: TLineChartPoint[];
}
export const CardMonthlyCosts = ({
  total,
  chartData,
}: CardMonthlyCostsProps) => {
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
        {/* chart */}
        {chartData && chartData.length > 3 && (
          <View style={{ overflow: "visible" }}>
            <LineChart.Provider data={chartData}>
              <LineChart width={130} height={100} yGutter={12}>
                {/* Filled Area */}
                <LineChart.Path color={Colors.primary} width={2}>
                  <LineChart.Gradient color={Colors.primary}>
                    <Stop
                      offset="0%"
                      stopColor={Colors.primary}
                      stopOpacity={0.35}
                    />
                    <Stop
                      offset="100%"
                      stopColor={Colors.primary}
                      stopOpacity={0.02}
                    />
                  </LineChart.Gradient>
                </LineChart.Path>
              </LineChart>
            </LineChart.Provider>
          </View>
        )}
      </View>
    </Card>
  );
};
