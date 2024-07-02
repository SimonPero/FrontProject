"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function BackLink() {
    const router = useRouter();
    const handleBack = () => {
        router.back()
    }
    return (
        <Button onClick={handleBack}>
            Go back
        </Button>
    );
}