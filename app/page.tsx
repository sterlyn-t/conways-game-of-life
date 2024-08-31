"use client";

import Button from "@/components/Button";
import PlayPauseButton from "@/components/PlayPauseButton";
import Select from "@/components/Select";
import { COLS, createEmptyGrid, DIRECTIONS, ROWS, RULES } from "@/utils/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Bangers } from "next/font/google";
import { Info } from "lucide-react";
import InfoDrawer from "@/components/InfoDrawer";
const bangers = Bangers({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(100);

  const getGridSize = () => {
    if (typeof window !== "undefined") {
      const size = Math.min(
        (window.innerWidth - 32) / COLS,
        (window.innerHeight - 200) / ROWS,
        15
      );
      return size;
    }
    return 15;
  };
  const [cellSize, setCellSize] = useState<number>(getGridSize());

  const isGridEmpty = (grid: number[][]): boolean => {
    return grid.every((row) => row.every((cell) => cell === 0));
  };

  useEffect(() => {
    const handleResize = () => {
      setCellSize(getGridSize());
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const playingRef = useRef(isPlaying);
  playingRef.current = isPlaying;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  const runGameOfLife = useCallback(() => {
    if (!playingRef.current) {
      return;
    }

    setGrid((currentGrid) => {
      const newGrid = currentGrid.map((arr) => [...arr]);

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          let liveNeighbors = 0;

          DIRECTIONS.forEach(([directionX, directionY]) => {
            const neighborRow = row + directionX;
            const neighborCol = col + directionY;

            if (
              neighborRow >= 0 &&
              neighborRow < ROWS &&
              neighborCol >= 0 &&
              neighborCol < COLS
            ) {
              liveNeighbors += currentGrid[neighborRow][neighborCol] ? 1 : 0;
            }
          });

          // Conway's Game of Life rules
          if (liveNeighbors < 2 || liveNeighbors > 3) {
            newGrid[row][col] = 0;
          } else if (currentGrid[row][col] === 0 && liveNeighbors === 3) {
            newGrid[row][col] = 1;
          }
        }
      }

      return newGrid;
    });

    setTimeout(runGameOfLife, speedRef.current);
  }, [setGrid]);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const toggleCellState = (rowToggle: number, colToggle: number) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === rowToggle && colIndex === colToggle ? (cell ? 0 : 1) : cell
      )
    );
    setGrid(newGrid);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) {
      toggleCellState(row, col);
    }
  };

  return (
    <main className="h-screen w-screen flex items-center p-4  flex-col gap-4 relative">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#a333ee_100%)]"></div>
      <h1
        className={twMerge(
          "md:text-3xl text-2xl text-slate-300",
          bangers.className
        )}
      >
        Conway&apos;s Game of Life
      </h1>
      <div className="gap-4 flex items-center">
        <PlayPauseButton
          onClick={() => {
            setIsPlaying(!isPlaying);
            if (!isPlaying) {
              playingRef.current = true;
              runGameOfLife();
            }
          }}
          isPlaying={isPlaying}
          disabled={isGridEmpty(grid)}
        />
        <Button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < ROWS; i++) {
              rows.push(
                Array.from(Array(COLS), () => (Math.random() > 0.75 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
        >
          Seed
        </Button>
        <Button
          onClick={() => {
            setGrid(createEmptyGrid());
            setIsPlaying(false);
          }}
        >
          Clear
        </Button>
        <Select
          label="speed selector"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        >
          <option value={1000}>Slow</option>
          <option value={500}>Medium</option>
          <option value={100}>Fast</option>
          <option value={50}>Lightning</option>
        </Select>
        <InfoDrawer description={RULES} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${cellSize}px)`,
        }}
      >
        {grid.map((rows, originalRowIndex) =>
          rows.map((_, originalColIndex) => (
            <button
              key={`${originalRowIndex}-${originalColIndex}`}
              className={twMerge(
                "border border-[#9050e9]",
                grid[originalRowIndex][originalColIndex]
                  ? "bg-[#ad7bee]"
                  : "bg-[#240643]"
              )}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseEnter={() =>
                handleMouseEnter(originalRowIndex, originalColIndex)
              }
              onClick={() =>
                toggleCellState(originalRowIndex, originalColIndex)
              }
            />
          ))
        )}
      </div>
    </main>
  );
}
