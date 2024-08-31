import { Pause, Play } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface PlayPauseButtonProps {
  onClick: () => void;
  isPlaying: boolean;
  disabled: boolean;
}

const PlayPauseButton = ({
  onClick,
  isPlaying,
  disabled,
}: PlayPauseButtonProps) => {
  return (
    <button
      className={twMerge(
        "transition ease-in flex items-center justify-center h-8 w-8 rounded-full shadow-md",
        isPlaying
          ? "bg-gray-700 hover:bg-gray-800"
          : "bg-green-500 hover:bg-green-700"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
    </button>
  );
};

export default PlayPauseButton;
