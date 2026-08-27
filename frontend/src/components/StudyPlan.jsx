import { useState } from 'react'
import API from '../api'
import ReactMarkdown from 'react-markdown'

function StudyPlan() {
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)

  async function generatePlan() {
    setLoading(true)
    try {
      const response = await API.post('/plan')
      setPlan(response.data.plan)
    } catch(error) {
      console.log(error)
      alert("Failed to generate plan. Check server logs.")
    }
    setLoading(false)
  }

  return (
    <div className="px-20 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        🤖 AI Study Plan
      </h1>
      <p className="text-gray-500 mb-8">
        Let AI generate your personalized study plan based on your pending tasks
      </p>
      <button
        onClick={generatePlan}
        disabled={loading}
        className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 mb-8"
      >
        {loading ? '🤖 Generating Plan...' : '✨ Plan My Day'}
      </button>

      {plan && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            📅 Your Study Plan for Today
          </h2>
          <div className="text-gray-600 text-sm leading-relaxed prose max-w-none">
  <ReactMarkdown>
    {plan}
  </ReactMarkdown>
</div>
        </div>
      )}

      {!plan && !loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">No Plan Yet</h3>
          <p className="text-gray-400 text-sm">
            Click "Plan My Day" to generate your personalized AI study plan
          </p>
        </div>
      )}
    </div>
  )
}

export default StudyPlan