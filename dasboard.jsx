import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  // Application States
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    email: '',
    address: '',
    imageUrl: ''
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:3000/api/employees';

  // 1. READ: Fetch directory listings on interface initialization
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Handle line-by-line input variations
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. CREATE & UPDATE Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert(editingId ? 'Employee updated successfully!' : 'Employee added successfully!');
        clearForm();
        fetchEmployees();
      }
    } catch (err) {
      console.error("Operation failed:", err);
    }
  };

  // 3. DELETE Handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this employee?')) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) fetchEmployees();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const startEdit = (emp) => {
    setEditingId(emp._id);
    setFormData({
      empId: emp.empId,
      name: emp.name,
      email: emp.email,
      address: emp.address,
      imageUrl: emp.imageUrl || ''
    });
  };

  const clearForm = () => {
    setEditingId(null);
    setFormData({ empId: '', name: '', email: '', address: '', imageUrl: '' });
  };

  const handleLogout = () => {
    alert('Logging out of your secure dashboard application...');
    window.location.href = 'https://www.google.com';
  };

  // UI Inline CSS Object Styles
  const styles = {
    body: { padding: '20px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    navbar: { width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '25px' },
    logoutBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' },
    container: { width: '100%', maxWidth: '1100px', display: 'flex', gap: '25px' },
    formBox: { backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', width: '380px' },
    formGroup: { display: 'flex', flexDirection: 'column', marginBottom: '15px' },
    label: { fontWeight: '600', marginBottom: '6px', color: '#555', fontSize: '13px' },
    input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' },
    saveBtn: { width: '100%', padding: '12px', backgroundColor: '#4267B2', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' },
    tableBox: { flexGrow: 1, backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
    avatar: { width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', backgroundColor: '#e9ecef' },
    editBtn: { backgroundColor: '#ffc107', border: 'none', padding: '6px 10px', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' },
    delBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }
  };

  return (
    <div style={styles.body}>
      {/* Top Navigation Header with Red Logout mapped to Right */}
      <div style={styles.navbar}>
        <h2>Syntecxhub Corporate Dashboard (MERN)</h2>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      <div style={styles.container}>
        {/* Left Input Data Entry Column */}
        <div style={styles.formBox}>
          <h3>{editingId ? 'Modify Profile' : 'Add New Employee'}</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Employee ID</label>
              <input style={styles.input} type="text" name="empId" value={formData.empId} onChange={handleChange} required placeholder="e.g., EMP101"/>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Employee Name</label>
              <input style={styles.input} type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter Full Name"/>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Employee Email</label>
              <input style={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@company.com"/>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Employee Address</label>
              <input style={styles.input} type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="City, State"/>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Employee Image URL</label>
              <input style={styles.input} type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/photo.jpg"/>
            </div>
            <button type="submit" style={styles.saveBtn}>{editingId ? 'Update Data' : 'Save Details'}</button>
            {editingId && <button type="button" onClick={clearForm} style={{ ...styles.saveBtn, backgroundColor: '#6c757d', marginTop: '5px' }}>Cancel</button>}
          </form>
        </div>

        {/* Right Information Display Table */}
        <div style={styles.tableBox}>
          <h3>Current Employee Directory</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Photo</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No profiles recorded.</td></tr>
              ) : (
                employees.map(emp => (
                  <tr key={emp._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px' }}>
                      <img src={emp.imageUrl || 'https://cdn-images.mailchimp.com/icons/social-block/color-forward-128.png'} style={styles.avatar} alt="Profile" />
                    </td>
                    <td><strong>{emp.empId}</strong></td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.address}</td>
                    <td>
                      <button style={styles.editBtn} onClick={() => startEdit(emp)}>Edit</button>
                      <button style={styles.delBtn} onClick={() => handleDelete(emp._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}