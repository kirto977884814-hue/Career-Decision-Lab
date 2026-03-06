/**
 * v5.0 问卷页面 - 支持47题的5个section结构
 *
 * 结构：
 * 1. 基础信息调查（6题）
 * 2. 核心动机探索（4题）
 * 3. 六维度能力评估（30题）
 * 4. 深度情境分析（5题）
 * 5. 自我反思（2题）
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Target,
  CheckCircle2,
  Brain,
  Sparkles,
  Lightbulb,
  ChevronRight
} from 'lucide-react';
import { LighthouseIconSmall } from '@/components/LighthouseIcon';
import QuestionnaireTip from '@/components/QuestionnaireTip';
import {
  BASIC_INFO_QUESTIONS,
  MOTIVATION_QUESTIONS,
  DIMENSION_QUESTIONS,
  SCENARIO_QUESTIONS,
  REFLECTION_QUESTIONS,
  LIKERT_OPTIONS,
  QUESTIONNAIRE_META
} from '@/data/questionsV5';
import { loadProgress, saveProgress, clearProgress } from '@/lib/storage';
import { TestProgress, UserInfo, RawScores, ScenarioAnswer } from '@/types';

type QuestionnaireSection = 'basic' | 'motivation' | 'dimensions' | 'scenarios' | 'reflection';
type SectionStatus = 'pending' | 'active' | 'completed';

export default function QuestionnaireV5Page() {
  const router = useRouter();

  // 状态管理
  const [currentSection, setCurrentSection] = useState<QuestionnaireSection>('basic');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [basicInfo, setBasicInfo] = useState<Partial<UserInfo>>({});
  const [motivationAnswers, setMotivationAnswers] = useState<Record<string, string | string[]>>({});
  const [dimensionAnswers, setDimensionAnswers] = useState<Record<string, { reality: number; ideal: number }>>({});
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, string>>({});
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});
  const [tipDismissed, setTipDismissed] = useState(false);

  // 加载进度和提示状态
  useEffect(() => {
    const progress = loadProgress() as TestProgress & {
      basicInfo?: Partial<UserInfo>;
      dimensionAnswers?: Record<string, { reality: number; ideal: number }>;
      scenarioAnswers?: Record<string, string>;
      reflectionAnswers?: Record<string, string>;
    };

    // 检查是否已关闭过提示
    const tipClosed = localStorage.getItem('questionnaire-tip-closed');
    if (tipClosed === 'true') {
      setTipDismissed(true);
    }

    if (progress) {
      if (progress.basicInfo) {
        setBasicInfo(progress.basicInfo);
        // 如果有基础信息，从动机section开始
        setCurrentSection('motivation');
      }
      // 可以加载更多进度...
    }
  }, []);

  // Section配置
  const sections: { id: QuestionnaireSection; title: string; icon: React.ReactNode; questionCount: number }[] = [
    {
      id: 'basic',
      title: '基础信息',
      icon: <Target className="w-5 h-5" />,
      questionCount: BASIC_INFO_QUESTIONS.length
    },
    {
      id: 'motivation',
      title: '核心动机',
      icon: <Brain className="w-5 h-5" />,
      questionCount: MOTIVATION_QUESTIONS.length
    },
    {
      id: 'dimensions',
      title: '能力评估',
      icon: <Sparkles className="w-5 h-5" />,
      questionCount: DIMENSION_QUESTIONS.length / 2 // 每个维度2题（现实+意愿）
    },
    {
      id: 'scenarios',
      title: '情境分析',
      icon: <Lightbulb className="w-5 h-5" />,
      questionCount: SCENARIO_QUESTIONS.length
    },
    {
      id: 'reflection',
      title: '自我反思',
      icon: <CheckCircle2 className="w-5 h-5" />,
      questionCount: REFLECTION_QUESTIONS.length
    }
  ];

  // 获取当前section的状态
  const getSectionStatus = (sectionId: QuestionnaireSection): SectionStatus => {
    if (sectionId === currentSection) return 'active';
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    const activeIndex = sections.findIndex(s => s.id === currentSection);
    return currentIndex < activeIndex ? 'completed' : 'pending';
  };

  // 保存进度
  const saveCurrentProgress = () => {
    saveProgress({
      currentSection,
      currentQuestion: currentQuestionIndex,
      answers: {},
      basicInfo,
      userInfo: basicInfo as UserInfo
    } as any);
  };

  // 关闭温馨提示
  const handleDismissTip = () => {
    setTipDismissed(true);
    localStorage.setItem('questionnaire-tip-closed', 'true');
  };

  // 提交问卷
  const handleSubmit = () => {
    clearProgress();

    // 构建RawScores
    const rawScores: RawScores = {
      S_real: 0, S_ideal: 0,
      A_real: 0, A_ideal: 0,
      R_real: 0, R_ideal: 0,
      E_real: 0, E_ideal: 0,
      X_real: 0, X_ideal: 0,
      C_real: 0, C_ideal: 0
    };

    // 计算每个维度的现实和意愿得分
    Object.entries(dimensionAnswers).forEach(([questionId, scores]) => {
      const dimension = questionId.charAt(0) as keyof RawScores;
      const type = questionId.includes('_real_') ? 'real' : 'ideal';

      if (type === 'real') {
        const key = `${dimension}_real` as keyof RawScores;
        rawScores[key] = (rawScores[key] || 0) + scores.reality;
      } else {
        const key = `${dimension}_ideal` as keyof RawScores;
        rawScores[key] = (rawScores[key] || 0) + scores.ideal;
      }
    });

    // 平均每个维度的得分（每个维度5题）
    (['S', 'A', 'R', 'E', 'X', 'C'] as const).forEach(dim => {
      rawScores[`${dim}_real` as keyof RawScores] /= 5;
      rawScores[`${dim}_ideal` as keyof RawScores] /= 5;
    });

    // 构建scenario answers数组
    const scenarioAnswersArray: ScenarioAnswer[] = Object.entries(scenarioAnswers).map(
      ([scenarioId, choice]) => ({
        scenarioId,
        choice
      })
    );

    // 导航到结果页面
    router.push(`/results-v5?data=${encodeURIComponent(JSON.stringify({
      userInfo: basicInfo,
      rawScores,
      scenarioAnswers: scenarioAnswersArray
    }))}`);
  };

  // 渲染基础信息section
  const renderBasicInfo = () => {
    const question = BASIC_INFO_QUESTIONS[currentQuestionIndex];

    return (
      <div className="bg-slate-800/50 backdrop-blur border-2 border-amber-500/30 p-8 rounded-xl">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-amber-100/10 dark:bg-amber-900/30 text-amber-300 text-sm font-medium rounded-full mb-4">
            {currentQuestionIndex + 1} / {BASIC_INFO_QUESTIONS.length}
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
            {question.text}
          </h2>
          {!question.required && (
            <p className="text-sm text-blue-200 mt-2">（选填）</p>
          )}
        </div>

        {/* 选项 */}
        {question.options && question.options.length > 0 ? (
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  const newInfo = { ...basicInfo, [question.type]: option.value };
                  setBasicInfo(newInfo);
                  saveCurrentProgress();

                  // 自动跳转下一题
                  setTimeout(() => {
                    if (currentQuestionIndex < BASIC_INFO_QUESTIONS.length - 1) {
                      setCurrentQuestionIndex(currentQuestionIndex + 1);
                    } else {
                      setCurrentSection('motivation');
                      setCurrentQuestionIndex(0);
                    }
                  }, 300);
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  (basicInfo as any)[question.type] === option.value
                    ? 'border-amber-500 bg-amber-900/20'
                    : 'border-slate-600 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                  <span className="font-medium text-white">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <input
              type="text"
              className="w-full p-4 border-2 border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none bg-slate-900/50 text-white placeholder-blue-300/50"
              placeholder={question.type === 'major' ? '请输入你的专业名称' : question.text}
              value={(basicInfo as any)[question.type] || ''}
              onChange={(e) => {
                setBasicInfo({ ...basicInfo, [question.type]: e.target.value });
              }}
              onBlur={saveCurrentProgress}
            />
            {question.type === 'major' && (
              <p className="text-sm text-blue-300/70 mt-2">
                💡 例如：计算机科学、工商管理、化学工程等
              </p>
            )}
          </div>
        )}

        {/* 下一步按钮 */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              if (currentQuestionIndex < BASIC_INFO_QUESTIONS.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                setCurrentSection('motivation');
                setCurrentQuestionIndex(0);
              }
            }}
            disabled={question.required && !(basicInfo as any)[question.type]}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed font-medium"
          >
            下一步
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // 渲染核心动机section
  const renderMotivation = () => {
    const question = MOTIVATION_QUESTIONS[currentQuestionIndex];

    return (
      <div className="bg-slate-800/50 backdrop-blur border-2 border-amber-500/30 p-8 rounded-xl">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-amber-100/10 dark:bg-amber-900/30 text-amber-300 text-sm font-medium rounded-full mb-4">
            {currentQuestionIndex + 1} / {MOTIVATION_QUESTIONS.length}
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
            {question.text}
          </h2>
          {question.required && (
            <p className="text-sm text-blue-200 mt-2">*必填</p>
          )}
        </div>

        {/* 选项 */}
        {question.options && (
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  let newValue: string | string[];
                  if (question.type === 'coreValues') {
                    // 核心价值观多选排序
                    const current = (motivationAnswers[question.id] || []) as string[];
                    if (current.includes(option.value)) {
                      newValue = current.filter(v => v !== option.value);
                    } else if (current.length < 3) {
                      newValue = [...current, option.value];
                    } else {
                      return; // 最多选3个
                    }
                  } else {
                    newValue = option.value;
                  }
                  setMotivationAnswers({ ...motivationAnswers, [question.id]: newValue });
                  saveCurrentProgress();
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  Array.isArray(motivationAnswers[question.id])
                    ? (motivationAnswers[question.id] as string[]).includes(option.value)
                      ? 'border-amber-500 bg-amber-900/20'
                      : 'border-slate-600'
                    : motivationAnswers[question.id] === option.value
                    ? 'border-amber-500 bg-amber-900/20'
                    : 'border-slate-600'
                } hover:border-amber-400`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-medium text-white">{option.label}</span>
                  {option.description && (
                    <p className="text-sm text-blue-200 mt-1">{option.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 下一步按钮 */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              if (currentQuestionIndex < MOTIVATION_QUESTIONS.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                setCurrentSection('dimensions');
                setCurrentQuestionIndex(0);
              }
            }}
            disabled={question.required && !motivationAnswers[question.id]}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed font-medium"
          >
            下一步
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // 渲染维度评估section
  const renderDimensions = () => {
    // 每次显示一个维度的一对题（现实+意愿）
    const dimensions: Array<{ key: string; name: string }> = [
      { key: 'S', name: '结构化能力' },
      { key: 'A', name: '抽象逻辑能力' },
      { key: 'R', name: '风险承受度' },
      { key: 'E', name: '表达倾向' },
      { key: 'X', name: '执行抗压能力' },
      { key: 'C', name: '共情能力' }
    ];

    const dimensionIndex = Math.floor(currentQuestionIndex / 2);
    const currentDimension = dimensions[dimensionIndex];
    const isRealityQuestion = currentQuestionIndex % 2 === 0;

    // 安全检查：确保 currentDimension 存在
    if (!currentDimension) {
      return (
        <div className="bg-slate-800/50 backdrop-blur border-2 border-red-500/50 p-8 rounded-xl">
          <p className="text-red-300 text-center">
            加载题目时出错，请返回上一页重试
          </p>
        </div>
      );
    }

    // 找到当前维度的所有题目
    const dimensionQuestions = DIMENSION_QUESTIONS.filter(q => q.dimension === currentDimension.key);

    return (
      <div className="space-y-6">
        {/* 现实行为题 */}
        <div className="bg-slate-800/50 backdrop-blur border-2 border-amber-500/30 p-8 rounded-xl">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-block px-3 py-1 bg-amber-100/10 dark:bg-amber-900/30 text-amber-300 text-sm font-medium rounded-full">
                {currentDimension.key} 维度
              </div>
              <span className="text-sm text-blue-200">
                ({Math.floor(currentQuestionIndex / 2) + 1} / 6)
              </span>
            </div>

            {/* 现实行为题 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                现实行为
              </h3>
              {dimensionQuestions.filter(q => q.type === 'reality').slice(0, 1).map((q) => (
                <div key={q.id} className="mb-4 p-4 bg-slate-900/50 rounded-lg">
                  <p className="text-white">{q.text}</p>
                </div>
              ))}
            </div>

            {/* 真实意愿题 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-amber-300 mb-3">
                真实意愿
              </h3>
              {dimensionQuestions.filter(q => q.type === 'ideal').slice(0, 1).map((q) => (
                <div key={q.id} className="mb-4 p-4 bg-amber-900/20 rounded-lg">
                  <p className="text-white">{q.text}</p>
                </div>
              ))}
            </div>

            {/* Likert选项 */}
            <div className="space-y-2">
              {LIKERT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    const questionId = isRealityQuestion
                      ? `${currentDimension.key}_real_behavior`
                      : `${currentDimension.key}_ideal_behavior`;

                    // 更新答案
                    if (isRealityQuestion) {
                      setDimensionAnswers({
                        ...dimensionAnswers,
                        [questionId]: {
                          ...(dimensionAnswers[questionId] || { reality: 0, ideal: 0 }),
                          reality: option.value
                        }
                      });
                    } else {
                      setDimensionAnswers({
                        ...dimensionAnswers,
                        [questionId]: {
                          ...(dimensionAnswers[questionId] || { reality: 0, ideal: 0 }),
                          ideal: option.value
                        }
                      });
                    }

                    saveCurrentProgress();

                    // 自动跳转到下一题
                    setTimeout(() => {
                      const totalDimensionPages = dimensions.length * 2; // 6个维度 × 2题 = 12页
                      if (currentQuestionIndex < totalDimensionPages - 1) {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                      } else {
                        setCurrentSection('scenarios');
                        setCurrentQuestionIndex(0);
                      }
                    }, 200);
                  }}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    (isRealityQuestion
                      ? dimensionAnswers[`${currentDimension.key}_real_behavior`]?.reality
                      : dimensionAnswers[`${currentDimension.key}_ideal_behavior`]?.ideal
                    ) === option.value
                      ? 'border-amber-500 bg-amber-900/20'
                      : 'border-slate-600 hover:border-amber-400'
                  }`}
                >
                  <span className="font-medium text-white">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 渲染情境题section
  const renderScenarios = () => {
    const question = SCENARIO_QUESTIONS[currentQuestionIndex];

    return (
      <div className="bg-slate-800/50 backdrop-blur border-2 border-amber-500/30 p-8 rounded-xl">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-amber-100/10 dark:bg-amber-900/30 text-amber-300 text-sm font-medium rounded-full mb-4">
            {currentQuestionIndex + 1} / {SCENARIO_QUESTIONS.length}
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-4">
            {question.text}
          </h2>
          <p className="text-sm text-blue-200 mb-4">
            {question.context}
          </p>
        </div>

        {/* 选项 */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setScenarioAnswers({ ...scenarioAnswers, [question.id]: option.id });
                saveCurrentProgress();

                // 自动跳转下一题
                setTimeout(() => {
                  if (currentQuestionIndex < SCENARIO_QUESTIONS.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  } else {
                    setCurrentSection('reflection');
                    setCurrentQuestionIndex(0);
                  }
                }, 300);
              }}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                scenarioAnswers[question.id] === option.id
                  ? 'border-amber-500 bg-amber-900/20'
                  : 'border-slate-600 hover:border-amber-400'
              }`}
            >
              <p className="font-medium text-white">{option.text}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // 渲染反思section
  const renderReflection = () => {
    const question = REFLECTION_QUESTIONS[currentQuestionIndex];

    return (
      <div className="bg-slate-800/50 backdrop-blur border-2 border-amber-500/30 p-8 rounded-xl">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-amber-100/10 dark:bg-amber-900/30 text-amber-300 text-sm font-medium rounded-full mb-4">
            {currentQuestionIndex + 1} / {REFLECTION_QUESTIONS.length}
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-4">
            {question.text}
          </h2>
        </div>

        {/* 文本输入框 */}
        <textarea
          className="w-full p-4 border-2 border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none bg-slate-900/50 text-white placeholder-blue-300/50 resize-none"
          rows={question.multiline ? 6 : 3}
          placeholder={question.placeholder}
          onChange={(e) => {
            setReflectionAnswers({ ...reflectionAnswers, [question.id]: e.target.value });
          }}
          onBlur={saveCurrentProgress}
        />

        {/* 下一步按钮 */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              if (currentQuestionIndex < REFLECTION_QUESTIONS.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                handleSubmit();
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all font-medium"
          >
            {currentQuestionIndex < REFLECTION_QUESTIONS.length - 1 ? '下一步' : '提交测试'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // 主渲染
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* 顶部导航 */}
        <div className="mb-8">
          <button
            onClick={() => {
              if (currentSection === 'basic' && currentQuestionIndex === 0) {
                router.push('/');
              } else if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
              } else {
                // 返回上一个section
                const currentIndex = sections.findIndex(s => s.id === currentSection);
                if (currentIndex > 0) {
                  setCurrentSection(sections[currentIndex - 1].id);
                  setCurrentQuestionIndex(0);
                }
              }
            }}
            className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </button>

          {/* 温馨提示 - 仅在基础信息第一题时显示 */}
          {!tipDismissed && currentSection === 'basic' && currentQuestionIndex === 0 && (
            <div className="mb-6">
              <QuestionnaireTip variant="full" onDismiss={handleDismissTip} />
            </div>
          )}

          {/* 页面标题 */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <LighthouseIconSmall className="text-amber-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400">
              开始你的灯塔之旅
            </h1>
          </div>

          {/* Section进度条 */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-200">
                测试进度
              </span>
              <span className="text-sm font-medium text-blue-200">
                {sections.findIndex(s => s.id === currentSection) + 1} / {sections.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {sections.map((section, index) => {
                const status = getSectionStatus(section.id);
                return (
                  <div
                    key={section.id}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      status === 'completed' ? 'bg-amber-500' :
                      status === 'active' ? 'bg-amber-400' :
                      'bg-slate-700'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* 当前Section标题 */}
          <div className="flex items-center gap-3 mb-2">
            {sections.find(s => s.id === currentSection)?.icon}
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {sections.find(s => s.id === currentSection)?.title}
            </h1>
          </div>
          <p className="text-blue-200">
            {QUESTIONNAIRE_META.sections.find(s => s.id === currentSection)?.description}
          </p>
        </div>

        {/* 问题内容 */}
        {currentSection === 'basic' && renderBasicInfo()}
        {currentSection === 'motivation' && renderMotivation()}
        {currentSection === 'dimensions' && renderDimensions()}
        {currentSection === 'scenarios' && renderScenarios()}
        {currentSection === 'reflection' && renderReflection()}
      </div>
    </div>
  );
}
