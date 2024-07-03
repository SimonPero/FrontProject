'use client'

import { Button } from '@/components/ui/button';
import CartApi from '@/api/cartApi';
import { useSession } from 'next-auth/react';
const cartApi = new CartApi();
interface AddToCartProps {
    email: string | null | undefined;
    productID: string;
    quantity: string;
}

const AddToCartButton: React.FC<AddToCartProps> = ({ email, productID, quantity }) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    const handleClick = async () => {
        try {
            await cartApi.addToCart(email, productID, quantity, session)
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <Button onClick={handleClick}>
            Add To Cart
        </Button>
    );
}

export default AddToCartButton;