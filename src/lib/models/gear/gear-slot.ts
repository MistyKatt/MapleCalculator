import { isGear, type Gear } from "./gear";

/** One equipment slot, optionally holding a gear instance. */
export interface GearSlot {
  equippedGear: Gear | null;
  /** Allowed gear names, reserved for future equipment restrictions. */
  allowedGearList: string[];
}

export function isGearSlot(value: unknown): value is GearSlot {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const slot = value as Record<string, unknown>;
  return (
    (slot.equippedGear === null || isGear(slot.equippedGear)) &&
    Array.isArray(slot.allowedGearList) &&
    slot.allowedGearList.every((name: unknown) => typeof name === "string")
  );
}
