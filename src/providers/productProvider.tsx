import { exampleProducts } from '@/data/products'
import Product from '@/types/product'
import { createContext, ReactNode, useContext, useMemo } from 'react'

const ProductContext = createContext<Product>(exampleProducts[0])

type ProductProviderProps = {
  children: ReactNode
  productIndex: number
}

export function ProductProvider({
  children,
  productIndex,
}: Readonly<ProductProviderProps>) {
  const currentProduct = useMemo(() => {
    return exampleProducts[productIndex]
  }, [productIndex])

  return (
    <ProductContext.Provider value={currentProduct}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within an ProductProvider')
  }
  return context
}
