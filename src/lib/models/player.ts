import { isGearPanel, type GearPanel } from "./gear-panel";

export interface Player {
  gearPanel: GearPanel;
}

export function isPlayer(value: unknown): value is Player {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return isGearPanel((value as Record<string, unknown>).gearPanel);
}
