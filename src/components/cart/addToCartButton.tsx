"use client";

import { Button } from "@/components/ui/button";
import CartApi from "@/api/cartApi";
import { useToast } from "../ui/use-toast";
const cartApi = new CartApi();
interface AddToCartProps {
  email: string | null | undefined;
  productID: string;
  quantity: string;
  session: any;
}

const AddToCartButton: React.FC<AddToCartProps> = ({
  email,
  productID,
  quantity,
  session,
}) => {
  const { toast } = useToast();
  const handleClick = async () => {
    try {
      await cartApi.addToCart(email, productID, quantity, session);
      toast({
        title: "Successfully added this product to your cart",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <>
      <Button onClick={handleClick}>Add To Cart</Button>
    </>
  );
};

export default AddToCartButton;