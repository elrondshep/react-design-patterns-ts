import { useProductContext } from '@/providers/productProvider'
import '@/styles/components/productCard.scss'

export default function LazyLoadingProduct() {
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
