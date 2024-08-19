import ProductDetail from '@/components/ProductDetail/ProductDetail';
import { getProductById } from '@/helpers/product.helper';
import DetailProductProps from '@/interfaces/DetailProductProps';
import React from 'react'

const DetailProduct: React.FC<DetailProductProps> = async ({params}) => {
  const {productID} = params;
  const product = await getProductById(productID)

  return (
    <ProductDetail {...product} />
  )
}

export default DetailProduct