<!-- components/PreviewSettings.vue -->
<template>
  <q-expansion-item
    default-opened
    group="builder"
    icon="settings"
    label="Preview Settings"
    header-class="text-h5"
  >
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-6">
            <q-input
              v-model="settings.title"
              label="Preview Title"
              @update:model-value="emitUpdate"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="settings.subtitle"
              label="Preview Subtitle"
              @update:model-value="emitUpdate"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-select
              v-model="settings.titleSize"
              :options="sizeOptions"
              label="Title Size"
              @update:model-value="emitUpdate"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-select
              v-model="settings.subtitleSize"
              :options="sizeOptions"
              label="Subtitle Size"
              @update:model-value="emitUpdate"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="settings.backgroundColor"
              label="Background Color"
              type="color"
              @update:model-value="emitUpdate"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model.number="settings.backgroundOpacity"
              label="Background Opacity"
              type="number"
              min="0"
              max="1"
              step="0.1"
              @update:model-value="emitUpdate"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const sizeOptions = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']

const settings = ref({ ...props.modelValue })

watch(() => props.modelValue, (newVal) => {
  settings.value = { ...newVal }
}, { deep: true })

const emitUpdate = () => {
  emit('update:modelValue', { ...settings.value })
}
</script>
