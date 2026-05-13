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

type Cost = {
  id: number;
  name: string;
  amount: number;
  start_date: string;
  payment_method: string;
  billingCycle: "monthly" | "yearly";
  categoryId: string;
  spaceId: string;
};

export default function HomeScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [costs, setCosts] = useState<Cost[]>([]);

  const loadCosts = useCallback(async () => {
    const result = await db.getAllAsync<Cost>(
      "SELECT * FROM cost ORDER BY name ASC"
    );
    setCosts(result);
  }, [db]);

  useEffect(() => {
    loadCosts();
  }, [loadCosts]);

  async function deleteCost(id: number) {
    await db.runAsync("DELETE FROM cost WHERE id = ?", id);
    loadCosts();
  }

  const monthlyTotal = costs.reduce((sum, c) => {
    const monthly = c.billingCycle === "yearly" ? c.amount / 12 : c.amount;
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

      {/* Cost list */}
      <FlatList
        data={costs}
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
              <Text className="text-gray-500 text-xs mt-0.5">
                {item.categoryId}
              </Text>
              {item.payment_method ? (
                <Text className="text-gray-400 text-xs">
                  {item.payment_method}
                </Text>
              ) : null}
            </View>
            <View className="items-end mr-3">
              <Text className="text-blue-700 font-bold text-base">
                ${item.amount.toFixed(2)}
              </Text>
              <Text className="text-gray-400 text-xs capitalize">
                {item.billingCycle}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteCost(item.id)}
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
