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
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/base/Text";
import { VSpace } from "@/components/base/VSpace";

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

      <ScrollView style={{ flex: 1 }}>
        {Object.keys(groupedCosts).map((category: string) => (
          <Fragment key={category}>
            <Card color="empty">
              <CardTitle>{category}</CardTitle>
              <VSpace size={8} />
              {groupedCosts[category].map((cost) => (
                <Row key={cost.id} justify="between">
                  <Text size="md">{cost.name}</Text>
                  <Text size="md">{CostService.formatAmount(cost.amount)}</Text>
                </Row>
              ))}
            </Card>
            <VSpace size={2} />
          </Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
