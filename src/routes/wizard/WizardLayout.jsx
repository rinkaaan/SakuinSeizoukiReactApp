import { AppLayout } from '@cloudscape-design/components'
import { Outlet } from 'react-router-dom'
import Breadcrumbs from './BreadCrumbs.jsx'


export default function WizardLayout() {
  return (
    <AppLayout
      navigationHide
      content={<Outlet/>}
      breadcrumbs={<Breadcrumbs/>}
      toolsHide
    />
  )
}
