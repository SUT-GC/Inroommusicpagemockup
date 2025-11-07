import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Music2, Play, Plus, Search, Trash2, ArrowUpToLine } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  albumCover: string;
}

interface PlaylistSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  songs: Song[];
  currentSongIndex: number;
  onSongSelect: (index: number) => void;
  onAddSong?: (song: Song) => void;
  onDeleteSong?: (index: number) => void;
  onPinSong?: (index: number) => void;
}

export function PlaylistSheet({
  open,
  onOpenChange,
  songs,
  currentSongIndex,
  onSongSelect,
  onAddSong,
  onDeleteSong,
  onPinSong,
}: PlaylistSheetProps) {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock search database
  const mockSongs: Song[] = [
    { id: 101, title: "Blinding Lights", artist: "The Weeknd", duration: 200, albumCover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400" },
    { id: 102, title: "Shape of You", artist: "Ed Sheeran", duration: 234, albumCover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400" },
    { id: 103, title: "Levitating", artist: "Dua Lipa", duration: 203, albumCover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400" },
    { id: 104, title: "Watermelon Sugar", artist: "Harry Styles", duration: 174, albumCover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400" },
    { id: 105, title: "Good 4 U", artist: "Olivia Rodrigo", duration: 178, albumCover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400" },
    { id: 106, title: "Stay", artist: "The Kid LAROI & Justin Bieber", duration: 141, albumCover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400" },
    { id: 107, title: "As It Was", artist: "Harry Styles", duration: 167, albumCover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400" },
    { id: 108, title: "Heat Waves", artist: "Glass Animals", duration: 239, albumCover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400" },
  ];

  const searchResults = searchQuery.trim()
    ? mockSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockSongs;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAddSong = (song: Song) => {
    if (onAddSong) {
      onAddSong(song);
      setSearchDialogOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="bg-[#1E1E1E] border-t border-[#3C3C3C] h-[80vh] rounded-t-3xl p-0"
      >
        <SheetHeader className="px-5 pt-6 pb-4 border-b border-[#3C3C3C]">
          <SheetTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music2 className="w-5 h-5 text-[#34C759]" />
              Playlist ({songs.length} songs)
            </div>
            {onAddSong && (
              <button
                onClick={() => setSearchDialogOpen(true)}
                className="w-8 h-8 rounded-full bg-[#34C759] flex items-center justify-center active:scale-95 transition-transform"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            )}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(80vh-80px)]">
          <div className="px-5 py-4">
            {songs.map((song, index) => {
              const isCurrentSong = index === currentSongIndex;
              return (
                <div
                  key={song.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl mb-2 transition-all ${
                    isCurrentSong
                      ? "bg-[#34C759]/10 border border-[#34C759]/30"
                      : "bg-[#2C2C2C]"
                  }`}
                >
                  {/* Clickable area for song selection */}
                  <button
                    onClick={() => {
                      onSongSelect(index);
                      onOpenChange(false);
                    }}
                    className="flex items-center gap-3 flex-1 min-w-0 active:opacity-70 transition-opacity"
                  >
                    {/* Album Cover */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={song.albumCover}
                          alt={song.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {isCurrentSong && (
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                          <Play
                            className="w-5 h-5 text-[#34C759]"
                            fill="#34C759"
                          />
                        </div>
                      )}
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 text-left min-w-0">
                      <p
                        className={`truncate ${
                          isCurrentSong ? "text-[#34C759]" : "text-white"
                        }`}
                      >
                        {song.title}
                      </p>
                      <p className="text-[#999999] text-sm truncate mt-0.5">
                        {song.artist}
                      </p>
                    </div>
                  </button>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Pin Button */}
                    {onPinSong && index !== 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPinSong(index);
                        }}
                        className="w-8 h-8 rounded-lg bg-[#3C3C3C] flex items-center justify-center active:scale-95 transition-transform"
                      >
                        <ArrowUpToLine className="w-4 h-4 text-[#34C759]" />
                      </button>
                    )}

                    {/* Delete Button */}
                    {onDeleteSong && songs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSong(index);
                        }}
                        className="w-8 h-8 rounded-lg bg-[#3C3C3C] flex items-center justify-center active:scale-95 transition-transform"
                      >
                        <Trash2 className="w-4 h-4 text-[#FF3B30]" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>

      {/* Search Dialog */}
      <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
        <DialogContent className="bg-[#1E1E1E] border border-[#3C3C3C] max-w-md max-h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-5 pt-6 pb-4 border-b border-[#3C3C3C]">
            <DialogTitle className="text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-[#34C759]" />
              Search Songs
            </DialogTitle>
          </DialogHeader>

          {/* Search Input */}
          <div className="px-5 py-4">
            <Input
              placeholder="Search by song or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#2C2C2C] border-[#3C3C3C] text-white placeholder:text-[#999999] focus-visible:ring-[#34C759]"
            />
          </div>

          {/* Search Results */}
          <ScrollArea className="flex-1 px-5 pb-5">
            <div className="space-y-2">
              {searchResults.length > 0 ? (
                searchResults.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => handleAddSong(song)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#2C2C2C] active:bg-[#3C3C3C] transition-all active:scale-[0.98]"
                  >
                    {/* Album Cover */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={song.albumCover}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-white truncate">{song.title}</p>
                      <p className="text-[#999999] text-sm truncate mt-0.5">
                        {song.artist}
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="flex-shrink-0 text-sm text-[#999999]">
                      {formatTime(song.duration)}
                    </div>

                    {/* Add Icon */}
                    <Plus className="w-5 h-5 text-[#34C759] flex-shrink-0" />
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-[#999999]">
                  No songs found
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
}
