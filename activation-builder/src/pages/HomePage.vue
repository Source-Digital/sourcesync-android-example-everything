<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <!-- Welcome Section -->
      <div class="col-12">
        <q-card class="welcome-card">
          <q-card-section>
            <div class="text-h3">Welcome to SourceSync</div>
            <div class="text-subtitle1 q-mt-md">
              Build dynamic, synchronized overlays for your video content with ease.
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="placeholder-media q-my-md">
              <div class="text-center text-grey-7">
                [Video placeholder: Short demo showing overlays being added to video content,
                transitioning between preview/detail modes]
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Quick Start -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h5">Quick Start</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-list>
              <q-item
                v-for="(step, id) in orientationSteps"
                :key="id"
                :to="step.route"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon
                    :name="step.icon"
                    :color="getCompletionStatus(id) ? 'positive' : 'primary'"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ step.step }}. {{ step.title }}</q-item-label>
                  <q-item-label caption>{{ step.description }}</q-item-label>
                </q-item-section>
                <q-item-section side v-if="getCompletionStatus(id)">
                  <q-icon name="check" color="positive" />
                </q-item-section>
              </q-item>
            </q-list>

            <div class="text-center q-mt-lg">
              <q-btn
                flat
                color="grey"
                label="Reset Orientation Progress"
                @click="handleReset"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Key Features -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h5">Key Features</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <div class="placeholder-media q-mb-sm">
                  <div class="text-center text-grey-7">
                    [Image: Multiple overlay positions diagram]
                  </div>
                </div>
                <div class="text-subtitle2">Multiple Overlay Positions</div>
                <div class="text-caption">
                  Support for default "top", "bottom", "left", and "right" overlay positions (and anything custom you want) with independent content streams
                </div>
              </div>

              <div class="col-12">
                <div class="placeholder-media q-mb-sm">
                  <div class="text-center text-grey-7">
                    [Animation: Preview to detail transition]
                  </div>
                </div>
                <div class="text-subtitle2">Preview & Detail Views</div>
                <div class="text-caption">
                  Seamless transitions between compact previews and detailed content views using any event or input method you want!
                </div>
              </div>

              <div class="col-12">
                <div class="placeholder-media q-mb-sm">
                  <div class="text-center text-grey-7">
                    [Image: Native rendering components]
                  </div>
                </div>
                <div class="text-subtitle2">Native Rendering</div>
                <div class="text-caption">
                  High-performance native rendering across Android, iOS, and other platforms
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
import orientationSteps from '../data/orientation.json'
import { orientationState, orientationService } from 'src/utils/orientationService'

const { appContext } = getCurrentInstance()

// Helper function to safely check completion status
const getCompletionStatus = (id) => {
  return orientationState.value?.[id]?.completed || false
}

// Ensure we have an initial state
if (!orientationState.value) {
  orientationService.getOrientationState()
}

// Handle reset with error catching
const handleReset = () => {
  appContext.config.globalProperties.$tools?.resetOrientation()
}
</script>

<style lang="scss" scoped>
.placeholder-media {
  background: #f5f5f5;
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem 0;
}

.welcome-card {
  background: linear-gradient(135deg, #1976D2 0%, #0D47A1 100%);
  color: white;
}
</style>
