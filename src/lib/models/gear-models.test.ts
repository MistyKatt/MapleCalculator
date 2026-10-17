// @vitest-environment node
import { describe, expect, it } from "vitest";
import { isGear, type Gear } from "./gear";
import { isGearBaseInfo, type GearBaseInfo } from "./gear-base-info";
import { isGearLookup, type GearLookup } from "./gear-lookup";
import { isTinyStats, type TinyStats } from "./tiny-stats";

const attribute = { name: "STR", percentage: 0, value: 0, valueFinal: 0 };
const tinyStats: TinyStats = {
  int: attribute, str: attribute, luk: attribute, dex: attribute, att: attribute,
  damage: 0, bossDamage: 0, ignoreEnemyDefense: 0, criticalDamage: 0, criticalRate: 0,
};
const gear: Gear = { gearId: 123, gearStar: 0, gearFlame: tinyStats };
const info: GearBaseInfo = {
  gearName: "Test gear", gearLevel: 0, gearStarCap: 5, gearBaseStats: tinyStats,
};
const invalidNumbers = [NaN, Infinity, -Infinity, "1", null, undefined, true];

describe.each([
  { name: "TinyStats", guard: isTinyStats, fixture: tinyStats },
  { name: "Gear", guard: isGear, fixture: gear },
  { name: "GearBaseInfo", guard: isGearBaseInfo, fixture: info },
])("$name required shape", ({ guard, fixture }) => {
  it("accepts the valid object and tolerates extra fields", () => {
    expect(guard(fixture)).toBe(true);
    expect(guard({ ...fixture, extra: 1 })).toBe(true);
  });

  it("rejects invalid shapes and every missing field", () => {
    for (const value of [null, undefined, [], 1, "gear", {}]) {
      expect(guard(value)).toBe(false);
    }
    for (const key of Object.keys(fixture)) {
      const incomplete: Record<string, unknown> = { ...fixture };
      delete incomplete[key];
      expect(guard(incomplete)).toBe(false);
    }
  });
});

describe("TinyStats", () => {
  it.each(["int", "str", "luk", "dex", "att"] as const)("validates nested %s", (key) => {
    for (const value of [null, {}, { ...attribute, percentage: 101 }, { ...attribute, value: -1 }]) {
      expect(isTinyStats({ ...tinyStats, [key]: value })).toBe(false);
    }
  });

  it.each(["damage", "bossDamage", "criticalDamage", "criticalRate", "ignoreEnemyDefense"] as const)(
    "rejects invalid numeric %s", (key) => {
      for (const value of [-0.1, ...invalidNumbers]) {
        expect(isTinyStats({ ...tinyStats, [key]: value })).toBe(false);
      }
    },
  );

  it.each(["damage", "bossDamage", "criticalDamage", "criticalRate"] as const)(
    "allows fractions above 100 for %s", (key) => {
      expect(isTinyStats({ ...tinyStats, [key]: 1000.5 })).toBe(true);
    },
  );

  it("enforces inclusive ignoreEnemyDefense bounds", () => {
    for (const value of [0, 0.5, 100]) {
      expect(isTinyStats({ ...tinyStats, ignoreEnemyDefense: value })).toBe(true);
    }
    expect(isTinyStats({ ...tinyStats, ignoreEnemyDefense: 100.01 })).toBe(false);
  });
});

describe("Gear", () => {
  it("requires an integer ID without imposing a sign restriction", () => {
    for (const value of [-1, 0, 123]) {
      expect(isGear({ ...gear, gearId: value })).toBe(true);
    }
    for (const value of [0.5, ...invalidNumbers]) {
      expect(isGear({ ...gear, gearId: value })).toBe(false);
    }
  });

  it("enforces star boundaries and nested flame validity", () => {
    expect(isGear({ ...gear, gearStar: 30 })).toBe(true);
    for (const value of [-1, 0.5, 30.5, 31, ...invalidNumbers]) {
      expect(isGear({ ...gear, gearStar: value })).toBe(false);
    }
    expect(isGear({ ...gear, gearFlame: { ...tinyStats, damage: -1 } })).toBe(false);
  });
});

describe("GearBaseInfo", () => {
  it.each([
    { key: "gearLevel", min: 0, max: 300 },
    { key: "gearStarCap", min: 5, max: 30 },
  ] as const)("enforces integer bounds on $key", ({ key, min, max }) => {
    for (const value of [min, max]) {
      expect(isGearBaseInfo({ ...info, [key]: value })).toBe(true);
    }
    for (const value of [min - 1, min + 0.5, max + 1, ...invalidNumbers]) {
      expect(isGearBaseInfo({ ...info, [key]: value })).toBe(false);
    }
  });

  it("requires a string name and valid nested base stats", () => {
    expect(isGearBaseInfo({ ...info, gearName: "" })).toBe(true);
    expect(isGearBaseInfo({ ...info, gearName: 123 })).toBe(false);
    expect(isGearBaseInfo({ ...info, gearBaseStats: { ...tinyStats, att: null } })).toBe(false);
  });
});

describe("GearLookup", () => {
  it("looks up clean information by numeric ID and handles missing IDs", () => {
    const lookup: GearLookup = new Map([[gear.gearId, info]]);
    expect(isGearLookup(lookup)).toBe(true);
    expect(lookup.get(gear.gearId)).toBe(info);
    expect(lookup.get(999)).toBeUndefined();
    expect(isGearLookup(new Map())).toBe(true);
    expect(isGearLookup(new Map([[-1, info], [0, info]]))).toBe(true);
  });

  it("rejects non-Map inputs, invalid keys and invalid entries", () => {
    for (const value of [null, undefined, [], {}, { 123: info }]) {
      expect(isGearLookup(value)).toBe(false);
    }
    for (const key of [0.5, ...invalidNumbers]) {
      expect(isGearLookup(new Map([[key, info]]))).toBe(false);
    }
    expect(isGearLookup(new Map([[1, info], [2, { ...info, gearLevel: 301 }]]))).toBe(false);
  });
});
