import IProduct from '@/interfaces/Product'
import React from 'react'

const Card:React.FC<IProduct> = ({name, price, image, description, id, stock, categoryId}) => {
  return (
    <div className='flex flex-row items-center rounded-lg bg-gray-200 text-surface shadow-secondary w-[340px] h-[260px] md:flex-row gap-4'>
        <img className='h-full max-h-[260px] w-full max-w-[180px] rounded-t-lg object-cover md:w-48' src={image} alt={`Imagen del producto ${name}`} />
        <div className='flex flex-col justify-start p-1 sm:p-4'>
          <h2 className='text-xl font-medium'>{name}</h2>
          <p className='mb-4 text-base'>Price: ${price}</p>
          <p className='text-xs text-surface'>Stock: {stock}</p>
        </div>
    </div>
  )
}

export default Card