'use client';

import { useState, useEffect, useRef } from 'react'; // Added useRef
import { useQuery } from '@tanstack/react-query';
import { Search, ArrowUpDown, Eye, X, ShoppingBag, Menu, Filter, SortAsc } from 'lucide-react';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showQuickView, setShowQuickView] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false); // New state

  const searchInputRef = useRef(null); // New ref

  // Auto-focus search input when mobile search overlay is visible
  useEffect(() => {
    if (isMobileSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchVisible]);

  const staticAllProducts = [
    {
      id: 1,
      name: "Designer Leather Handbag",
      price: 299,
      priceText: "$299",
      image_url: // Changed to image_url to match previous code
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      category_slug: "bags", // Changed to category_slug to match previous code
      category_name: "Bags", // Added category_name for display
      description: "Premium leather handbag with gold hardware",
      popularity: 95,
    },
    {
      id: 2,
      name: "Premium Sneakers",
      price: 189,
      priceText: "$189",
      image_url:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      category_slug: "shoes",
      category_name: "Shoes",
      description: "Comfortable and stylish premium sneakers",
      popularity: 88,
    },
    {
      id: 3,
      name: "Elegant Summer Dress",
      price: 149,
      priceText: "$149",
      image_url:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      category_slug: "clothes",
      category_name: "Clothes",
      description: "Beautiful summer dress perfect for any occasion",
      popularity: 92,
    },
    {
      id: 4,
      name: "Classic Blazer",
      price: 229,
      priceText: "$229",
      image_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      category_slug: "clothes",
      category_name: "Clothes",
      description: "Timeless blazer for professional and casual wear",
      popularity: 85,
    },
    {
      id: 5,
      name: "Crossbody Mini Bag",
      price: 159,
      priceText: "$159",
      image_url:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category_slug: "bags",
      category_name: "Bags",
      description: "Compact and versatile crossbody bag",
      popularity: 90,
    },
    {
      id: 6,
      name: "Running Shoes",
      price: 159,
      priceText: "$159",
      image_url:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category_slug: "shoes",
      category_name: "Shoes",
      description: "High-performance running shoes with advanced cushioning",
      popularity: 87,
    },
    {
      id: 7,
      name: "Casual Jeans",
      price: 89,
      priceText: "$89",
      image_url:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      category_slug: "clothes",
      category_name: "Clothes",
      description: "Comfortable everyday jeans with perfect fit",
      popularity: 82,
    },
    {
      id: 8,
      name: "Evening Heels",
      price: 199,
      priceText: "$199",
      image_url:
        "https://images.unsplash.com/photo-1543163521-1bf53994554d2?w=400&h=400&fit=crop",
      category_slug: "shoes",
      category_name: "Shoes",
      description: "Elegant heels perfect for special occasions",
      popularity: 89,
    },
    {
      id: 9,
      name: "Leather Tote Bag",
      price: 259,
      priceText: "$259",
      image_url:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      category_slug: "bags",
      category_name: "Bags",
      description: "Spacious leather tote for work and travel",
      popularity: 91,
    },
    {
      id: 10,
      name: "Wool Sweater",
      price: 129,
      priceText: "$129",
      image_url:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
      category_slug: "clothes",
      category_name: "Clothes",
      description: "Cozy wool sweater for cold weather",
      popularity: 86,
    },
    // Others/Accessories
    {
      id: 11,
      name: "Stainless Steel Water Bottle",
      price: 25,
      priceText: "$25",
      image_url:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      category_slug: "others",
      category_name: "Others",
      description: "Eco-friendly stainless steel water bottle",
      popularity: 75,
    },
    {
      id: 12,
      name: "Phone Stand Holder",
      price: 15,
      priceText: "$15",
      image_url:
        "https://images.unsplash.com/photo-1616353071048-77e2b2c0a73b?w=400&h=400&fit=crop",
      category_slug: "others",
      category_name: "Others",
      description: "Adjustable phone stand for desk or bedside",
      popularity: 70,
    },
    {
      id: 13,
      name: "Brand Logo Stickers Pack",
      price: 8,
      priceText: "$8",
      image_url:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      category_slug: "others",
      category_name: "Others",
      description: "Set of 10 waterproof brand logo stickers",
      popularity: 65,
    },
    {
      id: 14,
      name: "Coffee Travel Mug",
      price: 32,
      priceText: "$32",
      image_url:
        "https://images.unsplash.com/photo-1556909281-f6e88e81b5e5?w=400&h=400&fit=crop",
      category_slug: "others",
      category_name: "Others",
      description: "Insulated travel mug with leak-proof lid",
      popularity: 78,
    },
    {
      id: 15,
      name: "Wireless Earphone Case",
      price: 22,
      priceText: "$22",
      image_url:
        "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
      category_slug: "others",
      category_name: "Others",
      description: "Protective silicone case for wireless earphones",
      popularity: 72,
    },
    {
      id: 16,
      name: "Laptop Stickers Bundle",
      price: 12,
      priceText: "$12",
      image_url:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop",
      category_slug: "others",
      category_name: "Others",
      description: "Collection of 20 trendy laptop stickers",
      popularity: 68,
    },
    {
      id: 17,
      name: "Desk Organizer Tray",
      price: 28,
      priceText: "$28",
      image_url:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      category_slug: "others",
      category_name: "Others",
      description: "Bamboo desk organizer with multiple compartments",
      popularity: 74,
    },
    {
      id: 18,
      name: "Custom Keychain",
      price: 10,
      priceText: "$10",
      image_url:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      category_slug: "others",
      category_name: "Others",
      description: "Personalized metal keychain with engraving",
      popularity: 69,
    },
  ];

  // Extract unique categories from staticAllProducts
  const uniqueCategories = Array.from(new Set(staticAllProducts.map(product => product.category_slug)));
  const categories = uniqueCategories.map((catSlug, index) => ({
    id: `${catSlug}-${index}`, // Generate a unique ID
    name: catSlug.charAt(0).toUpperCase() + catSlug.slice(1), // Capitalize first letter for display name
    slug: catSlug
  }));

  // Filter products based on searchTerm and selectedCategory
  const filteredProducts = staticAllProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Check for 'new' category specifically
    const matchesCategory = selectedCategory === 'all' || 
                              (selectedCategory === 'new' && product.isNew) || 
                              product.category_slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const filteredAndSortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    } else if (sortBy === "price") {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    } else if (sortBy === "popularity") {
      const popularityA = a.popularity || 0;
      const popularityB = b.popularity || 0;
      if (sortOrder === "asc") {
        return popularityA - popularityB;
      } else {
        return popularityB - popularityA;
      }
    }
    return 0; // Default case
  });

  // Mock isLoading state since we are using static data
  const isLoading = false;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price).replace('NGN', '₦');
  };

  const handleWhatsAppOrder = (product) => {
    const message = encodeURIComponent(`Hi! I'm interested in pre-ordering ${product.name} for ${formatPrice(product.price)}. Can you provide more details?`);
    window.open(`https://wa.me/qr/U5TAX4CYW7QCF1?text=${message}`, '_blank');
  };

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-white">
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
                <a href="/" className="text-gray-600 hover:text-[#6A0DAD] transition-colors">Home</a>
                <a href="/products" className="text-[#6A0DAD] font-medium border-b-2 border-[#6A0DAD] pb-1">Products</a>
                <a href="/about" className="text-gray-600 hover:text-[#6A0DAD] transition-colors">About</a>
                {/* Desktop CTA Button */}
                <a
                  href="/contact"
                  className="block px-3 py-2 bg-[#FFC700] text-black rounded-lg font-semibold hover:bg-[#e6b300] transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Mobile menu button and Search Icon */}
            <div className="md:hidden flex items-center">
              {/* Search Icon */}
              <button
                onClick={() => setIsMobileSearchVisible(true)} // Set to true to show overlay
                className="p-2 rounded-md text-gray-600 hover:text-[#6A0DAD] transition-colors mr-2"
              >
                <Search size={24} />
              </button>
              {/* Mobile Menu Button */}
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
                <a href="/" className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors">Home</a>
                <a href="/products" className="block px-3 py-2 text-[#6A0DAD] font-medium">Products</a>
                <a href="/about" className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors">About</a>
                <a
                  href="/contact"
                  className="block px-3 py-2 bg-[#FFC700] text-black rounded-lg font-semibold hover:bg-[#e6b300] transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Page Header */}
      <section className="px-6 md:px-12 py-12 bg-gray-50">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of fashion items available for
            pre-order. Find the perfect bags, shoes, and clothes for your style.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="px-6 md:px-12 py-8 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto sticky top-16 z-40 bg-white"> {/* Added sticky classes */}
          {/* Search Bar - Hidden on mobile, visible on desktop */}
          <div className="mb-6 hidden md:block"> {/* Added hidden md:block */}
            <div className="relative max-w-md mx-auto md:mx-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filters and Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                key="all"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? "bg-[#6A0DAD] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {/* New Filter Button */}
              <button
                onClick={() => setSelectedCategory('new')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'new'
                    ? "bg-[#6A0DAD] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                New
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? "bg-[#6A0DAD] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleSort("name")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                    sortBy === "name"
                      ? "bg-[#6A0DAD] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>Name</span>
                  {sortBy === "name" && <ArrowUpDown className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => toggleSort("price")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                    sortBy === "price"
                      ? "bg-[#6A0DAD] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>Price</span>
                  {sortBy === "price" && <ArrowUpDown className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => toggleSort("popularity")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                    sortBy === "popularity"
                      ? "bg-[#6A0DAD] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>Popular</span>
                  {sortBy === "popularity" && (
                    <ArrowUpDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedProducts.length} of {staticAllProducts.length}{" "}
              products
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Search Overlay */}
      {isMobileSearchVisible && (
        <div className="fixed inset-0 bg-white z-50 p-4 flex flex-col transition-opacity duration-300 ease-in-out"> {/* Added transition */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Search Products</h2>
            <button
              onClick={() => setIsMobileSearchVisible(false)}
              className="text-gray-600 hover:text-[#6A0DAD]"
            >
              <X size={24} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={searchInputRef} // Added ref
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Products Grid */}
      <section className="md:px-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? ( // isLoading is now false
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => {
                const isMainCategory = ['shoes', 'bags', 'clothes'].includes(product.category_slug);
                return (
                  <div
                    key={product.id}
                    className={`group cursor-pointer ${isMainCategory ? 'lg:col-span-1' : ''}`}
                  >
                      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />

                        {/* Badges for Product Specifications */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.isNew && (
                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                          {product.isOnSale && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Sale
                            </span>
                          )}
                          {product.isPreOrder && (
                            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Pre Order
                            </span>
                          )}
                          {product.hasFreeDelivery && (
                            <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Free Delivery
                            </span>
                          )}
                          {product.discountPercentage && product.isOnSale && (
                            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {product.discountPercentage}% Off
                            </span>
                          )}
                          {product.limitedStock && (
                            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                              Limited Stock ({product.limitedStock})
                            </span>
                          )}
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowQuickView(product)}
                              className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center"
                            >
                              <Eye size={16} className="mr-1" />
                              Quick View
                            </button>
                            <button
                              onClick={() => handleWhatsAppOrder(product)}
                              className="bg-[#FFC700] text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                            >
                              Pre-Order
                            </button>
                          </div>
                        </div>
                      </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#6A0DAD] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                      <p className="text-lg font-bold text-[#6A0DAD] mt-2">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">{product.category_name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
              <button
                onClick={() => setShowQuickView(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={showQuickView.image_url}
                    alt={showQuickView.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  {/* Badges for Product Specifications in Quick View */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {showQuickView.isNew && (
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                    {showQuickView.isOnSale && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                    {showQuickView.isPreOrder && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Pre Order
                      </span>
                    )}
                    {showQuickView.hasFreeDelivery && (
                      <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Free Delivery
                      </span>
                    )}
                    {showQuickView.discountPercentage && showQuickView.isOnSale && (
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {showQuickView.discountPercentage}% Off
                      </span>
                    )}
                    {showQuickView.limitedStock && (
                      <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                        Limited Stock ({showQuickView.limitedStock})
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{showQuickView.name}</h3>
                  <p className="text-xl font-bold text-[#6A0DAD] mb-4">
                    {formatPrice(showQuickView.price)}
                  </p>

                  <p className="text-gray-600 mb-4">{showQuickView.description}</p>
                  <p className="text-sm text-gray-500 mb-6">
                    <strong>Category:</strong> {showQuickView.category_name}
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    <strong>Delivery Estimate:</strong> 14-21 days
                  </p>

                  <button
                    onClick={() => handleWhatsAppOrder(showQuickView)}
                    className="w-full bg-[#6A0DAD] text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors inline-flex items-center justify-center"
                  >
                    <ShoppingBag className="mr-2" size={20} />
                    Pre-Order via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Keeping the existing footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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
