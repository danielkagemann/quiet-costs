import { SpaceService } from "../space.service";
import { Space } from "@/types/spaces";

function makeSpace(overrides: Partial<Space> = {}): Space {
  return {
    id: 1,
    name: "Zuhause",
    description: "",
    ...overrides,
  };
}

describe("SpaceService.isValid", () => {
  it("returns true for a space with a non-empty name", () => {
    expect(SpaceService.isValid(makeSpace())).toBe(true);
  });

  it("returns false when name is empty", () => {
    expect(SpaceService.isValid(makeSpace({ name: "" }))).toBe(false);
  });

  it("returns false when name is only whitespace", () => {
    expect(SpaceService.isValid(makeSpace({ name: "   " }))).toBe(false);
  });

  it("returns true when description is missing (optional field)", () => {
    expect(SpaceService.isValid(makeSpace({ description: undefined }))).toBe(
      true,
    );
  });

  it("returns true when name contains leading/trailing spaces around real content", () => {
    // name.trim() !== "" — a name like " Arbeit " is valid
    expect(SpaceService.isValid(makeSpace({ name: " Arbeit " }))).toBe(true);
  });
});
