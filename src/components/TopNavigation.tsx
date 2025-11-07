import { ArrowLeft, MoreVertical, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { motion } from "motion/react";

interface TopNavigationProps {
  roomName: string;
  onBack: () => void;
  onShare: () => void;
  onReport: () => void;
  onExit: () => void;
  onChat?: () => void;
  unreadChatCount?: number;
  onSettings?: () => void;
}

export function TopNavigation({
  roomName,
  onBack,
  onShare,
  onReport,
  onExit,
  onChat,
  unreadChatCount = 0,
  onSettings,
}: TopNavigationProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-[44px] flex items-center justify-between px-5 bg-[#1E1E1E] z-50">
      <button
        onClick={onBack}
        className="w-6 h-6 flex items-center justify-center active:opacity-60 transition-opacity"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <h1 className="flex-1 text-center text-white px-4 max-w-[180px] mx-auto overflow-hidden whitespace-nowrap relative">
        <motion.span
          className="inline-block"
          animate={
            roomName.length > 12
              ? {
                  x: ["0%", "-50%"],
                }
              : {}
          }
          transition={{
            duration: roomName.length * 0.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
        >
          {roomName.length > 12 ? `${roomName}    ${roomName}` : roomName}
        </motion.span>
      </h1>

      <div className="flex items-center gap-3">
        {/* More Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-6 h-6 flex items-center justify-center active:opacity-60 transition-opacity">
              <MoreVertical className="w-6 h-6 text-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#2C2C2C] border-none text-white"
            align="end"
          >
            {onSettings && (
              <DropdownMenuItem onClick={onSettings} className="hover:bg-[#3C3C3C]">
                Room Settings
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={onShare} className="hover:bg-[#3C3C3C]">
              Share Room
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onReport} className="hover:bg-[#3C3C3C]">
              Report Room
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExit} className="hover:bg-[#3C3C3C]">
              Exit Room
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
