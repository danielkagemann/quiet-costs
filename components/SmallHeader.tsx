import Animated, { FadeInRight, FadeInUp } from "react-native-reanimated";
import { Row } from "./base/Row";
import { Text } from "./base/Text";
import { VSpace } from "./base/VSpace";
import { useSQLiteContext } from "expo-sqlite";
import { DatabaseService } from "@/services/database.service";
import { useState } from "react";
import { Share, Alert, Pressable } from "react-native";
import { ShareIcon } from "lucide-react-native";

const DEBUGCOUNT = 3;

export const SmallHeader = () => {
  // hooks
  const db = useSQLiteContext();

  // states
  const [debugCount, setDebugCount] = useState<number>(0);

  function onShare() {
    if (!db) return;
    DatabaseService.dumpAsJson(db).then((json) => {
      try {
        Share.share({
          title: "Quiet Costs - Datenexport",
          message: json,
        });
      } catch (error: any) {
        Alert.alert(error.message);
      }
    });
  }

  return (
    <>
      <Row justify="between">
        <Animated.View entering={FadeInUp.delay(200).duration(300)}>
          <Pressable
            onPress={() => setDebugCount((d) => (d < DEBUGCOUNT ? d + 1 : d))}
          >
            <Row justify="start" gap={2}>
              <Text size="sm" weight="semi-bold">
                QUIET
              </Text>
              <Text size="sm" weight="semi-bold" color="primary">
                COSTS
              </Text>
            </Row>
          </Pressable>
        </Animated.View>
        {debugCount >= DEBUGCOUNT && (
          <Animated.View entering={FadeInRight.delay(400).duration(300)}>
            <Pressable onPress={onShare}>
              <ShareIcon size={18} color={"black"} />
            </Pressable>
          </Animated.View>
        )}
      </Row>
      <VSpace size={16} />
    </>
  );
};
