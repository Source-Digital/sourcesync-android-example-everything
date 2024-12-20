<!-- components/TimeWindows.vue -->
<template>
  <q-expansion-item
    default-opened
    group="builder"
    icon="schedule"
    label="Time Windows"
    header-class="text-h5"
  >
    <q-card>
      <q-card-section>
        <div v-for="(instance, index) in instances" :key="index" class="q-mb-md">
          <q-card bordered>
            <q-card-section>
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-5">
                  <q-input
                    v-model.number="instance.when.start"
                    type="number"
                    label="Start Time (ms)"
                    @update:model-value="emitUpdate"
                  />
                </div>
                <div class="col-12 col-sm-5">
                  <q-input
                    v-model.number="instance.when.end"
                    type="number"
                    label="End Time (ms)"
                    @update:model-value="emitUpdate"
                  />
                </div>
                <div class="col-12 col-sm-2">
                  <q-btn
                    flat
                    color="negative"
                    icon="delete"
                    @click="removeWindow(index)"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-btn
          color="primary"
          label="Add Time Window"
          @click="addWindow"
          class="q-mt-sm"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const instances = ref([...props.modelValue])

watch(() => props.modelValue, (newVal) => {
  instances.value = [...newVal]
}, { deep: true })

const emitUpdate = () => {
  emit('update:modelValue', [...instances.value])
}

const addWindow = () => {
  instances.value.push({
    when: {
      start: 0,
      end: 5000
    },
    settings: {}
  })
  emitUpdate()
}

const removeWindow = (index) => {
  instances.value.splice(index, 1)
  emitUpdate()
}
</script>
