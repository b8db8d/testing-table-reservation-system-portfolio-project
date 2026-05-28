**ID:** BUG-001  
**Title:** Admin panel does not receive new reservations in real time; manual refresh required.  
**Severity:** Major.  
**Environment:** Chrome 148.0.7778.178, Docker.  
**Preconditions:** Fresh local test environment passing smoke tests ST-001, ST-002, ST-003.  
**Steps to reproduce:**

1. Open first instance of browser.
2. Go to `/login` and log in with Test Manager credentials.
3. Go to `/admin`.
4. Number of pending reservations show 0.
5. Open second instance of browser.
6. Go to `/` and check availability for B1 case ([test-data.md](../manual-tests/test-data.md)).
7. Fill the form **Your details** with credentials for G1 guest ([test-data.md](../manual-tests/test-data.md)).
8. Submit form.
9. Go to first browser instance.

**Expected result:** Information about new reservation should show in tost in real time and pending reservations counter should increase to 1.
**Actual result:** The number of pending reservations shows 0. No tost information. Pending reservation counter updates to 1 only after reloading admin panel.
**Suspected root cause:** Laravel Reverb client appears not to be initialized on `/admin`. DevTools Network → WS tab shows no WebSocket connection on the admin route, while the public `/` route does establish one (see ST-002).

**Evidence:**  
![Bug-001 screenshot](./screenshots/Bug-001.png)

---
