import { Pressable, View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Row } from "./base/Row";
import { Text } from "./base/Text";
import { ChevronLeft } from "lucide-react-native";
import { useColors } from "./base/useColors";
import { ReactNode } from "react";

interface TopNavigationProps {
  title: string;
  sub?: string;
  rightAction?: ReactNode;
}

export const TopNavigation = ({
  title,
  sub,
  rightAction,
}: TopNavigationProps) => {
  // hooks
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const colors = useColors();

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Row justify="between" gap={8} style={{ width: windowWidth - 32 }}>
        <Row justify="start" gap={8} style={{ flex: 1 }}>
          <Pressable
            onPress={() => router.back()}
            accessibilityLabel="Zurück"
            accessibilityRole="button"
          >
            <ChevronLeft size={24} color={colors.text} />
          </Pressable>
          <View style={{ flex: 1 }}>
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
        {!!rightAction && rightAction}
      </Row>
    </View>
  );
};
