import { AppLayout } from '@cloudscape-design/components'
import { Navigate, Outlet } from 'react-router-dom'
import Breadcrumbs from './BreadCrumbs.jsx'
import { useLocation } from 'react-router'


export default function StepsLayout() {
  const location = useLocation()

  if (location.pathname === '/') {
    return <Navigate to="/welcome" />
  } else {
    return (
      <AppLayout
        navigationHide
        content={<Outlet/>}
        breadcrumbs={<Breadcrumbs/>}
        toolsHide
      />
    )
  }
}
