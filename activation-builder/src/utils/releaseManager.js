// src/utils/releaseManager.js
import axios from 'axios'

const DEFAULT_REPO = 'https://github.com/Source-Digital/sourcesync-android'
const CACHE_KEY = 'sourcesync_settings'
const CACHE_EXPIRY_DAYS = 7

export async function updateReleaseSettings(repo = DEFAULT_REPO, forceRefresh = false, tagName = null) {
  // Ensure localStorage structure exists
  if (!localStorage.getItem(CACHE_KEY)) {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      releases: [],
      schema: null,
      config: null,
      lastUpdated: null,
      savedDate: null
    }))
  }

  const settings = JSON.parse(localStorage.getItem(CACHE_KEY))
  const currentDate = new Date()

  // Check if cache is stale (older than 7 days) or force refresh is requested
  const isCacheStale = !settings.savedDate ||
    ((currentDate - new Date(settings.savedDate)) / (1000 * 60 * 60 * 24)) > CACHE_EXPIRY_DAYS

  // Refresh releases if cache is stale or force refresh
  if (forceRefresh || isCacheStale || settings.releases.length === 0) {
    try {
      // Fetch releases from GitHub API
      const releasesResponse = await axios.get(`https://api.github.com/repos/${new URL(repo).pathname.slice(1)}/releases`, {
        params: { per_page: 100 }
      })

      // Transform releases to desired format
      const fetchedReleases = releasesResponse.data.map(release => ({
        name: release.name || `Version ${release.tag_name}`,
        tag_name: release.tag_name,
        published_at: release.published_at,
        body: release.body
      }))

      // Check for new releases
      const hasNewRelease = settings.releases.length === 0 ||
        fetchedReleases[0].tag_name !== settings.releases[0].tag_name

      settings.releases = fetchedReleases
      settings.lastUpdated = currentDate.toISOString()
      settings.savedDate = currentDate.toISOString()
      settings.hasNewRelease = hasNewRelease
    } catch (error) {
      console.error('Failed to fetch releases', error)
    }
  }

  // Refresh schema and config if cache is stale or force refresh
  if (forceRefresh || isCacheStale || !settings.schema || !settings.config) {
    try {
      // Use specified tag or first release tag
      const useTag = tagName || settings.releases[0]?.tag_name

      if (useTag) {
        const baseUrl = `https://raw.githubusercontent.com/${new URL(repo).pathname.slice(1)}/${useTag}/src/main/assets`

        // Fetch schema
        const schemaResponse = await axios.get(`${baseUrl}/sourcesync_config_schema.json`)
        settings.schema = schemaResponse.data

        // Fetch config
        const configResponse = await axios.get(`${baseUrl}/sourcesync_config.json`)
        settings.config = configResponse.data

        // Update release version
        settings.releaseVersion = useTag
      }
    } catch (error) {
      console.error('Failed to fetch schema or config', error)
    }
  }

  // Update localStorage
  localStorage.setItem(CACHE_KEY, JSON.stringify(settings))

  return settings
}

// Utility to get current settings
export function getCurrentSettings() {
  return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
}

// Utility to check for new releases
export function checkForNewRelease() {
  const settings = getCurrentSettings()
  return settings.hasNewRelease || false
}

// Optional: Add a method to clear cache
export function clearReleaseCache() {
  localStorage.removeItem(CACHE_KEY)
}

// Utility to show new release dialog
export function showNewReleaseDialog(dialogPlugin) {
  // First, validate dialog plugin
  if (!dialogPlugin) {
    console.error('Dialog plugin is not available')
    return
  }

  const settings = getCurrentSettings()

  // Check if there's a new release
  if (!settings.hasNewRelease) {
    console.log('No new release available')
    return
  }

  // Show dialog for new release
  dialogPlugin({
    title: 'New Release Available',
    message: `A new version of SourceSync Android (${settings.releases[0].name}) has been released. Would you like to view release details?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    // Open release notes or redirect to release page
    window.open(`https://github.com/Source-Digital/sourcesync-android/releases/tag/${settings.releases[0].tag_name}`, '_blank')

    // Optionally, mark as viewed
    const updatedSettings = getCurrentSettings()
    updatedSettings.hasNewRelease = false
    localStorage.setItem(CACHE_KEY, JSON.stringify(updatedSettings))
  })
}
