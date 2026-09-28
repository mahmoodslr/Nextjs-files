import Navbar from "@/components/Navbar";
import ProductCarousel from "@/components/ProductCarousel";
import Hero3D from "@/components/Hero3D";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="text-sm font-medium tracking-widest text-gray-500 dark:text-gray-400">
          COMPUTER ACCESSORIES
        </p>

        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Simple. Powerful. Reliable.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-500 dark:text-gray-400">
          Find the right computer accessories for work, gaming and everyday use.
        </p>

        <a
          href="#products"
          className="mt-8 inline-block rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Explore Products
        </a>

        <Hero3D />
      </section>

      <ProductCarousel />

      <section className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">Built for your everyday setup.</h2>

          <p className="mt-5 leading-7 text-gray-500 dark:text-gray-400">
            Quality computer accessories with a simple shopping experience.
          </p>
        </div>
      </section>
    </main>
  );
}
