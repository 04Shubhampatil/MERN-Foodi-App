import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Heart, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Recipes', href: '#recipes' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' }
  ];

  const categories = [
    'Vegetarian',
    'Desserts',
    'Quick Meals',
    'Healthy',
    'Italian',
    'Asian',
    'Breakfast',
    'Dinner'
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', name: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', name: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', name: 'Instagram' },
    { icon: <Youtube className="w-5 h-5" />, href: '#', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-3xl font-extrabold text-white">
                Foodi<span className="text-yellow-300">.</span>
              </h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover delicious recipes, share your culinary creations, and join a community of food lovers. 
              Let's cook something amazing together!
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-yellow-300" />
                <span>hello@foodi.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-yellow-300" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-yellow-300" />
                <span>123 Food Street, Taste City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-300">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-300">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-300">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get weekly recipe updates and cooking tips!
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-300 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200 transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-300">
              <span>&copy; {currentYear} Foodi. All rights reserved.</span>
              <span className="flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> for food lovers
              </span>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-yellow-300 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-300 rounded-full opacity-10"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-green-300 rounded-full opacity-10"></div>
      </div>
    </footer>
  );
}

export default Footer;