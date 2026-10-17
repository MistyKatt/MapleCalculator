---
name: maple-deliver-work
description: Deliver completed MapleCalculator work by verifying, committing, pushing its branch and creating or updating a pull request. Use when implementation is finished or the user asks to publish a completed work branch for review.
---

# Deliver MapleCalculator work

Read repository-root `AGENTS.md` for naming, verification and standing push/PR authorization. Honor a task-specific local-only instruction when present.

1. Inspect the working tree, work branch, remote and diff against `main`. Keep unrelated changes out of the commit. Do not deliver by pushing directly to `main` or force-pushing.
2. Run the verification required by `AGENTS.md`. Code and build configuration changes require `npm run verify`; documentation/instruction-only changes require diff, links and skill metadata review. Do not mark failed or unrun tests as passed. Fix relevant failures before delivery or report the specific blocker.
3. Commit the intended changes if needed. Push the completed work branch and set its upstream to the corresponding remote work branch. Reuse already-pushed commits; do not create empty commits. If push is rejected, inspect the remote state and resolve safely without force-pushing or overwriting other work.
4. Look for an open PR in the target repository with this exact head branch and base `main`. Reuse it when present. If absent and the branch has changes against `main`, create a non-draft PR. If a prior PR was closed or merged, inspect whether the current changes are new before deciding to create another PR. Avoid duplicate PRs when a request times out: check the remote result before retrying.
5. Describe the final change, actual validation, linked requirement and material limitations. Update an existing PR's title/body when needed. An unavailable GitHub Issue may be represented by the local requirement document; do not invent Issue links.
6. Verify the returned PR URL and head branch. Attach the PR to the current Codex chat when that tool is available. Inspect CI status when available, distinguishing passed, pending and failed; fix failures attributable to this change and push the correction. Report the PR link and any outstanding CI/review state.

Push and PR creation are already authorized by the repository workflow. Do not add another conversational approval step; respect actual runtime approvals and report access errors. Leave the PR open for the user's review. Do not merge, enable auto-merge, change repository permissions or bypass checks as part of delivery.
