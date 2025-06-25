import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import './Davullar.css';

function Davullar() {
  const [davullar, setDavullar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    marka: 'all',
    fiyat: 'all'
  });

  useEffect(() => {
    const fetchDavullar = async () => {
      try {
        setLoading(true);
        // Fetch all 36 drum files based on our zuhalurunler.py output
        const promises = [];
        for (let i = 1; i <= 36; i++) {
          const id = i.toString().padStart(3, '0');
          promises.push(fetch(`/davullar/davul_${id}.json`)
            .then(res => {
              if (!res.ok) throw new Error(`Failed to fetch davul_${id}.json`);
              return res.json();
            })
            .catch(err => {
              console.error(err);
              return null;
            })
          );
        }
        
        const results = await Promise.all(promises);
        setDavullar(results.filter(result => result !== null));
      } catch (error) {
        console.error("Error fetching davullar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDavullar();
  }, []);

  // Get unique brands
  const markalar = [...new Set(davullar.map(davul => davul.marka))];
  
  // Filter the drums
  const filteredDavullar = davullar.filter(davul => {
    const markaMatch = filter.marka === 'all' || davul.marka === filter.marka;
    
    let fiyatMatch = true;
    const fiyat = parseInt(davul.fiyat);
    
    switch (filter.fiyat) {
      case 'low':
        fiyatMatch = fiyat < 5000;
        break;
      case 'medium':
        fiyatMatch = fiyat >= 5000 && fiyat < 10000;
        break;
      case 'high':
        fiyatMatch = fiyat >= 10000 && fiyat < 20000;
        break;
      case 'premium':
        fiyatMatch = fiyat >= 20000;
        break;
      default:
        fiyatMatch = true;
    }
    
    return markaMatch && fiyatMatch;
  });

  return (
    <div className="product-container">
      <div className="product-header">
        <h1 className="product-title">Davullar</h1>
        <p className="product-description">
          Acemi ve profesyonel davulcular için akustik ve elektronik davul setleri. 
          Ritim enstrümanları ve vurmalı çalgılar için geniş seçenekler sunuyoruz.
        </p>
      </div>

      <div className="product-filters">
        <div className="filter-group">
          <label>Marka</label>
          <select 
            value={filter.marka} 
            onChange={e => setFilter({...filter, marka: e.target.value})}
          >
            <option value="all">Tümü</option>
            {markalar.map(marka => (
              <option key={marka} value={marka}>{marka}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Fiyat Aralığı</label>
          <select 
            value={filter.fiyat} 
            onChange={e => setFilter({...filter, fiyat: e.target.value})}
          >
            <option value="all">Tümü</option>
            <option value="low">5.000 TL altı</option>
            <option value="medium">5.000 TL - 10.000 TL</option>
            <option value="high">10.000 TL - 20.000 TL</option>
            <option value="premium">20.000 TL ve üzeri</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Ürünler yükleniyor...</p>
        </div>
      ) : (
        <>
          <div className="product-count">
            <p>{filteredDavullar.length} ürün bulundu</p>
          </div>

          <div className="product-grid">
            {filteredDavullar.map((davul, index) => (
              <ProductCard 
                key={index} 
                product={davul} 
                category="davullar" 
                index={index} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Davullar;
