import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import ContactBanner from '../components/ui/ContactBanner';
import { Loader, ErrorMsg } from '../components/ui/Loader';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.getProduct(slug)
      .then(async (p) => {
        setProduct(p);
        const mainImg = p.images?.find(i => i.is_main) || p.images?.[0];
        setActiveImg(mainImg?.image || p.main_image || null);
        if (p.category) {
          const cats = await api.getCategories();
          const cat = cats.find(c => c.id === p.category);
          setCategory(cat);
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <main className="container section"><Loader /></main>;
  if (error) return <main className="container section"><ErrorMsg message={error} /></main>;
  if (!product) return null;

  return (
    <main>
      <div className="container section">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Bosh sahifa</Link>
          <span>/</span>
          <Link to="/products">Mahsulotlar</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="detail-layout">
          {/* Images */}
          <div className="detail-images">
            <div className="detail-main-img">
              {activeImg
                ? <img src={activeImg} alt={product.name} />
                : <div className="img-placeholder">🧴</div>
              }
            </div>
            {product.images?.length > 1 && (
              <div className="detail-thumbs">
                {product.images.map(img => (
                  <button
                    key={img.id}
                    className={`thumb-btn ${activeImg === img.image ? 'active' : ''}`}
                    onClick={() => setActiveImg(img.image)}
                  >
                    <img src={img.image} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            {category && (
              <span className="detail-badge">{category.name}</span>
            )}
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-short">{product.short_description}</p>
            <div className="detail-price">
              {Number(product.price).toLocaleString('uz-UZ')} so'm
            </div>
            <p className="detail-desc">{product.description}</p>

            {/* Contact actions */}
            <div className="detail-contact-card">
              <p className="detail-contact-title">Buyurtma berish uchun bog'laning:</p>
              <div className="detail-contact-btns">
                <a href="tel:+998997776665" className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                  </svg>
                  Qo'ng'iroq qilish
                </a>
                <a href="mailto:samlux@gmail.com" className="btn-outline">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email yozish
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container section">
        <ContactBanner title="Boshqa savollar bormi?" />
      </div>
    </main>
  );
}
