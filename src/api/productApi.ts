import apiClient from "@/apiClient";

export default class ProductApi {
    async getData() {
        const res = await apiClient.get('/api/products');
        if (res.status !== 200) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data');
        }
        return res.data;
    }
    async getDataById(id: string) {
        const res = await fetch(`http://localhost:8080/api/products/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
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
            const res = await apiClient.delete(`/api/products/${id}`)
            if (res.status !== 200) {
                throw new Error('Failed to delete prod');
            }
            return res.config.url;
        } catch (error) {
            // Maneja cualquier error aquí
            console.error('Error deleting prod:', error);
            throw error;
        }
    }

    async updateProd(id: string) {
        try {
            const response = await apiClient.put(`/api/products/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to submit the form');
            }
            return response.data; // Retorna los datos de respuesta si es necesario
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error; // Lanza el error para que sea manejado por el llamador
        }
    }
}