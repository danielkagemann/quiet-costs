import Animated, { FadeInLeft } from "react-native-reanimated";
import { Row } from "./base/Row";
import { Text } from "./base/Text";
import { VSpace } from "./base/VSpace";

export const SmallHeader = () => (
  <>
    <Animated.View entering={FadeInLeft}>
      <Row justify="start" gap={2}>
        <Text size="sm" weight="semi-bold">
          QUIET
        </Text>
        <Text size="sm" weight="semi-bold" color="primary">
          COSTS
        </Text>
      </Row>
    </Animated.View>
    <VSpace size={16} />
  </>
);
