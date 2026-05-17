import { Text as RNText, TextStyle, StyleProp } from "react-native";
import { Colors } from "./Colors";

type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface TextProps {
  children: React.ReactNode;
  size?: TextSize;
  color?: keyof typeof Colors;
  weight?: "normal" | "bold" | "semi-bold";
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const sizeMap: Record<TextSize, number> = {
  xs: 11,
  sm: 13,
  md: 17,
  lg: 20,
  xl: 22,
  "2xl": 28,
  "3xl": 34,
};

const weightMap: Record<
  NonNullable<TextProps["weight"]>,
  "400" | "600" | "700"
> = {
  normal: "400",
  "semi-bold": "600",
  bold: "700",
};

export const Text = ({
  children,
  size = "md",
  color = "text",
  weight = "normal",
  style,
  numberOfLines,
}: TextProps) => {
  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize: sizeMap[size],
          color: Colors[color],
          fontWeight: weightMap[weight],
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

export function Headline({ children }: Readonly<{ children: string }>) {
  return (
    <Text size="md" weight="bold">
      {children}
    </Text>
  );
}

export function Label({ children }: Readonly<{ children: string }>) {
  return (
    <Text size="sm" color="secondary" weight="semi-bold">
      {children}
    </Text>
  );
}
