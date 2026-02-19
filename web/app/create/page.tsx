"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthReq from "../src/hooks/useAuthReq";
import { useCreateProduct } from "../src/hooks/useProducts";
import Link from "next/link";
import { ArrowLeftIcon, FileTextIcon, ImageIcon, SparklesIcon, TypeIcon } from "lucide-react";

export default function Page() {
  const { isSignedIn } = useAuthReq();
  const router = useRouter();
  const createProduct = useCreateProduct();
  const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "" });

  useEffect(() => {
    if (isSignedIn === false) {
      router.replace("/"); // replace prevents back navigation
    }
  }, [isSignedIn, router]);

  if (isSignedIn === false) return null; // prevent flash

  // Do everything below!!

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct.mutate(formData, {
      onSuccess: () => router.replace("/"),
    });
  };

  return (
    <div className="min-h-[90vh] bg-base-100">
      <main className="max-w-lg mx-auto px-4 py-8">
        <div>
          <Link href="/" className="btn btn-ghost btn-sm gap-1 mb-4">
            <ArrowLeftIcon className="size-4" /> Back
          </Link>

          <div className="card bg-base-300">
            <div className="card-body">
              <h1 className="card-title">
                <SparklesIcon className="size-5 text-primary" />
                New Product
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* TITLE INPUT */}
                <label className="input input-bordered flex items-center gap-2 bg-base-200">
                  <TypeIcon className="size-4 text-base-content/50" />
                  <input
                    type="text"
                    placeholder="Product title"
                    className="grow"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </label>
                {/* IMGURL INPUT */}
                <label className="input input-bordered flex items-center gap-2 bg-base-200">
                  <ImageIcon className="size-4 text-base-content/50" />
                  <input
                    type="url"
                    placeholder="Image URL"
                    className="grow"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    required
                  />
                </label>

                {/* IMG PREVIEW */}
                {formData.imageUrl && (
                  <div className="rounded-box overflow-hidden">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.style.display = "none";
                      }}

                    />
                  </div>
                )}

                <div className="form-control">
                  <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                    <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                    <textarea
                      placeholder="Description"
                      className="grow bg-transparent resize-none focus:outline-none min-h-24"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {createProduct.isError && (
                  <div role="alert" className="alert alert-error alert-sm">
                    <span>Failed to create. Try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={createProduct.isPending}
                >
                  {createProduct.isPending ? (
                    <span className="loading loading-spinner" />
                  ) : (
                    "Create Product"
                  )}
                </button>

              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
