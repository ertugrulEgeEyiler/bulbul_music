import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Store.css';

// Import images
import guitarIcon from '../../pngs/Gitarlar.png';
import ampIcon from '../../pngs/Aksesuarlar.png';
import drumIcon from '../../pngs/Davullar.png';

function Store() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    {
      id: 'gitarlar',
      name: 'Gitarlar',
      icon: guitarIcon,
      path: '/gitarlar',
      count: 109
    },
    {
      id: 'amfiler',
      name: 'Amfiler',
      icon: ampIcon,
      path: '/amfiler',
      count: 27
    },
    {
      id: 'davullar',
      name: 'Davullar',
      icon: drumIcon,
      path: '/davullar',
      count: 36
    }
  ];

  return (
    <div className="store-container">
      <div className="store-header">
        <h1>Müzik Aletleri</h1>
        <p>Bulbül Music'te en kaliteli müzik aletleri</p>
      </div>

      <div className="category-filter">
        <button 
          className={`filter-button ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          Tümü
        </button>
        
        {categories.map(category => (
          <button 
            key={category.id}
            className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="category-cards">
        {categories.map(category => (
          (activeCategory === 'all' || activeCategory === category.id) && (
            <Link to={category.path} key={category.id} className="category-card">
              <div className="category-icon-container">
                <img src={category.icon} alt={category.name} className="category-icon" />
              </div>
              <h2>{category.name}</h2>
              <p>{category.count} ürün</p>
              <button className="view-more-btn">Ürünleri Gör</button>
            </Link>
          )
        ))}
      </div>

      <div className="featured-products">
        <h2>Öne Çıkan Ürünler</h2>
        <div className="featured-grid">
          {/* Bu kısım dinamik olarak doldurulabilir */}
          <div className="featured-card">
            <div className="featured-image-container">
              <img src="https://www.zuhalmuzik.com/images/product/143021GRG121SP-BMC_1.jpg" alt="Featured Guitar" />
            </div>
            <h3>IBANEZ GRG121SP-BMC</h3>
            <p className="featured-price">15.200 TL</p>
            <button className="view-product-btn">Ürünü İncele</button>
          </div>
          <div className="featured-card">
            <div className="featured-image-container">
              <img src="https://www.zuhalmuzik.com/images/product/144849D-CUBE-LX_1.jpg" alt="Featured Amp" />
            </div>
            <h3>BOSS DUAL CUBE-LX</h3>
            <p className="featured-price">9.990 TL</p>
            <button className="view-product-btn">Ürünü İncele</button>
          </div>
          <div className="featured-card">
            <div className="featured-image-container">
              <img src="https://www.zuhalmuzik.com/images/product/144716MEDELI-DD638DX_ELEKTRONIK-DAVUL_1.jpg" alt="Featured Drum" />
            </div>
            <h3>MEDELI DD638DX</h3>
            <p className="featured-price">12.000 TL</p>
            <button className="view-product-btn">Ürünü İncele</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
