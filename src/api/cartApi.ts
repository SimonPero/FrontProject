export default class CartApi {
    async getHeaders(session: any) {
        return {
            'Authorization': `Bearer ${session?.jwt}`,
            'Content-Type': 'application/json'
        };
    }
    async addToCart(email: string | null | undefined, productID: string, quantity: string, session: any) {
        const headers = await this.getHeaders(session);
        const toAdd = { email:email, productID:productID, quantity:quantity }
        const res = await fetch(`http://localhost:8080/api/cart/addToCart`, {
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
}