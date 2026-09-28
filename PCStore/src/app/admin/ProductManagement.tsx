"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
};

export default function ProductManagement() {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });
  const [adding, setAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [editProduct, setEditProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("/api/admin/products");

        const data = await response.json();

        if (response.ok) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("PRODUCTS_ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  async function deleteProduct(productId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(productId);

      const response = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not delete product.");
        return;
      }

      setProducts((items) =>
        items.filter((product) => product.id !== productId),
      );
    } catch (error) {
      console.error("DELETE_PRODUCT_ERROR:", error);

      alert("Could not delete product.");
    } finally {
      setDeletingId(null);
    }
  }

  async function addProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setAdding(true);

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not add product.");
        return;
      }

      setProducts((items) => [...items, data.product]);

      setNewProduct({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
      });

      setShowAddForm(false);
    } catch (error) {
      console.error("ADD_PRODUCT_ERROR:", error);

      alert("Could not add product.");
    } finally {
      setAdding(false);
    }
  }

  function startEditing(product: Product) {
    setEditingProduct(product);

    setEditProduct({
      name: product.name,
      description: product.description,
      category: product.category,
      price: String(product.price),
      image: product.image,
    });

    setShowAddForm(false);
  }

  async function updateProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingProduct) return;

    try {
      setUpdating(true);

      const response = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingProduct.id,
          ...editProduct,
          price: Number(editProduct.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not update product.");
        return;
      }

      setProducts((items) =>
        items.map((product) =>
          product.id === data.product.id ? data.product : product,
        ),
      );

      setEditingProduct(null);
    } catch (error) {
      console.error("UPDATE_PRODUCT_ERROR:", error);

      alert("Could not update product.");
    } finally {
      setUpdating(false);
    }
  }
  if (loading) {
    return (
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Products</h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your store products.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          {showAddForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={addProduct}
          className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <h3 className="mb-5 text-lg font-semibold">Add New Product</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <input
              type="text"
              placeholder="Product name"
              value={newProduct.name}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  name: event.target.value,
                })
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
            />

            {/* Category */}
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  category: event.target.value,
                })
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
            />

            {/* Price */}
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  price: event.target.value,
                })
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
            />

            {/* Image */}
            {/* ex: /products/mouse.jpg */}
            <input
              type="text"
              placeholder="/products/mouse.jpg"
              value={newProduct.image}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  image: event.target.value,
                })
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          {/* Description */}
          <textarea
            placeholder="Product description"
            value={newProduct.description}
            onChange={(event) =>
              setNewProduct({
                ...newProduct,
                description: event.target.value,
              })
            }
            rows={4}
            className="mt-4 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
          />

          <button
            type="submit"
            disabled={adding}
            className="mt-4 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900"
          >
            {adding ? "Adding..." : "Add Product"}
          </button>
        </form>
      )}

      {editingProduct && (
        <form
          onSubmit={updateProduct}
          className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Edit Product</h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Editing: {editingProduct.name}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <input
              type="text"
              placeholder="Product name"
              value={editProduct.name}
              onChange={(event) =>
                setEditProduct({
                  ...editProduct,
                  name: event.target.value,
                })
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
            />

            {/* Category */}
            <input
              type="text"
              placeholder="Category"
              value={editProduct.category}
              onChange={(event) =>
                setEditProduct({
                  ...editProduct,
                  category: event.target.value,
                })
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
            />

            {/* Price */}
            <input
              type="number"
              placeholder="Price"
              value={editProduct.price}
              onChange={(event) =>
                setEditProduct({
                  ...editProduct,
                  price: event.target.value,
                })
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
            />

            {/* Image */}
            <input
              type="text"
              placeholder="/products/mouse.jpg"
              value={editProduct.image}
              onChange={(event) =>
                setEditProduct({
                  ...editProduct,
                  image: event.target.value,
                })
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          {/* Description */}
          <textarea
            placeholder="Product description"
            value={editProduct.description}
            onChange={(event) =>
              setEditProduct({
                ...editProduct,
                description: event.target.value,
              })
            }
            rows={4}
            className="mt-4 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
          />

          <button
            type="submit"
            disabled={updating}
            className="mt-4 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900"
          >
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="h-20 w-20 rounded-xl object-cover"
            />

            {/* Information */}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">{product.name}</h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {product.category}
              </p>

              <p className="mt-2 text-sm font-medium">
                {product.price.toLocaleString("en-US")} تومان
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => startEditing(product)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                disabled={deletingId === product.id}
                className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingId === product.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
