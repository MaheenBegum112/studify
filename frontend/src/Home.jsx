import { Link } from 'react-router-dom'
import task from './assets/task.png'
import ai from './assets/ai.png'
import studifyhero from './assets/studifyhero.png'
import countdown from './assets/countdown.png'

function Home() {
  return (
    <div>

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <div className="flex justify-between items-center px-20 py-12 bg-[#F3F4FD]">

        {/* LEFT SIDE */}
        <div className="w-1/2">

          <span className="bg-purple-200 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
            AI Powered Study Planner
          </span>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight mt-4">
            Never Miss a <br />
            <span className="text-purple-600">Deadline</span> Again
          </h1>

          <p className="text-gray-500 mt-6 text-lg">
            Studify helps you manage assignments, exams and deadlines smartly.
            Let AI plan your day and track your deadlines automatically.
          </p>

          <div className="flex gap-4 mt-8">

            <Link
              to="/tasks"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Get Started →
            </Link>

            <button
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Learn More
            </button>

          </div>

        </div>


        {/* RIGHT SIDE - STUDIFY HERO IMAGE */}
        <div className="w-1/2 flex justify-center items-center">

          <img
            src={studifyhero}
            alt="Student studying with Studify"
            className="w-full max-w-2xl object-contain"
          />

        </div>

      </div>


      {/* =====================================================
          HOW IT WORKS SECTION
      ====================================================== */}
      <div className="bg-white px-20 py-20">

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How It Works
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Three simple steps to never miss a deadline again
        </p>


        <div className="flex justify-between gap-8">


          {/* =================================================
              CARD 1
          ================================================= */}
          <div className="bg-white rounded-2xl p-5 w-1/3 shadow-lg border border-gray-100">

            <div className="flex justify-between items-start">

              <div className="w-28 h-20 rounded-2xl overflow-hidden flex items-center">
                <img
                  src={task}
                  alt="Add Your Tasks"
                  className="w-16 h-16 object-contain"
                />
              </div>

              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>

            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3">
              Add Your Tasks
            </h3>

            <p className="text-gray-500 text-base leading-7">
              Add assignments, exams and deadlines with subject and priority level
            </p>

            <div className="mt-6 space-y-4 text-gray-700">

              <p>
                <span className="text-green-500 font-bold mr-3">✓</span>
                Add assignments, exams & deadlines
              </p>

              <p>
                <span className="text-green-500 font-bold mr-3">✓</span>
                Set subject and priority
              </p>

              <p>
                <span className="text-green-500 font-bold mr-3">✓</span>
                Keep all your tasks in one place
              </p>

            </div>

            <Link
              to="/tasks"
              className="inline-block mt-8 text-purple-600 font-bold text-lg"
            >
              Get Started →
            </Link>

          </div>



          {/* =================================================
              CARD 2
          ================================================= */}
          <div className="bg-white rounded-2xl p-5 w-1/3 shadow-lg border border-gray-100">

            <div className="flex justify-between items-start">

              <div className="w-28 h-25 rounded-2xl overflow-hidden flex items-center">
                <img
                  src={ai}
                  alt="AI Plans Your Day"
                  className="w-16 h-16 object-contain"
                />
              </div>

              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>

            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-1 mb-3">
              AI Plans Your Day
            </h3>

            <p className="text-gray-500 text-base leading-7">
              Groq AI analyzes your schedule and generates a personalized hourly study plan
            </p>

            <div className="mt-6 space-y-4 text-gray-700">

              <p>
                <span className="text-green-500 font-bold mr-3">✓</span>
                AI analyzes your tasks
              </p>

              <p>
                <span className="text-green-500 font-bold mr-3">✓</span>
                Creates a smart hourly study plan
              </p>

              <p>
                <span className="text-green-500 font-bold mr-3">✓</span>
                Optimize your time effectively
              </p>

            </div>

            <Link
              to="/plan"
              className="inline-block mt-8 text-orange-500 font-bold text-lg"
            >
              See Study Plan →
            </Link>

          </div>



          {/* =================================================
              CARD 3 - DEADLINE COUNTDOWN
          ================================================= */}
          <div className="bg-white rounded-2xl p-5 w-1/3 shadow-lg border border-gray-100">

            <div className="flex justify-between items-start">

              {/* COUNTDOWN IMAGE */}
              <div className="w-24 h-22 rounded-2xl overflow-hidden flex items-center justify-center">

                <img
                  src={countdown}
                  alt="Deadline Countdown"
                  className="w-16 h-16 object-contain"
                />

              </div>

              {/* NUMBER 3 */}
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>

            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-3 mb-3">
              Deadline Countdown
            </h3>

            <p className="text-gray-500 text-base leading-7">
              See real-time countdown for each task showing exactly how many days are left
            </p>

            <div className="mt-6 space-y-4 text-gray-700">

              <p>
                <span className="text-green-500 font-bold mr-3">✓</span>
                Real-time days remaining counter
              </p>

              <p>
                <span className="text-green-500 font-bold mr-3">✓</span>
                Overdue task alerts
              </p>

              <p>
                <span className="text-green-500 font-bold mr-3">✓</span>
                Stay on track stress-free
              </p>

            </div>

            <Link
              to="/tasks"
              className="inline-block mt-8 text-purple-600 font-bold text-lg"
            >
              View Tasks →
            </Link>

          </div>

        </div>

      </div>



      {/* =====================================================
          FEATURES SECTION
      ====================================================== */}
      <div className="px-20 py-20 bg-gray-50">

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Features
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Everything you need to stay on top of your studies
        </p>

        <div className="grid grid-cols-2 gap-8">


          {/* FEATURE 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">

            <div className="text-3xl mb-3">
              📅
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Smart Scheduling
            </h3>

            <p className="text-gray-500 text-sm">
              Automatically organizes your tasks by deadline and priority
              so you always know what to do first
            </p>

          </div>


          {/* FEATURE 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">

            <div className="text-3xl mb-3">
              🤖
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              AI Study Plan
            </h3>

            <p className="text-gray-500 text-sm">
              Groq AI generates a personalized hourly study plan based on
              your deadlines and available time
            </p>

          </div>


          {/* FEATURE 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">

            <div className="text-3xl mb-3">
              ⏰
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Deadline Countdown
            </h3>

            <p className="text-gray-500 text-sm">
              Real-time countdown showing days remaining for each task
              so you never miss a deadline
            </p>

          </div>


          {/* FEATURE 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">

            <div className="text-3xl mb-3">
              📊
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Weekly Summary
            </h3>

            <p className="text-gray-500 text-sm">
              Every Sunday get an AI generated summary — tasks completed,
              missed and suggestions for next week
            </p>

          </div>

        </div>

      </div>



      {/* =====================================================
          FOOTER
      ====================================================== */}
      <div className="bg-gray-900 text-white px-20 py-10">

        <div className="flex justify-between items-center">

          {/* LOGO */}
          <div className="text-xl font-bold text-purple-400">
            📚 Studify
          </div>

          {/* COPYRIGHT */}
          <p className="text-gray-400 text-sm">
            © 2026 Studify. All rights reserved.
          </p>

          {/* LINKS */}
          <div className="flex gap-6">

            <Link
              to="/"
              className="text-gray-400 text-sm hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/tasks"
              className="text-gray-400 text-sm hover:text-white"
            >
              Tasks
            </Link>

            <Link
              to="/plan"
              className="text-gray-400 text-sm hover:text-white"
            >
              Study Plan
            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Home