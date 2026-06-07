export type ColorPalette = {
  text: string;
  secondary: string;
  ternary: string;
  primary: string;
  border: string;
  background: string;
  white: string;
  danger: string;
};

const lightColors: ColorPalette = {
  text: "#0F172A",
  secondary: "#64748B",
  ternary: "#DADFE6",
  primary: "#6366F1",
  border: "#E2E8F0",
  background: "#FFFFFF",
  white: "#FFFFFF",
  danger: "#8d0909",
};

const darkColors: ColorPalette = {
  text: "#F1F5F9",
  secondary: "#94A3B8",
  ternary: "#334155",
  primary: "#818CF8",
  border: "#334155",
  background: "#0F172A",
  white: "#FFFFFF",
  danger: "#F87171",
};

// Kept for static/non-hook usage (e.g. keyof Colors type reference)
export const Colors = lightColors;
export { lightColors, darkColors };
