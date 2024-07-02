export default class ProductApi {
    async getHeaders(session: any) {
        return {
            'Authorization': `Bearer ${session?.jwt}`,
            'Content-Type': 'application/json'
        };
    }

    async getData() {
        const res = await fetch('http://localhost:8080/api/products', {
            cache: 'no-store',
        });
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error);
        }
        return res.json();
    }

    async getDataById(id: string, session: any) {
        const headers = await this.getHeaders(session);
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
        try {
            if (imageUrl === null) {
                return "";
            }
            const res = await fetch(`http://localhost:8080${imageUrl}`, {
                cache: 'no-store',
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

    async deleteProd(id: string, session: any) {
        const headers = await this.getHeaders(session);
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

    async updateProd(id: string, updateData: any, session: any) {
        try {
            const res = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'PUT',
                body: updateData,
                cache: 'no-store',
                headers: {
                    'Authorization': `Bearer ${session?.jwt}`
                    , 'Accept': 'application/json'
                },
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

    async addProd(data: any, session: any) {

        const res = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            body: data,
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${session?.jwt}`
                , 'Accept': 'application/json'
            },
        });

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error);
        }
    }
}
