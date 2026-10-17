# Maintenance 001: branch conventions and project instructions

## Requirement

Update the repository instructions and branch-creation skill to use feature, bug and maintenance branches with numeric IDs. Remove the repository README for the current project stage.

## Acceptance criteria

- New branch starts from merged `origin/main` and is named `maintain/001-change-start-maple-branch-skill`.
- Naming is `<type>/<id>-<description>` with `feature`, `bug` or `maintain`, at least three ID digits and a lowercase kebab-case description.
- Examples cover a new player type, an IED bug fix and a skill change.
- Space-separated display examples are converted to valid Git branch names; no literal spaces or `#` are used.
- Root `AGENTS.md` defines the rules; `.agents/skills/maple-start-branch/SKILL.md` uses them during branch creation.
- Previously local project instructions, skill and testing guide are preserved on this branch.
- Root `README.md` is removed, and no active documentation link points to it.
- Documentation, skill metadata, naming examples and Git diff are reviewed. No application code changes or full application test rerun are required.

`001` identifies this maintenance task using the user's example. It does not assert that GitHub Issue #1 exists for this task; #1 is the already-merged initial PR. The connected integration previously denied Issue creation, so this file records the local requirement.
