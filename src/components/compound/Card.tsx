import { ProductProvider, useProductContext } from '@/providers/productProvider'
import '@/styles/components/productCard.scss'

type CardProps = {
  productIdx?: number
  children: React.ReactNode
}

export default function Card({
  children,
  productIdx = 0,
}: Readonly<CardProps>) {
  return (
    <ProductProvider productIndex={productIdx}>
      <div className="product_card">{children}</div>
    </ProductProvider>
  )
}

Card.Price = () => {
  const product = useProductContext()
  return <span className="product_card__price">{product.price}</span>
}
Card.Title = () => {
  const product = useProductContext()
  return <span className="product_card__title">{product.title}</span>
}
Card.Description = () => {
  const product = useProductContext()
  return <p className="product_card__description">{product.description}</p>
}
Card.Category = () => {
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
Card.Tags = () => {
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
