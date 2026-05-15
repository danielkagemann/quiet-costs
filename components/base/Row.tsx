import { View } from "react-native";

interface RowProps {
  gap?: number;
  justify?: "start" | "center" | "end" | "between";
  children: React.ReactNode;
}

export const Row = ({ gap = 0, justify = "start", children }: RowProps) => {
  const justifyContentMap: Record<
    string,
    "flex-start" | "center" | "flex-end" | "space-between"
  > = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap,
        justifyContent: justifyContentMap[justify] ?? "flex-start",
      }}
    >
      {children}
    </View>
  );
};
