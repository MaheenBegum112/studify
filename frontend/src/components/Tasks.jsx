import { useState, useEffect } from 'react'
import API from '../api'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    subject: '',
    deadline: '',
    priority: 'High'
  })

  // Fetch all tasks
  async function fetchTasks() {
    try {
      setLoading(true)

      const response = await API.get('/tasks')

      setTasks(Array.isArray(response.data) ? response.data : [])

    } catch (error) {
      console.log(error)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  // Load tasks when page opens
  useEffect(() => {
    fetchTasks()
  }, [])

  // Add Task
 async function handleAddTask() {
  if (form.subject === '' || form.deadline === '') {
    alert('Please fill all fields!')
    return
  }

  try {
    const response = await API.post('/tasks', form)

    const newTask = {
      id: response.data.id,
      subject: form.subject,
      deadline: form.deadline,
      priority: form.priority,
      completed: false
    }

    setTasks(prevTasks => [...prevTasks, newTask])

    setForm({
      subject: '',
      deadline: '',
      priority: 'High'
    })

  } catch (error) {
    console.log(error)
  }
}

  // Complete / Uncomplete Task
  async function handleComplete(id, completed) {
    try {
      await API.put(`/tasks/${id}`, {
        completed: !completed
      })

      // Update only the changed task
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id
            ? { ...task, completed: !completed }
            : task
        )
      )

    } catch (error) {
      console.log(error)
    }
  }

  // Delete Task
  async function handleDelete(id) {
    try {
      await API.delete(`/tasks/${id}`)

      // Remove the task directly from the screen
      setTasks(prevTasks =>
        prevTasks.filter(task => task.id !== id)
      )

    } catch (error) {
      console.log(error)
    }
  }

  // Send Reminder
  async function sendReminder() {
    try {
      await API.post('/notify')

      alert('WhatsApp reminder sent! 📱')

    } catch (error) {
      console.error(
        'Backend Error:',
        error.response?.data || error.message
      )

      alert(
        'Failed to send notification. Please check server logs.'
      )
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
    <div className="px-20 py-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        📝 My Tasks
      </h1>

      {/* Add New Task */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">

        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Add New Task
        </h2>

        <div className="flex gap-4">

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-1/3"
          />

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-1/4"
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-1/4"
          >
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <button
            onClick={handleAddTask}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700"
          >
            Add Task
          </button>

        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Your Tasks
        </h2>

        {/* Loading */}
        {loading && (
          <p className="text-gray-400 text-sm text-center py-8">
            Loading tasks 📝
          </p>
        )}

        {/* No Tasks */}
        {!loading && tasks.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">
            No tasks yet 📝
          </p>
        )}

        {/* Tasks */}
        {!loading && tasks.map(task => (

          <div
            key={task.id}
            className="flex justify-between items-center border-b border-gray-100 py-4 last:border-0"
          >

            <div className="flex items-center gap-4">

              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  handleComplete(task.id, task.completed)
                }
                className="w-4 h-4 accent-purple-600"
              />

              <div>

                <p
                  className={`text-sm font-semibold ${
                    task.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-800'
                  }`}
                >
                  {task.subject}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Deadline: {task.deadline}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full
                  ${
                    task.priority === 'High'
                      ? 'bg-red-100 text-red-600'
                      : ''
                  }
                  ${
                    task.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-600'
                      : ''
                  }
                  ${
                    task.priority === 'Low'
                      ? 'bg-green-100 text-green-600'
                      : ''
                  }
                `}
              >
                {task.priority}
              </span>

              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                🗑️ Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Tasks