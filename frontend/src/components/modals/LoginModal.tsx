import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token); 

        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName); 

        const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim() || data.username;
        toast.success(`🎉 Welcome ${fullName}!`);

        setEmail("");
        setPassword("");
        onClose();
      } else {
        if (data.error === "USER_DISABLED") {
          setError("Your account is suspended. Please contact support.");
        } else {
          setError(data.error || "Invalid email or password");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Login</h3>
        <form className="space-y-3" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="e-mail"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="btn btn-primary w-full mt-2">
            Login
          </button>
        </form>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default LoginModal;