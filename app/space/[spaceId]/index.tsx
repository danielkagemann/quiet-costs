import { Card, CardTitle } from "@/components/base/Card";
import { Row } from "@/components/base/Row";
import { TopNavigation } from "@/components/TopNavigation";
import { CostService } from "@/services/cost.service";
import { DatabaseService } from "@/services/database.service";
import { Cost } from "@/types/costs";
import { Space } from "@/types/spaces";
import { useIsFocused, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/base/Text";
import { VSpace } from "@/components/base/VSpace";
import { CardCategory } from "@/components/CardCategory";
import { FABButton } from "@/components/base/FABButton";
import { Configuration } from "@/utils/configuration";

export default function SpaceDetails() {
  // hooks
  const param = useLocalSearchParams();
  const db = useSQLiteContext();
  const isInFocus = useIsFocused();
  const router = useRouter();

  // states
  const [space, setSpace] = useState<Space | null>(null);
  const [costs, setCosts] = useState<Cost[]>([]);

  useEffect(() => {
    if (!db) return;

    const spaceId = Number(param.spaceId);
    DatabaseService.getSpaceById(db, spaceId)
      .then(setSpace)
      .catch(() => Alert.alert("Fehler", "Space konnte nicht geladen werden."));
    DatabaseService.getCostsForSpace(db, spaceId)
      .then((data) => setCosts(data))
      .catch(() =>
        Alert.alert("Fehler", "Kosten konnten nicht geladen werden."),
      );
  }, [db, param.spaceId, isInFocus]);

  // derived state
  const groupedCosts: Record<string, Cost[]> =
    CostService.groupCostsByCategory(costs);

  /**
   * render expensive category info
   * @returns
   */
  function renderExpensiveCategoryInfo() {
    const categoryWithMostCosts: [string, number] | null =
      CostService.getCategoryWithMostAmount(costs);
    if (!categoryWithMostCosts) return null;

    const [catId, percentage] = categoryWithMostCosts;

    return (
      <Text size="sm" color="danger" style={{ marginBottom: 16 }}>
        Deine teuerste Kategorie ist {Configuration.categories[catId]} mit{" "}
        {percentage.toFixed(2)}% der Gesamtkosten.
      </Text>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*header*/}
      <TopNavigation
        title={space ? space.name : "Lade Space..."}
        sub="Alle Kosten für diesen Space auf einen Blick."
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          flexDirection: "column",
          padding: 16,
          paddingBottom: 64,
        }}
        contentContainerStyle={{ gap: 12 }}
      >
        {/* overview card */}
        <Card color="primary" padding={12} radius={8} style={{ gap: 12 }}>
          <Text size="sm" color="primary">
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

        {renderExpensiveCategoryInfo()}

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
      <FABButton
        onPress={() => router.push(`/cost/add?spaceId=${param.spaceId}`)}
      />
    </SafeAreaView>
  );
}
