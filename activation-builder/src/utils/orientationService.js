import { LocalStorage } from 'quasar'
import orientationSteps from '../data/orientation.json'
import { ref } from 'vue'

// Create a reactive state that can be shared across components
export const orientationState = ref(null)

const STORAGE_KEY = 'sourcesync_orientation'

export const orientationService = {
  getOrientationState() {
    const state = LocalStorage.getItem(STORAGE_KEY) || this.initializeOrientation()
    orientationState.value = state
    return state
  },

  initializeOrientation() {
    const initialState = {}
    Object.keys(orientationSteps).forEach(key => {
      initialState[key] = {
        completed: false,
        completedAt: null
      }
    })
    LocalStorage.set(STORAGE_KEY, initialState)
    orientationState.value = initialState
    return initialState
  },

  markStepComplete(stepId) {
    const state = this.getOrientationState()
    if (state[stepId] && !state[stepId].completed) {
      state[stepId] = {
        completed: true,
        completedAt: new Date().toISOString()
      }
      LocalStorage.set(STORAGE_KEY, state)
      orientationState.value = { ...state }
      return orientationSteps[stepId]
    }
    return null
  },

  resetOrientation() {
    const state = this.initializeOrientation()
    orientationState.value = { ...state }
    return state
  },

  getProgress() {
    const state = this.getOrientationState()
    const total = Object.keys(orientationSteps).length
    const completed = Object.values(state).filter(s => s.completed).length
    return {
      completed,
      total,
      percentage: (completed / total) * 100,
      remaining: this.getRemainingSteps(state)
    }
  },

  getRemainingSteps(state) {
    return Object.entries(orientationSteps)
      .filter(([key]) => !state[key]?.completed)
      .map(([, step]) => step.title)
  }
}
