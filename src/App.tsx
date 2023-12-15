import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import MainLayout from "./routes/MainLayout.jsx"
import { commonSlice } from "./slices/commonSlice.ts"
import { OpenAPI } from "../openapi-client"

OpenAPI.BASE = "http://127.0.0.1:34200"

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: MainLayout,
    loader: async () => {
      await commonSlice.initAppDataDirectory()
      return null
    },
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
