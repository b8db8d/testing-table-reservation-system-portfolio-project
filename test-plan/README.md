# Test Plan - Table Reservation System

| Field                  | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| **Tested Application** | Table Reservation System (own portfolio project generated with AI) |
| **App Stack**          | Laravel 13, Vue 3, Inertia.js, Tailwind 4, MySQL, Laravel Reverb   |
| **Environment**        | Docker Compose, local                                              |
| **Author**             | Kacper Mirecki                                                     |
| **Date created**       | 05.06.2026                                                         |
| **Version**            | 1.0                                                                |

## 1. Purpose of the Document

This document outlines the scope, methodology and organization of testing Table Reservation System App.

## 2. Application State

The application was coded by Claude Code using the [workflow](https://github.com/LaravelDaily/AI-Workflows-For-Laravel) created by [Povilas Korop](https://github.com/PovilasKorop).
The creation context is located in the [docs/](https://github.com/b8db8d/Table-Reservation-System/tree/main/docs) folder of the application repository. The skills and guidelines used are available in [.ai/](https://github.com/b8db8d/Table-Reservation-System/tree/main/.ai).
The tested application passed all feature tests written in Pest by the AI agent during the development process. Docker containerization, including database seeders and factories, was added for local testing purposes.

## 3. Stack and dependencies

| Layer                   | Technology                                      | Notice                                                                                                                                                                                          |
| ----------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend                 | Laravel 13 (Starter Kit)                        |                                                                                                                                                                                                 |
| Frontend                | Vue 3 + Inertia.js v3 + Tailwind 4 + shadcn-vue |                                                                                                                                                                                                 |
| Database                | MySQL                                           |                                                                                                                                                                                                 |
| Realtime                | Laravel Reverb (WebSockets)                     |                                                                                                                                                                                                 |
| Roles and permissions   | spatie/laravel-permission                       |                                                                                                                                                                                                 |
| Audit log               | spatie/laravel-activitylog                      |                                                                                                                                                                                                 |
| Bot protection          | spatie/laravel-honeypot                         | Disabled in testing environment for automated test purposes ([.env.docker.example](https://github.com/b8db8d/Table-Reservation-System/blob/main/.env.docker.example) `HONEYPOT_ENABLED=false`). |
| Phone number validation | propaganistas/laravel-phone                     |
| List filter             | spatie/laravel-query-builder                    |
| Local environment       | Docker Compose                                  |

## 4. Scope of Testing

### 4.1. In Scope

The following areas were investigated during this testing iteration:

- **Public booking flow:** availability check, form validation, reservation submission, success confirmation
- **Email notifications:** pending request to manager, acknowledgement to guest, confirmation/rejection/cancellation emails (verified via Mailpit)
- **Signed URL flow:** manager confirmation and rejection via deep links from email; guest cancellation via link
- **Reservation lifecycle:** pending → confirmed → cancelled, pending → rejected
- **Admin panel:** reservation list, table assignment visibility (or absence)
- **Role-based access control (RBAC):** staff and manager permission boundaries
- **Operating hours enforcement:** closed days, out-of-schedule times
- **Real-time updates:** WebSocket connections for public availability page
- **Database integrity:** verified via SQL queries.

### 4.2. Out of Scope

These areas were intentionally excluded from this testing iteration:

- **Cross-browser testing:** only Google Chrome verified
- **Responsive design:** single viewport (desktop) tested
- **Accessibility audit:** not performed
- **Load and performance testing:** not performed
- **Security audit:** input boundary probes performed informally during exploratory testing, but not a substitute for a formal security review
- **Internationalization (i18n):** English only
- **Customer account flows:** registration, login, password reset — touched superficially during exploratory but not the focus
- **Production-environment email delivery:** Mailpit substitutes for SMTP in test environment

## 5. Testing Strategy and Levels

Testing approach was **session-based exploratory testing** supplemented by **automated regression** for the most valuable scenarios.

### 5.1 Manual Exploratory Testing

The primary method. Time-boxed sessions with specific charters (e.g., "investigate signed URL flow for state-machine and authorization issues"). Each session produced findings documented as bug reports in [bugs/](../bugs/), classified by severity and traced to user stories where applicable.

This approach was chosen because:

- The application was AI-generated; failure modes were not predictable from the spec.
- User stories left several behaviors unspecified, surfacing as findings rather than predefined test cases.
- For a focused portfolio, depth in critical areas (table-joining algorithm, signed URLs, admin state machine) was prioritized.

#### Findings

See [bugs/README.md](../bugs/README.md) for the complete bug log discovered during testing.

### 5.2. Smoke Tests

Defined in [smoke-tests.md](../manual-tests/smoke-tests.md). Used as entry criteria before each exploratory session — verify environment is operational before deeper investigation.

### 5.3. Automated Regression

Playwright + TypeScript E2E tests in [playwright/](../playwright/) cover:

- Pre-flight checks (operating hours, closed days)
- Booking lifecycle flows (rejection, confirmation, cancellation)
- RBAC enforcement (staff and manager)

Tests verify behavior through the UI and email notifications via Mailpit API. Database state is verified manually during exploratory testing; Playwright suite focuses on user-facing behavior.

### 5.4. UI-to-Database Integration Verification

Critical findings (e.g., BUG-002 overbooking) were verified at the database layer using SQL queries documented in [sql/](../sql/). This confirmed that UI symptoms corresponded to actual data state changes, not just front-end glitches.

## 6. Testing environment

### 6.1. System requirements

| Element              | Value                                       |
| -------------------- | ------------------------------------------- |
| **Environment file** | Copy `.env.docker.example` to `.env.docker` |
| **Browsers**         | Google Chrome                               |
| **Tools**            | DevTools, Playwright, Mailpit               |

### 6.2. Default links

| Localization                   | Address                                                |
| ------------------------------ | ------------------------------------------------------ |
| **Frontend (client)**          | <http://localhost:8000/>                               |
| **Admin panel**                | <http://localhost:8000/admin>                          |
| **User dashboard**             | <http://localhost:8000/dashboard>                      |
| **Login page**                 | <http://localhost:8000/login>                          |
| **Reservations panel (CRUD)**  | <http://localhost:8000/admin/reservations>             |
| **Pending reservations**       | <http://localhost:8000/admin/reservations/pending>     |
| **Restaurant tables panel**    | <http://localhost:8000/admin/tables>                   |
| **Table joining groups panel** | <http://localhost:8000/admin/tables/groups>            |
| **Operating hours panel**      | <http://localhost:8000/admin/settings/operating-hours> |
| **Staff accounts management**  | <http://localhost:8000/admin/staff>                    |
| **Mailpit (e-mail UI )**       | <http://localhost:8025>                                |
| **Laravel Reverb (WebSocket)** | <http://localhost:8080>                                |

### 6.3. Setting up the testing environment

1. Download files from [Table Reservation System repository](https://github.com/b8db8d/Table-Reservation-System/tree/main).
2. Open CLI in project's root folder.
3. Type: `make setup`.
4. After building containers app is available in browser under address: <http://localhost:8000>

### 6.4. Containers names

| Name                 | Service        | Default port           |
| -------------------- | -------------- | ---------------------- |
| reservations-app     | application    | 8000                   |
| reservations-reverb  | Laravel Reverb | 8080                   |
| reservations-db      | MySQL database | 3306                   |
| reservations-mailpit | Mailpit        | 8025 - UI, 1025 - SMTP |

### 6.5. CLI simplified commands

| Action                                     | Command       |
| ------------------------------------------ | ------------- |
| **Setting and launching test environment** | `make setup`  |
| **Launching test environment**             | `make up`     |
| **Stopping test environment**              | `make down`   |
| **Show containers status**                 | `make status` |

### 6.6. CLI detailed commands

| Action                               | Command                                                                       |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| **Launching App via Docker Compose** | `docker compose up`                                                           |
| **Login to MySQL CLI**               | `docker exec -it reservations-db mysql -u laravel -psecret reservations_test` |
| **Database fresh seed**              | `docker exec reservations-app php artisan migrate:fresh --seed --force`       |
| **Run WebSocket**                    | `docker exec reservations-app php artisan reverb:start`                       |
| **Cache removal**                    | `docker exec reservations-app php artisan optimize:clear`                     |
| **Delete all emails in Mailpit**     | `curl -s -X DELETE http://localhost:8025/api/v1/messages`                     |

### 6.7. User Types

Based on [user-stories.md](../user-stories/user-stories.md).

**User Types:**

- **Guest** — Unauthenticated visitor making or viewing a reservation
- **Customer** — Optionally registered user with booking history access
- **Staff** — Restaurant employee who can confirm/reject reservations
- **Manager** — Full-access admin who manages floors, tables, and staff

### 6.8. Test App Accounts

| Name          | E-mail                 | Password     | Role     |
| ------------- | ---------------------- | ------------ | -------- |
| Test Customer | <customer@example.com> | customerpass | customer |
| Test Manager  | <manager@example.com>  | managerpass  | manager  |
| Test Staff    | <staff@example.com>    | staffpass    | staff    |

## 7. Test Execution Order

For each testing session:

1. Verify environment via smoke tests ([smoke-tests.md](../manual-tests/smoke-tests.md))
2. Run automated Playwright suite to verify baseline regression
3. Perform exploratory testing with documented session charter
4. Triage findings into bug reports or specification gaps
5. Add automated regression coverage for high-value findings
