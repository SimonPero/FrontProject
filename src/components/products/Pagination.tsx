import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface PaginationProps {
  prevPage: () => void;
  nextPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export function Pagination({ prevPage, nextPage, isFirstPage, isLastPage }: PaginationProps) {
  return (
    <div>
      <Button onClick={prevPage} disabled={isFirstPage}>
        <ArrowLeftIcon className="h-5 w-[20px]" />
      </Button>
      <Button onClick={nextPage} disabled={isLastPage}>
        <ArrowRightIcon className="h-5 w-[20px]" />
      </Button>
      <Link href="/productManagement">Product Management</Link>
    </div>
  );
}