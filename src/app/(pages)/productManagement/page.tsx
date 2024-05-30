import React from 'react';
import { Form } from '@/components/ui/form';
import ProductForm from '../../../components/ProductForm';
import Product from '../../../components/Product';
import { Button } from '@/components/ui/button';
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
        <section className="space-y-4 m-5">
            <ProductForm />
                {data.length > 0 ? (
                    data.map((product: {
                        imageUrl: string; id: string; category: string; name: string; description: string; size: string; price: number; stock: number;
                    }) => (
                        <article key={product.id} >
                            <Product {...product} />
                            <div className='space-x-2'>
                                <Button asChild>
                                    <Link href={`/productManagement/${product.id}`}>
                                        MODIFICAR
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href={`/productManagement/${product.id}`}>
                                        ELIMINAR
                                    </Link>
                                </Button>
                            </div>
                        </article>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
        </section>
    );
}