import { Pressable, View } from "react-native";
import { useColors } from "./useColors";

interface ToggleProps {
  value: boolean;
  ariaLabel?: string;
  onChange: (value: boolean) => void;
}

export const Toggle = ({ value, ariaLabel, onChange }: ToggleProps) => {
  const colors = useColors();
  return (
    <Pressable
      onPress={() => onChange(!value)}
      role="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={ariaLabel}
    >
      <View
        style={{
          width: 32,
          height: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.secondary,
          backgroundColor: colors.border,
          padding: 2,
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 8,
            backgroundColor: value ? colors.primary : colors.secondary,
            transform: [{ translateX: value ? 12 : 0 }],
          }}
        />
      </View>
    </Pressable>
  );
};
