# PlayerStats and BaseAttribute

Requirement source: the feature request in the model/type discussion. GitHub
Issue creation was unavailable (integration returned HTTP 403).

`BaseAttribute` and `PlayerStats` live in `src/lib/models/`. All fields are required;
property names use camelCase. TypeScript uses `number` for both the requested
Double and Int types. The `isBaseAttribute` and `isPlayerStats` type guards check
unknown values at runtime. They return false for invalid inputs without
coercing, clamping or supplying defaults. Additional properties are tolerated.

## BaseAttribute

| Property | Constraint |
| --- | --- |
| name | string, including the empty string |
| percentage | finite number, 0 through 100 inclusive |
| value, valueFinal | finite numbers >= 0 |

`valueFinal` is independently stored. No relationship or formula between it,
`value` and `percentage` is specified.

## PlayerStats

| Properties | Constraint |
| --- | --- |
| primaryAttribute, secondaryAttribute, att | valid BaseAttribute |
| damage, bossDamage, criticalRate, criticalDamage, buffDuration, ignoreElementalResistance, summonDuration, additionalStatusDamage, cooldownReductionNumber, finalDamage | finite numbers >= 0, no upper bound |
| sacredForce, arcaneForce | integers >= 0 and < 9999 (maximum 9998) |
| cooldownSkip, cooldownReductionRate, ignoreElementalDefense | finite numbers, 0 through 100 inclusive |

Percentage/rate fields use percentage points (25 represents 25%, not 0.25).
`criticalRate` and `ignoreElementalResistance` retain the requested unbounded
upper range. `ignoreElementalResistance` and `ignoreElementalDefense` remain
separate fields with distinct constraints. No unit for `cooldownReductionNumber`
is assumed yet.

## Acceptance criteria

- Both models expose all requested fields with the documented names and types.
- Runtime guards reject missing fields, incorrect types, invalid nested
  attributes, negative values, NaN, infinities, out-of-range percentages and
  fractional or out-of-range force values.
- Tests cover inclusive/exclusive boundaries and allow values over 100 for
  fields that have no specified upper bound.
- JSON converters, defaults, gameplay formulas and UI changes are deferred.
- Run `npm run verify` before delivery.
