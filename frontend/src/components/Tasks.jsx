import { useState } from 'react'

function Tasks() {

  //initial value is empty
  const [tasks, setTasks] = useState([])

  // State to store form data
  const [form, setForm] = useState({
    subject: '',
    deadline: '',
    priority: 'High'
  })

  // When user types in form
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // When user clicks Add Task
  function handleAddTask() {
    if (form.subject === '' || form.deadline === '') {
      alert('Please fill all fields!')
      return
    }
    const newTask = {
      id: Date.now(),
      subject: form.subject,
      deadline: form.deadline,
      priority: form.priority,
      completed: false
    }
    setTasks([...tasks, newTask])
    setForm({ subject: '', deadline: '', priority: 'High' })
  }

  // When user clicks complete button
  function handleComplete(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // When user clicks delete button
  function handleDelete(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="px-20 py-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        📝 My Tasks
      </h1>

      {/* ===== ADD TASK FORM ===== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Add New Task</h2>

        <div className="flex gap-4">

          {/* Subject */}
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject (e.g. DBMS Assignment)"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-1/3 focus:outline-none focus:border-indigo-500"
          />

          {/* Deadline */}
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-1/4 focus:outline-none focus:border-indigo-500"
          />

          {/* Priority */}
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-1/4 focus:outline-none focus:border-indigo-500"
          >
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          {/* Add Button */}
          <button
            onClick={handleAddTask}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
          >
            Add Task
          </button>

        </div>
      </div>

      {/* ===== TASK LIST ===== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Your Tasks</h2>

        {/* If no tasks */}
        {tasks.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">
            No tasks yet. Add your first task above! 📝
          </p>
        )}

        {/* Task List */}
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex justify-between items-center border-b border-gray-100 py-4 last:border-0"
          >
            {/* Left — Task Info */}
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleComplete(task.id)}
                className="w-4 h-4 accent-indigo-600"
              />
              <div>
                <p className={`text-sm font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.subject}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Deadline: {task.deadline}
                </p>
              </div>
            </div>

            {/* Right — Priority + Delete */}
            <div className="flex items-center gap-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full 
                ${task.priority === 'High' ? 'bg-red-100 text-red-600' : ''}
                ${task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : ''}
                ${task.priority === 'Low' ? 'bg-green-100 text-green-600' : ''}
              `}>
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
