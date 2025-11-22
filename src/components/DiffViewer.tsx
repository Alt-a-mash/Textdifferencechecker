import * as Diff from 'diff';

interface DiffViewerProps {
  diff: Diff.Change[];
  darkMode: boolean;
}

export function DiffViewer({ diff, darkMode }: DiffViewerProps) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
      <div className="space-y-1">
        {diff.map((part, index) => {
          let bgColor = '';
          let textColor = 'text-gray-900 dark:text-gray-100';
          
          if (part.added) {
            bgColor = darkMode ? 'bg-green-900/30' : 'bg-green-100';
            textColor = darkMode ? 'text-green-200' : 'text-green-800';
          } else if (part.removed) {
            bgColor = darkMode ? 'bg-red-900/30' : 'bg-red-100';
            textColor = darkMode ? 'text-red-200' : 'text-red-800';
          }

          return (
            <span
              key={index}
              className={`${bgColor} ${textColor} ${part.added || part.removed ? 'px-1' : ''} break-words whitespace-pre-wrap inline`}
            >
              {part.value}
            </span>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}></div>
          <span className="text-gray-600 dark:text-gray-400">Added text</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${darkMode ? 'bg-red-900/30' : 'bg-red-100'}`}></div>
          <span className="text-gray-600 dark:text-gray-400">Removed text</span>
        </div>
      </div>
    </div>
  );
}