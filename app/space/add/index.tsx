import { SpaceForm } from "@/components/SpaceForm";
import { Space } from "@/types/spaces";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert } from "react-native";
import { DatabaseService } from "@/services/database.service";

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

  return (
    <SpaceForm
      title="Neuer Space"
      sub="Füge einen neuen Space hinzu, um Kosten an einen bestimmten Standort zuzuordnen"
      space={space}
      onChange={setSpace}
      onSave={onSave}
    />
  );
}
