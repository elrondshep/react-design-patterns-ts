import '@/styles/atom-one-dark.scss'
import '@/styles/components/containerPresentationComponent.scss'
import hljs from 'highlight.js'
import { useEffect, useRef, useState } from 'react'
import MainPresentation from './MainPresentation'

export default function ContainerPresentation() {
  const [fetchIndex, setFetchIndex] = useState<number>(0)
  const componentRef = useRef(null)
  useEffect(() => {
    if (componentRef.current) {
      hljs.highlightBlock(componentRef.current)
    }
  }, [])
  return (
    <div className="container_presentation">
      <div className="container_presentation__content">
        <h2>Container and presentation patterns</h2>
        <p>
          The Container and presentation pattern is a pattern that aims to
          separate the presentation logic from the business logic in a react
          code, thereby making it modular, testable, and one that follows the
          separations of concern principle. Mostly in react applications, there
          arise cases where we are required to fetch data from a backend/store,
          or to have some compute logic, and represent the result of that
          computation on a react component. In these cases, the container and
          presentation pattern shines as it can be used to categorize the
          components into two namely:
        </p>
        <ul>
          <li>
            Container Component: The container component, which acts as the
            component responsible for the data fetching or computation.
          </li>
          <li>
            Presentation Component: Responsible for rendering the fetched data
            or computed value on the UI (user interface) in it's different
            states.
          </li>
        </ul>
        <h3 className="container_presentation__section_header">Example</h3>
        <p>
          You can see in the code below, we fetch the product and set various
          states during this process which is all provided to the component that
          can use it to render those different states and the eventual outcome
          whether it is an error or the data that was fetched.
        </p>
        <pre>
          <code ref={componentRef}>{`
type MainPresentationProps = {
  isSlow: boolean
  skip: number
  limit: number
  isError: boolean
}
const MainPresentation = ({
  skip,
  limit,
  isSlow,
  isError,
}: MainPresentationProps) => {
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
  return <ProductList loading={isLoading} error={error} products={products} />
}

export default MainPresentation
`}</code>
        </pre>
        <p>
          Below is an example of this pattern in action. This shows a list of
          products and presents different views based onthe state of fetching
          those products. The product list component has three props: loading,
          error, and products.
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

      <div className="container_presentation__buttons">
        <button
          className="container_presentation__buttons__button"
          onClick={() => setFetchIndex(0)}
        >
          Success
        </button>
        <button
          className="container_presentation__buttons__button"
          onClick={() => setFetchIndex(1)}
        >
          Error
        </button>
        <button
          className="container_presentation__buttons__button"
          onClick={() => setFetchIndex(2)}
        >
          Slow Load
        </button>
      </div>
      <MainPresentation
        skip={fetchIndex}
        limit={10}
        isSlow={fetchIndex === 2}
        isError={fetchIndex === 1}
      />
    </div>
  )
}
