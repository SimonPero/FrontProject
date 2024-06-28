'use client'

import { Button } from '@/components/ui/button';
import ProductApi from '@/api/productApi';
const productApi = new ProductApi();
interface DeleteButtonProps {
    productID: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ productID }) => {
    const handleClick = async () => {
        try {
            await productApi.deleteProd(productID);
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