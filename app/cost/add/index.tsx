import { DatabaseService } from "@/services/database.service";
import { Cost } from "@/types/costs";
import { Space } from "@/types/spaces";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Text } from "@/components/base/Text";
import { Input } from "@/components/base/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Row } from "@/components/base/Row";
import { Button } from "@/components/base/Button";
import { Card } from "@/components/base/Card";
import { Configuration } from "@/utils/configuration";

export default function AddCostScreen() {
  // hooks
  const db = useSQLiteContext();
  const router = useRouter();

  // states
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [cost, setCost] = useState<Cost>({
    id: 0,
    name: "",
    amount: 0,
    start_date: new Date(),
    payment_method: 0,
    billingCycle: "monthly",
    categoryId: 0,
    spaceId: 0,
  });

  // initialize spaces
  useEffect(() => {
    if (!db) return;
    DatabaseService.getSpaces(db).then((list) => {
      setSpaces(list);
    });
  }, [db]);

  /**
   * render title
   * @param val
   * @returns
   */
  function title(val: string) {
    return (
      <Text size="sm" color="primary" weight="semi-bold">
        {val}
      </Text>
    );
  }

  /**
   * render description text
   * @param val
   * @returns
   */
  function description(val: string) {
    return (
      <Text size="xs" color="secondary">
        {val}
      </Text>
    );
  }

  /**
   * render chips
   * @param items
   * @param attribute
   * @returns
   */
  function chips(items: string[], attribute: keyof Cost) {
    return (
      <Row justify="start" gap={4} wrap>
        {items.map((item, index) => (
          <Button
            size="sm"
            key={index}
            color={cost[attribute] === index ? "primary" : "light"}
            onPress={() => setCost({ ...cost, [attribute]: index })}
          >
            {item}
          </Button>
        ))}
      </Row>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/*header*/}
        <View style={{ padding: 16 }}>
          <Row justify="start" gap={8}>
            <Button color="empty" onPress={() => router.back()}>
              &larr;
            </Button>
            <Text size="md" weight="bold">
              Neuer Kostenpunkt
            </Text>
          </Row>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
          {/* Name & amount & billing */}
          <Card color="empty" padding={12} radius={8} style={{ gap: 12 }}>
            {title("Allgemein")}
            {description(
              "Hier kannst Du allgemeine Informationen zu Deiner Ausgabe eingeben.",
            )}

            <Input
              placeholder="e.g. Netflix"
              value={cost.name}
              onChange={(text) => setCost({ ...cost, name: text })}
            />

            <Input
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={cost.amount.toString()}
              onChange={(text) =>
                setCost({ ...cost, amount: Number.parseFloat(text) || 0 })
              }
            />

            <Row gap={4} justify="start">
              {["monthly", "yearly"].map((cycle) => (
                <Button
                  size="sm"
                  key={cycle}
                  color={cost.billingCycle === cycle ? "primary" : "secondary"}
                  onPress={() =>
                    setCost({
                      ...cost,
                      billingCycle: cycle as "monthly" | "yearly",
                    })
                  }
                >
                  {cycle === "monthly" ? "Monatlich" : "Jährlich"}
                </Button>
              ))}
            </Row>
          </Card>

          {/* date & payment method */}
          <Card color="empty" padding={12} radius={8} style={{ gap: 12 }}>
            {title("Zahlungsmethode")}
            {description(
              "Hier kannst Du die Zahlungsmethode für Deine Ausgabe auswählen.",
            )}
            {chips(Configuration.payment, "payment_method")}
          </Card>

          {/* categories */}
          <Card color="empty" padding={12} radius={8} style={{ gap: 12 }}>
            {title("Kategorie auswählen")}
            {description(
              "Wähle die Kategorie aus, die am besten zu Deiner Ausgabe passt. So behältst Du immer den Überblick.",
            )}
            {chips(Configuration.categories, "categoryId")}
          </Card>

          {/* spaces */}
          <Card color="empty" padding={12} radius={8} style={{ gap: 12 }}>
            {title("Space auswählen")}
            {description(
              "Ordne Deine Ausgabe einem Space zu, um sie besser zu organisieren und zuordnen zu können.",
            )}

            <Row justify="start" gap={4} wrap>
              {spaces.map((space) => (
                <Button
                  size="sm"
                  key={space.id}
                  color={cost.spaceId === space.id ? "primary" : "light"}
                  onPress={() => setCost({ ...cost, spaceId: space.id })}
                >
                  {space.name}
                </Button>
              ))}
            </Row>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
