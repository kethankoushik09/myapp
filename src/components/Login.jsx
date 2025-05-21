import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email || !form.password) return 'Both fields are required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email format';
    return '';
  };

  const handleLogin = async e => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      alert('Login successful!');
      navigate('/main');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <style>{`
        body {
          background-color: black;
        }
        .container {
          background-color: black;
          color: white;
          max-width: 500px;
          box-shadow: 0 0px 10px rgba(251, 253, 255, 0.5);
        }
        .form-label, .form-control, .btn, .link, h2, .alert {
          color: white;
        }
        .form-control {
          background-color: #333;
          border: 1px solid #555;
        }
        .form-control::placeholder {
          color: #bbb;
        }
        .form-control:focus {
          background-color: #444;
          color: white;
          border-color: #888;
        }
        .btn-success {
          background-color: #28a745;
          border-color: #28a745;
        }
        .btn-success:hover {
          background-color: #218838;
          border-color: #1e7e34;
        }
        .link {
          text-decoration: underline;
        }
      `}</style>

      <div className="container mt-5 p-4 rounded">
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin} className="row g-3">
          <div className="col-12">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
          </div>
          <div className="col-12 d-grid">
            <button type="submit" className="btn btn-success">Login</button>
          </div>
          <div className="text-center">
            <p className="link" onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer' }}>Forgot Password?</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
