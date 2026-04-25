import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import ProductCard from '../components/products/ProductCard';
import ContactBanner from '../components/ui/ContactBanner';
import { Loader, ErrorMsg } from '../components/ui/Loader';

export default function Home() {
  const { data: products, loading: pLoad, error: pErr } = useFetch(api.getProducts, []);
  const { data: categories } = useFetch(api.getCategories, []);
  const { data: companyArr } = useFetch(api.getCompany, []);
  const [activeCategory, setActiveCategory] = useState(null);

  const company = companyArr?.[0];

  const catMap = {};
  categories?.forEach(c => { catMap[c.id] = c.name; });

  const parentCats = categories?.filter(c => c.parent === null) || [];

  const filtered = activeCategory
    ? products?.filter(p => p.category === activeCategory)
    : products;

  const featured = products?.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <div className="hero-eyebrow">Sifatli tozalik</div>
            <h1 className="hero-title">
              Uyingiz doim<br />
              <span className="hero-accent">toza va xushbo'y</span>
            </h1>
            <p className="hero-sub">
              {company?.description || "Uy tozaligi uchun professional vositalar. Yuqori sifat, qulay narx."}
            </p>
            <div className="hero-btns">
              <Link to="/products" className="btn-primary">Mahsulotlarni ko'rish</Link>
              <a href={`tel:${company?.phone || ''}`} className="btn-outline">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                </svg>
                Qo'ng'iroq qilish
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-blob">🧴</div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Mahsulotlar</h2>
          <Link to="/products" className="see-all">Barchasini ko'rish →</Link>
        </div>

        {/* Category filter */}
        {parentCats.length > 0 && (
          <div className="cat-filter">
            <button
              className={`cat-chip ${activeCategory === null ? 'active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              Hammasi
            </button>
            {parentCats.map(c => (
              <button
                key={c.id}
                className={`cat-chip ${activeCategory === c.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {pLoad && <Loader />}
        {pErr && <ErrorMsg message={pErr} />}
        {!pLoad && !pErr && (
          <div className="product-grid">
            {filtered?.map(p => (
              <ProductCard key={p.id} product={p} categoryName={catMap[p.category]} />
            ))}
          </div>
        )}
      </section>

      {/* Contact */}
      <section className="section container">
        <ContactBanner title="Buyurtma bermoqchimisiz?" />
      </section>
    </main>
  );
}
