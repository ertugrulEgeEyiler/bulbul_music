import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';
import logo from '../pngs/LOGO2.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password === '') {
      setError('Password cannot be empty');
    } else if (formData.password.length < 2) {
      setError('Password must be at least 2 characters long');
    } else {
      setError('');

      const url = formData.role === 'customer'
        ? `http://localhost:5000/customer/auth/login`
        : `http://localhost:5000/seller/auth/login`;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          document.cookie = JSON.stringify(data.id);
          window.location.href = formData.role === 'customer' ? '/ourServices' : '/Dashboard';
        })
        .catch(error => {
          setError('Wrong email or password');
        });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <Link to="/"><img src={logo} alt="Logo" className="auth-logo" /></Link>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Giriş Yap</h2>
        {error && <p className="Login-h2-error">{error}</p>}
        <div className="auth-input">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="auth-input">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Şifre"
          />
        </div>
        <div className="form-check-inline">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value="customer"
              id="customer"
              checked={formData.role === 'customer'}
              onChange={handleRadioChange}
            />
            <label className="form-check-label" htmlFor="customer">
              Customer
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value="seller"
              id="seller"
              checked={formData.role === 'seller'}
              onChange={handleRadioChange}
            />
            <label className="form-check-label" htmlFor="seller">
              Seller
            </label>
          </div>
        </div>
        <button type="submit" className="auth-button">Giriş Yap</button>
      </form>
      <div className="auth-links">
        <Link to="/signup">Hesabın yok mu? Kayıt Ol</Link>
      </div>
      <div className="auth-links">
        <Link to="/forgot-password">Şifreni mi unuttun?</Link>
      </div>
    </div>
  );
};

export default Login;