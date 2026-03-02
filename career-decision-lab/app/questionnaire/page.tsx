'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Target } from 'lucide-react';
import { QUESTIONS, LIKERT_OPTIONS, CONFLICT_QUESTIONS } from '@/data/questions';
import { loadProgress, saveProgress, clearProgress } from '@/lib/storage';
import { TestProgress } from '@/types';

type QuestionnairePhase = 'likert' | 'conflict' | 'complete';

export default function QuestionnairePage() {
  const router = useRouter();
  const [phase, setPhase] = useState<QuestionnairePhase>('likert');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [conflictAnswers, setConflictAnswers] = useState<Record<string, string>>({});
  const [userInfo, setUserInfo] = useState<any>(null);

  // Load progress on mount
  useEffect(() => {
    const progress = loadProgress();
    if (progress) {
      if (progress.userInfo) {
        setUserInfo(progress.userInfo);
      }
      if (progress.answers && Object.keys(progress.answers).length > 0) {
        setAnswers(progress.answers);
        // Find the first unanswered question
        const firstUnanswered = QUESTIONS.findIndex(q => !(q.id in progress.answers));
        setCurrentQuestion(firstUnanswered === -1 ? QUESTIONS.length : firstUnanswered);
      }
    } else {
      // No progress found, redirect to info page
      router.push('/info');
    }
  }, [router]);

  const handleLikertAnswer = (value: number) => {
    const newAnswers = {
      ...answers,
      [QUESTIONS[currentQuestion].id]: value
    };
    setAnswers(newAnswers);

    // Save progress
    if (userInfo) {
      saveProgress({
        currentQuestion: currentQuestion + 1,
        answers: newAnswers,
        userInfo
      });
    }

    // Auto advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // All Likert questions answered, move to conflict questions
        setPhase('conflict');
      }
    }, 300);
  };

  const handleConflictAnswer = (questionId: string, optionId: string) => {
    const newConflictAnswers = {
      ...conflictAnswers,
      [questionId]: optionId
    };
    setConflictAnswers(newConflictAnswers);

    // Auto advance to next conflict question
    const currentConflictIndex = CONFLICT_QUESTIONS.findIndex(q => q.id === questionId);
    setTimeout(() => {
      if (currentConflictIndex < CONFLICT_QUESTIONS.length - 1) {
        // Stay on conflict phase, will auto-advance
      } else {
        // All conflict questions answered, submit
        handleSubmit();
      }
    }, 300);
  };

  const handleSubmit = () => {
    if (!userInfo) {
      router.push('/info');
      return;
    }

    // Clear progress after submission
    clearProgress();

    // Navigate to results page with answers (including conflict answers)
    router.push(`/results?data=${encodeURIComponent(JSON.stringify({
      userInfo,
      answers,
      conflictAnswers
    }))}`);
  };

  const goBack = () => {
    if (phase === 'conflict') {
      // Go back to last Likert question
      setPhase('likert');
      setCurrentQuestion(QUESTIONS.length - 1);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      router.push('/info');
    }
  };

  const likertProgress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const conflictProgress = (Object.keys(conflictAnswers).length / CONFLICT_QUESTIONS.length) * 100;

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={goBack}
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {phase === 'conflict' ? '返回问卷' : (currentQuestion > 0 ? '上一题' : '返回')}
          </button>

          {/* Progress Bar */}
          {phase === 'likert' && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  能力评估进度
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {currentQuestion + 1} / {QUESTIONS.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${likertProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {phase === 'conflict' && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  关键取舍进度
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {Object.keys(conflictAnswers).length} / {CONFLICT_QUESTIONS.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${conflictProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {phase === 'likert' ? '能力评估问卷' : '关键取舍选择'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {phase === 'likert'
              ? '请根据你的真实情况，选择最符合的选项'
              : '以下问题没有标准答案，请选择更接近真实决策倾向的一项'
            }
          </p>
        </div>

        {phase === 'likert' && (
          <>
            {/* Likert Question Card */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full mb-4">
                  {QUESTIONS[currentQuestion].dimension} 维度
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {QUESTIONS[currentQuestion].text}
                </h2>
              </div>

              {/* Likert Scale Options */}
              <div className="space-y-3">
                {LIKERT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleLikertAnswer(option.value)}
                    className="w-full text-left p-4 rounded-lg border-2 border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {option.value}
                        </span>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation for Likert */}
            <div className="flex justify-between items-center">
              <button
                onClick={goBack}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentQuestion === 0
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                上一题
              </button>

              <button
                onClick={() => {
                  if (currentQuestion < QUESTIONS.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                  }
                }}
                disabled={currentQuestion === QUESTIONS.length - 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  currentQuestion === QUESTIONS.length - 1
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                下一题
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {phase === 'conflict' && (
          <>
            {/* Conflict Questions Section */}
            {CONFLICT_QUESTIONS.map((conflictQ, index) => {
              const isAnswered = conflictQ.id in conflictAnswers;
              const isCurrent = !isAnswered && (index === 0 || CONFLICT_QUESTIONS[index - 1].id in conflictAnswers);

              if (!isCurrent && !isAnswered) return null;

              return (
                <div
                  key={conflictQ.id}
                  className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6"
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full">
                        关键取舍 {index + 1}
                      </div>
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white leading-relaxed">
                      {conflictQ.text}
                    </h2>
                  </div>

                  {/* Conflict Options */}
                  <div className="space-y-3">
                    {conflictQ.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => !isAnswered && handleConflictAnswer(conflictQ.id, option.id)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all group ${
                          isAnswered && conflictAnswers[conflictQ.id] === option.id
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-slate-200 dark:border-slate-600 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                        } ${isAnswered ? 'cursor-not-allowed opacity-60' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isAnswered && conflictAnswers[conflictQ.id] === option.id
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-slate-300 dark:border-slate-600 group-hover:border-purple-500'
                          }`}>
                            {isAnswered && conflictAnswers[conflictQ.id] === option.id && (
                              <span className="text-white font-bold text-sm">
                                {option.id}
                              </span>
                            )}
                            {!isAnswered && (
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                {option.id}
                              </span>
                            )}
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">
                            {option.text}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
