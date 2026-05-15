import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { DatabaseService } from "../services/database.service";
import { Loading } from "../components/Loading";
import { Screen } from "@/components/base/Screen";

export default function RootLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider
        databaseName="quiet_costs.db"
        onInit={DatabaseService.initialize}
        useSuspense
      >
        <Screen>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="light" />
        </Screen>
      </SQLiteProvider>
    </Suspense>
  );
}
