"use client";

import React, { useState, useMemo } from "react";

// ─── Data Model ────────────────────────────────────────────────────────────

const PACKAGES = [
  { sp: 100, price: 100, label: "100 SP", days: 30 },
  { sp: 500, price: 500, label: "500 SP", days: 180 },
  { sp: 1000, price: 1000, label: "1000 SP", days: 360 },
] as const;

interface Rank {
  name: string;
  percent: number;
  requiredPartnerRank: string | null;
  requiredPartnerCount: number;
  requiredGV: number;
  rankBonus: number;
  color: string;
}

const RANKS: Rank[] = [
  { name: "Partner", percent: 20, requiredPartnerRank: null, requiredPartnerCount: 0, requiredGV: 0, rankBonus: 0, color: "#A4B5D6" },
  { name: "Gold", percent: 25, requiredPartnerRank: "Partner", requiredPartnerCount: 3, requiredGV: 1_000, rankBonus: 100, color: "#F7D46D" },
  { name: "Sapphire", percent: 30, requiredPartnerRank: "Gold", requiredPartnerCount: 3, requiredGV: 5_000, rankBonus: 500, color: "#73D2FF" },
  { name: "Ruby", percent: 35, requiredPartnerRank: "Sapphire", requiredPartnerCount: 3, requiredGV: 25_000, rankBonus: 1_000, color: "#FF6B8A" },
  { name: "Emerald", percent: 40, requiredPartnerRank: "Ruby", requiredPartnerCount: 3, requiredGV: 100_000, rankBonus: 2_500, color: "#8DF9D1" },
  { name: "Diamond", percent: 45, requiredPartnerRank: "Emerald", requiredPartnerCount: 3, requiredGV: 500_000, rankBonus: 5_000, color: "#B8F2FF" },
  { name: "Royal", percent: 50, requiredPartnerRank: "Diamond", requiredPartnerCount: 3, requiredGV: 2_500_000, rankBonus: 10_000, color: "#C4A0FF" },
  { name: "Imperial", percent: 55, requiredPartnerRank: "Royal", requiredPartnerCount: 3, requiredGV: 10_000_000, rankBonus: 25_000, color: "#FFD700" },
];

const QUICK_START_BONUSES: Record<number, number> = { 100: 100, 500: 500, 1000: 1000 };

const DEFAULT_FUNNEL = { viewToReg: 4, regToPurchase: 10, microPayment: 10 };

/** Format large view counts: 500K, 1M etc */
function formatViews(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(v % 1_000 === 0 ? 0 : 0)}K`;
  return v.toLocaleString();
}

// ─── Time-based GV helpers ─────────────────────────────────────────────────

/** How many times a package has been purchased/renewed by month M */
function renewals(packagePrice: number, month: number): number {
  if (month <= 0) return 0;
  if (packagePrice <= 100) return month; // monthly
  if (packagePrice <= 500) return Math.floor((month - 1) / 6) + 1; // every 6 months
  return Math.floor((month - 1) / 12) + 1; // yearly
}

/** Cumulative GV from organic partners (joined gradually, each renews on their own cycle) */
function organicPartnersGV(
  newPartnersPerMonth: number,
  organicPackage: number,
  month: number,
): number {
  // Partners join each month: K partners in month 1, K in month 2, etc.
  // Partner joining in month J has been active for (month - J + 1) months
  let gv = 0;
  for (let j = 1; j <= month; j++) {
    const activeMonths = month - j + 1;
    gv += newPartnersPerMonth * organicPackage * renewals(organicPackage, activeMonths);
  }
  return gv;
}

/** Cumulative GV at a given month */
function cumulativeGV(
  month: number,
  myPackage: number,
  myCreatorVolumePerMonth: number,
  networkerCount: number,
  networkerPackage: number,
  networkerTeamSize: number,
  networkerTeamPackage: number,
  creatorPartnerCount: number,
  creatorPartnerPackage: number,
  creatorMicroVolumePerMonth: number,
  organicNewPerMonth: number,
  organicPackage: number,
): number {
  return (
    myPackage * renewals(myPackage, month)
    + myCreatorVolumePerMonth * month
    + networkerCount * networkerPackage * renewals(networkerPackage, month)
    + networkerCount * networkerTeamSize * networkerTeamPackage * renewals(networkerTeamPackage, month)
    + creatorPartnerCount * creatorPartnerPackage * renewals(creatorPartnerPackage, month)
    + creatorPartnerCount * creatorMicroVolumePerMonth * month
    // Organic partners from content conversion
    + organicPartnersGV(organicNewPerMonth, organicPackage, month)
  );
}

// ─── Calculation Engine ────────────────────────────────────────────────────

function funnelPurchases(views: number, viewToReg: number, regToPurchase: number): number {
  return Math.floor(views * (viewToReg / 100) * (regToPurchase / 100));
}

function funnelVolume(views: number, viewToReg: number, regToPurchase: number, price: number): number {
  return funnelPurchases(views, viewToReg, regToPurchase) * price;
}

function rankFromGV(gv: number): { rank: Rank; index: number } {
  let idx = 0;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (gv >= RANKS[i].requiredGV) { idx = i; break; }
  }
  return { rank: RANKS[idx], index: idx };
}

function determineMyRank(
  totalGV: number,
  partnerRankCounts: Record<string, number>
): { rank: Rank; index: number } {
  let achievedIndex = 0;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    const r = RANKS[i];
    if (totalGV < r.requiredGV) continue;
    if (r.requiredPartnerCount > 0 && r.requiredPartnerRank) {
      const reqRankIdx = RANKS.findIndex(rr => rr.name === r.requiredPartnerRank);
      let qualified = 0;
      for (let j = reqRankIdx; j < RANKS.length; j++) {
        qualified += partnerRankCounts[RANKS[j].name] ?? 0;
      }
      if (qualified < r.requiredPartnerCount) continue;
    }
    achievedIndex = i;
    break;
  }
  return { rank: RANKS[achievedIndex], index: achievedIndex };
}

/** Count how many partners qualify at each rank level (for next-rank diagnostics) */
function countQualifiedPartners(
  partnerRankCounts: Record<string, number>,
  targetRankName: string
): number {
  const targetIdx = RANKS.findIndex(r => r.name === targetRankName);
  if (targetIdx < 0) return 0;
  let count = 0;
  for (let j = targetIdx; j < RANKS.length; j++) {
    count += partnerRankCounts[RANKS[j].name] ?? 0;
  }
  return count;
}

interface PartnerBranch {
  type: "networker" | "creator";
  branchGV: number;
  partnerRank: Rank;
  partnerRankIndex: number;
  differential: number;
  commission: number;
}

interface CalcResult {
  myRank: Rank;
  myRankIndex: number;
  totalGV: number;
  myCreatorVolume: number;
  myCreatorPurchases: number;
  myCreatorIncome: number;
  branches: PartnerBranch[];
  networkIncome: number;
  organicPartnersTotalAtMonth: number;
  organicIncome: number;
  organicGV: number;
  rankBonus: number;
  quickStartBonus: number;
  totalIncome: number;
  nextRank: Rank | null;
  nextRankProgress: number;
  partnerRankCounts: Record<string, number>;
  directPartnerCount: number;
}

interface ForecastMonth {
  month: number;
  gv: number;
  rank: Rank;
  rankIndex: number;
  monthlyIncome: number;
}

function calculate(
  myPackage: number,
  myViews: number,
  networkerCount: number,
  networkerPackage: number,
  networkerTeamSize: number,
  networkerTeamPackage: number,
  creatorPartnerCount: number,
  creatorPartnerPackage: number,
  creatorPartnerViews: number,
  funnel: { viewToReg: number; regToPurchase: number; microPayment: number },
  isQuickStart: boolean,
  month: number,
  regToPartner: number,
  organicPartnerPackage: number,
): CalcResult {
  const myCreatorPurchases = funnelPurchases(myViews, funnel.viewToReg, funnel.regToPurchase);
  const myCreatorVolumePerMonth = myCreatorPurchases * funnel.microPayment;
  const creatorMicroVolumePerMonth = funnelVolume(creatorPartnerViews, funnel.viewToReg, funnel.regToPurchase, funnel.microPayment);

  // Organic partners from content conversion
  const monthlyRegs = Math.floor(myViews * (funnel.viewToReg / 100));
  const organicNewPerMonth = Math.floor(monthlyRegs * (regToPartner / 100));
  const organicPartnersTotalAtMonth = organicNewPerMonth * month;

  // Cumulative GV at selected month
  const totalGV = cumulativeGV(
    month, myPackage, myCreatorVolumePerMonth,
    networkerCount, networkerPackage, networkerTeamSize, networkerTeamPackage,
    creatorPartnerCount, creatorPartnerPackage, creatorMicroVolumePerMonth,
    organicNewPerMonth, organicPartnerPackage,
  );

  const organicGV = organicPartnersGV(organicNewPerMonth, organicPartnerPackage, month);

  // ── Helper: branch GV at any month ──
  function netBranchGV(m: number) {
    return networkerPackage * renewals(networkerPackage, m)
      + networkerTeamSize * networkerTeamPackage * renewals(networkerTeamPackage, m);
  }
  function creBranchGV(m: number) {
    return creatorPartnerPackage * renewals(creatorPartnerPackage, m)
      + creatorMicroVolumePerMonth * m;
  }

  // Cumulative branch GVs (for rank determination)
  const networkerBranchGV = netBranchGV(month);
  const creatorBranchGV = creBranchGV(month);

  // NEW volume this specific month (for monthly income calculation)
  const networkerBranchNewGV = netBranchGV(month) - netBranchGV(month - 1);
  const creatorBranchNewGV = creBranchGV(month) - creBranchGV(month - 1);

  const partnerRankCounts: Record<string, number> = {};
  const branches: PartnerBranch[] = [];

  for (let i = 0; i < networkerCount; i++) {
    const { rank: pRank, index: pIdx } = rankFromGV(networkerBranchGV);
    partnerRankCounts[pRank.name] = (partnerRankCounts[pRank.name] ?? 0) + 1;
    branches.push({ type: "networker", branchGV: networkerBranchGV, partnerRank: pRank, partnerRankIndex: pIdx, differential: 0, commission: 0 });
  }

  for (let i = 0; i < creatorPartnerCount; i++) {
    const { rank: pRank, index: pIdx } = rankFromGV(creatorBranchGV);
    partnerRankCounts[pRank.name] = (partnerRankCounts[pRank.name] ?? 0) + 1;
    branches.push({ type: "creator", branchGV: creatorBranchGV, partnerRank: pRank, partnerRankIndex: pIdx, differential: 0, commission: 0 });
  }

  // Add organic partners to rank counts (they are Partner rank)
  if (organicPartnersTotalAtMonth > 0) {
    partnerRankCounts["Partner"] = (partnerRankCounts["Partner"] ?? 0) + organicPartnersTotalAtMonth;
  }

  const directPartnerCount = networkerCount + creatorPartnerCount + organicPartnersTotalAtMonth;
  const { rank: myRank, index: myRankIndex } = determineMyRank(totalGV, partnerRankCounts);

  // Monthly creator income (this month's micropayments × rank %)
  const myCreatorVolume = myCreatorVolumePerMonth;
  const myCreatorIncome = (myCreatorVolume * myRank.percent) / 100;

  // Differential income from networkers and creator-partners
  let networkIncome = 0;
  for (const branch of branches) {
    branch.differential = myRank.percent - branch.partnerRank.percent;
    if (branch.differential > 0 && month > 0) {
      const totalEarnedFromBranch = (branch.branchGV * branch.differential) / 100;
      branch.commission = totalEarnedFromBranch / month;
    }
    networkIncome += branch.commission;
  }

  // Organic partner income: they are Partner (20%), differential = myRank% - 20%
  const organicDiff = myRank.percent - 20; // organic partners are always Partner rank
  const organicIncome = organicDiff > 0 && month > 0
    ? (organicGV * organicDiff) / 100 / month
    : 0;

  const rankBonus = myRank.rankBonus;
  const quickStartBonus = isQuickStart && directPartnerCount >= 4 ? QUICK_START_BONUSES[myPackage] ?? 0 : 0;
  const totalIncome = myCreatorIncome + networkIncome + organicIncome + rankBonus + quickStartBonus;

  const nextRank = myRankIndex < RANKS.length - 1 ? RANKS[myRankIndex + 1] : null;
  const nextRankProgress = nextRank ? Math.min(100, (totalGV / nextRank.requiredGV) * 100) : 100;

  return {
    myRank, myRankIndex, totalGV,
    myCreatorVolume, myCreatorPurchases, myCreatorIncome,
    branches, networkIncome,
    organicPartnersTotalAtMonth, organicIncome, organicGV,
    rankBonus, quickStartBonus, totalIncome,
    nextRank, nextRankProgress,
    partnerRankCounts, directPartnerCount,
  };
}

/** Generate 12-month forecast */
function generateForecast(
  myPackage: number, myViews: number,
  networkerCount: number, networkerPackage: number, networkerTeamSize: number, networkerTeamPackage: number,
  creatorPartnerCount: number, creatorPartnerPackage: number, creatorPartnerViews: number,
  funnel: { viewToReg: number; regToPurchase: number; microPayment: number },
  isQuickStart: boolean,
  regToPartner: number, organicPartnerPackage: number,
): ForecastMonth[] {
  const months: ForecastMonth[] = [];
  for (let m = 1; m <= 12; m++) {
    const r = calculate(
      myPackage, myViews,
      networkerCount, networkerPackage, networkerTeamSize, networkerTeamPackage,
      creatorPartnerCount, creatorPartnerPackage, creatorPartnerViews,
      funnel, isQuickStart, m, regToPartner, organicPartnerPackage,
    );
    months.push({
      month: m,
      gv: r.totalGV,
      rank: r.myRank,
      rankIndex: r.myRankIndex,
      monthlyIncome: r.myCreatorIncome + r.networkIncome + r.organicIncome,
    });
  }
  return months;
}

// ─── UI Components ─────────────────────────────────────────────────────────

function PackageSelector({ value, onChange, accentColor = "accent-mint" }: { value: number; onChange: (v: number) => void; accentColor?: string }) {
  const colorMap: Record<string, string> = {
    "accent-mint": "border-accent-mint bg-accent-mint/10 shadow-[0_0_30px_rgba(141,249,209,0.15)]",
    gold: "border-gold bg-gold/10 shadow-[0_0_30px_rgba(247,212,109,0.15)]",
    "accent-sky": "border-accent-sky bg-accent-sky/10 shadow-[0_0_30px_rgba(115,210,255,0.15)]",
  };
  const active = colorMap[accentColor] ?? colorMap["accent-mint"];
  return (
    <div className="grid grid-cols-3 gap-2">
      {PACKAGES.map((pkg) => (
        <button key={pkg.sp} onClick={() => onChange(pkg.price)}
          className={`relative p-3 rounded-xl border transition-all duration-300 text-center ${value === pkg.price ? active : "border-white/10 bg-white/5 hover:border-white/20"}`}>
          <div className="text-lg font-display font-bold text-white">{pkg.sp}</div>
          <div className="text-[10px] text-text-muted">SP · {pkg.days}д</div>
        </button>
      ))}
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, suffix, formatValue }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; suffix?: string; formatValue?: (v: number) => string;
}) {
  const display = formatValue ? formatValue(value) : `${value}${suffix ?? ""}`;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-text-secondary text-sm">{label}</span>
        <span className="text-white font-display font-bold text-lg">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-mint [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(141,249,209,0.5)] [&::-webkit-slider-thumb]:cursor-pointer" />
      <div className="flex justify-between text-xs text-text-muted mt-1">
        <span>{min}</span><span>{formatValue ? formatValue(max) : `${max}`}</span>
      </div>
    </div>
  );
}

function RankBadge({ rank, size = "md" }: { rank: Rank; size?: "sm" | "md" | "lg" }) {
  const s = { sm: "text-xs px-2 py-1", md: "text-sm px-3 py-1.5", lg: "text-base px-4 py-2" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${s[size]}`}
      style={{ backgroundColor: rank.color + "20", color: rank.color, border: `1px solid ${rank.color}40` }}>
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: rank.color }} />
      {rank.name}
    </span>
  );
}

function StatCard({ label, value, accent, sub }: { label: string; value: string; accent?: boolean; sub?: string }) {
  return (
    <div className="glass-card p-4 text-center">
      <div className="text-text-muted text-[10px] uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-xl md:text-2xl font-display font-bold ${accent ? "text-gradient-gold" : "text-white"}`}>{value}</div>
      {sub && <div className="text-text-muted text-[10px] mt-1">{sub}</div>}
    </div>
  );
}

function formatMoney(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return n.toFixed(0);
}

function FunnelPreview({ views, viewToReg, regToPurchase, microPayment, label }: {
  views: number; viewToReg: number; regToPurchase: number; microPayment: number; label: string;
}) {
  const regs = Math.floor(views * (viewToReg / 100));
  const purchases = Math.floor(regs * (regToPurchase / 100));
  const volume = purchases * microPayment;
  return (
    <div className="bg-white/5 rounded-xl p-3">
      <div className="text-[10px] text-text-muted mb-2">{label}</div>
      <div className="flex items-center gap-1 text-xs">
        <div className="flex-1 text-center"><div className="text-white font-bold text-sm">{views.toLocaleString()}</div><div className="text-text-muted text-[9px]">просмотры</div></div>
        <div className="text-gold text-[10px]">→{viewToReg}%</div>
        <div className="flex-1 text-center"><div className="text-white font-bold text-sm">{regs}</div><div className="text-text-muted text-[9px]">регистрации</div></div>
        <div className="text-gold text-[10px]">→{regToPurchase}%</div>
        <div className="flex-1 text-center"><div className="text-accent-mint font-bold text-sm">{purchases}</div><div className="text-text-muted text-[9px]">покупки</div></div>
        <div className="text-gold text-[10px]">=</div>
        <div className="flex-1 text-center"><div className="text-gold font-bold text-sm">${volume}</div><div className="text-text-muted text-[9px]">объём</div></div>
      </div>
    </div>
  );
}

function IncomeRow({ icon, iconBg, iconColor, barColor, label, detail, amount, volume, maxAmount }: {
  icon: string; iconBg: string; iconColor: string; barColor: string; label: string; detail: string; amount: number; volume?: number; maxAmount: number;
}) {
  const barWidth = maxAmount > 0 ? Math.max(2, (amount / maxAmount) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className={`w-5 h-5 rounded-full ${iconBg} ${iconColor} text-[10px] font-bold flex items-center justify-center`}>{icon}</span>
          <span className="text-text-secondary text-sm">{label}</span>
          <span className="text-text-muted text-[10px]">{detail}</span>
        </div>
        <span className="text-white font-medium text-sm">${formatMoney(amount)}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${barWidth}%` }} />
      </div>
      {volume !== undefined && volume > 0 && <div className="text-right text-text-muted text-[10px] mt-0.5">объём: ${formatMoney(volume)}</div>}
    </div>
  );
}

function ScenarioButton({ color, title, desc, onClick }: { color: string; title: string; desc: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`p-3 rounded-xl border border-white/10 bg-white/5 hover:border-${color}/40 transition-all text-left`}>
      <div className={`text-${color} text-sm font-medium mb-0.5`}>{title}</div>
      <div className="text-text-muted text-[10px]">{desc}</div>
    </button>
  );
}

function RanksTable({ currentRankIndex }: { currentRankIndex: number }) {
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-white/10">
          <th className="text-left py-2 px-2 text-text-muted font-medium text-xs">Ранг</th>
          <th className="text-center py-2 px-2 text-text-muted font-medium text-xs">%</th>
          <th className="text-center py-2 px-2 text-text-muted font-medium text-xs">GV</th>
          <th className="text-center py-2 px-2 text-text-muted font-medium text-xs">Партнёры</th>
          <th className="text-right py-2 px-2 text-text-muted font-medium text-xs">Бонус</th>
        </tr></thead>
        <tbody>{RANKS.map((r, i) => (
          <tr key={r.name} className={`border-b border-white/5 transition-colors ${i === currentRankIndex ? "bg-white/10" : i < currentRankIndex ? "opacity-40" : ""}`}>
            <td className="py-2 px-2"><RankBadge rank={r} size="sm" /></td>
            <td className="text-center py-2 px-2 text-white font-medium">{r.percent}%</td>
            <td className="text-center py-2 px-2 text-text-secondary text-xs">{r.requiredGV > 0 ? formatMoney(r.requiredGV) : "—"}</td>
            <td className="text-center py-2 px-2 text-text-secondary text-xs">{r.requiredPartnerCount > 0 ? `${r.requiredPartnerCount} ${r.requiredPartnerRank}` : "—"}</td>
            <td className="text-right py-2 px-2 text-white font-medium text-xs">{r.rankBonus > 0 ? `$${formatMoney(r.rankBonus)}` : "—"}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

// ─── Forecast Table ────────────────────────────────────────────────────────

function ForecastTable({ forecast, selectedMonth }: { forecast: ForecastMonth[]; selectedMonth: number }) {
  const maxGV = Math.max(...forecast.map(f => f.gv), 1);
  return (
    <div className="space-y-1.5">
      {forecast.map((f) => {
        const isSelected = f.month === selectedMonth;
        const barWidth = (f.gv / maxGV) * 100;
        return (
          <div key={f.month} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${isSelected ? "bg-white/10 ring-1 ring-accent-mint/30" : ""}`}>
            <span className={`text-xs w-8 font-display ${isSelected ? "text-accent-mint font-bold" : "text-text-muted"}`}>
              M{f.month}
            </span>
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${barWidth}%`, backgroundColor: f.rank.color }} />
            </div>
            <RankBadge rank={f.rank} size="sm" />
            <span className="text-text-secondary text-xs w-16 text-right">${formatMoney(f.gv)}</span>
            <span className="text-accent-mint text-xs w-16 text-right font-medium">${formatMoney(f.monthlyIncome)}/м</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Calculator ───────────────────────────────────────────────────────

export function IncomeCalculator() {
  const [myPackage, setMyPackage] = useState(1000);
  const [quickStart, setQuickStart] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const [myViews, setMyViews] = useState(5000);

  const [networkerCount, setNetworkerCount] = useState(3);
  const [networkerPackage, setNetworkerPackage] = useState(500);
  const [networkerTeamSize, setNetworkerTeamSize] = useState(10);
  const [networkerTeamPackage, setNetworkerTeamPackage] = useState(500);

  const [creatorPartnerCount, setCreatorPartnerCount] = useState(5);
  const [creatorPartnerPackage, setCreatorPartnerPackage] = useState(100);
  const [creatorPartnerViews, setCreatorPartnerViews] = useState(2000);

  // Organic partner conversion
  const [regToPartner, setRegToPartner] = useState(2);
  const [organicPartnerPackage, setOrganicPartnerPackage] = useState(500);

  const [viewToReg, setViewToReg] = useState(DEFAULT_FUNNEL.viewToReg);
  const [regToPurchase, setRegToPurchase] = useState(DEFAULT_FUNNEL.regToPurchase);
  const [showFunnelSettings, setShowFunnelSettings] = useState(false);
  const microPayment = DEFAULT_FUNNEL.microPayment;

  const funnel = useMemo(() => ({ viewToReg, regToPurchase, microPayment }), [viewToReg, regToPurchase, microPayment]);

  const result = useMemo(() => calculate(
    myPackage, myViews,
    networkerCount, networkerPackage, networkerTeamSize, networkerTeamPackage,
    creatorPartnerCount, creatorPartnerPackage, creatorPartnerViews,
    funnel, quickStart, selectedMonth, regToPartner, organicPartnerPackage,
  ), [myPackage, myViews, networkerCount, networkerPackage, networkerTeamSize, networkerTeamPackage,
    creatorPartnerCount, creatorPartnerPackage, creatorPartnerViews, funnel, quickStart, selectedMonth,
    regToPartner, organicPartnerPackage]);

  const forecast = useMemo(() => generateForecast(
    myPackage, myViews,
    networkerCount, networkerPackage, networkerTeamSize, networkerTeamPackage,
    creatorPartnerCount, creatorPartnerPackage, creatorPartnerViews,
    funnel, quickStart, regToPartner, organicPartnerPackage,
  ), [myPackage, myViews, networkerCount, networkerPackage, networkerTeamSize, networkerTeamPackage,
    creatorPartnerCount, creatorPartnerPackage, creatorPartnerViews, funnel, quickStart,
    regToPartner, organicPartnerPackage]);

  const networkerBranches = result.branches.filter(b => b.type === "networker");
  const creatorBranches = result.branches.filter(b => b.type === "creator");
  const totalNetworkerCommission = networkerBranches.reduce((s, b) => s + b.commission, 0);
  const totalCreatorCommission = creatorBranches.reduce((s, b) => s + b.commission, 0);
  const totalNetworkerGV = networkerBranches.reduce((s, b) => s + b.branchGV, 0);
  const totalCreatorGV = creatorBranches.reduce((s, b) => s + b.branchGV, 0);

  // Next rank diagnostics
  const nextRankDiag = useMemo(() => {
    if (!result.nextRank) return null;
    const nr = result.nextRank;
    const gvOk = result.totalGV >= nr.requiredGV;
    let partnersOk = true;
    let qualifiedCount = 0;
    let requiredRankName = "";
    let requiredGVForPartner = 0;
    if (nr.requiredPartnerCount > 0 && nr.requiredPartnerRank) {
      requiredRankName = nr.requiredPartnerRank;
      qualifiedCount = countQualifiedPartners(result.partnerRankCounts, requiredRankName);
      partnersOk = qualifiedCount >= nr.requiredPartnerCount;
      const reqRank = RANKS.find(r => r.name === requiredRankName);
      requiredGVForPartner = reqRank?.requiredGV ?? 0;
    }
    return { gvOk, partnersOk, qualifiedCount, requiredRankName, requiredGVForPartner };
  }, [result]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* ─── Left: Inputs ─── */}
      <div className="lg:col-span-5 space-y-5">
        {/* Package */}
        <div className="glass-card p-5">
          <h3 className="text-base font-display font-semibold mb-3 text-white">Твой пакет</h3>
          <PackageSelector value={myPackage} onChange={setMyPackage} />
          <label className="flex items-center gap-3 mt-3 cursor-pointer">
            <div className={`w-10 h-6 rounded-full transition-colors relative ${quickStart ? "bg-accent-mint" : "bg-white/20"}`} onClick={() => setQuickStart(!quickStart)}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${quickStart ? "translate-x-5" : "translate-x-1"}`} />
            </div>
            <span className="text-text-secondary text-sm">Быстрый старт <span className="text-text-muted text-xs">(4 партнёра за 30 дней)</span></span>
          </label>
        </div>

        {/* Month Slider */}
        <div className="glass-card p-5 border-accent-mint/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-accent-mint/20 text-accent-mint text-xs font-bold flex items-center justify-center">📅</span>
            <h3 className="text-base font-display font-semibold text-white">Месяц прогноза</h3>
            <span className="text-accent-mint font-display font-bold ml-auto text-lg">M{selectedMonth}</span>
          </div>
          <p className="text-text-muted text-xs mb-3">GV накапливается — пакеты обновляются, микроплатежи растут</p>
          <input type="range" min={1} max={12} step={1} value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-mint [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(141,249,209,0.5)] [&::-webkit-slider-thumb]:cursor-pointer" />
          <div className="flex justify-between text-xs text-text-muted mt-1">
            {[1,3,6,9,12].map(m => (
              <button key={m} onClick={() => setSelectedMonth(m)} className={`px-1.5 py-0.5 rounded ${selectedMonth === m ? "bg-accent-mint/20 text-accent-mint" : "hover:text-white"}`}>
                M{m}
              </button>
            ))}
          </div>
        </div>

        {/* YOU as creator */}
        <div className="glass-card p-5 border-gold/30">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">★</span>
            <h3 className="text-base font-display font-semibold text-white">Ты как креатор</h3>
          </div>
          <p className="text-text-muted text-xs mb-3">Твой контент → просмотры → микроплатежи по ${microPayment} на первой линии</p>
          <div className="space-y-3">
            <Slider label="Твои просмотры / мес" value={myViews} min={0} max={1000000} step={1000} onChange={setMyViews} formatValue={formatViews} />
            <FunnelPreview views={myViews} viewToReg={viewToReg} regToPurchase={regToPurchase} microPayment={microPayment} label="Твоя воронка" />

            {/* Organic partner conversion */}
            <div className="border-t border-gold/20 pt-3">
              <Slider label="Регистрации → партнёры" value={regToPartner} min={0} max={10} step={0.5} onChange={setRegToPartner} suffix="%" />
              {regToPartner > 0 && (
                <>
                  <div className="mt-2"><span className="text-text-secondary text-xs mb-1.5 block">Пакет новых партнёров</span>
                    <PackageSelector value={organicPartnerPackage} onChange={setOrganicPartnerPackage} accentColor="gold" />
                  </div>
                  <div className="bg-gold/10 rounded-lg px-3 py-2 mt-3 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gold/70">Новых партнёров / мес</span>
                      <span className="text-gold font-bold">+{Math.floor(Math.floor(myViews * (viewToReg / 100)) * (regToPartner / 100))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gold/70">К M{selectedMonth}</span>
                      <span className="text-gold font-bold">{result.organicPartnersTotalAtMonth} партнёров</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gold/70">Их GV</span>
                      <span className="text-gold font-bold">${formatMoney(result.organicGV)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gold/70">Дифференциал</span>
                      <span className="text-white font-bold">{result.myRank.percent}% − 20% = {result.myRank.percent - 20}%</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="bg-gold/10 rounded-lg px-3 py-2 flex justify-between items-center">
              <span className="text-gold text-xs">Доход с контента / мес</span>
              <span className="text-gold font-display font-bold">${formatMoney(result.myCreatorIncome)} <span className="text-gold/60 text-xs font-normal">({result.myRank.percent}%)</span></span>
            </div>
          </div>
        </div>

        {/* Networkers */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-accent-sky/20 text-accent-sky text-xs font-bold flex items-center justify-center">⬡</span>
            <h3 className="text-base font-display font-semibold text-white">Сетевики в команде</h3>
          </div>
          <p className="text-text-muted text-xs mb-3">Покупают пакеты + строят ветки. Ты зарабатываешь разницу %.</p>
          <div className="space-y-3">
            <Slider label="Количество сетевиков" value={networkerCount} min={0} max={30} step={1} onChange={setNetworkerCount} suffix=" чел." />
            <div><span className="text-text-secondary text-xs mb-1.5 block">Их пакет</span><PackageSelector value={networkerPackage} onChange={setNetworkerPackage} accentColor="accent-sky" /></div>
            <Slider label="Людей в ветке каждого" value={networkerTeamSize} min={0} max={100} step={1} onChange={setNetworkerTeamSize} suffix=" чел." />
            <div><span className="text-text-secondary text-xs mb-1.5 block">Средний пакет в их ветке</span><PackageSelector value={networkerTeamPackage} onChange={setNetworkerTeamPackage} accentColor="accent-sky" /></div>
            {networkerCount > 0 && networkerBranches[0] && (
              <div className="bg-accent-sky/10 rounded-lg px-3 py-2 text-xs space-y-1">
                <div className="flex justify-between"><span className="text-accent-sky/70">GV ветки (M{selectedMonth})</span><span className="text-accent-sky font-bold">${formatMoney(networkerBranches[0].branchGV)}</span></div>
                <div className="flex justify-between"><span className="text-accent-sky/70">Ранг каждого</span><RankBadge rank={networkerBranches[0].partnerRank} size="sm" /></div>
                <div className="flex justify-between"><span className="text-accent-sky/70">Разница %</span><span className="text-white font-bold">{result.myRank.percent}% − {networkerBranches[0].partnerRank.percent}% = {Math.max(0, networkerBranches[0].differential)}%</span></div>
              </div>
            )}
          </div>
        </div>

        {/* Creator Partners */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-accent-iris/20 text-accent-iris text-xs font-bold flex items-center justify-center">♦</span>
            <h3 className="text-base font-display font-semibold text-white">Креаторы в команде</h3>
          </div>
          <p className="text-text-muted text-xs mb-3">Покупают пакеты + делают контент. Ты зарабатываешь разницу %.</p>
          <div className="space-y-3">
            <Slider label="Количество креаторов" value={creatorPartnerCount} min={0} max={50} step={1} onChange={setCreatorPartnerCount} suffix=" чел." />
            <div><span className="text-text-secondary text-xs mb-1.5 block">Их пакет</span><PackageSelector value={creatorPartnerPackage} onChange={setCreatorPartnerPackage} accentColor="accent-mint" /></div>
            <Slider label="Просмотры у каждого" value={creatorPartnerViews} min={0} max={1000000} step={1000} onChange={setCreatorPartnerViews} formatValue={formatViews} />
            {creatorPartnerCount > 0 && <FunnelPreview views={creatorPartnerViews} viewToReg={viewToReg} regToPurchase={regToPurchase} microPayment={microPayment} label="Воронка каждого креатора" />}
          </div>
        </div>

        {/* Funnel Settings */}
        <div className="glass-card p-5">
          <button onClick={() => setShowFunnelSettings(!showFunnelSettings)} className="text-text-muted text-sm hover:text-text-secondary transition-colors flex items-center gap-2 w-full">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-transform ${showFunnelSettings ? "rotate-90" : ""}`}><path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            Настройки конверсий воронки
            <span className="text-text-muted/50 text-xs ml-auto">{viewToReg}% → {regToPurchase}%</span>
          </button>
          {showFunnelSettings && (
            <div className="space-y-3 mt-4 pt-3 border-t border-white/10">
              <Slider label="Просмотры → Регистрации" value={viewToReg} min={0.5} max={15} step={0.5} onChange={setViewToReg} suffix="%" />
              <Slider label="Регистрации → Покупки" value={regToPurchase} min={1} max={30} step={1} onChange={setRegToPurchase} suffix="%" />
            </div>
          )}
        </div>
      </div>

      {/* ─── Right: Results ─── */}
      <div className="lg:col-span-7 space-y-5">
        {/* Hero */}
        <div className="glass-card p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 30% 50%, ${result.myRank.color}, transparent 70%)` }} />
          <div className="relative">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-text-muted text-xs mb-1">Твой ранг · M{selectedMonth}</div>
                <RankBadge rank={result.myRank} size="lg" />
              </div>
              <div className="text-right">
                <div className="text-text-muted text-xs mb-1">Твой процент</div>
                <div className="text-3xl font-display font-bold text-white">{result.myRank.percent}%</div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-5 flex justify-between items-end">
              <div>
                <div className="text-text-muted text-xs mb-1">Доход / мес</div>
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient-gold">${formatMoney(result.myCreatorIncome + result.networkIncome + result.organicIncome)}</div>
              </div>
              {(result.rankBonus > 0 || result.quickStartBonus > 0) && (
                <div className="text-right">
                  <div className="text-text-muted text-xs mb-1">+ бонусы</div>
                  <div className="text-2xl font-display font-bold text-white">${formatMoney(result.rankBonus + result.quickStartBonus)}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="GV накопленный" value={`$${formatMoney(result.totalGV)}`} sub={`месяц ${selectedMonth}`} />
          <StatCard label="Мой контент" value={`$${formatMoney(result.myCreatorIncome)}`} accent sub={`${result.myCreatorPurchases} покупок/мес`} />
          <StatCard label="Сеть" value={`$${formatMoney(result.networkIncome + result.organicIncome)}`} accent sub="дифференциал/мес" />
          <StatCard label="Бонусы" value={`$${formatMoney(result.rankBonus + result.quickStartBonus)}`} sub="разовые" />
        </div>

        {/* Income Breakdown */}
        <div className="glass-card p-5">
          <h3 className="text-base font-display font-semibold text-white mb-4">Разбивка дохода / мес</h3>
          <div className="space-y-3">
            <IncomeRow icon="★" iconBg="bg-gold/20" iconColor="text-gold" barColor="bg-gold"
              label="Твой контент" detail={`${result.myCreatorPurchases} × $${microPayment} × ${result.myRank.percent}%`}
              amount={result.myCreatorIncome} volume={result.myCreatorVolume}
              maxAmount={Math.max(result.myCreatorIncome, totalNetworkerCommission, totalCreatorCommission, 1)} />
            {networkerCount > 0 && (
              <IncomeRow icon="⬡" iconBg="bg-accent-sky/20" iconColor="text-accent-sky" barColor="bg-accent-sky"
                label={`Сетевики (${networkerCount})`}
                detail={`${Math.max(0, networkerBranches[0]?.differential ?? 0)}% × $${formatMoney(totalNetworkerGV)} GV`}
                amount={totalNetworkerCommission} volume={totalNetworkerGV}
                maxAmount={Math.max(result.myCreatorIncome, totalNetworkerCommission, totalCreatorCommission, 1)} />
            )}
            {creatorPartnerCount > 0 && (
              <IncomeRow icon="♦" iconBg="bg-accent-iris/20" iconColor="text-accent-iris" barColor="bg-accent-iris"
                label={`Креаторы (${creatorPartnerCount})`}
                detail={`${Math.max(0, creatorBranches[0]?.differential ?? 0)}% × $${formatMoney(totalCreatorGV)} GV`}
                amount={totalCreatorCommission} volume={totalCreatorGV}
                maxAmount={Math.max(result.myCreatorIncome, totalNetworkerCommission, totalCreatorCommission, result.organicIncome, 1)} />
            )}
            {result.organicPartnersTotalAtMonth > 0 && (
              <IncomeRow icon="🌱" iconBg="bg-gold/20" iconColor="text-gold" barColor="bg-gradient-to-r from-gold to-accent-mint"
                label={`Органика (${result.organicPartnersTotalAtMonth})`}
                detail={`${result.myRank.percent - 20}% × $${formatMoney(result.organicGV)} GV`}
                amount={result.organicIncome} volume={result.organicGV}
                maxAmount={Math.max(result.myCreatorIncome, totalNetworkerCommission, totalCreatorCommission, result.organicIncome, 1)} />
            )}
          </div>
          <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center">
            <span className="text-text-secondary font-medium">Итого / мес</span>
            <span className="text-white font-display font-bold text-xl">${formatMoney(result.myCreatorIncome + result.networkIncome + result.organicIncome)}</span>
          </div>
        </div>

        {/* Next Rank with diagnostics */}
        {result.nextRank && nextRankDiag && (
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-display font-semibold text-white">Следующий ранг</h3>
              <RankBadge rank={result.nextRank} size="sm" />
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-3">
              <div className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-accent-mint to-accent-sky" style={{ width: `${result.nextRankProgress}%` }} />
            </div>
            {/* Requirement checklist */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className={nextRankDiag.gvOk ? "text-accent-mint" : "text-red-400"}>{nextRankDiag.gvOk ? "✅" : "❌"}</span>
                <span className="text-text-secondary">GV:</span>
                <span className="text-white font-medium">${formatMoney(result.totalGV)} / ${formatMoney(result.nextRank.requiredGV)}</span>
                {!nextRankDiag.gvOk && <span className="text-text-muted">— нужно ещё ${formatMoney(result.nextRank.requiredGV - result.totalGV)}</span>}
              </div>
              {result.nextRank.requiredPartnerCount > 0 && result.nextRank.requiredPartnerRank && (
                <div className="flex items-start gap-2">
                  <span className={nextRankDiag.partnersOk ? "text-accent-mint" : "text-red-400"}>{nextRankDiag.partnersOk ? "✅" : "❌"}</span>
                  <div>
                    <div>
                      <span className="text-text-secondary">Партнёры: </span>
                      <span className="text-white font-medium">{nextRankDiag.qualifiedCount} / {result.nextRank.requiredPartnerCount} {nextRankDiag.requiredRankName}</span>
                    </div>
                    {!nextRankDiag.partnersOk && nextRankDiag.requiredGVForPartner > 0 && (
                      <div className="text-text-muted mt-0.5">
                        Чтобы партнёр стал {nextRankDiag.requiredRankName}, его ветка должна набрать ${formatMoney(nextRankDiag.requiredGVForPartner)} GV
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 12-Month Forecast */}
        <div className="glass-card p-5">
          <h3 className="text-base font-display font-semibold text-white mb-1">Прогноз на 12 месяцев</h3>
          <p className="text-text-muted text-xs mb-3">Накопительный GV · ранг · доход в месяц</p>
          <ForecastTable forecast={forecast} selectedMonth={selectedMonth} />
        </div>

        {/* Rank Growth Story */}
        <div className="glass-card p-5">
          <h3 className="text-base font-display font-semibold text-white mb-3">Как растёт доход с контента</h3>
          <p className="text-text-muted text-xs mb-3">Чем выше ранг — тем больше % с каждой покупки.</p>
          <div className="space-y-2">
            {RANKS.slice(0, 6).map((r, i) => {
              const income = (result.myCreatorVolume * r.percent) / 100;
              const isCurrent = i === result.myRankIndex;
              return (
                <div key={r.name} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isCurrent ? "bg-white/10 ring-1 ring-white/20" : i < result.myRankIndex ? "opacity-40" : ""}`}>
                  <RankBadge rank={r} size="sm" />
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${(r.percent / 55) * 100}%`, backgroundColor: r.color }} /></div>
                  <span className="text-white font-display font-bold text-sm w-20 text-right">${formatMoney(income)}</span>
                  {isCurrent && <span className="text-accent-mint text-[10px]">← ты</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ranks Table */}
        <div className="glass-card p-5">
          <h3 className="text-base font-display font-semibold text-white mb-3">Маркетинг план</h3>
          <RanksTable currentRankIndex={result.myRankIndex} />
        </div>

        {/* Scenarios */}
        <div className="glass-card p-5">
          <h3 className="text-base font-display font-semibold text-white mb-3">Сценарии</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ScenarioButton color="gold" title="Соло-креатор" desc="10K просмотров + органика 2%" onClick={() => {
              setMyPackage(100); setMyViews(10000); setNetworkerCount(0); setCreatorPartnerCount(0);
              setRegToPartner(2); setOrganicPartnerPackage(100); setQuickStart(false); setSelectedMonth(6);
            }} />
            <ScenarioButton color="accent-mint" title="Креатор + быстрый старт" desc="5K просмотров + 4 партнёра + органика" onClick={() => {
              setMyPackage(500); setMyViews(5000); setNetworkerCount(2); setNetworkerPackage(100); setNetworkerTeamSize(0); setNetworkerTeamPackage(100);
              setCreatorPartnerCount(2); setCreatorPartnerPackage(100); setCreatorPartnerViews(2000);
              setRegToPartner(2); setOrganicPartnerPackage(100); setQuickStart(true); setSelectedMonth(3);
            }} />
            <ScenarioButton color="accent-sky" title="Вирусный ролик" desc="100K просмотров + органика 3%" onClick={() => {
              setMyPackage(1000); setMyViews(100000); setNetworkerCount(0); setNetworkerPackage(500); setNetworkerTeamSize(0); setNetworkerTeamPackage(500);
              setCreatorPartnerCount(0); setCreatorPartnerPackage(100); setCreatorPartnerViews(2000);
              setRegToPartner(3); setOrganicPartnerPackage(500); setQuickStart(true); setSelectedMonth(6);
            }} />
            <ScenarioButton color="accent-iris" title="Лидер (12 мес)" desc="10K просмотров + сетевики + органика" onClick={() => {
              setMyPackage(1000); setMyViews(10000); setNetworkerCount(3); setNetworkerPackage(1000); setNetworkerTeamSize(30); setNetworkerTeamPackage(500);
              setCreatorPartnerCount(10); setCreatorPartnerPackage(100); setCreatorPartnerViews(3000);
              setRegToPartner(2); setOrganicPartnerPackage(500); setQuickStart(true); setSelectedMonth(12);
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
