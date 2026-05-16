import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({ children }: Readonly<React.PropsWithChildren<{}>>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
}
