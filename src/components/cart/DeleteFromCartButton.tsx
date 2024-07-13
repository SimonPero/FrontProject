"use client"

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import CartApi from "@/api/cartApi";
const cartApi = new CartApi();

interface DeleteProdFromCartProps {
    prodID: number;
    cartID: number;
    session:any;
}

export function DeleteFromCartButton({ prodID, cartID, session }: DeleteProdFromCartProps) {
    const handleClick = async () => {
        await cartApi.deleteProdFromCart(prodID, cartID, session);
    };

    return (
        <Button onClick={handleClick} className="bg-red-700">
            <XMarkIcon className="w-10 h-10" />
        </Button>
    );
}