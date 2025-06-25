import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import './Gitarlar.css';

function Gitarlar() {
  const [gitarlar, setGitarlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    marka: 'all',
    fiyat: 'all'
  });

  useEffect(() => {
    const fetchGitarlar = async () => {
      try {
        setLoading(true);
        // Determine the number of JSON files to fetch (we know from running zuhalurunler.py that there are 109)
        const promises = [];
        for (let i = 1; i <= 109; i++) {
          const id = i.toString().padStart(3, '0');
          promises.push(fetch(`/gitarlar/gitar_${id}.json`)
            .then(res => {
              if (!res.ok) throw new Error(`Failed to fetch gitar_${id}.json`);
              return res.json();
            })
            .catch(err => {
              console.error(err);
              return null; // Return null for failed requests
            })
          );
        }
        
        const results = await Promise.all(promises);
        setGitarlar(results.filter(result => result !== null)); // Filter out failed requests
      } catch (error) {
        console.error("Error fetching gitarlar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitarlar();
  }, []);

  // Get unique brands from the data
  const markalar = [...new Set(gitarlar.map(gitar => gitar.marka))];
  
  // Filter the guitars based on selected filters
  const filteredGitarlar = gitarlar.filter(gitar => {
    const markaMatch = filter.marka === 'all' || gitar.marka === filter.marka;
    
    let fiyatMatch = true;
    const fiyat = parseInt(gitar.fiyat);
    
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
        <h1 className="product-title">Gitarlar</h1>
        <p className="product-description">
          En kaliteli gitarları bulabileceğiniz koleksiyon. Elektro gitarlardan akustik gitarlara kadar
          geniş bir ürün yelpazesi sunuyoruz.
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
            <p>{filteredGitarlar.length} ürün bulundu</p>
          </div>

          <div className="product-grid">
            {filteredGitarlar.map((gitar, index) => (
              <ProductCard 
                key={index} 
                product={gitar} 
                category="gitarlar" 
                index={index} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Gitarlar;
