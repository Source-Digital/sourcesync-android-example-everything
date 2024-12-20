import { boot } from 'quasar/wrappers'
import { orientationService, orientationState } from 'src/utils/orientationService'
import { Notify } from 'quasar'

export default boot(({ app }) => {
  // Make orientation state globally available
  app.config.globalProperties.$orientation = orientationState

  // Add orientation methods to global $tools
  app.config.globalProperties.$tools = {
    ...app.config.globalProperties.$tools,
    markOrientationComplete(stepId) {
      const step = orientationService.markStepComplete(stepId)
      if (step) {
        Notify.create({
          type: 'positive',
          message: step.successMessage,
          caption: `Earned badge: ${step.badge}`,
          icon: 'emoji_events',
          position: 'top',
          timeout: 5000,
          actions: [{ label: 'Dismiss', color: 'white' }]
        })
      }
    },
    resetOrientation() {
      orientationService.resetOrientation()
      Notify.create({
        type: 'info',
        message: 'Orientation progress has been reset',
        position: 'bottom'
      })
    }
  }

  // Initialize orientation state
  orientationService.getOrientationState()
})
