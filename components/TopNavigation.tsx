import { Pressable, View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Row } from "./base/Row";
import { Text } from "./base/Text";
import { ChevronLeft } from "lucide-react-native";
import { Colors } from "./base/Colors";

interface TopNavigationProps {
  title: string;
  sub?: string;
}

export const TopNavigation = ({ title, sub }: TopNavigationProps) => {
  // hooks
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Row justify="start" gap={8} style={{ width: windowWidth - 48 }}>
        <Pressable onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.text} />
        </Pressable>
        <View>
          <Text size="lg" weight="bold">
            {title}
          </Text>
          {!!sub && (
            <Text size="sm" color="secondary">
              {sub}
            </Text>
          )}
        </View>
      </Row>
    </View>
  );
};
