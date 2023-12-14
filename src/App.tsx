import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import MainLayout from "./routes/MainLayout"
import { useEffect } from "react"
import { io } from "socket.io-client"
import Cookies from "js-cookie"

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
            Component: Outlet,
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
  useEffect(() => {
    const socket = io("http://127.0.0.1:34200")
    socket.on("connect", () => {
      console.log("connected")
    })

    socket.on("app-data-directory", (data: string) => {
      console.log(data)
      Cookies.set("app-data-directory", data, { expires: 365 })
    })
  },[])

  return <RouterProvider router={router}/>
}
