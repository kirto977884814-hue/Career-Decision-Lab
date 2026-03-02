import { Question } from '@/types';

// 所有问卷题目 (36题, 每个维度6题) - v2.0升级版
export const QUESTIONS: Question[] = [
  // 结构化能力 (S) - 6题
  {
    id: 'S01',
    dimension: 'S',
    text: '面对一个模糊任务时,我会先梳理结构再开始行动。'
  },
  {
    id: 'S02',
    dimension: 'S',
    text: '在做决定前,我习惯列出选项和逻辑依据。'
  },
  {
    id: 'S03',
    dimension: 'S',
    text: '当信息混乱时,我倾向先分类整理。'
  },
  {
    id: 'S04',
    dimension: 'S',
    text: '我喜欢用流程或框架解释问题。'
  },
  {
    id: 'S05',
    dimension: 'S',
    text: '即使时间紧迫,我也希望先想清楚步骤。',
    reverse: true
  },
  {
    id: 'S06',
    dimension: 'S',
    text: '如果没有明确结构,我会感到不安。'
  },

  // 抽象逻辑能力 (A) - 6题
  {
    id: 'A01',
    dimension: 'A',
    text: '我喜欢思考问题背后的底层逻辑。'
  },
  {
    id: 'A02',
    dimension: 'A',
    text: '阅读理论或模型时,我会尝试理解其推理过程。'
  },
  {
    id: 'A03',
    dimension: 'A',
    text: '我能较快理解抽象概念。'
  },
  {
    id: 'A04',
    dimension: 'A',
    text: '我习惯从具体案例总结出一般规律。'
  },
  {
    id: 'A05',
    dimension: 'A',
    text: '当别人讲复杂概念时,我愿意深入理解而不是只听结论。'
  },
  {
    id: 'A06',
    dimension: 'A',
    text: '我对"为什么这样设计"比"怎么做"更感兴趣。'
  },

  // 风险承受度 (R) - 6题
  {
    id: 'R01',
    dimension: 'R',
    text: '我可以接受收入不稳定换取成长机会。'
  },
  {
    id: 'R02',
    dimension: 'R',
    text: '面对不确定环境,我仍能保持理性。'
  },
  {
    id: 'R03',
    dimension: 'R',
    text: '如果一个方向潜力大但风险高,我愿意尝试。'
  },
  {
    id: 'R04',
    dimension: 'R',
    text: '我不排斥职业路径多次转向。'
  },
  {
    id: 'R05',
    dimension: 'R',
    text: '稳定比发展速度更重要。',
    reverse: true
  },
  {
    id: 'R06',
    dimension: 'R',
    text: '面对失败可能,我仍愿意承担尝试成本。'
  },

  // 表达倾向 (E) - 6题
  {
    id: 'E01',
    dimension: 'E',
    text: '在团队中,我愿意主动表达观点。'
  },
  {
    id: 'E02',
    dimension: 'E',
    text: '我不排斥公开表达自己的思考。'
  },
  {
    id: 'E03',
    dimension: 'E',
    text: '当我理解一个问题后,我愿意讲给他人听。'
  },
  {
    id: 'E04',
    dimension: 'E',
    text: '我享受说服或解释的过程。'
  },
  {
    id: 'E05',
    dimension: 'E',
    text: '如果没有人提问,我通常不会主动发言。',
    reverse: true
  },
  {
    id: 'E06',
    dimension: 'E',
    text: '我愿意持续输出观点或内容。'
  },

  // 执行抗压能力 (X) - 6题
  {
    id: 'X01',
    dimension: 'X',
    text: '在高压环境下,我仍能保持行动力。'
  },
  {
    id: 'X02',
    dimension: 'X',
    text: '面对繁重任务,我更倾向直接执行而不是拖延。'
  },
  {
    id: 'X03',
    dimension: 'X',
    text: '我可以接受短期高强度投入。'
  },
  {
    id: 'X04',
    dimension: 'X',
    text: '即使任务重复,我也能稳定完成。'
  },
  {
    id: 'X05',
    dimension: 'X',
    text: '如果计划不完美,我也愿意先行动。'
  },
  {
    id: 'X06',
    dimension: 'X',
    text: '结果比过程是否完美更重要。'
  },

  // 共情能力 (C) - 6题
  {
    id: 'C01',
    dimension: 'C',
    text: '我能敏锐察觉他人情绪变化。'
  },
  {
    id: 'C02',
    dimension: 'C',
    text: '我会在意他人对我的反馈。'
  },
  {
    id: 'C03',
    dimension: 'C',
    text: '当他人情绪低落时,我愿意提供支持。'
  },
  {
    id: 'C04',
    dimension: 'C',
    text: '我对人际关系变化较为敏感。'
  },
  {
    id: 'C05',
    dimension: 'C',
    text: '我愿意长期陪伴他人成长。'
  },
  {
    id: 'C06',
    dimension: 'C',
    text: '我会在表达时考虑他人的感受。'
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
