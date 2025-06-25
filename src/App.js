import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Users/login';
import Signup from './Users/signup';
import ForgotPassword from './Users/ForgotPassword.js';
import Store from './components/store/Store';
import Gitarlar from './components/store/Gitarlar';
import Amfiler from './components/store/Amfiler';
import Davullar from './components/store/Davullar';
import ProductDetail from './components/store/ProductDetail';
import Navigation from './components/store/Navigation';
import Footer from './components/store/Footer';
const App = () => {  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Store />} />
          <Route path="/store" element={<Store />} />
          <Route path="/gitarlar" element={<Gitarlar />} />
          <Route path="/amfiler" element={<Amfiler />} />
          <Route path="/davullar" element={<Davullar />} />
          <Route path="/gitarlar/:id" element={<ProductDetail />} />
          <Route path="/amfiler/:id" element={<ProductDetail />} />
          <Route path="/davullar/:id" element={<ProductDetail />} />        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;