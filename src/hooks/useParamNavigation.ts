"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useParamsNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateWithQueryParams = (param) => {
    const query = param.toString();
    const newUrl = pathname + "?" + query;

    router.push(newUrl);
  };

  const getParams = () => {
    const params = new URLSearchParams(searchParams);

    return params;
  };

  const getParamValue = (paramName: string) => {
    return searchParams.get(paramName);
  };

  const getParamKeys = (): string[] => {
    const params = getParams();
    const keys: string[] = [];
    params.keys().forEach((el) => keys.push(el));
    return keys;
  };

  return {
    getParams,
    getParamKeys,
    getParamValue,
    navigateWithQueryParams,
  };
};
