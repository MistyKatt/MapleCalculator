import { isTinyStats, type TinyStats } from "./tiny-stats";

/** Clean equipment information shared by instances with the same gear ID. */
export interface GearBaseInfo {
  gearName: string;
  /** Integer in [0, 300]. */
  gearLevel: number;
  /** Integer in [5, 30]. */
  gearStarCap: number;
  gearBaseStats: TinyStats;
}

export function isGearBaseInfo(value: unknown): value is GearBaseInfo {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const info = value as Record<string, unknown>;
  return (
    typeof info.gearName === "string" &&
    typeof info.gearLevel === "number" &&
    Number.isInteger(info.gearLevel) &&
    info.gearLevel >= 0 &&
    info.gearLevel <= 300 &&
    typeof info.gearStarCap === "number" &&
    Number.isInteger(info.gearStarCap) &&
    info.gearStarCap >= 5 &&
    info.gearStarCap <= 30 &&
    isTinyStats(info.gearBaseStats)
  );
}
