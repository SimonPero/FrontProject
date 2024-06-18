'use client'

import { Button } from '@/components/ui/button';
import ProductApi from '@/api/productApi';
const productApi = new ProductApi();
interface DeleteButtonProps {
    productId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ productId }) => {
    const handleClick = async () => {
        try {
            await productApi.deleteProd(productId);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Button onClick={handleClick}>
            ELIMINAR
        </Button>
    );
}

export default DeleteButton;