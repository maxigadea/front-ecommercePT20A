'use client'

import { useAuth } from "@/context/AuthContext";
import { getOrders } from "@/helpers/orders.helper";
import IProduct from "@/interfaces/Product";
import { IOrder, userSession } from "@/interfaces/Types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrdersPage = () => {
    const {userData} = useAuth()
    const router = useRouter();
    const [Orders, setOrders] = useState<IOrder[]>([]);
    

    const fetchData = async () => {
        const ordersResponse = await getOrders(userData?.token!)
       setOrders(ordersResponse)
    }

    useEffect(() => {
     if(userData?.userData.name) {
        userData?.userData.name === undefined ? router.push("/login") : fetchData()
     }
    }, [userData?.userData])


  return (
    <div className="w-full items-center justify-around flex flex-row ">
        <div>
            {
                Orders && Orders.length > 0 ? (
                        Orders?.map((item) => {
                            return (
                                <div key={item.id}> 
                                    <p>{new Date(item.date)?.toDateString() }</p>
                                    <p>Status: {item.status.toLocaleUpperCase()}</p>
                                </div>
                            )
                        })
                ) : (
                    <div> 
                        <p>You dont have any products in your Orders</p>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default OrdersPage