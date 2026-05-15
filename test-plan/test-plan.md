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
