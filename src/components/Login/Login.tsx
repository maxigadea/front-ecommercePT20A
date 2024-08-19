'use client'

import { useAuth } from "@/context/AuthContext";
import { login } from "@/helpers/auth.helper";
import { validateLoginForm } from "@/helpers/validate";
import { ILoginError, ILoginProps } from "@/interfaces/Types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const Login = () => {
    const {setUserData} = useAuth()
    const router = useRouter();
    const initialState = {
        email: "",
        password: ""
    }
    const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
    const [errors, setErrors] = useState<ILoginError>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setDataUser({
            ...dataUser,
            [name]: value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const response = await login(dataUser)
        const {token, user} = response;
        const userData = {
            id: user.id,
            name: user.name,
            address: user.address,
            phone: user.phone,
            email: user.email,
            orders: user.orders
        }
        setUserData({token, userData})
        alert("You have logged successfully")
        router.push("/")
    }

    useEffect(() => {
        const errors = validateLoginForm(dataUser)
        setErrors(errors)
    }, [dataUser])

  return (
    <div>
        <div>
            <h1>Sign in to X Store</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email-address">Email:</label>
                <input 
                    id="email-address"    
                    name="email"    
                    type="email"
                    value={dataUser.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                />
                {
                    errors.email && <span>{errors.email}</span>
                }
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    id="password"    
                    name="password"    
                    type="password"
                    value={dataUser.password}
                    onChange={handleChange}
                    placeholder="*******"
                />
                {
                    errors.password && <span>{errors.password}</span>
                }
            </div>

            <div>
                <button disabled={errors.email ? true : false} type="submit">Sign in</button>
            </div>
        </form>
    </div>
  )
}

export default Login