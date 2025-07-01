import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-50 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Bags
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shoes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Lookbook
              </a>
            </li>
          </ul>
        </div>
        {/* Info */}
        <div>
          <h3 className="font-semibold mb-2">Info</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shipping policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-2">Subscribe to our emails</h3>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="border rounded-sm px-2 py-1 w-full"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-1 rounded-sm font-medium text-sm hover:bg-gray-900 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Social & Country */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.019 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.019 22 12z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-red-600">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.8 8.001a2.75 2.75 0 0 0-1.936-1.946C18.13 6 12 6 12 6s-6.13 0-7.864.055A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999 2.75 2.75 0 0 0 1.936 1.946C5.87 18 12 18 12 18s6.13 0 7.864-.055A2.75 2.75 0 0 0 21.8 15.999 28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999zM10 15V9l6 3-6 3z" />
              </svg>
            </a>
          </div>
          <div>
            <label htmlFor="country" className="block text-xs mb-1">
              Country/region
            </label>
            <select id="country" className="border rounded-sm px-2 py-1 w-full">
              <option>Canada | CAD $</option>
              <option>United States | USD $</option>
              <option>United Kingdom | GBP £</option>
              <option>France | EUR €</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-4 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <span>© {new Date().getFullYear()}, Dawn Theme Demo</span>
        <span>Powered by Next.js & Tailwind CSS</span>
      </div>
    </footer>
  );
};

export default Footer;
