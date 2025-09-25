import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { name: "About Us", to: "/about" },
    { name: "Recipes", to: "/recipes" },
    { name: "Blog", to: "/blog" },
    { name: "Contact", to: "/contact" },
  ];

  const categories = [
    { name: "Vegetarian", to: "/category/vegetarian" },
    { name: "Desserts", to: "/category/desserts" },
    { name: "Quick Meals", to: "/category/quick-meals" },
    { name: "Healthy", to: "/category/healthy" },
  ];

  const socials = [
    { Icon: Facebook, name: "Facebook", to: "/facebook" },
    { Icon: Twitter, name: "Twitter", to: "/twitter" },
    { Icon: Instagram, name: "Instagram", to: "/instagram" },
    { Icon: Youtube, name: "YouTube", to: "/youtube" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Foodi<span className="text-yellow-300">.</span>
          </h2>
          <p className="text-gray-400 mb-4">
            Discover delicious recipes & join a community of food lovers.
          </p>
          <div className="space-y-2 text-gray-400">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-300" /> hello@foodi.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-300" /> +1 (555) 123-4567
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-300" /> 123 Food Street
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="text-gray-400 hover:text-yellow-300 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((cat, i) => (
              <li key={i}>
                <Link
                  to={cat.to}
                  className="text-gray-400 hover:text-yellow-300 transition"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">
            Newsletter
          </h3>
          <p className="text-gray-400 mb-3">
            Subscribe to get weekly recipe updates!
          </p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
            />
            <button
              type="submit"
              className="w-full bg-yellow-300 text-gray-900 font-semibold py-2 rounded hover:bg-yellow-400 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
          <span>
            © {year} Foodi. Made with{" "}
            <Heart className="w-4 h-4 inline text-red-500" /> for food lovers
          </span>
          <div className="flex gap-3">
            {socials.map(({  Icon, to, name }, i) => (
              <Link
                key={i}
                to={to}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-300 hover:text-gray-900 transition"
                aria-label={name}
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
