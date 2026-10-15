import React, { useEffect, useState } from "react";
import API from "../api";

function Summary() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get("/tasks");
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching tasks for summary:", err);
      setError("Failed to load summary. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => Boolean(task.completed)).length;
  const pendingTasks = totalTasks - completedTasks;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              📊 Study Summary
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track your overall study progress and productivity stats
            </p>
          </div>

          <button
            onClick={fetchTasks}
            disabled={loading}
            className="text-sm px-4 py-2 border border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-300 rounded-lg transition disabled:opacity-50 flex items-center gap-1.5 bg-white shadow-sm"
          >
            <span>🔄</span> {loading ? 'Updating...' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={fetchTasks}
              className="text-xs font-semibold underline hover:no-underline ml-4"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="inline-block animate-spin text-3xl mb-3">⏳</div>
            <p className="text-gray-400 text-sm">Calculating study stats...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Total */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Total Tasks
                </span>
                <p className="text-4xl font-extrabold text-purple-600 mt-2">
                  {totalTasks}
                </p>
                <p className="text-xs text-gray-400 mt-1">all created tasks</p>
              </div>

              {/* Completed */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Completed
                </span>
                <p className="text-4xl font-extrabold text-emerald-600 mt-2">
                  {completedTasks}
                </p>
                <p className="text-xs text-gray-400 mt-1">tasks finished</p>
              </div>

              {/* Pending */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Pending
                </span>
                <p className="text-4xl font-extrabold text-amber-500 mt-2">
                  {pendingTasks}
                </p>
                <p className="text-xs text-gray-400 mt-1">tasks remaining</p>
              </div>
            </div>

            {/* Progress Bar Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold text-gray-800">
                    Completion Rate
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {completedTasks} of {totalTasks} tasks completed
                  </p>
                </div>
                <span className="text-2xl font-black text-purple-600">
                  {progress}%
                </span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-3.5 mt-4 overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Task Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
              <h2 className="text-base font-bold text-gray-800 mb-4">
                Tasks Overview ({tasks.length})
              </h2>

              {tasks.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">
                  No tasks recorded yet.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex justify-between items-center py-3"
                    >
                      <div>
                        <p className={`font-semibold text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                          {task.subject}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          📅 Deadline: {task.deadline ? String(task.deadline).substring(0, 10) : 'None'} • Priority: {task.priority}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          task.completed
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}
                      >
                        {task.completed ? "✓ Completed" : "⏳ Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Summary;


