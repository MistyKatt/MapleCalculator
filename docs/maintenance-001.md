# Maintenance 001: branch conventions and project instructions

## Requirement

Update the repository instructions and branch-creation skill to use feature, bug and maintenance branches with numeric IDs. Remove the repository README for the current project stage.

Follow-up: automatically commit and push completed, verified work and create or reuse a PR for owner review, including this maintenance branch.

## Acceptance criteria

- New branch starts from merged `origin/main` and is named `maintain/001-change-start-maple-branch-skill`.
- Naming is `<type>/<id>-<description>` with `feature`, `bug` or `maintain`, at least three ID digits and a lowercase kebab-case description.
- Examples cover a new player type, an IED bug fix and a skill change.
- Space-separated display examples are converted to valid Git branch names; no literal spaces or `#` are used.
- Root `AGENTS.md` defines the rules; `.agents/skills/maple-start-branch/SKILL.md` uses them during branch creation.
- Previously local project instructions, skill and testing guide are preserved on this branch.
- Root `README.md` is removed, and no active documentation link points to it.
- Documentation, skill metadata, naming examples and Git diff are reviewed. Instruction-only changes do not require an application test rerun; build or dependency changes require full verification.
- Automatic delivery is documented in `AGENTS.md` and the `maple-deliver-work` skill; the branch skill points to that workflow.
- Completed, verified changes are pushed and have one open PR targeting `main`, reusing an existing PR when present. No automatic merge is performed.
- Repair the inherited lockfile's missing optional `@emnapi` entries found by the Ubuntu CI clean install. Validate it with the CI runner's npm version and run the full verification suite.

`001` identifies this maintenance task using the user's example. It does not assert that GitHub Issue #1 exists for this task; #1 is the already-merged initial PR. The connected integration previously denied Issue creation, so this file records the local requirement.
