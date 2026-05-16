import { Card, CardDescription, CardTitle } from "@/components/base/Card";
import { Input } from "@/components/base/Input";
import { TopNavigation } from "@/components/TopNavigation";
import { Space } from "@/types/spaces";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/base/Button";
import { DatabaseService } from "@/services/database.service";
import { SpaceService } from "@/services/space.service";
import { Text } from "@/components/base/Text";

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
    DatabaseService.addSpace(db, space).then(() => {
      router.back();
    });
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

        <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
          <Card color="empty" padding={12} radius={8} style={{ gap: 12 }}>
            <CardTitle>Informationen zum Space</CardTitle>
            <CardDescription>
              Wähle einen Namen für Deinen Space, z.B. Zuhause, Arbeit, etc. So
              kannst Du Deine Kosten später besser zuordnen und analysieren.
            </CardDescription>

            <Input
              placeholder="e.g. Zuhause, Arbeit, etc."
              value={space.name}
              onChange={(text) => setSpace({ ...space, name: text })}
            />
            <Input
              placeholder="Beschreibung (optional)"
              value={space.description ?? ""}
              onChange={(text) => setSpace({ ...space, description: text })}
            />
          </Card>

          {/* save button */}
          {SpaceService.isValid(space) ? (
            <Button color="primary" size="lg" onPress={onSave}>
              Speichern
            </Button>
          ) : (
            <Text size="sm" color="secondary">
              Bitte fülle alle Pflichtfelder aus, um fortzufahren.
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
