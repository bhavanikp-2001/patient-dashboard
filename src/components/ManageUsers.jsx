import React, { useState } from 'react';
import { UserPlus, Edit, ShieldOff, ShieldCheck, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

export const ManageUsers = () => {
  const { users, addUser, toggleUserStatus } = useData();
  const { currentUser } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Doctor'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addUser(formData, currentUser ? currentUser.name : 'Admin');
    setShowModal(false);
    setFormData({ name: '', email: '', role: 'Doctor' });
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Manage Users</h1>
          <p>Admin control panel for staff role assignment and system access</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <UserPlus size={18} />
          <span>Add User</span>
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{ fontWeight: '600' }}>{u.name}</td>
                <td style={{ color: '#64748b' }}>{u.email}</td>
                <td>
                  <span
                    className={`badge ${
                      u.role === 'Doctor'
                        ? 'badge-doctor'
                        : u.role === 'Nurse'
                        ? 'badge-nurse'
                        : 'badge-admin'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      u.status === 'Active' ? 'badge-active' : 'badge-disabled'
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => alert(`Edit privileges for ${u.name}`)}
                      style={{ color: '#0066ff' }}
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>

                    <button
                      className={`btn btn-sm ${
                        u.status === 'Active' ? 'btn-secondary' : 'btn-primary'
                      }`}
                      onClick={() => toggleUserStatus(u.id, currentUser ? currentUser.name : 'Admin')}
                      style={{
                        color: u.status === 'Active' ? '#ef4444' : '#ffffff',
                        borderColor: u.status === 'Active' ? '#fca5a5' : 'transparent'
                      }}
                    >
                      {u.status === 'Active' ? (
                        <>
                          <ShieldOff size={14} />
                          <span>Disable</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={14} />
                          <span>Enable</span>
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Provision Staff Account</h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="userName">Full Name</label>
                  <input
                    id="userName"
                    type="text"
                    className="form-control"
                    placeholder="e.g. Dr. Rajesh Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userEmail">Email Address</label>
                  <input
                    id="userEmail"
                    type="email"
                    className="form-control"
                    placeholder="e.g. rajesh@healthtech.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userRole">Assigned Role</label>
                  <select
                    id="userRole"
                    className="form-control"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
