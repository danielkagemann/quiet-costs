import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors, ColorPalette } from "./Colors";

const ColorsContext = createContext<ColorPalette>(lightColors);

export function ColorsProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? darkColors : lightColors;
  return React.createElement(
    ColorsContext.Provider,
    { value: colors },
    children,
  );
}

export function useColors(): ColorPalette {
  return useContext(ColorsContext);
}
