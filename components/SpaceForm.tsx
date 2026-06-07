import { Input } from "@/components/base/Input";
import { TopNavigation } from "@/components/TopNavigation";
import { Space } from "@/types/spaces";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/base/Button";
import { SpaceService } from "@/services/space.service";
import { Headline, Label } from "@/components/base/Text";
import { InfoBox } from "@/components/InfoBox";
import { VSpace } from "@/components/base/VSpace";

interface SpaceFormProps {
  title: string;
  sub: string;
  space: Space;
  onChange: (space: Space) => void;
  onSave: () => void;
}

export function SpaceForm({
  title,
  sub,
  space,
  onChange,
  onSave,
}: Readonly<SpaceFormProps>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TopNavigation title={title} sub={sub} />

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
            onChange={(text) => onChange({ ...space, name: text })}
          />
          <Label>Beschreibung über den Space (optional)</Label>
          <Input
            placeholder="Beschreibung"
            value={space.description ?? ""}
            onChange={(text) => onChange({ ...space, description: text })}
          />

          <VSpace size={16} />

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
