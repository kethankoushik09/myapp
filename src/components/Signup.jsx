import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { locationData } from '../data/locationData';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './AuthPage.css'; // Include the CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', address: '',
    country: '', state: '', city: '', pincode: '',
    mobile: '', countryCode: '+91', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    const { firstName, lastName, email, address, country, state, city, pincode, mobile, password, confirmPassword } = form;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pinRegex = /^[0-9]{6}$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!firstName || !lastName || !email || !address || !country || !state || !city || !pincode || !mobile || !password || !confirmPassword)
      return 'All fields are required.';
    if (firstName.length < 4) return 'First name must be at least 4 characters.';
    if (lastName.length < 4) return 'Last name must be at least 4 characters.';
    if (!emailRegex.test(email)) return 'Invalid email format.';
    if (!pinRegex.test(pincode)) return 'Pincode must be 6 digits.';
    if (!mobileRegex.test(mobile)) return 'Mobile number must be 10 digits.';
    if (!passwordRegex.test(password)) return 'Password must be at least 8 characters, include one uppercase letter and one special character.';
    if (password !== confirmPassword) return 'Passwords do not match.';

    return '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="text-center mb-4">Signup</h2>
        {error && (
          <div className="error-box">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input name="firstName" className="form-control" onChange={handleChange} value={form.firstName} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input name="lastName" className="form-control" onChange={handleChange} value={form.lastName} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" onChange={handleChange} value={form.email} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <input name="address" className="form-control" onChange={handleChange} value={form.address} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Country</label>
            <select name="country" className="form-select" onChange={handleChange} value={form.country}>
              <option value="">Select Country</option>
              {Object.keys(locationData).map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <select name="state" className="form-select" onChange={handleChange} value={form.state}>
              <option value="">Select State</option>
              {form.country &&
                Object.keys(locationData[form.country]).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <select name="city" className="form-select" onChange={handleChange} value={form.city}>
              <option value="">Select City</option>
              {form.country && form.state &&
                locationData[form.country][form.state].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Pincode</label>
            <input name="pincode" className="form-control" onChange={handleChange} value={form.pincode} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Country Code</label>
            <select name="countryCode" className="form-select" onChange={handleChange} value={form.countryCode}>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Mobile Number</label>
            <input name="mobile" className="form-control" onChange={handleChange} value={form.mobile} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-control" onChange={handleChange} value={form.password} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Confirm Password</label>
            <input name="confirmPassword" type="password" className="form-control" onChange={handleChange} value={form.confirmPassword} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
