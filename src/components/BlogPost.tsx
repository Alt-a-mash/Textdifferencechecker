import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface BlogPostProps {
  title: string;
  description: string;
  content: React.ReactNode;
  onBack: () => void;
  darkMode: boolean;
}

export function BlogPost({ title, description, content, onBack, darkMode }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Tool
      </Button>
      
      <header className="mb-8">
        <h1 className="text-gray-900 dark:text-gray-100 mb-4">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </header>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        {content}
      </div>
    </article>
  );
}
