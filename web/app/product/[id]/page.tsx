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
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="btn btn-ghost gap-1 btn-sm">
            <ArrowLeftIcon className="size-4" />
            Back
          </Link>
          {isOwner && (
            <div className="flex gap-2">
              <Link href={`/edit/${product.id}`} className="btn btn-ghost btn-sm gap-1">
                <EditIcon className="size-4" /> Edit
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

        <div className="grid lg:grid-cols-2 gap-6 mt-4">
          {/* Image */}
          <div className="card bg-base-300">
            <figure className="p-4">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="rounded-xl w-full h-80 object-cover"
              />
            </figure>
          </div>

          <div className="card bg-base-300">
            <div className="card-body">
              <h1 className="card-title text-2xl">{product.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="size-4" />
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <UserIcon className="size-4" />
                  {product.user?.name}
                </div>
              </div>

              <div className="divider my-2"></div>

              <p className="text-base-content/80 leading-relaxed">{product.description}</p>

              {product.user && (
                <>
                  <div className="divider my-2"></div>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={product.user.imageUrl} alt={product.user.name} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{product.user.name}</p>
                      <p className="text-xs text-base-content/50">Creator</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Comments */}
      <div className="card bg-base-300">
        <div className="card-body">
          <CommentsSection /> 
          {/*  productId={id} comments={product.comments} currentUserId={userId} */}
        </div>
      </div>
    </div>
  );
}

export default Page;