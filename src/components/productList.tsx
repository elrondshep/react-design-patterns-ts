// Container and presentation patterns
import Product from '@/types/product'
import Loading from './loading'

interface ProductListProps {
  loading: boolean
  error: boolean
  products: Product[]
}

const ProductList = ({ loading, error, products }: ProductListProps) => {
  if (loading && !error) return <Loading />
  if (!loading && error) return <div>Error fetching products.</div>
  if (!products) return null

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  )
}

export default ProductList
