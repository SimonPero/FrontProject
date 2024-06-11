export default class ProductApi {
    async getData() {
        const res = await fetch('http://localhost:8080/api/products', { cache: 'no-store' });
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data');
        }
        return res.json();
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
}