# Testing Checklist

## Testing Strategy

The portfolio is a content-driven site with interactive elements. Testing priorities reflect this:

| Priority | What to test | How |
|----------|-------------|-----|
| Critical | Visual rendering, navigation, responsive behavior | Manual browser testing + Lighthouse |
| High | Accessibility compliance | axe DevTools, keyboard testing, screen reader |
| Medium | Component behavior (interactions, state changes) | Component tests when complexity warrants it |
| Low | Unit logic | Unit tests for utility functions with non-trivial logic |

## Before Writing Tests

Ask: does this need a test? The answer is yes when:

- The logic is non-trivial and has edge cases (data transformations, conditional rendering).
- The component has interactive behavior that could regress (form validation, navigation).
- The function is shared across multiple consumers.

The answer is no when:

- It's a simple presentational component with no logic.
- It's a one-line utility that's obviously correct.
- The behavior is already covered by a higher-level test.

## Manual Testing Checklist

Run through this for every feature before marking it complete:

### Rendering

- [ ] Page loads without console errors.
- [ ] Content renders correctly at 320px, 768px, 1024px, 1440px, 2560px.
- [ ] No layout shift during page load (check CLS).
- [ ] Images load and display at correct aspect ratios.
- [ ] Fonts load without visible flash or layout shift.

### Navigation

- [ ] All links navigate to the correct destination.
- [ ] Browser back/forward buttons work correctly.
- [ ] Active page is indicated in navigation.
- [ ] 404 page renders for invalid routes.

### Interaction

- [ ] All clickable elements respond to click/tap.
- [ ] Hover states are visible on desktop.
- [ ] Focus states are visible when using keyboard.
- [ ] Forms submit and validate correctly.
- [ ] Loading states appear for async operations.

### Cross-Browser

- [ ] Chrome (latest).
- [ ] Firefox (latest).
- [ ] Safari (latest).
- [ ] Mobile Safari (iOS).
- [ ] Chrome (Android).

## Automated Testing (When Added)

When the project grows enough to warrant automated tests:

- **Framework**: Vitest for unit/component tests, Playwright for E2E.
- **Coverage target**: Don't set an arbitrary percentage. Cover critical paths and non-trivial logic.
- **Location**: Test files colocated with their source (`component.test.tsx` next to `component.tsx`).
