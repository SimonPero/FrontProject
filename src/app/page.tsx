import Product from "../components/products/Product";
import Link from "next/link";
import ProductApi from "@/api/productApi";
const productApi = new ProductApi();

export default async function Home() {
  const data = await productApi.getData();
  return (
    <main className="space-y-8 m-5">
      {data.length > 0 ? (
        data.map((product: {
          imageUrl: string; productID: string; category: string; name: string; description: string; size: string; price: number; stock: number;
        }) => (

            <Link key={product.productID} href={`/${product.productID}`}>
              <Product id={product.productID}  {...product} />
            </Link>

        ))
      ) : (
        <p>No products available.</p>
      )}
      <div>
        <Link href="/productManagement">Product Management</Link>
      </div>
    </main>
  );
}