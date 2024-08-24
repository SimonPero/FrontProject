"use client";

import { useEffect, useState } from "react";
import Product from "../components/products/Product";
import Link from "next/link";
import ProductApi from "@/api/productApi";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/Iprod";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";

const productApi = new ProductApi();

export default function Home() {
  const [pageN, setPage] = useState(1);
  const [data, setData] = useState<IProduct[]>([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await productApi.getDataWithImages(pageN);

      setIsLastPage(result.length === 0);
      if (result.length > 0 && pageN === 1) {
        setIsLastPage(false);
      }

      setIsFirstPage(pageN === 1);
      setData(result);
    };
    fetchData();
  }, [pageN]);

  const prevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <main className="space-y-8 m-5">
      {data.length > 0 ? (
        data.map((product: IProduct) => (
          <Link key={product.productID} href={`products/${product.productID}`}>
            <Product {...product} />
          </Link>
        ))
      ) : (
        <p>No products available.</p>
      )}
      <div>
        <Button onClick={prevPage} disabled={isFirstPage}>
          <ArrowLeftIcon className="h-5 w-[20px]" />
        </Button>
        <Button onClick={nextPage} disabled={isLastPage}>
          <ArrowRightIcon className="h-5 w-[20px]" />
        </Button>
        <Link href="/productManagement">Product Management</Link>
      </div>
    </main>
  );
}