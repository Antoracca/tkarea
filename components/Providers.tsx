"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./PageLoader";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Chaque changement de route incrémente la key → force le remontage du loader
  const [loaderKey, setLoaderKey] = useState(0);

  useEffect(() => {
    setLoaderKey((k) => k + 1);
  }, [pathname]);

  return (
    <>
      <PageLoader key={loaderKey} />
      {children}
    </>
  );
}
