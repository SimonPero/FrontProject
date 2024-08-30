"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProduct } from "@/types/Iprod";
import Image from "next/image";
import ProductApi from "@/api/productApi";
import { SkeletonCard } from "./SkelentoProduct";
const productApi = new ProductApi();

export default function Product(prod: IProduct) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const url = await productApi.getImage(prod.imageUrl);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [prod.imageUrl]);

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <Card id={prod.productID} className="bg-gray-500 mb-8 mt-8">
      <CardHeader>
        <CardTitle>{prod.name}</CardTitle>
      </CardHeader>
      <CardContent className="relative h-64 md:h-96">
        {imageUrl && (
          <Image
            className="absolute top-0 left-0 w-full h-full object-cover rounded-sm"
            src={imageUrl}
            alt={prod.description}
            loading="lazy"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "fill",
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <div className="flex flex-col space-z-2">
          <p>
            <strong>Size:</strong> {prod.size}
          </p>
          <p>
            <strong>Price:</strong> ${prod.price}
          </p>
          <p>
            <strong>Stock:</strong> {prod.stock}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}