import { useState } from "react";
import { RoomListPage } from "./components/RoomListPage";
import { DiscoverPage } from "./components/DiscoverPage";
import { MessagesPage } from "./components/MessagesPage";
import { ProfilePage } from "./components/ProfilePage";
import { InRoomPage } from "./components/InRoomPage";
import { RoomPasswordDialog } from "./components/RoomPasswordDialog";
import { CreateRoomDialog } from "./components/CreateRoomDialog";
import { BottomNavBar } from "./components/BottomNavBar";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

// Mock data - Songs
const songs = [
  {
    id: 1,
    title: "Sunset Dreams",
    artist: "Sunset Rollercoaster",
    duration: 270,
    albumCover:
      "https://images.unsplash.com/photo-1564178413634-1ec30062c5e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGFsYnVtJTIwbXVzaWN8ZW58MXx8fHwxNzYxNzI2MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lyrics: [
      "In the golden hour light",
      "We dance until the night",
      "Sunset dreams come alive",
      "In this moment we survive",
      "",
      "Colors fade to gray",
      "But our love will stay",
      "Forever and a day",
      "In this sunset bay",
    ],
  },
  {
    id: 2,
    title: "Midnight Jazz",
    artist: "The Blue Notes",
    duration: 315,
    albumCover:
      "https://images.unsplash.com/photo-1710951403141-353d4e5c7cbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjE3MTQ5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lyrics: [
      "In the cool midnight air",
      "Jazz notes everywhere",
      "Smooth and sweet melody",
      "Sets our spirits free",
    ],
  },
  {
    id: 3,
    title: "Morning Breeze",
    artist: "Acoustic Soul",
    duration: 245,
    albumCover:
      "https://images.unsplash.com/photo-1622817245531-a07976979cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHJvY2slMjBjb25jZXJ0fGVufDF8fHx8MTc2MTcyNjQ4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lyrics: [
      "Morning breeze whispers soft",
      "Carries dreams aloft",
      "New day brings new hope",
      "Helping us to cope",
    ],
  },
  {
    id: 4,
    title: "Electric Pulse",
    artist: "Digital Dreams",
    duration: 290,
    albumCover:
      "https://images.unsplash.com/photo-1692176548571-86138128e36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBkanxlbnwxfHx8fDE3NjE2NTIxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lyrics: [
      "Feel the rhythm flow",
      "Let the music grow",
      "Electric pulse inside",
      "Take me for a ride",
    ],
  },
];

// Mock data - Members
const members = [
  {
    id: "1",
    name: "Alex",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    isCreator: true,
  },
  {
    id: "2",
    name: "Sarah",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isCreator: false,
  },
  {
    id: "3",
    name: "Mike",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    isCreator: false,
  },
  {
    id: "4",
    name: "Emma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    isCreator: false,
  },
  {
    id: "5",
    name: "John",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    isCreator: false,
  },
  {
    id: "6",
    name: "Lisa",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    isCreator: false,
  },
  {
    id: "7",
    name: "David",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    isCreator: false,
  },
  {
    id: "8",
    name: "Sophia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    isCreator: false,
  },
  {
    id: "9",
    name: "Ryan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
    isCreator: false,
  },
  {
    id: "10",
    name: "Olivia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    isCreator: false,
  },
];

// Initial rooms data
const initialRooms = [
  {
    id: "1",
    name: "Sunset Rollercoaster Exclusive",
    currentSong: "Sunset Dreams",
    artist: "Sunset Rollercoaster",
    albumCover:
      "https://images.unsplash.com/photo-1564178413634-1ec30062c5e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGFsYnVtJTIwbXVzaWN8ZW58MXx8fHwxNzYxNzI2MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    memberCount: 6,
    isPlaying: true,
    isPrivate: true,
    password: "1234",
    creatorName: "Alex",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "2",
    name: "Late Night Jazz Sessions",
    currentSong: "Midnight Jazz",
    artist: "The Blue Notes",
    albumCover:
      "https://images.unsplash.com/photo-1710951403141-353d4e5c7cbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjE3MTQ5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    memberCount: 3,
    isPlaying: true,
    isPrivate: false,
    creatorName: "Sarah",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "3",
    name: "Indie Vibes",
    currentSong: "Morning Breeze",
    artist: "Acoustic Soul",
    albumCover:
      "https://images.unsplash.com/photo-1622817245531-a07976979cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHJvY2slMjBjb25jZXJ0fGVufDF8fHx8MTc2MTcyNjQ4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    memberCount: 4,
    isPlaying: false,
    isPrivate: true,
    password: "indie2024",
    creatorName: "Mike",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
  {
    id: "4",
    name: "Electronic Paradise",
    currentSong: "Electric Pulse",
    artist: "Digital Dreams",
    albumCover:
      "https://images.unsplash.com/photo-1692176548571-86138128e36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBkanxlbnwxfHx8fDE3NjE2NTIxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    memberCount: 8,
    isPlaying: true,
    isPrivate: false,
    creatorName: "Emma",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<
    "discover" | "inroom" | "messages" | "profile"
  >("discover");
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [rooms, setRooms] = useState(initialRooms);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [pendingRoomId, setPendingRoomId] = useState<string | null>(null);

  const handleRoomClick = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room?.isPrivate) {
      setPendingRoomId(roomId);
      setShowPasswordDialog(true);
    } else {
      setCurrentRoomId(roomId);
      setCurrentTab("inroom");
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (pendingRoomId) {
      const room = rooms.find((r) => r.id === pendingRoomId);
      if (room && room.password === password) {
        setCurrentRoomId(pendingRoomId);
        setCurrentTab("inroom");
        setShowPasswordDialog(false);
        setPendingRoomId(null);
        toast.success("Successfully joined the room!");
      } else {
        toast.error("Incorrect password. Please try again.");
      }
    }
  };

  const handleBackToMain = () => {
    setCurrentRoomId(null);
    setCurrentTab("discover");
  };

  const handleCreateRoom = (roomName: string, password?: string) => {
    const newRoom = {
      id: `room-${Date.now()}`,
      name: roomName,
      currentSong: songs[0].title,
      artist: songs[0].artist,
      albumCover: songs[0].albumCover,
      memberCount: 1,
      isPlaying: false,
      isPrivate: !!password,
      password: password,
      creatorName: "You",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    };
    setRooms([newRoom, ...rooms]);
    toast.success(
      `${password ? "Private" : "Public"} room "${roomName}" created successfully!`
    );

    // Auto-join the new room
    setCurrentRoomId(newRoom.id);
    setCurrentTab("inroom");
  };

  const handleTabChange = (tab: "discover" | "inroom" | "messages" | "profile") => {
    setCurrentTab(tab);
  };

  const currentRoom = rooms.find((room) => room.id === currentRoomId);
  const pendingRoom = rooms.find((room) => room.id === pendingRoomId);

  return (
    <>
      {/* Render current tab */}
      {currentTab === "discover" && (
        <DiscoverPage allRooms={rooms} onRoomClick={handleRoomClick} />
      )}
      {currentTab === "inroom" && (
        <>
          {currentRoom ? (
            <InRoomPage
              roomId={currentRoom.id}
              roomName={currentRoom.name}
              songs={songs}
              members={members}
              onBack={handleBackToMain}
            />
          ) : (
            <RoomListPage onGoToDiscover={() => setCurrentTab("discover")} />
          )}
        </>
      )}
      {currentTab === "messages" && <MessagesPage />}
      {currentTab === "profile" && <ProfilePage />}

      {/* Bottom Navigation */}
      <BottomNavBar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onCreateRoom={() => setShowCreateDialog(true)}
        unreadMessages={2}
      />

      {/* Create Room Dialog */}
      <CreateRoomDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreate={handleCreateRoom}
      />

      {/* Room Password Dialog */}
      {pendingRoom && (
        <RoomPasswordDialog
          open={showPasswordDialog}
          onOpenChange={setShowPasswordDialog}
          roomName={pendingRoom.name}
          onSubmit={handlePasswordSubmit}
        />
      )}

      {/* Toast Notifications */}
      <Toaster position="top-center" />

      {/* Custom CSS for hiding scrollbar and safe area */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </>
  );
}
