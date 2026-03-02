# 职业决策实验室 (Career Decision Lab)

一个帮助大学生进行职业决策评估的Web应用，通过科学评估和匹配算法，为用户提供个性化的职业发展建议和行动清单。

## 技术栈

- **框架**: Next.js 16.1.6 (App Router)
- **UI库**: React 19.2.3
- **样式**: Tailwind CSS v4
- **图表**: Recharts 3.7.0
- **图标**: Lucide React
- **语言**: TypeScript

## 功能特性

### 1. 欢迎页
- 产品介绍和功能说明
- 测试流程指引
- 简约现代的UI设计

### 2. 基础信息采集
- 年级选择
- 专业输入
- 考研计划
- 当前困惑描述
- 表单验证和错误提示

### 3. 能力评估问卷
- 24道Likert量表题目
- 6个维度评估：
  - S (结构化能力)
  - A (抽象逻辑能力)
  - R (风险承受度)
  - E (表达倾向)
  - X (执行抗压能力)
  - C (共情能力)
- 进度保存功能
- 快速跳转功能

### 4. 结果分析页
- **雷达图展示**: 6维度能力可视化
- **主路径推荐**: 最匹配的职业路径
  - 路径名称和描述
  - 匹配度百分比
  - 适合原因分析
  - 难度提醒
- **演化路径**: 未来可发展的方向
- **30天行动清单**: 4周具体任务计划
- **模型说明**: 评估算法解释
- **分享功能**: 支持分享测试结果

### 5. 数据持久化
- LocalStorage保存测试进度
- 自动保存答案
- 保存最近5次测试结果

## 8种职业路径

1. **稳定体制型** - 适合追求稳定、低风险偏好的用户
2. **专业深耕型** - 适合希望在专业领域深入发展的用户
3. **技术应用型** - 适合喜欢技术应用的实践型人才
4. **产品策略型** - 适合具备结构化思维和抽象能力的用户
5. **增长运营型** - 适合执行力强、能承受压力的用户
6. **内容表达型** - 适合擅长表达和沟通的用户
7. **教育助人型** - 适合具有共情能力、喜欢帮助他人的用户
8. **创业探索型** - 适合高风险承受度、全面的用户

## 安装和运行

### 前置要求
- Node.js 18.x 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖
```bash
npm install
```

### 运行开发服务器
```bash
npm run dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动

### 构建生产版本
```bash
npm run build
npm start
```

## 项目结构

```
career-decision-lab/
├── app/                      # Next.js App Router页面
│   ├── page.tsx             # 欢迎页
│   ├── info/                # 基础信息采集页
│   ├── questionnaire/       # 问卷页
│   ├── results/             # 结果页
│   └── layout.tsx           # 根布局
├── components/              # 可复用组件
├── data/                    # 数据文件
│   ├── questions.ts         # 问卷题目
│   ├── paths.ts            # 职业路径定义和匹配算法
│   └── actionPlans.ts      # 行动计划
├── lib/                     # 工具函数
│   ├── calculator.ts       # 核心计算引擎
│   └── storage.ts          # localStorage工具
├── types/                   # TypeScript类型定义
│   └── index.ts
└── package.json
```

## 核心算法

### 匹配算法
使用加权矩阵模型，通过计算用户能力特征向量与职业路径理想特征向量的相似度：

```typescript
matchScore = Σ(userScore[i] × pathVector[i])
matchPercent = (matchScore / maxPossibleScore) × 100
```

### 维度计算
每个维度的得分为该维度下所有题目的平均值：

```typescript
dimensionScore = average(questionScores)
```

## 数据安全

- 所有数据仅保存在用户浏览器本地
- 不上传到任何服务器
- 不收集用户隐私信息
- 支持清除本地数据

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 开发说明

### 添加新的职业路径
在 `data/paths.ts` 中修改：
1. 添加新的路径ID到 `CareerPath` 类型
2. 在 `PATH_VECTORS` 中定义特征向量
3. 在 `PATH_DESCRIPTIONS` 中添加路径描述

### 修改问卷题目
在 `data/questions.ts` 中修改 `QUESTIONS` 数组

### 自定义行动计划
在 `data/actionPlans.ts` 中修改 `ACTION_PLANS` 对象

## 待优化功能

- [ ] 添加深色模式切换按钮
- [ ] 优化移动端体验
- [ ] 添加结果PDF导出功能
- [ ] 支持多次测试对比
- [ ] 添加更多职业细分路径
- [ ] 引入AI生成个性化建议

## 许可证

MIT

## 作者

基于PRD文档开发的MVP版本

---

**注意**: 本工具仅提供参考建议，不替代专业职业规划咨询。测试结果基于当前状态，会随着成长而变化。
