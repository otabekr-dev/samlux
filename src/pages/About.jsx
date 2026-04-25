import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import ContactBanner from '../components/ui/ContactBanner';
import { Loader } from '../components/ui/Loader';

export default function About() {
  const { data: companyArr, loading } = useFetch(api.getCompany, []);
  const company = companyArr?.[0];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Biz haqimizda</h1>
          <p className="page-sub">Samlux — ishonchli hamkor</p>
        </div>
      </section>

      <section className="section container">
        {loading && <Loader />}
        {company && (
          <div className="about-layout">
            <div className="about-logo-wrap">
              {company.logo
                ? <img src={company.logo} alt={company.name} className="about-logo" />
                : <div className="about-logo-placeholder">🧴</div>
              }
            </div>
            <div className="about-info">
              <h2 className="about-name">{company.name}</h2>
              <p className="about-desc">{company.description}</p>

              <div className="about-contacts">
                <div className="about-contact-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                  </svg>
                  <a href={`tel:${company.phone}`}>{company.phone}</a>
                </div>
                <div className="about-contact-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
                <div className="about-contact-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{company.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="section container">
        <ContactBanner title="Biz bilan bog'laning" />
      </section>
    </main>
  );
}
