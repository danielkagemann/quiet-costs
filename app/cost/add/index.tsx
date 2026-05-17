import { DatabaseService } from "@/services/database.service";
import { Cost } from "@/types/costs";
import { Space } from "@/types/spaces";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Headline, Label } from "@/components/base/Text";
import { Input } from "@/components/base/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Row } from "@/components/base/Row";
import { Button } from "@/components/base/Button";
import { Configuration } from "@/utils/configuration";
import { TopNavigation } from "@/components/TopNavigation";
import { CostService } from "@/services/cost.service";
import { InfoBox } from "@/components/InfoBox";
import { VSpace } from "@/components/base/VSpace";

export default function AddCostScreen() {
  // hooks
  const db = useSQLiteContext();
  const router = useRouter();

  // states
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [amountInput, setAmountInput] = useState("");
  const [cost, setCost] = useState<Cost>({
    id: 0,
    name: "",
    amount: 0,
    billingCycle: "monthly",
    isActive: true,
    categoryId: 0,
    spaceId: 0,
  });

  // initialize spaces
  useEffect(() => {
    if (!db) return;
    DatabaseService.getSpaces(db).then((list) => {
      setSpaces(list);
      // pre-select the first space if available
      if (list.length > 0) setCost((c) => ({ ...c, spaceId: list[0].id }));
    });
  }, [db]);

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
            color={cost[attribute] === index ? "primary" : "outline"}
            onPress={() => setCost({ ...cost, [attribute]: index })}
          >
            {item}
          </Button>
        ))}
      </Row>
    );
  }

  /**
   * chips for spaces
   * @param items
   * @returns
   */
  function spaceChips(items: Space[]) {
    return (
      <Row justify="start" gap={4} wrap>
        {items.map((space) => (
          <Button
            size="sm"
            key={space.id}
            color={cost.spaceId === space.id ? "primary" : "outline"}
            onPress={() => setCost({ ...cost, spaceId: space.id })}
          >
            {space.name}
          </Button>
        ))}
      </Row>
    );
  }

  /**
   * save cost to database
   * @returns
   */
  function onSave() {
    if (!db) return;
    DatabaseService.createCost(db, cost).then(() => {
      router.back();
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/*header*/}
        <TopNavigation
          title="Neuer Kostenpunkt"
          sub="Wiederkehrende Kosten hinzufügen"
        />

        <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
          {/* Name & amount & billing */}
          <Headline>Allgemein</Headline>
          <Label>Benenne die Ausgabe, z.B. Netflix</Label>
          <Input
            placeholder="e.g. Netflix"
            value={cost.name}
            onChange={(text) => setCost({ ...cost, name: text })}
          />
          <Label>Gib den Betrag der Ausgabe ein, z.B. 9.99</Label>
          <Input
            placeholder="0.00"
            inputMode="decimal"
            value={amountInput}
            onChange={(text) => {
              // replace comma with dot, strip everything except digits and one dot
              const normalized = text.replace(",", ".");
              const sanitized = normalized
                .replace(/[^0-9.]/g, "")
                .replace(/^(\d*\.?\d*).*$/, "$1");
              setAmountInput(sanitized);
              setCost({ ...cost, amount: Number.parseFloat(sanitized) || 0 });
            }}
          />
          <VSpace size={8} />

          {/* billing cycle */}
          <Headline>Abrechnungszeitraum</Headline>
          <Row gap={4} justify="start">
            {(["monthly", "quarterly", "half_yearly", "yearly"] as const).map(
              (cycle) => (
                <Button
                  size="sm"
                  key={cycle}
                  color={cost.billingCycle === cycle ? "primary" : "secondary"}
                  onPress={() => setCost({ ...cost, billingCycle: cycle })}
                >
                  {cycle === "monthly"
                    ? "Monatlich"
                    : cycle === "quarterly"
                      ? "Vierteljährlich"
                      : cycle === "half_yearly"
                        ? "Halbjährlich"
                        : "Jährlich"}
                </Button>
              ),
            )}
          </Row>
          <VSpace size={8} />

          {/* categories */}
          <Headline>Kategorie auswählen</Headline>
          {chips(Configuration.categories, "categoryId")}
          <VSpace size={8} />

          {/* spaces */}
          <Headline>Space auswählen</Headline>
          {spaceChips(spaces)}

          <VSpace size={16} />

          {/* save button */}
          {CostService.isValid(cost) ? (
            <Button color="primary" size="lg" onPress={onSave}>
              Speichern
            </Button>
          ) : (
            <InfoBox
              title="Speichern"
              description="Bitte fülle alle Pflichtfelder aus."
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
