"use client";

import React, { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

interface IncomeLine {
  label: string;
  sublabel?: string;
  myPercent: number;
  theirPercent?: number;
  amount: number;
  color: string;
}

interface Level {
  name: string;
  percent: number;
  gv: number;
  totalCheck: number;
  networkSize: number;
  action: string;
  color: string;
  lines: IncomeLine[];
}

// Correct differential model: income from each depth = 5% × volume at that depth
// Each person recruits 4, each buys $1,000 product
// Ranks: Partner(20%) → Gold(25%) → Sapphire(30%) → Ruby(35%) → Emerald(40%) → Diamond(45%)
// Differential is always (MY% − 1st-line-leader%) applied to their ENTIRE group volume

const LEVELS: Level[] = [
  {
    name: "Partner",
    percent: 20,
    gv: 5_000,
    totalCheck: 1_950,
    networkSize: 4,
    action: "4 регистрации + ББС",
    color: "#A4B5D6",
    lines: [
      {
        label: "ББС (Быстрый Старт)",
        sublabel: "200+200+200+250+100+1000",
        myPercent: 20,
        amount: 1_950,
        color: "#8DF9D1",
      },
    ],
  },
  {
    name: "Gold",
    percent: 25,
    gv: 21_000,
    totalCheck: 1_100,
    networkSize: 20,
    action: "3 Partner (PPP) в 1-й линии",
    color: "#F7D46D",
    lines: [
      {
        label: "1-я линия",
        sublabel: "4 Partner (20%)",
        myPercent: 25,
        theirPercent: 20,
        amount: 200,
        color: "#73D2FF",
      },
      {
        label: "2-я линия",
        sublabel: "16 новых",
        myPercent: 25,
        theirPercent: 20,
        amount: 800,
        color: "#8DA0FF",
      },
      {
        label: "Ранговый бонус",
        sublabel: "за Gold",
        myPercent: 0,
        amount: 100,
        color: "#F7D46D",
      },
    ],
  },
  {
    name: "Sapphire",
    percent: 30,
    gv: 85_000,
    totalCheck: 4_700,
    networkSize: 84,
    action: "3 Gold (GGG) в 1-й линии",
    color: "#73D2FF",
    lines: [
      {
        label: "1-я линия",
        sublabel: "4 Gold (25%)",
        myPercent: 30,
        theirPercent: 25,
        amount: 200,
        color: "#73D2FF",
      },
      {
        label: "2-я линия",
        sublabel: "16 Partner",
        myPercent: 30,
        theirPercent: 25,
        amount: 800,
        color: "#8DA0FF",
      },
      {
        label: "3-я линия",
        sublabel: "64 новых",
        myPercent: 30,
        theirPercent: 25,
        amount: 3_200,
        color: "#C4A0FF",
      },
      {
        label: "Ранговый бонус",
        sublabel: "за Sapphire",
        myPercent: 0,
        amount: 500,
        color: "#F7D46D",
      },
    ],
  },
  {
    name: "Ruby",
    percent: 35,
    gv: 341_000,
    totalCheck: 18_000,
    networkSize: 340,
    action: "3 Sapphire (SSS) в 1-й линии",
    color: "#FF6B8A",
    lines: [
      {
        label: "1-я линия",
        sublabel: "4 Sapphire (30%)",
        myPercent: 35,
        theirPercent: 30,
        amount: 200,
        color: "#73D2FF",
      },
      {
        label: "2-я линия",
        sublabel: "16 Gold",
        myPercent: 35,
        theirPercent: 30,
        amount: 800,
        color: "#8DA0FF",
      },
      {
        label: "3-я линия",
        sublabel: "64 Partner",
        myPercent: 35,
        theirPercent: 30,
        amount: 3_200,
        color: "#C4A0FF",
      },
      {
        label: "4-я линия",
        sublabel: "256 новых",
        myPercent: 35,
        theirPercent: 30,
        amount: 12_800,
        color: "#FF6B8A",
      },
      {
        label: "Ранговый бонус",
        sublabel: "за Ruby",
        myPercent: 0,
        amount: 1_000,
        color: "#F7D46D",
      },
    ],
  },
  {
    name: "Emerald",
    percent: 40,
    gv: 1_365_000,
    totalCheck: 70_700,
    networkSize: 1_364,
    action: "3 Ruby (RRR) в 1-й линии",
    color: "#8DF9D1",
    lines: [
      {
        label: "1-я линия",
        sublabel: "4 Ruby (35%)",
        myPercent: 40,
        theirPercent: 35,
        amount: 200,
        color: "#73D2FF",
      },
      {
        label: "2-я линия",
        sublabel: "16 Sapphire",
        myPercent: 40,
        theirPercent: 35,
        amount: 800,
        color: "#8DA0FF",
      },
      {
        label: "3-я линия",
        sublabel: "64 Gold",
        myPercent: 40,
        theirPercent: 35,
        amount: 3_200,
        color: "#C4A0FF",
      },
      {
        label: "4-я линия",
        sublabel: "256 Partner",
        myPercent: 40,
        theirPercent: 35,
        amount: 12_800,
        color: "#FF6B8A",
      },
      {
        label: "5-я линия",
        sublabel: "1,024 новых",
        myPercent: 40,
        theirPercent: 35,
        amount: 51_200,
        color: "#A4B5D6",
      },
      {
        label: "Ранговый бонус",
        sublabel: "за Emerald",
        myPercent: 0,
        amount: 2_500,
        color: "#F7D46D",
      },
    ],
  },
  {
    name: "Diamond",
    percent: 45,
    gv: 5_461_000,
    totalCheck: 278_000,
    networkSize: 5_460,
    action: "3 Emerald (EEE) в 1-й линии",
    color: "#B8F2FF",
    lines: [
      {
        label: "1-я линия",
        sublabel: "4 Emerald (40%)",
        myPercent: 45,
        theirPercent: 40,
        amount: 200,
        color: "#73D2FF",
      },
      {
        label: "2-я линия",
        sublabel: "16 Ruby",
        myPercent: 45,
        theirPercent: 40,
        amount: 800,
        color: "#8DA0FF",
      },
      {
        label: "3-я линия",
        sublabel: "64 Sapphire",
        myPercent: 45,
        theirPercent: 40,
        amount: 3_200,
        color: "#C4A0FF",
      },
      {
        label: "4-я линия",
        sublabel: "256 Gold",
        myPercent: 45,
        theirPercent: 40,
        amount: 12_800,
        color: "#FF6B8A",
      },
      {
        label: "5-я линия",
        sublabel: "1,024 Partner",
        myPercent: 45,
        theirPercent: 40,
        amount: 51_200,
        color: "#A4B5D6",
      },
      {
        label: "6-я линия",
        sublabel: "4,096 новых",
        myPercent: 45,
        theirPercent: 40,
        amount: 204_800,
        color: "#B8F2FF",
      },
      {
        label: "Ранговый бонус",
        sublabel: "за Diamond",
        myPercent: 0,
        amount: 5_000,
        color: "#F7D46D",
      },
    ],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

// ─── Component ──────────────────────────────────────────────────────────────

export function EarningsCalculator() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showCompare, setShowCompare] = useState(false);
  const level = LEVELS[activeIdx];

  const maxCheck = LEVELS[LEVELS.length - 1].totalCheck;
  const maxLineAmount = Math.max(...level.lines.map((l) => l.amount));

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Level Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        {LEVELS.map((l, i) => (
          <button
            key={l.name}
            onClick={() => {
              setActiveIdx(i);
              setShowCompare(false);
            }}
            className="flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
            style={
              i === activeIdx
                ? {
                    background: l.color,
                    color: "#0B1324",
                    boxShadow: `0 0 20px ${l.color}40`,
                  }
                : {
                    background: "rgba(255,255,255,0.06)",
                    color: "#A4B5D6",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }
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
              style={{
                background: level.color,
                boxShadow: `0 0 12px ${level.color}80`,
              }}
            />
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: level.color }}
            >
              {level.name}
            </h2>
            <span
              className="ml-auto text-sm font-medium px-3 py-1 rounded-full"
              style={{
                background: `${level.color}20`,
                color: level.color,
              }}
            >
              {level.percent}%
            </span>
          </div>

          {/* Total Check */}
          <div className="text-center mb-8">
            <p className="text-text-secondary text-sm mb-1">
              Ваш месячный доход
            </p>
            <p className="text-5xl md:text-6xl font-bold text-white">
              ${fmt(level.totalCheck)}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div
              className="rounded-2xl p-4 text-center"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <p className="text-xs text-text-secondary mb-1">GV</p>
              <p className="text-lg font-bold text-white">${fmt(level.gv)}</p>
            </div>
            <div
              className="rounded-2xl p-4 text-center"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <p className="text-xs text-text-secondary mb-1">Сеть</p>
              <p className="text-lg font-bold text-white">
                {fmt(level.networkSize)}
              </p>
              <p className="text-xs text-text-secondary">чел.</p>
            </div>
            <div
              className="rounded-2xl p-4 text-center"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <p className="text-xs text-text-secondary mb-1">Требование</p>
              <p className="text-xs font-medium text-white leading-tight">
                {level.action}
              </p>
            </div>
          </div>

          {/* Income Breakdown by Lines */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">
              Откуда берётся доход
            </h3>

            <div className="space-y-3">
              {level.lines.map((line, i) => {
                const barWidth = Math.max(
                  (line.amount / maxLineAmount) * 100,
                  3
                );
                const diff =
                  line.theirPercent !== undefined
                    ? line.myPercent - line.theirPercent
                    : null;

                return (
                  <div key={i} className="group">
                    {/* Line header */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: line.color }}
                        />
                        <span className="text-sm font-medium text-white truncate">
                          {line.label}
                        </span>
                        {line.sublabel && (
                          <span className="text-xs text-text-secondary hidden sm:inline">
                            {line.sublabel}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-white flex-shrink-0 ml-2">
                        ${fmt(line.amount)}
                      </span>
                    </div>

                    {/* Difference badge + bar */}
                    <div className="flex items-center gap-2 ml-4">
                      {diff !== null && (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0"
                          style={{
                            background: `${line.color}20`,
                            color: line.color,
                          }}
                        >
                          {level.percent}%−{line.theirPercent}% = {diff}%
                        </span>
                      )}
                      <div
                        className="flex-1 h-2 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${barWidth}%`, background: line.color }}
                        />
                      </div>
                    </div>

                    {/* Mobile sublabel */}
                    {line.sublabel && (
                      <p className="text-xs text-text-secondary ml-4 mt-1 sm:hidden">
                        {line.sublabel}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total bar */}
            <div
              className="mt-5 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-text-secondary">
                  ИТОГО
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: level.color }}
                >
                  ${fmt(level.totalCheck)}
                </span>
              </div>
              <div
                className="h-3 rounded-full overflow-hidden flex"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                {level.lines.map((line, i) => (
                  <div
                    key={i}
                    className="h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full"
                    style={{
                      width: `${(line.amount / level.totalCheck) * 100}%`,
                      background: line.color,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* How it works tooltip */}
          {activeIdx > 0 && (
            <div
              className="rounded-2xl p-4 mb-6 text-sm"
              style={{
                background: "rgba(115,210,255,0.08)",
                border: "1px solid rgba(115,210,255,0.15)",
              }}
            >
              <p className="text-accent-sky font-medium mb-1">
                Как это работает?
              </p>
              <p className="text-text-secondary">
                Вы — {level.name} ({level.percent}%). Ваш доход — это разница
                между вашим процентом и процентом лидера 1-й линии, умноженная на
                весь групповой объём. Разница {level.percent}%−
                {level.percent - 5}% = 5% одинакова для всех линий, но на каждой
                следующей линии в 4 раза больше людей — поэтому доход растёт
                экспоненциально.
              </p>
            </div>
          )}

          {/* Compare button */}
          <button
            onClick={() => setShowCompare(true)}
            className="w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 mb-4"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#A4B5D6",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Сравнить все уровни
          </button>

          {/* CTA */}
          <a
            href="#"
            className="block w-full text-center py-4 rounded-full font-semibold text-black transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #8DF9D1, #73D2FF)",
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
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">
              Сравнение уровней
            </h3>
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
                onClick={() => {
                  setActiveIdx(i);
                  setShowCompare(false);
                }}
                className="w-full text-left"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: l.color }}
                  />
                  <span className="text-sm font-semibold text-white">
                    {l.name}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {l.percent}%
                  </span>
                  <span
                    className="ml-auto text-sm font-bold"
                    style={{ color: l.color }}
                  >
                    ${fmt(l.totalCheck)}
                  </span>
                </div>
                <div
                  className="ml-6 h-2.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.max(
                        (l.totalCheck / maxCheck) * 100,
                        1
                      )}%`,
                      background: `linear-gradient(90deg, ${l.color}, ${l.color}80)`,
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          <div
            className="mt-6 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">
                От Partner до Diamond
              </span>
              <span className="font-bold" style={{ color: "#F7D46D" }}>
                ×
                {Math.round(
                  LEVELS[LEVELS.length - 1].totalCheck / LEVELS[0].totalCheck
                )}{" "}
                рост дохода
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
