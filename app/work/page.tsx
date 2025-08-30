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
  const { t } = useTranslation();

  // 多语言工作经历数据
  const points = [
    { yearKey: "2016", companyKey: "companyA", detailKey: "work2016", link: "/work/companyA" },
    { yearKey: "2019", companyKey: "companyB", detailKey: "work2019", link: "/work/companyB" },
    { yearKey: "2022", companyKey: "companyC", detailKey: "work2022", link: "/work/companyC" },
    { yearKey: "2024", companyKey: "companyD", detailKey: "work2024", link: "/work/companyD" }
  ];

  const [activeIndex, setActiveIndex] = useState(0); // 小人位置
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null); // 弹窗内容固定
  const [showModal, setShowModal] = useState(false);
  const [bounce, setBounce] = useState(false);

  const swingDuration = 0.5;

  // 小人自动循环
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
      {/* 标题与介绍 */}
      <div className="mb-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{t("work")}</h1>
        <p className="text-gray-600 max-w-2xl">{t("workDescription")}</p>
      </div>

      {/* 时间轴容器 */}
      <div className="relative w-4/5 flex justify-between items-center mt-20">
        {/* 灰色时间轴 */}
        <div className="absolute top-[12px] left-0 right-0 h-1 bg-gray-300 -z-10" />
        {/* 箭头 */}
        <div className="absolute top-[12px] right-0 translate-y-[-50%] w-0 h-0 border-t-[10px] border-b-[10px] border-l-[15px] border-t-transparent border-b-transparent border-l-gray-400" />

        {points.map((point, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <motion.div
              className={`w-6 h-6 rounded-full cursor-pointer ${
                i === activeIndex ? "bg-blue-500" : "bg-gray-400"
              }`}
              onClick={() => {
                setActiveIndex(i); // 小人移动
                setSelectedPointIndex(i); // 弹窗内容固定
                setShowModal(true); // 打开弹窗
              }}
              animate={i === activeIndex ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.6 }}
            />
            <span className="mt-6 text-sm text-gray-700">{t(point.companyKey)}</span>
            <span className="mt-1 text-xs text-gray-500">{t(point.yearKey)}</span>
          </div>
        ))}

        {/* 小人走路 */}
        <motion.div
          className="absolute -top-20"
          animate={{
            left: `${(activeIndex / (points.length - 1)) * 96}%`,
            y: bounce ? [-10, 0] : 0
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Stickman swingDuration={swingDuration} />
        </motion.div>
      </div>

      {/* 弹窗 */}
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
              <h2 className="text-xl font-bold mb-2">
                {t(points[selectedPointIndex].companyKey)} ({t(points[selectedPointIndex].yearKey)})
              </h2>
              <p className="text-gray-600">{t(points[selectedPointIndex].detailKey)}</p>

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
    <motion.svg width="60" height="90" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
