import Product from "@/components/Product";
import Link from "next/link"; // Ajuste la importación de 'next/link'
import { Key } from "react";

async function getData() {
  const res = await fetch('http://localhost:8080/api/products', { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <main>
      <div>
        {data.length > 0 ? (
          data.map((product: {
            imageUrl: string; productID: string; category: string; name: string; description: string; size: string; price: number; stock: number;
          }) => (
            <Product
              key={product.productID}
              category={product.category}
              name={product.name}
              description={product.description}
              size={product.size}
              price={product.price}
              stock={product.stock}
              imageUrl={product.imageUrl}
              productID={product.productID}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <div>
        <Link href="/pages/productManagement">Product Management</Link>
      </div>
    </main>
  );
}
