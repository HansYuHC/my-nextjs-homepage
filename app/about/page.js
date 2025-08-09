'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import '../leaflet/leaflet.css';
import './page.css';

export default function AboutPage() {
  useEffect(() => {
    const loadLeafletAndMaps = async () => {
      const L = await import('leaflet');
      const combinedData = await loadCombinedLanguageData();
      initializeMaps(L, combinedData);
    };
    loadLeafletAndMaps();
  }, []);

  return (
    <main className="about-page">
      <div className="content-wrapper">
        <section id="about">
          <h1 data-lang-key="about">关于我</h1>
          <p data-lang-key="aboutDescription">我是余海川……</p>
          <p data-lang-key="aboutExperience">以下是我的个人教育，生活及工作经历:</p>

          <h3 data-lang-key="qingdao">青岛</h3>
          <div id="qingdao-map" style={{ height: '400px', marginBottom: '2rem' }}></div>

          <h3 data-lang-key="germany">德国</h3>
          <div id="germany-map" style={{ height: '400px' }}></div>
        </section>

        <section id="education">
          <h2 data-lang-key="HighEducation">高等教育经历</h2>
          <p data-lang-key="GuangzhouSCUT">中国广州 - 华南理工大学 - 机械工程学士</p>
          <p data-lang-key="KarlsruheKIT">德国卡尔斯鲁厄 - 卡尔斯鲁厄理工学院 - 机械工程学士及硕士</p>
        </section>

        <section id="skills">
          <h2 data-lang-key="skills">技能与专长</h2>
          <ul>
            <li data-lang-key="skill1">震荡学原理与应用</li>
            <li data-lang-key="skill2">机械设计与仿真</li>
            <li data-lang-key="skill3">汽车电子控制单元测试与开发</li>
            <li data-lang-key="skill4">德国及中国驾照……</li>
            <li data-lang-key="skill5">三语能力</li>
            <li data-lang-key="skill6">编程语言：MATLAB, Python, CANoe, JavaScript</li>
          </ul>
          <img src="/images/skills-matrix.png" alt="能力矩阵" style={{ width: '100%', maxWidth: '600px', marginTop: '0.2rem' }} />
        </section>

        <section id="interests">
          <h2 data-lang-key="interests">兴趣与爱好</h2>
          <div className="interest-icons">
            <Image src="/images/travel-icon.png" alt="旅行" width={40} height={40} />
            <Image src="/images/weiqi-icon.png" alt="围棋" width={40} height={40} />
            <Image src="/images/movie-icon.png" alt="电影" width={40} height={40} />
          </div>
          <p data-lang-key="interestsDescription">我喜欢海岛旅行，与电脑对弈，欣赏动作科幻电影，利用AI编程……</p>
        </section>
      </div>

      <footer>
        <p>&copy; 2025 余海川。保留所有权利。</p>
        <p>
          <span>关注我：</span>
          <a href="https://www.linkedin.com/in/haichuan-yu/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/LI-Logo.png" alt="LinkedIn" width={80} height={20} />
          </a>
        </p>
      </footer>
    </main>
  );
}

async function loadCombinedLanguageData() {
  const currentLanguage = localStorage.getItem('userLanguage') || 'zh';
  const [globalRes, aboutRes] = await Promise.all([
    fetch('/lang/global.json'),
    fetch('/lang/about.json')
  ]);
  const globalData = await globalRes.json();
  const aboutData = await aboutRes.json();
  return { ...globalData[currentLanguage], ...aboutData[currentLanguage] };
}

function initializeMaps(L, combinedData) {
  // 如果已经初始化过，则移除
  if (L.DomUtil.get('qingdao-map')?._leaflet_id) {
    L.map('qingdao-map').remove();
  }
  if (L.DomUtil.get('germany-map')?._leaflet_id) {
    L.map('germany-map').remove();
  }

  const qingdaoMap = L.map('qingdao-map').setView([36.0771, 120.3826], 11.5);
  const germanyMap = L.map('germany-map').setView([51.1657, 10.4515], 6);

  const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tileLayerOptions = { attribution: '&copy; OpenStreetMap contributors' };
  L.tileLayer(tileLayerUrl, tileLayerOptions).addTo(qingdaoMap);
  L.tileLayer(tileLayerUrl, tileLayerOptions).addTo(germanyMap);

  // 自定义 marker 图标路径
  const defaultIcon = L.icon({
    iconUrl: '/leaflet/images/marker-icon.png',
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const qingdaoMarkers = [
    {
      latlng: [36.07224, 120.41488],
      popup: `
        <h4 data-lang-key="myKita">我的幼儿园</h4>
        <img src="/images/kindergarten.png" style="width:100%;max-width:200px;" />
        <p data-lang-key="myKitaDescription">与小盆友们分享奥特曼玩偶，是我童年的起点。</p>
      `
    }
  ];

  const germanyMarkers = [
    {
      latlng: [48.68453, 9.01200],
      popup: `
        <h4 data-lang-key="boeblingenTitle">伯布林根</h4>
        <img src="/images/boeblingen.png" style="width:100%;max-width:200px;" />
        <p data-lang-key="boeblingenDescription">我目前居住在伯布林根，是个别有韵味的小城。</p>
      `
    }
  ];

  qingdaoMarkers.forEach(marker => {
    const translated = translatePopupContent(marker.popup, combinedData);
    L.marker(marker.latlng, { icon: defaultIcon }).addTo(qingdaoMap).bindPopup(translated);
  });

  germanyMarkers.forEach(marker => {
    const translated = translatePopupContent(marker.popup, combinedData);
    L.marker(marker.latlng, { icon: defaultIcon }).addTo(germanyMap).bindPopup(translated);
  });

  window.addEventListener('resize', () => {
    qingdaoMap.invalidateSize();
    germanyMap.invalidateSize();
  });
}

function translatePopupContent(popupTemplate, combinedData) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = popupTemplate;
  tempDiv.querySelectorAll('[data-lang-key]').forEach(el => {
    const key = el.getAttribute('data-lang-key');
    if (combinedData[key]) el.innerHTML = combinedData[key];
  });
  return tempDiv.innerHTML;
}
