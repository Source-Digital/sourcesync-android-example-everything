<template>
  <router-link
    to="/"
    class="orientation-progress"
    v-if="getCompletedCount() < getTotalCount()"
  >
    <q-tooltip>
      Remaining steps: {{ getRemainingSteps().join(', ') }}
    </q-tooltip>

    <q-linear-progress
      :value="getProgress()"
      class="q-mt-none"
      rounded
      size="20px"
      :color="progressColor"
    >
      <div class="absolute-full flex flex-center">
        <q-badge
          color="white"
          text-color="primary"
          :label="`${getCompletedCount()}/${getTotalCount()} Steps Complete`"
        />
      </div>
    </q-linear-progress>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { orientationState, orientationService } from 'src/utils/orientationService'
import orientationSteps from 'src/data/orientation.json'

// Make sure we have a valid state
if (!orientationState.value) {
  orientationService.getOrientationState()
}

// Helper functions that use the reactive orientationState
const getCompletedCount = () => {
  return Object.values(orientationState.value || {}).filter(s => s.completed).length
}

const getTotalCount = () => {
  return Object.keys(orientationSteps).length
}

const getProgress = () => {
  return getCompletedCount() / getTotalCount()
}

const getRemainingSteps = () => {
  return Object.entries(orientationSteps)
    .filter(([key]) => !orientationState.value?.[key]?.completed)
    .map(([, step]) => step.title)
}

const progressColor = computed(() => {
  const percentage = getProgress() * 100
  if (percentage < 33) return 'negative'
  if (percentage < 66) return 'warning'
  return 'positive'
})
</script>

<style lang="scss" scoped>
.orientation-progress {
  display: block;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}
</style>
