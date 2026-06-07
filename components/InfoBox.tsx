import { Info } from "lucide-react-native";
import { Card } from "./base/Card";
import { Text } from "./base/Text";
import { VSpace } from "./base/VSpace";
import { Row } from "./base/Row";
import { useColors } from "./base/useColors";
import { View } from "react-native";

interface InfoBoxProps {
  title: string;
  description: string;
}

export const InfoBox = ({ title, description }: InfoBoxProps) => {
  const colors = useColors();
  return (
    <Card color="primary" padding={12} radius={6}>
      <Row justify="start" gap={8}>
        <Info color={colors.primary} size={18} />
        <View>
          <Text size="sm" color="primary" weight="bold">
            {title}
          </Text>
          <VSpace size={4} />
          <Text size="sm" color="secondary">
            {description}
          </Text>
        </View>
      </Row>
    </Card>
  );
};
