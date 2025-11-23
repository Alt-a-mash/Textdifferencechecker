import * as Diff from 'diff';

self.onmessage = (e: MessageEvent) => {
  const { originalText, modifiedText } = e.data;
  
  try {
    const diff = Diff.diffWords(originalText, modifiedText);
    self.postMessage({ success: true, diff });
  } catch (error) {
    self.postMessage({ 
      success: false, 
      error: 'Failed to compare texts. Please try with smaller text.' 
    });
  }
};
