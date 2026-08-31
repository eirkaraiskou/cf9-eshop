// components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  id: string;
}

const Sidebar: React.FC<SidebarProps> = ({ id }) => {
  const activeClass = "bg-primary text-white rounded"; // ✅ active style

  return (
    <div className="drawer-side">
      <label htmlFor={id} className="drawer-overlay" aria-label="close sidebar"></label>
      <ul className="menu bg-base-200 min-h-full w-64 p-4 space-y-2">
        <li><NavLink to="/" className={({ isActive }) => isActive ? activeClass : ""}>Home</NavLink></li>
        <div className="divider"></div>
        <li>Products</li>
        <li><NavLink to="/products/Computers" className={({ isActive }) => isActive ? activeClass : ""}>Computers</NavLink></li>
        <li><NavLink to="/products/Mobile" className={({ isActive }) => isActive ? activeClass : ""}>Mobile & Wearables</NavLink></li>
        <li><NavLink to="/products/TV" className={({ isActive }) => isActive ? activeClass : ""}>TV & Audio</NavLink></li>
        <li><NavLink to="/products/Drones" className={({ isActive }) => isActive ? activeClass : ""}>Drones & Gadgets</NavLink></li>
        <li><NavLink to="/products/Accessories" className={({ isActive }) => isActive ? activeClass : ""}>Accessories</NavLink></li>
        <li><NavLink to="/products/Gaming" className={({ isActive }) => isActive ? activeClass : ""}>Gaming</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;