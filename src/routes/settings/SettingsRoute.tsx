import { Alert, Container, ContentLayout, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { ActionFunctionArgs, Form, useRevalidator } from "react-router-dom"
import { SettingsService } from "../../../openapi-client"
import CloudButton from "../../components/CloudButton.tsx"
import { commonSlice } from "../../slices/commonSlice.ts"
import { useEffect } from "react"
import { socket } from "../../common/clients.ts"

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get("action")
  if (action === "setup-dir") {
    await SettingsService.postSettingsAppDataDirectory()
  }
  return null
}

export function Component() {
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
        <Header variant="h1">Settings</Header>
      }
    >
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">App Data Directory</Header>}>
          <SpaceBetween size="s">
            {commonSlice.appDataDirectory ? (
              <Alert type="success">
                App data directory is set to <b>{commonSlice.appDataDirectory}</b>.
              </Alert>
            ) : (
              <Alert type="warning">
                The app data directory needs to be set before you can use the application. Click the button below to select a folder.
              </Alert>
            )}
            <Form method="POST">
              <CloudButton formAction="submit">{commonSlice.appDataDirectory ? "Change" : "Set"} app data directory</CloudButton>
              <input type="hidden" name="action" value="setup-dir"/>
            </Form>
          </SpaceBetween>
        </Container>
        <Container header={<Header variant="h2">About</Header>}>
          <TextContent>
            <p>Version 0.1.0</p>
          </TextContent>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  )
}
