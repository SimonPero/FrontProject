import Product from "@/components/products/Product";
import ProductApi from "@/api/productApi";
import { BackLink } from "@/components/useful/goBackContext";
const productApi = new ProductApi();

export default async function ProductModify({
    params,
}: {
    params: { productId: string }
}) {
    const data = await productApi.getDataById(params.productId)
    return (
        <section className="space-y-4 m-5">
            <BackLink />
            <Product {...data} />
        </section>
    );
}