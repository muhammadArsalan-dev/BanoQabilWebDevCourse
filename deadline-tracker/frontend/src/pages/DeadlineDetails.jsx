import { useParams, Link } from 'react-router-dom';
import { useDeadlines } from '../context/DeadlineContext';

export default function DeadlineDetails() {
  const { id } = useParams();
  const { deadlines } = useDeadlines();
  
  const target = deadlines.find(item => item.id === parseInt(id));

  if (!target) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 text-center">
        <p className="text-red-400 font-bold text-xl">Target entity instance not found.</p>
        <Link to="/" className="text-indigo-400 hover:underline mt-4 inline-block">← Return to Main Panel</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex justify-center items-center">
      <div className="bg-gray-800 border border-gray-700 max-w-lg w-full p-6 rounded-2xl shadow-2xl">
        <div className="border-b border-gray-700 pb-3 mb-4">
          <span className="bg-indigo-950 text-indigo-300 text-xs font-bold px-3 py-1 rounded border border-indigo-800 uppercase">{target.type}</span>
          <h2 className="text-2xl font-black text-white mt-2">{target.title}</h2>
        </div>
        <div className="space-y-3 text-sm font-mono bg-gray-900 p-4 rounded-xl border border-gray-800">
          <p><span className="text-gray-500">DATABASE_ID :</span> {target.id}</p>
          <p><span className="text-gray-500">COURSE_SUBJECT:</span> {target.subject}</p>
          <p><span className="text-gray-500">ISO_TIMESTAMP:</span> {target.due_date}</p>
        </div>
        <Link to="/" className="w-full text-center bg-gray-700 hover:bg-gray-600 transition text-white p-2.5 rounded-xl font-bold mt-6 inline-block text-sm">← Back to Dashboard</Link>
      </div>
    </div>
  );
}