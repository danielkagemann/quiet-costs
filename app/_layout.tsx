import "../global.css";

import { Stack } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { ActivityIndicator, View } from "react-native";

async function migrateDb(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS space (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT    NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cost (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      name           TEXT    NOT NULL,
      amount         REAL    NOT NULL,
      start_date     TEXT    NOT NULL,
      payment_method TEXT    NOT NULL DEFAULT '',
      billingCycle   TEXT    NOT NULL DEFAULT 'monthly',
      categoryId     TEXT    NOT NULL DEFAULT 'Other',
      spaceId        TEXT    NOT NULL DEFAULT '1'
    );
  `);

  // Seed a default space when the table is empty
  const spaceCount = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM space"
  );
  if (spaceCount?.count === 0) {
    await db.runAsync("INSERT INTO space (name) VALUES (?)", "Default");
  }
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
      <SQLiteProvider databaseName="quiet_costs.db" onInit={migrateDb} useSuspense>
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
