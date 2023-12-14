import { Container, ContentLayout, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { Form, useLoaderData } from "react-router-dom"
import { BookIndexService, TimeOut, TimeService } from "../../../openapi-client"
import CloudButton from "../../components/CloudButton.tsx"

interface LoaderData {
  time: TimeOut
}

export async function loader(): Promise<LoaderData> {
  return {
    time: await TimeService.getTime(),
  }
}

export async function action() {
  await BookIndexService.getBookIndex()
  return null
}

export function Component() {
  const { time } = useLoaderData() as LoaderData

  return (
    <Form method='POST'>
      <ContentLayout
        header={
          <Header variant='h1'>Settings</Header>
        }
      >
        <Container
          header={<Header variant='h2'>Introduction</Header>}
        >
          <SpaceBetween size='s'>
            <TextContent>
              <p>The current time is {time.time}</p>
            </TextContent>
            <CloudButton formAction='submit'>Set app data directory</CloudButton>
          </SpaceBetween>
        </Container>
      </ContentLayout>
    </Form>
  )
}
