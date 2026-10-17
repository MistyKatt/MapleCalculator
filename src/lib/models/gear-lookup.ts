import { isGearBaseInfo, type GearBaseInfo } from "./gear-base-info";

/** Integer gear IDs mapped to clean gear information. Missing IDs return undefined. */
export type GearLookup = Map<number, GearBaseInfo>;

export function isGearLookup(value: unknown): value is GearLookup {
  if (!(value instanceof Map)) {
    return false;
  }

  for (const [id, info] of value) {
    if (typeof id !== "number" || !Number.isInteger(id) || !isGearBaseInfo(info)) {
      return false;
    }
  }
  return true;
}
