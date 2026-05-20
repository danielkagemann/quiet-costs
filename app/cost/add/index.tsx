import { DatabaseService } from "@/services/database.service";
import { Cost } from "@/types/costs";
import { Space } from "@/types/spaces";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Headline, Label, Text } from "@/components/base/Text";
import { Input } from "@/components/base/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Row } from "@/components/base/Row";
import { Button } from "@/components/base/Button";
import { Configuration } from "@/utils/configuration";
import { TopNavigation } from "@/components/TopNavigation";
import { CostService } from "@/services/cost.service";
import { InfoBox } from "@/components/InfoBox";
import { VSpace } from "@/components/base/VSpace";
import { Toggle } from "@/components/base/Toggle";
import { Card } from "@/components/base/Card";
import { Trash } from "lucide-react-native";
import { Colors } from "@/components/base/Colors";
import { Chip } from "@/components/base/Chip";
import { CostDetector } from "@/services/costdetector.service";

export default function AddCostScreen() {
  // hooks
  const db = useSQLiteContext();
  const router = useRouter();
  const param = useLocalSearchParams();

  // states
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [amountInput, setAmountInput] = useState("");
  const [categoryManuallySet, setCategoryManuallySet] = useState(false);
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

    // now check if we have an id param, if yes, we are in edit mode and need to load the cost
    if (param.id) {
      const costId = Number.parseInt(param.id as string);
      if (!Number.isNaN(costId)) {
        DatabaseService.getCostById(db, costId).then((item) => {
          if (item) {
            setCost(item);
            setAmountInput(item.amount.toString());
          }
        });
      }
    }
  }, [db, param.id]);

  // derived state for editing mode
  const isEditing = cost.id !== 0;

  /**
   * Run CostDetector when the name field loses focus.
   * Only applies in create mode and when no category was manually selected.
   */
  function onNameBlur() {
    if (isEditing || categoryManuallySet || cost.name.trim().length < 2) return;
    const detected = CostDetector.detectCategory(cost.name);
    if (detected >= 0) {
      setCost((c) => ({ ...c, categoryId: detected }));
    }
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
          <Chip
            active={cost[attribute] === index}
            onPress={() => {
              setCost({ ...cost, [attribute]: index });
              if (attribute === "categoryId") setCategoryManuallySet(true);
            }}
            key={index}
          >
            {item}
          </Chip>
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
          <Chip
            active={cost.spaceId === space.id}
            onPress={() => setCost({ ...cost, spaceId: space.id })}
            key={space.id}
          >
            {space.name}
          </Chip>
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
    if (isEditing) {
      DatabaseService.updateCost(db, cost).then(() => {
        router.back();
      });
    } else {
      DatabaseService.createCost(db, cost).then(() => {
        router.back();
      });
    }
  }

  /**
   * delete the cost from database
   */
  function onDelete() {
    if (!db) return;
    DatabaseService.deleteCost(db, cost.id).then(() => {
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, gap: 8, paddingBottom: 64 }}
        >
          {/* Name & amount & billing */}
          <Headline>Allgemein</Headline>
          <Label>Benenne die Ausgabe, z.B. Netflix</Label>
          <Input
            placeholder="e.g. Netflix"
            value={cost.name}
            onChange={(text) => setCost({ ...cost, name: text })}
            onBlur={onNameBlur}
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

          {/* active toggle: only in case of editing */}
          {isEditing && (
            <Row justify="between">
              <Label>Ist es noch aktiv?</Label>
              <Toggle
                value={cost.isActive}
                onChange={(value) => setCost({ ...cost, isActive: value })}
              />
            </Row>
          )}
          <VSpace size={8} />

          {/* billing cycle */}
          <Headline>Abrechnungszeitraum</Headline>
          <Row gap={4} justify="start">
            {(["monthly", "quarterly", "half_yearly", "yearly"] as const).map(
              (cycle) => (
                <Chip
                  key={cycle}
                  active={cost.billingCycle === cycle}
                  onPress={() => setCost({ ...cost, billingCycle: cycle })}
                >
                  {cycle === "monthly"
                    ? "Monatlich"
                    : cycle === "quarterly"
                      ? "Vierteljährlich"
                      : cycle === "half_yearly"
                        ? "Halbjährlich"
                        : "Jährlich"}
                </Chip>
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
            <Button color="primary" size="lg" radius="lg" onPress={onSave}>
              Speichern
            </Button>
          ) : (
            <InfoBox
              title="Speichern"
              description="Bitte fülle alle Pflichtfelder aus."
            />
          )}

          {/* delete button: only if in editing mode */}
          {isEditing && (
            <>
              <VSpace size={8} />
              <Card color="empty" padding={12} radius={8}>
                <Row gap={8}>
                  <View
                    style={{
                      backgroundColor: Colors.danger,
                      padding: 8,
                      borderRadius: 20,
                    }}
                  >
                    <Trash size={14} color={Colors.white} />
                  </View>
                  <Text color="danger" weight="bold">
                    Kostenpunkt löschen
                  </Text>
                </Row>

                <View>
                  <VSpace size={4} />
                  <Text color="secondary" size="sm">
                    Wenn Du diesen Kostenpunkt nicht mehr benötigst, kannst Du
                    ihn hier löschen. Diese Aktion kann nicht rückgängig gemacht
                    werden.
                  </Text>
                </View>
                <Row justify="end">
                  <Button color="danger" size="md" onPress={onDelete}>
                    Löschen
                  </Button>
                </Row>
              </Card>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
