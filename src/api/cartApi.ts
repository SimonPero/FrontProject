import envConfig from "@/config/env.config";

export default class CartApi {
    async getHeaders(session: any) {
        return {
            'Authorization': `Bearer ${session?.jwt}`,
            'Content-Type': 'application/json'
        };
    }
    async addToCart(email: string | null | undefined, productID: string, quantity: string, session: any) {
        const headers = await this.getHeaders(session);
        const toAdd = { email: email, productID: productID, quantity: quantity }
        const res = await fetch(`${envConfig.apiUrl}/api/cart/addToCart`, {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify(toAdd),
            headers,
        });
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error);
        }
        return res.json();

    }
    async getCart(email: string | null | undefined, session: any) {
        const headers = await this.getHeaders(session);
        const res = await fetch(`${envConfig.apiUrl}/api/cart/getCart`, {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify({ email: email }),
            headers,
        });
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error);
        }
        return res.json();

    }

    async deleteProdFromCart(prodID:number, cartID:number, session: any) {
        const headers = await this.getHeaders(session);
        const res = await fetch(`${envConfig.apiUrl}/api/cart/deleteFromCart/${prodID}/${cartID}`, {
            cache: 'no-store',
            method: "DELETE",
            headers,
        });
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error);
        }
        return res.json();
    }
}