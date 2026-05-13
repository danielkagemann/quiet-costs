import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const CATEGORIES = [
  "Entertainment",
  "Productivity",
  "Health",
  "Finance",
  "Utilities",
  "Other",
];

export default function AddScreen() {
  const db = useSQLiteContext();
  const router = useRouter();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState("");

  async function handleSave() {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Enter a valid amount greater than 0.");
      return;
    }
    setError("");
    await db.runAsync(
      "INSERT INTO subscriptions (name, amount, cycle, category) VALUES (?, ?, ?, ?)",
      name.trim(),
      parsedAmount,
      cycle,
      category
    );
    router.back();
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* Name */}
        <View className="gap-1">
          <Text className="text-gray-600 text-sm font-medium">Name</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
            placeholder="e.g. Netflix"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Amount */}
        <View className="gap-1">
          <Text className="text-gray-600 text-sm font-medium">Amount ($)</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Billing cycle */}
        <View className="gap-1">
          <Text className="text-gray-600 text-sm font-medium">
            Billing Cycle
          </Text>
          <View className="flex-row gap-3">
            {(["monthly", "yearly"] as const).map((c) => (
              <Pressable
                key={c}
                onPress={() => setCycle(c)}
                className={`flex-1 rounded-xl py-3 items-center border ${
                  cycle === c
                    ? "bg-blue-700 border-blue-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`font-medium capitalize ${
                    cycle === c ? "text-white" : "text-gray-600"
                  }`}
                >
                  {c}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Category */}
        <View className="gap-1">
          <Text className="text-gray-600 text-sm font-medium">Category</Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 border ${
                  category === cat
                    ? "bg-blue-700 border-blue-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`text-sm ${
                    category === cat ? "text-white" : "text-gray-600"
                  }`}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Error */}
        {error ? (
          <Text className="text-red-500 text-sm">{error}</Text>
        ) : null}

        {/* Save button */}
        <Pressable
          onPress={handleSave}
          className="bg-blue-700 rounded-xl py-4 items-center mt-2"
        >
          <Text className="text-white font-semibold text-base">
            Save Subscription
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
