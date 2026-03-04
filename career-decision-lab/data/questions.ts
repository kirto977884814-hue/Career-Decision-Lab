import { Question } from '@/types';

// 所有问卷题目 (36题, 每个维度6题) - v4.0升级版：大学生情境化行为决策题
export const QUESTIONS: Question[] = [
  // 结构化能力 (S) - 6题（3题反向）
  {
    id: 'S01',
    dimension: 'S',
    text: '在开始写课程论文前，我会先列好详细的大纲和各部分的字数分配。'
  },
  {
    id: 'S02',
    dimension: 'S',
    text: '面对期末复习，我会把所有知识点按重要程度分类，制定阶梯式复习计划。'
  },
  {
    id: 'S03',
    dimension: 'S',
    text: '当接到一个新的小组作业时，我会主动梳理出任务分工和时间节点。'
  },
  {
    id: 'S04',
    dimension: 'S',
    text: '在学习一门新课时，我会先整理出课程的知识框架图，再填充细节。'
  },
  {
    id: 'S05',
    dimension: 'S',
    text: '在deadline临近的情况下，我更倾向于先快速试错而不是先设计完整方案。',
    reverse: true
  },
  {
    id: 'S06',
    dimension: 'S',
    text: '面对没有标准答案的开放性作业，我会感到不知道从何入手。',
    reverse: true
  },

  // 抽象逻辑能力 (A) - 6题（3题反向）
  {
    id: 'A01',
    dimension: 'A',
    text: '当老师讲解一个案例时，我会尝试提炼出背后的通用规律或模型。'
  },
  {
    id: 'A02',
    dimension: 'A',
    text: '在学习一个新概念时，我会花时间理解其背后的原理而不是直接记忆结论。'
  },
  {
    id: 'A03',
    dimension: 'A',
    text: '面对课本上的理论推导过程，我会仔细阅读每一步的逻辑关系。'
  },
  {
    id: 'A04',
    dimension: 'A',
    text: '在复习时，我更关注知识点之间的逻辑关系而不是孤立地记忆每个知识点。'
  },
  {
    id: 'A05',
    dimension: 'A',
    text: '相比于深入理解原理，我更希望快速上手能用的工具。',
    reverse: true
  },
  {
    id: 'A06',
    dimension: 'A',
    text: '阅读技术文档或教材时，我会跳过理论部分直接看使用示例。',
    reverse: true
  },

  // 风险承受度 (R) - 6题（3题反向）
  {
    id: 'R01',
    dimension: 'R',
    text: '如果有一个创业团队的实习机会（不稳定但成长快），我愿意尝试。'
  },
  {
    id: 'R02',
    dimension: 'R',
    text: '面对多个不确定的职业方向，我更倾向于通过实习尝试而不是等待确定答案。'
  },
  {
    id: 'R03',
    dimension: 'R',
    text: '我不介意大学期间多次调整自己的职业规划方向。'
  },
  {
    id: 'R04',
    dimension: 'R',
    text: '在选择选修课时，我更愿意选有挑战性但可能拿低分的课程，而不是稳妥的"水课"。'
  },
  {
    id: 'R05',
    dimension: 'R',
    text: '我更希望一次性就确定好职业方向，而不是反复尝试和调整。',
    reverse: true
  },
  {
    id: 'R06',
    dimension: 'R',
    text: '面对"考公还是就业"这种不确定的选择，我会感到很焦虑。',
    reverse: true
  },

  // 表达倾向 (E) - 6题（3题反向）
  {
    id: 'E01',
    dimension: 'E',
    text: '在课堂讨论或小组会议中，我通常会主动表达自己的观点。'
  },
  {
    id: 'E02',
    dimension: 'E',
    text: '当理解了一个知识点后，我愿意向同学讲解来巩固理解。'
  },
  {
    id: 'E03',
    dimension: 'E',
    text: '我不排斥在课堂上主动回答问题或上台展示。'
  },
  {
    id: 'E04',
    dimension: 'E',
    text: '当发现同学对我的观点有误解时，我会主动澄清说明。'
  },
  {
    id: 'E05',
    dimension: 'E',
    text: '如果老师不点名提问，我通常不会主动发言。',
    reverse: true
  },
  {
    id: 'E06',
    dimension: 'E',
    text: '相比于口头汇报，我更愿意通过提交文档或作品来展示成果。',
    reverse: true
  },

  // 执行抗压能力 (X) - 6题（3题反向）
  {
    id: 'X01',
    dimension: 'X',
    text: '期末考试周即使压力很大，我也能保持高效的学习状态。'
  },
  {
    id: 'X02',
    dimension: 'X',
    text: '面对一个困难的课程作业，即使不完美，我也愿意先完成初稿再迭代。'
  },
  {
    id: 'X03',
    dimension: 'X',
    text: '当同时有多门课的deadline临近时，我可以稳定推进各项任务。'
  },
  {
    id: 'X04',
    dimension: 'X',
    text: '在准备重要的考试或竞赛期间，我可以坚持高强度学习2-3周。'
  },
  {
    id: 'X05',
    dimension: 'X',
    text: '当任务deadline临近时，我会感到焦虑导致效率下降。',
    reverse: true
  },
  {
    id: 'X06',
    dimension: 'X',
    text: '面对困难的任务，我倾向于拖延到最后一刻才开始。',
    reverse: true
  },

  // 共情能力 (C) - 6题（3题反向）
  {
    id: 'C01',
    dimension: 'C',
    text: '当室友或同学情绪低落时，我能察觉到他们的状态变化。'
  },
  {
    id: 'C02',
    dimension: 'C',
    text: '在小组合作中提出意见时，我会考虑其他成员的感受。'
  },
  {
    id: 'C03',
    dimension: 'C',
    text: '如果同学在学习和生活上遇到困难，我愿意主动提供支持。'
  },
  {
    id: 'C04',
    dimension: 'C',
    text: '我能够感知到团队氛围的变化，并及时调整沟通方式。'
  },
  {
    id: 'C05',
    dimension: 'C',
    text: '在团队合作中，相比于维护关系，我更关注任务是否按时完成。',
    reverse: true
  },
  {
    id: 'C06',
    dimension: 'C',
    text: '当团队出现分歧时，我更倾向于直接指出问题而不是顾及大家的情绪。',
    reverse: true
  }
];

// Likert量表选项 - v3.0更新文案
export const LIKERT_OPTIONS = [
  { value: 1, label: '非常不像我' },
  { value: 2, label: '不太像我' },
  { value: 3, label: '一般' },
  { value: 4, label: '比较像我' },
  { value: 5, label: '非常像我' }
];

// 冲突型强制选择题 - v4.0更新：大学生情境版
export interface ConflictQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    dimension: keyof DimensionScores; // 使用Dimension的key
    bonus: number; // 加分值，建议0.5或1
  }[];
}

import { DimensionScores } from '@/types';

export const CONFLICT_QUESTIONS: ConflictQuestion[] = [
  {
    id: 'conflict_1',
    text: '当接到一个没有明确要求的小组作业任务时，你更可能：',
    options: [
      {
        id: 'A',
        text: '先花时间设计完整的执行框架和分工方案',
        dimension: 'S',
        bonus: 0.5
      },
      {
        id: 'B',
        text: '立即开始尝试，在过程中逐步调整方向',
        dimension: 'X',
        bonus: 0.5
      }
    ]
  },
  {
    id: 'conflict_2',
    text: '如果面临"考公上岸"和"去互联网公司实习"这两个机会，你会倾向：',
    options: [
      {
        id: 'A',
        text: '选择考公上岸，追求稳定和确定性',
        dimension: 'R',
        bonus: -0.5
      },
      {
        id: 'B',
        text: '选择互联网实习，接受不确定性但有更多成长',
        dimension: 'R',
        bonus: 0.5
      }
    ]
  },
  {
    id: 'conflict_3',
    text: '在课程小组项目中，你更愿意承担：',
    options: [
      {
        id: 'A',
        text: '负责最终的汇报展示和对外沟通',
        dimension: 'E',
        bonus: 0.5
      },
      {
        id: 'B',
        text: '负责内容研究和逻辑框架搭建',
        dimension: 'A',
        bonus: 0.5
      }
    ]
  },
  {
    id: 'conflict_4',
    text: '当小组项目中出现意见分歧时，你更倾向：',
    options: [
      {
        id: 'A',
        text: '优先维护团队和谐，适当妥协自己的观点',
        dimension: 'C',
        bonus: 0.5
      },
      {
        id: 'B',
        text: '坚持自己的观点，优先确保项目质量和进度',
        dimension: 'X',
        bonus: 0.5
      }
    ]
  }
];
