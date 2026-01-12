"use client";

import * as React from "react";

export function StatBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const numValue = Number(value) || 0;
  // Pokémon Stats suelen ir de 1 a 255
  const percentage = Math.min((numValue / 255) * 100, 100);

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Etiqueta (HP, ATK...) */}
      <span
        className="w-10 text-[10px] font-bold shrink-0 text-left"
        style={{ color }}
      >
        {label}
      </span>

      {/* Separador vertical */}
      <div className="w-[1px] h-4 bg-gray-200 shrink-0" />

      {/* Valor numérico */}
      <span className="text-xs w-8 text-right shrink-0 font-mono">
        {numValue.toString().padStart(3, "0")}
      </span>

      {/* Contenedor de la barra - Forzamos que crezca */}
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden relative">
        <div
          className="h-full transition-all duration-1000 ease-out rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
