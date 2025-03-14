/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../styles/hoc.module.css";
import loadingImg from "../public/images/loading.gif";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const token = getCookie("token");
  const [loading, setLoading] = useState(true);

  const publicRoutes = [
    "/",
    "/feature",
    "/login",
    "/signup",
    "/pricing",
    "/preview/:id",
    "/widget",
  ];

  const userRoutes = [
    "/dashboard",
    "/dashboard/chathistory",
    "/dashboard/pro",
    "/dashboard/setting",
    "/dashboard/chatbot/:id",
    "/preview/:id",
    "/widget",
  ];

  const isRouteMatch = (routes, targetPath) => {
    return routes.some((route) => {
      const basePath = targetPath.split("?")[0];
      if (route.includes(":")) {
        const routePrefix = route.split("/:")[0];
        return basePath.startsWith(routePrefix);
      }
      return basePath === route;
    });
  };

  useEffect(() => {
    const basePath = pathname.split("?")[0];

    if (!token) {
      if (isRouteMatch(publicRoutes, basePath)) {
        setLoading(false);
        return;
      }
      router.replace("/");
      setLoading(false);
      return;
    }

    if (!isRouteMatch(userRoutes, basePath)) {
      router.replace("/dashboard");
    }
    setLoading(false);
  }, [router, token, pathname]);

  if (loading) {
    return (
      <div className={styles.loadContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={loadingImg}
            priority={true}
            className={styles.img}
            width={60}
            height={60}
            alt="Loading..."
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;