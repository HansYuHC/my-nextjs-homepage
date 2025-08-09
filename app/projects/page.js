import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title data-lang-key="projectsTitle">个人项目 - 余海川的个人网站</title>
      </Head>



        <main className="flex-grow px-4 py-8 max-w-5xl mx-auto">
          <section>
            <h2 data-lang-key="cadProjects" className="text-2xl font-semibold mb-4">
              CAD 项目
            </h2>
            <ul className="space-y-8">
              <li>
                <h3 data-lang-key="projectCAD1" className="text-xl font-semibold mb-2">
                  项目 1：大学机械设计理论课程项目
                </h3>
                <p data-lang-key="projectCAD1Description_1" className="mb-2">
                  我一个由五名学生组成的团队中，创建了一个自上而下的 CAD 模型，并在产品数据管理系统 (PDM 系统) 中进行管理。
                  给定设计任务的处理是机械设计理论课程中融入的 CAD 和 PDM 培训概念的一部分。
                  任务所需的知识是通过E-Learning学习自学获得的，并通过Creo PTC软件应用得到巩固。
                  在座谈会上对结果进行答辩，以确保实现学习目标。
                </p>
                <p data-lang-key="projectCAD1Description_2" className="mb-4">
                  在该项目中我都达到了包括但不限于如下的要求：
                  解释产品数据管理系统的任务和可能性；
                  创建进阶的CAD模型元素：拉动特征、拉伸混合特征、壳特征和基准曲线；
                  在模型中创建参数和关系等等。
                </p>
                <div className="flex flex-wrap gap-5 mb-8">
                  <img
                    src="/images/cad-project1_1.png"
                    alt="CAD 项目 1-1"
                    className="max-w-[300px] rounded-lg"
                    loading="lazy"
                  />
                  <img
                    src="/images/cad-project1_2.png"
                    alt="CAD 项目 1-2"
                    className="max-w-[600px] rounded-lg"
                    loading="lazy"
                  />
                </div>
              </li>
            </ul>
          </section>
        </main>

        <Footer />

    </>
  );
}
