import { useMatches } from 'react-router-dom'
import CloudBreadcrumbGroup from '../../components/CloudBreadcrumbGroup.tsx'

export default function BreadCrumbs() {
  const matches = useMatches()
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumbs))
    .map((match) => match.handle.crumbs())

  const crumbs2 = crumbs.map((crumb) => {
    return {
      text: crumb.crumb,
      href: crumb.path,
    }
  })

  return (
    <CloudBreadcrumbGroup items={crumbs2} />
  )
}
