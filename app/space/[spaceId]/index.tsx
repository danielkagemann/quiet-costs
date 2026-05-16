import { Card, CardTitle } from "@/components/base/Card";
import { Row } from "@/components/base/Row";
import { TopNavigation } from "@/components/TopNavigation";
import { CostService } from "@/services/cost.service";
import { DatabaseService } from "@/services/database.service";
import { Cost } from "@/types/costs";
import { Space } from "@/types/spaces";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Fragment, useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/base/Text";
import { VSpace } from "@/components/base/VSpace";
import { Colors } from "@/components/base/Colors";
import { CardCategory } from "@/components/CardCategory";

export default function SpaceDetails() {
  // hooks
  const param = useLocalSearchParams();
  const db = useSQLiteContext();

  // states
  const [space, setSpace] = useState<Space | null>(null);
  const [costs, setCosts] = useState<Cost[]>([]);

  useEffect(() => {
    if (!db) return;

    const spaceId = Number(param.spaceId);
    DatabaseService.getSpaceById(db, spaceId).then(setSpace);
    DatabaseService.getCostsForSpace(db, spaceId).then((data) => {
      setCosts(data);
    });
  }, [db, param.spaceId]);

  // derived state
  const groupedCosts: Record<string, Cost[]> =
    CostService.groupCostsByCategory(costs);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
      {/*header*/}
      <TopNavigation
        title={space ? space.name : "Lade Space..."}
        sub="Alle Kosten für diesen Space auf einen Blick."
      />
      <VSpace size={16} />

      {/* overview card */}
      <Card color="empty" padding={12} radius={8} style={{ gap: 12 }}>
        <Text size="sm" color="secondary">
          MONATLICHE KOSTEN
        </Text>
        <Text size="2xl" weight="bold">
          {CostService.formatAmount(CostService.getTotalPerMonth(costs))}
        </Text>
        <Text size="xs" color="secondary">
          Alle Kosten werden auf einen monatlichen Betrag umgerechnet, um die
          Übersicht zu erleichtern.
        </Text>
      </Card>

      <ScrollView
        style={{ flex: 1, flexDirection: "column", gap: 12, paddingTop: 16 }}
      >
        <View style={{ gap: 8 }}>
          {Object.keys(groupedCosts).map((category: string) => (
            <CardCategory
              key={category}
              categoryId={Number(category)}
              costs={groupedCosts[category]}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
