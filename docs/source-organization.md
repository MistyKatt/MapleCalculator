# Maintenance 002: model and database organization

Requirement: group related models into subfolders and relocate the supplied
root gear database into a folder that can also hold future databases.
GitHub Issue creation returned HTTP 403, so requirements are recorded here.
The user supplied work-item ID `002`; it does not refer to a GitHub Issue.

## Layout

- `src/lib/models/player/`: Player and PlayerStats.
- `src/lib/models/gear/`: Gear, GearBaseInfo, GearLookup, GearPanel and GearSlot.
- `src/lib/models/shared/`: BaseAttribute and TinyStats, shared across domains.
- `src/lib/models/__tests__/`: existing model and equipment hierarchy tests.
- `src/data/`: static source databases; `item_db.js` is the supplied source of
  truth for MapleStory gears. Add future database files here.

Import models directly from their domain paths. Shared models do not depend on
player or gear models. The catalog remains raw source data, with its original
filename and byte contents preserved; it is not yet imported by the application.
ESLint excludes this raw catalog so its unused source variable does not require
rewriting the authoritative data. Future application adapters should be linted.

## Acceptance criteria

- Models and existing tests use the new paths without changing model behavior.
- The root catalog is relocated to `src/data/item_db.js` unchanged.
- Documentation examples use the new import paths.
- `npm run verify` passes before delivery.
