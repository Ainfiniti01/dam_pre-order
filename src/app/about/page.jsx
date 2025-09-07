'use client';

import { useState } from 'react';
import { Menu, X, ShoppingBag, Star, Award, Users, Clock, Shield, Truck, Heart, Target, Globe, Phone} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch testimonials/reviews
  const { data: testimonials = [] } = useQuery({
    queryKey: ['reviews', 'approved'],
    queryFn: async () => {
      const response = await fetch('/api/reviews?status=approved');
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      return response.json();
    }
  });

  const whatsappLink = () => {
    const message = encodeURIComponent("Hi! I'd like to learn more about Damola's Essentials and place a pre-order.");
    return `https://wa.me/qr/U5TAX4CYW7QCF1?text=${message}`;
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
                <a href="/products" className="text-gray-600 hover:text-[#6A0DAD] transition-colors">Products</a>
                <a href="/about" className="text-[#6A0DAD] font-medium border-b-2 border-[#6A0DAD] pb-1">About</a>
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
                <a href="/products" className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors">Products</a>
                <a href="/about" className="block px-3 py-2 text-[#6A0DAD] font-medium">About</a>
                <a href="/contact" className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A0DAD] to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sora">About Damola's Essentials</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Your trusted partner in bringing premium fashion and lifestyle products directly to your doorstep.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sora">Meet Damola</h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Hi! I'm Damola, the founder of Damola's Essentials. My journey began with a simple observation: 
                  many Nigerians were spending excessive amounts on fashion and lifestyle products locally, 
                  when the same quality items could be sourced directly from manufacturers at much better prices.
                </p>
                <p>
                  After years of working in import/export, I realized I could bridge this gap by creating 
                  a pre-order system that gives customers access to premium products at competitive prices, 
                  while ensuring quality and authenticity.
                </p>
                <p>
                  Today, Damola's Essentials serves thousands of satisfied customers across Nigeria, 
                  providing everything from fashion-forward clothing and accessories to innovative lifestyle products.
                </p>
              </div>
              <div className="mt-8">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#6A0DAD] text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                >
                  <ShoppingBag className="mr-2" size={20} />
                  Start Your Pre-Order Journey
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#6A0DAD] to-purple-600 rounded-2xl flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={64} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Damola</h3>
                  <p className="text-lg opacity-90">Founder & CEO</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#FFC700] text-black px-4 py-2 rounded-full font-semibold">
                Est. 2022
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sora">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to democratizing access to premium fashion and lifestyle products for everyone in Nigeria.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#6A0DAD] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600">
                To provide Nigerians with direct access to high-quality fashion and lifestyle products 
                at competitive prices, eliminating unnecessary markups while maintaining premium quality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#FFC700] text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Customer First</h3>
              <p className="text-gray-600">
                Every decision we make is centered around our customers' needs. From product selection 
                to delivery, we prioritize your satisfaction and trust above all else.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#6A0DAD] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Global Reach</h3>
              <p className="text-gray-600">
                By connecting directly with international suppliers, we bring the world's best products 
                to Nigeria, making global fashion accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sora">Why Choose Damola's Essentials?</h2>
            <p className="text-xl text-gray-600">
              Here's what sets us apart in the competitive world of fashion retail.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="text-[#6A0DAD] mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Verified Seller</h3>
              <p className="text-gray-600 text-sm">
                Trusted by thousands of customers across Nigeria with consistent 5-star ratings.
              </p>
            </div>
            
            <div className="text-center">
              <Award className="text-[#FFC700] mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">
                We personally vet every supplier and product to ensure you receive only the best.
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="text-[#6A0DAD] mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Direct shipping from China ensures your orders arrive within 14-21 days.
              </p>
            </div>
            
            <div className="text-center">
              <Truck className="text-[#FFC700] mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Transparent Process</h3>
              <p className="text-gray-600 text-sm">
                Track your order from pre-order to delivery with regular updates via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sora">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in building Nigeria's premier pre-order fashion platform.</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="bg-[#6A0DAD] text-white w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2022</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Founded Damola's Essentials</h3>
                <p className="text-gray-600">Started with a vision to make premium fashion accessible to all Nigerians through direct import pre-orders.</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-[#FFC700] text-black w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2023</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">1,000+ Happy Customers</h3>
                <p className="text-gray-600">Reached our first major milestone with over 1,000 satisfied customers across Nigeria.</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-[#6A0DAD] text-white w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2024</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expanded Product Range</h3>
                <p className="text-gray-600">Added lifestyle products, accessories, and tech gadgets to our fashion-focused catalog.</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-[#FFC700] text-black w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2025</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Going Digital</h3>
                <p className="text-gray-600">Launched our new website to serve customers better and streamline the pre-order process.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sora">What Our Customers Say</h2>
              <p className="text-xl text-gray-600">Real reviews from real customers who trust Damola's Essentials.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 6).map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="flex text-[#FFC700]">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">({testimonial.rating}/5)</span>
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#6A0DAD] text-white rounded-full flex items-center justify-center font-semibold">
                      {testimonial.customer_name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">{testimonial.customer_name}</p>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand Message */}
      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Brand Image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" // Updated image URL to match the one in the provided snippet
                alt="Fashion studio workspace"
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Brand Message Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Damola's Essentials?</h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Exclusive Access:</strong> Be among the first to own the latest fashion trends before they become widely available.
                </p>
                <p>
                  <strong className="text-gray-900">Quality Assurance:</strong> Every item in our collection is carefully vetted for quality, authenticity, and craftsmanship.
                </p>
                <p>
                  <strong className="text-gray-900">Supporting Designers:</strong> Your pre-orders help support emerging and established designers in bringing their creative visions to life.
                </p>
                <p>
                  <strong className="text-gray-900">Community-Driven:</strong> Join a community of fashion enthusiasts who share your passion for style and quality.
                </p>
                <p>
                  <strong className="text-gray-900">Personalized Service:</strong> Our team is dedicated to providing personalized recommendations and exceptional customer service.
                </p>
              </div>

              <a
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-[#FFC700] text-black rounded-lg font-semibold hover:bg-[#e6b300] transition-colors"
              >
                Explore Our Collection
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#6A0DAD] mb-2">10,000+</div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#6A0DAD] mb-2">500+</div>
              <div className="text-gray-600 font-medium">Products Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#6A0DAD] mb-2">50+</div>
              <div className="text-gray-600 font-medium">Partner Designers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#6A0DAD] mb-2">98%</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6A0DAD] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-sora">Ready to Start Your Pre-Order Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Damola's Essentials for their fashion and lifestyle needs.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#FFC700] text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            <Phone className="mr-2" size={24} />
            Talk To Us
          </a>
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
