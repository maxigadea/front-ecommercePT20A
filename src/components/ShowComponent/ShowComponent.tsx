'use client'
import { usePathname } from "next/navigation"


const ShowComponent = ({children}: {children: React.ReactNode}) => {
    const pathName = usePathname();
  return (
    <div className="w-full">
        {
            pathName !== '/login' && (
                children
            )
        }
    </div>
  )
}

export default ShowComponent