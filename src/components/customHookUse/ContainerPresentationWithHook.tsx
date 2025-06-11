import '@/styles/atom-one-dark.scss'
import '@/styles/components/customHook.scss'
import hljs from 'highlight.js'
import { useEffect, useRef, useState } from 'react'
import ProductList from '../productList'
import useFetchProducts from './useFetchProducts'

export default function ContainerPresentationWithHook() {
  const [fetchIndex, setFetchIndex] = useState<number>(0)
  const { products, isLoading, error } = useFetchProducts({
    skip: fetchIndex,
    limit: 10,
    isSlow: fetchIndex === 2,
    isError: fetchIndex === 1,
  })
  const componentWithHookRef = useRef(null)
  const componentUsingHookRef = useRef(null)

  useEffect(() => {
    if (componentWithHookRef.current) {
      hljs.highlightBlock(componentWithHookRef.current)
    }
    if (componentUsingHookRef.current) {
      hljs.highlightBlock(componentUsingHookRef.current)
    }
  }, [])
  return (
    <div className="custom_hook">
      <div className="custom_hook__content">
        <h2>Component composition with Hooks</h2>
        <p>
          Hooks are basic functions that grant functional components access to
          state and lifecycle methods. We can now isolate all stateful logic and
          compose or use it in the components using custom hooks. As a result,
          the code is more modularized and testable because the hooks are
          loosely tied to the component and can therefore be tested separately.
        </p>
        <p>
          In the first part of the container and presentation pattern we learned
          how the logic is in the container component. A better way of
          implementing this, depending on the context, is to separate that logic
          to another file. In this example we moved that logic to a custom hook.
          With this further separation we can use the custom hook in other
          components that needs a list of products.
        </p>
        <p>
          A custom hook needs to have the same naming convention as react hooks
          using the 'use' prefix and should be descriptive to it's function. In
          this example the name of the custom hook is{' '}
          <code>useFetchProducts</code>. The container component brings in this
          custom hook to fetch the products. You can see that the results are
          all the same but the logic is separated out more and can be reused.
        </p>
        <p className="custom_hook__section_header">When to use it</p>
        <ul>
          <li>
            When you need to share logic between React components without
            resorting to code duplication.
          </li>
          <li>
            To abstract the complex logic of a component and keep it more
            readable and easier to maintain.
          </li>
          <li>
            When you need to modularize the logic of a component to facilitate
            its unit testing.
          </li>
        </ul>
        <p className="custom_hook__section_header">When not to use it</p>
        <ul>
          <li>
            When the logic is specific to a single component and will not be
            reused elsewhere.
          </li>
          <li>
            When the logic is simple and does not justify the creation of a
            Custom Hook.
          </li>
        </ul>
        <p className="custom_hook__section_header">Advantages</p>
        <ul>
          <li>
            Promotes code reuse by encapsulating common logic in separate
            functions.
          </li>
          <li>
            Facilitates code composition and readability by separating logic
            from the component.
          </li>
          <li>
            Improves testability by enabling more specific and focused unit
            tests on the logic encapsulated in Custom Hooks.
          </li>
        </ul>
        <p className="custom_hook__section_header">Disadvantages</p>
        <ul>
          <li>
            May result in additional complexity if abused and many Custom Hooks
            are created.
          </li>
          <li>
            Requires a solid understanding of React and Hooks concepts for
            proper implementation.
          </li>
        </ul>
        <h3 className="custom_hook__section_header">Example</h3>
        <p>
          You can see in the code below, we fetch the product and set various
          states during this process. This is the same logic in the previous
          section for 'Container Presentation' but it is in a separate file as a
          custom hook. In the later example we use this hook in the same
          'Container Presentation' component which is provided all the necessary
          properties it had before but through the custom hook.
        </p>
        <pre>
          <code ref={componentWithHookRef}>{`
type UseFetchProductsProps = {
  isSlow: boolean
  skip: number
  limit: number
  isError: boolean
}
export const useFetchProducts = ({
  skip,
  limit,
  isSlow,
  isError,
}: UseFetchProductsProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const controller = new AbortController()

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(false)
    try {
      if (isSlow) await pause(2000)
      if (isError) throw new Error('Error fetching products.')
      const response = await fetch(
        \`https://dummyjson.com/products?skip=\${skip}&limit=\${limit}&select=id,title\`,
        { signal: controller.signal }
      )
      const data = await response.json()
      setIsLoading(false)
      if (!data) return
      setProducts(data.products)
    } catch (err: any) {
      setError(true)
      setIsLoading(false)
      console.log(err.message)
    }
  }, [skip])

  useEffect(() => {
    fetchProducts()
    return () => {
      controller.abort()
    }
  }, [fetchProducts])

  return { products, isLoading, error }
}
`}</code>
        </pre>
        <p>
          This is the component that uses the custom hook. You can see that we
          can get all the necessary state properties that is exported in the
          custom hook and pass them to the 'ProductList' component.
        </p>
        <pre>
          <code ref={componentUsingHookRef}>{`
const { products, isLoading, error } = useFetchProducts({
  skip: fetchIndex,
  limit: 10,
  isSlow: fetchIndex === 2,
  isError: fetchIndex === 1,
})
export const MainPresentation = () => {
  return <ProductList loading={isLoading} error={error} products={products} />
}

export default MainPresentation
`}</code>
        </pre>
        <p>
          Below is an example of this pattern. This shows a list of products and
          presents different views based onthe state of fetching those products.
          The product list component has three props: loading, error, and
          products.
        </p>
        <ul>
          <li>
            Loading: The loading state from the custom hook that identifies the
            state of fetching the products. Loading is true if the fetch is in
            progress and false ifthe fetch is finished.
          </li>
          <li>
            Error: The error, if any, that may have happened during the fetching
            process. It will contain a message of the error and if it's set then
            the loading state is also false as the fetching is complete, just
            with an error.
          </li>
          <li>
            Products: This is an array of products that is returned from the
            fetch. This would only be set if there is no error. The loading
            state is false as the fetching is complete.
          </li>
        </ul>
        <p>
          Select a button to see an example of each state. There are three
          examples: success, error, slow.
        </p>
        <ul>
          <li>
            Success: This shows the successful fetch of products with a limit of
            10 products from the first set starting at index 0 (skip & limit).
          </li>
          <li>
            Error: This shows an example of when the fetching of products fail.
          </li>
          <li>
            Slow: This shows the successful fetch of products with a limit of 10
            products from the third set starting at index 2 (skip & limit) that
            takes up to 2 seconds. This allows you to better see the loading
            indicator.
          </li>
        </ul>
      </div>

      <div className="custom_hook__buttons">
        <button
          className="custom_hook__buttons__button"
          onClick={() => setFetchIndex(0)}
        >
          Success
        </button>
        <button
          className="custom_hook__buttons__button"
          onClick={() => setFetchIndex(1)}
        >
          Error
        </button>
        <button
          className="custom_hook__buttons__button"
          onClick={() => setFetchIndex(2)}
        >
          Slow Load
        </button>
      </div>
      <ProductList loading={isLoading} error={error} products={products} />
    </div>
  )
}
