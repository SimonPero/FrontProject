import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IProduct } from '@/types/Iprod';

export default function Product(prod: IProduct) {
  return (
    <Card id={prod.productID} className="bg-gray-500 mb-8 mt-8">
      <CardHeader>
        <CardTitle>{prod.name}</CardTitle>
      </CardHeader>
      <CardContent className="relative h-64 md:h-96">
        <img className="absolute top-0 left-0 w-full h-full object-cover rounded-sm" src={prod.imageUrl} alt={prod.description} />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col space-z-2">
          <p><strong>Size:</strong> {prod.size}</p>
          <p><strong>Price:</strong> ${prod.price}</p>
          <p><strong>Stock:</strong> {prod.stock}</p>
        </div>
      </CardFooter>
    </Card>
  );
}