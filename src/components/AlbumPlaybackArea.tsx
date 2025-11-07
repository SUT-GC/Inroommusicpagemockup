import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Slider } from "./ui/slider";
import { SkipBack, Play, Pause, SkipForward, Menu } from "lucide-react";
import { useState, useEffect } from "react";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  albumCover: string;
}

interface AlbumPlaybackAreaProps {
  albumCover: string;
  songTitle: string;
  artist: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  listenersCount: number;
  songs: Song[];
  currentIndex: number;
  onProgressChange: (value: number[]) => void;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onPlaylistOpen?: () => void;
}

export function AlbumPlaybackArea({
  albumCover,
  songTitle,
  artist,
  currentTime,
  duration,
  isPlaying,
  listenersCount,
  songs,
  currentIndex,
  onProgressChange,
  onPlayPause,
  onPrevious,
  onNext,
  onPlaylistOpen,
}: AlbumPlaybackAreaProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.36) % 360); // 1 degree per ~2.78ms = 1 rotation per second
    }, 10);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center pt-[60px] px-5">
      {/* 3D Card Stack - Poker Style */}
      <div className="relative h-[260px] w-full flex items-start justify-center pt-4" style={{ perspective: "1500px" }}>
        {/* Stack - show up to 4 cards for better poker effect */}
        {songs.slice(currentIndex, currentIndex + 4).map((song, index) => {
          const isCurrentCard = index === 0;
          const cardIndex = index;
          
          return (
            <motion.div
              key={song.id}
              initial={false}
              animate={{
                scale: isCurrentCard ? 1 : 0.85 - cardIndex * 0.08,
                x: isCurrentCard ? 0 : cardIndex * 20,
                y: isCurrentCard ? 0 : cardIndex * 25,
                rotateZ: isCurrentCard ? 0 : cardIndex * 3,
                rotateY: isPlaying && isCurrentCard ? [0, 5, 0, -5, 0] : cardIndex * -2,
                z: -cardIndex * 50,
              }}
              transition={{
                scale: { duration: 0.4, ease: "easeOut" },
                x: { duration: 0.4, ease: "easeOut" },
                y: { duration: 0.4, ease: "easeOut" },
                rotateZ: { duration: 0.4, ease: "easeOut" },
                z: { duration: 0.4, ease: "easeOut" },
                rotateY: isPlaying && isCurrentCard ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : { duration: 0.4, ease: "easeOut" }
              }}
              className="absolute"
              style={{
                zIndex: 20 - cardIndex,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className={`w-[220px] h-[220px] rounded-2xl overflow-hidden ${
                  isCurrentCard ? "ring-2 ring-[#34C759]" : "ring-1 ring-white/10"
                }`}
                style={{
                  boxShadow: isCurrentCard 
                    ? "0 25px 70px rgba(52, 199, 89, 0.4), 0 0 50px rgba(52, 199, 89, 0.25), 0 10px 40px rgba(0, 0, 0, 0.6)"
                    : `0 ${15 + cardIndex * 5}px ${40 + cardIndex * 10}px rgba(0, 0, 0, ${0.7 - cardIndex * 0.1})`,
                }}
              >
                <ImageWithFallback
                  src={song.albumCover}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay for non-current cards */}
                {!isCurrentCard && (
                  <div className="absolute inset-0 bg-black/50" />
                )}
                {/* Subtle shine effect on current card */}
                {isCurrentCard && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Song Information */}
      <div className="mt-[30px] text-center max-w-[280px]">
        <h2 className="text-white line-clamp-2">{songTitle}</h2>
        <p className="text-[#999999] mt-2">{artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="mt-[15px] w-[280px]">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={onProgressChange}
          className="w-full"
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between w-[280px] mt-2 text-[#999999]">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Playback Controls */}
      <div className="mt-8 flex items-center justify-center gap-[30px]">
        <button
          onClick={onPrevious}
          className="w-6 h-6 text-[#999999] active:text-white transition-colors"
        >
          <SkipBack className="w-6 h-6" />
        </button>

        <button
          onClick={onPlayPause}
          className="w-6 h-6 text-[#999999] active:text-white transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>

        <button
          onClick={onNext}
          className="w-6 h-6 text-[#999999] active:text-white transition-colors"
        >
          <SkipForward className="w-6 h-6" />
        </button>

        {onPlaylistOpen && (
          <button
            onClick={onPlaylistOpen}
            className="w-6 h-6 text-[#999999] active:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
