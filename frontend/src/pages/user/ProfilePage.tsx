import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password validation
  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handlePasswordChange = async () => {
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("⚠️ Passwords do not match");
      return;
    }

    if (!validatePassword(newPassword)) {
      setError(
        "⚠️ Password requirements:\n" +
        "- At least 8 characters\n" +
        "- At least 1 uppercase letter\n" +
        "- At least 1 special symbol\n" +
        "- At least 1 number"
      );

      console.log("STATE VALUES:", {
  currentPassword,
  newPassword,
  confirmPassword
});
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/api/auth/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!res.ok) throw new Error("Failed to update password");

      setSuccess("✅ Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError("⚠️ Error updating password");
    }
  };

  if (!user) {
    return <p className="text-center mt-10">User not logged in</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      {/* USER INFO */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            Account Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-semibold">{user.firstName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-semibold">{user.lastName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-semibold">{user.username}</p>
            </div>

            {user.role === "ROLE_ADMIN" && (
            <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-semibold">{user.role}</p>
            </div>
            )}

            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">
                {localStorage.getItem("email") || "N/A"}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <FontAwesomeIcon icon={faLock} />
            Change Password
          </h2>

          <div className="space-y-4 mt-4">

            <input type="password" placeholder="Current Password" className="input input-bordered w-full" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder="New Password" className="input input-bordered w-full" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <input type="password" placeholder="Confirm New Password" className="input input-bordered w-full" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

            {error && <p className="text-orange-300 whitespace-pre-line">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button className="btn btn-primary w-full sm:w-auto" onClick={handlePasswordChange}>
              Update Password
            </button>

          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;