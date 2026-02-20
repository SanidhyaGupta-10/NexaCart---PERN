import { useAuth, SignInButton } from "@clerk/nextjs";
import { useState } from "react";
import { useCreateComment, useDeleteComment } from "../src/hooks/useComments";
import { SendIcon, Trash2Icon, MessageSquareIcon, LogInIcon } from "lucide-react";

function CommentsSection({ }) {
    const { isSignedIn } = useAuth();

  return (
    <div>
      
    </div>
  )
}

export default CommentsSection;
