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
// Comment
// ==========================
export interface Comment {
  id: string;
  content: string;
  userId: string;
  productId: string;
  createdAt: string;
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
// Generic API Response
// ==========================
export interface MessageResponse {
  message: string;
}
// ==========================
// Product With Relations (For UI)
// ==========================

export interface ProductWithRelations extends Product {
  user: User;
  comments: Comment[];
}
