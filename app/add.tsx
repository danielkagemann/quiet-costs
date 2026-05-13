import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
  "Utilities",
  "Insurance",
  "Taxes & Fees",
  "Digital Services",
  "Streaming & Media",
  "Home & Maintenance",
  "Mobility",
  "Health & Fitness",
  "Memberships",
  "Other",
];

type Space = { id: number; name: string };

export default function AddScreen() {
  const db = useSQLiteContext();
  const router = useRouter();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [spaceId, setSpaceId] = useState<string>("1");
  const [error, setError] = useState("");

  useEffect(() => {
    db.getAllAsync<Space>("SELECT * FROM space ORDER BY name ASC").then(
      (rows) => {
        setSpaces(rows);
        if (rows.length > 0) setSpaceId(rows[0].id.toString());
      }
    );
  }, [db]);

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
    if (!startDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      setError("Enter a date in YYYY-MM-DD format.");
      return;
    }
    setError("");
    await db.runAsync(
      `INSERT INTO cost (name, amount, start_date, payment_method, billingCycle, categoryId, spaceId)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      name.trim(),
      parsedAmount,
      startDate,
      paymentMethod.trim(),
      cycle,
      category,
      spaceId
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

        {/* Start Date */}
        <View className="gap-1">
          <Text className="text-gray-600 text-sm font-medium">
            Start Date
          </Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
            placeholder="YYYY-MM-DD"
            value={startDate}
            onChangeText={setStartDate}
          />
        </View>

        {/* Payment Method */}
        <View className="gap-1">
          <Text className="text-gray-600 text-sm font-medium">
            Payment Method
          </Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
            placeholder="e.g. Credit Card"
            value={paymentMethod}
            onChangeText={setPaymentMethod}
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

        {/* Space */}
        {spaces.length > 0 && (
          <View className="gap-1">
            <Text className="text-gray-600 text-sm font-medium">Space</Text>
            <View className="flex-row flex-wrap gap-2">
              {spaces.map((s) => (
                <Pressable
                  key={s.id}
                  onPress={() => setSpaceId(s.id.toString())}
                  className={`rounded-full px-4 py-2 border ${
                    spaceId === s.id.toString()
                      ? "bg-blue-700 border-blue-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      spaceId === s.id.toString()
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {s.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

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
