# Align Fabrics & Curtains — Invoice Web App

## Run locally

```bash
npm install
npm run dev
```

- Open the app at the printed local URL. A welcome animation appears, then the dashboard.

## Build & preview

```bash
npm run build
npm run preview
```

## Persistence

- Prototype uses browser localStorage (key: `align-invoices`) to persist invoices. It includes all invoice fields and timestamps.

## PDF export

- On the invoice view, use "Download PDF". It exports a single-page A4 PDF matching the on-screen layout. Filename format: `{InvoiceNumber}_{ClientName}.pdf`.

## Tests

```bash
npm run test
```

## Seeded data

- On first run, one sample invoice is seeded using the company details.

