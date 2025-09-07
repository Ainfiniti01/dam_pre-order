'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Star, ArrowLeft, Heart, Share2, Truck, Shield, Clock } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function ProductDetailPage({ params }) {
  const productId = params.id;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    customer_name: '',
    customer_email: '',
    rating: 5,
    comment: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const queryClient = useQueryClient();

  // Fetch product details
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return response.json();
    },
    enabled: !!productId
  });

  // Fetch product reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await fetch(`/api/reviews?product_id=${productId}&status=approved`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    },
    enabled: !!productId
  });

  // Submit review mutation
  const submitReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      if (!response.ok) throw new Error('Failed to submit review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', productId]);
      setReviewForm({ customer_name: '', customer_email: '', rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    submitReviewMutation.mutate({
      ...reviewForm,
      product_id: productId
    });
  };

  const whatsappLink = (productName = '', price = '') => {
    const message = encodeURIComponent(`Hi! I'm interested in pre-ordering "${productName}" for ₦${price}. Can you provide more details about delivery and payment?`);
    return `https://wa.me/qr/U5TAX4CYW7QCF1?text=${message}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price).replace('NGN', '₦');
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A0DAD]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <a href="/products" className="text-[#6A0DAD] font-semibold hover:text-purple-600">
            ← Back to Products
          </a>
        </div>
      </div>
    );
  }

  const productImages = product.image_url ? [product.image_url] : [];

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
                <a href="/products" className="text-[#6A0DAD] font-medium">Products</a>
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
                <a href="/" className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors">Home</a>
                <a href="/products" className="block px-3 py-2 text-[#6A0DAD] font-medium">Products</a>
                <a href="/about" className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors">About</a>
                <a href="/contact" className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-500 hover:text-[#6A0DAD]">Home</a>
            <span className="text-gray-400">/</span>
            <a href="/products" className="text-gray-500 hover:text-[#6A0DAD]">Products</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 capitalize">{product.category_name}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={productImages[selectedImage] || product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-[#6A0DAD]' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-600 capitalize">Category: {product.category_name}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={24} />
                </button>
                <button className="p-2 text-gray-400 hover:text-[#6A0DAD] transition-colors">
                  <Share2 size={24} />
                </button>
              </div>
            </div>

            {/* Labels */}
            {product.labels && Array.isArray(product.labels) && product.labels.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.labels.map((label, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      label.includes('Sale') || label.includes('%')
                        ? 'bg-red-500 text-white'
                        : label === 'New'
                        ? 'bg-green-500 text-white'
                        : label === 'Limited Stock'
                        ? 'bg-orange-500 text-white'
                        : 'bg-[#FFC700] text-black'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4 mb-6">
              <p className="text-4xl font-bold text-[#6A0DAD]">
                {formatPrice(product.price)}
              </p>
              {reviews.length > 0 && (
                <div className="flex items-center">
                  <div className="flex text-[#FFC700] mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < Math.floor(calculateAverageRating()) ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {calculateAverageRating()} ({reviews.length} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'No description available for this product.'}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="text-[#6A0DAD]" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">Fast Delivery</p>
                  <p className="text-sm text-gray-600">14-21 days</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="text-[#6A0DAD]" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">Quality Assured</p>
                  <p className="text-sm text-gray-600">Verified products</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="text-[#6A0DAD]" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">Pre-Order</p>
                  <p className="text-sm text-gray-600">Limited stock</p>
                </div>
              </div>
            </div>

            {/* Pre-Order Button */}
            <div className="space-y-4">
              <a
                href={whatsappLink(product.name, product.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#6A0DAD] text-white py-4 px-8 rounded-lg font-semibold hover:bg-purple-600 transition-colors inline-flex items-center justify-center text-lg"
              >
                <ShoppingBag className="mr-3" size={24} />
                Pre-Order via WhatsApp
              </a>
              
              <p className="text-center text-sm text-gray-500">
                Secure payment • 14-21 day delivery • Quality guaranteed
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-[#FFC700] text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Write a Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Experience</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={reviewForm.customer_name}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, customer_name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={reviewForm.customer_email}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, customer_email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                        className={`p-1 ${star <= reviewForm.rating ? 'text-[#FFC700]' : 'text-gray-300'}`}
                      >
                        <Star size={24} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comment *</label>
                  <textarea
                    required
                    rows={4}
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent resize-none"
                    placeholder="Share your experience with this product..."
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={submitReviewMutation.isLoading}
                    className="bg-[#6A0DAD] text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50"
                  >
                    {submitReviewMutation.isLoading ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#6A0DAD] text-white rounded-full flex items-center justify-center font-semibold">
                        {review.customer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.customer_name}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex text-[#FFC700]">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
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