import React from 'react';

interface ProductProps {
  category: string;
  name: string;
  description: string;
  size: string;
  price: number;
  stock: number;
  imageUrl: string;
  productID: string;
}

async function getImage(imageUrl: string) {
  try {
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

const Product: React.FC<ProductProps> = async ({ category, name, description, size, price, stock, imageUrl, productID}) => {
  const img = await getImage(imageUrl);
  return (
    <div className="product" id={productID}>
      <img src={img} alt={description} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Size:</strong> {size}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Stock:</strong> {stock}</p>
    </div>
  );
};

export default Product;