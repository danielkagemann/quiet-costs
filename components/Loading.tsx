import { ActivityIndicator, View } from "react-native";

export const Loading = () => (
  <View className="flex-1 items-center justify-center bg-white">
    <ActivityIndicator size="large" />
  </View>
);
