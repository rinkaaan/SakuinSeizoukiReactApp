import { Container, ContentLayout, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { ActionFunctionArgs, Form, useLoaderData, useRevalidator } from "react-router-dom"
import { SettingsService, TimeOut, TimeService } from "../../../openapi-client"
import CloudButton from "../../components/CloudButton.tsx"
import { commonSlice } from "../../slices/commonSlice.ts"
import { useEffect } from "react"
import { socket } from "../../common/clients.ts"

interface LoaderData {
  time: TimeOut
}

export async function loader(): Promise<LoaderData> {
  return {
    time: await TimeService.getTime(),
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get("action")
  if (action === "setup-dir") {
    await SettingsService.postSettingsAppDataDirectory()
  } else if (action === "clear-dir") {
    commonSlice.clearAppDataDirectory()
  }
  return null
}

export function Component() {
  const { time } = useLoaderData() as LoaderData
  const revalidator = useRevalidator()

  useEffect(() => {
    socket.on("app-data-directory", (data: string) => {
      console.log("socket app-data-directory")
      commonSlice.setAppDataDirectory(data)
      revalidator.revalidate()
    })

    return () => {
      socket.off("app-data-directory")
    }
  }, [revalidator])

  return (
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
            <p>{commonSlice.appDataDirectory}</p>
          </TextContent>
          <Form method="POST">
            <CloudButton formAction='submit'>Set app data directory</CloudButton>
            <input type="hidden" name="action" value="setup-dir"/>
          </Form>
          <Form method="POST">
            <CloudButton formAction='submit'>Clear app data directory</CloudButton>
            <input type="hidden" name="action" value="clear-dir"/>
          </Form>
        </SpaceBetween>
      </Container>
    </ContentLayout>
  )
}
