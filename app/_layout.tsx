import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { DatabaseService } from "../services/database.service";
import { Loading } from "../components/Loading";
import { ColorsProvider, useColors } from "@/components/base/useColors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function AppContent() {
  const colors = useColors();
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ColorsProvider>
          <SQLiteProvider
            databaseName="quiet_costs.db"
            onInit={DatabaseService.initialize}
            useSuspense
          >
            <AppContent />
          </SQLiteProvider>
        </ColorsProvider>
      </GestureHandlerRootView>
    </Suspense>
  );
}
