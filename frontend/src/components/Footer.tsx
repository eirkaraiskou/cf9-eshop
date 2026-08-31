import React from "react";
import { Link } from "react-router-dom";
import Copyright from "./Copyright";

interface FooterProps {
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside className="grid-flow-col items-center mx-auto">
          <img src="/LogoFull.png" alt="The Tech Hub" />
        </aside>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link to="/aboutUs" className="link link-hover">About us</Link>
          <Link to="/shippingInfo" className="link link-hover" onClick={onContactClick}>Contact us</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Help & Support</h6>
          <Link to="/paymentInfo" className="link link-hover">Payment Methods</Link>
          <Link to="/shippingInfo" className="link link-hover">Shipping & Delivery</Link>
          <Link to="/returnInfo" className="link link-hover"> Returns & Refunds</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/terms" className="link link-hover">Terms of use</Link>
          <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Follow Us</h6>
          <div className="flex gap-4 mt-2">
            <a className="hover:opacity-80">
              <img src="/icons/facebook.png" alt="Facebook" className="w-8 h-8" />
            </a>
            <a className="hover:opacity-80">
              <img src="/icons/youtube.png" alt="Youtube" className="w-8 h-8" />
            </a>
            <a className="hover:opacity-80">
              <img src="/icons/instagram.png" alt="Instagram" className="w-8 h-8" />
            </a>
          </div>
          <a href="mailto:thetechhub@mail.gr" className="link text-sm opacity-70 hover:opacity-100 break-all">
            thetechhub@mail.gr
          </a>
        </nav>
      </footer>      
      <Copyright />
    </div>
  );
};

export default Footer;




 