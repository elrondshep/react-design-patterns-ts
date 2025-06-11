import '@/styles/atom-one-dark.scss'
import '@/styles/components/compoundComponent.scss'
import hljs from 'highlight.js'
import { useEffect, useRef, useState } from 'react'
import Card from './Card'

export default function CompoundExample() {
  const [cardIndex, setCardIndex] = useState<number>(0)
  const firstComponentRef = useRef(null)
  const secondComponentRef = useRef(null)
  const thirdComponentRef = useRef(null)
  const fourthComponentRef = useRef(null)
  const fifthComponentRef = useRef(null)

  useEffect(() => {
    if (firstComponentRef.current) {
      hljs.highlightBlock(firstComponentRef.current)
    }
    if (secondComponentRef.current) {
      hljs.highlightBlock(secondComponentRef.current)
    }
    if (thirdComponentRef.current) {
      hljs.highlightBlock(thirdComponentRef.current)
    }
    if (fourthComponentRef.current) {
      hljs.highlightBlock(fourthComponentRef.current)
    }
    if (fifthComponentRef.current) {
      hljs.highlightBlock(fifthComponentRef.current)
    }
  }, [])
  return (
    <div className="compound_component">
      <div className="compound_component__content">
        <h2>Compound Components</h2>
        <p>
          The Compound Components Pattern is a React design pattern for managing
          parent components that are made up of child components. The principle
          behind this pattern is to break down the parent component into smaller
          components and then manage the interactions between these smaller
          components with either props, context or other react data management
          techniques. This pattern comes in handy when there is a need to create
          reusable, versatile components made up of smaller components. It
          enables developers to create sophisticated UI components that can be
          readily customized and extended while maintaining a clear and simple
          code structure.
        </p>
        <p className="compound_component__section_header">When to use</p>
        <ul>
          <li>
            When you need to create components that depend on each other and
            perform better when grouped together.
          </li>
          <li>
            To build highly customizable and flexible components that can adapt
            to different use cases.
          </li>
          <li>
            When you want to maintain a clear and organized component structure
            in the React component tree hierarchy.
          </li>
        </ul>
        <p className="compound_component__section_header">When not to use</p>
        <ul>
          <li>
            In cases where the relationship between components is not close or
            there is no clear dependency between them.
          </li>
          <li>
            In situations where the added complexity of the Compound Components
            pattern does not justify its benefits.
          </li>
        </ul>
        <p className="compound_component__section_header">Advantages</p>
        <ul>
          <li>
            Facilitates encapsulation and reuse of related logic in a set of
            components.
          </li>
          <li>
            Provides a clear and consistent API for interacting with compound
            components.
          </li>
          <li>
            Allows for greater flexibility and customization by combining
            multiple components into one.
          </li>
        </ul>
        <p className="compound_component__section_header">Disadvantages</p>

        <ul>
          <li>
            Can introduce additional complexity in understanding how components
            interact with each other.
          </li>
          <li>
            Requires careful design to ensure that compound components are
            flexible and easy to use.
          </li>
        </ul>
        <h3 className="compound_component__section_header">Example</h3>
        <p>
          Below is an example of a product card. The product card has various
          details for the product, such as, the title, description, price, and
          so on.{' '}
        </p>
        <pre>
          <code ref={firstComponentRef}>{`
const ProductCard = () => {
  const product = useProductContext()
  return (
    <div className="product_card">
      <span className="product_card__title">{product.title}</span>
      <p className="product_card__description">{product.description}</p>
      <span className="product_card__price">{product.price}</span>
      <div>
        <span className="product_card__category__title">Category:</span>
        <span className="product_card__category__content">
          {product.category}
        </span>
      </div>
      <div className="product_card__tags">
        {product.tags.map((tag, idx) => (
          <span key={idx} className="product_card__tags__tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
export default ProductCard
`}</code>
        </pre>
        <p>
          What if there is a need to use this product card component and not
          show the tags, or the category? We could pass in a boolean property to
          display content base on it's state.
        </p>

        <pre>
          <code ref={secondComponentRef}>{`
type ProductCardProps = {
  displayCategory?: boolean
  displayTags?: boolean
}
const ProductCard = ({displayCategory=false, displayTags=false}: ProductCardProps) => {
  const product = useProductContext()
  return (
    <div className="product_card">
      <span className="product_card__title">{product.title}</span>
      <p className="product_card__description">{product.description}</p>
      <span className="product_card__price">{product.price}</span>
      {displayCategory && (
        <div>
          <span className="product_card__category__title">Category:</span>
          <span className="product_card__category__content">
            {product.category}
          </span>
        </div>
      )}
      {displayTags && (
        <div className="product_card__tags">
          {product.tags.map((tag, idx) => (
            <span key={idx} className="product_card__tags__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
export default ProductCard
`}</code>
        </pre>
        <p>
          What if we need to display the category above the title? Or, handle
          displaying even more combinations of data? The properties could get
          out of hand quickly. Thankfully there is a better approach to this,
          and that approach is the compound component design pattern. The first
          step is to break up each piece into it's own component. The title will
          be it's own component, the description, category, and so on. We will
          create these children components using the compound component design
          pattern.
        </p>

        <pre>
          <code ref={thirdComponentRef}>{`
type CardProps = {
  product: Product
  children: ReactNode
}
const ProductCard = ({ product, children }: CardProps) => {
  return (
    <ProductProvider product={product}>
      <div className="product_card">{children}</div>
    </ProductProvider>
  )
}

ProductCard.Price = () => {
  const product = useProductContext()
  return <span className="product_card__price">{product.price}</span>
}
ProductCard.Title = () => {
  const product = useProductContext()
  return <span className="product_card__title">{product.title}</span>
}
ProductCard.Description = () => {
  const product = useProductContext()
  return <p className="product_card__description">{product.description}</p>
}
ProductCard.Category = () => {
  const product = useProductContext()
  return (
    <div>
      <span className="product_card__category__title">Category:</span>
      <span className="product_card__category__content">
        {product.category}
      </span>
    </div>
  )
}
ProductCard.Tags = () => {
  const product = useProductContext()
  return (
    <div className="product_card__tags">
      {product.tags.map((tag, idx) => (
        <span key={idx} className="product_card__tags__tag">
          {tag}
        </span>
      ))}
    </div>
  )
}

export default ProductCard
`}</code>
        </pre>
        <p>
          You can see that we have created children components for the card
          using the naming convention as <code>{`Card.Title`}</code>,{' '}
          <code>{`Card.Description`}</code>, and so on. Each child component
          needs the product provided to the parent in order to display the
          informaiton they are responsible for. In this example we created a
          context provider that we wrap around all the children and now each
          child has access to the product data using the custom hook for context
          provider.
        </p>
        <pre>
          <code ref={fourthComponentRef}>{`
const ProductContext = createContext<Product | undefined>(undefined)

type ProductProviderProps = {
  children: ReactNode
  product: Product
}

const ProductProvider = ({ children, product }: ProductProviderProps) => {
  return (
    <ProductContext.Provider value={product}>
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
          Now we have the product card component transformed into a compound
          component where it has been broken down into smaller components. Now
          we can use this compound component in various ways.
        </p>
        <pre>
          <code ref={fifthComponentRef}>{`
<ProductCard>
  <ProductCard.Title />
  <ProductCard.Description />
  <ProductCard.Price />
  <ProductCard.Category />
  <ProductCard.Tags />
</ProductCard>
`}</code>
        </pre>
        <p>
          Each example below shows this compound component being used in various
          ways: displaying children in different places, hiding child
          components, and so on.
        </p>
      </div>
      <div className="compound_component__buttons">
        <button
          className="compound_component__buttons__button"
          onClick={() => setCardIndex(0)}
        >
          Card One
        </button>
        <button
          className="compound_component__buttons__button"
          onClick={() => setCardIndex(1)}
        >
          Card Two
        </button>
        <button
          className="compound_component__buttons__button"
          onClick={() => setCardIndex(2)}
        >
          Card Three
        </button>
      </div>
      <div className="compound_component__container">
        {cardIndex === 0 && (
          <Card>
            <Card.Title />
            <Card.Description />
            <Card.Price />
            <Card.Category />
            <Card.Tags />
          </Card>
        )}
        {cardIndex === 1 && (
          <Card>
            <Card.Title />
            <Card.Description />
            <Card.Price />
          </Card>
        )}
        {cardIndex === 2 && (
          <Card>
            <Card.Tags />
            <Card.Title />
            <Card.Description />
          </Card>
        )}
      </div>
    </div>
  )
}
