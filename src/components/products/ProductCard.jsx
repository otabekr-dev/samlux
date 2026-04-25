import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function ProductCard({ product, categoryName }) {
  const mainImage = product.images?.find(i => i.is_main) || product.images?.[0];
  const imgSrc = mainImage?.image || null;

  return (
    <Link to={`/products/${product.slug}`} className="product-card">
      <div className="product-card-img">
        {imgSrc
          ? <img src={imgSrc} alt={product.name} />
          : <div className="product-card-placeholder">🧴</div>
        }
      </div>
      <div className="product-card-body">
        {categoryName && <span className="product-card-cat">{categoryName}</span>}
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.short_description}</p>
      </div>
      <div className="product-card-footer">
        <span className="product-card-price">
          {Number(product.price).toLocaleString('uz-UZ')} so'm
        </span>
        <span className="product-card-arrow">→</span>
      </div>
    </Link>
  );
}
