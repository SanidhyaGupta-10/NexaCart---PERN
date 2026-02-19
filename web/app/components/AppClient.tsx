"use client";

import { ReactNode } from "react";
import useAuthReq from "../src/hooks/useAuthReq";
import useUserSync from "../src/hooks/useUserSync";

interface Props {
  children: ReactNode;
}

export default function AppClient({ children }: Props) {
  // Attach axios auth interceptor
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  // Sync user into DB
  useUserSync();

  if (!isClerkLoaded) return null;
  console.log({ isSignedIn });

  return <>
    {children}
  </>;
}
