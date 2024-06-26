export default class ProductApi {
    async getData() {
        const res = await fetch('http://localhost:8080/api/products', { cache: 'no-store' });
        if (!res.ok) {
            // This will activate the closest error.js Error Boundary
            throw new Error('Failed to fetch data');
        }
        return res.json();
    }
    async getDataById(id: string) {
        const res = await fetch(`http://localhost:8080/api/products/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            // This will activate the closest error.js Error Boundary
            throw new Error('Failed to fetch data');
        }

        return res.json();
    }

    async getImage(imageUrl: string) {
        try {
            if (imageUrl === null) {
                return ""
            }
            const res = await fetch(`http://localhost:8080${imageUrl}`, { cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            return res.url;
        } catch (error) {
            // Maneja cualquier error aquí
            console.error('Error fetching image:', error);
            throw error;
        }
    }

    async deleteProd(id: string) {
        try {
            const res = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'DELETE',
                cache: 'no-store'
            });
            if (!res.ok) {
                throw new Error('Failed to delete prod');
            }
            return res.url;
        } catch (error) {
            // Maneja cualquier error aquí
            console.error('Error deleting prod:', error);
            throw error;
        }
    }

    async updateProd(id: string, updateData: any) {
        try {
            const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'POST',
                body: updateData,
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error('Failed to submit the form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }

    async addProd(data: any) {
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            body: data,
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to submit the form');
        }
    }
}