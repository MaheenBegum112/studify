import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://studify-1l2q.onrender.com',
  timeout: 45000,
})

// Trigger a silent background wake-up ping as soon as the app loads
// This warms up Render before the user navigates or submits a form!
try {
  API.get('/health').catch(() => {
    // Ignore initial ping error if server is still spinning up
  })
} catch (e) {
  // Ignore
}

export default API