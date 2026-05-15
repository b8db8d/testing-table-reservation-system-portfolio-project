# Test Plan - Table Reservation System

| Field                  | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| **Tested Application** | Table Reservation System (own portfolio project generated with AI) |
| **App Stack**          | Laravel 13, Vue 3, Inertia.js, Tailwind 4, MySQL, Laravel Reverb   |
| **Environment**        | Docker Compose, local                                              |
| **Author**             | Kacper Mirecki                                                     |
| **Date**               | 15.05.2026                                                         |
| **Version**            | Portfolio project                                                  |

## 1. Purpose of the Document

This document outlines the scope, methodology, and organization of testing for the AI-generated application based on the Table Reservation System app.

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

## 4. Scope and Object of Testing (Business Context)

The application is a Restaurant Table Reservation System divided into a public-facing client module and an administrative panel governed by Role-Based Access Control.

### 4.1 Public Client-Facing Module

- **Availability Search Engine:** A form allowing users to select a date, time, and guest count to query real-time table availability.
- **Reservation Form:** Collects and validates client information (first name, last name, email, phone number, and optional additional notes).
- **Automated Table-Joining Logic:** Core backend algorithm that automatically combines available tables when the guest count exceeds the capacity of any single available table. _(High-priority target for logical edge-case testing)._
- **Email Confirmations:** Triggers asynchronous email alerts upon registration, confirmation, or rejection.
- **Self-Service Cancellation:** Allows clients to cancel an already confirmed reservation via a secure, tokenized link provided in their confirmation email.

### 4.2 Administrative Panel (`/admin`)

- **Analytical Dashboard:** Displays real-time metrics showing the number of reservations pending approval, scheduled for today, and scheduled for tomorrow.
- **Reservation Management:** Full CRUD capabilities with integrated global search and filtering across all reservations.
- **Pending Queue:** A dedicated sub-view for quick triage of incoming `pending` requests.
- **Table Resource Management:** A dictionary managing physical tables, defining their names, seat capacity, and active/inactive binary status.
- **Table-Joining Rules Configurator:** Administrative panel to create dynamic layout rules (rule name, minimum guest threshold, and mapped physical tables).
- **Operating Hours Management:** A interface to configure weekly schedules and closing days.
- **Staff Account Management:** User management system enforcing Role-Based Access Control with predefined permissions for `manager` and `staff` roles.

### 4.3 Two-Step Email Flow and Reservation Lifecycle

The reservation state machine depends heavily on asynchronous email interactions and Signed URLs to process transitions securely without requiring staff authentication for single actions.

[todo - booking flow diagrams]

