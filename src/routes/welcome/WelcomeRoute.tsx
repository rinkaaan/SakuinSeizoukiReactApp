import { Container, ContentLayout, Header, SpaceBetween, TextContent } from '@cloudscape-design/components'
import { useLoaderData } from 'react-router-dom'
import { TimeOut, TimeService } from '../../../openapi-client'
import CloudLink from '../../components/CloudLink.tsx'

interface LoaderData {
  time: TimeOut
}

export async function loader(): Promise<LoaderData> {
  return {
    time: await TimeService.getTime(),
  }
}

export function Component() {
  const { time } = useLoaderData() as LoaderData

  return (
    <ContentLayout
      header={
        <Header variant='h1'>Welcome to 索引製造機</Header>
      }
    >
      <Container
        header={<Header variant='h2'>Introduction</Header>}
      >
        <SpaceBetween size='s'>
          <TextContent>
            <p>The current time is {time.time}</p>
          </TextContent>
          <CloudLink href='/wizard'>Get started</CloudLink>
        </SpaceBetween>
      </Container>
    </ContentLayout>
  )
}
