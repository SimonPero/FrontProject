import Link from "next/link";
import { BeakerIcon } from '@heroicons/react/24/solid'

export function Header(){
    return(
        <header className="bg-blue-500">
          <h1>trirtirt</h1>
          <Link href="/signIn"> Please Log In</Link>
          <BeakerIcon className="size-6 text-blue-500" />
        </header>
    )
}