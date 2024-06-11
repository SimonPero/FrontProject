import ProductForm from '../../../components/products/ProductForm';
import Product from '../../../components/products/Product';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductApi from '@/api/productApi';
import { BackLink } from '@/components/contexts/goBackContext';
import DeleteButton from '@/components/products/DeleteButton';

const productApi = new ProductApi();

export default async function Page() {
    const data = await productApi.getData()
    return (
        <section className="space-y-4 m-5">
            <BackLink />
            <ProductForm />
            {data.length > 0 ? (
                data.map((product: {
                    imageUrl: string; id: string; category: string; name: string; description: string; size: string; price: number; stock: number;
                }) => (
                    <article key={product.id} >
                        <Product {...product} />
                        <div className='space-x-2 space-y-2'>
                            <Button asChild>
                                <Link href={`/productManagement/${product.id}`}>
                                    MODIFICAR
                                </Link>
                            </Button>
                            <DeleteButton productId={product.id} />
                        </div>
                    </article>
                ))
            ) : (
                <p>No products available.</p>
            )}
        </section>
    );
}