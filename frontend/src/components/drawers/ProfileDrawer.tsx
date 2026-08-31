import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
  onLoginClick: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, onRegisterClick, onLoginClick }) => {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  // Role-based buttons
  const userButtons = [
    { label: "Profile", onClick: () => navigate("/profile") },
    { label: "Orders", onClick: () => navigate("/orders") },
    { label: "Wishlist", onClick: () => navigate("/wishlist") },
  ];

  const adminButtons = [
    { label: "Manage Users", onClick: () => navigate("/userManagement") },
    { label: "Manage Orders", onClick: () => navigate("/orderManagement") },
    { label: "Manage Products", onClick: () => navigate("/productManagement") },
    { label: "Reports", onClick: () => navigate("/reports") },
  ];

  const drawerButtons = isAdmin ? adminButtons : userButtons;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-base-100 shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold">My Account</h2>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 space-y-3">
        {!isLoggedIn ? (
          <>
            <button className="btn btn-outline w-full" onClick={onLoginClick}>Login</button>
            <button className="btn btn-outline w-full" onClick={onRegisterClick}>Register</button>
            <div className="divider"></div>
          </>
        ) : (
          <>
            <h2 className="text-lg text-center font-bold">
              {user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username : ""}
            </h2> 
            <div className="divider"></div>

            {drawerButtons.map((btn) => (
              <button
                key={btn.label}
                className="btn btn-ghost w-full"
                onClick={btn.onClick}
              >
                {btn.label}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      {isLoggedIn && (
        <div className="p-4 border-t border-gray-200">
          <button className="btn btn-error w-full" onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDrawer;