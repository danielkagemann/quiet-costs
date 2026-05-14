import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./base/Button";
import Animated, {
  BounceInDown,
  BounceInUp,
  FadeIn,
  FadeInLeft,
} from "react-native-reanimated";

const sections = [
  "Abos & Fixkosten verwalten",
  "Kosten nach Orten organisieren",
  "Monatliche & jährliche Ausgaben vergleichen",
  "Digitale Dienste und Immobilien gemeinsam tracken",
];

interface WelcomeScreenProps {
  onFinish: () => void;
}

export const WelcomeScreen = ({ onFinish }: WelcomeScreenProps) => {
  return (
    <SafeAreaView className="flex-1 p-16">
      <Animated.View entering={BounceInUp.delay(100).duration(1000)}>
        <Text className="text-4xl font-bold">Quiet</Text>
      </Animated.View>
      <Animated.View entering={BounceInUp.delay(100).duration(1000)}>
        <Text className="text-4xl font-bold text-accent">Costs</Text>
      </Animated.View>
      <Animated.View entering={FadeIn.delay(1000)}>
        <Text className="text-secondary my-8">
          Ob Zuhause, Ferienhaus oder digitales Leben Behalte wiederkehrende
          {"\n\n"}
          Kosten pro Ort und Kategorie im Blick.
        </Text>
      </Animated.View>

      {sections.map((section, index) => (
        <Animated.View
          key={`section-${index}`}
          entering={FadeInLeft.delay(1500 + index * 100).duration(500)}
        >
          <Text className="text-secondary text-sm">{section}</Text>
          <View className="h-px w-full bg-secondary mt-4 mb-4" />
        </Animated.View>
      ))}

      <Animated.View entering={BounceInDown.delay(3000).duration(400)}>
        <Button title="Loslegen" onPress={onFinish} />
      </Animated.View>
    </SafeAreaView>
  );
};
