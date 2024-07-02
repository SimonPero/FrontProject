"use client"

import { FormEvent } from 'react';
import ProductApi from '@/api/productApi';
import { useSession } from 'next-auth/react';
const productApi = new ProductApi();

export default function ProductForm() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await productApi.addProd(formData, session)
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
