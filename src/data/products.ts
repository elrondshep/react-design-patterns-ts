import Product from '@/types/product'

export const exampleProduct: Product = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description:
    'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
  category: 'beauty',
  rating: 2.56,
  price: 9.99,
  tags: ['beauty', 'mascara'],
}

export const exampleProducts: Product[] = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    category: 'beauty',
    rating: 2.56,
    price: 9.99,
    tags: ['beauty', 'mascara'],
  },
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    description: `The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.`,
    category: 'beauty',
    rating: 2.86,
    price: 19.99,
    tags: ['beauty', 'eyeshadow'],
  },
  {
    id: 3,
    title: 'Powder Canister',
    description:
      'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
    category: 'beauty',
    rating: 4.64,
    price: 14.99,
    tags: ['beauty', 'face powder'],
  },
]
