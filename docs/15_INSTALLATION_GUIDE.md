# KQ Emporium Installation Guide

This guide sets up the KQ Emporium frontend MVP prototype for local development and client review.

## Project scope

The current project is a Next.js frontend prototype. It uses local mock data and local component state.

The current installation does not require:

- A database
- A backend or API
- Authentication credentials
- Environment variables
- Email, file storage, payment, or other external services

Form submissions, admin changes, and selected image previews are local prototype interactions only. They are not sent to a server or persisted after the page is refreshed.

## Prerequisites

Install the following before starting:

- Git, if you are cloning the repository
- Node.js 20.9.0 or newer
- npm, which is included with Node.js
- A modern web browser

Node.js 20.9.0 is the minimum runtime required by the installed Next.js 16.3.2 dependency. Confirm the installed version with:

```bash
node --version
```

## Installation

### 1. Get the source code

Clone the repository using the project URL provided by your team, then enter the project directory:

```bash
git clone <repository-url>
cd kq-emporium
```

If the repository is already available locally, open a terminal at its root directory. The root directory contains `package.json` and `package-lock.json`.

### 2. Install dependencies

Use the lockfile-based install for a reproducible setup:

```bash
npm ci
```

Use `npm install` only when intentionally updating dependencies or when the lockfile needs to be regenerated:

```bash
npm install
```

No `.env` file is needed for the current prototype.

### 3. Start the development server

Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The development server provides hot reload while source files are edited.

## Useful routes

Public prototype routes:

- `/` - Home page
- `/products` - Product catalog
- `/promotions` - Promotions
- `/news` - Company news
- `/contact` - Inquiry form
- `/request-quotation` - Quotation request form

Admin prototype routes:

- `/admin/login` - Login preview; no credentials are checked
- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/inventory` - Inventory overview
- `/admin/quotations` - Quotation management
- `/admin/inquiries` - Inquiry management
- `/admin/promotions` - Promotion management
- `/admin/news` - News management
- `/admin/users` - User management

## Verify the installation

Run the project checks from the repository root:

```bash
npm run lint
npm run typecheck
npm run build
```

To preview the production build locally, start the production server after `npm run build` completes:

```bash
npm run start
```

Then open [http://localhost:3000](http://localhost:3000).

## Data and prototype behavior

Mock data is stored in `mock/` and `mock/data/`. The prototype does not connect to a backend, database, or API.

When reviewing the application, keep the following behavior in mind:

- Inquiry and quotation forms display a local completion state only.
- Admin create, edit, delete, and status interactions affect the current browser session only.
- The admin login page does not authenticate, store, or transmit credentials.
- Product image selection is preview-only; files are not uploaded or stored.
- Refreshing the page resets local prototype changes.

## Troubleshooting

### PowerShell blocks `npm`

On Windows, PowerShell execution-policy settings can block the `npm.ps1` shim. Use the Windows command shim instead:

```powershell
npm.cmd ci
npm.cmd run dev
```

The same `npm.cmd` form works for `lint`, `typecheck`, `build`, and `start`.

### Node.js is too old

Check the version:

```bash
node --version
```

Upgrade to Node.js 20.9.0 or newer, then reinstall dependencies with `npm ci`.

### Port 3000 is already in use

Start the development server on another port:

```bash
npm run dev -- --port 3001
```

Then open [http://localhost:3001](http://localhost:3001).

### The production server will not start

`npm run start` serves a production build and therefore requires a successful `npm run build` first. Run the build command again and resolve any reported lint, type, or compilation errors.

## Related documentation

- [Project overview](00_PROJECT_OVERVIEW.md)
- [Technology stack](01_TECH_STACK.md)
- [Folder structure](07_FOLDER_STRUCTURE.md)
- [Project scope](14_PROJECT_SCOPE.md)
