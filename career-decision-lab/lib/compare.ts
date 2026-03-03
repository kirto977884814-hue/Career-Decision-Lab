/**
 * Top1 vs Top2 对比解释引擎
 * 自动生成"为什么是Top1"的解释
 */

import { PATH_VECTORS, PATH_NAMES } from "@/data/paths";
import { DIM_META, DimKey } from "@/data/dimensions";
import { DimensionScores, CareerPath } from "@/types";

const ORDER: DimKey[] = ["S", "A", "R", "E", "X", "C"];
const idx: Record<DimKey, number> = { S: 0, A: 1, R: 2, E: 3, X: 4, C: 5 };

export interface KeyDimensionDiff {
  dim: DimKey;
  dimName: string;
  more: CareerPath; // 哪条路径更看重这个维度
  weightDiff: number; // 权重差值
  you: number; // 用户该维度分数
}

export interface PathComparison {
  text: string;
  keyDiffs: KeyDimensionDiff[];
}

export function compareTopPaths(
  userScores: DimensionScores,
  top1: CareerPath,
  top2: CareerPath
): PathComparison {
  const w1 = PATH_VECTORS[top1];
  const w2 = PATH_VECTORS[top2];

  // 找出两条路径"需求差异最大"的两个维度，用于解释为什么Top1赢
  const diffs = ORDER.map((k) => {
    const d = w1[idx[k]] - w2[idx[k]];
    return {
      k,
      diff: d,
      absDiff: Math.abs(d),
      you: userScores[k],
    };
  })
    .sort((a, b) => b.absDiff - a.absDiff)
    .slice(0, 2);

  const keyDiffs: KeyDimensionDiff[] = diffs.map((d) => {
    const dim = d.k;
    const more = d.diff > 0 ? top1 : top2; // 哪条更看重这个维度
    return {
      dim,
      dimName: DIM_META[dim].name,
      more,
      weightDiff: d.diff,
      you: d.you,
    };
  });

  const text = `「${PATH_NAMES[top1]}」与「${PATH_NAMES[top2]}」的主要差异在「${keyDiffs[0].dimName}」与「${keyDiffs[1].dimName}」。你的能力结构在这些维度上更接近「${PATH_NAMES[top1]}」的要求，因此当前更推荐「${PATH_NAMES[top1]}」。`;

  return { text, keyDiffs };
}
