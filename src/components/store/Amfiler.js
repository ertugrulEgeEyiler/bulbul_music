import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import './Amfiler.css';

function Amfiler() {
  const [amfiler, setAmfiler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    marka: 'all',
    fiyat: 'all'
  });

  useEffect(() => {
    const fetchAmfiler = async () => {
      try {
        setLoading(true);
        // Fetch all 27 amplifier files based on our zuhalurunler.py output
        const promises = [];
        for (let i = 1; i <= 27; i++) {
          const id = i.toString().padStart(3, '0');
          promises.push(fetch(`/amfiler/amfi_${id}.json`)
            .then(res => {
              if (!res.ok) throw new Error(`Failed to fetch amfi_${id}.json`);
              return res.json();
            })
            .catch(err => {
              console.error(err);
              return null;
            })
          );
        }
        
        const results = await Promise.all(promises);
        setAmfiler(results.filter(result => result !== null));
      } catch (error) {
        console.error("Error fetching amfiler data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAmfiler();
  }, []);

  // Get unique brands
  const markalar = [...new Set(amfiler.map(amfi => amfi.marka))];
  
  // Filter the amplifiers
  const filteredAmfiler = amfiler.filter(amfi => {
    const markaMatch = filter.marka === 'all' || amfi.marka === filter.marka;
    
    let fiyatMatch = true;
    const fiyat = parseInt(amfi.fiyat);
    
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
        <h1 className="product-title">Amfiler</h1>
        <p className="product-description">
          Her türlü müzik tarzına ve sahne ihtiyacına uygun geniş bir amfi koleksiyonumuz bulunmaktadır.
          En iyi ses kalitesi için profesyonel amfilerden kompakt antreman amfilerini kadar tüm ürünleri burada bulabilirsiniz.
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
            <p>{filteredAmfiler.length} ürün bulundu</p>
          </div>

          <div className="product-grid">
            {filteredAmfiler.map((amfi, index) => (
              <ProductCard 
                key={index} 
                product={amfi} 
                category="amfiler" 
                index={index} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Amfiler;
