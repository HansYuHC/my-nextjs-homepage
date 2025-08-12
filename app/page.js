// app/page.js
'use client';
import Image from 'next/image';
import { useLang } from '@/hooks/useLang';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { t, lang, isLoading } = useLang();

  if (isLoading) {
    return (
      <main style={{
        backgroundImage: "url('/images/background_qd.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        paddingBottom: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <div style={{ color: '#fff', fontSize: '18px' }}>Loading translations...</div>
      </main>
    );
  }

  return (
    <main
      style={{
        backgroundImage: "url('/images/background_qd.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        paddingBottom: '50px'
      }}
    >
      <div className="content-wrapper">
        <Section
          id="about"
          title={t('about')}
          desc={t('aboutDescription')}
          href="/about"
        />

        <Section
          id="projects"
          title={t('projects')}
          desc={t('projectsDescription')}
          href="/projects"
        />

        <Section
          id="academic"
          title={t('academic')}
          href="/academic"
        >
          <School
            name={t('qdez')}
            img="/images/qdez-logo.png"
            className="qdez-logo"
          />
          <School
            name={t('scut')}
            img="/images/scut-logo.png"
            className="scut-logo"
          />
          <School
            name={t('kit')}
            img="/images/kit-logo.png"
            className="kit-logo"
          />
        </Section>

        <Section
          id="work"
          title={t('work')}
          href="/work"
        >
          <Company
            name={t('hongyuan')}
            img="/images/hongyuan-logo.png"
            className="hongyuan-logo"
          />
          <Company
            name={t('luolin')}
            img="/images/luolin-logo.png"
            className="luolin-logo"
          />
          <Company
            name="Schaeffler AG"
            img="/images/schaeffler-logo.png"
            className="schaeffler-logo"
          />
          <Company
            name="Stabilus SE"
            img="/images/stabilus-logo.png"
            className="stabilus-logo"
          />
          <Company
            name="Bertrandt AG"
            img="/images/bertrandt-logo.png"
            className="bertrandt-logo"
          />
          <Company
            name="Mercedes-Benz AG (ANÜ von Bertrandt)"
            img="/images/mercedes-logo.png"
            className="mercedes-logo"
          />
        </Section>

        <Section
          id="certificates"
          title={t('certificates')}
          desc={t('certificatesDescription')}
          href="/certificates"
        />

        <Section
          id="contact"
          title={t('contact')}
          desc={t('contactDescription')}
          href="/contact"
        />
      </div>

      {/* 使用导入的Footer组件替代原来的footer */}
      <Footer />
    </main>
  );
}

function Section({ id, title, desc, children, href }) {
  return (
    <section
      id={id}
      onClick={() => (window.location.href = href)}
      style={{
        cursor: 'pointer',
        background: 'rgba(255, 255, 255, 0.8)',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '800px',
        textAlign: 'center'
      }}
    >
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
      {children}
    </section>
  );
}

function School({ name, img, className }) {
  return (
    <p className="name-logo-wrapper">
      <span>{name}</span>
      <Image
       src={img}
       alt={`${name} Logo`}
       width={120}
       height={50}
       className={className}
      />
    </p>
  );
}

function Company({ name, img, className }) {
  return (
    <p className="name-logo-wrapper">
      <span>{name}</span>
      <Image
        src={img}
        alt={`${name} Logo`}
        width={120} // 或者你原来想给的宽度
        height={50}
        className={className}
      />
    </p>
  );
}