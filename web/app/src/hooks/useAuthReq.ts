import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import api from "../lib/axios";

function useAuthReq() {
  // Clerk auth state + token getter
  const { isSignedIn, getToken, isLoaded } = useAuth();

  useEffect(() => {
    // Wait until Clerk finishes loading session
    if (!isLoaded) return;
    // Register Axios request interceptor
    // This runs BEFORE every outgoing request
    const interceptor = api.interceptors.request.use(
      async (config) => {
        // Only attach token if user is signed in
        if (isSignedIn) {
          // getToken() is async → must await
          const token = await getToken();

          if (token) {
            // Axios v1 uses AxiosHeaders class
            // We MUST use .set() instead of replacing headers object
            config.headers.set(
              "Authorization",
              `Bearer ${token}`
            );
          }
        }
        // Always return config or request will break
        return config;
      },
      // Forward request errors if interceptor fails
      (error) => Promise.reject(error)
    );
    // Cleanup function:
    // Prevents duplicate interceptors on re-render/unmount
    return () => {
      api.interceptors.request.eject(interceptor);
    };

    // Re-register interceptor if auth state changes
  }, [isSignedIn, getToken, isLoaded]);

  return { isSignedIn, isClerkLoaded: isLoaded};
}

export default useAuthReq;
