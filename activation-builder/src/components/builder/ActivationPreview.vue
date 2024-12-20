<!-- components/ActivationPreview.vue -->
<template>
  <q-card class="q-sticky" style="top: 16px">
    <q-card-section>
      <div class="text-h5">Preview</div>
    </q-card-section>

    <q-card-section>
      <q-tabs
        v-model="activeTab"
        class="text-primary"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="json" label="JSON" />
        <q-tab name="preview" label="Activation Preview" />
        <q-tab name="details" label="Activation Details" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="json">
          <pre class="text-wrap">{{ JSON.stringify(activation, null, 2) }}</pre>
        </q-tab-panel>

        <q-tab-panel name="preview">
          <div
            class="preview-container"
            :style="{
              backgroundColor: activation.settings.preview.backgroundColor,
              opacity: activation.settings.preview.backgroundOpacity
            }"
          >
            <div class="text-white" :class="'text-' + activation.settings.preview.titleSize">
              {{ activation.settings.preview.title || 'Preview Title' }}
            </div>
            <div class="text-white" :class="'text-' + activation.settings.preview.subtitleSize">
              {{ activation.settings.preview.subtitle || 'Preview Subtitle' }}
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="details">
          <div v-for="(segment, index) in activation.template" :key="index" class="q-mb-md">
            <q-card bordered>
              <q-card-section>
                <div class="text-subtitle1">{{ segment.type }}</div>
                <div v-if="segment.content" class="q-mt-sm">
                  <strong>Content:</strong> {{ segment.content }}
                </div>
                <div v-if="segment.attributes" class="q-mt-sm">
                  <strong>Attributes:</strong>
                  <pre>{{ JSON.stringify(segment.attributes, null, 2) }}</pre>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  activation: {
    type: Object,
    required: true
  }
})

const activeTab = ref('json')
</script>

<style lang="scss" scoped>
.text-wrap {
  white-space: pre-wrap;
  word-break: break-word;
}

.preview-container {
  padding: 1rem;
  border-radius: 8px;
  min-height: 100px;
}

.q-tab-panel {
  max-height: 500px;
  overflow-y: auto;
}
</style>
