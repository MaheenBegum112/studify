import { useState } from "react";
import axios from "axios";

function StudyPlan() {
  const [tasks, setTasks] = useState([]);
  const [studyPlan, setStudyPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    try {
      setLoading(true);

      // Get tasks from your backend
      const taskResponse = await axios.get(
        "http://localhost:8000/tasks"
      );

      const userTasks = taskResponse.data;

      console.log("Tasks:", userTasks);

      // Send tasks to AI
      const aiResponse = await axios.post(
        "http://localhost:8000/ai/study-plan",
        {
          tasks: userTasks
        }
      );

      console.log("AI response:", aiResponse.data);

      setStudyPlan(aiResponse.data.study_plan);

    } catch (error) {
      console.error("Error generating study plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Study Plan</h1>

      <button onClick={generatePlan}>
        {loading ? "Generating..." : "Plan My Day"}
      </button>

      {studyPlan && (
        <div>
          <h2>Your Study Plan</h2>

          <pre>{studyPlan}</pre>
        </div>
      )}
    </div>
  );
}

export default StudyPlan;