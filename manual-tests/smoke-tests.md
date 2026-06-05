# Smoke Tests - Table Reservation System

Format follows a structured template: ID, title, steps, expected result.

## Smoke Test Cases Index

| ID     | Title                                             |
| ------ | ------------------------------------------------- |
| ST-001 | Public reservation panel is available             |
| ST-002 | Connection with WebSocket confirmed               |
| ST-003 | Manager can log in and reach admin panel          |
| ST-004 | Staff can log in and reach admin panel            |
| ST-005 | Operating hours corresponds with reference data   |
| ST-006 | Restaurant Tables corresponds with reference data |

## Preconditions for Smoke Tests

1. `docker compose up` (or docker) executes and starts without any fatal errors.
2. `docker compose ps` confirms that the following core containers are in a `running` state:
   - **reservations-app**
   - **reservations-db**
   - **reservations-mailpit**
   - **reservations-reverb**
3. Database migrations and seeders execute successfully, establishing a clean testing state.
4. The backend WebSocket server launches without exceptions.

## Detailed Smoke Test Cases

### ST-001 — Public reservation panel is available

**Steps**

1. Open the browser navigate to `http://localhost:8000/`

**Expected result**

- The public reservation panel loads successfully.
- Server returns an HTTP 200 status code.

### ST-002 — Connection with WebSocket confirmed

**Steps**

1. Open the browser navigate to `http://localhost:8000/`
2. Open Browser DevTools and select Network -> Socket tab.
3. Refresh the page if necessary to capture initial traffic.

**Expected result**

- An active WebSocket connection connection to the Reverb server is displayed.
- Connection status returns 101 Switching Protocols.

### ST-003 — Manager can log in and reach admin panel

**Steps**

1. Open the browser navigate to `http://localhost:8000/login`
2. Populate the form with Test Manager credentials ([reference-data](../reference-data/README.md)).
3. Click Log in button.
4. Navigate to `http://localhost:8000/admin`

**Expected result**

- User is successfully authenticated.
- UI elements load without exceptions (HTTP 200).
- Profile name component displays **Test Manager**.

### ST-004 — Staff can log in and reach admin panel

**Steps**

1. Open the browser navigate to `http://localhost:8000/login`
2. Populate the form with Test Staff credentials ([reference-data](../reference-data/README.md)).
3. Click Log in button.
4. Navigate to `http://localhost:8000/admin`

**Expected result**

- User is successfully authenticated.
- UI elements load without exceptions (HTTP 200).
- Profile name component displays **Test Staff**.

### ST-005 — Operating hours corresponds with reference data

**Steps**

1. In browser go to endpoint `http://localhost:8000/login`
2. Fill form with Test Manager credentials ([reference-data](../reference-data/README.md)).
3. Click Log in button.
4. Navigate to `http://localhost:8000/admin`
5. Go to tab **Operating Hours**

**Expected result**

- UI elements load without exceptions (HTTP 200).
- Operating hours list corresponds with data in [reference-data](../reference-data/README.md)

### ST-006 — Tables corresponds with reference data

**Steps**

1. In browser go to endpoint `http://localhost:8000/login`
2. Fill form with Test Manager credentials ([reference-data](../reference-data/README.md)).
3. Click Log in button.
4. Navigate to `http://localhost:8000/admin`
5. Go to tab **Tables**

**Expected result**

- UI elements load without exceptions (HTTP 200).
- Tables list corresponds with data in [reference-data](../reference-data/README.md)
