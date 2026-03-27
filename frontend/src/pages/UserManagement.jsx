import { useState, useEffect } from 'react';
import api from '../context/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBlock = async (userId, currentStatus) => {
    try {
      const endpoint = currentStatus ? `/users/unblock/${userId}` : `/users/block/${userId}`;
      await api.put(endpoint);
      fetchUsers();
    } catch (err) {
       alert('Operation failed');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">User Management</h1>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item._id}>
                <td style={{ fontWeight: 500 }}>{item.name}</td>
                <td className="admin-table-text-muted">{item.email}</td>
                <td>
                  <span className={`admin-badge ${item.role === 'super_admin' ? 'admin-badge-admin' : 'admin-badge-user'}`}>
                    {item.role.replace('_', ' ')}
                  </span>
                </td>
                <td>
                  <span className={`admin-status ${item.isBlocked ? 'blocked' : 'active'}`}>
                    <span className="admin-status-dot"></span>
                    {item.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleToggleBlock(item._id, item.isBlocked)}
                    className={`admin-action-btn ${item.isBlocked ? 'unblock-btn' : 'block-btn'}`}
                  >
                    {item.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan="5" className="admin-table-empty">No users found.</td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan="5" className="admin-table-empty">Loading Users...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
