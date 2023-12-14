import { AppLayout, SideNavigation } from "@cloudscape-design/components"
import { Navigate, Outlet, useLocation, useMatches, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import CloudBreadcrumbGroup from "../components/CloudBreadcrumbGroup"
import { commonSlice } from "../slices/commonSlice.ts"

const items = [
  {
    type: "link",
    text: "Projects",
    href: "/projects/all",
  },
  {
    type: "link",
    text: "Settings",
    href: "/settings",
  },
]

export function BreadCrumbs() {
  const matches = useMatches()
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumbs))
    .map((match) => match.handle.crumbs())
    .map((crumb) => {
      return {
        text: crumb.crumb,
        href: crumb.path,
      }
    })

  const showCrumbs = crumbs.length > 1

  return (
    <div style={{ opacity: showCrumbs ? 1 : 0, pointerEvents: showCrumbs ? "auto" : "none" }}>
      <CloudBreadcrumbGroup items={crumbs}/>
    </div>
  )
}
export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const matches = useMatches()
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumbs))
    .map((match) => match.handle.crumbs())
  const [activeHref, setActiveHref] = useState()
  const [navigationOpen, setNavigationOpen] = useState(commonSlice.navigationOpen)

  useEffect(() => {
    // Go from last to first crumb, set activeHref to the first one that matches items
    for (const crumb of crumbs.reverse()) {
      if (crumb.path == null) continue
      if (items.find(item => item.href === crumb.path)) {
        setActiveHref(crumb.path)
        break
      }
    }
  }, [crumbs])

  if (["/", "/projects"].includes(location.pathname)) {
    return <Navigate to='/pets/all' replace={true} />
  } else {
    return (
      <AppLayout
        navigation={
          <SideNavigation
            header={{
              text: "索引製造機",
              href: "/pets/all-projects",
            }}
            onFollow={e => {
              e.preventDefault()
              navigate(e.detail.href)
            }}
            activeHref={activeHref}
            items={items}
          />
        }
        navigationOpen={navigationOpen}
        onNavigationChange={(e) => {
          setNavigationOpen(e.detail.open)
          commonSlice.navigationOpen = e.detail.open
        }}
        content={<Outlet/>}
        breadcrumbs={<BreadCrumbs/>}
        toolsHide
      />
    )

  }
}
