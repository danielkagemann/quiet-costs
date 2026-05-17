import { TextInput } from "react-native";
import { Colors } from "./Colors";

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  inputMode?:
    | "text"
    | "numeric"
    | "email"
    | "tel"
    | "url"
    | "search"
    | "none"
    | "decimal";
}

export const Input = ({
  placeholder,
  value,
  onChange,
  inputMode = "text",
}: InputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      inputMode={inputMode}
      onChangeText={onChange}
      style={{
        fontSize: 17,
        color: Colors.text,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 8,
      }}
    />
  );
};
