import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, category, index }) {
  return (
    <div className="product-card">
      <Link to={`/${category}/${index + 1}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.resimler[0]}
            alt={product.urun_adi}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/pngs/image-placeholder.svg";
            }}
          />
        </div>
        <div className="product-info">
          <h2 className="product-name">{product.urun_adi}</h2>
          <p className="product-brand">{product.marka}</p>
          <p className="product-price">{parseInt(product.fiyat).toLocaleString('tr-TR')} {product.kur}</p>
          {product.stok && parseInt(product.stok) > 0 ? (
            <span className="stock-status in-stock">Stokta</span>
          ) : (
            <span className="stock-status out-of-stock">Stokta Yok</span>
          )}
        </div>
      </Link>
      <button className="add-to-cart-btn">Sepete Ekle</button>
    </div>
  );
}

export default ProductCard;
