import { pause } from '@/helpers/utils'
import Product from '@/types/product'
import { useCallback, useEffect, useState } from 'react'
import ProductList from '../productList'

type MainPresentationProps = {
  isSlow: boolean
  skip: number
  limit: number
  isError: boolean
}
export default function MainPresentation({
  skip,
  limit,
  isSlow,
  isError,
}: Readonly<MainPresentationProps>) {
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
        `https://dummyjson.com/products?skip=${skip}&limit=${limit}&select=id,title`,
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
