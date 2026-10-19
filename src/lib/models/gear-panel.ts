import { isGearSlot, type GearSlot } from "./gear-slot";

/** All equipment slots belonging to a player. */
export interface GearPanel {
  gearSlots: GearSlot[];
}

export function isGearPanel(value: unknown): value is GearPanel {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const panel = value as Record<string, unknown>;
  return Array.isArray(panel.gearSlots) && panel.gearSlots.every(isGearSlot);
}
