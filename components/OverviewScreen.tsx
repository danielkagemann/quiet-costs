import { SafeAreaView } from "react-native-safe-area-context";
import { SmallHeader } from "./SmallHeader";
import { View, Text } from "react-native";

export const OverviewScreen = () => {
  return (
    <SafeAreaView className="flex-1 p-8">
      <SmallHeader />

      {/*headliner */}
      <Text className="text-2xl font-bold mt-4 text-primary">
        Verstehe,{"\n"}was dein Alltag kostet.
      </Text>
      <Text className="text-base text-secondary mt-2">
        Verwalte laufende Kosten für Zuhause, digitale Dienste und mehr.
      </Text>

      {/* empty overview card */}
      <View className="bg-accent/10 rounded-lg p-8 mt-6 flex-flex-col gap-2 border border-border">
        <Text className="font-semibold text-accent">DEIN ÜBERBLICK</Text>
        <Text className="text-3xl font-bold">0,00 EUR</Text>
        <Text className="text-sm text-secondary">monatliche Kosten</Text>
      </View>
    </SafeAreaView>
  );
};
