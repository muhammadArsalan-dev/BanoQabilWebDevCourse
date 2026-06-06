import { useState, useEffect } from 'react';

// Automatically toggles backend environment paths depending on local vs cloud deployment
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://bano-qabil-deadline-backend.vercel.app'; 

function App() {
  const [deadlines, setDeadlines] = useState([]);
  const [form, setForm] = useState({ title: '', type: 'Assignment', subject: '', due_date: '' });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Request desktop notification permissions when the app component loads
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Clock tick trigger loop updating timers every single second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Deadlines from Backend (Optimized internally to remove ESLint errors)
  useEffect(() => {
    const getDeadlines = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/deadlines`);
        const data = await res.json();
        if (res.ok) setDeadlines(data);
      } catch (err) {
        console.error('Connection error to backend:', err);
      }
    };

    getDeadlines();
  }, [form, deadlines]); // Re-runs cleanly when items are modified locally

  // Background Notification Engine: Checks for tasks due in under 1 hour
  useEffect(() => {
    const checkDeadlinesForNotifications = () => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;

      deadlines.forEach((item) => {
        const timeRemainingMs = Date.parse(item.due_date) - Date.now();
        const oneHourMs = 60 * 60 * 1000;

        // If the task is due within the next hour (and hasn't passed yet)
        if (timeRemainingMs > 0 && timeRemainingMs <= oneHourMs) {
          // Check session storage to avoid spamming notifications on every tick loop
          const storageKey = `notified_${item.id}`;
          if (!sessionStorage.getItem(storageKey)) {
            new Notification(`⚠️ Upcoming Deadline!`, {
              body: `"${item.title}" for ${item.subject} is due in less than 1 hour!`,
              icon: '/favicon.ico'
            });
            sessionStorage.setItem(storageKey, 'true'); // Mark as notified
          }
        }
      });
    };

    // Check every 30 seconds for any approaching deadlines
    const notificationInterval = setInterval(checkDeadlinesForNotifications, 30000);
    return () => clearInterval(notificationInterval);
  }, [deadlines]);

  // API Call: Post Form Data to Backend Engine
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/deadlines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ title: '', type: 'Assignment', subject: '', due_date: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // API Call: Delete item instance entry matching id parameter
  const handleDeleteItem = async (id) => {
    try {
      await fetch(`${API_BASE}/api/deadlines/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Countdown Arithmetic Engine Math Handler
  const calculateCountdown = (targetDate) => {
    const total = Date.parse(targetDate) - currentTime.getTime();
    if (total <= 0) return 'Passed / Due';

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <header className="max-w-6xl mx-auto flex justify-between items-center pb-6 mb-8 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-400 tracking-tight">⏳ Full-Stack Deadline Tracker</h1>
          <p className="text-sm text-gray-400 mt-1">Connected to local Express Node Server API</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Clock Synced</p>
          <p className="text-sm font-mono text-indigo-300">{currentTime.toLocaleString()}</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Input Form Box Section */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-xl h-fit border border-gray-800">
          <h2 className="text-xl font-bold mb-4 text-indigo-300">Add Target</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Title / Task Name</label>
              <input
                type="text"
                required
                placeholder="e.g., Final Lab Report Submission"
                className="w-full bg-gray-700 rounded p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Subject / Course</label>
              <input
                type="text"
                required
                placeholder="e.g., Web Engineering"
                className="w-full bg-gray-700 rounded p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Type</label>
                <select
                  className="w-full bg-gray-700 rounded p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="Assignment">Assignment</option>
                  <option value="Test">Test / Quiz</option>
                  <option value="Project">Project</option>
                  <option value="Exam">Exam</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Due Date</label>
                <input
                  type="datetime-local"
                  required
                  className="w-full bg-gray-700 rounded p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
                  value={form.due_date}
                  onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded font-bold transition shadow-lg mt-2 cursor-pointer text-sm">
              + Send to Server
            </button>
          </form>
        </section>

        {/* Counter Output Cards Feed Grid Section */}
        <section className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-indigo-300">Live Counters ({deadlines.length})</h2>
          {deadlines.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-8 text-center border border-dashed border-gray-700">
              <p className="text-gray-400 italic">No items found on backend database payload.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deadlines.map((item) => (
                <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-block bg-gray-900 text-indigo-300 text-xs font-bold px-2.5 py-0.5 rounded-md border border-gray-700">
                        {item.subject}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                        item.type === 'Test' || item.type === 'Exam' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-teal-950 text-teal-300 border border-teal-800'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 mb-4 font-mono">Target: {new Date(item.due_date).toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="text-2xl font-mono font-extrabold text-emerald-400 bg-gray-900 rounded-lg p-3 text-center mb-3 tracking-wider border border-gray-700 shadow-inner">
                      {calculateCountdown(item.due_date)}
                    </div>
                    <button onClick={() => handleDeleteItem(item.id)} className="w-full bg-gray-700/50 hover:bg-red-900 hover:text-red-200 text-gray-400 text-xs py-1.5 rounded-lg transition cursor-pointer">
                      Complete / Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;