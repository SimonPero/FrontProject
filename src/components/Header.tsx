import Link from "next/link";
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

export function Header() {
  return (
    <header className="bg-blue-500 flex justify-evenly">
      <Link href="/">
        Home
      </Link>
      <Link href="/signIn"> Please Log In</Link>
      <Link href="/cart">
        <ShoppingCartIcon className="size-6" />
      </Link>
    </header>
  )
}