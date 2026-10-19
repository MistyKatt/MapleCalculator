import { isGearBaseInfo, type GearBaseInfo } from "./gear-base-info";

/** String gear IDs mapped to clean gear information. Missing IDs return undefined. */
export type GearLookup = Map<string, GearBaseInfo>;

export function isGearLookup(value: unknown): value is GearLookup {
  if (!(value instanceof Map)) {
    return false;
  }

  for (const [id, info] of value) {
    if (typeof id !== "string" || !isGearBaseInfo(info)) {
      return false;
    }
  }
  return true;
}
