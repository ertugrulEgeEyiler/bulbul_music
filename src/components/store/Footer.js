import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="store-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>Bulbul Music</h3>
            <p>
              1990 yılından bu yana Antalya'da müzik tutkunlarına hizmet vermektedir.
              Geniş ürün yelpazemiz ve uzman kadromuzla sizlere en iyi müzik deneyimini sunmaya devam ediyoruz.
            </p>
          </div>
          
          <div className="footer-column">
            <h3>Hızlı Bağlantılar</h3>
            <ul className="footer-links">
              <li><Link to="/store">Mağaza</Link></li>
              <li><Link to="/gitarlar">Gitarlar</Link></li>
              <li><Link to="/amfiler">Amfiler</Link></li>
              <li><Link to="/davullar">Davullar</Link></li>
              <li><Link to="/contact">İletişim</Link></li>
              <li><Link to="/about">Hakkımızda</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>İletişim</h3>
            <p>
              Antalya, Türkiye<br />
              Tel: +90 123 456 7890<br />
              Email: info@bulbulmuzik.com
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Bülten</h3>
            <p>Yeniliklerden haberdar olun</p>
            <div className="newsletter">
              <input type="email" placeholder="E-posta adresiniz" />
              <button>Abone Ol</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Bulbul Music. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
