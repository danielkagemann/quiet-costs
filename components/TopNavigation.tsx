import { View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Row } from "./base/Row";
import { Button } from "./base/Button";
import { Text } from "./base/Text";

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
        <Button color="empty" onPress={() => router.back()}>
          &larr;
        </Button>
        <View>
          <Text size="md" weight="bold">
            {title}
          </Text>
          {!!sub && (
            <Text size="xs" color="secondary">
              {sub}
            </Text>
          )}
        </View>
      </Row>
    </View>
  );
};
