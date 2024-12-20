<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          SourceSync Native Tools
          <span v-if="$settings?.releaseVersion" class="q-ml-sm text-grey-5">
            {{ $settings.releaseVersion }}
          </span>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
      <OrientationProgress />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import OrientationProgress from 'components/OrientationProgress.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'Get Started with SourceSync',
    icon: 'home',
    link: '#/'
  },
  {
    title: 'Settings',
    caption: 'Configure SDK Settings',
    icon: 'settings',
    link: '#/settings'
  },
  {
    title: 'Activation Builder',
    caption: 'Create and Test Activations',
    icon: 'build',
    link: '#/activation-builder'
  },
  {
    title: 'Documentation',
    caption: 'View SDK Documentation',
    icon: 'description',
    link: '#/documentation'
  },
  {
    title: 'Github',
    caption: 'Source Digital on GitHub',
    icon: 'code',
    link: 'https://github.com/Source-Digital/sourcesync-android',
    target: '_blank'
  },
  {
    title: 'Support',
    caption: 'Get Help & Support',
    icon: 'help',
    link: 'mailto:dev@sourcedigital.net'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
