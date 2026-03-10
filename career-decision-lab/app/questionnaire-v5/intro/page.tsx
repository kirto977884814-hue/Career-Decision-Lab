'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Clock, FileCheck, Shield, CheckCircle2 } from 'lucide-react';
import LighthouseIcon from '@/components/LighthouseIcon';

export default function QuestionnaireIntroPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/questionnaire-v5');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* 顶部返回按钮 */}
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          返回首页
        </button>

        {/* 主内容卡片 */}
        <div className="bg-slate-800/50 backdrop-blur border-2 border-amber-500/30 rounded-2xl p-8 md:p-12">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <LighthouseIcon className="w-20 h-20 text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              欢迎来到职业灯塔
            </h1>
            <p className="text-xl text-blue-200">
              为你的职业规划点亮方向
            </p>
          </div>

          {/* 小贴士区域 */}
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-amber-300 mb-2">
                  小贴士
                </h2>
                <p className="text-blue-100 leading-relaxed">
                  这份问卷会根据你的真实情况，为你生成个性化的职业建议
                </p>
              </div>
            </div>
          </div>

          {/* 注意事项 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              为了保证结果准确，请：
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-blue-100">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>根据真实情况回答，而非"应该怎样"</span>
              </li>
              <li className="flex items-start gap-3 text-blue-100">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>你的答案越真实，我们的建议越精准</span>
              </li>
              <li className="flex items-start gap-3 text-blue-100">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>不确定时选择第一反应</span>
              </li>
              <li className="flex items-start gap-3 text-blue-100">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>建议在安静的环境下填写</span>
              </li>
            </ul>
          </div>

          {/* 问卷信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900/50 border border-blue-500/20 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-blue-200 mb-1">预计用时</p>
              <p className="text-xl font-semibold text-white">8-12分钟</p>
            </div>
            <div className="bg-slate-900/50 border border-blue-500/20 rounded-lg p-4 text-center">
              <FileCheck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-blue-200 mb-1">题目总数</p>
              <p className="text-xl font-semibold text-white">47题</p>
            </div>
            <div className="bg-slate-900/50 border border-blue-500/20 rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-blue-200 mb-1">建议</p>
              <p className="text-xl font-semibold text-white">一次性完成</p>
            </div>
          </div>

          {/* 开始按钮 */}
          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xl font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            开始填写问卷
            <ArrowRight className="inline-block w-5 h-5 ml-2" />
          </button>

          {/* 隐私说明 */}
          <p className="text-center text-sm text-blue-300/70 mt-4">
            🔒 你的所有答案将被严格保密，仅用于生成个性化建议
          </p>
        </div>
      </div>
    </div>
  );
}
