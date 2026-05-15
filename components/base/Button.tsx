import { Pressable, Text } from "react-native";
import { Colors } from "./Colors";

interface ButtonProps {
  children: string;
  onPress: () => void;
  color?: "primary" | "secondary" | "outline";
}

export const Button = ({
  children,
  onPress,
  color = "primary",
}: ButtonProps) => {
  const colorMap: Record<string, string> = {
    primary: Colors.primary,
    secondary: Colors.secondary,
    outline: "transparent",
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        { backgroundColor: colorMap[color] },
        color === "outline" && { borderWidth: 1, borderColor: Colors.text },
        {
          padding: 8,
          borderRadius: 12,
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
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};
