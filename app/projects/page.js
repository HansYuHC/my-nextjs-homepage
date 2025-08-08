// app/projects/page.js
"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import './page.css';

export default function ProjectsPage() {
  useEffect(() => {
    // 如果旧页面有多语言或动画初始化，可以在这里放置初始化逻辑
    console.log("Projects page mounted");
  }, []);

  return (
    <main className="projects-page" style={{ padding: "20px" }}>
      <h1 data-lang-key="projectsTitle">Projects</h1>

      {/* 第一个项目 */}
      <section className="project-block">
        <h2 data-lang-key="project1Title">Qingdao Lolin Mech Inc.</h2>
        <p data-lang-key="project1Desc">
          OEM supplier for forging and casting since 1990, serving construction
          machinery, agricultural machinery, railway system and heavy duty
          trucking system.
        </p>
        <div className="project-images">
          <Image
            src="/images/lolin-1.jpg"
            alt="Lolin project image 1"
            width={400}
            height={300}
          />
          <Image
            src="/images/lolin-2.jpg"
            alt="Lolin project image 2"
            width={400}
            height={300}
          />
        </div>
      </section>

      {/* 第二个项目 */}
      <section className="project-block">
        <h2 data-lang-key="project2Title">Bertrandt AG</h2>
        <p data-lang-key="project2Desc">
          Engineering services provider for the automotive and other industries
          with a focus on development solutions for mechanical, electrical, and
          software systems.
        </p>
        <div className="project-images">
          <Image
            src="/images/bertrandt-1.jpg"
            alt="Bertrandt project image 1"
            width={400}
            height={300}
          />
        </div>
      </section>

      {/* 第三个项目 */}
      <section className="project-block">
        <h2 data-lang-key="project3Title">Eckerle Group</h2>
        <p data-lang-key="project3Desc">
          Manufacturer specializing in brush systems and automation solutions,
          serving various industrial applications worldwide.
        </p>
        <div className="project-images">
          <Image
            src="/images/eckerle-1.jpg"
            alt="Eckerle project image 1"
            width={400}
            height={300}
          />
        </div>
      </section>

      {/* 第四个项目 */}
      <section className="project-block">
        <h2 data-lang-key="project4Title">Other Collaborations</h2>
        <p data-lang-key="project4Desc">
          Various joint projects with partners in Germany, Europe, and Asia,
          focusing on industrial machinery and automotive engineering.
        </p>
        <div className="project-images">
          <Image
            src="/images/other-1.jpg"
            alt="Other project image 1"
            width={400}
            height={300}
          />
        </div>
      </section>

      <style jsx>{`
        .project-block {
          margin-bottom: 40px;
        }
        .project-images {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
      `}</style>
    </main>
  );
}
