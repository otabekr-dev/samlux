import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import ContactBanner from '../components/ui/ContactBanner';
import { Loader, ErrorMsg } from '../components/ui/Loader';

export default function Products() {
  const { data: products, loading: pLoad, error: pErr } = useFetch(api.getProducts, []);
  const { data: categories } = useFetch(api.getCategories, []);
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState('');

  const catMap = {};
  categories?.forEach(c => { catMap[c.id] = c.name; });

  const parentCats = categories?.filter(c => c.parent === null) || [];

  const filtered = products?.filter(p => {
    const matchCat = activeCategory === null || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Mahsulotlar</h1>
          <p className="page-sub">Barcha tozalik vositalari bir joyda</p>
        </div>
      </section>

      <section className="section container">
        {/* Search */}
        <div className="search-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Mahsulot qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
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
        {!pLoad && !pErr && filtered?.length === 0 && (
          <div className="empty-state">Mahsulot topilmadi 🔍</div>
        )}
        {!pLoad && !pErr && filtered?.length > 0 && (
          <div className="product-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} categoryName={catMap[p.category]} />
            ))}
          </div>
        )}
      </section>

      <section className="section container">
        <ContactBanner />
      </section>
    </main>
  );
}
