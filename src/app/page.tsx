import Product from "../components/Product";
import Link from "next/link"; // Ajuste la importación de 'next/link'

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