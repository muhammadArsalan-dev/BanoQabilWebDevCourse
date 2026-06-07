import { useDeadlines } from '../context/DeadlineContext';

export default function HistoryLog() {
  const { history } = useDeadlines();

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-xl">
      <div className="border-b border-gray-700 pb-3 mb-4">
        <h3 className="text-lg font-bold text-indigo-300 uppercase tracking-wider">📜 Archive System Logs</h3>
        <p className="text-xs text-gray-400 mt-0.5">Completed task metadata is saved in application cache.</p>
      </div>

      {history.length === 0 ? (
        <p className="text-xs italic text-gray-500 py-2">No completed items logged yet. Clear items from your dashboard view to see logs populate here.</p>
      ) : (
        <div className="space-y-2">
          {history.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-900/60 p-3 rounded-lg border border-gray-800 text-xs font-mono">
              <div>
                <span className="text-emerald-400 font-bold mr-2">[✔ DONE]</span>
                <span className="text-white font-bold text-sm mr-2">{item.title}</span>
                <span className="text-gray-500">({item.subject})</span>
              </div>
              <div className="text-gray-400 bg-gray-800 px-2 py-1 rounded border border-gray-700">
                Cleared at: {item.completedAt}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}