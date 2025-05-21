import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: 'black' }}
    >
      <div 
        className="p-5 shadow-lg text-center" 
        style={{ 
          maxWidth: '400px', 
          width: '100%', 
          backgroundColor: '#121212',  // a dark blackish container
          boxShadow: '0 8px 16px rgba(255, 255, 255, 0.9)', // subtle white-ish glow shadow
          color: 'white',
          borderRadius: '8px'
        }}
      >
        <h2 className="mb-4">Welcome</h2>
        <button 
          className="btn btn-light mb-3 w-100" 
          onClick={() => navigate('/login')}
        
        >
          Login
        </button>
        <button 
          className="btn btn-light w-100" 
          onClick={() => navigate('/signup')}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
