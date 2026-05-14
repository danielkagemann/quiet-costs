import "../global.css";

import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { View } from "react-native";
import { DatabaseService } from "../services/database.service";
import { Loading } from "../components/Loading";

export default function RootLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider
        databaseName="quiet_costs.db"
        onInit={DatabaseService.initialize}
        useSuspense
      >
        <View className="flex-1 bg-background">
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="light" />
        </View>
      </SQLiteProvider>
    </Suspense>
  );
}
