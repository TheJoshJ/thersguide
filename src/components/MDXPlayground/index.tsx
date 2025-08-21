import React, { useState, useEffect, useMemo } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { MDXProvider } from '@mdx-js/react';
import styles from './styles.module.css';

// Safe component wrapper that catches rendering errors
const SafeComponent: React.FC<{ component: React.ComponentType<any>; props: any }> = ({ component: Component, props }) => {
  try {
    return <Component {...props} />;
  } catch (error) {
    console.error('Component rendering error:', error);
    return (
      <div className={styles.componentError}>
        <strong>⚠️ Component Error:</strong> Failed to render component
        <details>
          <summary>Error details</summary>
          <pre>{error instanceof Error ? error.message : 'Unknown error'}</pre>
        </details>
      </div>
    );
  }
};

// Error boundary component to catch any React errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught error:', error, errorInfo);
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h4>Rendering Error</h4>
          <p>Something went wrong while rendering your content.</p>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.message || 'Unknown error'}</pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced components object with fallbacks for undefined components
const createSafeComponents = () => {
  const baseComponents = {
    // Default HTML elements with error handling
    h1: (props: any) => <h1 {...props} />,
    h2: (props: any) => <h2 {...props} />,
    h3: (props: any) => <h3 {...props} />,
    h4: (props: any) => <h4 {...props} />,
    h5: (props: any) => <h5 {...props} />,
    h6: (props: any) => <h6 {...props} />,
    p: (props: any) => <p {...props} />,
    div: (props: any) => <div {...props} />,
    span: (props: any) => <span {...props} />,
    strong: (props: any) => <strong {...props} />,
    em: (props: any) => <em {...props} />,
    ul: (props: any) => <ul {...props} />,
    ol: (props: any) => <ol {...props} />,
    li: (props: any) => <li {...props} />,
    blockquote: (props: any) => <blockquote {...props} />,
    code: (props: any) => <code {...props} />,
    pre: (props: any) => <pre {...props} />,
    a: (props: any) => <a {...props} />,
    img: (props: any) => <img {...props} />,
    table: (props: any) => <table {...props} />,
    thead: (props: any) => <thead {...props} />,
    tbody: (props: any) => <tbody {...props} />,
    tr: (props: any) => <tr {...props} />,
    th: (props: any) => <th {...props} />,
    td: (props: any) => <td {...props} />,
  };

  // Create a proxy to handle undefined components
  return new Proxy(baseComponents, {
    get(target, prop: string) {
      if (prop in target) {
        return target[prop as keyof typeof target];
      }
      
      // Return a fallback component for undefined components
      return (props: any) => (
        <div className={styles.undefinedComponent}>
          <strong>⚠️ Undefined Component: {prop}</strong>
          <p>This component is not defined. You may need to import it or check the spelling.</p>
          <details>
            <summary>Component props</summary>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </details>
        </div>
      );
    }
  });
};

interface MDXPlaygroundProps {}

const MDXPlayground: React.FC<MDXPlaygroundProps> = () => {
  const [mdxCode, setMdxCode] = useState(`# Welcome to the MDX Playground

This is a **live** preview of your MDX content!

## Features

- Real-time rendering
- Full MDX syntax support
- Custom components (coming soon!)

Try editing the code on the left to see changes here.

### Example List

1. First item
2. Second item
3. Third item

> This is a blockquote with *emphasis*

\`\`\`javascript
console.log('Hello, MDX!');
\`\`\`

### Test Undefined Components

Try using undefined components like <H1>This won't crash</H1> - they'll show helpful warnings instead!
`);
  
  const [mdxModule, setMdxModule] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  // Create safe components with fallbacks
  const safeComponents = useMemo(() => createSafeComponents(), []);

  // Debounce compilation to avoid excessive re-rendering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      compileMDX(mdxCode);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [mdxCode]);

  const compileMDX = async (code: string) => {
    if (!code.trim()) {
      setMdxModule(null);
      setError(null);
      setRenderError(null);
      return;
    }

    setIsCompiling(true);
    setError(null);
    setRenderError(null);

    try {
      const result = await evaluate(code, {
        ...runtime,
        useMDXComponents: () => safeComponents,
      });
      setMdxModule(result);
    } catch (err) {
      console.error('MDX compilation error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setMdxModule(null);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleRenderError = (error: Error) => {
    console.error('Render error caught:', error);
    setRenderError(error.message);
  };

  const MDXContent = mdxModule?.default;

  return (
    <div className={styles.playground}>
      <div className={styles.editor}>
        <div className={styles.editorHeader}>
          <h3>MDX Editor</h3>
          <span className={styles.status}>
            {isCompiling ? 'Compiling...' : error ? 'Error' : 'Ready'}
          </span>
        </div>
        <textarea
          className={styles.codeEditor}
          value={mdxCode}
          onChange={(e) => setMdxCode(e.target.value)}
          placeholder="Write your MDX here..."
          spellCheck={false}
        />
        {error && (
          <div className={styles.editorError}>
            <strong>Compilation Error:</strong>
            <pre>{error}</pre>
            <div className={styles.errorHelp}>
              <strong>Common fixes:</strong>
              <ul>
                <li>Check for missing closing tags</li>
                <li>Verify component names are spelled correctly</li>
                <li>Ensure proper JSX syntax</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className={styles.preview}>
        <div className={styles.previewHeader}>
          <h3>Live Preview</h3>
          {(error || renderError) && (
            <span className={styles.errorIndicator}>
              {error ? 'Compilation Error' : 'Render Error'}
            </span>
          )}
        </div>
        <div className={styles.previewContent}>
          {error ? (
            <div className={styles.error}>
              <h4>Compilation Error</h4>
              <p>Your MDX code has syntax errors that prevent compilation.</p>
              <pre>{error}</pre>
              <div className={styles.errorHelp}>
                <strong>Common fixes:</strong>
                <ul>
                  <li>Check for missing closing tags</li>
                  <li>Verify component names are spelled correctly</li>
                  <li>Ensure proper JSX syntax</li>
                </ul>
              </div>
            </div>
          ) : renderError ? (
            <div className={styles.error}>
              <h4>Rendering Error</h4>
              <p>Your MDX compiled successfully but failed to render.</p>
              <pre>{renderError}</pre>
              <button 
                onClick={() => setRenderError(null)}
                className={styles.retryButton}
              >
                Try Rendering Again
              </button>
            </div>
          ) : MDXContent ? (
            <ErrorBoundary onError={handleRenderError}>
              <MDXProvider components={safeComponents}>
                <MDXContent />
              </MDXProvider>
            </ErrorBoundary>
          ) : (
            <div className={styles.placeholder}>
              Start typing to see your content here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MDXPlayground;
