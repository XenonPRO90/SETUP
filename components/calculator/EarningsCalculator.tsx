"use client";

import React, { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

interface Level {
  name: string;
  percent: number;
  gv: number;
  totalCheck: number;
  networkSize: number;
  action: string;
  color: string;
  personal: number;
  team: number;
  rankBonus: number;
}

const LEVELS: Level[] = [
  {
    name: "Partner",
    percent: 20,
    gv: 5_000,
    totalCheck: 1_950,
    networkSize: 4,
    action: "4 регистрации на $1 000 + ББС",
    color: "#A4B5D6",
    personal: 1_950,
    team: 0,
    rankBonus: 0,
  },
  {
    name: "Gold",
    percent: 25,
    gv: 17_000,
    totalCheck: 1_100,
    networkSize: 16,
    action: "1-я линия по 4 регистрации",
    color: "#F7D46D",
    personal: 250,
    team: 750,
    rankBonus: 100,
  },
  {
    name: "Sapphire",
    percent: 30,
    gv: 53_000,
    totalCheck: 6_400,
    networkSize: 64,
    action: "2-я линия по 4 регистрации",
    color: "#73D2FF",
    personal: 300,
    team: 5_600,
    rankBonus: 500,
  },
  {
    name: "Ruby",
    percent: 35,
    gv: 161_000,
    totalCheck: 18_700,
    networkSize: 256,
    action: "3-я линия по 4 регистрации",
    color: "#FF6B8A",
    personal: 350,
    team: 17_350,
    rankBonus: 1_000,
  },
  {
    name: "Emerald",
    percent: 40,
    gv: 485_000,
    totalCheck: 53_600,
    networkSize: 1_024,
    action: "4-я линия по 4 регистрации",
    color: "#8DF9D1",
    personal: 400,
    team: 50_700,
    rankBonus: 2_500,
  },
  {
    name: "Diamond",
    percent: 45,
    gv: 1_457_000,
    totalCheck: 204_400,
    networkSize: 4_096,
    action: "5-я линия по 4 регистрации",
    color: "#B8F2FF",
    personal: 450,
    team: 198_950,
    rankBonus: 5_000,
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

function pct(part: number, total: number) {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

// ─── Component ──────────────────────────────────────────────────────────────

export function EarningsCalculator() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showCompare, setShowCompare] = useState(false);
  const level = LEVELS[activeIdx];

  const maxCheck = LEVELS[LEVELS.length - 1].totalCheck;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Level Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        {LEVELS.map((l, i) => (
          <button
            key={l.name}
            onClick={() => { setActiveIdx(i); setShowCompare(false); }}
            className="flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
            style={
              i === activeIdx
                ? { background: l.color, color: "#0B1324", boxShadow: `0 0 20px ${l.color}40` }
                : { background: "rgba(255,255,255,0.06)", color: "#A4B5D6", border: "1px solid rgba(255,255,255,0.1)" }
            }
          >
            {l.name}
          </button>
        ))}
      </div>

      {!showCompare ? (
        <div
          className="rounded-3xl p-6 md:p-8 transition-all duration-500"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${level.color}30`,
            boxShadow: `0 0 40px ${level.color}10`,
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: level.color, boxShadow: `0 0 12px ${level.color}80` }}
            />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: level.color }}>
              {level.name}
            </h2>
            <span className="ml-auto text-sm font-medium px-3 py-1 rounded-full" style={{ background: `${level.color}20`, color: level.color }}>
              {level.percent}%
            </span>
          </div>

          {/* Total Check */}
          <div className="text-center mb-8">
            <p className="text-text-secondary text-sm mb-1">Ваш месячный доход</p>
            <p className="text-5xl md:text-6xl font-bold text-white">
              ${fmt(level.totalCheck)}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-xs text-text-secondary mb-1">GV</p>
              <p className="text-lg font-bold text-white">${fmt(level.gv)}</p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-xs text-text-secondary mb-1">Сеть</p>
              <p className="text-lg font-bold text-white">{fmt(level.networkSize)}</p>
              <p className="text-xs text-text-secondary">чел.</p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-xs text-text-secondary mb-1">Действие</p>
              <p className="text-xs font-medium text-white leading-tight">{level.action}</p>
            </div>
          </div>

          {/* Income Breakdown */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">
              Откуда берётся доход
            </h3>

            {/* Breakdown bars */}
            <div className="space-y-3">
              {level.personal > 0 && (
                <BreakdownRow
                  label="Личные продажи"
                  amount={level.personal}
                  total={level.totalCheck}
                  color="#8DF9D1"
                  tooltip={`${level.percent}% от личного оборота`}
                />
              )}
              {level.team > 0 && (
                <BreakdownRow
                  label="Доход с команды"
                  amount={level.team}
                  total={level.totalCheck}
                  color="#73D2FF"
                  tooltip={`Разница % между вашим уровнем (${level.percent}%) и уровнем партнёров`}
                />
              )}
              {level.rankBonus > 0 && (
                <BreakdownRow
                  label="Ранговый бонус"
                  amount={level.rankBonus}
                  total={level.totalCheck}
                  color="#F7D46D"
                  tooltip={`Бонус за достижение уровня ${level.name}`}
                />
              )}
            </div>

            {/* Donut-style summary bar */}
            <div className="mt-5 h-3 rounded-full overflow-hidden flex" style={{ background: "rgba(255,255,255,0.06)" }}>
              {level.personal > 0 && (
                <div
                  className="h-full transition-all duration-700"
                  style={{ width: `${pct(level.personal, level.totalCheck)}%`, background: "#8DF9D1" }}
                />
              )}
              {level.team > 0 && (
                <div
                  className="h-full transition-all duration-700"
                  style={{ width: `${pct(level.team, level.totalCheck)}%`, background: "#73D2FF" }}
                />
              )}
              {level.rankBonus > 0 && (
                <div
                  className="h-full transition-all duration-700"
                  style={{ width: `${pct(level.rankBonus, level.totalCheck)}%`, background: "#F7D46D" }}
                />
              )}
            </div>
          </div>

          {/* Tooltip example for team income */}
          {level.team > 0 && activeIdx > 0 && (
            <div className="rounded-2xl p-4 mb-6 text-sm" style={{ background: "rgba(115,210,255,0.08)", border: "1px solid rgba(115,210,255,0.15)" }}>
              <p className="text-accent-sky font-medium mb-1">Как работает разница %</p>
              <p className="text-text-secondary">
                Вы — {level.name} ({level.percent}%), ваш партнёр — {LEVELS[activeIdx - 1].name} ({LEVELS[activeIdx - 1].percent}%).
                Разница {level.percent}% − {LEVELS[activeIdx - 1].percent}% = {level.percent - LEVELS[activeIdx - 1].percent}% — это ваш доход с оборота партнёра.
              </p>
            </div>
          )}

          {/* Compare button */}
          <button
            onClick={() => setShowCompare(true)}
            className="w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 mb-4"
            style={{ background: "rgba(255,255,255,0.06)", color: "#A4B5D6", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Сравнить все уровни
          </button>

          {/* CTA */}
          <a
            href="#"
            className="block w-full text-center py-4 rounded-full font-semibold text-black transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, #8DF9D1, #73D2FF)`,
              boxShadow: "0 15px 45px rgba(115,210,255,0.25)",
            }}
          >
            Хочу начать
          </a>
        </div>
      ) : (
        /* Compare View */
        <div
          className="rounded-3xl p-6 md:p-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Сравнение уровней</h3>
            <button
              onClick={() => setShowCompare(false)}
              className="text-sm text-text-secondary hover:text-white transition-colors"
            >
              ← Назад
            </button>
          </div>

          <div className="space-y-4">
            {LEVELS.map((l, i) => (
              <button
                key={l.name}
                onClick={() => { setActiveIdx(i); setShowCompare(false); }}
                className="w-full text-left"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: l.color }} />
                  <span className="text-sm font-semibold text-white">{l.name}</span>
                  <span className="ml-auto text-sm font-bold" style={{ color: l.color }}>
                    ${fmt(l.totalCheck)}
                  </span>
                </div>
                <div className="ml-6 h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.max((l.totalCheck / maxCheck) * 100, 1)}%`,
                      background: `linear-gradient(90deg, ${l.color}, ${l.color}80)`,
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">От Partner до Diamond</span>
              <span className="font-bold" style={{ color: "#F7D46D" }}>
                ×{Math.round(LEVELS[LEVELS.length - 1].totalCheck / LEVELS[0].totalCheck)} рост дохода
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Breakdown Row ──────────────────────────────────────────────────────────

function BreakdownRow({
  label,
  amount,
  total,
  color,
  tooltip,
}: {
  label: string;
  amount: number;
  total: number;
  color: string;
  tooltip: string;
}) {
  const [showTip, setShowTip] = useState(false);
  const percentage = pct(amount, total);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <button
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors"
          onClick={() => setShowTip(!showTip)}
        >
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
          {label}
          <span className="text-xs opacity-50">ⓘ</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">${fmt(amount)}</span>
          <span className="text-xs text-text-secondary">{percentage}%</span>
        </div>
      </div>
      {showTip && (
        <p className="text-xs text-text-secondary ml-5 mb-1 pl-0.5">{tooltip}</p>
      )}
      <div className="h-1.5 rounded-full overflow-hidden ml-5" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, background: color }}
        />
      </div>
    </div>
  );
}
