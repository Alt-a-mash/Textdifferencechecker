import { useState, useEffect } from 'react';
import { Moon, Sun, ArrowLeftRight, ShieldCheck, AlertCircle, Copy, Download } from 'lucide-react';
import { Button } from './components/ui/button';
import { DiffViewer } from './components/DiffViewer';
import * as Diff from 'diff';
import { Helmet } from 'react-helmet';
import { toast, Toaster } from 'sonner';

const MAX_TEXT_LENGTH = 200000; // 200k characters

// Example text pairs for demonstration
const EXAMPLE_PAIRS = [
  {
    original: 'The quick brown fox jumps over the lazy dog.',
    modified: 'The quick brown fox leaps over the sleepy dog.'
  },
  {
    original: 'Hello World! This is a simple text comparison example.',
    modified: 'Hello World! This is an advanced text comparison example with more words.'
  },
  {
    original: 'JavaScript is a programming language used for web development.',
    modified: 'TypeScript is a programming language used for web development and provides static typing.'
  },
  {
    original: 'I love coding in the morning. It helps me stay productive.',
    modified: 'I love coding in the evening. It helps me relax and stay creative.'
  },
  {
    original: 'React makes building user interfaces simple and efficient.',
    modified: 'React makes building user interfaces simple, efficient, and enjoyable.'
  },
  {
    original: 'The weather today is sunny with clear skies.',
    modified: 'The weather today is cloudy with a chance of rain.'
  },
  {
    original: 'Version 1.0.0 released with bug fixes and improvements.',
    modified: 'Version 2.0.0 released with new features, bug fixes and major improvements.'
  },
  {
    original: 'She sells seashells by the seashore.',
    modified: 'She sells beautiful seashells by the sandy seashore.'
  }
];

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  const [diffResult, setDiffResult] = useState<Diff.Change[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [textLimitWarning, setTextLimitWarning] = useState<string | null>(null);

  // Debounce text inputs to avoid CPU spikes
  const debouncedOriginalText = useDebounce(originalText, 300);
  const debouncedModifiedText = useDebounce(modifiedText, 300);

  // Auto-compare whenever debounced text changes
  useEffect(() => {
    try {
      setError(null);
      if (debouncedOriginalText || debouncedModifiedText) {
        const diff = Diff.diffWords(debouncedOriginalText, debouncedModifiedText);
        setDiffResult(diff);
      } else {
        setDiffResult(null);
      }
    } catch (err) {
      setError('An error occurred while comparing texts. Please try with shorter text.');
      setDiffResult(null);
    }
  }, [debouncedOriginalText, debouncedModifiedText]);

  const handleTextChange = (value: string, setter: (val: string) => void) => {
    if (value.length > MAX_TEXT_LENGTH) {
      setTextLimitWarning(
        `Text exceeds ${(MAX_TEXT_LENGTH / 1000).toFixed(0)}k characters. Only the first ${(MAX_TEXT_LENGTH / 1000).toFixed(0)}k characters will be used for comparison.`
      );
      setter(value.slice(0, MAX_TEXT_LENGTH));
    } else {
      setTextLimitWarning(null);
      setter(value);
    }
  };

  const handleSwap = () => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
  };

  const handleClear = () => {
    setOriginalText('');
    setModifiedText('');
    setDiffResult(null);
    setError(null);
    setTextLimitWarning(null);
  };

  const handleCopy = () => {
    if (diffResult) {
      const diffText = diffResult.map(change => change.value).join('');
      navigator.clipboard.writeText(diffText)
        .then(() => toast.success('Difference text copied to clipboard!'))
        .catch(() => toast.error('Failed to copy text'));
    }
  };

  const handleDownload = () => {
    if (diffResult) {
      const diffText = diffResult.map(change => {
        if (change.added) {
          return `+ ${change.value}`;
        } else if (change.removed) {
          return `- ${change.value}`;
        } else {
          return `  ${change.value}`;
        }
      }).join('\n');
      const blob = new Blob([diffText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'text_diff.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Difference text downloaded!');
    }
  };


  return (
    <div className={darkMode ? 'dark' : ''}>
      <Helmet>
        <title>Text Diff Online - Compare Text Online Free | String Diff Checker</title>
        <meta 
          name="description" 
          content="Free online diff tool to compare two texts and find differences instantly. Text comparison tool with real-time highlighting. Compare text online with our difference finder text checker - no signup required." 
        />
        <link rel="canonical" href="https://www.textdiffchecker.net/" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{`{ "@context":"https://schema.org", "@type":"SoftwareApplication", "name":"TextDiff", "url":"https://yourdomain.com", "description":"Compare two texts and highlight differences instantly." }`}</script>
      </Helmet>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h2><a href="https://www.textdiffchecker.net/" className="text-blue-600 dark:text-blue-400">TextDiff</a></h2>
              <nav className="flex gap-6 text-gray-600 dark:text-gray-400">
                <a href="https://www.textdiffchecker.net/" className="hover:text-gray-900 dark:hover:text-gray-100">
                  Home
                </a>
                <span>|</span>
                <a href="#about" className="hover:text-gray-900 dark:hover:text-gray-100">
                  About
                </a>
                <span>|</span>
                <a href="#tools" className="hover:text-gray-900 dark:hover:text-gray-100">
                  Tools
                </a>
              </nav>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-gray-900 dark:text-gray-100 mb-3">
              Text Difference Checker — Compare Texts Online
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Use our online diff tool to compare two texts and find changes instantly with real-time highlighting.
            </p>
          </div>

          {/* Sponsor Slot - Above the Fold */}
          <div 
            id="sponsor-top" 
            className="rounded-lg p-3 border border-dashed border-gray-300 dark:border-gray-700 text-center mb-8 bg-gray-50 dark:bg-gray-800/50"
          >
            <strong className="text-gray-700 dark:text-gray-300">Sponsored</strong>
            <span className="text-gray-600 dark:text-gray-400"> — Want to reach developers & writers? Email </span>
            <a href="mailto:sponsor@textdiff.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              sponsor@textdiffchecker.net
            </a>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 mb-6 text-green-700 dark:text-green-400">
            <ShieldCheck className="w-5 h-5" />
            <p className="text-sm">
              Everything runs locally in your browser. Text is not sent to any server.
            </p>
          </div>

          {/* Example Button */}
          <div className="text-center mb-6">
            <Button
              onClick={() => {
                const example = EXAMPLE_PAIRS[Math.floor(Math.random() * EXAMPLE_PAIRS.length)];
                setOriginalText(example.original);
                setModifiedText(example.modified);
                toast.success('Example text loaded! See the differences highlighted below.');
              }}
              variant="outline"
              className="border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Load Example Text
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Text Limit Warning */}
          {textLimitWarning && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{textLimitWarning}</span>
            </div>
          )}

          {/* Text Input Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="original" className="block mb-2 text-gray-700 dark:text-gray-300">
                Original Text
              </label>
              <textarea
                id="original"
                value={originalText}
                onChange={(e) => handleTextChange(e.target.value, setOriginalText)}
                className="w-full min-h-[160px] h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                placeholder="Enter original text here..."
              />
            </div>
            <div>
              <label htmlFor="modified" className="block mb-2 text-gray-700 dark:text-gray-300">
                Modified Text
              </label>
              <textarea
                id="modified"
                value={modifiedText}
                onChange={(e) => handleTextChange(e.target.value, setModifiedText)}
                className="w-full min-h-[160px] h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                placeholder="Enter modified text here..."
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Button
              onClick={handleSwap}
              variant="outline"
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Swap
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              Clear Both
            </Button>
            {diffResult && (
              <>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Result
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download.txt
                </Button>
              </>
            )}
          </div>

          {/* Results Section */}
          {diffResult && (
            <div className="mb-12" role="region" aria-live="polite" aria-label="Comparison results">
              <h3 className="mb-4 text-gray-900 dark:text-gray-100">Difference Results</h3>
              <DiffViewer diff={diffResult} darkMode={darkMode} />
            </div>
          )}

          {/* FAQ Section */}
          <div id="about" className="mt-20 mb-12">
            <h2 className="mb-6 text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">
                  What is a text diff tool?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A text diff tool (also called a string diff checker or difference finder text tool) is an online utility 
                  that compares two pieces of text and highlights the differences between them. Our text comparison tool 
                  shows additions in green and deletions in red, making it easy to see what has changed between versions.
                </p>
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">
                  Why use a text comparison tool?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A text comparison tool is essential for developers reviewing code changes, writers tracking document 
                  revisions, and anyone who needs to find changes in text quickly. Our online diff tool saves time by 
                  automatically highlighting differences, eliminating the need to manually compare two texts line by line.
                </p>
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">
                  How does this tool work?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Simply paste or type your original text in the left box and your modified text in the right box. 
                  Our text change checker instantly compares the texts in real-time and displays the differences below. 
                  Green highlights show added text, while red highlights show removed text. You can swap texts or clear 
                  both boxes anytime.
                </p>
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">
                  Is this free?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! Our text diff online tool is completely free to use. There are no hidden fees, no sign-up required, 
                  and no limits on how many times you can compare text online. Use our diff checker as much as you need.
                </p>
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">
                  Is my text saved?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No, your text is never saved or sent to any server. All text comparison happens directly in your browser, 
                  ensuring complete privacy and security. Your data stays on your device and is never stored or transmitted.
                </p>
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h2 className="mb-4 text-gray-900 dark:text-gray-100">
              Why Use Our Text Comparison Tool?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our <strong>text diff online</strong> tool is designed for anyone who needs to <strong>compare text online</strong> quickly 
              and accurately. Whether you're a developer using a <strong>string diff checker</strong> for code review, a writer tracking 
              document changes, or a student comparing essay versions, our <strong>difference finder text</strong> tool makes the 
              process effortless.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Unlike other <strong>online diff tools</strong>, ours provides real-time comparison as you type, so you don't need to 
              click a button to see results. The <strong>text change checker</strong> instantly highlights modifications, making it 
              easy to spot even the smallest changes when you <strong>compare two texts</strong>.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              With support for both light and dark modes, our <strong>diff checker</strong> is perfect for extended use. The color-coded 
              results make it instantly clear what's been added or removed. As a powerful <strong>text difference finder</strong>, 
              this tool streamlines your workflow and saves valuable time by helping you <strong>find changes in text</strong> with 
              just a glance.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Sponsor Slot - Footer */}
            <div 
              id="sponsor-footer" 
              className="rounded-lg p-3 border border-dashed border-gray-300 dark:border-gray-700 text-center mb-6 bg-gray-50 dark:bg-gray-800/50"
            >
              <strong className="text-gray-700 dark:text-gray-300">Sponsored</strong>
              <span className="text-gray-600 dark:text-gray-400"> — Want to reach developers & writers? Email </span>
              <a href="mailto:sponsor@textdiff.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                sponsor@textdiffchecker.net
              </a>
            </div>
            
            <div className="text-center text-gray-500 dark:text-gray-500">
              © 2025 TextDiff. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
