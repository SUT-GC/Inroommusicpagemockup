import { useState, useEffect } from "react";
import { TopNavigation } from "./TopNavigation";
import { AlbumPlaybackArea } from "./AlbumPlaybackArea";
import { RoomMembersArea } from "./RoomMembersArea";
import { SettingsDialog } from "./SettingsDialog";
import { InviteDialog } from "./InviteDialog";
import { RoomChatContent } from "./RoomChatContent";
import { PlaylistSheet } from "./PlaylistSheet";
import { toast } from "sonner@2.0.3";
import { motion, useMotionValue, animate } from "motion/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  albumCover: string;
  lyrics: string[];
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  isCreator: boolean;
}

interface InRoomPageProps {
  roomId: string;
  roomName: string;
  songs: Song[];
  members: Member[];
  onBack: () => void;
}

export function InRoomPage({
  roomId,
  roomName: initialRoomName,
  songs: initialSongs,
  members,
  onBack,
}: InRoomPageProps) {
  const [songs, setSongs] = useState(initialSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [roomName, setRoomName] = useState(initialRoomName);
  const [creatorOnlyMode, setCreatorOnlyMode] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 0 = Music, 1 = Chat
  const [unreadChatCount, setUnreadChatCount] = useState(5);
  const [realtimeMessage, setRealtimeMessage] = useState("");
  
  const x = useMotionValue(0);
  const containerWidth = 430; // Max width of the container

  const currentSong = songs[currentSongIndex];

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= currentSong.duration) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSong.duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const newIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
    setCurrentSongIndex(newIndex);
    setCurrentTime(0);
    setRealtimeMessage("User A is switching songs");
  };

  const handleNext = () => {
    const newIndex = currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
    setCurrentSongIndex(newIndex);
    setCurrentTime(0);
    setRealtimeMessage("User A is switching songs");
  };

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleShare = () => {
    toast.success("Share options opened");
  };

  const handleReport = () => {
    toast.success("Report submitted");
  };

  const handleExitClick = () => {
    setShowExitConfirm(true);
  };

  const handleExitConfirm = () => {
    setShowExitConfirm(false);
    toast.success("Exiting room...");
    onBack();
  };

  const handleInvite = () => {
    setShowInvite(true);
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handlePlaylist = () => {
    setShowPlaylist(true);
  };

  const handleSongSelect = (index: number) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setRealtimeMessage("User A is switching songs");
  };

  const handleAddSong = (newSong: Song) => {
    setSongs([...songs, newSong]);
    toast.success(`Added "${newSong.title}" to playlist`);
  };

  const handleDeleteSong = (index: number) => {
    if (songs.length <= 1) {
      toast.error("Cannot delete the last song");
      return;
    }

    const deletedSong = songs[index];
    const newSongs = songs.filter((_, i) => i !== index);
    setSongs(newSongs);
    
    // Adjust current song index if needed
    if (index === currentSongIndex) {
      // If deleting current song, play the next one (or previous if it was the last)
      setCurrentSongIndex(index >= newSongs.length ? newSongs.length - 1 : index);
      setCurrentTime(0);
    } else if (index < currentSongIndex) {
      // If deleting a song before current, adjust the index
      setCurrentSongIndex(currentSongIndex - 1);
    }
    
    toast.success(`Removed "${deletedSong.title}" from playlist`);
  };

  const handlePinSong = (index: number) => {
    if (index === 0) return; // Already at top
    
    const pinnedSong = songs[index];
    const newSongs = [pinnedSong, ...songs.filter((_, i) => i !== index)];
    setSongs(newSongs);
    
    // Play the pinned song immediately
    setCurrentSongIndex(0);
    setCurrentTime(0);
    setIsPlaying(true);
    
    toast.success(`Playing "${pinnedSong.title}"`);
  };

  const handleChat = () => {
    // Switch to chat page
    switchToPage(1);
  };

  const switchToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    const targetX = -pageIndex * containerWidth;
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
    
    // Clear unread count when opening chat
    if (pageIndex === 1) {
      setUnreadChatCount(0);
    }
  };

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 50; // Minimum drag distance to switch pages
    const velocity = info.velocity.x;
    
    // Calculate which page to snap to
    let targetPage = currentPage;
    
    if (Math.abs(velocity) > 500) {
      // Fast swipe
      targetPage = velocity > 0 ? Math.max(0, currentPage - 1) : Math.min(1, currentPage + 1);
    } else if (Math.abs(info.offset.x) > threshold) {
      // Slow drag past threshold
      targetPage = info.offset.x > 0 ? Math.max(0, currentPage - 1) : Math.min(1, currentPage + 1);
    }
    
    switchToPage(targetPage);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] relative overflow-hidden max-w-[430px] mx-auto">
      {/* Top Safe Area */}
      <div className="h-[44px]" />

      {/* Top Navigation */}
      <TopNavigation
        roomName={roomName}
        onBack={handleExitClick}
        onShare={handleShare}
        onReport={handleReport}
        onExit={handleExitClick}
        onChat={currentPage === 0 ? handleChat : undefined}
        unreadChatCount={currentPage === 0 ? unreadChatCount : undefined}
        onSettings={currentPage === 0 ? handleSettings : undefined}
      />

      {/* Page Indicator - Always show at top */}
      <div className="flex justify-center gap-2 py-3">
        <div
          className={`w-2 h-2 rounded-full transition-all ${
            currentPage === 0 ? "bg-[#34C759] w-5" : "bg-[#666666]"
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full transition-all ${
            currentPage === 1 ? "bg-[#34C759] w-5" : "bg-[#666666]"
          }`}
        />
      </div>

      {/* Swipeable Pages Container */}
      <div className="relative overflow-hidden h-[calc(100vh-88px-34px)]">
        <motion.div
          className="flex h-full"
          style={{ x }}
          initial={{ x: 0 }}
          drag="x"
          dragConstraints={{ left: -containerWidth, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {/* Page 1: Music Page (Album + Members) */}
          <div className="w-full min-w-[430px] flex-shrink-0 flex flex-col h-full overflow-y-auto pb-[34px]">
            {/* Album Playback Area with Controls */}
            <AlbumPlaybackArea
              albumCover={currentSong.albumCover}
              songTitle={currentSong.title}
              artist={currentSong.artist}
              currentTime={currentTime}
              duration={currentSong.duration}
              isPlaying={isPlaying}
              listenersCount={members.length}
              songs={songs}
              currentIndex={currentSongIndex}
              onProgressChange={handleProgressChange}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onPlaylistOpen={handlePlaylist}
            />

            {/* Room Members Area */}
            <div className="mt-6">
              <RoomMembersArea
                members={members}
                onInvite={handleInvite}
                realtimeMessage={realtimeMessage}
              />
            </div>
          </div>

          {/* Page 2: Chat Page */}
          <div className="w-full min-w-[430px] flex-shrink-0 h-full">
            <RoomChatContent />
          </div>
        </motion.div>
      </div>

      {/* Settings Dialog */}
      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        roomName={roomName}
        onRoomNameChange={setRoomName}
        creatorOnlyMode={creatorOnlyMode}
        onCreatorOnlyModeChange={setCreatorOnlyMode}
        isPrivate={isPrivate}
        onIsPrivateChange={setIsPrivate}
      />

      {/* Invite Dialog */}
      <InviteDialog
        open={showInvite}
        onOpenChange={setShowInvite}
        roomName={roomName}
        roomLink={`https://listentogether.app/room/${roomId}`}
      />

      {/* Playlist Sheet */}
      <PlaylistSheet
        open={showPlaylist}
        onOpenChange={setShowPlaylist}
        songs={songs}
        currentSongIndex={currentSongIndex}
        onSongSelect={handleSongSelect}
        onAddSong={handleAddSong}
        onDeleteSong={handleDeleteSong}
        onPinSong={handlePinSong}
      />

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
        <AlertDialogContent className="bg-[#2C2C2C] border-none max-w-[320px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Exit Room?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#999999]">
              Are you sure you want to leave "{roomName}"? You can always rejoin later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#3C3C3C] text-white border-none hover:bg-[#4C4C4C]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleExitConfirm}
              className="bg-[#FF3B30] text-white hover:bg-[#FF3B30]/90"
            >
              Exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
