import { SafeAreaView } from "react-native-safe-area-context";
import { SmallHeader } from "./SmallHeader";
import { Text } from "./base/Text";
import { VSpace } from "./base/VSpace";
import { Card } from "./base/Card";
import { Button } from "./base/Button";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { DatabaseService } from "@/services/database.service";
import { CostService } from "@/services/cost.service";
import { Cost } from "@/types/costs";
import { Space } from "@/types/spaces";
import { CardMonthlyCosts } from "./CardMonthlyCosts";
import { Row } from "./base/Row";
import { CardSpace } from "./CardSpace";
import { FABButton } from "./base/FABButton";
import Animated, {
  FadeIn,
  FadeInLeft,
  FlipInEasyY,
} from "react-native-reanimated";
import { useIsFocused, useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { CalendarDays, EyeOff, House, Rows3 } from "lucide-react-native";
import { Colors } from "./base/Colors";

export const OverviewScreen = () => {
  // hooks
  const db = useSQLiteContext();
  const router = useRouter();
  const isFocused = useIsFocused();

  // derived state
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [costs, setCosts] = useState<Cost[]>([]);

  useEffect(() => {
    if (!db) return;
    DatabaseService.getSpaces(db).then(setSpaces);
    DatabaseService.getCosts(db).then(setCosts);
  }, [db, isFocused]);

  /**
   * render summary
   * @returns
   */
  function renderSummary() {
    const total = CostService.getTotalPerMonth(costs);

    if (total === 0) {
      return (
        <>
          <Animated.View entering={FadeIn.delay(200)}>
            <Text size="2xl">Verstehe,{"\n"}was dein Alltag kostet.</Text>
            <VSpace size={8} />
            <Text size="md" color="secondary">
              Verwalte laufende Kosten für Zuhause, digitale Dienste und mehr.
            </Text>

            <VSpace size={8} />
          </Animated.View>

          <Animated.View entering={FlipInEasyY.delay(400).duration(800)}>
            <CardMonthlyCosts total={total} />
          </Animated.View>

          <VSpace size={4} />

          <Animated.View entering={FadeIn.delay(600)}>
            <Button color="primary" onPress={() => router.push("/cost/add")}>
              Erste Kosten hinzufügen
            </Button>
          </Animated.View>
        </>
      );
    }

    // we have costs, show the summary card
    return (
      <>
        <Card color="empty" padding={8} radius={16}>
          <Row justify="between" gap={16}>
            <Row gap={8}>
              <Rows3 color={Colors.primary} size={14} />
              <Text size="sm">{costs.length} Kosten</Text>
            </Row>
            <Row gap={8}>
              <House color={Colors.primary} size={14} />
              <Text size="sm">{spaces.length} Spaces</Text>
            </Row>
          </Row>
          <View
            style={{
              height: 1,
              backgroundColor: Colors.border,
              marginVertical: 6,
            }}
          />
          <Row justify="between" gap={16}>
            <Row gap={8}>
              <CalendarDays color={Colors.primary} size={14} />
              <Text size="sm">
                {CostService.formatAmount(total * 12)} / Jahr
              </Text>
            </Row>
            <Row gap={8}>
              <EyeOff color={Colors.primary} size={14} />
              <Text size="sm">
                {costs.filter((c) => !c.isActive).length} Inaktiv
              </Text>
            </Row>
          </Row>
        </Card>
        <VSpace size={8} />
        <CardMonthlyCosts total={total} />
      </>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <SmallHeader />

      {renderSummary()}

      <VSpace size={16} />

      <Row justify="between">
        <Text size="md" color="secondary" weight="bold">
          SPACES
        </Text>
        <Pressable onPress={() => router.push("/space/add")}>
          <Text size="sm" color="primary">
            Neuer Space
          </Text>
        </Pressable>
      </Row>

      <VSpace size={8} />

      <ScrollView contentContainerStyle={{ gap: 16, flex: 1 }}>
        {spaces.map((space: Space, index: number) => {
          const spaceCosts = costs.filter(
            (cost: Cost) => cost.spaceId === space.id,
          );
          return (
            <Animated.View
              key={space.id}
              entering={FadeInLeft.delay(index * 100)}
            >
              <Pressable onPress={() => router.push(`/space/${space.id}`)}>
                <CardSpace name={space.name} costs={spaceCosts} />
              </Pressable>
              {index < spaces.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: Colors.border,
                    marginTop: 16,
                  }}
                />
              )}
            </Animated.View>
          );
        })}
      </ScrollView>
      {costs.length > 0 && (
        <FABButton onPress={() => router.push("/cost/add")} />
      )}
    </SafeAreaView>
  );
};
