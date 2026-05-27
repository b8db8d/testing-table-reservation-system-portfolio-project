# Database Container Access, Table Schema, and Data Verification (SQL)

## 1. Database Reset and Test Data Generation

After starting the development containers, run the following command in your terminal to wipe the database, run migrations, and populate it with seeders:

```bash
docker exec -it reservations-app php artisan migrate:fresh --seed --force
```

---

## 2. Accessing the Database CLI (MySQL)

To enter the database command-line interface directly inside the container:

```bash
docker exec -it reservations-db mysql -u laravel -psecret reservations_test
```

To exit the database CLI:

```bash
exit
```

---

## 3. Mapping Critical Tables for the Testing Process

| Table Name                             | Stored Data / QA Perspective Description                                                 |
| -------------------------------------- | ---------------------------------------------------------------------------------------- |
| `activity_log`                         | Audit logs (Spatie laravel-activitylog) – used to verify user actions and system events. |
| `restaurant_tables`                    | Table dictionary.                                                                        |
| `table_joining_groups`                 | Defined table-joining groups.                                                            |
| `table_joining_group_restaurant_table` | Pivot table (relational mapping of tables to joining groups).                            |
| `joining_group_restrictions`           | Availability restrictions for joined groups.                                             |
| `operating_hours`                      | Operating hours schedule for specific days of the week.                                  |
| `permissions`                          | System permissions.                                                                      |
| `reservations`                         | Reservation registry                                                                     |
| `reservation_restaurant_table`         | Pivot table (assigning specific physical tables to a given reservation).                 |
| `roles`                                | User roles dictionary.                                                                   |
| `role_has_permissions`                 | Mapping permissions to specific roles.                                                   |
| `users`                                | User accounts.                                                                           |

View all tables:

```sql
SHOW TABLES;
```

---

View table schema and columns:

```sql
SHOW COLUMNS FROM table_name;
```

---

## 4. Example Verification Queries

During testing database had not many records, so generic queries were enough (like `SELECT * FROM table_name`).

Below I present more complicated queries, which cover cases, where joins or filters where needed to verify multi-table relationships.

### 4.1 Verifying Granted Permissions for a Role

Enables verification that the seeder correctly assigned permissions to a specific role (e.g., ensuring a staff user did not accidentally receive manager privileges):

```sql
SELECT p.name
FROM permissions p
JOIN role_has_permissions rhp ON p.id = rhp.permission_id
JOIN roles r ON rhp.role_id = r.id
WHERE r.name = 'role_name';
```

---

### 4.2 Checking the Integrity of Table-Joining Groups

```sql
SELECT rt.name
FROM restaurant_tables rt
JOIN table_joining_group_restaurant_table tjgrt ON rt.id = tjgrt.restaurant_table_id
JOIN table_joining_groups tjg ON tjgrt.table_joining_group_id = tjg.id
WHERE tjg.name = 'joining_group_name';
```

---

### 4.3 Fetching Reservations within a Time Range

Date format: YYYY-MM-DD:

```sql
SELECT *
FROM reservations
WHERE status = 'confirmed'
AND reservation_date BETWEEN 'start_date' AND 'end_date';
```

---

### 4.4 Occupancy Verification for a Specific Day and Time Window

Returns table names, reservation reference numbers, and times for confirmed reservations within a selected time window (sorted chronologically from latest to earliest):(date format: YYYY-MM-DD, hour format: HH:MM:SS):

```sql
SELECT rt.name, r.reference_number, r.reservation_time
FROM restaurant_tables rt
JOIN reservation_restaurant_table rrt ON rrt.restaurant_table_id = rt.id
JOIN reservations r ON r.id = rrt.reservation_id
WHERE r.status = 'confirmed'
AND r.reservation_date = 'selected_day'
AND r.reservation_time BETWEEN 'start_time' AND 'end_time'
ORDER BY r.reservation_time DESC;
```

---
