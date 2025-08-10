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
          />
          <School
            name={t('scut')}
            img="/images/scut-logo.png"
          />
          <School
            name={t('kit')}
            img="/images/kit-logo.png"
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
          />
          <Company
            name={t('luolin')}
            img="/images/luolin-logo.png"
          />
          <Company
            name="Schaeffler AG"
            img="/images/schaeffler-logo.png"
          />
          <Company
            name="Stabilus SE"
            img="/images/stabilus-logo.png"
          />
          <Company
            name="Bertrandt AG"
            img="/images/bertrandt-logo.png"
          />
          <Company
            name="Mercedes-Benz AG (ANÜ von Bertrandt)"
            img="/images/mercedes-logo.png"
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

function School({ name, img }) {
  return (
    <p>
      <span>{name}</span>
      <Image src={img} alt={`${name} Logo`} width={80} height={40} />
    </p>
  );
}

function Company({ name, img }) {
  return (
    <p>
      <span>{name}</span>
      <Image src={img} alt={`${name} Logo`} width={100} height={50} />
    </p>
  );
}