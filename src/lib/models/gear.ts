import { isTinyStats, type TinyStats } from "./tiny-stats";

/** Equipped item instance, referencing its clean information by gearId. */
export interface Gear {
  /** Integer identifier; no sign or range restriction is specified. */
  gearId: number;
  /** Integer in [0, 30]. */
  gearStar: number;
  gearFlame: TinyStats;
}

export function isGear(value: unknown): value is Gear {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const gear = value as Record<string, unknown>;
  return (
    typeof gear.gearId === "number" &&
    Number.isInteger(gear.gearId) &&
    typeof gear.gearStar === "number" &&
    Number.isInteger(gear.gearStar) &&
    gear.gearStar >= 0 &&
    gear.gearStar <= 30 &&
    isTinyStats(gear.gearFlame)
  );
}
