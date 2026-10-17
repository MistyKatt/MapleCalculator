# Gear models

Follow-up requirements for feature 001, supplied in the model discussion.
GitHub Issue creation was previously unavailable (integration returned HTTP 403),
so acceptance criteria are recorded here.

All fields are required, use camelCase, and are stored without deriving values.
Runtime guards validate unknown input without coercion or clamping. Additional
properties are tolerated, consistent with the existing models.

| Model | Property | Constraint |
| --- | --- | --- |
| Gear | gearId | integer, no specified sign/range restriction |
| Gear | gearStar | integer, 0–30 inclusive |
| Gear | gearFlame | TinyStats |
| TinyStats | int, str, luk, dex, att | BaseAttribute |
| TinyStats | damage, bossDamage, criticalDamage, criticalRate | finite number >= 0, no upper bound |
| TinyStats | ignoreEnemyDefense | finite number, 0–100 inclusive |
| GearBaseInfo | gearName | string |
| GearBaseInfo | gearLevel | integer, 0–300 inclusive |
| GearBaseInfo | gearStarCap | integer, 5–30 inclusive |
| GearBaseInfo | gearBaseStats | TinyStats |
| GearLookup | entries | integer keys, GearBaseInfo values |

TypeScript represents Double and Int using `number`; guards enforce integer
constraints. Non-finite values are invalid. Percentage values use percentage
points: 25 means 25%. `crit damage` and `crit rate` use the existing naming
convention `criticalDamage` and `criticalRate`.

`GearLookup` is a `Map<number, GearBaseInfo>`, keeping keys numeric:

```ts
import type { GearLookup } from "@/lib/models/gear-lookup";

const lookup: GearLookup = new Map();
// lookup.set(gearId, cleanGearInfo);
const cleanGearInfo = lookup.get(123); // GearBaseInfo | undefined
```

`gearLevel` belongs to GearBaseInfo, not Gear. The model guards validate each
object independently; they do not require a Gear ID to exist in a catalog or
compare gearStar with the catalog's gearStarCap. Catalog data, cross-object
validation, gameplay calculations and JSON converters are outside this change.
A Map requires a dedicated converter for JSON persistence in a later feature.

Acceptance criteria: expose all four models and their `is...` runtime guards;
test required fields, nested attributes, integer/percentage boundaries, invalid
numbers and lookup keys/values; pass `npm run verify`.
