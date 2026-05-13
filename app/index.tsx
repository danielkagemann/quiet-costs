import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Subscription = {
  id: number;
  name: string;
  amount: number;
  cycle: "monthly" | "yearly";
  category: string;
};

export default function HomeScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const loadSubscriptions = useCallback(async () => {
    const result = await db.getAllAsync<Subscription>(
      "SELECT * FROM subscriptions ORDER BY name ASC"
    );
    setSubscriptions(result);
  }, [db]);

  useEffect(() => {
    loadSubscriptions();
  }, [loadSubscriptions]);

  async function deleteSubscription(id: number) {
    await db.runAsync("DELETE FROM subscriptions WHERE id = ?", id);
    loadSubscriptions();
  }

  const monthlyTotal = subscriptions.reduce((sum, s) => {
    const monthly = s.cycle === "yearly" ? s.amount / 12 : s.amount;
    return sum + monthly;
  }, 0);

  const yearlyTotal = monthlyTotal * 12;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Summary header */}
      <View className="bg-blue-800 px-4 pb-6 pt-4">
        <View className="flex-row justify-between">
          <View className="items-center flex-1">
            <Text className="text-blue-200 text-xs uppercase tracking-wide">
              Monthly
            </Text>
            <Text className="text-white text-2xl font-bold mt-1">
              ${monthlyTotal.toFixed(2)}
            </Text>
          </View>
          <View className="w-px bg-blue-600" />
          <View className="items-center flex-1">
            <Text className="text-blue-200 text-xs uppercase tracking-wide">
              Yearly
            </Text>
            <Text className="text-white text-2xl font-bold mt-1">
              ${yearlyTotal.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Subscription list */}
      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">No subscriptions yet</Text>
            <Text className="text-gray-400 text-sm mt-1">
              Tap + to add your first one
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 shadow-sm flex-row items-center">
            <View className="flex-1">
              <Text className="text-gray-800 font-semibold text-base">
                {item.name}
              </Text>
              <Text className="text-gray-500 text-xs mt-0.5 capitalize">
                {item.category}
              </Text>
            </View>
            <View className="items-end mr-3">
              <Text className="text-blue-700 font-bold text-base">
                ${item.amount.toFixed(2)}
              </Text>
              <Text className="text-gray-400 text-xs capitalize">
                {item.cycle}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteSubscription(item.id)}
              className="bg-red-100 rounded-lg p-2"
            >
              <Text className="text-red-600 text-xs font-medium">Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* FAB */}
      <Pressable
        onPress={() => router.push("/add")}
        className="absolute bottom-8 right-6 bg-blue-700 w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <Text className="text-white text-3xl leading-none">+</Text>
      </Pressable>
    </View>
  );
}
