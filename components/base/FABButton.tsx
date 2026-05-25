import { Pressable, View } from "react-native";
import { Colors } from "./Colors";
import { Text } from "./Text";

interface FABButtonProps {
  onPress: () => void;
}

export const FABButton = ({ onPress }: FABButtonProps) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 32,
        right: 16,
        left: 16,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
      }}
    >
      <Pressable
        accessibilityLabel="Kosten hinzufügen"
        onPress={onPress}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text color="white">Kosten hinzufügen</Text>
      </Pressable>
    </View>
  );
};
