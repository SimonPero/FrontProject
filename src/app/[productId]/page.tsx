import Product from "@/components/products/Product";
import ProductApi from "@/api/productApi";
import { BackLink } from "@/components/useful/goBackContext";
import { auth } from "@/auth";
const productApi = new ProductApi();

export default async function ProductModify({
    params,
}: {
    params: { productId: string }
}) {
    const session = await auth();
    const data = await productApi.getDataById(params.productId, session)
    return (
        <section className="space-y-4 m-5">
            <BackLink />
            <Product {...data} />
        </section>
    );
}