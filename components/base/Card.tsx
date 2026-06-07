import { StyleProp, View, ViewStyle } from "react-native";
import { useColors } from "./useColors";
import { Text } from "./Text";

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
  const colors = useColors();
  const bgColorMap: Record<CardProps["color"], string> = {
    primary: colors.primary + "1A",
    secondary: colors.secondary,
    empty: "transparent",
  };
  return (
    <View
      style={[
        {
          backgroundColor: bgColorMap[color],
          padding,
          borderRadius: radius,
          borderWidth: ["empty", "primary"].includes(color) ? 1 : 0,
          borderColor: color === "primary" ? colors.ternary : colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export function CardTitle({ children }: Readonly<{ children: string }>) {
  return (
    <Text size="sm" color="primary" weight="semi-bold">
      {children}
    </Text>
  );
}

/**
 * render description text
 * @param val
 * @returns
 */
export function CardDescription({ children }: Readonly<{ children: string }>) {
  return (
    <Text size="xs" color="secondary">
      {children}
    </Text>
  );
}
