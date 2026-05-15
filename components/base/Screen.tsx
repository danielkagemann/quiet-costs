import { View } from "react-native";
import { Colors } from "./Colors";

export function Screen({ children }: Readonly<React.PropsWithChildren<{}>>) {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {children}
    </View>
  );
}
