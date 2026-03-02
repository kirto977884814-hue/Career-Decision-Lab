import { CareerPath, CareerPathInfo, DimensionScores } from '@/types';

// 8种职业路径的特征向量 [S, A, R, E, X, C]
export const PATH_VECTORS: Record<CareerPath, number[]> = {
  stable: [3, 2, 0, 2, 3, 2],              // 稳定体制型
  deepSpecialist: [3, 5, 2, 1, 3, 1],       // 专业深耕型
  techApplication: [4, 4, 3, 1, 4, 1],      // 技术应用型
  productStrategy: [5, 4, 3, 4, 3, 3],      // 产品策略型
  growthOperation: [3, 2, 4, 4, 5, 2],      // 增长运营型
  contentExpression: [2, 2, 3, 5, 3, 4],    // 内容表达型
  educationSupport: [3, 2, 2, 4, 3, 5],     // 教育助人型
  entrepreneurship: [4, 3, 5, 4, 5, 2]      // 创业探索型
};

// 路径名称映射
export const PATH_NAMES: Record<CareerPath, string> = {
  stable: '稳定体制型',
  deepSpecialist: '专业深耕型',
  techApplication: '技术应用型',
  productStrategy: '产品策略型',
  growthOperation: '增长运营型',
  contentExpression: '内容表达型',
  educationSupport: '教育助人型',
  entrepreneurship: '创业探索型'
};

// 路径详细解释
export const PATH_DESCRIPTIONS: Record<CareerPath, Omit<CareerPathInfo, 'id'>> = {
  stable: {
    name: '稳定体制型',
    description: '偏向长期稳定发展路径,如体制内、事业单位、国企或考研深造。',
    matchReason: '你的风险承受度相对较低,同时执行与结构能力较为稳定。这类能力结构更适合明确规则与路径清晰的环境。',
    currentFitReason: '在职业探索初期,稳定路径可以降低试错成本,给你建立基本职业安全感。',
    difficultyReminder: '竞争压力主要体现在考试与选拔阶段,需要长期准备与持续投入。',
    requiredSkills: ['持续专注能力', '长期目标管理能力', '信息筛选与复习系统化能力']
  },
  deepSpecialist: {
    name: '专业深耕型',
    description: '通过长期专业积累建立壁垒,如科研、工程、医学、法律等。',
    matchReason: '你的抽象逻辑能力较高,同时具备一定结构能力。这类路径依赖长期知识积累与理论深度。',
    currentFitReason: '在职业早期建立专业壁垒,有助于未来获得更高议价能力。',
    difficultyReminder: '回报周期较长,需要耐心与持续投入。',
    requiredSkills: ['深度专注能力', '长期规划能力', '专业持续输出能力']
  },
  techApplication: {
    name: '技术应用型',
    description: '偏向技术实现与系统构建,如开发、数据分析、AI应用等。',
    matchReason: '你的结构化能力与抽象能力较强,同时执行能力较稳定。',
    currentFitReason: '技术路径具有明确成长路径与较强市场需求。',
    difficultyReminder: '需要持续学习技术栈,更新速度快。',
    requiredSkills: ['技术深度', '项目实践能力', '系统架构理解能力']
  },
  productStrategy: {
    name: '产品策略型',
    description: '偏向系统设计与决策制定,如产品经理、商业策略等。',
    matchReason: '你的结构能力较强,同时表达与抽象能力均衡。这类路径依赖系统理解与跨领域整合能力。',
    currentFitReason: '如果你希望参与决策与产品构建,这条路径具备成长空间。',
    difficultyReminder: '岗位门槛较高,需要项目经验与表达能力。',
    requiredSkills: ['用户洞察能力', '商业理解能力', '项目实操经验']
  },
  growthOperation: {
    name: '增长运营型',
    description: '偏向执行与结果驱动,如运营、市场、增长岗位。',
    matchReason: '你的执行能力与风险承受度较高,表达能力较为活跃。',
    currentFitReason: '适合快速进入市场环境,通过实战积累经验。',
    difficultyReminder: '工作节奏快,结果压力明显。',
    requiredSkills: ['数据分析能力', '用户增长思维', '抗压与复盘能力']
  },
  contentExpression: {
    name: '内容表达型',
    description: '偏向表达与内容构建,如新媒体、品牌、创作方向。',
    matchReason: '你的表达倾向与共情能力较强,适合持续输出。',
    currentFitReason: '表达能力是未来多领域可迁移能力。',
    difficultyReminder: '收入波动较大,需要长期积累影响力。',
    requiredSkills: ['持续创作能力', '内容定位能力', '数据复盘能力']
  },
  educationSupport: {
    name: '教育助人型',
    description: '偏向帮助他人成长,如教育、心理、用户研究等。',
    matchReason: '你的共情能力与表达能力较强。',
    currentFitReason: '如果你重视长期陪伴与价值感,这类路径匹配度较高。',
    difficultyReminder: '回报周期较长,成长节奏相对平缓。',
    requiredSkills: ['专业认证或理论基础', '长期关系维护能力', '结构化表达能力']
  },
  entrepreneurship: {
    name: '创业探索型',
    description: '偏向高风险高回报路径,如创业或自由职业。',
    matchReason: '你的风险承受度与执行能力较高,同时具备一定结构能力。',
    currentFitReason: '如果你对不确定性容忍度较高,这条路径具备突破空间。',
    difficultyReminder: '失败概率较高,需要心理韧性。',
    requiredSkills: ['商业模式理解', '资源整合能力', '风险管理能力']
  }
};

// 计算用户与路径的匹配度
export function calculatePathMatch(
  userScores: DimensionScores,
  pathVector: number[]
): number {
  const dimensions: (keyof DimensionScores)[] = ['S', 'A', 'R', 'E', 'X', 'C'];

  return dimensions.reduce((sum, dim, index) => {
    return sum + (userScores[dim] * pathVector[index]);
  }, 0);
}

// 计算匹配度百分比
export function calculateMatchPercent(score: number): number {
  // 理论最高分: 5(最高维度分) * 5(最高向量值) * 6(6个维度) = 150
  const maxScore = 150;
  return Math.round((score / maxScore) * 100);
}
