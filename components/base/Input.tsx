import { TextInput } from "react-native";
import { Colors } from "./Colors";

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: "default" | "numeric" | "decimal-pad";
}

export const Input = ({
  placeholder,
  value,
  onChange,
  keyboardType = "default",
}: InputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType}
      onChangeText={onChange}
      style={{
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 8,
      }}
    />
  );
};
