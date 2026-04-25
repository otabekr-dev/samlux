import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function ContactBanner({ title = "Buyurtma bermoqchimisiz?" }) {
  const [company, setCompany] = useState(null);
  useEffect(() => { api.getCompany().then(d => setCompany(d[0])).catch(() => {}); }, []);

  return (
    <div className="contact-banner">
      <div className="contact-banner-text">
        <h3>{title}</h3>
        <p>Telefon yoki email orqali bog'laning — tez javob beramiz</p>
      </div>
      <div className="contact-banner-btns">
        <a href={`tel:${company?.phone || '+998991234567'}`} className="btn-call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
          </svg>
          {company?.phone || '+998991234567'}
        </a>
        <a href={`mailto:${company?.email || 'info@samlux.uz'}`} className="btn-email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {company?.email || 'info@samlux.uz'}
        </a>
      </div>
    </div>
  );
}
