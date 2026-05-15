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
        bottom: 16,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={onPress}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text size="2xl" weight="bold" color="white">
          +
        </Text>
      </Pressable>
    </View>
  );
};
