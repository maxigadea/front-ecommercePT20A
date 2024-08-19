'use client'

import { createOrder } from "@/helpers/orders.helper";
import IProduct from "@/interfaces/Product";
import { userSession } from "@/interfaces/Types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
    const router = useRouter();
    const [userSession, setUserSession] = useState<userSession>()
    const [cart, setCart] = useState<IProduct[]>([]);
    const [totalCart, setTotalCart] = useState<number>(0)
    
    useEffect(() => {
      const userSessionLocal = localStorage.getItem("userSession")
      setUserSession(JSON.parse(userSessionLocal!))
    }, [])
  
     
    useEffect(() => {
        const cartProducts: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]")
        if(cartProducts) {
            let totalCart = 0;
            cartProducts.map((item: IProduct) => {
                totalCart = totalCart + item.price
            })
            setTotalCart(totalCart)
            setCart(cartProducts)
        }
      }, [])

    useEffect(() => {
     if(userSession?.userData.name) {
      userSession?.userData.name === undefined && router.push("/login")
     }
    }, [userSession?.userData])

    const handleClick = async () => {
        const idProducts = cart?.map((product) => product.id)
        await createOrder(idProducts, userSession?.token!)
        alert("Buy succesfully")
        setCart([])
        setTotalCart(0)
        localStorage.setItem("cart", "[]")
    }

  return (
    <div className="w-full items-center justify-around flex flex-row ">
        <div>
            {
                cart && cart.length > 0 ? (
                        cart?.map((item: IProduct) => {
                            return (
                                <div key={item.id}> 
                                    <p>{item.name}</p>
                                    <p>Price: {item.price}</p>
                                </div>
                            )
                        })
                ) : (
                    <div> 
                        <p>You dont have any products in your cart</p>
                    </div>
                )
            }
        </div>

        <div>
            <p>Total: ${totalCart}</p>
            <button onClick={handleClick}>Checkout</button>
        </div>

    </div>
  )
}

export default CartPage