"use server"

interface IProduct {
    productID: number;
    name: string;
    price: number;
    description: string;
}

interface ICart {
    cartID: number;
    customerID: number;
    createdAt: string;
    updatedAt: string;
}

interface ICartItem {
    cartItemID: number;
    cartID: number;
    product: IProduct;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

interface IAddToCartProps {
    cart: ICart;
    items: ICartItem[];
}

const Cart: React.FC<IAddToCartProps> = ({ items, cart }) => {
    return (
        <div>
            <div>
                {cart.cartID}
            </div>
            {items.length > 0 ? (
                items.map((cartItem: ICartItem) => (
                    <>
                        <div className="flex gap-2">
                            <p>name: {cartItem.product.name}</p>
                            <p>price: {cartItem.product.price}</p>
                            <p>quantity: {cartItem.quantity}</p>
                            <p>description: {cartItem.product.description}</p>
                        </div>
                    </>
                ))
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
}

export default Cart;