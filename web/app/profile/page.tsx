"use client"

import { useMyProducts, useDeleteProduct } from "../src/hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { PlusIcon, PackageIcon, EyeIcon, EditIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ProfilePage = () => {
  const router = useRouter();
  const { data: products, isLoading } = useMyProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) deleteProduct.mutate(id);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Products</h1>
          <p className="text-base-content/60 text-sm mt-1">
            Manage your listings
          </p>
        </div>

        <Link
          href="/create"
          className="btn btn-primary btn-sm gap-2 shadow-md hover:shadow-lg transition"
        >
          <PlusIcon className="size-4" />
          New Product
        </Link>
      </div>

      {/* Stats */}
      <div className="stats shadow bg-base-200 rounded-xl w-full">
        <div className="stat px-6 py-4">
          <div className="stat-title text-sm opacity-70">
            Total Products
          </div>
          <div className="stat-value text-primary text-3xl">
            {products?.length || 0}
          </div>
        </div>
      </div>

      {/* Products */}
      {products?.length === 0 ? (
        <div className="card bg-base-200 shadow-md border border-base-300">
          <div className="card-body items-center text-center py-20">
            <PackageIcon className="size-20 text-base-content/20 mb-4" />
            <h3 className="text-lg font-semibold text-base-content/60">
              No products yet
            </h3>
            <p className="text-base-content/40 text-sm max-w-md">
              Start by creating your first product and showcase it to others.
            </p>
            <Link
              href="/create"
              className="btn btn-primary btn-sm mt-6 shadow hover:shadow-lg transition"
            >
              Create Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {products?.map((product) => (
            <div
              key={product.id}
              className="card card-side bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 rounded-xl overflow-hidden"
            >
              <figure className="w-40 shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-lg font-semibold">
                      {product.title}
                    </h2>
                    <p className="text-sm text-base-content/60 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="card-actions justify-end mt-6 gap-2">
                  <button
                    onClick={() => router.replace(`/product/${product.id}`)}
                    className="btn btn-outline btn-xs gap-1"
                  >
                    <EyeIcon className="size-3" />
                    View
                  </button>

                  <button
                    onClick={() => router.replace(`/edit/${product.id}`)}
                    className="btn btn-outline btn-xs gap-1"
                  >
                    <EditIcon className="size-3" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-outline btn-xs text-error border-error hover:bg-error/10 gap-1"
                    disabled={deleteProduct.isPending}
                  >
                    <Trash2Icon className="size-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;