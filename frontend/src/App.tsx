import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Navbar from "./components/Navbar";
import BannerHero from "./components/banners/BannerHero";
import ProductGrid from "./components/grids/ProductGrid";
import BannerOffer from "./components/banners/BannerOffer";
import EshopGrid from "./components/grids/EshopGrid";
import ReviewGrid from "./components/grids/ReviewGrid";
import Footer from "./components/Footer";

import ContactModal from "./components/modals/ContactModal";

// user pages
import ProfilePage from "./pages/user/ProfilePage";
import WishlistPage from "./pages/user/WishlistPage";
import CheckoutPage from "./pages/user/CheckoutPage";
import OrdersPage from "./pages/user/OrdersPage";
// admin pages
import UserManagementPage from "./pages/admin/UserManagementPage";
import OrderManagementPage from "./pages/admin/OrderManagementPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import ReportsPage from "./pages/admin/ReportsPage";
// product pages
import ProductSearchListPage from "./pages/product/ProductSearchListPage";
import ProductSearchListMobile from "./components/ProductSearchListMobile";
import ProductsByCategory from "./pages/product/ProductCategoryPage";
import ProductDetailsPage from './pages/product/ProductDetailsPage';
//eshop pages
import AboutUsPage from "./pages/eshop/AboutUsPage";
import PaymentInfoPage from "./pages/eshop/PaymentInfoPage"
import ShippingInfoPage from  "./pages/eshop/ShippingInfoPage"
import ReturnInfoPage from "./pages/eshop/ReturnInfoPage";
import TermsPage from "./pages/eshop/TermsPage";
import PrivacyPage from "./pages/eshop/PrivacyPage";

function App() {

  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleContactClick = () => setIsContactOpen(true);
  const handleContactClose = () => setIsContactOpen(false);
  
  return (
    
    <div className="flex flex-col min-h-screen">

      <Navbar />
      <main className="grow p-4">
        <Routes>
          {/* Home page */}
          <Route path="/" element={
              <>
                <div className="sm:hidden">
                  <ProductSearchListMobile />
                </div>
                <BannerHero />
                <ProductGrid />
                <div className="divider ml-2 mr-2 lg:ml-24 lg:mr-24 "><h2 className="text-xl lg:text-2xl font-bold text-center">User Reviews</h2></div>
                <ReviewGrid />
                <BannerOffer />
                <div className="divider ml-2 mr-2 lg:ml-24 lg:mr-24 "><h2 className="text-xl lg:text-2xl font-bold text-center">Services</h2></div>
                <EshopGrid />
              </>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />

          <Route path="/userManagement" element={<UserManagementPage />} />
          <Route path="/orderManagement" element={<OrderManagementPage />} />
          <Route path="/productManagement" element={<ProductManagementPage />} />
          <Route path="/reports" element={<ReportsPage />} />

          <Route path="/products/search/:query" element={<ProductSearchListHandler />} />
          <Route path="/products/:category" element={<ProductsByCategoryHandler />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/paymentInfo" element={<PaymentInfoPage />} />
          <Route path="/shippingInfo" element={<ShippingInfoPage />} />
          <Route path="/returnInfo" element={<ReturnInfoPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>
      <Footer onContactClick={handleContactClick} />
      <ContactModal isOpen={isContactOpen} onClose={handleContactClose} />

      <Toaster position="top-center" />
    </div>
  );

}

  const ProductSearchListHandler: React.FC = () => {
    const { query } = useParams<{ query: string }>();
    if (!query) return <div>No search query provided</div>;
    return <ProductSearchListPage query={decodeURIComponent(query)} />;
  };

  const ProductsByCategoryHandler: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    if (!category) return <div>No category selected</div>;

    const decodedCategory = decodeURIComponent(category);
    return <ProductsByCategory category={decodedCategory} />;
  };

export default App;