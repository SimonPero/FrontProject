import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import { LogOut } from "./users/LogOut";
export async function Header() {
  const session = await auth();
  return (
    <header className="bg-blue-500 flex justify-evenly">
      <Link href="/">Home</Link>
      { session ? <LogOut/> :  <Link href="/signIn"> Please Log In</Link>}
      <Link href="/cart">
        <ShoppingCartIcon className="size-6" />
      </Link>
    </header>
  );
}
