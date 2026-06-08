## Short Term (days)

[Code Quality] — Billing cycle labels are duplicated inline in index.tsx as a ternary chain — CostService.getBillingCycle() already does this. Remove the duplication.

## Mid Term (weeks)

[Feature] — No way delete a space. Once created, a space is permanent. Add an edit flow (reuse the add-space form) and a delete flow with a warning about orphaned costs.

[Architecture — Critical] — The CREATE TABLE IF NOT EXISTS pattern cannot run migrations. Any future column addition will silently never apply to existing installs. Add PRAGMA user_version-based migration versioning now, while the schema is still small.

[UX / Insight] — SpaceDetails shows only the monthly total. Add the annualized total (already calculated in OverviewScreen) — especially valuable for yearly subscriptions.

[Performance] — groupCostsByCategory and getCategoryWithMostAmount both traverse the costs array on every render. Wrap both in useMemo keyed on costs.

[UX] — CardSpace shows total cost count including inactive ones. Change to "N aktiv / M gesamt" so inactive costs are visible at a glance.

## Long Term (months)

[Data / Insight] — No createdAt on costs — impossible to show trends, spending by month, or renewal dates. Adding a createdAt INTEGER (Unix timestamp) via migration unlocks an entire analytical layer.

[Internationalization] — Currency is hardcoded to EUR in CostService.formatAmount. A single currency config key in AsyncStorage with EUR fallback would meaningfully broaden the app's audience.

---

🔴 Short Term — Fix First

3. Monthly equivalent missing on cost rows (CardCategory.tsx)
   A yearly €119.88 subscription shows just the amount + "Jährlich" badge. Users have to divide mentally. CostService.getAmount() already computes the monthly equivalent — just render ≈ €10.00 / Mon as a second line for non-monthly costs. 3–4 lines.

🟠 Mid Term — High Impact 6. Space emoji picker — data pipeline is already 100% built (SpaceForm.tsx, CardSpace.tsx)
imageData exists in the type, DB schema, and both addSpace/updateSpace. The UI just never exposes it. Add a row of emoji chips in SpaceForm and render the chosen emoji in CardSpace. Visual differentiation per space is the single biggest UX improvement available — and it costs one day of work to activate a field that's already wired.

8. Swipe to toggle active/inactive (CardCategory.tsx)
   GestureHandlerRootView already wraps the app. Toggling a cost's status currently takes 4 taps + navigation. A Swipeable row revealing one action ("Pausieren" / "Aktivieren") makes the most common management action feel native and effortless.
