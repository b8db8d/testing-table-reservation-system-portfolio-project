# Test Plan - Table Reservation System

| Field                  | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| **Tested Application** | Table Reservation System (own portfolio project generated with AI) |
| **App Stack**          | Laravel 13, Vue 3, Inertia.js, Tailwind 4, MySQL, Laravel Reverb   |
| **Environment**        | Docker Compose, local                                              |
| **Author**             | Kacper Mirecki                                                     |
| **Date**               | 15.05.2026                                                         |
| **Version**            | 1.0.                                                               |

## 1. Purpose of the Document

This document outlines the scope, methodology and organization of testing Table Reservation System App.

## 2. Application State

The application was coded by Claude Code using the [workflow](https://github.com/LaravelDaily/AI-Workflows-For-Laravel) created by [Povilas Korop](https://github.com/PovilasKorop).
The creation context is located in the [docs/](#) folder of the application repository. The skills and guidelines used are available in [.ai/](#).
The tested application passed all feature tests written in Pest by the AI agent during the development process. Docker containerization, including database seeders and factories, was added for local testing purposes.

## 3. Stack and dependencies

| Layer                   | Technology                                      | Notice                                                                                                           |
| ----------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Backend                 | Laravel 13 (Starter Kit)                        |                                                                                                                  |
| Frontend                | Vue 3 + Inertia.js v3 + Tailwind 4 + shadcn-vue |                                                                                                                  |
| Databse                 | MySQL                                           |                                                                                                                  |
| Realtime                | Laravel Reverb (WebSockets)                     |                                                                                                                  |
| Roles and permissions   | spatie/laravel-permission                       |                                                                                                                  |
| Audit log               | spatie/laravel-activitylog                      |                                                                                                                  |
| Bot protection          | spatie/laravel-honeypot                         | Disabled in testing environment for automated test purposes ([.env.docker.example](#) `HONEYPOT_ENABLED=false`). |
| Phone number validation | propaganistas/laravel-phone                     |
| List filter             | spatie/laravel-query-builder                    |
| Local environment       | Docker Compose                                  |

## 4. Scope of Testing

### 4.1. In Scope

### 4.2. Out of Scope

## 5. Testing Strategy and Levels

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

### 6.3. Containers names

| Name                 | Service        | Default port           |
| -------------------- | -------------- | ---------------------- |
| reservations-app     | application    | 8000                   |
| reservations-db      | MySQL database | 3306                   |
| reservations-mailpit | Mailpit        | 8025 - UI, 1025 - SMTP |

### 6.4. CLI commands

| Objective                            | Command                                                                       |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| **Launching App via Docker Compose** | `docker compose up -d --build`                                                |
| **Login to MySQL CLI**               | `docker exec -it reservations-db mysql -u laravel -psecret reservations_test` |
| **Data base fresh seed**             | `docker exec -it reservations-app php artisan migrate:fresh --seed --force`   |
| **Run WebSocket**                    | `docker exec -it reservations-app php artisan reverb:start`                   |
| **Cache removal**                    | `docker exec -it reservations-app php artisan optimize:clear`                 |

### 6.5. Test App Accounts

| Name          | E-mail                 | Password | Role     |
| ------------- | ---------------------- | -------- | -------- |
| Test Customer | <customer@example.com> | password | customer |
| Test Manager  | <manager@example.com>  | password | manager  |
| Test Staff    | <staff@example.comc>   | password | staff    |
