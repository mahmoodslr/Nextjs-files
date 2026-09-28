"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // محصول انتخاب شده برای Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // وضعیت افزودن به سبد
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  // GET PRODUCTS
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("PRODUCT_ERROR:", error);
      }
    }

    getProducts();
  }, []);

  // NEXT / PREVIOUS
  const nextSlide = () => {
    if (products.length === 0) return;

    setCurrentIndex((current) =>
      current === products.length - 1 ? 0 : current + 1,
    );
  };

  const previousSlide = () => {
    if (products.length === 0) return;

    setCurrentIndex((current) =>
      current === 0 ? products.length - 1 : current - 1,
    );
  };

  // AUTO SLIDE
  useEffect(() => {
    if (products.length === 0) return;

    // وقتی Modal باز است، Carousel حرکت نکند
    if (selectedProduct) return;

    const interval = setInterval(nextSlide, 4000);

    return () => clearInterval(interval);
  }, [products.length, selectedProduct]);

  // ADD TO CART FROM MODAL
  async function handleAddToCart() {
    if (!selectedProduct) return;

    setAddingToCart(true);
    setCartMessage("");

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedProduct.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setCartMessage(data.message || "Something went wrong.");
        return;
      }

      // نمایش پیام موفقیت
      setCartMessage("Product added to cart.");

      // آپدیت تعداد Cart در Navbar
      window.dispatchEvent(new Event("cartUpdated"));

      // حذف پیام بعد از 2 ثانیه
      setTimeout(() => {
        setCartMessage("");
      }, 2000);
    } catch (error) {
      console.error("ADD_TO_CART_ERROR:", error);
      setCartMessage("Something went wrong.");
    } finally {
      setAddingToCart(false);
    }
  }

  // LOADING
  if (products.length === 0) {
    return (
      <section id="products" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading products...
        </p>
      </section>
    );
  }

  return (
    <>
      <section id="products" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
              OUR PRODUCTS
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Popular Products
            </h2>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={previousSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((offset) => {
            const product = products[(currentIndex + offset) % products.length];

            return (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
          <button
            onClick={previousSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
          >
            ←
          </button>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} / {products.length}
          </span>

          <button
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
          >
            →
          </button>
        </div>
      </section>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          onClick={() => {
            setSelectedProduct(null);
            setCartMessage("");
          }}
        >
          <div
            className="relative w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-gray-900"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => {
                setSelectedProduct(null);
                setCartMessage("");
              }}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-700 shadow-md transition hover:bg-gray-100 dark:bg-gray-900/90 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              ×
            </button>

            <div className="h-64 w-full overflow-hidden bg-gray-100 sm:h-80 dark:bg-gray-800">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {selectedProduct.category}
              </span>

              <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                {selectedProduct.name}
              </h2>

              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                {selectedProduct.description}
              </p>

              <div className="mt-6">
                <p className="text-sm text-gray-400">Price</p>

                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProduct.price.toLocaleString("en-US")} تومان
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="mt-8 w-full rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>

              {cartMessage && (
                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                  {cartMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
