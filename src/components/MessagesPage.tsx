import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { ChatPage } from "./ChatPage";
import { SwipeableMessageCard } from "./SwipeableMessageCard";
import { toast } from "sonner@2.0.3";

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  listeningHours: number;
  isPinned?: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    userId: "alex",
    userName: "Alex",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    lastMessage: "Hey! Let's listen to that new album together 🎵",
    timestamp: "2m ago",
    unread: true,
    listeningHours: 24.5,
    isPinned: true,
  },
  {
    id: "2",
    userId: "sarah",
    userName: "Sarah",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "Thanks for the room invite!",
    timestamp: "1h ago",
    unread: true,
    listeningHours: 15.2,
    isPinned: true,
  },
  {
    id: "3",
    userId: "mike",
    userName: "Mike",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    lastMessage: "That jazz session was amazing 👌",
    timestamp: "3h ago",
    unread: false,
    listeningHours: 42.8,
    isPinned: false,
  },
  {
    id: "4",
    userId: "emma",
    userName: "Emma",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    lastMessage: "See you at 8pm for the concert stream!",
    timestamp: "1d ago",
    unread: false,
    listeningHours: 8.3,
    isPinned: false,
  },
];

export function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);
  const [messages, setMessages] = useState(mockMessages);

  const filteredMessages = messages.filter((msg) =>
    msg.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    toast.success("Message deleted");
  };

  const handlePin = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, isPinned: !msg.isPinned } : msg
      )
    );
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      toast.success(message.isPinned ? "Unpinned" : "Pinned to top");
    }
  };

  const handleToggleRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, unread: !msg.unread } : msg
      )
    );
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      toast.success(message.unread ? "Marked as read" : "Marked as unread");
    }
  };

  // Show chat page if a conversation is selected
  if (selectedChat) {
    return (
      <ChatPage
        userId={selectedChat.userId}
        userName={selectedChat.userName}
        userAvatar={selectedChat.userAvatar}
        listeningHours={selectedChat.listeningHours}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] pb-[120px] max-w-[430px] mx-auto">
      {/* Top Safe Area */}
      <div className="h-[44px]" />

      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-[34px] tracking-tight">Messages</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="bg-[#2C2C2C] border-none text-white pl-10 h-12 rounded-xl placeholder:text-[#666666]"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="px-5">
        {filteredMessages.length > 0 ? (
          <div className="space-y-1">
            {filteredMessages.map((message) => (
              <SwipeableMessageCard
                key={message.id}
                message={message}
                onClick={() => setSelectedChat(message)}
                onDelete={handleDelete}
                onPin={handlePin}
                onToggleRead={handleToggleRead}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#666666]">
              {searchQuery ? "No messages found" : "No messages yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
