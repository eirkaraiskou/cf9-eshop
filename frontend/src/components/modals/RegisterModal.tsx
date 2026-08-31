import React, { useState } from "react";
import toast from 'react-hot-toast';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState(""); // your username field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
  setFirstName("");
  setLastName("");
  setUsername("");
  setEmail("");
  setPassword("");
  setConfirmPassword("");
  setError("");
};

  if (!isOpen) return null;

  const validatePassword = (pwd: string) => {
    // 8+ chars, 1 uppercase, 1 number, 1 special symbol
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  // Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("⚠️ Passwords do not match");
      return;
    }

if (!validatePassword(password)) {
  setError(
    "⚠️ Password requirements:\n" +
    "- At least 8 characters\n" +
    "- At least 1 uppercase letter\n" +
    "- At least 1 special symbol\n" +
    "- At least 1 number"
  );
  return;
}

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        resetForm();
        onClose();
        toast.success(`🎉 Welcome ${username}!\nYou are now able to login with your new account.`);
      } else {
        setError("⚠️ " + data.error || "⚠️ Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create Account</h3>

        <form className="space-y-3" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
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

          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-orange-300 whitespace-pre-line">{error}</p>}

          <button type="submit" className="btn btn-primary w-full mt-2">
            Register
          </button>
        </form>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      {/* Overlay click closes modal */}
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default RegisterModal;