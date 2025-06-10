import '@/styles/atom-one-dark.scss'
import '@/styles/components/providersComponent.scss'
import hljs from 'highlight.js'
import { useEffect, useRef } from 'react'

const ProvidersExample = () => {
  const code1Ref = useRef(null)
  const code2Ref = useRef(null)
  const code3Ref = useRef(null)
  const code4Ref = useRef(null)

  useEffect(() => {
    if (code1Ref.current) {
      hljs.highlightBlock(code1Ref.current)
    }
    if (code2Ref.current) {
      hljs.highlightBlock(code2Ref.current)
    }
    if (code3Ref.current) {
      hljs.highlightBlock(code3Ref.current)
    }
    if (code4Ref.current) {
      hljs.highlightBlock(code4Ref.current)
    }
  }, [])
  return (
    <div className="providers">
      <div className="providers__content">
        <h2>Data management with Providers</h2>
        <p>
          The provider pattern is very useful for data management as it utilizes
          the context API to pass data through the application's component tree.
          This pattern is an effective solution to prop drilling, which has been
          a common concern in react development.
        </p>
        <p>
          To implement the provider pattern, we will first create a Provider
          Component. A Provider is a higher-order component that the Context
          object provides to us. We can construct a Context object by utilizing
          the createContext method provided by React.
        </p>
        <p>
          In the compound component example we created a provider so we could
          pass the product to all the siblings. This way we won't have to pass
          the product from the grandparent, to the parent, and then to the the
          children as that would be prop drilling. Now we can simplay pass the
          product we want to display to the product card and then share that to
          all the children through the ProductProvider.
        </p>
        <p>
          Below is the provider we created to use in the productCard component
          for all it's children.
        </p>
        <pre>
          <code ref={code1Ref}>{`
import { exampleProducts } from '@/data/products'
import Product from '@/types/product'
import { createContext, ReactNode, useContext, useMemo } from 'react'

const ProductContext = createContext<Product>(exampleProducts[0])

type ProductProviderProps = {
  children: ReactNode
  productIndex: number
}

const ProductProvider = ({ children, productIndex }: ProductProviderProps) => {
  const currentProduct = useMemo(() => {
    return exampleProducts[productIndex]
  }, [productIndex])

  return (
    <ProductContext.Provider value={currentProduct}>
      {children}
    </ProductContext.Provider>
  )
}

const useProductContext = () => {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within an ProductProvider')
  }
  return context
}

export { ProductProvider, useProductContext }
`}</code>
        </pre>
        <p>
          We first define the context of the data we want to share and we
          initlalize it with the first product in the set. The products in this
          example are hard coded in an array, so we fetch the products needed by
          using the array index.
        </p>
        <pre>
          <code ref={code4Ref}>{`
const ProductContext = createContext<Product>(exampleProducts[0])
        `}</code>
        </pre>
        <p>
          We then create a provider that we can wrap around the children that
          need access to the data in the context. We don't need to do this. We
          could just use the <code>{`ProductContext.Provider`}</code> around our
          children components. It's good practice to use the{' '}
          <code>{`useMemo`}</code> hook as this provider will re-render
          everytime the parent renders. By using this hook, if the data does not
          change we won't reset it. You can learn more about memoization in that
          section.
        </p>
        <p>
          We then create a custom hook for the context. Again, we don't need to
          do this as we could just use the <code>{`useContext`}</code> hook in
          the parent component. It is good practice to provide a custom hook for
          this though so we can check for an error in accessing the context and
          handle it appropriately.
        </p>
        <p>
          We then return the provider and custom hook we created. We can then
          use the provider and the custom hook in the following way.
        </p>
        <pre>
          <code ref={code2Ref}>{`
const Card = ({ children, productIdx = 0 }: CardProps) => {
return (
  <ProductProvider productIndex={productIdx}>
    <div className="product_card">{children}</div>
  </ProductProvider>
)
}`}</code>
        </pre>
        <p>The custom hook is used in the child component.</p>
        <pre>
          <code ref={code3Ref}>{`
Card.Price = () => {
  const product = useProductContext()
  return <span className="product_card__price">{product.price}</span>
}
}`}</code>
        </pre>
      </div>
    </div>
  )
}

export default ProvidersExample
