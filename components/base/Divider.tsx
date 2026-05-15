import { View } from "react-native";
import { Colors } from "./Colors";

export const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: Colors.border,
      marginVertical: 12,
    }}
  />
);
