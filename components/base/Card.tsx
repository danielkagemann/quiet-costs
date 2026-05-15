import { StyleProp, View, ViewStyle } from "react-native";
import { Colors } from "./Colors";

interface CardProps {
  color: "primary" | "secondary" | "empty";
  padding?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const Card = ({
  color,
  padding = 16,
  radius = 8,
  style,
  children,
}: CardProps) => {
  const bgColorMap: Record<CardProps["color"], string> = {
    primary: Colors.primary + "1A",
    secondary: Colors.secondary,
    empty: "transparent",
  };
  return (
    <View
      style={[
        {
          backgroundColor: bgColorMap[color],
          padding,
          borderRadius: radius,
          borderWidth: color === "empty" ? 1 : 0,
          borderColor: Colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
