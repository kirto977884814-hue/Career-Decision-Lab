'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Trash2, Eye } from 'lucide-react';
import { loadResults, deleteResult, TestResult } from '@/lib/storage';
import { PATH_DESCRIPTIONS } from '@/data/paths';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function HistoryPage() {
  const router = useRouter();
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    const savedResults = loadResults();
    setResults(savedResults.sort((a, b) => b.timestamp - a.timestamp));
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条测试记录吗？')) {
      deleteResult(id);
      setResults(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleView = (result: TestResult) => {
    // Navigate to results page with the result data
    const data = JSON.stringify({
      userInfo: result.userInfo,
      answers: {} // We don't need answers for viewing
    });

    // Encode the result to pass it
    const resultData = JSON.stringify(result);
    router.push(`/history-result?data=${encodeURIComponent(resultData)}`);
  };

  const formatDate = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: zhCN
    });
  };

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              测试历史
            </h1>
            <p className="text-slate-600">
              查看你过往的测试结果
            </p>
          </div>

          {/* Empty State */}
          <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-200 text-center">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              暂无测试记录
            </h3>
            <p className="text-slate-600 mb-6">
              你还没有完成任何测试
            </p>
            <Link
              href="/info"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              开始第一次测试
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            测试历史
          </h1>
          <p className="text-slate-600">
            共 {results.length} 条测试记录
          </p>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {results.map((result) => {
            const primaryPathInfo = PATH_DESCRIPTIONS[result.primaryPath.pathId];

            return (
              <div
                key={result.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-5 h-5 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {formatDate(result.timestamp)}
                      </span>
                      <span className="text-sm text-slate-400">
                        • {result.userInfo.grade} • {result.userInfo.major}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      主要路径: {primaryPathInfo.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      匹配度: <span className="font-bold text-blue-600">{result.primaryPath.matchPercent}%</span>
                    </p>

                    {result.evolvablePath && (
                      <p className="text-sm text-slate-500">
                        演化路径: {PATH_DESCRIPTIONS[result.evolvablePath.pathId].name}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleView(result)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="查看详情"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(result.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除记录"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 提示：测试记录保存在浏览器本地，清除浏览器数据会导致记录丢失
          </p>
        </div>
      </div>
    </div>
  );
}
