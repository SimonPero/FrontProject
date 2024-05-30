import Product from "@/components/Product";
import ProdModifyForm from "@/components/ProdModifyForm";

async function getData(id:string) {
    const res = await fetch(`http://localhost:8080/api/products/${id}`, { cache: 'no-store' });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function ProductModify({
    params,
}: {
    params:{productId:string}
}) {
    const data = await getData(params.productId)
    return (
        <section className=''>
          <Product {...data}/>
          <section>
            <ProdModifyForm {...data}/>
          </section>
        </section>
    );
}