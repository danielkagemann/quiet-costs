import AsyncStorage from "@react-native-async-storage/async-storage";

export const Storage = {
  set: async <T>(key: string, value: T) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  get: async <T>(key: string): Promise<T | null> => {
    const value = await AsyncStorage.getItem(key);

    if (!value) return null;

    return JSON.parse(value);
  },
};
