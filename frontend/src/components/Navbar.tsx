import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getCart } from "../services/cartService";

import Sidebar from "./Sidebar";
import ProductSearchList from "./ProductSearchList";
import CartDrawer from "./drawers/CartDrawer";
import ProfileDrawer from "./drawers/ProfileDrawer";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faUser, faHome } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const drawerId = "sidebarDrawer";

  const [cartCount, setCartCount] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        if (isLoggedIn) {
          const cart = await getCart();
          setCartCount(cart.items.length);
        } else {
          const localCart = localStorage.getItem("cart");

          if (localCart) {
            const parsed = JSON.parse(localCart);
            setCartCount(parsed.items.length);
          } else {
            setCartCount(0);
          }
        }
      } catch (error) {
        console.error("Navbar cart error:", error);
      }
    };

    // initial load
    fetchCartCount();

    // listen for updates
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [isLoggedIn]);

  return (
    <div className="drawer drawer-end">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <nav className="navbar bg-base-100 shadow-md px-4 py-3">
          <div className="flex items-center space-x-3">
            <label htmlFor={drawerId} className="btn btn-ghost btn-square">
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </label>

            <button className="btn btn-ghost btn-circle" onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faHome} className="text-xl" />
            </button>

            <img
              src="/gifs/tech2.gif"
              alt="The Tech Hub"
              className="w-12 h-12 rounded-full object-cover hidden sm:block"
            />
          </div>

          <div className="flex-1 mx-4 flex justify-center sm:justify-start relative">
            <ProductSearchList />
          </div>

          <div className="flex items-center space-x-3">
            <button
              className={`btn btn-ghost btn-circle transition-colors duration-300 ${
                cartCount > 0 ? 'text-primary' : 'text-black'
              }`}
              onClick={() => setIsCartOpen(true)}
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            </button>

            <button
              className={`btn btn-ghost btn-circle transition-colors duration-300 ${
                isLoggedIn ? 'text-primary' : 'text-black'
              }`}
              onClick={() => setIsProfileOpen(true)}
            >
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </button>
          </div>
        </nav>
      </div>

      <Sidebar id={drawerId} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onRegisterClick={() => {
          setIsProfileOpen(false);
          setIsRegisterOpen(true);
        }}
        onLoginClick={() => {
          setIsProfileOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
};

export default Navbar;