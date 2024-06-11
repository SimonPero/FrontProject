import Product from "../../../../components/products/Product";
import ProdModifyForm from "../../../../components/products/ProdModifyForm";
import ProductApi from "@/api/productApi";
import { BackLink } from "@/components/contexts/goBackContext";
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
            <section>
                <ProdModifyForm {...data} />
            </section>
        </section>
    );
}