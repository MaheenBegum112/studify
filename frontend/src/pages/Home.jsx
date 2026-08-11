function Home() {
  return (
    <div>

      {/* ========== HERO SECTION ========== */}
      <div className="flex justify-between items-center px-20 py-24 bg-indigo-50">
        
        {/* Left — Text */}
        <div className="w-1/2">
          <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
            AI Powered Study Planner
          </span>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mt-4">
            Never Miss a <br />
            <span className="text-indigo-600">Deadline</span> Again
          </h1>
          <p className="text-gray-500 mt-6 text-lg">
            Studify helps you manage assignments, exams and deadlines smartly.
            Let AI plan your day and get WhatsApp reminders automatically.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
              Get Started →
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
              Learn More
            </button>
          </div>
          
        </div>

        {/* Right — Image */}
        <div className="w-1/2 flex justify-center">
  <img
  src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg"
  alt="Student studying"
  className="w-96 mix-blend-multiply"
/>
        </div>

      </div>

      {/* ========== HOW IT WORKS SECTION ========== */}
      <div className="bg-white px-20 py-20">
        
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Three simple steps to never miss a deadline again
        </p>

        <div className="flex justify-between gap-8">

          <div className="bg-indigo-50 rounded-xl p-8 text-center w-1/3">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Add Your Tasks</h3>
            <p className="text-gray-500 text-sm">
              Add assignments, exams and deadlines with subject and priority level
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-8 text-center w-1/3">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">AI Plans Your Day</h3>
            <p className="text-gray-500 text-sm">
              Groq AI analyzes your schedule and generates a personalized hourly study plan
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-8 text-center w-1/3">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Get WhatsApp Alerts</h3>
            <p className="text-gray-500 text-sm">
              Get automatic WhatsApp reminders when your deadlines are approaching
            </p>
          </div>

        </div>
      </div>

      {/* ========== FEATURES SECTION ========== */}
      <div className="px-20 py-20 bg-gray-50">
        
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Features
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Everything you need to stay on top of your studies
        </p>

        <div className="grid grid-cols-2 gap-8">

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Smart Scheduling</h3>
            <p className="text-gray-500 text-sm">
              Automatically organizes your tasks by deadline and priority so you always know what to do first
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">AI Study Plan</h3>
            <p className="text-gray-500 text-sm">
              Groq AI generates a personalized hourly study plan based on your deadlines and available time
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">WhatsApp Reminders</h3>
            <p className="text-gray-500 text-sm">
              Get automatic WhatsApp messages when your deadlines are close so you never forget
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Weekly Summary</h3>
            <p className="text-gray-500 text-sm">
              Every Sunday get an AI generated summary — tasks completed, missed and suggestions for next week
            </p>
          </div>

        </div>
      </div>

      {/* ========== FOOTER ========== */}
      <div className="bg-gray-900 text-white px-20 py-10">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-indigo-400">📚 Studify</div>
          <p className="text-gray-400 text-sm">© 2026 Studify. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/" className="text-gray-400 text-sm hover:text-white">Home</a>
            <a href="/tasks" className="text-gray-400 text-sm hover:text-white">Tasks</a>
            <a href="/plan" className="text-gray-400 text-sm hover:text-white">Study Plan</a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home