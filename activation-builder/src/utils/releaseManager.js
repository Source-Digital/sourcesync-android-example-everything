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
      readme: null,
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

  // Refresh schema, config and readme if cache is stale or force refresh
  if (forceRefresh || isCacheStale || !settings.schema || !settings.config || !settings.readme) {
    try {
      // Use specified tag or first release tag
      const useTag = tagName || settings.releases[0]?.tag_name

      if (useTag) {
        const baseUrl = `https://raw.githubusercontent.com/${new URL(repo).pathname.slice(1)}/${useTag}`

        // Fetch schema
        const schemaResponse = await axios.get(`${baseUrl}/src/main/assets/sourcesync_config_schema.json`)
        settings.schema = schemaResponse.data

        // Fetch config
        const configResponse = await axios.get(`${baseUrl}/src/main/assets/sourcesync_config.json`)
        settings.config = configResponse.data

        // Fetch README
        const readmeResponse = await axios.get(`${baseUrl}/README.md`)
        settings.readme = readmeResponse.data

        // Update release version
        settings.releaseVersion = useTag
      }
    } catch (error) {
      console.error('Failed to fetch schema, config or readme', error)
    }
  }

  // Update localStorage
  localStorage.setItem(CACHE_KEY, JSON.stringify(settings))

  return settings
}

// Existing utility functions remain the same...
export { getCurrentSettings, checkForNewRelease, clearReleaseCache, showNewReleaseDialog }
