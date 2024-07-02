'use client'

import { Button } from '@/components/ui/button';
import ProductApi from '@/api/productApi';
import { useSession } from 'next-auth/react';
const productApi = new ProductApi();
interface DeleteButtonProps {
    productID: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ productID }) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    const handleClick = async () => {
        try {
            await productApi.deleteProd(productID, session);
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