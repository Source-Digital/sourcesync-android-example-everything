<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Left Column - Form -->
      <div class="col-12 col-md-8">

        <q-card>
          <q-card-section>
            <div class="text-h4">Activation Builder</div>
          </q-card-section>

          <q-card-section>
            <!-- Basic Info -->
            <BasicInfo v-model="basicInfo" @update:model-value="updateBasicInfo" />

            <!-- Preview Settings -->
            <PreviewSettings
              v-model="activation.settings.preview"
              @update:model-value="updatePreviewSettings"
            />

            <!-- Time Windows -->
            <TimeWindows
              v-model="activation.instances"
              @update:model-value="updateTimeWindows"
            />

            <!-- Template Builder -->
            <q-expansion-item
              default-opened
              group="builder"
              icon="code"
              label="Template"
              header-class="text-h5"
            >
              <q-card>
                <q-card-section>
                  <TemplateBuilder
                    v-model="activation.template"
                    @update:model-value="updateTemplate"
                  />
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              color="primary"
              label="Generate JSON"
              @click="generateJson"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Right Column - Preview -->
      <div class="col-12 col-md-4">
        <activation-preview :activation="activation" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from 'vue'
import PreviewSettings from '../components/builder/PreviewSettings.vue'
import BasicInfo from '../components/builder/BasicInfo.vue'
import TimeWindows from '../components/builder/TimeWindows.vue'
import TemplateBuilder from '../components/builder/TemplateBuilder.vue'
import ActivationPreview from '../components/builder/ActivationPreview.vue'

const { appContext } = getCurrentInstance();
const $tools = appContext.config.globalProperties.$tools;

// Initialize activation structure
const activation = ref({
  id: null,
  name: '',
  settings: {
    preview: {
      title: '',
      subtitle: '',
      titleSize: 'lg',
      subtitleSize: 'md',
      backgroundColor: '#000000',
      backgroundOpacity: 0.66,
      showImage: true,
      showFomo: true,
      backgroundAppearance: 'imageAndText'
    }
  },
  template: [],
  instances: []
})

// Basic info state
const basicInfo = ref({
  id: activation.value.id,
  name: activation.value.name
})

// Watch for basic info changes to sync with activation
watch(basicInfo, (newVal) => {
  activation.value.id = newVal.id
  activation.value.name = newVal.name
}, { deep: true })

// Update handlers for each component
const updateBasicInfo = (newVal) => {
  basicInfo.value = { ...newVal }
}

const updatePreviewSettings = (newVal) => {
  activation.value.settings.preview = { ...newVal }
}

const updateTimeWindows = (newVal) => {
  activation.value.instances = [...newVal]
}

const updateTemplate = (newVal) => {
  activation.value.template = [...newVal]
}

// Generate final JSON
const generateJson = () => {
  console.log('Generated Activation:', JSON.stringify(activation.value, null, 2))
  $tools.markOrientationComplete('buildActivation')
}

</script>
