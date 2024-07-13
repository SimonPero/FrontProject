import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ProductApi from '@/api/productApi';

interface ProductProps {
  category: string;
  name: string;
  description: string;
  size: string;
  price: number;
  stock: number;
  imageUrl: string;
  id: string;
}

const productApi = new ProductApi();

const Product: React.FC<ProductProps> = async ({ name, description, size, price, stock, imageUrl, id }) => {
  const img = await productApi.getImage(imageUrl);
  return (
    <Card id={id} className="bg-gray-500 mb-8 mt-8">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
        <CardContent className="relative h-64 md:h-96">
          <img className="absolute top-0 left-0 w-full h-full object-cover rounded-sm" src={img} alt={description} />
        </CardContent>
      <CardFooter>
        <div className="flex flex-col space-z-2">
          <p><strong>Size:</strong> {size}</p>
          <p><strong>Price:</strong> ${price}</p>
          <p><strong>Stock:</strong> {stock}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Product;