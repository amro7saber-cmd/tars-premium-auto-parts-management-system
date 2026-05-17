import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { InventoryPage } from '@/pages/InventoryPage'
import { POSPage } from '@/pages/POSPage'
import { VehiclesPage } from '@/pages/VehiclesPage'
import { SuppliersPage } from '@/pages/SuppliersPage'
import { AppLayout } from '@/components/layout/AppLayout'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout><HomePage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/inventory",
    element: <AppLayout><InventoryPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/pos",
    element: <AppLayout><POSPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/vehicles",
    element: <AppLayout><VehiclesPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/suppliers",
    element: <AppLayout><SuppliersPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)