import { View, Text } from "react-native";

export const SmallHeader = () => (
  <View className="flex flex-row items-center text-xs justify-start gap-1">
    <Text>QUIET</Text>
    <Text className="text-accent">COSTS</Text>
  </View>
);
