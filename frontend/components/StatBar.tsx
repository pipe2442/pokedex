// En StatBar.tsx
export function StatBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const displayValue = String(value).padStart(3, "0");
  const percentage = Math.min((value / 255) * 100, 100); // 255 es el máximo stat posible

  return (
    <div className="flex items-center gap-4 w-full">
      <span className="w-10 text-[10px] font-bold shrink-0" style={{ color }}>
        {label}
      </span>
      <div className="w-[1px] h-4 bg-gray-200 shrink-0" />
      <span className="text-xs w-8 text-right shrink-0 font-mono">
        {displayValue}
      </span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
