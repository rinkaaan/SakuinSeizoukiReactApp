import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import MainLayout from "./routes/MainLayout.jsx"

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "projects",
        Component: Outlet,
        handle: createCrumb("Projects", "/projects/all"),
        children: [
          {
            path: "new",
            lazy: () => import("./routes/projects/new-project/NewProjectRoute.js"),
            handle: createCrumb("New Project", "/projects/new-project"),
          },
          {
            path: "all",
            lazy: () => import("./routes/projects/all-projects/AllProjectsRoute.tsx"),
          },
        ],
      },
      {
        path: "settings",
        lazy: () => import("./routes/settings/SettingsRoute.tsx"),
        handle: createCrumb("Settings", "/settings"),
      }
    ],
  },
  {
    path: "*",
    Component: () => <Navigate to='/projects/all' replace/>,
  },
])

function createCrumb(crumb: string, path: string) {
  return {
    crumbs: () => {
      return {
        crumb,
        path,
      }
    }
  }
}

export default function App() {
  return <RouterProvider router={router}/>
}
