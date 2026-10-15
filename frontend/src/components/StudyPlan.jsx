import { useState, useRef } from 'react'
import API from '../api'
import ReactMarkdown from 'react-markdown'

function StudyPlan() {
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [slowNotice, setSlowNotice] = useState(false)
  const timerRef = useRef(null)

  async function generatePlan() {
    setLoading(true)
    setError(null)
    setSlowNotice(false)

    // AI generation + Render wake-up can take a few moments
    timerRef.current = setTimeout(() => {
      setSlowNotice(true)
    }, 3000)

    try {
      const response = await API.post('/plan')
      if (response.data && response.data.plan) {
        setPlan(response.data.plan)
      } else {
        setError("Received an unexpected response from AI service.")
      }
    } catch(err) {
      console.error("AI Plan error:", err)
      const detail = err.response?.data?.detail || err.response?.data?.plan || err.message || "Failed to generate plan."
      setError(`Failed to generate study plan: ${detail}`)
    } finally {
      clearTimeout(timerRef.current)
      setSlowNotice(false)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          🤖 AI Study Plan
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Let AI analyze your pending deadlines and generate a customized hourly study routine
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={generatePlan}
          disabled={loading}
          className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:bg-purple-400 transition shadow-sm flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Analyzing tasks & generating...</span>
            </>
          ) : (
            '✨ Plan My Day'
          )}
        </button>
      </div>

      {slowNotice && (
        <div className="mb-6 bg-purple-50 border border-purple-200 text-purple-800 px-4 py-3 rounded-xl text-sm flex items-center gap-3 animate-pulse">
          <span className="text-lg">🧠</span>
          <div>
            <p className="font-semibold">AI is analyzing your deadlines...</p>
            <p className="text-xs text-purple-600">
              Generating a custom hourly schedule. This takes just a few seconds.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-xs font-bold ml-4">✕</button>
        </div>
      )}

      {plan && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>📅</span> Your AI Study Plan for Today
            </h2>
            <button
              onClick={() => navigator.clipboard.writeText(plan)}
              className="text-xs text-purple-600 hover:text-purple-800 bg-purple-50 px-3 py-1.5 rounded-lg font-medium transition"
            >
              📋 Copy Plan
            </button>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line font-sans">
            <ReactMarkdown>{plan}</ReactMarkdown>
          </div>
        </div>
      )}

      {!plan && !loading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">🤖</div>
          <h3 className="text-base font-bold text-gray-700 mb-1">No Plan Generated Yet</h3>
          <p className="text-gray-400 text-xs max-w-sm mx-auto">
            Make sure you have pending tasks in your task list, then click "Plan My Day" to get your AI-crafted schedule.
          </p>
        </div>
      )}
    </div>
  )
}


export default StudyPlan