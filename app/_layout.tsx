import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { DatabaseService } from "../services/database.service";
import { Loading } from "../components/Loading";
import { Colors } from "@/components/base/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SQLiteProvider
          databaseName="quiet_costs.db"
          onInit={DatabaseService.initialize}
          useSuspense
        >
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: Colors.background },
            }}
          />
          <StatusBar style="light" />
        </SQLiteProvider>
      </GestureHandlerRootView>
    </Suspense>
  );
}
