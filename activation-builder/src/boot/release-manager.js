// src/boot/release-manager.js
import { boot } from 'quasar/wrappers'
import {
  updateReleaseSettings,
  checkForNewRelease,
  showNewReleaseDialog
} from 'src/utils/releaseManager'

export default boot(async ({ app }) => {
  try {
    // Initial fetch of releases and schema
    const settings = await updateReleaseSettings()

    // Make settings globally available
    app.config.globalProperties.$settings = settings

    // Check for new releases and show dialog if available
    if (checkForNewRelease()) {
      // Pass the dialog method from Quasar
      showNewReleaseDialog(app.config.globalProperties.$q.dialog)
      //showNewReleaseDialog(Dialog)
    }
  } catch (error) {
    console.error('Failed to initialize release settings', error)
  }

  // Add a global method to refresh releases
  app.config.globalProperties.$tools = {
    refreshReleases: async () => {
      const settings = await updateReleaseSettings(undefined, true)
      return settings
      }
    }
  }
)
