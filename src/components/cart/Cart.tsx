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
import { ICart, ICartItem } from "@/types/Icart";

interface IAddToCartProps {
  cart: ICart;
  items: ICartItem[];
  session: any;
}

const Cart: React.FC<IAddToCartProps> = ({ items, cart, session }) => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const initialQuantities = items.reduce((acc, item) => {
      acc[item.cartItemID] = item.quantity;
      return acc;
    }, {} as { [key: number]: number });
    setQuantities(initialQuantities);
  }, [items]);

  const updateQuantity = (productID: number, newQuantity: number) => {
    setQuantities((prev) => ({ ...prev, [productID]: newQuantity }));
  };
  return (
    <>
      <Table key={cart.cartID}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <p>Product</p>
            </TableHead>
            <TableHead className="w-[100px]">
              <p>Price</p>
            </TableHead>
            <TableHead className="w-[100px]">
              <p>Ordered</p>
            </TableHead>
            <TableHead className="w-[100px] ">
              <p>Category</p>
            </TableHead>
            <TableHead className="text-right"></TableHead>
            <TableHead className="text-right">
              <p>TotalCost</p>
            </TableHead>
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
                      updateQuantity(cartItem.cartItemID, newCount)
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
                    (quantities[cartItem.cartItemID] ||
                      cartItem.quantity)}
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>No items in cart</TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </>
  );
};

export default Cart;
