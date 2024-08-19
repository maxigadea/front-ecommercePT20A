import React from 'react'
import Card from '../Card/Card';
import { getProductsDB } from '@/helpers/product.helper';
import Link from 'next/link';

const CardList = async () => {
const products = await getProductsDB()
  return (
    <div className='flex flex-wrap items-center p-4 gap-4 justify-center'>
        {
            products && 
            products?.map((product) => {
                return (
                  <Link href={`/product/${product.id}`} key={product.id}>
                    <Card key={product.id} {...product} />
                  </Link>
                    
                )
            })
        }
    </div>
  )
}

export default CardList