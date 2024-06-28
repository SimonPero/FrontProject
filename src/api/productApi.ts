import { auth } from "@/auth";
export default class ProductApi {
    async getHeaders() {
        const session: any = await auth();
        return {
            'Authorization': `Bearer ${session?.jwt}`,
            'Content-Type': 'application/json'
        };
    }

    async getData() {
        const headers = await this.getHeaders();
        const res = await fetch('http://localhost:8080/api/products', {
            cache: 'no-store',
            headers
        });
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error);
        }
        return res.json();
    }

    async getDataById(id: string) {
        const headers = await this.getHeaders();
        const res = await fetch(`http://localhost:8080/api/products/${id}`, {
            cache: 'no-store',
            headers
        });
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error);
        }
        return res.json();
    }

    async getImage(imageUrl: string) {
        const headers = await this.getHeaders();
        try {
            if (imageUrl === null) {
                return "";
            }
            const res = await fetch(`http://localhost:8080${imageUrl}`, {
                cache: 'no-store',
                headers
            });
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error);
            }
            return res.url;
        } catch (error) {
            console.error('Error fetching image:', error);
            throw error;
        }
    }

    async deleteProd(id: string) {
        const headers = await this.getHeaders();
        try {
            const res = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'DELETE',
                cache: 'no-store',
                headers
            });
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error);
            }
            return res.url;
        } catch (error) {
            console.error('Error deleting prod:', error);
            throw error;
        }
    }

    async updateProd(id: string, updateData: any) {
        const headers = await this.getHeaders();
        try {
            const res = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'POST',
                body: JSON.stringify(updateData),
                cache: 'no-store',
                headers
            });

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }

    async addProd(data: any) {
        const headers = await this.getHeaders();
        const res = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            body: JSON.stringify(data),
            cache: 'no-store',
            headers
        });

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error);
        }
    }
}
