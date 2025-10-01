import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import { Welcome } from './screens/Welcome'
import { Dashboard } from './screens/Dashboard'
import { InvoiceEditor } from './screens/InvoiceEditor'
import { InvoiceView } from './screens/InvoiceView'
import { AppBootstrap } from './AppBootstrap'

const router = createBrowserRouter([
  { path: '/', element: <Welcome /> },
  { path: '/invoices', element: <Dashboard /> },
  { path: '/invoices/new', element: <InvoiceEditor mode="create" /> },
  { path: '/invoices/:id/edit', element: <InvoiceEditor mode="edit" /> },
  { path: '/invoices/:id', element: <InvoiceView /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppBootstrap />
    <RouterProvider router={router} />
  </React.StrictMode>
)

