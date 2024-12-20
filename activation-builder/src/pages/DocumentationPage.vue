<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h4">Documentation</div>
        <div class="text-caption">
          Version: {{ $settings?.releaseVersion || 'Loading...' }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="documentation-content">
        <div v-if="$settings?.readme" v-html="compiledMarkdown"></div>
        <div v-else class="text-center q-pa-md">
          <q-spinner color="primary" size="3em" />
          <div class="text-grey q-mt-sm">Loading documentation...</div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const { appContext } = getCurrentInstance()
const $settings = appContext.config.globalProperties.$settings
const $tools = appContext.config.globalProperties.$tools

// Convert markdown to sanitized HTML
const compiledMarkdown = computed(() => {
  if (!$settings?.readme) return ''
  const rawHtml = marked($settings.readme)
  return DOMPurify.sanitize(rawHtml)
})

// Track scrolling to detect when user reaches bottom
const handleScroll = () => {
  const element = document.documentElement
  const scrolledToBottom =
    Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 50

  if (scrolledToBottom) {
    $tools.markOrientationComplete('readDocumentation')
  }
}

// Add and remove scroll listener
onMounted(() => {
  document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
.documentation-content {
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  p {
    margin: 1em 0;
  }

  code {
    background: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }

  pre {
    background: #f5f5f5;
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
  }

  ul, ol {
    padding-left: 2em;
    margin: 1em 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
