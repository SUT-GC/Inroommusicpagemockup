import { SkipBack, Play, Pause, SkipForward, Type, Settings } from "lucide-react";
import { motion } from "motion/react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLyrics: () => void;
  onSettings: () => void;
}

export function PlaybackControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onLyrics,
  onSettings,
}: PlaybackControlsProps) {
  return (
    <div className="h-[80px] flex items-center justify-center bg-[#1E1E1E] px-9">
      {/* Left - Lyrics Button */}
      <button
        onClick={onLyrics}
        className="absolute left-9 w-5 h-5 text-[#999999] active:text-white transition-colors"
      >
        <Type className="w-5 h-5" />
      </button>

      {/* Core Control Buttons */}
      <div className="flex items-center gap-[30px]">
        <button
          onClick={onPrevious}
          className="w-6 h-6 text-[#999999] active:text-white transition-colors"
        >
          <SkipBack className="w-6 h-6" />
        </button>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onPlayPause}
          className="w-12 h-12 rounded-full bg-[#2C2C2C] flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-[#34C759]" fill="#34C759" />
          ) : (
            <Play className="w-8 h-8 text-[#34C759]" fill="#34C759" />
          )}
        </motion.button>

        <button
          onClick={onNext}
          className="w-6 h-6 text-[#999999] active:text-white transition-colors"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      {/* Right - Settings Button */}
      <button
        onClick={onSettings}
        className="absolute right-9 w-5 h-5 text-[#999999] active:text-white transition-colors"
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
}
