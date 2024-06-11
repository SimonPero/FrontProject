"use client"

import { FormEvent } from 'react';

export default function ProductForm() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      body: formData,
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to submit the form');
    }
  }

  return (
    <form className='max-w-2x1 bg-gray-200 p-6 space-x-4 flex flex-col' onSubmit={onSubmit}>
      <div>Form</div> 
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="category" placeholder="Category" />
      <input type="number" name="price" placeholder="Price" />
      <input type="text" name="size" placeholder="Size" />
      <input type="number" name="stock" placeholder="Stock" />
      <input type="text" name="description" placeholder="Description" />
      <input type="file" name="image" />
      <button className='bg-red-500' type="submit">Submit</button>
    </form>
  );
}
