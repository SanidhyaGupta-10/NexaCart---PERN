import type { Request, Response } from "express";
import * as queries from "../db/queries.ts";
import { getAuth } from "@clerk/express";

interface ProductParams {
    id: string;
}

// Get all products (public)
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await queries.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ error: "Failed to get products" });
    }
};

// Get products by current user (protected)
export const getMyProducts = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({
            error: "Unauthorized"
        });

        const product = await queries.getProductsByUserId(userId);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error getting user product:", error);
        res.status(500).json({ error: "Failed to get user product" });
    }
}

// Get single product by ID (public)
export const getProductById = async (
    req: Request<ProductParams>,
    res: Response
) => {
    try {
        const { id } = req.params;
        const product = await queries.getProductById(id);

        if (!product) return res.status(404).json({
            error: "Product not found"
        });

        res.status(200).json(product);
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ error: "Failed to get product" });
    }
};

// Create Product (protected)
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({
            error: "Unauthorized"
        });

        const { title, description, imageUrl } = req.body;
        if (!title || !description || !imageUrl) {
            res.status(400).json({
                error: "Title, description and imageUrl are required"
            });
            return;
        };

        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
}

// Update Product (protected - owner only)
export const updateProduct = async (
    req: Request<{ id: string }>, res: Response
) => {
    try {
        const auth = getAuth(req);

        if (!auth.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = auth.userId; // ✅ now strictly string

        const { id } = req.params;
        const { title, description, imageUrl } = req.body;

        const existingProduct = await queries.getProductById(id);

        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (existingProduct.userId !== userId) {
            return res.status(403).json({
                error: "You can only update your own products",
            });
        }

        const product = await queries.updateProduct(id, {
            title,
            description,
            imageUrl,
        });

        return res.status(200).json(product);

    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ error: "Failed to update product" });
    }
};

// Delete Product ( protected - owner only)
export const deleteProduct = async (
    req: Request<{ id: string }>, res: Response
) => {
    try {
        const auth = getAuth(req);
        if (!auth.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        };
        const userId = auth.userId; // ✅ now strictly string

        const { id } = req.params;
        // Check if products exists and belongs to users
        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        };
        if (existingProduct.userId !== userId) {
            return res.status(403).json({
                error: "You can only update your own products",
            });
        }

        await queries.deleteProduct(id);
        res.status(200).json({
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Failed to deleting product" });
    }
}
