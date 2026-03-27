import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      if (user.role === 'super_admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <img 
              src="/Vector.png" 
              alt="" 
              className="login-logo-icon"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/32?text=V"; }}
            />
            <span className="login-logo-text">StreamVibe</span>
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Login to your StreamVibe account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          
          <div className="login-field">
            <label className="login-label">Email Address</label>
            <input 
              type="email" 
              className="login-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="login-field">
            <label className="login-label">Password</label>
            <input 
              type="password" 
              className="login-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?<Link to="/register">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
