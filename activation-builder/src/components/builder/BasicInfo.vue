<!-- components/BasicInfo.vue -->
<template>
  <q-expansion-item
    default-opened
    group="builder"
    icon="info"
    label="Basic Information!!"
    header-class="text-h5"
  >
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-6">
            <q-input
              v-model="info.id"
              type="number"
              label="Activation ID"
              :rules="[val => !!val || 'ID is required']"
              @update:model-value="emitUpdate"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="info.name"
              label="Name"
              :rules="[val => !!val || 'Name is required']"
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

const info = ref({
  id: props.modelValue.id,
  name: props.modelValue.name
})

watch(() => props.modelValue, (newVal) => {
  info.value = {
    id: newVal.id,
    name: newVal.name
  }
}, { deep: true })

const emitUpdate = () => {
  emit('update:modelValue', {
    id: info.value.id,
    name: info.value.name
  })
}
</script>
