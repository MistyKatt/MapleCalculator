import { isBaseAttribute, type BaseAttribute } from "./base-attribute";

/** General player combat attributes. All numeric fields must be finite. */
export interface PlayerStats {
  primaryAttribute: BaseAttribute;
  secondaryAttribute: BaseAttribute;
  att: BaseAttribute;
  /** Nonnegative; no upper bound. */
  damage: number;
  bossDamage: number;
  criticalRate: number;
  criticalDamage: number;
  buffDuration: number;
  ignoreElementalResistance: number;
  summonDuration: number;
  /** Integer in [0, 9999). */
  sacredForce: number;
  /** Integer in [0, 9999). */
  arcaneForce: number;
  additionalStatusDamage: number;
  /** Percentage points in [0, 100]. */
  cooldownSkip: number;
  /** Percentage points in [0, 100]. */
  cooldownReductionRate: number;
  cooldownReductionNumber: number;
  /** Percentage points in [0, 100]. */
  ignoreElementalDefense: number;
  finalDamage: number;
}

/** Checks shape and numeric constraints without coercing or clamping input. */
export function isPlayerStats(value: unknown): value is PlayerStats {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const stats = value as Record<string, unknown>;
  if (
    !isBaseAttribute(stats.primaryAttribute) ||
    !isBaseAttribute(stats.secondaryAttribute) ||
    !isBaseAttribute(stats.att)
  ) {
    return false;
  }

  const nonnegativeFields = [
    "damage", "bossDamage", "criticalRate", "criticalDamage", "buffDuration",
    "ignoreElementalResistance", "summonDuration", "additionalStatusDamage",
    "cooldownReductionNumber", "finalDamage",
  ] as const satisfies readonly (keyof PlayerStats)[];
  const percentageFields = [
    "cooldownSkip", "cooldownReductionRate", "ignoreElementalDefense",
  ] as const satisfies readonly (keyof PlayerStats)[];
  const forceFields = ["sacredForce", "arcaneForce"] as const;

  return (
    nonnegativeFields.every((key) => isNonnegativeNumber(stats[key])) &&
    percentageFields.every((key) => {
      const field = stats[key];
      return isNonnegativeNumber(field) && field <= 100;
    }) &&
    forceFields.every((key) => {
      const field = stats[key];
      return isNonnegativeNumber(field) && Number.isInteger(field) && field < 9999;
    })
  );
}

function isNonnegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}
