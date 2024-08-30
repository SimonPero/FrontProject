"use client";

import { useEffect, useState } from "react";
import Product from "./Product";
import Link from "next/link";
import ProductApi from "@/api/productApi";
import { IProduct } from "@/types/Iprod";
import { Pagination } from "./Pagination";
const productApi = new ProductApi();

export default function ProductList() {
  const [pageN, setPage] = useState(2);
  const [data, setData] = useState<IProduct[]>([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await productApi.getDataPages(pageN);
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
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </main>
  );
}
