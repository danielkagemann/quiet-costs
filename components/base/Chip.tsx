import { Button } from "./Button";

interface ChipProps {
  children: string;
  active?: boolean;
  onPress?: () => void;
}

export const Chip = ({ children, active = false, onPress }: ChipProps) => {
  return (
    <Button
      size="sm"
      radius="lg"
      color={active ? "primary" : "outline"}
      onPress={() => onPress?.()}
    >
      {children}
    </Button>
  );
};
