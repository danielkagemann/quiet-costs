import {
  ReceiptText,
  Shield,
  Landmark,
  Cloud,
  MonitorPlay,
  House,
  CarFront,
  Dumbbell,
  BadgeCheck,
  CircleEllipsis,
} from "lucide-react-native";

export const Configuration = {
  storage: {
    welcomeSeen: "welcome:seen",
  },
  categories: [
    "Nebenkosten",
    "Versicherung",
    "Steuern & Gebühren",
    "Digitale Dienste",
    "Streaming & Medien",
    "Haus & Instandhaltung",
    "Mobilität",
    "Gesundheit & Fitness",
    "Mitgliedschaften",
    "Sonstiges",
  ],
  categoryIcons: [
    ReceiptText,
    Shield,
    Landmark,
    Cloud,
    MonitorPlay,
    House,
    CarFront,
    Dumbbell,
    BadgeCheck,
    CircleEllipsis,
  ],
  categoryColors: [
    "#6366F1", // Nebenkosten — indigo
    "#10B981", // Versicherung — emerald
    "#F59E0B", // Steuern — amber
    "#3B82F6", // Digitale Dienste — blue
    "#EC4899", // Streaming — pink
    "#8B5CF6", // Haus — violet
    "#EF4444", // Mobilität — red
    "#14B8A6", // Gesundheit — teal
    "#F97316", // Mitgliedschaften — orange
    "#6B7280", // Sonstiges — gray
  ],
  spaceEmojis: [
    // Home & living
    "🏠", "🏡", "🏘️", "🏚️", "🏗️",
    // Vacation & travel
    "🏖️", "🏝️", "🏔️", "⛺", "✈️", "🚢", "🛖",
    // Work & digital
    "🏢", "🏬", "💻", "📱", "🖥️",
    // Transport
    "🚗", "🚲", "🛵", "🚌",
    // Shopping & daily life
    "🛒", "☕", "🍽️", "📚",
    // Sports & wellness
    "🏋️", "🧘", "🏊", "⚽", "🎾",
    // Hobbies
    "🎮", "🎵", "🎨", "📷",
    // Nature
    "🌿", "🌻", "🐾",
    // Feelings
    "😊", "😔", "❤️", "⭐",
    // Rental & property
    "🔑", "🏦", "📋",
  ],
};
