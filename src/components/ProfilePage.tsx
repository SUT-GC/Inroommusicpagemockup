import {
  User,
  Music,
  Users,
  Settings,
  ChevronRight,
  Heart,
  Clock,
  Crown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ProfilePage() {
  const userStats = {
    roomsCreated: 12,
    roomsJoined: 45,
    hoursListened: 127,
    favoriteSongs: 89,
  };

  const menuItems = [
    {
      icon: Music,
      label: "My Playlists",
      badge: "24",
      onClick: () => console.log("My Playlists"),
    },
    {
      icon: Heart,
      label: "Favorite Rooms",
      badge: "8",
      onClick: () => console.log("Favorite Rooms"),
    },
    {
      icon: Clock,
      label: "Listening History",
      onClick: () => console.log("Listening History"),
    },
    {
      icon: Crown,
      label: "Premium",
      badge: "New",
      badgeColor: "bg-[#FFD60A]",
      onClick: () => console.log("Premium"),
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => console.log("Settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#1E1E1E] pb-[120px] max-w-[430px] mx-auto">
      {/* Top Safe Area */}
      <div className="h-[44px]" />

      {/* Header */}
      <div className="px-5 pt-4 pb-6">
        <h1 className="text-white text-[34px] tracking-tight mb-6">Profile</h1>

        {/* User Card */}
        <div className="bg-gradient-to-br from-[#34C759] to-[#30A14E] rounded-3xl p-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          {/* User Info */}
          <div className="relative flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                alt="You"
              />
              <AvatarFallback className="bg-white text-[#34C759] text-2xl">
                Y
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-white text-2xl mb-1">You</h2>
              <p className="text-white/80 text-sm">Music Enthusiast</p>
            </div>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm active:bg-white/30 transition-colors">
              Edit
            </button>
          </div>

          {/* Stats */}
          <div className="relative grid grid-cols-4 gap-3">
            <div className="text-center">
              <p className="text-white text-xl mb-1">
                {userStats.roomsCreated}
              </p>
              <p className="text-white/80 text-[10px]">Created</p>
            </div>
            <div className="text-center">
              <p className="text-white text-xl mb-1">
                {userStats.roomsJoined}
              </p>
              <p className="text-white/80 text-[10px]">Joined</p>
            </div>
            <div className="text-center">
              <p className="text-white text-xl mb-1">
                {userStats.hoursListened}h
              </p>
              <p className="text-white/80 text-[10px]">Together</p>
            </div>
            <div className="text-center">
              <p className="text-white text-xl mb-1">
                {userStats.favoriteSongs}
              </p>
              <p className="text-white/80 text-[10px]">Favorites</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-5">
        <div className="bg-[#2C2C2C] rounded-3xl overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`w-full flex items-center gap-4 px-5 py-4 active:bg-[#3C3C3C] transition-colors ${
                  index !== menuItems.length - 1
                    ? "border-b border-[#3C3C3C]"
                    : ""
                }`}
              >
                <div className="w-10 h-10 bg-[#34C759]/20 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#34C759]" />
                </div>
                <span className="flex-1 text-left text-white">
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    className={`px-2 py-1 ${
                      item.badgeColor || "bg-[#34C759]"
                    } rounded-full text-xs text-white`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-[#8E8E93]" />
              </button>
            );
          })}
        </div>
      </div>

      {/* App Info */}
      <div className="px-5 mt-8 text-center">
        <p className="text-[#8E8E93] text-xs mb-1">Listen Together</p>
        <p className="text-[#666666] text-xs">Version 1.0.0</p>
      </div>
    </div>
  );
}
