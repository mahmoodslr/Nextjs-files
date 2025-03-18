"use client";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import Container from "./Container";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import Cookies from "js-cookie";

function Navbar() {
  const pathName = usePathname();
  const { cartTotalQty } = useShoppingCartContext();
  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/store", title: "Store" },
    { href: "/dashboard", title: "Dashboard" },
    { href: "/login", title: "Login" },
  ];

  return (
    <nav className="bg-white shadow-md py-4">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                className={`text-lg font-medium transition-colors duration-300 ${
                  pathName === item.href
                    ? "text-sky-600 font-semibold"
                    : "text-gray-700 hover:text-sky-500"
                }`}
                href={item.href}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <span
                className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-bold text-white rounded-full ${
                  cartTotalQty > 0 ? "bg-red-500" : "bg-gray-400"
                }`}
              >
                {cartTotalQty}
              </span>
              <span
                className={`text-lg transition-colors duration-300 ${
                  pathName === "/cart"
                    ? "text-sky-600 font-semibold"
                    : "text-gray-700 hover:text-sky-500"
                }`}
              >
                Cart 🛒
              </span>
            </Link>
            <button
              onClick={() => {
                Cookies.remove("token");
                redirect("/");
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Exit
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
