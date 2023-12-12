import { Link, LinkProps } from '@cloudscape-design/components'
import { useNavigate } from 'react-router-dom'

export default function CloudLink(props: LinkProps) {
  const navigate = useNavigate()

  return (
    <Link
      {...props}
      onFollow={e => {
        e.preventDefault()
        const { detail } = e
        if (!detail.href) return
        navigate(detail.href)
      }}
    />
  )
}
