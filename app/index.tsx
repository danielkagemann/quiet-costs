import { WelcomeScreen } from "@/components/WelcomeScreen";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Storage } from "@/utils/storage";
import { Configuration } from "@/data/configuration";

export default function HomeScreen() {
  const [welcomeSeen, setWelcomeSeen] = useState<boolean | null>(null);

  useEffect(() => {
    Storage.get<boolean>(Configuration.storage.welcomeSeen).then((value) => {
      setWelcomeSeen(value ?? false);
    });
  }, []);

  if (welcomeSeen === null) return null;

  if (!welcomeSeen) {
    return (
      <WelcomeScreen
        onFinish={async () => {
          await Storage.set(Configuration.storage.welcomeSeen, true);
          setWelcomeSeen(true);
        }}
      />
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl">Hallo</Text>
    </View>
  );
}
