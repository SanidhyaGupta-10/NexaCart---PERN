"use client"
import { ArrowLeftIcon, EditIcon, Trash2Icon, CalendarIcon, UserIcon } from "lucide-react"; import LoadingSpinner from "@/app/components/LoadingSpinner"; import CommentsSection from "@/app/components/CommentsSection";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useDeleteProduct, useProduct } from "@/app/src/hooks/useProducts";
import Link from "next/link";

function Page() {
  const params = useParams();
  const router = useRouter();
  const { userId } = useAuth();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) return null;

  const { data: product, isLoading, error } = useProduct(id);
  const deleteProduct = useDeleteProduct();

  const handleDelete = () => {
    if (confirm("Delete this product permanently")) {
      deleteProduct.mutate(id, {
        onSuccess: () => router.replace('/'),
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !product) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Product not found</h2>
          <Link href="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = userId === product.userId;


  return (
    <div className="min-h-[90vh] bg-base-100">
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <Link href="/" className="btn btn-ghost btn-sm gap-1">
            <ArrowLeftIcon className="size-4" />
            Back
          </Link>

          {isOwner && (
            <div className="flex gap-2">
              <Link
                href={`/edit/${product.id}`}
                className="btn btn-outline btn-sm gap-1"
              >
                <EditIcon className="size-4" />
                Edit
              </Link>

              <button
                onClick={handleDelete}
                className="btn btn-error btn-sm gap-1"
                disabled={deleteProduct.isPending}
              >
                {deleteProduct.isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Trash2Icon className="size-4" />
                )}
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Product Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body p-6">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* Image */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-3">
                    {product.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-base-content/60 mb-4">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="size-4" />
                      {new Date(product.createdAt).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-1">
                      <UserIcon className="size-4" />
                      {product.user.name}
                    </div>
                  </div>

                  <div className="divider my-4"></div>

                  <p className="leading-relaxed text-base-content/80">
                    {product.description}
                  </p>
                </div>

                {/* Creator */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={product.user.imageUrl}
                        alt={product.user.name}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{product.user.name}</p>
                    <p className="text-xs text-base-content/50">
                      Creator
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-6">
            <CommentsSection
              productId={id}
              comments={product.comments ?? []}
              currentUserId={userId}
            />
          </div>
        </div>

      </main>
    </div>
  );
}

export default Page;