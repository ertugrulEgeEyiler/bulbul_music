import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState(null);
  
  // Extract the category from the URL path
  const category = location.pathname.split('/')[1];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Determine the product type and file path based on the category
        let filePath;
        if (category === 'gitarlar') {
          filePath = `/gitarlar/gitar_${id.toString().padStart(3, '0')}.json`;
        } else if (category === 'amfiler') {
          filePath = `/amfiler/amfi_${id.toString().padStart(3, '0')}.json`;
        } else if (category === 'davullar') {
          filePath = `/davullar/davul_${id.toString().padStart(3, '0')}.json`;
        } else {
          throw new Error('Geçersiz ürün kategorisi');
        }
        
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Ürün bilgisi yüklenemedi: ${response.statusText}`);
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category && id) {
      fetchProduct();
    }
  }, [category, id]);

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Ürün bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <h2>Bir hata oluştu</h2>
          <p>{error || "Ürün bulunamadı"}</p>
          <Link to={`/${category}`} className="back-button">Ürün listesine dön</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-navigation">
        <Link to={`/${category}`} className="back-link">
          ← Tüm Ürünlere Dön
        </Link>
      </div>

      <div className="product-detail-content">
        <div className="product-detail-images">          <div className="product-main-image">
            <img
              src={product.resimler[activeImage] || "/pngs/image-placeholder.svg"}
              alt={product.urun_adi}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/pngs/image-placeholder.svg";
              }}
            />
          </div>
          
          {product.resimler.length > 1 && (
            <div className="product-thumbnails">
              {product.resimler.map((resim, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img                    src={resim}
                    alt={`${product.urun_adi} - Görsel ${index + 1}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/pngs/image-placeholder.svg";
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.urun_adi}</h1>
          <p className="product-detail-brand">{product.marka}</p>
          <p className="product-detail-price">{parseInt(product.fiyat).toLocaleString('tr-TR')} {product.kur}</p>
          
          {product.stok && parseInt(product.stok) > 0 ? (
            <span className="stock-status in-stock">Stokta</span>
          ) : (
            <span className="stock-status out-of-stock">Stokta Yok</span>
          )}
          
          <div className="product-actions">
            <button className="add-to-cart-btn">Sepete Ekle</button>
            <button className="wishlist-btn">Favorilere Ekle</button>
          </div>
          
          <div className="product-description">
            <h2>Ürün Açıklaması</h2>
            <div dangerouslySetInnerHTML={{ __html: product.aciklama_html }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
