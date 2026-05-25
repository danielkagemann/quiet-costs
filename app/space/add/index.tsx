import { Input } from "@/components/base/Input";
import { TopNavigation } from "@/components/TopNavigation";
import { Space } from "@/types/spaces";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/base/Button";
import { DatabaseService } from "@/services/database.service";
import { SpaceService } from "@/services/space.service";
import { Headline, Label } from "@/components/base/Text";
import { InfoBox } from "@/components/InfoBox";
import { VSpace } from "@/components/base/VSpace";

export default function SpaceAddScreen() {
  // hooks
  const db = useSQLiteContext();
  const router = useRouter();

  // states
  const [space, setSpace] = useState<Space>({
    id: 0,
    name: "",
    description: "",
  });

  function onSave() {
    if (!db) return;
    DatabaseService.addSpace(db, space)
      .then(() => router.back())
      .catch(() =>
        Alert.alert("Fehler", "Space konnte nicht gespeichert werden."),
      );
  }

  // TODO add image

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/*header*/}
        <TopNavigation
          title="Neuer Space"
          sub="Füge einen neuen Space hinzu, um Kosten an einen bestimmten Standort zuzuordnen"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, gap: 8 }}
        >
          <Headline>Informationen zum Space</Headline>

          <Label>
            Name für den Space mit dem Du Kosten verknüpfen möchtest
          </Label>
          <Input
            placeholder="e.g. Zuhause, Arbeit, etc."
            value={space.name}
            onChange={(text) => setSpace({ ...space, name: text })}
          />
          <Label>Beschreibung über den Space (optional)</Label>
          <Input
            placeholder="Beschreibung"
            value={space.description ?? ""}
            onChange={(text) => setSpace({ ...space, description: text })}
          />

          <VSpace size={16} />

          {/* save button */}
          {SpaceService.isValid(space) ? (
            <Button color="primary" size="lg" radius="lg" onPress={onSave}>
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
