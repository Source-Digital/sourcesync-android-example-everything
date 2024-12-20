<!-- components/TemplateBuilder.vue -->
<template>
  <div class="template-builder">
    <div v-for="(segment, index) in segments" :key="index" class="q-mb-sm">
      <q-card bordered>
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-4">
              <q-select
                v-model="segment.type"
                :options="segmentTypes"
                label="Segment Type"
                @update:model-value="updateSegment(index)"
              />
            </div>

            <div class="col-12 col-sm-6">
              <q-input
                v-if="['text', 'button'].includes(segment.type)"
                v-model="segment.content"
                label="Content"
              />
              <q-input
                v-if="segment.type === 'image'"
                v-model="segment.content"
                label="Image URL"
              />
            </div>

            <div class="col-12 col-sm-2">
              <q-btn
                flat
                color="negative"
                icon="delete"
                @click="removeSegment(index)"
              />
            </div>
          </div>

          <!-- Attributes Section -->
          <div class="row q-col-gutter-sm q-mt-sm">
            <template v-if="segment.attributes">
              <!-- Common attributes -->
              <div class="col-12 col-sm-4" v-if="['text', 'button'].includes(segment.type)">
                <q-select
                  v-model="segment.attributes.size"
                  :options="sizeOptions"
                  label="Size"
                />
              </div>

              <div class="col-12 col-sm-4" v-if="['text', 'button'].includes(segment.type)">
                <q-input
                  v-model="segment.attributes.color"
                  label="Text Color"
                  type="color"
                />
              </div>

              <!-- Text-specific attributes -->
              <template v-if="segment.type === 'text'">
                <div class="col-12 col-sm-4">
                  <q-select
                    v-model="segment.attributes.weight"
                    :options="['normal', 'bold']"
                    label="Font Weight"
                  />
                </div>
                <div class="col-12 col-sm-4">
                  <q-select
                    v-model="segment.attributes.style"
                    :options="['normal', 'italic']"
                    label="Font Style"
                  />
                </div>
              </template>

              <!-- Layout attributes -->
              <div class="col-12 col-sm-4">
                <q-select
                  v-model="segment.attributes.alignment"
                  :options="alignmentOptions"
                  label="Alignment"
                />
              </div>
            </template>
          </div>

          <!-- Nested segments for row/column -->
          <template v-if="['row', 'column'].includes(segment.type) && segment.children">
            <div class="q-pl-md q-mt-md">
              <template-builder
                v-model="segment.children"
                :nested="true"
              />
            </div>
          </template>
        </q-card-section>
      </q-card>
    </div>

    <q-btn
      color="primary"
      :label="nested ? 'Add Nested Segment' : 'Add Segment'"
      @click="addSegment"
      class="q-mt-sm"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  nested: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const segments = ref(props.modelValue)

// Options for dropdowns
const segmentTypes = ['text', 'image', 'button', 'row', 'column']
const sizeOptions = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const alignmentOptions = ['left', 'center', 'right']

// Sync with parent
watch(segments, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

watch(() => props.modelValue, (newValue) => {
  segments.value = newValue
}, { deep: true })

// Segment management
const addSegment = () => {
  segments.value.push({
    type: 'text',
    content: '',
    attributes: {
      size: 'md',
      color: '#FFFFFF',
      alignment: 'left'
    }
  })
}

const removeSegment = (index) => {
  segments.value.splice(index, 1)
}

const updateSegment = (index) => {
  const segment = segments.value[index]

  // Reset attributes based on type
  if (['row', 'column'].includes(segment.type)) {
    segment.children = []
    delete segment.content
  } else {
    delete segment.children
    segment.content = ''
  }

  // Ensure attributes exist
  if (!segment.attributes) {
    segment.attributes = {}
  }
}
</script>
