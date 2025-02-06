import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Users/login';
import Signup from './Users/signup';
import ForgotPassword from './Users/ForgotPassword.js';
import MainPage from './components/mainPage.js';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;