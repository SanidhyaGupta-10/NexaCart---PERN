"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
} from "../lib/api";
import { Product } from "../types/api.types";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
  });
};

export const useMyProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["my-products"],
    queryFn: getMyProducts,
  });
};

export const useUpdateProduct = () =>  {
  return useMutation({
    mutationFn: updateProduct
  });
};