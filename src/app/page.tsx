import Product from "../components/products/Product";
import Link from "next/link";
import ProductApi from "@/api/productApi";
const productApi = new ProductApi();

export default async function Home() {
  const data = await productApi.getData();
  return (
      <main>
        <div className="space-y-4 m-5">
          {data.length > 0 ? (
            data.map((product: {
              imageUrl: string; id: string; category: string; name: string; description: string; size: string; price: number; stock: number;
            }) => (
              <Product key={product.id}{...product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
        <div>
          <Link href="/productManagement">Product Management</Link>
        </div>
      </main>
  );
}