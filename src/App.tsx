import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import WizardLayout from './routes/wizard/WizardLayout'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Outlet,
    children: [
      {
        path: '/',
        Component: WizardLayout,
        handle: {
          crumbs: () => {
            return {
              crumb: 'Wizard',
              title: 'Wizard',
              path: '/wizard',
            }
          },
        },
        children: [
          {
            path: '/wizard',
            lazy: () => import('./routes/wizard/WizardRoute.jsx'),
          },
        ],
      },
    ],

  },
  {
    path: '*',
    Component: () => <Navigate to='/wizard' replace/>,
  },
])

export default function App() {
  return <RouterProvider router={router}/>
}
