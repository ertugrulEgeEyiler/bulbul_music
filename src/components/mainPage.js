import React, { useEffect, useState } from 'react';
import './MainPage.css';
import AksesuarlarImg from '../pngs/mainpage/Aksesuarlar.png';
import GitarlarImg from '../pngs/mainpage/Gitarlar.png';
import PianoImg from '../pngs/mainpage/Piano.png';
import YaylılarImg from '../pngs/mainpage/Yaylılar.png';

const MainPage = () => {
  const categories = [
    'PİYANOLAR',
    'GİTARLAR',
    'DAVUL VE PERKÜSYON',
    'KLAVYELER',
    'STÜDİO / DJ',
    'EFEKTLER',
    'AMFİLER',
    'YAYLILAR'
  ];

  const categoryImages = {
    Gitarlar: GitarlarImg,
    Piyanolar: PianoImg,
    Aksesuarlar: AksesuarlarImg,
    Yaylılar: YaylılarImg
  };
  

  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch('/api/featured-products')
      .then((res) => res.json())
      .then((data) => setFeaturedProducts(data))
      .catch((error) => console.error('Error fetching featured products:', error));
  }, []);

  return (
    <div className="main-container">
      {/* Category Navigation */}
      <nav className="category-nav">
        <div className="category-container">
          <div className="category-links">
            {categories.map((category) => (
              <a key={category} href="#" className="category-link">
                {category}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-content">
          <h1>BÜLBÜL MÜZİK</h1>
          <p>Antalya'nın en büyük müzik mağazası</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Featured Categories */}
        <div className="category-grid">
          {Object.keys(categoryImages).map((category) => (
            <div key={category} className="category-item">
              <div className="category-image">
                <img src={categoryImages[category]} alt={category} />
              </div>
              <h3>{category}</h3>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        <div className="featured-products">
          <h2>Öne Çıkan Ürünler</h2>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>₺{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="about-section">
          <h2>Hakkımızda</h2>
          <p>
            Bülbül Müzik, 1990 yılından bu yana Antalya'da müzik tutkunlarına hizmet vermektedir. 
            Geniş ürün yelpazemiz ve uzman kadromuzla sizlere en iyi müzik deneyimini sunmaya devam ediyoruz.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <h3>İletişim</h3>
              <p>
                Antalya, Türkiye<br />
                Tel: +90 123 456 7890<br />
                Email: info@bulbulmuzik.com
              </p>
            </div>
            <div>
              <h3>Hızlı Bağlantılar</h3>
              <ul>
                <li><a href="#">Hakkımızda</a></li>
                <li><a href="#">Mağazalarımız</a></li>
                <li><a href="#">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h3>Bülten</h3>
              <p>Yeniliklerden haberdar olun</p>
              <div className="newsletter">
                <input type="email" placeholder="E-posta adresiniz" />
                <button>Abone Ol</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
