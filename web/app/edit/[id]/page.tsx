"use client"

import EditProductForm from "@/app/components/EditProductForm";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useProduct, useUpdateProduct } from "@/app/src/hooks/useProducts";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"


function page() {
  const params = useParams();
  const router = useRouter()
  const { isLoaded, userId } = useAuth();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) return null;

  const { data: product, isLoading, error } = useProduct(id);
  const updateProduct = useUpdateProduct();

  if (!isLoaded) return <LoadingSpinner />;
  if (!product || product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">{!product ? "Not found" : "Access denied"}</h2>
          <Link href="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { id, ...formData },
          {
            onSuccess: () => router.replace(`/product/${id}`),
          }
        );
      }}
    />
  );
};

export default page
