import { useDeadlines } from '../context/DeadlineContext';

export default function Analytics() {
  const { deadlines } = useDeadlines();

  const totalCount = deadlines.length;
  // Look directly for the manual check parameter
  const priorityCount = deadlines.filter((item) => item.is_priority === true).length;

  return (
    <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-4 flex items-center justify-start gap-8 shadow-inner">
      <div className="flex items-center gap-2">
        <span className="text-xl">📝</span>
        <div className="text-sm font-medium text-gray-300">
          Total Registered:{" "}
          <span className="text-base font-black font-mono text-indigo-400 ml-1">{totalCount}</span>
        </div>
      </div>

      <div className="h-4 w-[1px] bg-indigo-500/20 hidden sm:block"></div>

      <div className="flex items-center gap-2">
        <span className="text-xl text-amber-400">⚡</span>
        <div className="text-sm font-medium text-gray-300">
          High Priority Exams:{" "}
          <span className="text-base font-black font-mono text-amber-400 ml-1">{priorityCount}</span>
        </div>
      </div>
    </div>
  );
}