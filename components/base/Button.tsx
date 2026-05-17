import { Pressable, Text } from "react-native";
import { Colors } from "./Colors";

interface ButtonProps {
  children: string;
  onPress: () => void;
  color?: "primary" | "secondary" | "light" | "outline" | "empty" | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  onPress,
  color = "primary",
  size = "md",
  radius = "md",
}: ButtonProps) => {
  const colorMap: Record<string, string> = {
    primary: Colors.primary,
    secondary: Colors.secondary,
    outline: "transparent",
    empty: "transparent",
    light: Colors.ternary,
    danger: Colors.danger,
  };

  const sizeMap: Record<string, number> = {
    sm: 4,
    md: 8,
    lg: 12,
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        { backgroundColor: colorMap[color] },
        color === "outline" && { borderWidth: 1, borderColor: Colors.text },
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
          color === "primary" && { color: Colors.background },
          color === "secondary" && { color: Colors.background },
          color === "outline" && { color: Colors.text },
          color === "empty" && { color: Colors.text },
          color === "danger" && { color: Colors.white },
          size === "sm" && { fontSize: 11 },
          size === "md" && { fontSize: 13 },
          size === "lg" && { fontSize: 15 },
          { fontWeight: "400" },
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};
