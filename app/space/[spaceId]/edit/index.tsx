import { SpaceForm } from "@/components/SpaceForm";
import { Space } from "@/types/spaces";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { DatabaseService } from "@/services/database.service";
import { Loading } from "@/components/Loading";

export default function SpaceEditScreen() {
  // hooks
  const db = useSQLiteContext();
  const router = useRouter();
  const param = useLocalSearchParams();

  // states
  const [space, setSpace] = useState<Space | null>(null);

  useEffect(() => {
    if (!db) return;
    const spaceId = Number(param.spaceId);
    if (Number.isNaN(spaceId)) {
      Alert.alert("Fehler", "Ungültige Space ID.");
      router.back();
      return;
    }
    DatabaseService.getSpaceById(db, spaceId)
      .then(setSpace)
      .catch(() => Alert.alert("Fehler", "Space konnte nicht geladen werden."));
  }, [db, param.spaceId, router]);

  function onSave() {
    if (!db || !space) return;
    DatabaseService.updateSpace(db, space)
      .then(() => router.back())
      .catch(() =>
        Alert.alert("Fehler", "Space konnte nicht gespeichert werden."),
      );
  }

  if (!space) return <Loading />;

  return (
    <SpaceForm
      title="Space bearbeiten"
      sub="Ändere die Informationen zu diesem Space"
      space={space}
      onChange={setSpace}
      onSave={onSave}
    />
  );
}
