import api from "./axios";
import type {
  User,
  Product,
  Comment,
  SyncUserInput,
  CreateProductInput,
  UpdateProductInput,
  CreateCommentInput,
  MessageResponse,
} from "../types/api.types";

// ==========================
// USERS API
// ==========================
export const syncUser = async (
  userData: SyncUserInput
): Promise<User> => {
  const { data } = await api.post<User>("/users/sync", userData);
  return data;
};

// ==========================
// PRODUCTS API
// ==========================
export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

export const getProductById = async (
  id: string
): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

export const getMyProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products/my");
  return data;
};

export const createProduct = async (
  productData: CreateProductInput
): Promise<Product> => {
  const { data } = await api.post<Product>(
    "/products",
    productData
  );
  return data;
};

export const updateProduct = async (
  input: UpdateProductInput
): Promise<Product> => {
  const { id, ...productData } = input;

  const { data } = await api.put<Product>(
    `/products/${id}`,
    productData
  );

  return data;
};

export const deleteProduct = async (
  id: string
): Promise<MessageResponse> => {
  const { data } = await api.delete<MessageResponse>(
    `/products/${id}`
  );
  return data;
};

// ==========================
// COMMENTS API
// ==========================
export const createComment = async (
  input: CreateCommentInput
): Promise<Comment> => {
  const { productId, content } = input;

  const { data } = await api.post<Comment>(
    `/comments/${productId}`,
    { content }
  );

  return data;
};

export const deleteComment = async (
  commentId: string
): Promise<MessageResponse> => {
  const { data } = await api.delete<MessageResponse>(
    `/comments/${commentId}`
  );
  return data;
};
