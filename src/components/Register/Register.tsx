'use client'

import { register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validate";
import { TRegisterError, IRegisterProps } from "@/interfaces/Types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const Register = () => {
    const router = useRouter();
    const initialState = {
        email: "",
        password: "",
        name: "",
        address: "",
        phone: ""
    }
    const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
    const [errors, setErrors] = useState<TRegisterError>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setDataUser({
            ...dataUser,
            [name]: value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       
        await register(dataUser)
        alert("You have registered successfully")
        router.push("/login")
    }

    useEffect(() => {
        const errors = validateRegisterForm(dataUser)
        setErrors(errors)
    }, [dataUser])

  return (
    <div>
        <div>
            <h1>Register to X Store</h1>
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
                <label htmlFor="name">Name:</label>
                <input 
                    id="name"    
                    name="name"    
                    type="text"
                    value={dataUser.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                />
                {
                    errors.name && <span>{errors.name}</span>
                }
            </div>

            <div>
                <label htmlFor="address">Address:</label>
                <input 
                    id="address"    
                    name="address"    
                    type="text"
                    value={dataUser.address}
                    onChange={handleChange}
                    placeholder="Posadas, M4"
                />
                {
                    errors.address && <span>{errors.address}</span>
                }
            </div>

            <div>
                <label htmlFor="phone">Cel:</label>
                <input 
                    id="phone"    
                    name="phone"    
                    type="text"
                    value={dataUser.phone}
                    onChange={handleChange}
                    placeholder="011-232323"
                />
                {
                    errors.phone && <span>{errors.phone}</span>
                }
            </div>

            <div>
                <button disabled={errors.email ? true : false} type="submit">Register</button>
            </div>
        </form>
    </div>
  )
}

export default Register