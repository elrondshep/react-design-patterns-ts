import '@/styles/atom-one-dark.scss'
import '@/styles/components/memoization.scss'
import hljs from 'highlight.js'
import { useEffect, useRef } from 'react'

export default function MemoizationComponent() {
  const memoComponentRef = useRef(null)
  const useMemoRef = useRef(null)
  const useCallbackRef = useRef(null)
  useEffect(() => {
    if (memoComponentRef.current) {
      hljs.highlightBlock(memoComponentRef.current)
    }
    if (useMemoRef.current) {
      hljs.highlightBlock(useMemoRef.current)
    }
    if (useCallbackRef.current) {
      hljs.highlightBlock(useCallbackRef.current)
    }
  }, [])
  return (
    <div className="memoization">
      <div className="memoization__content">
        <h2>Memoization Patterns</h2>
        <p>
          Memoization is a technique used to optimize the performance of
          recursive algorithms by storing the results of computationally
          expensive function calls. When the same input arguments are passed to
          the function again, the stored result is retrieved rather than
          recomputing it. This technique is a form of dynamic programming,
          specifically a "top-down" approach.
        </p>
        <p>
          In React, this pattern is often used to avoid re-rendering components
          or computing a complicated value for ever re-render. The memoization
          patterns in React are: React.memo, useMemo, and useCallback. These are
          great tools for optimization, avoiding unnecessary re-renders that can
          be quite a performance cost.
        </p>
        <p>
          Some of these patterns are used in the context providers and data
          fetching functionality in the various components used through out
          here.
        </p>
        <p className="compound_component__section_header">React.memo</p>
        <p>
          This is a higher-order component that wraps around functional
          components and forbids them from re-rendering unless their props
          change. It can come in really handy while working with components that
          require a re-render based on some particular props update.
        </p>
        <pre>
          <code ref={memoComponentRef}>{`
const MyComponent = React.memo(({ count }) => {
  console.log("Component rendered");
  return <div>{count}</div>;
});
`}</code>
        </pre>
        <p className="compound_component__section_header">useMemo</p>
        <p>
          This hook memoizes the result of a function so that it will only be
          recomputed if its dependencies have been changed. It's useful for
          expensive computations where the result does not need to be
          recalculated on every render.
        </p>
        <pre>
          <code ref={useMemoRef}>{`
const expensiveCalculation = (num) => {
  console.log("Calculating...");
  return num * 2;
};

const MyComponent = ({ number }) => {
  const calculatedValue = useMemo(
    () => expensiveCalculation(number),
    [number],
  );

  return <div>{calculatedValue}</div>;
};
`}</code>
        </pre>
        <p className="compound_component__section_header">useCallback</p>
        <p>
          This hook is quite like useMemo but for memoizing functions. This one
          comes in handy when you have to pass down callbacks into child
          components in such a manner that they do not get recreated on every
          render of the parent component.
        </p>
        <pre>
          <code ref={useCallbackRef}>{`
const MyComponent = ({ handleClick }) => {
  console.log("Component rendered");
  return <button onClick={handleClick}>Click me</button>;
};

const ParentComponent = () => {
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  return <MyComponent handleClick={handleClick} />;
};
`}</code>
        </pre>
      </div>
    </div>
  )
}
