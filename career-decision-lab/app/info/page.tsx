'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UserInfo, STORAGE_KEYS } from '@/types';
import { saveProgress } from '@/lib/storage';

export default function InfoPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>({
    grade: '',
    major: '',
    planPostgraduate: false,
    currentConfusion: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!userInfo.grade) {
      newErrors.grade = '请选择年级';
    }
    if (!userInfo.major || userInfo.major.trim() === '') {
      newErrors.major = '请输入专业';
    }
    if (userInfo.planPostgraduate === undefined) {
      newErrors.planPostgraduate = '请选择是否计划考研';
    }
    if (!userInfo.currentConfusion || userInfo.currentConfusion.trim() === '') {
      newErrors.currentConfusion = '请描述当前困惑';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Save progress to localStorage
    const completeUserInfo: UserInfo = {
      grade: userInfo.grade!,
      major: userInfo.major!.trim(),
      planPostgraduate: userInfo.planPostgraduate!,
      currentConfusion: userInfo.currentConfusion!.trim()
    };

    saveProgress({
      currentQuestion: 0,
      answers: {},
      userInfo: completeUserInfo
    });

    // Navigate to questionnaire
    router.push('/questionnaire');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            基础信息
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            请填写你的基本情况，帮助我们生成更准确的建议
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="space-y-6">
            {/* Grade */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                年级 <span className="text-red-500">*</span>
              </label>
              <select
                value={userInfo.grade}
                onChange={(e) => setUserInfo({ ...userInfo, grade: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.grade
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                } bg-white dark:bg-slate-700 text-slate-900 dark:text-white transition-colors`}
              >
                <option value="">请选择年级</option>
                <option value="大一">大一</option>
                <option value="大二">大二</option>
                <option value="大三">大三</option>
                <option value="大四">大四</option>
                <option value="研一">研一</option>
                <option value="研二">研二</option>
                <option value="研三">研三</option>
                <option value="已毕业">已毕业</option>
              </select>
              {errors.grade && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.grade}</p>
              )}
            </div>

            {/* Major */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                专业 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={userInfo.major}
                onChange={(e) => setUserInfo({ ...userInfo, major: e.target.value })}
                placeholder="例如：计算机科学与技术"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.major
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                } bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 transition-colors`}
              />
              {errors.major && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.major}</p>
              )}
            </div>

            {/* Postgraduate Plans */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                是否计划考研 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="postgraduate"
                    value="yes"
                    checked={userInfo.planPostgraduate === true}
                    onChange={() => setUserInfo({ ...userInfo, planPostgraduate: true })}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-slate-700 dark:text-slate-300">是</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="postgraduate"
                    value="no"
                    checked={userInfo.planPostgraduate === false}
                    onChange={() => setUserInfo({ ...userInfo, planPostgraduate: false })}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-slate-700 dark:text-slate-300">否</span>
                </label>
              </div>
              {errors.planPostgraduate && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.planPostgraduate}</p>
              )}
            </div>

            {/* Current Confusion */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                当前最大的职业困惑 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={userInfo.currentConfusion}
                onChange={(e) => setUserInfo({ ...userInfo, currentConfusion: e.target.value })}
                placeholder="请简要描述你当前在职业选择方面的困惑或迷茫..."
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.currentConfusion
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                } bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 transition-colors resize-none`}
              />
              {errors.currentConfusion && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.currentConfusion}</p>
              )}
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                此信息不参与评分，仅用于生成个性化建议
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              下一步
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            🔒 你的信息仅保存在本地浏览器中，不会被上传到任何服务器
          </p>
        </div>
      </div>
    </div>
  );
}
