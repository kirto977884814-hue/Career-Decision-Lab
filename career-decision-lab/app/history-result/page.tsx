'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Calendar, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { TestResult, DIMENSION_NAMES } from '@/types';
import { PATH_DESCRIPTIONS } from '@/data/paths';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

function HistoryResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    try {
      const dataParam = searchParams.get('data');
      if (!dataParam) {
        router.push('/history');
        return;
      }

      const testResult = JSON.parse(decodeURIComponent(dataParam)) as TestResult;
      setResult(testResult);
    } catch (error) {
      console.error('Failed to parse result:', error);
      router.push('/history');
    }
  }, [searchParams, router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">加载中...</p>
        </div>
      </div>
    );
  }

  const primaryPathInfo = PATH_DESCRIPTIONS[result.primaryPath.pathId];
  const evolvablePathInfo = result.evolvablePath ? PATH_DESCRIPTIONS[result.evolvablePath.pathId] : null;

  const radarData = Object.entries(result.dimensionScores).map(([key, value]) => ({
    dimension: DIMENSION_NAMES[key as keyof typeof DIMENSION_NAMES],
    value: value,
    fullMark: 5
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/history"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回历史记录
          </a>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            测试结果详情
          </h1>
          <p className="text-slate-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true, locale: zhCN })}
            <span>•</span>
            {result.userInfo.grade} • {result.userInfo.major}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Radar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              能力结构概览
            </h2>
            <ResponsiveContainer width="100%" aspect={1}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#94a3b8" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#94a3b8' }} />
                <Radar
                  name="能力得分"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Primary Path */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                主要职业路径
              </h2>
            </div>

            <div className="mb-4">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">
                {primaryPathInfo.name}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {primaryPathInfo.description}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">匹配度</span>
                <span className="text-2xl font-bold text-blue-600">
                  {result.primaryPath.matchPercent}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${result.primaryPath.matchPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">为什么适合</p>
                  <p className="text-slate-600">{primaryPathInfo.matchReason}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">需要注意</p>
                  <p className="text-slate-600">{primaryPathInfo.difficultyReminder}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Evolvable Path */}
        {evolvablePathInfo && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-slate-900">
                未来可演化路径
              </h2>
            </div>

            <div className="flex items-start gap-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  {evolvablePathInfo.name}
                </h3>
                <div className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                  潜在匹配度: {result.evolvablePath!.matchPercent}%
                </div>
              </div>

              <div className="flex-1">
                <p className="text-slate-700 leading-relaxed">
                  {primaryPathInfo.currentFitReason}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Plan */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            30天行动清单（前4周）
          </h2>

          <div className="space-y-3">
            {result.actionPlan.map((week) => (
              <div
                key={week.week}
                className="border border-slate-200 rounded-lg overflow-hidden"
              >
                <div className="px-4 py-3 bg-slate-50 flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">
                    {week.week}
                  </div>
                  <span className="font-semibold text-slate-900">
                    第{week.week}周：{week.title}
                  </span>
                </div>

                <div className="p-4">
                  <ul className="space-y-2">
                    {week.tasks.map((task, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-700">
                          {task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            重新测试
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HistoryResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">加载中...</p>
        </div>
      </div>
    }>
      <HistoryResultContent />
    </Suspense>
  );
}
