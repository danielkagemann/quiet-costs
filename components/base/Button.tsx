import { Pressable, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
}: ButtonProps) => {
  const bg = {
    primary: "bg-accent",
    secondary: "bg-secondary",
    outline: "bg-transparent border border-primary",
  };
  const fg = {
    primary: "text-white",
    secondary: "text-black",
    outline: "text-primary",
  };
  return (
    <Pressable
      onPress={onPress}
      className={`${bg[variant]} flex flex-row justify-center items-center py-2 px-4 rounded-xl`}
    >
      <Text className={fg[variant]}>{title}</Text>
    </Pressable>
  );
};
