'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Users, 
  Star, 
  Mail, 
  TrendingUp, 
  Package, 
  MessageSquare, 
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  BarChart3,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Check,
  X
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// --- Admin Add Product Modal Component ---
const AdminAddProductModal = ({ show, onClose, onSubmit, initialProductData }) => { // Added initialProductData for editing
  const [name, setName] = useState(initialProductData?.name || '');
  const [description, setDescription] = useState(initialProductData?.description || '');
  const [price, setPrice] = useState(initialProductData?.price || '');
  const [imageUrl, setImageUrl] = useState(initialProductData?.image_url || '');
  const [category, setCategory] = useState(initialProductData?.category_slug || '');
  const [status, setStatus] = useState(initialProductData?.status || 'active'); // Default status

  // New fields for product specifications
  const [isOnSale, setIsOnSale] = useState(initialProductData?.isOnSale || false);
  const [limitedStock, setLimitedStock] = useState(initialProductData?.limitedStock || '');
  const [isNew, setIsNew] = useState(initialProductData?.isNew || false);
  const [discountPercentage, setDiscountPercentage] = useState(initialProductData?.discountPercentage || '');
  const [isPreOrder, setIsPreOrder] = useState(initialProductData?.isPreOrder || false);
  const [hasFreeDelivery, setHasFreeDelivery] = useState(initialProductData?.hasFreeDelivery || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      name, 
      description, 
      price: parseFloat(price), 
      imageUrl, 
      category, 
      status,
      isOnSale,
      limitedStock: parseInt(limitedStock) || null, // Ensure it's a number or null
      isNew,
      discountPercentage: parseFloat(discountPercentage) || null, // Ensure it's a number or null
      isPreOrder,
      hasFreeDelivery
    });
    // Reset form fields after submission
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setCategory('');
    setStatus('active');
    setIsOnSale(false);
    setLimitedStock('');
    setIsNew(false);
    setDiscountPercentage('');
    setIsPreOrder(false);
    setHasFreeDelivery(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{initialProductData ? 'Edit Product' : 'Add New Product'}</h2>
          <button
            onClick={() => {
              onClose();
              // Reset form fields when closing without submitting
              setName('');
              setDescription('');
              setPrice('');
              setImageUrl('');
              setCategory('');
              setStatus('active');
              setIsOnSale(false);
              setLimitedStock('');
              setIsNew(false);
              setDiscountPercentage('');
              setIsPreOrder(false);
              setHasFreeDelivery(false);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="admin-product-name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="admin-product-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="admin-product-description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="admin-product-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            {/* Price & Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="admin-product-price" className="block text-sm font-medium text-gray-700">
                  Price (e.g., 199.99)
                </label>
                <input
                  type="number"
                  id="admin-product-price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="upload-from-device"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setImageUrl(event.target.result);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="upload-from-device" className="cursor-pointer bg-gray-100 text-gray-700 px-3 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors">
                    Upload
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Snap and upload functionality not yet implemented.')}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
                  >
                    Snap
                  </button>
                  <div className="flex-grow">
                    <input
                      type="url"
                      placeholder="Image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {imageUrl && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Preview:</label>
                    <img src={imageUrl} alt="Product Preview" className="max-w-full h-32 object-cover rounded-md border border-gray-300" />
                  </div>
                )}
              </div>
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="admin-product-category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="admin-product-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="new">New</option>
                  <option value="bags">Bags</option>
                  <option value="shoes">Shoes</option>
                  <option value="clothes">Clothes</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label htmlFor="admin-product-status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="admin-product-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={isOnSale} onChange={(e) => setIsOnSale(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <span>On Sale</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <span>New Product</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={isPreOrder} onChange={(e) => setIsPreOrder(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <span>Pre Order</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={hasFreeDelivery} onChange={(e) => setHasFreeDelivery(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <span>Free Delivery</span>
              </label>
            </div>

            {/* Discount and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="admin-product-discount-percentage" className="block text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="admin-product-discount-percentage"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  min="0"
                  max="100"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={!isOnSale}
                />
              </div>
              <div>
                <label htmlFor="admin-product-limited-stock" className="block text-sm font-medium text-gray-700">
                  Limited Stock
                </label>
                <input
                  type="number"
                  id="admin-product-limited-stock"
                  value={limitedStock}
                  onChange={(e) => setLimitedStock(e.target.value)}
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                // Reset form fields when closing without submitting
                setName('');
                setDescription('');
                setPrice('');
                setImageUrl('');
                setCategory('');
                setStatus('active');
                setIsOnSale(false);
                setLimitedStock('');
                setIsNew(false);
                setDiscountPercentage('');
                setIsPreOrder(false);
                setHasFreeDelivery(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6A0DAD] text-white rounded-md font-semibold hover:bg-purple-600 transition-colors"
            >
              {initialProductData ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// --- End Admin Add Product Modal Component ---


export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the product modal
  const [selectedProduct, setSelectedProduct] = useState(null); // For editing products
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false); // For Orders tab export
  const [showNewsletterExportDropdown, setShowNewsletterExportDropdown] = useState(false); // For Newsletter tab export
  const [selectedSubscribers, setSelectedSubscribers] = useState([]); // For Newsletter checkboxes
const [showEmailConfirmationModal, setShowEmailConfirmationModal] = useState(false); // For email sent confirmation
  const [addReviewModal, setAddReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([
    { id: 1, reviewer: 'John Doe', product: 'Coffee Mug', rating: 4, review: 'Loved the mug...' },
    { id: 2, reviewer: 'Jane M.', product: 'Red Bag', rating: 5, review: 'Stylish and sturdy' },
    { id: 3, reviewer: 'Paul K.', product: 'Classic Blazer', rating: 3, review: 'Nice fit but...' },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const queryClient = useQueryClient();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      setIsAuthenticated(true);
      setAdminUser(JSON.parse(user));
    } else {
      window.location.href = '/admin/login';
    }
  }, []);

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  // Dashboard stats
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [productsRes, ordersRes, reviewsRes, newsletterRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/admin/orders', { headers: getAuthHeaders() }),
        fetch('/api/admin/reviews', { headers: getAuthHeaders() }),
        fetch('/api/newsletter')
      ]);
      
      const products = await productsRes.json();
      const orders = await ordersRes.json();
      const reviews = await reviewsRes.json();
      const newsletter = await newsletterRes.json();
      
      return {
        totalProducts: products.length,
        totalOrders: orders.orders?.length || 0,
        pendingReviews: reviews.reviews?.length || 0,
        newsletterSubscribers: newsletter.length
      };
    },
    enabled: isAuthenticated
  });

  // Fetch products for management
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      return response.json();
    },
    enabled: isAuthenticated && activeTab === 'products'
  });

  // Fetch orders for management
  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({ // Corrected destructuring
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const response = await fetch('/api/admin/orders', {
        headers: getAuthHeaders()
      });
      return response.json();
    },
    enabled: isAuthenticated && activeTab === 'orders'
  });

  // Fetch reviews for moderation
  const { data: reviewsData, isLoading: isLoadingReviews } = useQuery({ // Corrected destructuring
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const response = await fetch('/api/admin/reviews?status=pending', {
        headers: getAuthHeaders()
      });
      return response.json();
    },
    enabled: isAuthenticated && activeTab === 'reviews'
  });

  // Update order status mutation
  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-orders']);
    }
  });

  // Update review status mutation
  const updateReviewMutation = useMutation({
    mutationFn: async ({ reviewId, status }) => {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-reviews']);
    }
  });

  // Mutation for adding a product
  const addProductMutation = useMutation({
    mutationFn: async (productData) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData)
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['admin-products']);
      setModalMessage('Product added successfully!');
      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setModalMessage('');
      }, 2000);
    },
    onError: (error) => {
      setModalMessage(`Error adding product: ${error.message}`);
      setIsSuccess(false);
    }
  });

  // Mutation for updating a product
  const updateProductMutation = useMutation({
    mutationFn: async ({ productId, productData }) => {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.JSON.stringify(productData) // Corrected: JSON.stringify
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products']);
      setModalMessage('Product updated successfully!');
      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setModalMessage('');
      }, 2000);
    },
    onError: (error) => {
      setModalMessage(`Error updating product: ${error.message}`);
      setIsSuccess(false);
    }
  });

  const handleAddOrUpdateProduct = (productData) => {
    if (selectedProduct) {
      // Update existing product
      updateProductMutation.mutate({ productId: selectedProduct.id, productData });
    } else {
      // Add new product
      addProductMutation.mutate(productData);
    }
  };

  const handleExport = (type) => {
    console.log(`Exporting orders as ${type.toUpperCase()}...`); // Mock export
    setShowExportDropdown(false); // Close dropdown after selection
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleNewsletterDelete = () => {
    if (selectedSubscribers.length > 0) {
      alert(`Deleting ${selectedSubscribers.length} selected subscribers (mock)`);
      setSelectedSubscribers([]); // Clear selection after mock delete
    } else {
      alert("No subscribers selected for deletion.");
    }
  };

  const handleSendEmail = () => {
    setShowEmailModal(false);
    setShowEmailConfirmationModal(true);
    setTimeout(() => setShowEmailConfirmationModal(false), 3000); // Hide after 3 seconds
  };

  const handleNewsletterExport = (type) => {
    const mockSubscribers = [
      { id: 1, email: 'user1@example.com', date: '2025-09-01' },
      { id: 2, email: 'user2@example.com', date: '2025-08-28' },
      { id: 3, email: 'user3@example.com', date: '2025-08-25' },
    ];

    if (type === "csv") {
      const csvContent = "data:text/csv;charset=utf-8,"
        + ["Email,Subscribed On", ...mockSubscribers.map(s => `${s.email},${s.date}`)].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "subscribers.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Exporting subscribers as CSV...");
    } else if (type === "pdf") {
      alert("Exporting subscribers as PDF (mock)...");
    }
    setShowNewsletterExportDropdown(false); // Close dropdown after selection
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  const handleSubscriberSelection = (id) => {
    setSelectedSubscribers(prev =>
      prev.includes(id) ? prev.filter(subId => subId !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price).replace('NGN', '₦');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-orange-100 text-orange-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A0DAD]"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-[#6A0DAD] font-sora">Damola's Essentials</h1>
              <span className="ml-2 text-sm text-gray-500">Admin Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {adminUser?.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-4 flex-wrap"> {/* Adjusted spacing and added flex-wrap */}
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'products', name: 'Products', icon: Package },
              { id: 'orders', name: 'Orders', icon: ShoppingBag },
              { id: 'reviews', name: 'Reviews', icon: MessageSquare },
              { id: 'newsletter', name: 'Newsletter', icon: Mail }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-[#6A0DAD] text-[#6A0DAD]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={20} className="mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Package className="text-[#6A0DAD]" size={32} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.totalProducts || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <ShoppingBag className="text-green-600" size={32} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.totalOrders || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <MessageSquare className="text-orange-600" size={32} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.pendingReviews || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Mail className="text-blue-600" size={32} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Newsletter Subscribers</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.newsletterSubscribers || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => {
                    setSelectedProduct(null); // Clear selected product for adding new
                    setModalMessage(''); // Clear previous messages
                    setIsSuccess(false); // Reset success state
                    setIsModalOpen(true);
                  }}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="text-[#6A0DAD] mr-3" size={24} />
                  <span className="font-medium">Add New Product</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ShoppingBag className="text-green-600 mr-3" size={24} />
                  <span className="font-medium">Manage Orders</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="text-orange-600 mr-3" size={24} />
                  <span className="font-medium">Review Moderation</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
              <button
                onClick={() => {
                  setSelectedProduct(null); // Clear selected product for adding new
                  setModalMessage(''); // Clear previous messages
                  setIsSuccess(false); // Reset success state
                  setIsModalOpen(true);
                }}
                className="bg-[#6A0DAD] text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Product
              </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
<div className="bg-white rounded-lg shadow">
              <div className="overflow-x-auto">
<table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoadingProducts ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-500">Loading products...</td>
                      </tr>
                    ) : products.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-500">No products found.</td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                              <div className="ml-4 max-w-xs"> {/* Added max-w-xs for potential overflow */}
                                <div className="text-sm font-medium text-gray-900 break-words">{product.name}</div> {/* Added break-words */}
                                <div className="text-sm text-gray-500 break-words">{product.description?.substring(0, 50)}...</div> {/* Added break-words */}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {product.category_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(product.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-[#6A0DAD] hover:text-purple-600">
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setModalMessage('');
                                  setIsSuccess(false);
                                  setIsModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="relative inline-block">
                  <button
                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Export PDF/CSV
                  </button>
                  {showExportDropdown && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
                      <button
                        onClick={() => handleExport("pdf")}
                        className="w-full px-2 py-1 hover:bg-gray-100 text-left"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleExport("csv")}
                        className="w-full px-2 py-1 hover:bg-gray-100 text-left"
                      >
                        CSV
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
<div className="bg-white rounded-lg shadow overflow-x-auto overflow-y-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="px-4 py-2">Order ID</th>
                      <th className="px-4 py-2">Customer</th>
                      <th className="px-4 py-2">Product</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "ORD-001", customer: "John Doe", product: "Classic Blazer", amount: "₦229", status: "Pending" },
                      { id: "ORD-002", customer: "Jane Smith", product: "Coffee Mug", amount: "₦32", status: "Delivered" },
                      { id: "ORD-003", customer: "Mike Johnson", product: "Casual Jeans", amount: "₦89", status: "Cancelled" },
                    ].map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{order.id}</td>
                        <td className="px-4 py-2">{order.customer}</td>
                        <td className="px-4 py-2">{order.product}</td>
                        <td className="px-4 py-2">{order.amount}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded text-white text-xs ${
                              order.status === "Pending"
                                ? "bg-yellow-500"
                                : order.status === "Delivered"
                                ? "bg-green-600"
                                : "bg-red-500"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            className="text-purple-600 hover:underline text-sm"
                            onClick={() => handleViewOrder(order)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Review Moderation</h2>
              <button
                onClick={() => setAddReviewModal(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded font-semibold hover:bg-purple-600 transition-colors flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Review
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Search by product or reviewer" className="col-span-2 border border-gray-300 rounded-lg p-2" />
                <select className="border border-gray-300 rounded-lg p-2">
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map(review => (
                    <tr key={review.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{review.reviewer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{review.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{'⭐'.repeat(review.rating)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{review.review}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => {
                            setSelectedReview(review);
                            setAddReviewModal(true);
                          }} 
                          className="text-gray-600 hover:text-gray-900 ml-4"
                        >
                          Edit
                        </button>
                        <button onClick={() => handleDeleteReview(review.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Newsletter Tab */}
        {activeTab === 'newsletter' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Newsletter Management</h2>
            <div className="bg-white shadow rounded p-4">
            <div className="flex justify-between items-center mb-4 flex-wrap flex-col md:flex-row md:space-x-1"> {/* Added flex-wrap and adjusted for stacking */}
              <h3 className="text-lg font-medium">Subscribers</h3>
              <div className="flex flex-col md:flex-row space-y-2 md:space-x-1 md:space-y-0"> {/* Stack vertically on small screens, row on medium+ */}
                <input type="text" placeholder="Search email..." className="border border-gray-300 rounded-lg p-2 w-full md:w-auto" /> {/* Added w-full and md:w-auto */}
                <button onClick={() => setShowEmailModal(true)} className="bg-purple-600 text-white px-4 py-2 rounded">
                  Send Email
                </button>
                <button onClick={handleNewsletterDelete} className="bg-red-600 text-white px-4 py-2 rounded">
                  Delete Selected
                </button>
                <div className="relative inline-block">
                  <button
                    onClick={() => setShowNewsletterExportDropdown(!showNewsletterExportDropdown)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Export
                  </button>
                  {showNewsletterExportDropdown && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
                      <button
                        onClick={() => handleNewsletterExport("pdf")}
                        className="w-full px-2 py-1 hover:bg-gray-100 text-left"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleNewsletterExport("csv")}
                        className="w-full px-2 py-1 hover:bg-gray-100 text-left"
                      >
                        CSV
                      </button>
                    </div>
                  )}
                </div>
              </div>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-2">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSubscribers([1, 2, 3]); // Select all mock subscribers
                          } else {
                            setSelectedSubscribers([]);
                          }
                        }}
                        checked={selectedSubscribers.length === 3} // All mock subscribers selected
                      />
                    </th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Subscribed On</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, email: 'user1@example.com', date: '2025-09-01' },
                    { id: 2, email: 'user2@example.com', date: '2025-08-28' },
                    { id: 3, email: 'user3@example.com', date: '2025-08-25' },
                  ].map(sub => (
                    <tr key={sub.id} className="border-t">
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.includes(sub.id)}
                          onChange={() => handleSubscriberSelection(sub.id)}
                        />
                      </td>
                      <td className="p-2">{sub.email}</td>
                      <td className="p-2">{sub.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {[].length === 0 && (
                <p className="text-center text-gray-500 py-6">No subscribers yet.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Admin Add Product Modal */}
      <AdminAddProductModal
        show={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null); // Ensure selected product is cleared when modal closes
          setModalMessage(''); // Clear message on close
          setIsSuccess(false); // Reset success state
        }}
        onSubmit={handleAddOrUpdateProduct}
        initialProductData={selectedProduct} // Pass selected product for editing
      />
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Product:</strong> {selectedOrder.product}</p>
            <p><strong>Amount:</strong> {selectedOrder.amount}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Send Newsletter</h2>
            <textarea placeholder="Write your message..." className="w-full border p-2 rounded mb-4" rows={5}></textarea>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowEmailModal(false)} className="text-gray-500">Cancel</button>
              <button onClick={handleSendEmail} className="bg-purple-600 text-white px-4 py-2 rounded">Send</button>
            </div>
          </div>
        </div>
      )}
      {showEmailConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold text-green-600 mb-2">Email Sent!</h2>
            <p>Your newsletter has been sent successfully (mock).</p>
          </div>
        </div>
      )}
      {addReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">{selectedReview ? 'Edit Review' : 'Add New Review'}</h2>

            <input type="text" placeholder="Customer Name" defaultValue={selectedReview?.reviewer} className="w-full border p-2 mb-3 rounded" />
            <input type="text" placeholder="Product Name" defaultValue={selectedReview?.product} className="w-full border p-2 mb-3 rounded" />
            <select defaultValue={selectedReview?.rating} className="w-full border p-2 mb-3 rounded">
              <option value="">Rating</option>
              <option value="1">★☆☆☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="3">★★★☆☆</option>
              <option value="4">★★★★☆</option>
              <option value="5">★★★★★</option>
            </select>
            <textarea rows="4" placeholder="Review Comment" defaultValue={selectedReview?.review} className="w-full border p-2 rounded mb-4"></textarea>

            <div className="flex justify-end">
              <button onClick={() => {
                setAddReviewModal(false);
                setSelectedReview(null);
              }} className="mr-2">Cancel</button>
              <button onClick={() => {
                setAddReviewModal(false);
                setSelectedReview(null);
              }}>{selectedReview ? 'Update Review' : 'Add Review'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
