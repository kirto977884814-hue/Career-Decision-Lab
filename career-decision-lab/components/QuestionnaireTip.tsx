/**
 * 温馨提示组件
 *
 * 用于在问卷开始前向用户展示填写指导
 * 支持简化版和完整版两种模式
 */

'use client';

import { Lightbulb, CheckCircle2, X } from 'lucide-react';

interface QuestionnaireTipProps {
  /**
   * 变体类型
   * - simple: 简化版，仅显示最关键的2-3条建议
   * - full: 完整版，显示所有建议
   */
  variant?: 'simple' | 'full';

  /**
   * 关闭回调函数
   * 如果提供，会显示关闭按钮
   */
  onDismiss?: () => void;

  /**
   * 是否显示动画
   */
  animated?: boolean;
}

export default function QuestionnaireTip({
  variant = 'full',
  onDismiss,
  animated = true
}: QuestionnaireTipProps) {
  // 简化版提示内容（用于主页）
  const simpleTips = [
    '根据真实情况回答，而非"应该怎样"',
    '不确定时选择第一反应'
  ];

  // 完整版提示内容（用于问卷页）
  const fullTips = [
    '根据真实情况回答，而非"应该怎样"',
    '你的答案越真实，我们的建议越精准',
    '不确定时选择第一反应',
    '建议在安静的环境下填写'
  ];

  const tips = variant === 'simple' ? simpleTips : fullTips;

  return (
    <div
      className={`${
        animated ? 'animate-slide-down' : ''
      } bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-900/20 dark:to-amber-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-6 relative`}
    >
      {/* 关闭按钮 */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
          aria-label="关闭提示"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* 标题 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            💡 小贴士
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {variant === 'simple'
              ? '保证结果准确的关键'
              : '这份问卷会根据你的真实情况，为你生成个性化的职业建议'}
          </p>
        </div>
      </div>

      {/* 完整版的开场白 */}
      {variant === 'full' && (
        <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          为了保证结果准确，请：
        </p>
      )}

      {/* 提示列表 */}
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{tip}</span>
          </li>
        ))}
      </ul>

      {/* 完整版的额外说明 */}
      {variant === 'full' && (
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            🕒 预计用时：8-12分钟 | 共47题 | 建议一次性完成
          </p>
        </div>
      )}
    </div>
  );
}
