"use client";

import { COLS, createEmptyGrid, ROWS } from "@/utils/utils";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playingRef = useRef(isPlaying);
  playingRef.current = isPlaying;
  return (
    <main className="h-screen w-screen flex justify-center p-4 bg-blue-500 flex-col gap-4">
      <h1 className="md:text-2xl text-xl">Conway&apos;s Game of Life</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 20px)`,
          gridTemplateRows: `repeat(${ROWS}, 20px)`,
        }}
      >
        {grid.map((rows, originalRowIndex) =>
          rows.map((col, originalColIndex) => (
            <button
              key={`${originalRowIndex}-${originalColIndex}`}
              className={twMerge(
                "border border-[#9050e9]",
                grid[originalRowIndex][originalColIndex]
                  ? "bg-[#ad7bee]"
                  : "bg-[#240643]"
              )}
            />
          ))
        )}
      </div>
    </main>
  );
}
