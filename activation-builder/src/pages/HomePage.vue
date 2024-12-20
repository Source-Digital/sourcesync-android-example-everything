<!-- src/pages/HomePage.vue -->
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
            <!-- [Placeholder] Hero animation/video showing SourceSync in action -->
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
              <q-item clickable v-ripple to="/documentation">
                <q-item-section avatar>
                  <q-icon name="book" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>1. Read the Documentation</q-item-label>
                  <q-item-label caption>
                    Learn about SourceSync's core concepts and features
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/settings">
                <q-item-section avatar>
                  <q-icon name="settings" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>2. Configure Your Settings</q-item-label>
                  <q-item-label caption>
                    Set up your SDK configuration and preferences
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/activation-builder">
                <q-item-section avatar>
                  <q-icon name="build" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>3. Build Your First Activation</q-item-label>
                  <q-item-label caption>
                    Create interactive overlays using our visual builder
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
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
                <!-- [Placeholder] Feature illustration -->
                <div class="placeholder-media q-mb-sm">
                  <div class="text-center text-grey-7">
                    [Image: Multiple overlay positions diagram]
                  </div>
                </div>
                <div class="text-subtitle2">Multiple Overlay Positions</div>
                <div class="text-caption">
                  Support for top, bottom, left, and right overlay positions with independent content streams
                </div>
              </div>

              <div class="col-12">
                <!-- [Placeholder] Feature illustration -->
                <div class="placeholder-media q-mb-sm">
                  <div class="text-center text-grey-7">
                    [Animation: Preview to detail transition]
                  </div>
                </div>
                <div class="text-subtitle2">Preview & Detail Views</div>
                <div class="text-caption">
                  Seamless transitions between compact previews and detailed content views
                </div>
              </div>

              <div class="col-12">
                <!-- [Placeholder] Feature illustration -->
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
// Component logic here if needed
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
