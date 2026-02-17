import type { Request, Response } from "express";
import * as queries from "../db/queries.ts";
import { getAuth } from "@clerk/express";

// --------------------
// Create Comment
// --------------------
export const createComment = async (
  req: Request<{ productId: string }, {}, { content: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { productId } = req.params;
    const { content } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    if (!content?.trim()) {
      return res
        .status(400)
        .json({ error: "Comment content is required" });
    }

    // Verify product exists
    const product = await queries.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const comment = await queries.createComment({
      content: content.trim(),
      userId,
      productId,
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({
      error: "Internal server error while creating comment",
    });
  }
};

// --------------------
// Delete Comment
// --------------------
export const deleteComment = async (
  req: Request<{ commentId: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ error: "Comment ID is required" });
    }

    const existingComment = await queries.getCommentById(commentId);

    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (existingComment.userId !== userId) {
      return res.status(403).json({
        error: "You can only delete your own comments",
      });
    }

    await queries.deleteComment(commentId);

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({
      error: "Internal server error while deleting comment",
    });
  }
};
