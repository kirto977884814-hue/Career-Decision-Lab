/**
 * 个性化摘要卡片组件
 * 在结果页面顶部显示个性化建议
 */

import { UserInfo, DimensionScores } from '@/types';
import { generatePersonalizedSummary, generateConfusionBasedAdvice } from '@/lib/personalize';
import { AlertCircle, Lightbulb, Target } from 'lucide-react';

interface PersonalizedSummaryCardProps {
  userInfo: UserInfo;
  dimensionScores: DimensionScores;
  recommendedPath: string;
}

export function PersonalizedSummaryCard({
  userInfo,
  dimensionScores,
  recommendedPath
}: PersonalizedSummaryCardProps) {
  const { grade, major, planPostgraduate, currentConfusion } = userInfo;

  // 生成个性化摘要
  const summary = generatePersonalizedSummary(userInfo);

  // 生成困惑建议
  const confusionAdvice = currentConfusion
    ? generateConfusionBasedAdvice(currentConfusion, dimensionScores, recommendedPath as any)
    : null;

  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
      {/* 用户基本信息 */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            你好，{grade}同学
          </h2>
        </div>
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-2">
          你是 <span className="font-semibold text-blue-700 dark:text-blue-300">{grade}</span> • <span className="font-semibold text-blue-700 dark:text-blue-300">{major}</span> 的学生
        </p>
      </div>

      {/* 智能建议 */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4 border border-blue-100 dark:border-blue-900">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">个性化建议</p>
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
              {summary}
            </p>
          </div>
        </div>
      </div>

      {/* 困惑针对性建议 */}
      {confusionAdvice && currentConfusion && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-900">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                针对你的困惑
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 italic">
                "{currentConfusion}"
              </p>

              {/* 详细建议 */}
              <div className="space-y-2">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">分析：</span>{confusionAdvice.summary}
                </p>
                <div className="mt-3">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                    具体建议：
                  </p>
                  <ul className="space-y-1">
                    {confusionAdvice.detailedSuggestions.slice(0, 2).map((suggestion, idx) => (
                      <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-0.5">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
