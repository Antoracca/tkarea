"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./PageLoader";
import GlobalChat from "./GlobalChat";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loaderKey, setLoaderKey] = useState(0);

  useEffect(() => {
    setLoaderKey((k) => k + 1);
  }, [pathname]);

  return (
    <>
      <PageLoader key={loaderKey} />
      {children}
      <GlobalChat />
    </>
  );
}
