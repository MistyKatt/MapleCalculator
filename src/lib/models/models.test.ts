// @vitest-environment node
import { describe, expect, it } from "vitest";
import { isBaseAttribute, type BaseAttribute } from "./base-attribute";
import { isStats, type Stats } from "./stats";

const attribute: BaseAttribute = {
  name: "STR", percentage: 0, value: 0, valueFinal: 0,
};
const stats: Stats = {
  primaryAttribute: attribute, secondaryAttribute: attribute, att: attribute,
  damage: 0, bossDamage: 0, criticalRate: 0, criticalDamage: 0, buffDuration: 0,
  ignoreElementalResistance: 0, summonDuration: 0, sacredForce: 0, arcaneForce: 0,
  additionalStatusDamage: 0, cooldownSkip: 0, cooldownReductionRate: 0,
  cooldownReductionNumber: 0, ignoreElementalDefense: 0, finalDamage: 0,
};
const invalidNumbers = [-1, NaN, Infinity, -Infinity, "1", null, undefined];

describe("BaseAttribute", () => {
  it("accepts boundaries, fractional values and independently stored final values", () => {
    expect(isBaseAttribute(attribute)).toBe(true);
    expect(isBaseAttribute({ name: "", percentage: 100, value: 1.5, valueFinal: 0 })).toBe(true);
    expect(isBaseAttribute({ ...attribute, percentage: 0.25 })).toBe(true);
  });

  it.each([null, undefined, [], 0, "STR", {}])("rejects invalid shapes: %j", (value) => {
    expect(isBaseAttribute(value)).toBe(false);
  });

  it.each(["percentage", "value", "valueFinal"] as const)("validates %s", (key) => {
    for (const value of invalidNumbers) {
      expect(isBaseAttribute({ ...attribute, [key]: value })).toBe(false);
    }
    const incomplete: Record<string, unknown> = { ...attribute };
    delete incomplete[key];
    expect(isBaseAttribute(incomplete)).toBe(false);
  });

  it("requires a string name and bounds percentage", () => {
    expect(isBaseAttribute({ ...attribute, name: 1 })).toBe(false);
    expect(isBaseAttribute({ percentage: 0, value: 0, valueFinal: 0 })).toBe(false);
    expect(isBaseAttribute({ ...attribute, percentage: 100.01 })).toBe(false);
  });
});

describe("Stats", () => {
  it("accepts zero for every numeric field", () => {
    expect(isStats(stats)).toBe(true);
  });

  it.each([null, undefined, [], 0, "Stats", {}])("rejects invalid shapes: %j", (value) => {
    expect(isStats(value)).toBe(false);
  });

  it.each(["primaryAttribute", "secondaryAttribute", "att"] as const)("validates nested %s", (key) => {
    expect(isStats({ ...stats, [key]: { ...attribute, value: -1 } })).toBe(false);
    expect(isStats({ ...stats, [key]: undefined })).toBe(false);
  });

  it.each(Object.keys(stats).filter((key) => typeof stats[key as keyof Stats] === "number"))(
    "requires a finite, nonnegative number for %s", (key) => {
      for (const value of invalidNumbers) {
        expect(isStats({ ...stats, [key]: value })).toBe(false);
      }
      const incomplete: Record<string, unknown> = { ...stats };
      delete incomplete[key];
      expect(isStats(incomplete)).toBe(false);
    },
  );

  it.each(["sacredForce", "arcaneForce"] as const)("enforces integer bounds for %s", (key) => {
    expect(isStats({ ...stats, [key]: 9998 })).toBe(true);
    for (const value of [0.5, 9998.5, 9999, 10000]) {
      expect(isStats({ ...stats, [key]: value })).toBe(false);
    }
  });

  it.each(["cooldownSkip", "cooldownReductionRate", "ignoreElementalDefense"] as const)(
    "enforces percentage bounds for %s", (key) => {
      expect(isStats({ ...stats, [key]: 100 })).toBe(true);
      expect(isStats({ ...stats, [key]: 0.5 })).toBe(true);
      expect(isStats({ ...stats, [key]: 100.01 })).toBe(false);
    },
  );

  it.each([
    "damage", "bossDamage", "criticalRate", "criticalDamage", "buffDuration",
    "ignoreElementalResistance", "summonDuration", "additionalStatusDamage",
    "cooldownReductionNumber", "finalDamage",
  ] as const)("allows fractional values above 100 for %s", (key) => {
    expect(isStats({ ...stats, [key]: 1000.5 })).toBe(true);
  });
});
