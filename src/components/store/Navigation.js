import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Define our navigation items
  const navItems = [
    { path: '/store', label: 'Mağaza' },
    { path: '/gitarlar', label: 'Gitarlar' },
    { path: '/amfiler', label: 'Amfiler' },
    { path: '/davullar', label: 'Davullar' }
  ];
  
  // Check if we're on a product detail page
  const isProductDetailPage = /^\/(gitarlar|amfiler|davullar)\/\d+$/.test(currentPath);
  
  // If we are on a product detail page, determine the category
  let productCategory = '';
  if (isProductDetailPage) {
    productCategory = currentPath.split('/')[1];
  }

  return (
    <nav className="store-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Bulbul Music
        </Link>
        
        <div className="nav-links">
          {navItems.map((item) => {
            // If we're on a product detail page, highlight the category nav link
            const isActive = 
              currentPath === item.path || 
              (isProductDetailPage && `/${productCategory}` === item.path);
              
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        
        <div className="nav-actions">
          <button className="search-button">
            <span className="search-icon">🔍</span>
          </button>
          <Link to="/login" className="user-button">
            <span className="user-icon">👤</span>
          </Link>
          <button className="cart-button">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">0</span>
          </button>
        </div>
      </div>
      
      {/* Breadcrumb navigation for product pages */}
      {(currentPath !== '/' && currentPath !== '/store') && (
        <div className="breadcrumb-container">
          <div className="breadcrumbs">
            <Link to="/">Ana Sayfa</Link>
            {currentPath.startsWith('/store') && <span>Mağaza</span>}
            
            {currentPath.startsWith('/gitarlar') && (
              <>
                <span className="breadcrumb-separator">/</span>
                <Link to="/store">Mağaza</Link>
                <span className="breadcrumb-separator">/</span>
                {!isProductDetailPage ? (
                  <span>Gitarlar</span>
                ) : (
                  <>
                    <Link to="/gitarlar">Gitarlar</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span>Ürün Detayı</span>
                  </>
                )}
              </>
            )}
            
            {currentPath.startsWith('/amfiler') && (
              <>
                <span className="breadcrumb-separator">/</span>
                <Link to="/store">Mağaza</Link>
                <span className="breadcrumb-separator">/</span>
                {!isProductDetailPage ? (
                  <span>Amfiler</span>
                ) : (
                  <>
                    <Link to="/amfiler">Amfiler</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span>Ürün Detayı</span>
                  </>
                )}
              </>
            )}
            
            {currentPath.startsWith('/davullar') && (
              <>
                <span className="breadcrumb-separator">/</span>
                <Link to="/store">Mağaza</Link>
                <span className="breadcrumb-separator">/</span>
                {!isProductDetailPage ? (
                  <span>Davullar</span>
                ) : (
                  <>
                    <Link to="/davullar">Davullar</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span>Ürün Detayı</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
