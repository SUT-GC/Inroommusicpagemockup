import { TrendingUp, Users, Clock, Search } from "lucide-react";
import { RoomCard } from "./RoomCard";
import { Input } from "./ui/input";
import { useState } from "react";

interface Room {
  id: string;
  name: string;
  currentSong: string;
  artist: string;
  albumCover: string;
  memberCount: number;
  isPlaying: boolean;
  isPrivate?: boolean;
  password?: string;
  creatorName: string;
  creatorAvatar: string;
}

interface DiscoverPageProps {
  allRooms: Room[];
  onRoomClick: (roomId: string) => void;
}

export function DiscoverPage({ allRooms, onRoomClick }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Sort by member count (trending) - show all rooms now
  const trendingRooms = [...allRooms].sort(
    (a, b) => b.memberCount - a.memberCount
  );

  // Filter based on search
  const filteredRooms = searchQuery
    ? allRooms.filter(
        (room) =>
          room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.currentSong.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : trendingRooms;

  return (
    <div className="min-h-screen bg-[#1E1E1E] pb-[120px] max-w-[430px] mx-auto">
      {/* Top Safe Area */}
      <div className="h-[44px]" />

      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-white text-[34px] tracking-tight mb-4">Discover</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rooms, songs, artists..."
            className="bg-[#2C2C2C] border-none text-white pl-10 h-12 rounded-xl placeholder:text-[#666666]"
          />
        </div>
      </div>



      {/* Room List */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#999999]">
            {searchQuery
              ? `${filteredRooms.length} result${
                  filteredRooms.length !== 1 ? "s" : ""
                }`
              : "All Rooms"}
          </h2>
        </div>

        <div className="space-y-3">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                id={room.id}
                name={room.name}
                currentSong={room.currentSong}
                artist={room.artist}
                albumCover={room.albumCover}
                memberCount={room.memberCount}
                isPlaying={room.isPlaying}
                isPrivate={room.isPrivate}
                creatorName={room.creatorName}
                creatorAvatar={room.creatorAvatar}
                onClick={() => onRoomClick(room.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[#666666]">
                {searchQuery
                  ? "No rooms found"
                  : "No rooms available. Create one to get started!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
