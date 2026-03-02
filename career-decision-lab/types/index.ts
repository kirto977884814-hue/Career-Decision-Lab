// 核心维度类型
export type Dimension = 'S' | 'A' | 'R' | 'E' | 'X' | 'C';

// 维度名称映射
export const DIMENSION_NAMES: Record<Dimension, string> = {
  S: '结构化能力',
  A: '抽象逻辑能力',
  R: '风险承受度',
  E: '表达倾向',
  X: '执行抗压能力',
  C: '共情能力'
};

// 问卷题目类型
export interface Question {
  id: string;
  dimension: Dimension;
  text: string;
  reverse?: boolean;
}

// 用户基础信息
export interface UserInfo {
  grade: string;
  major: string;
  planPostgraduate: boolean;
  currentConfusion: string;
}

// 维度得分
export interface DimensionScores {
  S: number;
  A: number;
  R: number;
  E: number;
  X: number;
  C: number;
}

// 职业路径类型
export type CareerPath =
  | 'stable'              // 稳定体制型
  | 'deepSpecialist'      // 专业深耕型
  | 'techApplication'     // 技术应用型
  | 'productStrategy'     // 产品策略型
  | 'growthOperation'     // 增长运营型
  | 'contentExpression'   // 内容表达型
  | 'educationSupport'    // 教育助人型
  | 'entrepreneurship';  // 创业探索型

// 职业路径信息
export interface CareerPathInfo {
  id: CareerPath;
  name: string;
  description: string;
  matchReason: string;
  currentFitReason: string;
  difficultyReminder: string;
  requiredSkills: string[];
}

// 路径匹配结果
export interface PathMatchResult {
  pathId: CareerPath;
  score: number;
  matchPercent: number;
}

// 完整测试结果
export interface TestResult {
  id: string;
  timestamp: number;
  userInfo: UserInfo;
  dimensionScores: DimensionScores;
  primaryPath: PathMatchResult;
  evolvablePath?: PathMatchResult;
  notPriorityPaths: PathMatchResult[];
  actionPlan: WeeklyAction[];
}

// 30天行动清单
export interface WeeklyAction {
  week: number;
  title: string;
  tasks: string[];
  completed?: boolean;
}

// 本地存储键
export const STORAGE_KEYS = {
  PROGRESS: 'career_test_progress',
  RESULTS: 'career_test_results'
} as const;

// 测试进度
export interface TestProgress {
  currentQuestion: number;
  answers: Record<string, number>;
  userInfo?: UserInfo;
}
