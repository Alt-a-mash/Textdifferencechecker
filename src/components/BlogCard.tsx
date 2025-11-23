import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface BlogCardProps {
  title: string;
  description: string;
  onReadMore: () => void;
  darkMode: boolean;
}

export function BlogCard({ title, description, onReadMore, darkMode }: BlogCardProps) {
  return (
    <article 
      className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
      role="article"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {description}
          </p>
          <Button
            onClick={onReadMore}
            variant="outline"
            className="border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            aria-label={`Read more about ${title}`}
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  );
}
