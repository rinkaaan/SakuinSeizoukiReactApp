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
              crumb: 'Home',
              path: '/',
            }
          },
        },
        children: [
          {
            path: '/wizard',
            lazy: () => import('./routes/wizard/WizardRoute.jsx'),
          },
          {
            path: '/welcome',
            lazy: () => import('./routes/welcome/WelcomeRoute'),
          },
        ],
      },
    ],

  },
  {
    path: '*',
    Component: () => <Navigate to='/welcome' replace/>,
  },
])

export default function App() {
  return <RouterProvider router={router}/>
}
