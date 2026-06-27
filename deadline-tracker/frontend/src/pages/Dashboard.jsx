import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDeadlines } from '../context/DeadlineContext';

export default function Dashboard() {
  const { deadlines, loading, addDeadline, deleteDeadline } = useDeadlines();
  const [form, setForm] = useState({ title: '', type: 'Assignment', subject: '', due_date: '', is_priority: false });
  const [clock, setClock] = useState(new Date());
  
  const [notifPermission, setNotifPermission] = useState(() => {
    return ('Notification' in window) ? Notification.permission : 'default';
  });

  useEffect(() => {
    const tick = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const hourlyReminder = () => {
      if ('Notification' in window && Notification.permission === 'granted' && deadlines.length > 0) {
        new Notification("⏳ Deadline Tracker", {
          body: `Reminder: You have ${deadlines.length} tasks in your queue!`,
        });
      }
    };
    const intervalId = setInterval(hourlyReminder, 3600000);
    return () => clearInterval(intervalId);
  }, [deadlines]);

  const handleEnableNotifications = async () => {
    if (!('Notification' in window)) return;
    const permission = await Notification.requestPermission();
    setNotifPermission(permission);
    if (permission === 'granted') {
      new Notification("🔔 System Alert", { body: "Notifications successfully linked!" });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addDeadline(form);
    setForm({ title: '', type: 'Assignment', subject: '', due_date: '', is_priority: false });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-sans">
      <header className="max-w-6xl mx-auto flex justify-between items-center pb-6 mb-8 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-400">⏳ Local Tracker Pro</h1>
          <nav className="mt-2 space-x-4 text-sm flex items-center">
            <Link to="/" className="text-indigo-400 hover:underline">🏠 Dashboard View</Link>
            <span className="text-gray-700">|</span>
            <Link to="/history" className="text-gray-400 hover:underline">📜 Archive logs</Link>
            <span className="text-gray-700">|</span>
            {notifPermission !== 'granted' ? (
              <button onClick={handleEnableNotifications} className="text-amber-400 font-bold hover:underline cursor-pointer bg-transparent border-none p-0 text-xs">⚠️ Enable Reminders</button>
            ) : (
              <span className="text-emerald-400 text-xs font-mono font-bold">● Reminders Active</span>
            )}
          </nav>
        </div>
        <div className="text-right font-mono text-indigo-300 text-sm">{clock.toLocaleString()}</div>
      </header>

      <div className="max-w-6xl mx-auto mb-8">
        <Outlet />
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Controls */}
        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-fit">
          <h2 className="text-xl font-bold mb-4 text-indigo-300">Add Target</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="text" placeholder="Task Title" required className="w-full bg-gray-700 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            <input type="text" placeholder="Subject" required className="w-full bg-gray-700 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
            <div className="grid grid-cols-2 gap-2">
              <select className="bg-gray-700 p-2 rounded text-sm text-white focus:outline-none" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="Assignment">Assignment</option>
                <option value="Exam">Exam</option>
                <option value="Project">Project</option>
              </select>
              <input type="datetime-local" required className="bg-gray-700 p-2 rounded text-sm font-mono text-white focus:outline-none" value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})} />
            </div>

            {/* Manual Priority Setting Toggle */}
            <div className="flex items-center gap-2 bg-gray-900/40 p-2 rounded border border-gray-700/60">
              <input 
                type="checkbox" 
                id="priority-toggle" 
                className="w-4 h-4 accent-indigo-500 cursor-pointer"
                checked={form.is_priority}
                onChange={e => setForm({...form, is_priority: e.target.checked})}
              />
              <label htmlFor="priority-toggle" className="text-xs text-gray-300 select-none cursor-pointer font-medium">🔥 Mark High Priority</label>
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 p-2.5 rounded font-bold text-sm transition cursor-pointer">Add Target</button>
          </form>
        </section>

        {/* Display column */}
        <section className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-indigo-300">Active Database Counters</h2>
          {loading ? <p className="italic text-gray-500">Querying data backend...</p> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deadlines.map(item => (
                <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold bg-gray-900 text-indigo-300 px-2 py-0.5 rounded border border-gray-700">{item.subject}</span>
                      <Link to={`/deadline/${item.id}`} className="text-xs text-indigo-400 hover:underline">Inspect Details →</Link>
                    </div>
                    <h3 className="text-lg font-bold text-white line-clamp-1">{item.title}</h3>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-gray-900 text-gray-400">{item.type}</span>
                      {item.is_priority && (
                        <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/60">🔥 High Priority</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button onClick={() => deleteDeadline(item.id)} className="w-full bg-red-950/40 hover:bg-red-900 hover:text-red-100 text-red-300 text-xs py-1.5 rounded transition cursor-pointer">Complete / Clear</button>
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