import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Target,
  ClipboardCheck,
  Sparkles,
  Brain,
  TrendingUp,
  Lightbulb
} from 'lucide-react';
import QuestionnaireTip from '@/components/QuestionnaireTip';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            职业灯塔 v5.0
          </h1>
          <p className="text-2xl text-slate-700 dark:text-slate-200 font-medium">
            Career Lighthouse
          </p>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            通过<span className="font-semibold text-blue-600 dark:text-blue-400">科学算法</span>与<span className="font-semibold text-indigo-600 dark:text-indigo-400">AI智能</span>，
            <br />
            发现最适合你的职业方向，获得个性化行动建议
          </p>
        </div>

        {/* V5.0 New Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl shadow-sm border border-blue-200 dark:border-blue-700">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
              🧠 AI智能分析
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              智谱AI驱动，生成个性化总结、建议和反思引导
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl shadow-sm border border-purple-200 dark:border-purple-700">
            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
              📈 意愿优先算法
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              现实30%+意愿70%加权，发现被环境压抑的潜力
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl shadow-sm border border-green-200 dark:border-green-700">
            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <ClipboardCheck className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
              📋 深度问卷
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              47题5section设计，现实vs意愿对比，场景化评估
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 p-6 rounded-xl shadow-sm border border-amber-200 dark:border-amber-700">
            <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
              💡 5层输出
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              AI分析+匹配结果+能力结构+行动计划+反思引导
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-12">
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            测试流程
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                1
              </div>
              <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">填写基础信息</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">年级、专业、当前困惑</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                2
              </div>
              <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">核心动机探索</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">4题，深度驱动因素</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                3
              </div>
              <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">能力结构评估</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">30题，现实vs意愿对比</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                4
              </div>
              <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">深度情境测试</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">5题，观察真实决策</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                5
              </div>
              <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">获得个性化建议</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">AI生成专属报告</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <Link
            href="/questionnaire-v5"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-xl"
          >
            <Sparkles className="w-6 h-6" />
            开始 v5.0 测试
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            预计用时 8-12 分钟 • 共47题 • 5个Section
          </p>

          {/* 温馨提示 */}
          <div className="max-w-2xl mx-auto">
            <QuestionnaireTip variant="simple" animated={false} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/history"
              className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium px-6 py-3 rounded-xl transition-colors border-2 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <BarChart3 className="w-5 h-5" />
              查看过往测试结果
            </Link>
            <Link
              href="/questionnaire"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium px-6 py-3 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              使用旧版测试
              <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">v4.0</span>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl">
          <h3 className="font-bold text-xl text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            v5.0 核心特性
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div className="space-y-2">
              <p className="font-semibold">🎯 科学算法</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>现实30% + 意愿70%加权评分</li>
                <li>发现被环境压抑的真实潜力</li>
                <li>一票否决机制，避免不适合的路径</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">🤖 AI智能生成</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>个性化总结：解答你的困惑</li>
                <li>行动建议：3-5条具体可行建议</li>
                <li>反思引导：启发自我认知</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">📊 真实数据</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>8条基于统计数据的职业路径</li>
                <li>涵盖学术、稳定、技术等方向</li>
                <li>匹配真实就业市场分布</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">🔒 隐私保护</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>所有数据仅保存在本地浏览器</li>
                <li>不上传到任何服务器</li>
                <li>API调用仅用于内容生成</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
