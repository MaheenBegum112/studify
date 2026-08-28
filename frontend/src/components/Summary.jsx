import React, { useEffect, useState } from "react";
import axios from "axios";

function Summary() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed === true
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800">
          Study Summary
        </h1>

        <p className="text-gray-500 mt-2">
          Track your overall study progress
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          {/* Total */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">
              Total Tasks
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {totalTasks}
            </p>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">
              Completed
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-3">
              {completedTasks}
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">
              Pending
            </h2>

            <p className="text-4xl font-bold text-orange-500 mt-3">
              {pendingTasks}
            </p>
          </div>

        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow p-6 mt-8">

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Overall Progress
            </h2>

            <span className="text-2xl font-bold text-blue-600">
              {progress}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-5">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow p-6 mt-8">

          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Your Tasks
          </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500">
              No tasks available.
            </p>
          ) : (
            <div className="space-y-3">

              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center border-b pb-3"
                >

                  <div>
                    <p className="font-medium text-gray-800">
                      {task.title}
                    </p>

                    {task.description && (
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Summary;