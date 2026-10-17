import { isBaseAttribute, type BaseAttribute } from "./base-attribute";

/** Attributes that equipment can provide, including clean stats and flames. */
export interface TinyStats {
  int: BaseAttribute;
  str: BaseAttribute;
  luk: BaseAttribute;
  dex: BaseAttribute;
  att: BaseAttribute;
  /** Finite, nonnegative percentage points; no upper bound. */
  damage: number;
  bossDamage: number;
  /** Percentage points in [0, 100]. */
  ignoreEnemyDefense: number;
  /** Finite, nonnegative percentage points; no upper bound. */
  criticalDamage: number;
  criticalRate: number;
}

export function isTinyStats(value: unknown): value is TinyStats {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const stats = value as Record<string, unknown>;
  return (
    ["int", "str", "luk", "dex", "att"].every((key) => isBaseAttribute(stats[key])) &&
    ["damage", "bossDamage", "criticalDamage", "criticalRate"].every((key) => {
      const field = stats[key];
      return typeof field === "number" && Number.isFinite(field) && field >= 0;
    }) &&
    typeof stats.ignoreEnemyDefense === "number" &&
    Number.isFinite(stats.ignoreEnemyDefense) &&
    stats.ignoreEnemyDefense >= 0 &&
    stats.ignoreEnemyDefense <= 100
  );
}
