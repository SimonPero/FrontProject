"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react";

export const PreviousPathnameContext = createContext<string | undefined>(undefined);

export default function PreviousPathnameProvider({ children }: PropsWithChildren<{}>) {
    const pathname = usePathname();
    const ref = useRef<string | undefined>();

    // Almacenamos el pathname actual en un estado
    const [previousPathname, setPreviousPathname] = useState<string | undefined>();

    useEffect(() => {
        // Actualizamos el estado con el pathname anterior antes de actualizar el ref
        setPreviousPathname(ref.current);
        ref.current = pathname;
    }, [pathname]);

    return (
        <PreviousPathnameContext.Provider value={previousPathname}>
            {children}
        </PreviousPathnameContext.Provider>
    );
}

export function BackLink() {
    const previousPathname = useContext(PreviousPathnameContext);
    if (!previousPathname) {
        return null; // O puedes renderizar algo alternativo si no hay pathname anterior
    }
    return (
        <Link href={previousPathname}>
            Back to Previous Page
        </Link>
    );
}