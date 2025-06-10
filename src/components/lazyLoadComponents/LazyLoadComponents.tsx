import '@/styles/atom-one-dark.scss'
import '@/styles/components/lazyLoadingComponents.scss'
import hljs from 'highlight.js'
import { lazy, Suspense, useEffect, useRef } from 'react'
import Loading from '../loading'

const LazyLoadingProduct = lazy(
  () => import('@/components/lazyLoadComponents/LazyLoadingProduct')
)

const LazyLoadComponents = () => {
  const lazyLoadComponentRef = useRef(null)
  useEffect(() => {
    if (lazyLoadComponentRef.current) {
      hljs.highlightBlock(lazyLoadComponentRef.current)
    }
  }, [])
  return (
    <div className="lazy_load">
      <div className="lazy_load__content">
        <h2>Lazy Load Components</h2>
        <p>
          Lazy loading components in React feels to me like a very nice pattern
          for better performance in our applications, especially when dealing
          with huge components or routes.
        </p>
        <p>
          The alternative is eager loading, which will load the needed
          components in advance. That means lazy loading reduces initial loading
          time and improves the user experience in general. Most of the
          components used in these examples are lazy loaded.
        </p>
        <h3 className="lazy_load__section_header">Example</h3>
        <p>
          In React, the process of lazy loading is implemented using
          React.lazy() and Suspense. Here's an example:
        </p>

        <pre>
          <code ref={lazyLoadComponentRef}>{`
const LazyLoadingProduct = lazy(() => import('@/components/lazyLoadComponents/LazyLoadingProduct'))
<Suspense fallback={<Loading />}>
  <LazyLoadingProduct />
</Suspense>
`}</code>
        </pre>
        <p>
          In this example, LazyLoadingProduct will only be fetched once it's
          rendered, and meanwhile, the user sees a fallback like "Loading…".
          This pattern is especially useful for components that are not
          immediately visible on the page (e.g., in routes or modals). It's a
          simple yet potent way for more app optimization, especially for those
          projects that are more involved.
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        <LazyLoadingProduct />
      </Suspense>
    </div>
  )
}
export default LazyLoadComponents
