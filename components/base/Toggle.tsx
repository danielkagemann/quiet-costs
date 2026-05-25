import { Pressable, View } from "react-native";
import { Colors } from "./Colors";

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Toggle = ({ value, onChange }: ToggleProps) => {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      role="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel="Wert wechseln"
    >
      <View
        style={{
          width: 32,
          height: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.secondary,
          backgroundColor: Colors.border,
          padding: 2,
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 8,
            backgroundColor: value ? Colors.primary : Colors.secondary,
            transform: [{ translateX: value ? 12 : 0 }],
          }}
        />
      </View>
    </Pressable>
  );
};
