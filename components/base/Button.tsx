import { Pressable, Text } from "react-native";
import { useColors } from "./useColors";

interface ButtonProps {
  children: React.ReactNode | string;
  onPress: () => void;
  color?: "primary" | "secondary" | "light" | "outline" | "empty" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  radius?: "sm" | "md" | "lg" | "xl";
}

export const Button = ({
  children,
  onPress,
  color = "primary",
  size = "md",
  radius = "md",
}: ButtonProps) => {
  const colors = useColors();
  const colorMap: Record<string, string> = {
    primary: colors.primary,
    secondary: colors.secondary,
    outline: "transparent",
    empty: "transparent",
    light: colors.ternary,
    danger: colors.danger,
  };

  const sizeMap: Record<string, number> = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 32,
  };

  return (
    <Pressable
      role="button"
      accessibilityLabel={typeof children === "string" ? children : undefined}
      onPress={onPress}
      style={[
        { backgroundColor: colorMap[color] },
        color === "outline" && {
          borderWidth: 1,
          borderColor: colors.secondary,
        },
        {
          paddingVertical: sizeMap[size],
          paddingHorizontal: sizeMap[size] + 2,
          borderRadius: sizeMap[radius],
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Text
        style={[
          color === "primary" && { color: colors.white },
          color === "secondary" && { color: colors.white },
          color === "outline" && { color: colors.secondary },
          color === "empty" && { color: colors.text },
          color === "danger" && { color: colors.white },
          size === "sm" && { fontSize: 13 },
          size === "md" && { fontSize: 17 },
          size === "lg" && { fontSize: 20 },
          size === "xl" && { fontSize: 24 },
          { fontWeight: "400" },
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};
