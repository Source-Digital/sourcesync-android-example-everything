<template>
  <router-link
    to="/"
    class="orientation-progress"
    v-if="progress.completed < progress.total"
  >
    <q-tooltip>
      Remaining steps: {{ progress.remaining.join(', ') }}
    </q-tooltip>

    <q-linear-progress
      :value="progress.percentage / 100"
      class="q-mt-none"
      rounded
      size="4px"
      :color="progressColor"
    >
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="primary" :label="`${progress.completed}/${progress.total} Steps Complete`" />
      </div>
    </q-linear-progress>
  </router-link>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { orientationService } from 'src/utils/orientationService'
import { useRoute } from 'vue-router'

const route = useRoute()
const progress = ref(orientationService.getProgress())

// Update progress when route changes
watch(() => route.path, () => {
  progress.value = orientationService.getProgress()
})

const progressColor = computed(() => {
  const percentage = progress.value.percentage
  if (percentage < 33) return 'negative'
  if (percentage < 66) return 'warning'
  return 'positive'
})

// Update progress initially
onMounted(() => {
  progress.value = orientationService.getProgress()
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
