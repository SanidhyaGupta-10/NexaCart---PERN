// ==========================
// User
// ==========================
export interface User {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  createdAt: string;
}

// ==========================
// Product
// ==========================
export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================
// Comment (Base Entity)
// ==========================
export interface Comment {
  id: string;
  content: string;
  userId: string;
  productId: string;
  createdAt: string;
}

// ==========================
// Relational Types
// ==========================
export interface CommentWithUser extends Comment {
  user: User;
}

export interface ProductWithRelations extends Product {
  user: User;
  comments: CommentWithUser[];
}

// ==========================
// Request Payloads
// ==========================
export interface SyncUserInput {
  email: string;
  name: string;
  imageUrl: string;
}

export interface CreateProductInput {
  title: string;
  description: string;
  imageUrl: string;
}

export interface UpdateProductInput {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface CreateCommentInput {
  productId: string;
  content: string;
}

// ==========================
// Generic Response
// ==========================
export interface MessageResponse {
  message: string;
}