"use client";

import { DeleteFromCartButton } from "./DeleteFromCartButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateQuantity from "./UpdateQuantity";
import { useEffect, useState } from "react";
import { Suspense } from "react";

interface IProduct {
  productID: number;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
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
  session: any;
}

const Cart: React.FC<IAddToCartProps> = ({ items, cart, session }) => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    // Inicializa las cantidades con los valores del carrito
    const initialQuantities = items.reduce((acc, item) => {
      acc[item.product.productID] = item.quantity;
      return acc;
    }, {} as { [key: number]: number });
    setQuantities(initialQuantities);
  }, [items]);

  const updateQuantity = (productID: number, newQuantity: number) => {
    setQuantities((prev) => ({ ...prev, [productID]: newQuantity }));
  };
  return (
    <Suspense fallback={<p>loading</p>}>
      <div>
        <Table key={cart.cartID}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Ordered</TableHead>
              <TableHead>Category</TableHead>
              <TableHead></TableHead>
              <TableHead className="text-right">TotalCost</TableHead>
            </TableRow>
          </TableHeader>

          {items.length > 0 ? (
            items.map((cartItem: ICartItem) => (
              <TableBody key={cartItem.product.productID}>
                <TableRow>
                  <TableCell className="font-medium">
                    {cartItem.product.name}
                  </TableCell>
                  <TableCell>${cartItem.product.price}</TableCell>
                  <TableCell>
                    <UpdateQuantity
                      initialCount={cartItem.quantity}
                      stock={cartItem.product.stock}
                      onCountChange={(newCount: number) =>
                        updateQuantity(cartItem.product.productID, newCount)
                      }
                    />
                  </TableCell>
                  <TableCell>{cartItem.product.category}</TableCell>
                  <TableCell>
                    <DeleteFromCartButton
                      prodID={cartItem.product.productID}
                      cartID={cart.cartID}
                      session={session}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    $
                    {cartItem.product.price *
                      (quantities[cartItem.product.productID] ||
                        cartItem.quantity)}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <p>No products Available</p>
          )}
        </Table>
      </div>
    </Suspense>
  );
};

export default Cart;