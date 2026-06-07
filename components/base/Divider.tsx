import { View } from "react-native";
import { useColors } from "./useColors";

export const Divider = () => {
  const colors = useColors();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 12,
      }}
    />
  );
};
