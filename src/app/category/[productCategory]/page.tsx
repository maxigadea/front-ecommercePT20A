import { getProductByCategory } from "@/helpers/product.helper"
import Link from 'next/link';
import Card from "../../../components/Card/Card";


const ProductCategory = async ({params}: {params: {productCategory: string}}) => {
    const products = await getProductByCategory(params.productCategory)
  return (
    <div>
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

export default ProductCategory