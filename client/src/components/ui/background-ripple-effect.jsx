"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/utils/utils";

export const BackgroundRippleEffect = ({ cellSize = 56 }) => {
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [grid, setGrid] = useState({ rows: 0, cols: 0 });
  const ref = useRef(null);

  // Tính rows / cols theo kích thước màn hình
  useEffect(() => {
    function calcGrid() {
      const h = window.innerHeight;
      const w = window.innerWidth;

      const rows = Math.ceil(h / cellSize);
      const cols = Math.ceil(w / cellSize);

      setGrid({ rows, cols });
    }

    calcGrid();
    window.addEventListener("resize", calcGrid);

    return () => window.removeEventListener("resize", calcGrid);
  }, [cellSize]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]"
      )}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-2" />

        {/* Grid auto responsive */}
        <DivGrid
          key={`base-${rippleKey}`}
          className="mask-radial-from-20% mask-radial-at-top opacity-600"
          rows={grid.rows}
          cols={grid.cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          interactive
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
        />
      </div>
    </div>
  );
};

const DivGrid = ({
  className,
  rows,
  cols,
  cellSize,
  borderColor,
  fillColor,
  clickedCell,
  onCellClick = () => {},
  interactive = true,
}) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
  };

  return (
    <div className={cn("relative z-3 mx-auto", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;

        const delay = distance * 55;
        const duration = 200 + distance * 80;

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple fill-mode-[none]",
              !interactive && "pointer-events-none"
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }}
            onClick={
              interactive ? () => onCellClick(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
