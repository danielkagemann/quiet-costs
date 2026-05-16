import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./base/Button";
import { Text } from "./base/Text";
import Animated, {
  BounceInDown,
  BounceInUp,
  FadeIn,
  FadeInLeft,
} from "react-native-reanimated";
import { Divider } from "./base/Divider";
import { VSpace } from "./base/VSpace";

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
    <SafeAreaView style={{ padding: 48 }}>
      <Animated.View entering={BounceInUp.delay(100).duration(1000)}>
        <Text size="3xl" weight="bold">
          Quiet
        </Text>
      </Animated.View>
      <Animated.View entering={BounceInUp.delay(100).duration(1000)}>
        <Text size="3xl" color="primary" weight="bold">
          Costs
        </Text>
      </Animated.View>
      <VSpace size={16} />
      <Animated.View entering={FadeIn.delay(1000)}>
        <Text size="md" color="secondary">
          Ob Zuhause, Ferienhaus oder digitales Leben Behalte wiederkehrende
          {"\n\n"}
          Kosten pro Ort und Kategorie im Blick.
        </Text>
      </Animated.View>
      <VSpace size={16} />
      {sections.map((section, index) => (
        <Animated.View
          key={`section-${index}`}
          entering={FadeInLeft.delay(1500 + index * 100).duration(500)}
        >
          <Text size="sm" color="secondary">
            {section}
          </Text>
          <VSpace size={4} />
          <Divider />
        </Animated.View>
      ))}

      <VSpace size={16} />
      <Animated.View entering={BounceInDown.delay(3000).duration(400)}>
        <Button onPress={onFinish} size="lg" color="primary">
          Loslegen
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
};
