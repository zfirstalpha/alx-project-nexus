import Link from "next/link";
import { useState } from "react";
import CartIcon from "@/components/Cart/CartIconNav";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Products", "Contact", "About"];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-primary transition-colors"
          >
            EcommStore
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex space-x-8">
              {navItems.map((item) => {
                const href = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <li key={item}>
                    <Link
                      href={href}
                      className="text-gray-700 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Cart Icon */}
          <div className="ml-auto lg:ml-0">
            <CartIcon />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-out overflow-hidden ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="pt-2 pb-4 space-y-2">
            {navItems.map((item) => {
              const href = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <Link
                  key={item}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
