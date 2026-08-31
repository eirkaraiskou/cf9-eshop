import { useEffect, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  status: boolean;
}

const API_URL = "http://localhost:8080";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const token = localStorage.getItem("token");

  // Fetch all users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    loadUsers();
  }, [token]);

  // Toggle user active status
  const toggleStatus = async (userId: number) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${userId}/toggle-status`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Refresh the users list
      const updatedRes = await fetch(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedUsers: User[] = await updatedRes.json();
      setUsers(updatedUsers);
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <span className={`badge badge-outline ${ user.role === "ADMIN" ? "badge-primary" : ""}`}>
                    {user.role.replace("ROLE_", "")}
                  </span>
                </td>
                <td>
                  <input type="checkbox"
                    className="toggle toggle-success" checked={user.status} onChange={() => toggleStatus(user.id)} disabled={user.role === "ADMIN"}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;