import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

async function getImage(imageUrl: string) {
  try {
    if (imageUrl === null) {
      return ""
    }
    const res = await fetch(`http://localhost:8080${imageUrl}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.url;
  } catch (error) {
    // Maneja cualquier error aquí
    console.error('Error fetching image:', error);
    throw error;
  }
}

const Product: React.FC<ProductProps> = async ({ category, name, description, size, price, stock, imageUrl, id }) => {
  const img = await getImage(imageUrl);
  return (
    <Card id={id} className="bg-gray-500">
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