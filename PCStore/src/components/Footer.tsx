export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sm text-white dark:bg-white dark:text-gray-900">
                P
              </div>

              <span>PCStore</span>
            </div>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
              Simple, reliable computer accessories for your everyday setup.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500 dark:text-gray-400">
            <a
              href="/"
              className="transition hover:text-gray-900 dark:hover:text-white"
            >
              Home
            </a>

            <a
              href="/#products"
              className="transition hover:text-gray-900 dark:hover:text-white"
            >
              Products
            </a>

            <a
              href="/cart"
              className="transition hover:text-gray-900 dark:hover:text-white"
            >
              Cart
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-xs text-gray-400 sm:text-left">
            © {new Date().getFullYear()} PCStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
