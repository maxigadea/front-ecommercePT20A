'use client'
import IProduct from '@/interfaces/Product'
import { userSession } from '@/interfaces/Types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProductDetail:React.FC<IProduct> = ({name, image, description, stock, id, price, categoryId}) => {
  const router = useRouter()
  const [userSession, setUserSession] = useState<userSession>()
  
  useEffect(() => {
    const userSessionLocal = localStorage.getItem("userSession")
    setUserSession(JSON.parse(userSessionLocal!))
  }, [])

  const handleClick = () => {
    if(!userSession?.token) {
      alert("You must be logged in")
      router.push("/login")
    } else {
      const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]")
      const productExist = cart.some((product: IProduct) => {
        if(product.id === id) return true;
        return false
      })
      if(productExist) {
        alert('This product exist in your cart')
        router.push("/cart")
      } else {
        cart.push({
          name,
          description,
          image,
          price,
          stock,
          id,
          categoryId
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        alert("Product added to your cart")
        router.push("/cart")
      }
    }
  }

  return (
    <div>
        <h2>{name}</h2>
        <img src={image} alt="Imagen del producto" />
        <p>{description}</p>
        <p>PRICE: ${price} </p>
        <p>STOCK: {stock}</p>
        <button onClick={handleClick}>Add to cart</button>
    </div>
  )
}

export default ProductDetail