import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Users/login';
import Signup from './Users/signup';
import ForgotPassword from './Users/ForgotPassword.js';
import MainPage from './components/mainPage.js';
import Gitarlar from './components/music_enstrunments/Gitarlar.js';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/gitarlar" element={<Gitarlar />} />
          <Route path="/gitarlar/klasik" element={<KlasikGitarlar />} />
          <Route path="/gitarlar/akustik" element={<AkustikGitarlar />} />
          <Route path="/gitarlar/elektro" element={<ElektroGitarlar />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;