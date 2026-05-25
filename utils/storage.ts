import AsyncStorage from "@react-native-async-storage/async-storage";

export const Storage = {
  set: async <T>(key: string, value: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in storage`, error);
    }
  },
  get: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (!value) return null;

      return JSON.parse(value);
    } catch (error) {
      console.error(`Error getting item ${key} from storage`, error);
      return null;
    }
  },
};
