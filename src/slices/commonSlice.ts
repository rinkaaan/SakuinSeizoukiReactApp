export interface CommonSlice {
  navigationOpen: boolean;
  appDataDirectory: string | null;
  setAppDataDirectory(directory: string): void;
  clearAppDataDirectory(): void;
}

export const commonSlice: CommonSlice = {
  navigationOpen: true,
  appDataDirectory: localStorage.getItem("app-data-directory"),
  setAppDataDirectory(directory: string) {
    localStorage.setItem("app-data-directory", directory)
    commonSlice.appDataDirectory = directory
  },
  clearAppDataDirectory() {
    localStorage.removeItem("app-data-directory")
    commonSlice.appDataDirectory = null
  }
}
