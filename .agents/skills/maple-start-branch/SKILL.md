---
name: maple-start-branch
description: Create a MapleCalculator feature, bug or maintenance branch using the repository's work-item ID, naming and base-branch conventions. Use when starting independent repository work or explicitly asked to create a branch.
---

# Start a MapleCalculator branch

Read the repository-root `AGENTS.md` for the canonical branch pattern and delivery rules.

1. Inspect the current branch, working tree, remotes and available refs. If continuing the same work item, reuse its branch.
2. For new independent work, choose `feature`, `bug` or `maintain` according to `AGENTS.md`. Obtain the user-provided work-item ID or associated GitHub Issue number, pad it to at least three digits and derive a short lowercase kebab-case description. If no identifier can be established, ask for it rather than inventing an Issue. Form `<type>/<id>-<description>`; replace display-style spaces with hyphens and omit a literal `#`. For example, a request to update this skill under task 001 becomes `maintain/001-change-start-maple-branch-skill`. Validate the proposed name against the pattern in `AGENTS.md` and with `git check-ref-format --branch`.
3. Check whether the target branch already exists locally or remotely. Reuse it only if it represents the same work; otherwise choose a distinct descriptive slug.
4. Fetch `origin` when available and base independent work on current `origin/main`. Preserve uncommitted changes and divergent local commits; do not reset, force-checkout, auto-stash or delete branches. If there is no safe base or checkout would disturb unrelated work, explain the specific blocker before proceeding.
5. Create the branch with `git switch -c NAME origin/main` when that base is available. Verify the resulting branch with `git branch --show-current` and report the name and base. If fetch was unavailable, disclose that before relying on a local main ref.

Branch creation does not itself authorize pushing, opening a PR, merging or changing repository permissions. Follow the user's requested delivery scope for those actions.
