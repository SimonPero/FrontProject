"use client"

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";


export default function UpdateQuantity({ initialCount, stock, onCountChange }) {
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
            <Button onClick={handleDecrement} disabled={count <= 1}>
                <ArrowLeftIcon className="h-5 m-5" />
            </Button>
            <div className="mx-2">{count}</div>
            <Button onClick={handleIncrement} disabled={count >= stock}>
                <ArrowRightIcon className="h-5 m-5" />
            </Button>
        </div>
    );
}