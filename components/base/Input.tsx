import { TextInput } from "react-native";
import { useColors } from "./useColors";

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
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
  onBlur,
  inputMode = "text",
}: InputProps) => {
  const colors = useColors();
  return (
    <TextInput
      accessibilityLabel={placeholder}
      placeholder={placeholder}
      placeholderTextColor={colors.secondary}
      value={value}
      inputMode={inputMode}
      onChangeText={onChange}
      onBlur={onBlur}
      style={{
        fontSize: 17,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 8,
      }}
    />
  );
};
