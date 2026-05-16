import { Space } from "@/types/spaces";

export const SpaceService = {
  isValid: (space: Space) => {
    return space.name.trim() !== "";
  },
};
