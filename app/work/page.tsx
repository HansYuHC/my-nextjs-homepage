"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import useTranslation from "../../lib/useTranslation";

// ---------------- Page ----------------
export default function Page() {
  return (
    <Suspense fallback={<div className="w-full text-center p-10">Loading timeline...</div>}>
      <WorkTimeline />
    </Suspense>
  );
}

// ---------------- WorkTimeline ----------------
function WorkTimeline() {
  const { t, lang } = useTranslation();

  interface WorkPoint {
    yearKey: string;
    companyKey: string;
    detailKey: string;
    link: string;
    positionKey?: string;
    timeKey?: string;
  }

  const points: WorkPoint[] = [
    {
      yearKey: "2011",
      companyKey: "company_Hongyuan",
      positionKey: "company_Hongyuan_position",
      timeKey: "company_Hongyuan_time",
      detailKey: "company_Hongyuan_work",
      link: `/work/company_Hongyuan?lang=${lang}`,
    },
    {
      yearKey: "2012",
      companyKey: "company_Lolin",
      positionKey: "company_Lolin_position",
      timeKey: "company_Lolin_time",
      detailKey: "company_Lolin_work",
      link: `/work/company_Lolin?lang=${lang}`,
    },
    {
      yearKey: "2017",
      companyKey: "company_Schaeffler",
      positionKey: "company_Schaeffler_position",
      timeKey: "company_Schaeffler_time",
      detailKey: "company_Schaeffler_work",
      link: `/work/company_Schaeffler?lang=${lang}`,
    },
    {
      yearKey: "2021",
      companyKey: "company_Stabilus",
      positionKey: "company_Stabilus_position",
      timeKey: "company_Stabilus_time",
      detailKey: "company_Stabilus_work",
      link: `/work/company_Stabilus?lang=${lang}`,
    },
    {
      yearKey: "2022",
      companyKey: "company_Bertrandt",
      positionKey: "company_Bertrandt_position",
      timeKey: "company_Bertrandt_time",
      detailKey: "company_Bertrandt_work",
      link: `/work/company_Bertrandt?lang=${lang}`,
    },
    {
      yearKey: "2024",
      companyKey: "company_Mercedes",
      positionKey: "company_Mercedes_position",
      timeKey: "company_Mercedes_time",
      detailKey: "company_Mercedes_work",
      link: `/work/company_Mercedes?lang=${lang}`,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [bounce, setBounce] = useState(false);
  const swingDuration = 0.5;

  // 自动走动动画
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % points.length);
      setBounce(true);
      setTimeout(() => setBounce(false), 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [points.length]);

  return (
    <div className="w-full flex flex-col items-center p-10">
      {/* 标题 */}
      <div className="w-full text-center mt-8 mb-16 px-6">
          <h1 className="text-3xl font-bold mb-4">{t("work")}</h1>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {t("workDescription")}
          </p>
      </div>

      {/* 时间轴主容器 */}
      <div className="relative w-4/5 flex justify-between items-start mt-20">
        {/* 灰色时间线 */}
        <div className="absolute top-[32px] left-0 right-0 h-1 bg-gray-300 -z-10" />
        <div className="absolute top-[32px] right-[-14px] translate-y-[-50%] w-0 h-0 border-t-[10px] border-b-[10px] border-l-[15px] border-t-transparent border-b-transparent border-l-gray-400" />

        {points.map((point, i) => (
          <div
            key={i}
            className={`relative flex flex-col items-center w-[120px] text-center ${
              lang === "de" || lang === "en" ? "translate-y-[2px]" : ""
            }`}
          >
            {/* 圆点固定高度层 */}
            {/* 时钟emoji层 */}
            <div className="h-12 flex items-center justify-center">
              <motion.div
                className="text-3xl cursor-pointer select-none"
                onClick={() => {
                  setActiveIndex(i);
                  setSelectedPointIndex(i);
                  setShowModal(true);
                }}
                animate={
                  i === activeIndex
                    ? {
                        rotate: [-5, 5, -5], // 左右轻轻晃动
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 1.2,
                  repeat: i === activeIndex ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                {["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛"][i % 12]}
              </motion.div>
            </div>

            {/* 公司名 */}
            <span
              className="mt-3 text-sm text-gray-700 break-words leading-tight min-h-[36px]"
              dangerouslySetInnerHTML={{ __html: t(point.companyKey) }}
            />

            {/* 年份 */}
            <span className="mt-1 text-xs text-gray-500">{t(point.yearKey)}</span>
          </div>
        ))}

        {/* 小人走动动画 */}
        <motion.div
          className="absolute -top-20"
          animate={{
            left: `${(activeIndex / (points.length - 1)) * 96}%`,
            y: bounce ? [-10, 0] : 0,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Stickman swingDuration={swingDuration} />
        </motion.div>
      </div>

      {/* 弹窗部分 */}
      <AnimatePresence>
        {showModal && selectedPointIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-80 shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-1">
                {t(points[selectedPointIndex].companyKey || "")}
              </h2>
              <p className="text-gray-800 mb-1">
                {t(points[selectedPointIndex].positionKey || "")}
              </p>
              <p className="text-gray-500 mb-3">
                {t(points[selectedPointIndex].timeKey || "")}
              </p>
              <p className="text-gray-600">
                {t(points[selectedPointIndex].detailKey || "")}
              </p>

              <Link
                href={points[selectedPointIndex].link}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg inline-block"
              >
                {t("readMore")}
              </Link>

              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------- Stickman ----------------
function Stickman({ swingDuration }: { swingDuration: number }) {
  return (
    <motion.svg
      width="60"
      height="90"
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle cx="40" cy="20" r="12" stroke="black" strokeWidth="3" fill="none" />
        <line x1="40" y1="30" x2="40" y2="60" stroke="black" strokeWidth="3" />
        <motion.line
          x1="40"
          y1="30"
          x2="25"
          y2="45"
          stroke="black"
          strokeWidth="3"
          animate={{ rotate: [20, -20, 20] }}
          transition={{ duration: swingDuration, repeat: Infinity }}
          style={{ transformOrigin: "40px 30px" }}
        />
        <motion.line
          x1="25"
          y1="45"
          x2="20"
          y2="65"
          stroke="black"
          strokeWidth="3"
          animate={{ rotate: [10, -10, 10] }}
          transition={{ duration: swingDuration, repeat: Infinity }}
          style={{ transformOrigin: "25px 45px" }}
        />
        <motion.line
          x1="40"
          y1="30"
          x2="55"
          y2="45"
          stroke="black"
          strokeWidth="3"
          animate={{ rotate: [-20, 20, -20] }}
          transition={{ duration: swingDuration, repeat: Infinity, repeatType: "mirror" }}
          style={{ transformOrigin: "40px 30px" }}
        />
        <motion.line
          x1="55"
          y1="45"
          x2="60"
          y2="65"
          stroke="black"
          strokeWidth="3"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: swingDuration, repeat: Infinity }}
          style={{ transformOrigin: "55px 45px" }}
        />
        <motion.line
          x1="40"
          y1="60"
          x2="30"
          y2="90"
          stroke="black"
          strokeWidth="3"
          animate={{ rotate: [-15, 15, -15] }}
          transition={{ duration: swingDuration, repeat: Infinity }}
          style={{ transformOrigin: "40px 60px" }}
        />
        <motion.line
          x1="30"
          y1="90"
          x2="28"
          y2="115"
          stroke="black"
          strokeWidth="3"
          animate={{ rotate: [10, -10, 10] }}
          transition={{ duration: swingDuration, repeat: Infinity }}
          style={{ transformOrigin: "30px 90px" }}
        />
        <motion.line
          x1="40"
          y1="60"
          x2="50"
          y2="90"
          stroke="black"
          strokeWidth="3"
          animate={{ rotate: [15, -15, 15] }}
          transition={{ duration: swingDuration, repeat: Infinity, repeatType: "mirror" }}
          style={{ transformOrigin: "40px 60px" }}
        />
        <motion.line
          x1="50"
          y1="90"
          x2="52"
          y2="115"
          stroke="black"
          strokeWidth="3"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: swingDuration, repeat: Infinity }}
          style={{ transformOrigin: "50px 90px" }}
        />
      </g>
    </motion.svg>
  );
}
