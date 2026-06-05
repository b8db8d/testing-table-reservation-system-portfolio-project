# Playwright E2E Automated Tests

End-to-end automated tests for the [Table Reservation System](https://github.com/b8db8d/Table-Reservation-System).
Built with Playwright + TypeScript.

## Tests Index

| ID     | Area                                                                                            | File                                                                 |
| ------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| TC-001 | operating hours: checking available slot on closed day informs client that restaurant is closed | [01-operating-hours.spec.ts](./tests/e2e/01-operating-hours.spec.ts) |
| TC-002 | operating hours: outside of schedule are not available for selection                            | [01-operating-hours.spec.ts](.tests/e2e/01-operating-hours.spec.ts)  |
| TC-003 | booking flow, rejection: submit, pending, reject, notify                                        | [02-booking-flow.spec.ts](./tests/e2e/02-booking-flow.spec.ts)       |
| TC-004 | booking flow, confirmation and cancellation: submit, pending, confirm, notify, cancel, notify   | [02-booking-flow.spec.ts](./tests/e2e/02-booking-flow.spec.ts)       |
| TC-005 | permissions, staff: reservations CRUD does not show 'Delete' button                             | [03-permissions.spec.ts](./tests/e2e/03-permissions.spec.ts)         |
| TC-006 | permissions, staff: access to restaurant tables dashboard is denied                             | [03-permissions.spec.ts](./tests/e2e/03-permissions.spec.ts)         |
| TC-007 | permissions, manager: reservations CRUD shows 'Delete' button                                   | [03-permissions.spec.ts](./tests/e2e/03-permissions.spec.ts)         |
| TC-008 | permissions, manager: reaching restaurant tables dashboard returns 200                          | [03-permissions.spec.ts](./tests/e2e/03-permissions.spec.ts)         |

## How to Run

Prerequisites: Application running via Docker Compose (see [README](../README.md)).

```bash
cd playwright
npm install
npx playwright install chromium
npx playwright test
```

Open HTML report:

```bash
npx playwright show-report
```

## Available Scripts

| Command            | Purpose                    |
| ------------------ | -------------------------- |
| `npm run lint`     | Run ESLint check           |
| `npm run lint:fix` | Auto-fix ESLint issues     |
| `npm run format`   | Format files with Prettier |

## Architecture

```
tests/
├── e2e/ # Test specs grouped by feature
├── fixtures/ # Authentication and pre-seeded data fixtures
├── pages/ # Page Object Model classes
│ └── components/ # Reusable component objects
├── utils/ # Helpers
└── data/ # Test data constants
```

### Design Decisions

- **Strict UI + email verification.** Tests verify behavior through user-visible interfaces (UI and emails) without direct database queries.
- **Email verification via Mailpit API, not UI.** Email assertions use Mailpit's HTTP API rather than scraping the Mailpit web UI.
- **Browser context per role.** Multi-role tests (staff vs. manager) use separate browser contexts via fixtures, preventing session interference within a single test.
- **Timestamp in email address** Provides correct case mapping during parallel testing.
- **Cache cleanup auto-fixture.** Automatically clears Laravel cache between tests to prevent flaky tests.
