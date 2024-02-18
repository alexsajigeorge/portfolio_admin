"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function withAuth(Component: React.ComponentType<any>) {
  return function WrappedComponent(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const auth = localStorage.getItem("authToken");

      setIsAuthenticated(!!auth);
      if (!auth) {
        redirect("/auth/signin");
      }
    }, []);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
