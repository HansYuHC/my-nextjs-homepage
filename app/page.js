'use client';

import Image from 'next/image';
import Header from '@/components/Header';
// import './page.css'; // 可选：添加你的样式

export default function HomePage() {
  return (
    <>
      <Header title="欢迎来到余海川的个人网站" />

      <main
        style={{
          backgroundImage: "url('/images/background_qd.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="content-wrapper">
          <Section id="about" title="关于我" desc="青岛->广州->卡尔斯鲁厄->伯布林根" href="/about" />
          <Section id="projects" title="个人项目" desc="CAD项目; Excel VBA项目; MATLAB/Simulink 项目; Python 项目; 其他项目" href="/projects" />
          <Section id="academic" title="学术成果" href="/academic">
            <School name="山东省青岛第二中学" img="/images/qdez-logo.png" />
            <School name="华南理工大学" img="/images/scut-logo.png" />
            <School name="卡尔斯鲁厄理工学院" img="/images/kit-logo.png" />
          </Section>
          <Section id="work" title="工作经历" href="/work">
            <Company name="莱州鸿源台钳制造有限公司" img="/images/hongyuan-logo.png" />
            <Company name="青岛洛林机械有限公司" img="/images/luolin-logo.png" />
            <Company name="Schaeffler AG" img="/images/schaeffler-logo.png" />
            <Company name="Stabilus SE" img="/images/stabilus-logo.png" />
            <Company name="Bertrandt AG" img="/images/bertrandt-logo.png" />
            <Company name="Mercedes-Benz AG (ANÜ von Bertrandt)" img="/images/mercedes-logo.png" />
          </Section>
          <Section id="certificates" title="我的证书" desc="从高中到大学毕业期间的证书" href="/certificates" />
          <Section id="contact" title="联系方式" desc="欢迎联系我!" href="/contact" />
        </div>

        <footer>
          <p>&copy; 2025 余海川。 保留所有权利。</p>
          <p>
            <span>关注我：</span>
            <a href="https://www.linkedin.com/in/haichuan-yu/" target="_blank" rel="noopener noreferrer">
              <Image src="/images/LI-Logo.png" alt="LinkedIn" width={80} height={20} />
            </a>
          </p>

          {/* 语言切换按钮（开发调试用） */}
          <button onClick={() => changeLanguage('zh')}>中文</button>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('de')}>Deutsch</button>
        </footer>
      </main>
    </>
  );
}

function Section({ id, title, desc, children, href }) {
  return (
    <section id={id} onClick={() => (window.location.href = href)} style={{ cursor: 'pointer' }}>
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

function changeLanguage(lang) {
  console.log(`语言切换到 ${lang}（功能后续完成）`);
}
