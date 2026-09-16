# KQ Emporium

KQ Emporium is a Next.js frontend prototype for an industrial-products business website and administration portal.

The application currently supports:

- Product browsing, search, category filtering, pagination, and product details
- Promotions and company news pages
- Customer inquiry and quotation-request forms
- Admin dashboard, product, inventory, quotation, inquiry, promotion, news, and user management views
- Responsive layouts, loading states, error states, empty states, charts, tables, dialogs, and status indicators

## Project status

This repository contains a frontend MVP prototype for client review. It is not connected to a backend, database, or external API.

- Data is loaded from `mock/` and `mock/data/`.
- Form submissions use local prototype handlers and are not sent to a server.
- Admin changes are held in local component state and reset when the page is refreshed.
- The admin login is a visual preview only; credentials are not checked, stored, or transmitted.
- Product image selection is preview-only; files are not uploaded or stored.

Backend integration, authentication, persistence, email, PDF generation, file storage, payments, and deployment are planned for a later phase.

## Technology stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS and shadcn/ui-style components
- React Hook Form
- Framer Motion
- Lucide icons
- Recharts

## Requirements

- Node.js 20.9.0 or newer
- npm
- A modern web browser

No environment variables or external services are required for the current prototype.

## Getting started

Install dependencies from the repository root:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows, use `npm.cmd` instead of `npm` if PowerShell blocks the npm shim, for example:

```powershell
npm.cmd run dev
```

## Available scripts

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run typecheck # Run TypeScript checks
npm run build     # Create a production build
npm run start     # Serve the production build
```

To verify the project before a review or handoff:

```bash
npm run lint
npm run typecheck
npm run build
```

## Routes

### Public website

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/products` | Product catalog |
| `/products/[slug]` | Product details |
| `/promotions` | Promotions |
| `/news` | Company news |
| `/contact` | Inquiry form and contact information |
| `/request-quotation` | Quotation request form |

### Admin portal

| Route | Purpose |
| --- | --- |
| `/admin/login` | Login preview |
| `/admin` | Dashboard |
| `/admin/products` | Product management |
| `/admin/inventory` | Inventory overview |
| `/admin/quotations` | Quotation management |
| `/admin/inquiries` | Inquiry management |
| `/admin/promotions` | Promotion management |
| `/admin/news` | News management |
| `/admin/users` | User management |

## Repository structure

```text
app/         Next.js routes and layouts
components/  Shared public, admin, and UI components
docs/        Project, design, scope, and setup documentation
mock/        Mock repositories and JSON data
public/      Static assets, including product images
types/       Shared TypeScript types
lib/         Shared utilities
features/    Feature-oriented extension point
hooks/       Custom React hooks
styles/      Styling extension point
utils/       Utility extension point
```

## Documentation

- [Installation guide](docs/15_INSTALLATION_GUIDE.md)
- [Project overview](docs/00_PROJECT_OVERVIEW.md)
- [Technology stack](docs/01_TECH_STACK.md)
- [Public website](docs/03_PUBLIC_WEBSITE.md)
- [Admin portal](docs/04_ADMIN_PORTAL.md)
- [Project scope and roadmap boundaries](docs/14_PROJECT_SCOPE.md)
