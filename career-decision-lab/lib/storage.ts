import { TestProgress, TestResult, STORAGE_KEYS } from '@/types';

// 保存测试进度
export function saveProgress(progress: TestProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

// 读取测试进度
export function loadProgress(): TestProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
}

// 清除测试进度
export function clearProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
}

// 保存测试结果
export function saveResult(result: TestResult): void {
  if (typeof window === 'undefined') return;
  try {
    const existingResults = loadResults();
    existingResults.push(result);
    // 只保留最近5次测试结果
    const recentResults = existingResults.slice(-5);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(recentResults));
  } catch (error) {
    console.error('Failed to save result:', error);
  }
}

// 读取所有测试结果
export function loadResults(): TestResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load results:', error);
    return [];
  }
}

// 获取最新的测试结果
export function getLatestResult(): TestResult | null {
  const results = loadResults();
  return results.length > 0 ? results[results.length - 1] : null;
}

// 清除所有测试结果
export function clearResults(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
  } catch (error) {
    console.error('Failed to clear results:', error);
  }
}

// 删除指定的测试结果
export function deleteResult(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const results = loadResults();
    const filteredResults = results.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(filteredResults));
  } catch (error) {
    console.error('Failed to delete result:', error);
  }
}
