"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export interface StatData {
  label: string;
  value: number; // 0-100
  color?: string;
}

interface StatRadarChartProps {
  stats: StatData[];
  size?: number;
  className?: string;
}

export const StatRadarChart = ({ stats, size = 200, className }: StatRadarChartProps) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4;

  // 팔각형 좌표 계산 (8개 축)
  const axes = useMemo(() => {
    const count = Math.max(stats.length, 8);
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 2 * Math.PI) / count - Math.PI / 2; // -90도부터 시작
      return {
        angle,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        label: stats[i]?.label || "",
        value: stats[i]?.value || 0,
        color: stats[i]?.color || "#3b82f6",
      };
    });
  }, [stats, centerX, centerY, radius]);

  // 능력치 폴리곤 경로 생성
  const polygonPath = useMemo(() => {
    const points = axes.map((axis) => {
      const valueRadius = (radius * axis.value) / 100;
      const x = centerX + valueRadius * Math.cos(axis.angle);
      const y = centerY + valueRadius * Math.sin(axis.angle);
      return `${x},${y}`;
    });
    return points.join(" ");
  }, [axes, centerX, centerY, radius]);

  // 그리드 원 경로들 (25%, 50%, 75%, 100%)
  const gridCircles = useMemo(() => {
    return [0.25, 0.5, 0.75, 1].map((ratio) => ({
      r: radius * ratio,
      cx: centerX,
      cy: centerY,
    }));
  }, [radius, centerX, centerY]);

  return (
    <div className={className}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* 그리드 원 */}
        {gridCircles.map((circle, index) => (
          <circle
            key={index}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* 축 라인 */}
        {axes.map((axis, index) => (
          <line
            key={index}
            x1={centerX}
            y1={centerY}
            x2={axis.x}
            y2={axis.y}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* 능력치 폴리곤 */}
        <motion.polygon
          points={polygonPath}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* 축 라벨과 값 */}
        {axes.map((axis, index) => {
          const labelRadius = radius * 1.15;
          const labelX = centerX + labelRadius * Math.cos(axis.angle);
          const labelY = centerY + labelRadius * Math.sin(axis.angle);
          const valueRadius = (radius * axis.value) / 100;
          const valueX = centerX + valueRadius * Math.cos(axis.angle);
          const valueY = centerY + valueRadius * Math.sin(axis.angle);

          return (
            <g key={index}>
              {/* 값 점 */}
              <motion.circle
                cx={valueX}
                cy={valueY}
                r="4"
                fill={axis.color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              />
              {/* 라벨 */}
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-white/70 font-medium"
              >
                {axis.label}
              </text>
              {/* 값 텍스트 */}
              <text
                x={valueX}
                y={valueY - 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-white font-bold"
              >
                {axis.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

