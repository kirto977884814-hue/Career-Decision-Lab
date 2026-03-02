import { Question } from '@/types';

// 所有问卷题目 (24题, 每个维度4题)
export const QUESTIONS: Question[] = [
  // 结构化能力 (S)
  {
    id: 'S1',
    dimension: 'S',
    text: '我习惯在行动前建立问题框架。'
  },
  {
    id: 'S2',
    dimension: 'S',
    text: '面对复杂问题,我倾向拆解步骤而不是直接尝试。'
  },
  {
    id: 'S3',
    dimension: 'S',
    text: '我更喜欢整理信息,而不是直接寻找结论。'
  },
  {
    id: 'S4',
    dimension: 'S',
    text: '我擅长将混乱问题转化为清晰结构。'
  },

  // 抽象逻辑能力 (A)
  {
    id: 'A1',
    dimension: 'A',
    text: '我喜欢思考问题背后的底层逻辑。'
  },
  {
    id: 'A2',
    dimension: 'A',
    text: '我对模型或理论体系感兴趣。'
  },
  {
    id: 'A3',
    dimension: 'A',
    text: '我能较快理解抽象概念。'
  },
  {
    id: 'A4',
    dimension: 'A',
    text: '我习惯从具体案例总结一般规律。'
  },

  // 风险承受度 (R)
  {
    id: 'R1',
    dimension: 'R',
    text: '我可以接受收入波动换取成长空间。'
  },
  {
    id: 'R2',
    dimension: 'R',
    text: '面对不确定未来,我不会过度焦虑。'
  },
  {
    id: 'R3',
    dimension: 'R',
    text: '我愿意尝试高风险但高回报的路径。'
  },
  {
    id: 'R4',
    dimension: 'R',
    text: '我不排斥职业方向的多次调整。'
  },

  // 表达倾向 (E)
  {
    id: 'E1',
    dimension: 'E',
    text: '我愿意持续对外表达观点。'
  },
  {
    id: 'E2',
    dimension: 'E',
    text: '我在群体讨论中通常较为主动。'
  },
  {
    id: 'E3',
    dimension: 'E',
    text: '我享受说服或讲解他人的过程。'
  },
  {
    id: 'E4',
    dimension: 'E',
    text: '我对频繁社交互动不排斥。'
  },

  // 执行抗压能力 (X)
  {
    id: 'X1',
    dimension: 'X',
    text: '在高压环境下,我仍能保持效率。'
  },
  {
    id: 'X2',
    dimension: 'X',
    text: '我更倾向快速行动,而不是长时间思考。'
  },
  {
    id: 'X3',
    dimension: 'X',
    text: '我可以接受重复性或高强度任务。'
  },
  {
    id: 'X4',
    dimension: 'X',
    text: '我更关注结果,而不是过程的完美。'
  },

  // 共情能力 (C)
  {
    id: 'C1',
    dimension: 'C',
    text: '我能较敏锐察觉他人情绪变化。'
  },
  {
    id: 'C2',
    dimension: 'C',
    text: '我在意他人的反馈与评价。'
  },
  {
    id: 'C3',
    dimension: 'C',
    text: '我愿意长期陪伴他人成长。'
  },
  {
    id: 'C4',
    dimension: 'C',
    text: '我对人际关系变化较敏感。'
  }
];

// Likert量表选项
export const LIKERT_OPTIONS = [
  { value: 1, label: '非常不同意' },
  { value: 2, label: '比较不同意' },
  { value: 3, label: '中立' },
  { value: 4, label: '比较同意' },
  { value: 5, label: '非常同意' }
];
