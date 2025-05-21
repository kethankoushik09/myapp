import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetRequest = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Reset link sent! Please check your inbox to change your password.');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <>
      <style>
        {`
          body {
            background-color: #000000;
            color: #ffffff;
          }
          .custom-container {
            background-color: #000000;
            color: #ffffff;
          }
          .custom-card {
            background-color: #121212;
            box-shadow: 0 0px 10px rgba(251, 253, 255, 0.5);
            color: #ffffff;
          }
          .custom-card label {
            color: #ffffff;
          }
          .form-control {
            background-color: #1e1e1e;
            color: #ffffff;
            border: 1px solid #ccc;
          }
          .form-control::placeholder {
            color: #bbbbbb;
          }
        `}
      </style>

      <div className="custom-container d-flex justify-content-center align-items-center min-vh-100">
        <div className="custom-card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-3">Forgot Password</h2>
          <p className="text mb-4 text-center" style={{ fontSize: '0.7rem', color: '#ffffff' }}>
            A reset link will be sent to your registered email. Click the link to change your password and log in again.
          </p>
          <form onSubmit={handleResetRequest}>
            <div className="form-group mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
          </form>
          {message && <div className="alert alert-success mt-3">{message}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
