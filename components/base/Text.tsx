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
  xs: 10,
  sm: 12,
  md: 15,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 36,
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
