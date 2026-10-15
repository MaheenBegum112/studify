import { useState, useEffect, useRef } from 'react'
import API from '../api'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [slowServerNotice, setSlowServerNotice] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState(null)

  const [form, setForm] = useState({
    subject: '',
    deadline: '',
    priority: 'High'
  })

  const slowTimerRef = useRef(null)

  function showToast(msg, type = 'info') {
    setFeedbackMessage({ msg, type })
    setTimeout(() => {
      setFeedbackMessage(null)
    }, 4000)
  }

  // Fetch all tasks
  async function fetchTasks() {
    try {
      setLoading(true)
      // If fetching takes > 2.5s, warn about Render cold start
      slowTimerRef.current = setTimeout(() => {
        setSlowServerNotice(true)
      }, 2500)

      const response = await API.get('/tasks')
      setTasks(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error("Error fetching tasks:", error)
      showToast("Could not load tasks from server. Please check your connection.", "error")
    } finally {
      clearTimeout(slowTimerRef.current)
      setSlowServerNotice(false)
      setLoading(false)
    }
  }

  // Load tasks on mount
  useEffect(() => {
    fetchTasks()
    return () => clearTimeout(slowTimerRef.current)
  }, [])

  // Optimistic Add Task
  async function handleAddTask(e) {
    if (e) e.preventDefault()
    if (isAdding) return

    if (!form.subject.trim() || !form.deadline) {
      alert('Please fill in both the Subject and Deadline!')
      return
    }

    const newTaskData = {
      subject: form.subject.trim(),
      deadline: form.deadline,
      priority: form.priority,
    }

    // Temporary optimistic ID
    const tempId = 'temp-' + Date.now()
    const optimisticTask = {
      id: tempId,
      subject: newTaskData.subject,
      deadline: newTaskData.deadline,
      priority: newTaskData.priority,
      completed: false,
      _saving: true
    }

    // Instant UI update
    setTasks(prev => [optimisticTask, ...prev])
    setIsAdding(true)

    // Clear form immediately so user can continue
    const savedForm = { ...form }
    setForm({
      subject: '',
      deadline: '',
      priority: 'High'
    })

    try {
      const response = await API.post('/tasks', newTaskData)
      const realId = response.data.id

      // Replace temp task with real ID and mark saved
      setTasks(prev =>
        prev.map(t =>
          t.id === tempId ? { ...t, id: realId, _saving: false } : t
        )
      )
      showToast("Task added successfully! ✅", "success")
    } catch (error) {
      console.error("Error adding task:", error)
      // Rollback optimistic task
      setTasks(prev => prev.filter(t => t.id !== tempId))
      setForm(savedForm)
      showToast("Failed to save task. Reverting changes.", "error")
    } finally {
      setIsAdding(false)
    }
  }

  // Instant Optimistic Complete / Uncomplete
  async function handleComplete(id, currentCompleted) {
    const targetCompleted = !currentCompleted

    // Instant UI update
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: targetCompleted } : task
      )
    )

    try {
      await API.put(`/tasks/${id}`, {
        completed: targetCompleted
      })
    } catch (error) {
      console.error("Error updating task:", error)
      // Rollback on error
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, completed: currentCompleted } : task
        )
      )
      showToast("Failed to update task status on server.", "error")
    }
  }

  // Instant Optimistic Delete Task
  async function handleDelete(id) {
    const originalTasks = [...tasks]

    // Instant UI update: remove immediately
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))

    try {
      await API.delete(`/tasks/${id}`)
      showToast("Task deleted! 🗑️", "info")
    } catch (error) {
      console.error("Error deleting task:", error)
      // Rollback if delete fails
      setTasks(originalTasks)
      showToast("Failed to delete task from server.", "error")
    }
  }

  // Handle form changes
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Page Title & Status */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            📝 My Tasks
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize, prioritize, and track your study goals
          </p>
        </div>

        <button
          onClick={fetchTasks}
          disabled={loading}
          className="text-sm px-4 py-2 border border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-300 rounded-lg transition disabled:opacity-50 flex items-center gap-1.5"
          title="Refresh task list from server"
        >
          <span>🔄</span> {loading ? 'Syncing...' : 'Refresh'}
        </button>
      </div>

      {/* Render Cold-Start Notice */}
      {slowServerNotice && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm flex items-center gap-3 animate-pulse">
          <span className="text-lg">⏳</span>
          <div>
            <p className="font-semibold">Cloud server is waking up...</p>
            <p className="text-xs text-amber-700">
              The free backend on Render spins down when idle. Please give it a few seconds to respond.
            </p>
          </div>
        </div>
      )}

      {/* Feedback Toast */}
      {feedbackMessage && (
        <div
          className={`mb-6 px-4 py-3 rounded-xl text-sm flex items-center justify-between shadow-sm transition-all ${
            feedbackMessage.type === 'error'
              ? 'bg-red-50 border border-red-200 text-red-700'
              : feedbackMessage.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-purple-50 border border-purple-200 text-purple-700'
          }`}
        >
          <span>{feedbackMessage.msg}</span>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="text-xs opacity-60 hover:opacity-100 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Add New Task Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span>➕</span> Add New Task
        </h2>

        <form onSubmit={handleAddTask} className="flex flex-wrap md:flex-nowrap gap-3">
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject or Task name (e.g., Calculus Homework)"
            className="border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none rounded-xl px-4 py-2.5 text-sm flex-1 transition"
            disabled={isAdding}
            required
          />

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none rounded-xl px-4 py-2.5 text-sm w-full md:w-44 transition text-gray-700"
            disabled={isAdding}
            required
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none rounded-xl px-4 py-2.5 text-sm w-full md:w-36 transition text-gray-700"
            disabled={isAdding}
          >
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <button
            type="submit"
            disabled={isAdding}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-700 disabled:bg-purple-400 transition shadow-sm w-full md:w-auto flex items-center justify-center gap-2 min-w-[120px]"
          >
            {isAdding ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Adding...</span>
              </>
            ) : (
              'Add Task'
            )}
          </button>
        </form>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-gray-700">
            Your Tasks ({tasks.length})
          </h2>
          <span className="text-xs text-gray-400">
            {tasks.filter(t => t.completed).length} completed
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-2xl mb-2">⏳</div>
            <p className="text-gray-400 text-sm">Loading your tasks...</p>
          </div>
        )}

        {/* No Tasks */}
        {!loading && tasks.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <span className="text-3xl mb-2 block">🎉</span>
            <p className="text-gray-600 font-medium text-sm">No tasks yet!</p>
            <p className="text-gray-400 text-xs mt-1">
              Add your assignments or exam deadlines above to get started.
            </p>
          </div>
        )}

        {/* Tasks List */}
        {!loading && tasks.length > 0 && (
          <div className="divide-y divide-gray-100">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`flex justify-between items-center py-3.5 transition-all ${
                  task._saving ? 'opacity-60 bg-purple-50/30 px-3 rounded-lg' : ''
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <input
                    type="checkbox"
                    checked={Boolean(task.completed)}
                    onChange={() => handleComplete(task.id, task.completed)}
                    className="w-4 h-4 accent-purple-600 cursor-pointer rounded"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-sm font-semibold transition ${
                          task.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-800'
                        }`}
                      >
                        {task.subject}
                      </p>
                      {task._saving && (
                        <span className="text-[10px] bg-purple-100 text-purple-700 font-medium px-2 py-0.5 rounded-full">
                          Saving...
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 mt-0.5">
                      📅 Deadline: {task.deadline ? String(task.deadline).substring(0, 10) : 'No date'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      task.priority === 'High'
                        ? 'bg-red-50 text-red-600 border border-red-100'
                        : task.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-600 border border-amber-100'
                        : 'bg-green-50 text-green-600 border border-green-100'
                    }`}
                  >
                    {task.priority === 'High' && '🔴 '}
                    {task.priority === 'Medium' && '🟡 '}
                    {task.priority === 'Low' && '🟢 '}
                    {task.priority}
                  </span>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg text-sm transition"
                    title="Delete task"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Tasks