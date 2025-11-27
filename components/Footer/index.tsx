import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IconType } from "react-icons";

interface SocialLink {
  Icon: IconType;
  href: string;
  color: string;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      Icon: FaFacebookF,
      href: "https://facebook.com/addisstore",
      color: "blue",
    },
    {
      Icon: FaTwitter,
      href: "https://twitter.com/addisstore",
      color: "blue",
    },
    {
      Icon: FaInstagram,
      href: "https://instagram.com/addisstore",
      color: "blue",
    },
    {
      Icon: FaLinkedinIn,
      href: "https://linkedin.com/company/addisstore",
      color: "blue",
    },
  ];

  return (
    <footer className="bg-slate-400 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
          {/* Brand and description */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-slate-100">
              AddisStore
            </h2>
            <p className="text-gray-700">
              Crafting timeless elegance for the modern connoisseur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Blog", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item.toLowerCase() === "home"
                        ? "/"
                        : `/${item.toLowerCase()}`
                    }
                    className="text-gray-700 hover:text-blue-300 transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {["FAQ", "Shipping & Returns", "Warranty", "Privacy Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item
                        .toLowerCase()
                        .replace(" & ", "-")
                        .replace(" ", "-")}`}
                      className="text-gray-700 hover:text-blue-300 transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Stay Updated
            </h3>
            <p className="text-gray-700 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-gray-300 text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className=" bg-slate-500 hover:bg-blue-600 text-gray-900 font-bold py-2 px-4 rounded-r-md transition duration-300"
              >
                <HiOutlineMail className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            {socialLinks.map(({ Icon, href, color }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 hover:text-${color}-400 transition duration-300 transform hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EcommWatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
