import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../pngs/LOGO2.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    email: '',
    telefon: '',
    sifre: '',
    sifreDogrulama: '',
    tc: '', 
    role: 'customer', 
    sirketAdi: '',
    vergiNumarasi: '',
    sirketAdresi: '',
    iletisimKisiAdi: '',
    iletisimKisiTelefonu: '',
    iletisimKisiEmail: ''
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
    if (formData.sifre !== formData.sifreDogrulama) {
      setError('Şifreler farklı');
    } else {
      setError('');

      const userData = {
        tc: formData.tc,
        name: formData.ad,
        surname: formData.soyad,
        email: formData.email,
        phone: formData.telefon,
        password: formData.sifre
      };

      const url = formData.role === 'customer'
        ? `http://localhost:5000/customer/auth/register`
        : `http://localhost:5000/companyUser/auth/register`;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          setError('Kayıt sırasında hata oluştu');
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <img src={logo} alt="Logo" className="auth-logo" />
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Kayıt Ol</h2>
        <div className="auth-input">
          <input type="text" id="ad" name="ad" value={formData.ad} onChange={handleChange} placeholder="Ad" />
        </div>
        <div className="auth-input">
          <input type="text" id="soyad" name="soyad" value={formData.soyad} onChange={handleChange} placeholder="Soyad" />
        </div>
        <div className="auth-input">
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="auth-input">
          <input type="text" id="telefon" name="telefon" value={formData.telefon} onChange={handleChange} placeholder="Telefon" />
        </div>
        <div className="auth-input">
          <input type="password" id="sifre" name="sifre" value={formData.sifre} onChange={handleChange} placeholder="Şifre" />
        </div>
        <div className="auth-input">
          <input type="password" id="sifreDogrulama" name="sifreDogrulama" value={formData.sifreDogrulama} onChange={handleChange} placeholder="Şifre Doğrulama" />
        </div>
        <div className="auth-input">
          <input type="text" id="tc" name="tc" value={formData.tc} onChange={handleChange} placeholder="TC Numarası" />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="form-check-inline">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="role" value="customer" id="customer" checked={formData.role === 'customer'} onChange={handleRadioChange} />
            <label className="form-check-label" htmlFor="customer">
              Customer
            </label>
          </div>
        </div>
        <button type="submit" className="auth-button">Kayıt Ol</button>
      </form>
      <div className="auth-links">
        <Link to="/login">Hesabın var mı? Giriş Yap</Link>
      </div>
    </div>
  );
};

export default Signup;