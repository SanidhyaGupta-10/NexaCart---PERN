import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { syncUser } from "../lib/api";
import type { SyncUserInput } from "../types/api.types";

function useUserSync() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const hasSynced = useRef(false);

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: syncUser,
    onError: (err) => {
      // console.error("Sync failed:", err);
    },
    onSuccess: (data) => {
      // console.log("User synced:", data);
    },
  });

  useEffect(() => {
    if (!isLoaded) return; // 🔴 wait for Clerk

    if (isSignedIn && user && !hasSynced.current) {
      const payload: SyncUserInput = {
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: user.fullName ?? user.firstName ?? "",
        imageUrl: user.imageUrl,
      };

      // console.log("Sending payload:", payload);

      mutate(payload);
      hasSynced.current = true;
    }
  }, [isLoaded, isSignedIn, user, mutate]);

  return { isSynced: isSuccess, isPending, error };
}

export default useUserSync;
