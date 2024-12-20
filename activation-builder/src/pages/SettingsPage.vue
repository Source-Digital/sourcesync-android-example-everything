<template>
  <q-page padding>

            <!-- Release Selection -->
            <q-select
          v-model="selectedRelease"
          :options="releaseOptions"
          option-label="label"
          option-value="value"
          label="Select a Release"
          outlined
          @input="handleSelection"
        >
          <template v-slot:selected-item="scope">
            <span>{{ scope.opt.label }}</span>
          </template>
        </q-select>

      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="settings" label="Settings" />
        <q-tab name="schema" label="Schema" />
        <q-tab name="templates" label="Templates" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="settings">
          <div class="text-h6">Configuration</div>
          <div class="text">Here are the default settings applied to your application</div>
          <pre class="config-pre q-mt-md">{{ JSON.stringify($settings?.config || {}, null, 2) }}</pre>
          <div class="text-right q-mt-md">
            <q-btn
              color="primary"
              label="Export Settings"
              @click="exportSettings"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="schema">
          <div class="text-h6">JSON Schema</div>
          <div class="text">Here are the default settings applied to your application</div>
          <pre class="config-pre q-mt-md">{{ JSON.stringify($settings?.schema || {}, null, 2) }}</pre>
          <div class="text-right q-mt-md">
            <q-btn
              color="primary"
              label="Export Schema"
              @click="exportSchema"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="templates">
          <div class="text-h6">Templates</div>
          <div class="text-subtitle1 q-mt-md">Coming soon...</div>
        </q-tab-panel>
      </q-tab-panels>
  </q-page>
</template>

<script setup>
  import { ref, computed, getCurrentInstance } from 'vue'
  const { appContext } = getCurrentInstance();
  const $settings = appContext.config.globalProperties.$settings;

  const tab = ref('settings')

  function downloadJson(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  function exportSettings() {
    if ($settings?.config) downloadJson($settings.config, 'settings.json')
  }

  function exportSchema() {
    if ($settings?.schema) downloadJson($settings.schema, 'schema.json')
  }

  // Selected release
  const selectedRelease = ref(null)

  // Process $settings for dropdown options
  const releaseOptions = computed(() => {
    if (!$settings?.releases) return []
    return $settings.releases.map((release) => ({
      label: release.name,
      value: release.tag_name,
      data: release,
    }))
  })

  // Handle selection
  const handleSelection = (tagName) => {
    const selected = $settings.releases.find(release => release.tag_name === tagName)
    if (selected) {
      console.log('Selected Release:', selected)
      // Add custom logic here
    }
  }
</script>

<style lang="scss">
  .config-pre {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }
</style>
