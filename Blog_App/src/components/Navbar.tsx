import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-900">
        <Link href="/">My Blog</Link>
      </div>
      <div className="space-x-20">
        <Link
          className="text-2xl text-gray-900 hover:text-gray-500 transition"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-2xl text-gray-900 hover:text-gray-500 transition"
          href="/blogs"
        >
          Blogs
        </Link>
      </div>
      <Link
        href="/create-blog"
        className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
      >
        Create
      </Link>
    </nav>
  );
}

export default Navbar;
