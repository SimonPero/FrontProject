import React, { useState } from 'react';
import ProductForm from '@/components/ProductForm';
import Product from '@/components/Product';
import Link from 'next/link';

async function getData() {
    const res = await fetch('http://localhost:8080/api/products', { cache: 'no-store' });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    return res.json();
}


export default async function Page() {
    const data = await getData();
    return (
        <section className='grid-cols-2'>
            <ProductForm />
            <section>
                    {data.length > 0 ? (
                        data.map((product: {
                            imageUrl: string; id: string; category: string; name: string; description: string; size: string; price: number; stock: number;
                        }) => (
                            <article key={product.id } className='product-item'>
                            <Product {...product}/>
                            <Link href={`/productManagement/${product.id}`}>
                                MODIFICAR
                            </Link>
                        </article>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
            </section>
        </section>
    );
}