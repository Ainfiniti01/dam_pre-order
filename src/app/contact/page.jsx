'use client';


import { useState } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Music,
  Star,
  Award,
  Users,
  Shield,
  Truck,
  Heart,
  Target,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappLink = () => {
    const message = encodeURIComponent(
      "Hi! I have a question about Damola's Essentials. Can you help me?",
    );
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
                <h1 className="text-xl font-bold text-[#6A0DAD] font-sora">
                  Damola's Essentials
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="/"
                  className="text-gray-600 hover:text-[#6A0DAD] transition-colors"
                >
                  Home
                </a>
                <a
                  href="/products"
                  className="text-gray-600 hover:text-[#6A0DAD] transition-colors"
                >
                  Products
                </a>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-[#6A0DAD] transition-colors"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="text-[#6A0DAD] font-medium border-b-2 border-[#6A0DAD] pb-1"
                >
                  Contact
                </a>
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
                <a
                  href="/"
                  className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors"
                >
                  Home
                </a>
                <a
                  href="/products"
                  className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors"
                >
                  Products
                </a>
                <a
                  href="/about"
                  className="block px-3 py-2 text-gray-600 hover:text-[#6A0DAD] transition-colors"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="block px-3 py-2 text-[#6A0DAD] font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6A0DAD] to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sora">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Have questions about our products or pre-order process? We're here
            to help!
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sora">
              Reach Out to Us
            </h2>
            <p className="text-xl text-gray-600">
              Choose your preferred way to connect with our team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* WhatsApp */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                WhatsApp Pre-Order
              </h3>
              <p className="text-gray-600 mb-6">
                Get instant responses and place your pre-orders directly via
                WhatsApp.
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="mr-2" size={20} />
                Chat Now
              </a>
            </div>

            {/* Email */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center hover:shadow-lg transition-shadow">
              <div className="bg-[#6A0DAD] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Email Support
              </h3>
              <p className="text-gray-600 mb-6">
                Send us detailed questions and we'll respond within 24 hours.
              </p>
              <a
                href="mailto:info@damolasessentials.com"
                className="inline-flex items-center bg-[#6A0DAD] text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
              >
                <Mail className="mr-2" size={20} />
                Send Email
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center hover:shadow-lg transition-shadow">
              <div className="bg-[#FFC700] text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Phone Support
              </h3>
              <p className="text-gray-600 mb-6">
                Call us during business hours for immediate assistance.
              </p>
              <a
                href="tel:+234XXXXXXXXX"
                className="inline-flex items-center bg-[#FFC700] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                <Phone className="mr-2" size={20} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Social Media */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-sora">
                Contact Information
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <MessageCircle
                    className="text-[#6A0DAD] mt-1 mr-4"
                    size={24}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      WhatsApp
                    </h3>
                    <p className="text-gray-600">+234 XXX XXX XXXX</p>
                    <p className="text-sm text-gray-500">
                      Available 24/7 for pre-orders
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-[#6A0DAD] mt-1 mr-4" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@damolasessentials.com</p>
                    <p className="text-sm text-gray-500">
                      Response within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="text-[#6A0DAD] mt-1 mr-4" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 7:00 PM
                    </p>
                    <p className="text-gray-600">
                      Saturday: 10:00 AM - 5:00 PM
                    </p>
                    <p className="text-gray-600">Sunday: 12:00 PM - 4:00 PM</p>
                    <p className="text-sm text-gray-500">
                      West Africa Time (WAT)
                    </p>
                  </div>
                </div>

                {/* Service Area */}
                <div className="flex items-start">
                  <MapPin className="text-[#6A0DAD] mt-1 mr-4" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Service Area
                    </h3>
                    <p className="text-gray-600">123 Fashion District
                      New York, NY 10001
                      United States
                    </p>
                    <p className="text-gray-600">Nigeria-wide delivery</p> 
                    <p className="text-sm text-gray-500">
                      Free delivery on orders over ₦50,000
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-[#6A0DAD] mt-1 mr-4" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-600">Call us during business hours</p>
                    <p> +1 (234) 567-8900</p>
                    <p>Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
            </div>
            

            {/* Social Media & Follow Us */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-sora">
                Follow Us
              </h2>
              <p className="text-gray-600 mb-8">
                Stay connected with us on social media for the latest updates,
                exclusive offers, and behind-the-scenes content!
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Connect With Us
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-500 text-white p-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center"
                  >
                    <Instagram size={24} className="mr-2" />
                    Instagram
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Facebook size={24} className="mr-2" />
                    Facebook
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white p-4 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center"
                  >
                    <Twitter size={24} className="mr-2" />
                    Twitter
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <Music size={24} className="mr-2" />
                    TikTok
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  Join our community and never miss out on new arrivals,
                  exclusive discounts, and style inspiration!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sora">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                How does pre-ordering work?
              </h3>
              <p className="text-gray-600 text-sm">
                Simply contact us via WhatsApp with your desired product. We'll
                confirm availability, pricing, and delivery timeline before you
                pay.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                What's the delivery time?
              </h3>
              <p className="text-gray-600 text-sm">
                Most items arrive within 14-21 days from China. We'll provide
                tracking information once your order ships.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Are products authentic?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes! We work directly with verified manufacturers and suppliers
                to ensure all products are genuine and high-quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 text-sm">
                We accept bank transfers, card payments, and mobile money.
                Payment details will be shared after order confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6A0DAD] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-sora">
            Ready to Place Your Pre-Order?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get started with a quick WhatsApp message and discover amazing
            products at unbeatable prices.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#FFC700] text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingBag className="mr-2" size={24} />
            Start Pre-Ordering Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#FFC700] font-sora">
                Damola's Essentials
              </h3>
              <p className="text-gray-300">
                Your trusted partner for premium fashion and lifestyle products.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/products?category=shoes"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Shoes
                  </a>
                </li>
                <li>
                  <a
                    href="/products?category=bags"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Bags
                  </a>
                </li>
                <li>
                  <a
                    href="/products?category=clothes"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Clothes
                  </a>
                </li>
                <li>
                  <a
                    href="/products?category=others"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <p className="text-gray-300 mb-2">WhatsApp: +234 XXX XXX XXXX</p>
              <p className="text-gray-300 mb-4">
                Email: info@damolasessentials.com
              </p>
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
            <p className="text-gray-300">
              &copy; 2025 Damola's Essentials. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

