import { Users, Play, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "motion/react";

interface RoomCardProps {
  id: string;
  name: string;
  currentSong: string;
  artist: string;
  albumCover: string;
  memberCount: number;
  isPlaying: boolean;
  isPrivate?: boolean;
  creatorName: string;
  creatorAvatar: string;
  onClick: () => void;
}

export function RoomCard({
  name,
  currentSong,
  artist,
  albumCover,
  memberCount,
  isPlaying,
  isPrivate = false,
  creatorName,
  creatorAvatar,
  onClick,
}: RoomCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-3xl overflow-hidden relative h-[220px] active:scale-[0.98] transition-transform"
    >
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={albumCover}
          alt={currentSong}
          className="w-full h-full object-cover scale-110"
          style={{ filter: 'blur(20px)' }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
      
      {/* Frosted Glass Layer */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />

      {/* Content Container */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        {/* Top Section: Room Name */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white text-left flex-1 min-w-0 truncate drop-shadow-lg">
            {name}
          </h3>
          {isPrivate && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white/90" />
            </div>
          )}
        </div>

        {/* Middle Section: Album Cover + Song Info */}
        <div className="flex-1 flex items-center gap-4 mb-3">
          {/* Rotating Album Cover */}
          <motion.div
            className="relative flex-shrink-0"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : { duration: 0 }
            }
          >
            <div className="w-[90px] h-[90px] rounded-full overflow-hidden shadow-2xl ring-4 ring-white/10">
              <ImageWithFallback
                src={albumCover}
                alt={currentSong}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Center Dot (like a vinyl record) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 backdrop-blur-sm rounded-full border-2 border-white/20" />
          </motion.div>

          {/* Song Info */}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <p className="text-white truncate drop-shadow-lg">
              {currentSong}
            </p>
            <p className="text-white/80 truncate drop-shadow-lg">
              {artist}
            </p>
            {isPlaying && (
              <div className="flex items-center gap-1.5 text-[#34C759] mt-0.5">
                <Play className="w-3.5 h-3.5" fill="#34C759" />
                <span className="text-[#34C759] drop-shadow-lg">Playing</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Creator Info */}
        <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-white/20">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <Avatar className="w-8 h-8 flex-shrink-0 ring-2 ring-white/20">
              <AvatarImage src={creatorAvatar} alt={creatorName} />
              <AvatarFallback className="bg-white/20 text-white backdrop-blur-sm">
                {creatorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-white/90 truncate drop-shadow-lg">
                {creatorName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-white/90 flex-shrink-0 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            <Users className="w-4 h-4" />
            <span>{memberCount}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
