"use client";

import { useEffect } from "react";
import "@/app/globals.css";

export default function WorkPage() {
  useEffect(() => {
    // 可以在此设置语言初始化逻辑
  }, []);

  return (
    <div data-page="work">
      <header id="header-container">
        <div id="dynamic-title-container">
          <h1 data-lang-key="work">工作经历</h1>
        </div>
      </header>

      <main className="px-4 py-8">
        <section>
          <h2 className="text-2xl font-bold mb-6" data-lang-key="work">工作经历</h2>

          {/* 示例公司模块 */}
          {[
            {
              titleKey: "hongyuanTitle",
              title: "莱州鸿源台钳制造有限公司 (金工实习生，2011年6月 - 2011年7月)",
              logo: "/images/hongyuan-logo.png",
              link: "https://www.chinavise.com/",
              paragraphs: [
                "莱州鸿源台钳制造有限公司拥有50多年的台虎钳生产历史，是中国台钳生产行业的领军者。目前主要生产台虎钳、奥贝球铁（ADI）、汽车配件、工程机械配件和电力配件等产品，销往美国、加拿大、澳大利亚、日本和欧盟国家。",
                "我于2011年的夏天在莱州鸿源台钳制造公司进行了为期一个月的金工实习...",
              ],
              images: ["/images/hongyuan-work.png"]
            },
            {
              titleKey: "luolinTitle",
              title: "青岛洛林机械有限公司 (2012年7月 至今)",
              logo: "/images/luolin-logo.png",
              link: "http://www.lolinmetals.com/",
              paragraphs: [
                "青岛洛林机械有限公司成立于1990年，扎根青岛，业务覆盖全球，主要面向欧洲，日本及美国的主机厂以及一二三级各个级别的供应商...",
                "2018年，我与公司经理一道代表公司参展了当年的汉诺威工业博览会...",
                "2019年，我独自代表公司出席参展了当年的杜塞尔多夫冶金压铸展览会(METEC)..."
              ],
              images: ["/images/luolin-work.png", "/images/luolin-messe.png", "/images/luolin-messe2.png"]
            },
            {
              titleKey: "schaefflerTitle",
              title: "Schaeffler AG (2017年5月 - 2017年11月)",
              logo: "/images/schaeffler-logo.png",
              link: "https://www.schaeffler.com/",
              paragraphs: [
                "舍弗勒集团(Schaeffler AG)是一家专注驱动技术的科技公司...",
                "我于2017年5月份开始在舍弗勒公司进行了为期六个月的本科阶段实习...",
                "研究的目标主要是三个不同品牌车型的发动机的曲轴和凸轮轴...",
                "最后将研究成果以PPT形式展示汇报..."
              ],
              images: ["/images/schaeffler-work.png", "/images/schaeffler-work2.png"]
            },
            {
              titleKey: "stabilusTitle",
              title: "Stabilus SE (2021年11月 - 2022年7月)",
              logo: "/images/stabilus-logo.png",
              link: "https://www.stabilus.com/",
              paragraphs: [
                "斯泰必鲁斯(Stabilus SE)在全球拥有 6,000 多名员工和 16 个生产基地...",
                "“Silent Railway”项目的灵感来自于主动降噪耳机...",
                "开始项目后我先阅读了大量的相关文献...",
                "最后将研究成果以PPT形式展示汇报..."
              ],
              images: ["/images/stabilus-work.png", "/images/stabilus-work2.png", "/images/stabilus-work3.png"]
            },
            {
              titleKey: "bertrandtTitle",
              title: "Bertrandt AG (2022年7月 - 2024年3月)",
              logo: "/images/bertrandt-logo.png",
              link: "https://www.bertrandt.com/",
              paragraphs: [
                "Bertrandt AG 是一家位于巴登-符腾堡州埃宁根(Ehningen)的研发服务上市公司...",
                "我在项目组 CarIT Security Testhouse 工作...",
                "安全变体编码，安全程序刷写以及安全机载通信，是主要的测试项目...",
              ],
              images: ["/images/bertrandt-work.png", "/images/bertrandt-work2.png"]
            },
            {
              titleKey: "mercedesTitle",
              title: "Mercedes-Benz AG (ANÜ von Bertrandt) (2024年4月 - 2025年5月)",
              logo: "/images/mercedes-logo.png",
              link: "https://www.mercedes-benz.com/",
              paragraphs: [
                "梅赛德斯奔驰(Mercedes-Benz)是一家以豪华和高性能著称的德国汽车品牌...",
                "我被外派到位于Sindelfingen的奔驰公司，担任静态调试工程师...",
                "静态调试用到了奔驰的 IS-Tester，生成的测试报告用于进一步错误分析...",
              ],
              images: ["/images/mercedes-work.png", "/images/mercedes-work2.png"]
            }
          ].map((company, index) => (
            <div key={index} className="company mb-10">
              <div className="company-header flex items-center gap-4 mb-4">
                <span className="arrow">▶</span>
                <p data-lang-key={company.titleKey} className="font-semibold">{company.title}</p>
                <a href={company.link} target="_blank" rel="noopener noreferrer">
                  <img src={company.logo} alt="公司 Logo" className="logo w-12 h-auto" />
                </a>
              </div>
              <div className="company-content space-y-3">
                {company.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <div className="image-container flex flex-wrap gap-4 mt-2">
                  {company.images.map((img, i) => (
                    <img key={i} src={img} alt={`${company.title} 工作图 ${i + 1}`} className="work-image w-60" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="mt-16 p-6 border-t text-center text-sm">
        <p data-lang-key="copyright">&copy; 2025 余海川。保留所有权利。</p>
        <p className="mt-2">
          <span data-lang-key="followMe">关注我：</span>
          <a href="https://www.linkedin.com/in/haichuan-yu/" target="_blank" rel="noopener noreferrer">
            <img src="/images/LI-Logo.png" alt="LinkedIn" className="inline-block ml-2" style={{ width: "80px", height: "20px" }} />
          </a>
        </p>
        <div className="mt-2 space-x-2">
          <button onClick={() => changeLanguage("zh")}>中文</button>
          <button onClick={() => changeLanguage("en")}>English</button>
          <button onClick={() => changeLanguage("de")}>Deutsch</button>
        </div>
      </footer>
    </div>
  );
}

function changeLanguage(lang) {
  if (typeof window !== "undefined") {
    localStorage.setItem("preferredLanguage", lang);
    window.location.reload();
  }
}
