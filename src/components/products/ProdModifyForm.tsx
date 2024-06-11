"use client";
import React, { useState } from 'react';
import { FormEvent } from 'react';

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

const ProdModifyForm: React.FC<ProductProps> = ({ category, name, description, size, price, stock, imageUrl, id }) => {
  const [formData, setFormData] = useState({
    category,
    name,
    description,
    size,
    price: price.toString(),
    stock: stock.toString(),
    image: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData();
    data.append('category', formData.category);
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('size', formData.size);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    if (formData.image) {
      data.append('image', formData.image);
    }
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        body: data,
        cache: 'no-store'
      });
      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <form className='max-w-2x1 bg-gray-200 p-6 space-x-4 flex flex-col' onSubmit={onSubmit}>
      <div>Form</div>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Size" />
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="file" name="image" onChange={handleChange} />
      {imageUrl && <img src={imageUrl} alt={description} />}
      <button className='bg-red-500' type="submit">Submit</button>
    </form>
  );
}

export default ProdModifyForm;
