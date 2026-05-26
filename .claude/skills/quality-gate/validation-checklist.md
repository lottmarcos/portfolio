# Validation Checklist

Final checks before a feature is considered complete. This runs after implementation and PR review.

## Functional Validation

- [ ] The feature works as described in the task or issue.
- [ ] Edge cases have been tested (empty states, long content, missing data).
- [ ] Error states are handled gracefully.
- [ ] The feature doesn't break existing functionality (manual regression check).

## Visual Validation

- [ ] The implementation matches the design intent.
- [ ] Layout is correct across all breakpoints (320px → 2560px).
- [ ] Dark mode renders correctly.
- [ ] No visual regressions on adjacent pages or components.
- [ ] Passes the anti-cliche checklist in `visual-direction.md`.

## Performance Validation

- [ ] Lighthouse Performance score > 95.
- [ ] Lighthouse Accessibility score > 95.
- [ ] No new console warnings or errors.
- [ ] Core Web Vitals within targets (LCP < 2.5s, INP < 200ms, CLS < 0.1).

## Accessibility Validation

- [ ] Full keyboard navigation test passed.
- [ ] Screen reader test passed (VoiceOver or equivalent).
- [ ] axe DevTools audit shows no critical or serious issues.
- [ ] Touch targets are at least 44x44px on mobile.

## Deployment Validation

- [ ] `next build` completes without errors.
- [ ] Build output shows route sizes within budget.
- [ ] Preview deployment (Vercel preview) renders correctly.
- [ ] No broken links in the deployed version.

## Sign-Off

When all checks pass, the feature is ready to merge. If any check fails:

1. Document the failure.
2. Decide: fix now or track as a known issue.
3. Known issues must have a follow-up task created.

Do not merge with unresolved critical or serious accessibility issues.
