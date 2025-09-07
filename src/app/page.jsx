'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, X, ShoppingBag, Star, Clock, Shield, Truck, ArrowRight } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
    const handleWhatsAppOrder = (productName) => {
    const phoneNumber = '2348012345678'; //to be replaced

    const message = `Hello, I want to order: ${productName}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Fetch featured products
   const featuredProducts = [
    {
      id: 1,
      name: "Designer Leather Handbag",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      category: "Bags",
    },
    {
      id: 2,
      name: "Premium Sneakers",
      price: "$189",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      category: "Shoes",
    },
    {
      id: 3,
      name: "Elegant Summer Dress",
      price: "$149",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      category: "Clothes",
    },
    {
      id: 4,
      name: "Classic Blazer",
      price: "$229",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      category: "Clothes",
    },
  ];

  const otherProducts = [
    {
      id: 5,
      name: "Stainless Steel Water Bottle",
      price: "$25",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
      category: "Others",
    },
    {
      id: 6,
      name: "Phone Stand Holder",
      price: "$15",
      image:
        "https://images.unsplash.com/photo-1616353071048-77e2b2c0a73b?w=300&h=300&fit=crop",
      category: "Others",
    },
    {
      id: 7,
      name: "Brand Logo Stickers",
      price: "$8",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      category: "Others",
    },
    {
      id: 8,
      name: "Coffee Travel Mug",
      price: "$32",
      image:
        "https://images.unsplash.com/photo-1556909281-f6e88e81b5e5?w=300&h=300&fit=crop",
      category: "Others",
    },
  ];

  const mainCategories = [
    {
      name: "Shoes",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop",
      description: "Sneakers, heels, boots & more",
      count: "25+ items",
    },
    {
      name: "Bags",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop",
      description: "Handbags, backpacks & accessories",
      count: "30+ items",
    },
    {
      name: "Clothes",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop",
      description: "Dresses, blazers, casual wear",
      count: "40+ items",
    },
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      
      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
      }
    } catch (error) {
      setNewsletterStatus('error');
    }
  };

  const whatsappLink = (productName = '', price = '') => {
    const message = encodeURIComponent(`Hi! I'm interested in pre-ordering ${productName} for ₦${price}. Can you provide more details?`);
    return `https://wa.me/qr/U5TAX4CYW7QCF1?text=${message}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price).replace('NGN', '₦');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Urgency Banner */}
      <div className="bg-[#6A0DAD] text-white py-2 px-4 text-center">
        <p className="text-sm font-medium">
          🔥 Pre-order closes in 7 days - Don't miss out! Free delivery on orders over ₦50,000
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-[#6A0DAD] font-sora">Damola's Essentials</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/" className="text-[#6A0DAD] font-medium border-b-2 border-[#6A0DAD] pb-1">Home</a>
                <a href="/products" className="text-gray-600 hover:text-[#6A0DAD] transition-colors">Products</a>
                <a href="/about" className="text-gray-600 hover:text-[#6A0DAD] transition-colors">About</a>
                <a href="/contact" className="text-gray-600 hover:text-[#6A0DAD] transition-colors">Contact</a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#6A0DAD] transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="/" className="block px-3 py-2 text-[#6A0DAD] font-medium">Home</a>
                <a href="/products" className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors">Products</a>
                <a href="/about" className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors">About</a>
                <a href="/contact" className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A0DAD] to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sora">
            Pre-Order Your Favorite Fashion Products Today
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover the latest trends in fashion and lifestyle. Premium quality, imported directly, delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleWhatsAppOrder}
                className="px-8 py-4 bg-[#6A0DAD] text-white rounded-lg text-lg font-semibold hover:bg-[#5a0b96] transition-colors flex items-center space-x-2"
              >
                <ShoppingBag className="mr-2" size={24} />
                <span>Start Pre-Ordering</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="/products"
                className="px-8 py-4 border-2 border-[#6A0DAD] text-[#6A0DAD] rounded-lg text-lg font-semibold bg-white hover:bg-[#6A0DAD] hover:text-white transition-colors flex items-center space-x-3"
              >
                <Search className="mr-2" size={24} />
                Browse Products
              </a>
            </div>
          {/* <a 
            href={whatsappLink('any product')} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#FFC700] text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingBag className="mr-2" size={24} />
            Start Pre-Ordering Now
          </a> */}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 font-sora">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#6A0DAD] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">1. Pre-Order</h3>
              <p className="text-gray-600">Browse our collection and place your pre-order via WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="bg-[#6A0DAD] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">2. Shipment</h3>
              <p className="text-gray-600">We source and ship your items directly from trusted suppliers</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FFC700] text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">3. Delivery</h3>
              <p className="text-gray-600">Receive your orders within 14-21 days at your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
       {/* Featured Products */}
      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Discover our most popular pre-order items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-[#6A0DAD] bg-purple-100 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-[#6A0DAD] mb-4">
                    {product.price}
                  </p>
                  <button
                    onClick={() => {
                      const message = `Hi! I'd like to pre-order the ${product.name} - ${product.price}`;
                      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                    className="w-full px-4 py-3 bg-[#FFC700] text-black rounded-lg font-semibold hover:bg-[#e6b300] transition-colors"
                  >
                    Pre-Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Explore our main fashion collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainCategories.map((category, index) => (
              <a
                key={index}
                href={`/products?category=${category.name}`}
                className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90 mb-1">
                    {category.description}
                  </p>
                  <p className="text-xs opacity-75">{category.count}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Other Products Preview */}
      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              More Products
            </h2>
            <p className="text-gray-600">
              Accessories, stickers, and everyday essentials
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900 mt-2 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-[#6A0DAD] mb-3">
                    {product.price}
                  </p>
                  <button
                    onClick={() => {
                      const message = `Hi! I'd like to pre-order the ${product.name} - ${product.price}`;
                      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                    className="w-full px-3 py-2 bg-[#FFC700] text-black rounded-lg text-sm font-semibold hover:bg-[#e6b300] transition-colors"
                  >
                    Pre-Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="/products?category=Others"
              className="inline-flex items-center px-6 py-3 border-2 border-[#6A0DAD] text-[#6A0DAD] rounded-lg font-semibold hover:bg-[#6A0DAD] hover:text-white transition-colors"
            >
              View All Accessories
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="text-[#6A0DAD] mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2">Verified Seller</h3>
              <p className="text-gray-600">Trusted by thousands of customers across Nigeria</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="text-[#FFC700] mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium imported products with quality assurance</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="text-[#6A0DAD] mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Direct shipping from China in 14-21 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-[#6A0DAD] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-sora">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">Get notified about new arrivals and exclusive deals</p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FFC700]"
            />
            <button
              type="submit"
              className="bg-[#FFC700] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Subscribe
            </button>
          </form>
          {newsletterStatus === 'success' && (
            <p className="mt-4 text-[#FFC700]">Successfully subscribed! 🎉</p>
          )}
          {newsletterStatus === 'error' && (
            <p className="mt-4 text-red-300">Something went wrong. Please try again.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#FFC700] font-sora">Damola's Essentials</h3>
              <p className="text-gray-300">Your trusted partner for premium fashion and lifestyle products.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="/products" className="text-gray-300 hover:text-white transition-colors">Products</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="/products?category=shoes" className="text-gray-300 hover:text-white transition-colors">Shoes</a></li>
                <li><a href="/products?category=bags" className="text-gray-300 hover:text-white transition-colors">Bags</a></li>
                <li><a href="/products?category=clothes" className="text-gray-300 hover:text-white transition-colors">Clothes</a></li>
                <li><a href="/products?category=others" className="text-gray-300 hover:text-white transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <p className="text-gray-300 mb-2">WhatsApp: +234 XXX XXX XXXX</p>
              <p className="text-gray-300 mb-4">Email: info@damolasessentials.com</p>
              <a
                href="https://wa.me/qr/U5TAX4CYW7QCF1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#FFC700] text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                <ShoppingBag className="mr-2" size={16} />
                Pre-Order Now
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">&copy; 2025 Damola's Essentials. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}