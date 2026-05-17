import { Card, CardTitle } from "@/components/base/Card";
import { Row } from "@/components/base/Row";
import { TopNavigation } from "@/components/TopNavigation";
import { CostService } from "@/services/cost.service";
import { DatabaseService } from "@/services/database.service";
import { Cost } from "@/types/costs";
import { Space } from "@/types/spaces";
import { useIsFocused, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/base/Text";
import { VSpace } from "@/components/base/VSpace";
import { CardCategory } from "@/components/CardCategory";

export default function SpaceDetails() {
  // hooks
  const param = useLocalSearchParams();
  const db = useSQLiteContext();
  const isInFocus = useIsFocused();

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
  }, [db, param.spaceId, isInFocus]);

  // derived state
  const groupedCosts: Record<string, Cost[]> =
    CostService.groupCostsByCategory(costs);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*header*/}
      <TopNavigation
        title={space ? space.name : "Lade Space..."}
        sub="Alle Kosten für diesen Space auf einen Blick."
      />
      <ScrollView
        style={{ flex: 1, flexDirection: "column", gap: 12, padding: 16 }}
      >
        {/* overview card */}
        <Card color="primary" padding={12} radius={8} style={{ gap: 12 }}>
          <Text size="sm" color="secondary">
            MONATLICHE KOSTEN
          </Text>
          <Text size="2xl" weight="bold">
            {CostService.formatAmount(CostService.getTotalPerMonth(costs))}
          </Text>
          <Text size="xs" color="secondary">
            Alle Kosten werden auf einen monatlichen Betrag umgerechnet, um die
            Übersicht zu erleichtern. Tippe auf eine Kategorie, um die Details
            zu sehen.
          </Text>
        </Card>

        <VSpace size={8} />

        <View style={{ gap: 12 }}>
          {Object.keys(groupedCosts).map((category: string, index: number) => (
            <CardCategory
              key={category}
              categoryId={Number(category)}
              costs={groupedCosts[category]}
              initiallyOpen={index === 0} // open first category by default
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
