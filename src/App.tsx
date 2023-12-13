import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import StepsLayout from './routes/steps/StepsLayout'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Outlet,
    children: [
      {
        path: '/',
        Component: StepsLayout,
        handle: {
          crumbs: () => {
            return {
              crumb: 'Home',
              path: '/home',
            }
          },
        },
        children: [
          {
            path: '/steps',
            lazy: () => import('./routes/steps/StepsRoute.js'),
            handle: {
              crumbs: () => {
                return {
                  crumb: 'Steps',
                  title: 'Steps',
                }
              }
            },
          },
          {
            path: '/home',
            lazy: () => import('./routes/welcome/WelcomeRoute'),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: () => <Navigate to='/home' replace/>,
  },
])

export default function App() {
  return <RouterProvider router={router}/>
}
