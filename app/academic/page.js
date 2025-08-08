'use client';

// app/academic/page.js

import { useEffect } from 'react';
import Image from 'next/image';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './page.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);

export default function Academic() {
  useEffect(() => {
    // 这里可以写页面加载时的额外 JS，比如初始化 Swiper，或多语言处理
  }, []);

  return (
    <main className="px-4 max-w-5xl mx-auto my-8">
      <section>
        <h2 className="text-3xl font-bold mb-6" data-lang-key="academic">学术成果</h2>

        {/* 青岛二中 */}
        <AcademicSection titleKey="qingdaoHighSchool" title="山东省青岛第二中学 (2009年9月 - 2012年6月)">
          <Timeline>
            <TimelineEvent date="2009-09" titleKey="september2009" textKey="qingdaoEntrance" imgSrc="/images/qdez-entrance.png" imgAlt="中考入学" />
            <TimelineEvent date="2010-09" titleKey="september2010" textKey="scienceChoice" imgSrc="/images/qdez-science.png" imgAlt="文理分科" />
            <TimelineEvent date="2011-06" titleKey="june2011" textKey="highSchoolIntern" imgSrc="/images/qdez-internship.png" imgAlt="金工实习" />
            <TimelineEvent date="2011-10" titleKey="october2011" textKey="highSchoolSport" imgSrc="/images/qdez-sports.png" imgAlt="运动会" />
            <TimelineEvent date="2012-06" titleKey="june2012" textKey="GaoKaoInUni" imgSrc="/images/qdez-graduation.png" imgAlt="高考" />
          </Timeline>
        </AcademicSection>

        <hr className="my-12 border-gray-300" />

        {/* 华南理工大学 */}
        <AcademicSection titleKey="scutTitle" title="华南理工大学 (2012年8月 - 2013年6月)">
          <Timeline>
            <TimelineEvent date="2012-08" titleKey="august2012" textKey="scutEntrance" imgSrc="/images/scut-entrance.png" imgAlt="入学" />
            <TimelineEvent date="2012-10" titleKey="october2012" textKey="scutGermanClass" imgSrc="/images/scut-german.png" imgAlt="学习德语" />
            <TimelineEvent date="2013-02" titleKey="february2013" textKey="scutExam" imgSrc="/images/scut-exam.png" imgAlt="期末考试" />
            <TimelineEvent date="2013-06" titleKey="june2013" textKey="scutTestAS" imgSrc="/images/scut-prepare.png" imgAlt="留学准备" />
          </Timeline>
        </AcademicSection>

        <hr className="my-12 border-gray-300" />

        {/* 卡尔斯鲁厄理工学院 */}
        <AcademicSection titleKey="kitTitle" title="卡尔斯鲁厄理工学院 (2013年9月 - 2023年6月)">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="my-6"
            spaceBetween={30}
            slidesPerView={1}
          >
            <SwiperSlide>
              <SlideContent titleKey="september2013" textKey="kitLanguageClass" imgSrc="/images/kit-studiekolleg.png" imgAlt="语言班" />
            </SwiperSlide>
            <SwiperSlide>
              <SlideContent titleKey="february2014" textKey="kitDSH2" imgSrc="/images/kit-immatrikulieren.png" imgAlt="DSH考试" />
            </SwiperSlide>
            <SwiperSlide>
              <SlideContent titleKey="september2014" textKey="kitBachelorStart" imgSrc="/images/kit-maschinenbau.png" imgAlt="本科入学" />
            </SwiperSlide>
            <SwiperSlide>
              <SlideContent titleKey="june2016" textKey="kitVacuumCar" imgSrc="/images/kit-kehrmaschine.png" imgAlt="吸尘车" />
            </SwiperSlide>
            <SwiperSlide>
              <SlideContent titleKey="aprilToOctober2017" textKey="kitSchaefflerInternship" imgSrc="/images/kit-praktikum.png" imgAlt="义务实习" />
            </SwiperSlide>
            <SwiperSlide>
              <SlideContent titleKey="aprilToSeptember2018" textKey="kitBachelorThesis" imgSrc="/images/kit-bachelorarbeit.png" imgAlt="本科论文" />
            </SwiperSlide>
            <SwiperSlide>
              <SlideContent titleKey="april2019ToFebruary2021" textKey="kitMasterThesis" imgSrc="/images/kit-masterarbeit.png" imgAlt="中考入学" />
            </SwiperSlide>
            <SwiperSlide>
              <SlideContent titleKey="november2021ToJune2022" textKey="kitStabilusInternship" imgSrc="/images/kit-stabiluspraktikum.png" imgAlt="中考入学" />
            </SwiperSlide>
            <SwiperSlide>
              <SlideContent titleKey="june2022" textKey="kitGraduation" imgSrc="/images/kit-abschluss.png" imgAlt="中考入学" />
            </SwiperSlide>
          </Swiper>
        </AcademicSection>

        {/* 本科毕业论文 */}
        <AcademicSection titleKey="BachelorArbeit" title="本科毕业论文 (2018年4月 - 2018年9月)">
          <p data-lang-key="BA_1" className="mb-2">
            我的本科毕业论文是在卡尔斯鲁厄理工学院的生产工程研究所(wbk, Institut für Produktionstechnik)完成的，题目是《研究数字孪生在预测进给轴的螺杆传动零件使用寿命方面的应用》。
          </p>
          <p data-lang-key="BA_2" className="mb-2">
            为了能够建立预测轴向进给轴(论文中研究的零件为滚珠丝杠)的剩余使用寿命的模型，首先推导出了必须的数学模型，并在MATLAB建模。下图左侧为一个在3D打印机中运用的滚珠丝杠的实际案例。由此可以建立模型并使之成为进给轴数字孪生模型的一部分。(见下图右侧图例)
          </p>
          <p data-lang-key="BA_3" className="mb-4">
            建立起的模型可以实时预测进给轴的剩余使用寿命，简化了零件使用寿命监测的复杂性，并使数据随时可用，并且在后续研究中，只要搭建接口并提供正确算法，连接物联网 (IoT)，即可生成一个完整的数字孪生模型，运用到实际生产中。
          </p>
          <div className="flex gap-4">
            <Image src="/images/kit-bachelorarbeit1.png" alt="本科毕业论文" width={200} height={150} />
            <Image src="/images/kit-bachelorarbeit2.png" alt="本科毕业论文" width={300} height={150} />
          </div>
        </AcademicSection>

        {/* 研究生毕业论文 */}
        <AcademicSection titleKey="MasterArbeit" title="研究生毕业论文 (2020年9月 - 2021年7月)">
          <p data-lang-key="MA_1" className="mb-2">
            我的研究生毕业论文是在卡尔斯鲁厄理工学院的工程力学研究所动力学部门完成的，题目是《高频激励抑制摩擦振动的参数研究》。
          </p>
          <p data-lang-key="MA_2" className="mb-2">
            论文介绍了单自由度系统和双自由度系统的特性，以及通过参数研究并参照单自由度系统，来解决双自由度系统振动抑制的问题。目前有很多对于单自由度系统由干性摩擦引起的振动的研究，但是双自由度系统的研究却有不足。论文主要尝试利用高频激励来研究其对于双自由度系统振动抑制的效果，同时也探究了高频激励对于系统的稳定性的影响。
          </p>
          <p data-lang-key="MA_3">
            论文利用高等数学及线性代数方法，分析了有不同的质量，阻尼以及频率等参数的高频外部激励对于双自由度系统减振效果的影响，并且得出结论: 采用高频激励可以有效抑制两自由度系统的摩擦诱发振动，可以使用不同激励状态下的慢运动平均方程的稳定性图来评估系统的稳定性行为。为了探讨近似方法的有效性，找到了外部激励频率和相应特征值之间的可能关系。
          </p>
          <div className="flex gap-4 mt-4">
            <Image src="/images/kit-masterarbeit1.png" alt="研究生毕业论文" width={300} height={200} />
            <Image src="/images/kit-masterarbeit2.png" alt="研究生毕业论文" width={300} height={200} />
          </div>
        </AcademicSection>
      </section>
    </main>
  );
}

function AcademicSection({ title, titleKey, children }) {
  return (
    <div className="mb-12 academic-section">
      <h3 className="text-xl font-semibold mb-4" data-lang-key={titleKey}>{title}</h3>
      {children}
    </div>
  );
}

function Timeline({ children }) {
  return (
    <div className="timeline-container border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      {/* 你可以根据需要增加时间轴线条和点的样式 */}
      <div className="timeline-content space-y-6">{children}</div>
    </div>
  );
}

function TimelineEvent({ date, titleKey, textKey, imgSrc, imgAlt }) {
  return (
    <div className="timeline-event flex flex-col md:flex-row items-center gap-4" data-date={date}>
      <div className="flex-1">
        <h4 className="text-lg font-semibold" data-lang-key={titleKey}>{titleKey && titleKey}</h4>
        <p data-lang-key={textKey}>{textKey && textKey}</p>
      </div>
      <div className="w-48 flex-shrink-0">
        <Image src={imgSrc} alt={imgAlt} width={192} height={108} className="rounded" />
      </div>
    </div>
  );
}

function SlideContent({ titleKey, textKey, imgSrc, imgAlt }) {
  return (
    <div className="slide-content p-4">
      <h4 className="text-lg font-semibold mb-2" data-lang-key={titleKey}>{titleKey && titleKey}</h4>
      <p data-lang-key={textKey}>{textKey && textKey}</p>
      <div className="mt-2">
        <Image src={imgSrc} alt={imgAlt} width={320} height={180} className="rounded" />
      </div>
    </div>
  );
}
