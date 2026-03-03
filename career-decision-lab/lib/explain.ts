/**
 * 路径解释引擎 v1.0
 * 根据用户分数和路径权重自动生成能力拆解分析
 */

import { PATH_VECTORS } from "@/data/paths";
import { PATH_DETAILS } from "@/data/pathDetails";
import { DIM_META, DimKey } from "@/data/dimensions";
import { DimensionScores, CareerPath } from "@/types";

const ORDER: DimKey[] = ["S", "A", "R", "E", "X", "C"];
const idx: Record<DimKey, number> = { S: 0, A: 1, R: 2, E: 3, X: 4, C: 5 };

// 把 0~5 的用户分数映射成"等级"
function level(score: number): string {
  if (score >= 4.0) return "高";
  if (score >= 3.0) return "中";
  if (score >= 2.4) return "偏低";
  return "低";
}

function status(required: number, userScore: number): { tag: string; note: string } {
  // required: 0~5 权重 -> 用区间映射成期望门槛
  // 权重>=4：期望高；权重=3：期望中；<=2：不作为核心
  const need = required >= 4 ? 4.0 : required === 3 ? 3.0 : 0.0;

  if (need === 0.0) {
    return {
      tag: "非核心",
      note: "该维度不是这条路径的核心要求。",
    };
  }

  if (userScore >= need + 1.0) {
    return {
      tag: "优势",
      note: `你的该维度(${userScore})高于该路径要求区间(${need}+)。`,
    };
  }

  if (userScore >= need) {
    return {
      tag: "可用",
      note: `该维度达到该路径基本要求(${need})，可通过实践增强。`,
    };
  }

  return {
    tag: "差距",
    note: `该维度(${userScore})低于该路径的典型要求(${need})，是优先补强点。`,
  };
}

export interface AbilityBreakdown {
  key: DimKey;
  name: string;
  requiredWeight: number; // 0~5
  you: number; // 0~5
  youLevel: string; // 高/中/偏低/低
  status: string; // 优势/可用/差距/非核心
  note: string;
}

export interface GapAnalysis {
  key: DimKey;
  name: string;
  why: string;
  improve: string[];
}

export interface PathExplanation {
  breakdown: AbilityBreakdown[];
  topGaps: GapAnalysis[];
  summary: {
    fit: string;
    caution: string;
  };
}

export function buildPathExplanation(params: {
  path: CareerPath;
  userScores: DimensionScores;
}): PathExplanation {
  const { path, userScores } = params;
  const w = PATH_VECTORS[path];

  // 1) 拆解表（6行）
  const breakdown: AbilityBreakdown[] = ORDER.map((k) => {
    const required = w[idx[k]];
    const userScore = userScores[k];
    const st = status(required, userScore);

    return {
      key: k,
      name: DIM_META[k].name,
      requiredWeight: required, // 0~5
      you: userScore, // 0~5
      youLevel: level(userScore), // 高/中/偏低/低
      status: st.tag, // 优势/可用/差距/非核心
      note: st.note,
    };
  });

  // 2) 获取该路径的核心维度（从PATH_DETAILS中获取）
  const pathDetail = PATH_DETAILS[path];
  const coreDimNames = pathDetail.coreAbilities.slice(0, 2); // 取前2个核心能力

  // 3) 差距优先级：在"核心维度"里找差距最大的两个
  const coreDims = breakdown
    .filter((b) => b.requiredWeight >= 4) // 核心要求
    .sort((a, b) => a.you - b.you); // 从低到高

  const topGaps: GapAnalysis[] = coreDims
    .filter((b) => b.status === "差距")
    .slice(0, 2)
    .map((b) => ({
      key: b.key,
      name: b.name,
      why: `该路径在「${b.name}」上权重较高(${b.requiredWeight})，但你当前水平为「${b.youLevel}」(${b.you})。`,
      improve: DIM_META[b.key].improve,
    }));

  // 4) 自动生成总结句（用于结果页文案）
  const summary = {
    fit: `这条路径的关键维度是「${coreDimNames.join("」与「")}」。你在这两项上的整体能力需要达到中等以上水平才能在这条路径上长期发展。`,
    caution:
      topGaps.length > 0
        ? `需要优先补强：${topGaps.map((g) => g.name).join("、")}，否则会限制该路径的成长上限。`
        : `当前核心维度已达到基本要求，建议通过项目实践验证与迭代。`,
  };

  return { breakdown, topGaps, summary };
}
