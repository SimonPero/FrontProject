"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function BackLink() {
    const router = useRouter();
    const handleBack = () => {
        router.back()
    }
    return (
        <Button onClick={handleBack}>
            <ArrowLeftIcon className="size-6" />
        </Button>
    );
}