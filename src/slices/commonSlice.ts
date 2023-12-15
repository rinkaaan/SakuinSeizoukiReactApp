import { FlashbarProps } from "@cloudscape-design/components"

export interface CommonSlice {
  navigationOpen: boolean;
  appDataDirectory: string | null;
  notifications: Array<FlashbarProps.MessageDefinition>;

  setAppDataDirectory(directory: string): void;
  clearAppDataDirectory(): void;
  addNotification(message: FlashbarProps.MessageDefinition): void;
  removeNotification(id: string): void;
}

export const commonSlice: CommonSlice = {
  navigationOpen: true,
  appDataDirectory: localStorage.getItem("app-data-directory"),
  notifications: [],

  setAppDataDirectory(directory: string) {
    localStorage.setItem("app-data-directory", directory)
    commonSlice.appDataDirectory = directory
  },
  clearAppDataDirectory() {
    localStorage.removeItem("app-data-directory")
    commonSlice.appDataDirectory = null
  },
  addNotification(message: FlashbarProps.MessageDefinition) {
    commonSlice.notifications.push(message)
  },
  removeNotification(id: string) {
    commonSlice.notifications = commonSlice.notifications.filter(n => n.id !== id)
  }
}
