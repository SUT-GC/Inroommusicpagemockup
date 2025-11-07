import { Compass, Music2 } from "lucide-react";

interface RoomListPageProps {
  onGoToDiscover: () => void;
}

export function RoomListPage({ onGoToDiscover }: RoomListPageProps) {
  return (
    <div className="min-h-screen bg-[#1E1E1E] pb-[120px] max-w-[430px] mx-auto flex flex-col items-center justify-center px-5">
      {/* Illustration */}
      <div className="mb-8">
        <div className="w-32 h-32 bg-[#2C2C2C] rounded-full flex items-center justify-center">
          <Music2 className="w-16 h-16 text-[#34C759]" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-white text-2xl mb-3 text-center">
        No Room Active
      </h2>

      {/* Description */}
      <p className="text-[#8E8E93] text-center mb-8 max-w-[280px]">
        You haven't joined any room yet. Discover and join rooms to listen together with friends!
      </p>

      {/* CTA Button */}
      <button
        onClick={onGoToDiscover}
        className="bg-[#34C759] text-white px-8 py-4 rounded-2xl flex items-center gap-2 active:scale-95 transition-transform"
      >
        <Compass className="w-5 h-5" />
        <span>Discover Rooms</span>
      </button>
    </div>
  );
}
