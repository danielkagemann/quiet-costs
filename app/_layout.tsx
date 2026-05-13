import "../global.css";

import { Stack } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { ActivityIndicator, View } from "react-native";

async function migrateDb(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS subscriptions (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      name      TEXT    NOT NULL,
      amount    REAL    NOT NULL,
      cycle     TEXT    NOT NULL DEFAULT 'monthly',
      category  TEXT    NOT NULL DEFAULT 'Other'
    );
  `);
}

export default function RootLayout() {
  return (
    <Suspense
      fallback={
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#1d4ed8" />
        </View>
      }
    >
      <SQLiteProvider databaseName="quiet-costs.db" onInit={migrateDb} useSuspense>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#1e40af" },
            headerTintColor: "#ffffff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Quiet Costs" }} />
          <Stack.Screen name="add" options={{ title: "Add Subscription" }} />
        </Stack>
        <StatusBar style="light" />
      </SQLiteProvider>
    </Suspense>
  );
}
