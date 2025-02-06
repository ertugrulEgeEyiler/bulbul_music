import React from 'react';
import './auth.css';
import logo from '../pngs/LOGO2.png';

const ForgotPassword = () => {
  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <img src={logo} alt="Logo" className="auth-logo" />
      </div>
      <form className="auth-form">
        <h2>Şifremi Unuttum</h2>
        <div className="auth-input">
          <label>Email:</label>
          <input type="email" name="email" />
        </div>
        <button type="submit" className="auth-button">Şifreyi Sıfırla</button>
      </form>
    </div>
  );
};

export default ForgotPassword;