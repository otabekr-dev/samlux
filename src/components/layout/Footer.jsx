import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export default function Footer() {
  const [company, setCompany] = useState(null);
  useEffect(() => { api.getCompany().then(d => setCompany(d[0])).catch(() => {}); }, []);

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-bubble" />
          <span className="footer-name">{company?.name || 'Samlux'}</span>
          <p className="footer-desc">{company?.description || "Sifatli tozalik mahsulotlari"}</p>
        </div>
        <div className="footer-col">
          <div className="footer-heading">Sahifalar</div>
          <Link to="/" className="footer-link">Bosh sahifa</Link>
          <Link to="/products" className="footer-link">Mahsulotlar</Link>
          <Link to="/about" className="footer-link">Biz haqimizda</Link>
        </div>
        <div className="footer-col">
          <div className="footer-heading">Bog'lanish</div>
          {company?.phone && <a href={`tel:${company.phone}`} className="footer-link">{company.phone}</a>}
          {company?.email && <a href={`mailto:${company.email}`} className="footer-link">{company.email}</a>}
          {company?.address && <span className="footer-link">{company.address}</span>}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {company?.name || 'Samlux'}. Barcha huquqlar himoyalangan.</span>
      </div>
    </footer>
  );
}
