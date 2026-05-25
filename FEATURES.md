## Short Term (days)

[Data Safety] — onDelete fires immediately with no confirmation. A single Alert.alert before the DB call prevents irreversible accidental deletions. ← Most impactful quick win.

[Code Quality] — Billing cycle labels are duplicated inline in index.tsx as a ternary chain — CostService.getBillingCycle() already does this. Remove the duplication.

## Mid Term (weeks)

[Feature] — No way to edit or delete a space. Once created, a space is permanent. Add an edit flow (reuse the add-space form) and a delete flow with a warning about orphaned costs.

[Architecture — Critical] — The CREATE TABLE IF NOT EXISTS pattern cannot run migrations. Any future column addition will silently never apply to existing installs. Add PRAGMA user_version-based migration versioning now, while the schema is still small.

[UX / Insight] — SpaceDetails shows only the monthly total. Add the annualized total (already calculated in OverviewScreen) — especially valuable for yearly subscriptions.

[Performance] — groupCostsByCategory and getCategoryWithMostAmount both traverse the costs array on every render. Wrap both in useMemo keyed on costs.

[UX] — CardSpace shows total cost count including inactive ones. Change to "N aktiv / M gesamt" so inactive costs are visible at a glance.

## Long Term (months)

[Architecture] — No dark mode. Colors.ts is a single light palette. Wrapping it in a useColors() hook that respects useColorScheme() is much cheaper to retrofit now than after the component count grows.

[Data / Insight] — No createdAt on costs — impossible to show trends, spending by month, or renewal dates. Adding a createdAt INTEGER (Unix timestamp) via migration unlocks an entire analytical layer.

[Testing] — CostService, SpaceService, CostDetector are pure TypeScript with no side effects — ideal unit test targets with zero mocking infrastructure needed. These services have real edge cases (inactive costs, unknown billing cycles, keyword matching) currently verified only manually.

[Internationalization] — Currency is hardcoded to EUR in CostService.formatAmount. A single currency config key in AsyncStorage with EUR fallback would meaningfully broaden the app's audience.

[Component] — Button only accepts string children. Widening to React.ReactNode enables icon+label buttons without breaking any existing usage.
