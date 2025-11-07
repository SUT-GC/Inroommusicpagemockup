import { Compass, Music2, MessageCircle, User, Plus } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavBarProps {
  currentTab: "discover" | "inroom" | "messages" | "profile";
  onTabChange: (tab: "discover" | "inroom" | "messages" | "profile") => void;
  onCreateRoom: () => void;
  unreadMessages?: number;
}

export function BottomNavBar({
  currentTab,
  onTabChange,
  onCreateRoom,
  unreadMessages = 0,
}: BottomNavBarProps) {
  const leftTabs = [
    { id: "discover", label: "Discover", icon: Compass },
    { id: "inroom", label: "In Room", icon: Music2 },
  ] as const;

  const rightTabs = [
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "profile", label: "Profile", icon: User },
  ] as const;

  const TabButton = ({
    tab,
  }: {
    tab: (typeof leftTabs)[number] | (typeof rightTabs)[number];
  }) => {
    const Icon = tab.icon;
    const isActive = currentTab === tab.id;

    return (
      <button
        onClick={() => onTabChange(tab.id)}
        className="flex flex-col items-center gap-1 relative transition-opacity active:opacity-60 min-w-[60px]"
      >
        {/* Unread Badge */}
        {tab.id === "messages" && unreadMessages > 0 && (
          <div className="absolute -top-1 left-1/2 translate-x-2 w-5 h-5 bg-[#FF3B30] rounded-full flex items-center justify-center z-10">
            <span className="text-white text-[10px]">
              {unreadMessages > 9 ? "9+" : unreadMessages}
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="relative">
          <Icon
            className={`w-6 h-6 transition-colors ${
              isActive ? "text-[#34C759]" : "text-[#8E8E93]"
            }`}
          />

          {/* Active Indicator */}
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#34C759] rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </div>

        {/* Label */}
        <span
          className={`text-[10px] transition-colors ${
            isActive ? "text-[#34C759]" : "text-[#8E8E93]"
          }`}
        >
          {tab.label}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* Floating Create Button - Half outside, half inside notch */}
      <button
        onClick={onCreateRoom}
        className="fixed bottom-[56px] left-1/2 -translate-x-1/2 w-14 h-14 bg-[#34C759] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-50"
        style={{
          boxShadow: "0 4px 24px rgba(52, 199, 89, 0.4)",
        }}
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Bottom Navigation Bar with Notch Cutout */}
      <div className="fixed bottom-0 left-0 right-0 z-40 max-w-[430px] mx-auto">
        <div className="relative">
          {/* SVG for the notch cutout shape */}
          <svg
            className="absolute top-0 left-0 right-0 w-full h-[84px]"
            viewBox="0 0 430 84"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Main navigation bar shape with semicircle notch cutout */}
            <path
              d="M 0 0 L 165 0 
                 C 165 0 175 0 180 5
                 C 185 10 195 25 200 28
                 C 205 31 210 32 215 32
                 C 220 32 225 31 230 28
                 C 235 25 245 10 250 5
                 C 255 0 265 0 265 0
                 L 430 0 L 430 84 L 0 84 Z"
              fill="rgba(30, 30, 30, 0.95)"
            />
            
            {/* Top border line following the notch */}
            <path
              d="M 0 0 L 165 0 
                 C 165 0 175 0 180 5
                 C 185 10 195 25 200 28
                 C 205 31 210 32 215 32
                 C 220 32 225 31 230 28
                 C 235 25 245 10 250 5
                 C 255 0 265 0 265 0
                 L 430 0"
              stroke="rgba(44, 44, 44, 0.8)"
              strokeWidth="1"
              fill="none"
            />
          </svg>

          {/* Backdrop blur effect */}
          <div className="absolute inset-0 backdrop-blur-xl pointer-events-none" />

          {/* Navigation Items Container */}
          <div className="relative px-6 pt-3 pb-6 h-[84px]">
            <div className="flex items-center justify-between h-full">
              {/* Left Group */}
              <div className="flex items-center gap-4">
                {leftTabs.map((tab) => (
                  <TabButton key={tab.id} tab={tab} />
                ))}
              </div>

              {/* Center Space for Floating Button */}
              <div className="w-16" />

              {/* Right Group */}
              <div className="flex items-center gap-4">
                {rightTabs.map((tab) => (
                  <TabButton key={tab.id} tab={tab} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
