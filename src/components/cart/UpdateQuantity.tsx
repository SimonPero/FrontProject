"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

interface UpdateQuantityProps {
  initialCount: number;
  stock: number;
  onCountChange: Function;
}
export default function UpdateQuantity({
  initialCount,
  stock,
  onCountChange,
}: UpdateQuantityProps) {
  const [count, setCount] = useState(initialCount);
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const handleDecrement = () => {
    const newCount = Math.max(1, count - 1);
    if (newCount !== count) {
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  const handleIncrement = () => {
    const newCount = Math.min(stock, count + 1);
    if (newCount !== count) {
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  return (
    <div className="flex items-center">
      <Button onClick={handleDecrement} disabled={count <= 1} className="w-[50px]">
        <ArrowLeftIcon className="h-5 w-[20px]" />
      </Button>
      <div className="mx-2">{count}</div>
      <Button onClick={handleIncrement} disabled={count >= stock} className="w-[50px]">
        <ArrowRightIcon className="h-5 w-[20px]"  />
      </Button>
    </div>
  );
}
