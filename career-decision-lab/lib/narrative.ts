/**
 * 自动拼接模板引擎
 * 根据解释分析结果自动生成结果页文案
 */

import { PATH_DETAILS } from "@/data/pathDetails";
import { CareerPath } from "@/types";
import { PathExplanation } from "./explain";

export interface NarrativeText {
  whyFitText: string;
  cautionText: string;
}

export function buildNarrative(params: {
  path: CareerPath;
  explanation: PathExplanation;
}): NarrativeText {
  const { path, explanation } = params;
  const { summary, breakdown, topGaps } = explanation;
  const pathDetail = PATH_DETAILS[path];

  // ===== 找出你的优势维度（核心且高）=====
  const strengths = breakdown
    .filter((b) => b.status === "优势")
    .slice(0, 2)
    .map((b) => b.name);

  const strengthText =
    strengths.length > 0
      ? `你的「${strengths.join("」与「")}」维度处于优势区间，能够支撑这条路径的关键要求。`
      : `你的能力结构整体达到该路径基本要求，但仍需通过实践验证。`;

  // ===== 差距文本拼接 =====
  let gapText = "";
  if (topGaps.length > 0) {
    gapText = `当前需要优先补强「${topGaps
      .map((g) => g.name)
      .join("」与「")}」，否则会限制长期成长上限。`;
  } else {
    gapText = `当前核心维度已达到基本区间，可以通过项目实践逐步提升深度。`;
  }

  // ===== 最终拼接 =====
  const whyFitText = `
【能力结构匹配】
${summary.fit}
${strengthText}

【路径定位说明】
${pathDetail.fitReason}
`.trim();

  const cautionText = `
【成长代价与风险】
${pathDetail.riskNotice.slice(0, 2).join("；")}。

【能力补强建议】
${summary.caution}
${gapText}
`.trim();

  return {
    whyFitText,
    cautionText,
  };
}
