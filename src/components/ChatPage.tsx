import { ChevronLeft, MoreVertical, Send, Music2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { UserInfoSheet } from "./UserInfoSheet";

interface ChatMessage {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: string;
  type?: "text" | "room-invite";
  roomData?: {
    roomName: string;
    songName: string;
    memberCount: number;
  };
}

interface ChatPageProps {
  userId: string;
  userName: string;
  userAvatar: string;
  listeningHours?: number;
  onBack: () => void;
}

const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    text: "Hey! How are you doing?",
    sender: "them",
    timestamp: "10:30 AM",
    type: "text",
  },
  {
    id: "2",
    text: "I'm great! Just discovered some awesome new music 🎵",
    sender: "me",
    timestamp: "10:32 AM",
    type: "text",
  },
  {
    id: "3",
    text: "Nice! What have you been listening to?",
    sender: "them",
    timestamp: "10:33 AM",
    type: "text",
  },
  {
    id: "4",
    text: "Check out this room I'm in! You should join",
    sender: "me",
    timestamp: "10:35 AM",
    type: "text",
  },
  {
    id: "5",
    text: "",
    sender: "me",
    timestamp: "10:35 AM",
    type: "room-invite",
    roomData: {
      roomName: "Chill Vibes",
      songName: "Blinding Lights",
      memberCount: 8,
    },
  },
  {
    id: "6",
    text: "That sounds amazing! Let me join 🎧",
    sender: "them",
    timestamp: "10:36 AM",
    type: "text",
  },
];

export function ChatPage({
  userId,
  userName,
  userAvatar,
  listeningHours = 0,
  onBack,
}: ChatPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputValue, setInputValue] = useState("");
  const [showUserInfo, setShowUserInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "me",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      type: "text",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] max-w-[430px] mx-auto flex flex-col">
      {/* Top Safe Area */}
      <div className="h-[44px] bg-[#2C2C2C]" />

      {/* Header */}
      <div className="bg-[#2C2C2C] px-4 py-3 flex items-center gap-3 border-b border-[#3C3C3C]">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center active:opacity-60 transition-opacity -ml-1"
        >
          <ChevronLeft className="w-6 h-6 text-[#34C759]" />
        </button>

        {/* User Info */}
        <button
          onClick={() => setShowUserInfo(true)}
          className="flex-1 flex items-center gap-3 min-w-0 active:opacity-70 transition-opacity"
        >
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-[#34C759] text-white">
                {userName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="absolute top-0 right-0 w-3 h-3 bg-[#34C759] border-2 border-[#2C2C2C] rounded-full" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h2 className="text-white truncate">{userName}</h2>
          </div>
        </button>

        {/* More Options */}
        <button className="w-9 h-9 flex items-center justify-center active:opacity-60 transition-opacity">
          <MoreVertical className="w-5 h-5 text-[#8E8E93]" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-[100px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] ${
                message.sender === "me" ? "items-end" : "items-start"
              } flex flex-col gap-1`}
            >
              {/* Message Bubble */}
              {message.type === "text" ? (
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === "me"
                      ? "bg-[#34C759] text-white rounded-br-md"
                      : "bg-[#2C2C2C] text-white rounded-bl-md"
                  }`}
                >
                  <p className="break-words">{message.text}</p>
                </div>
              ) : message.type === "room-invite" && message.roomData ? (
                <div
                  className={`w-full bg-[#2C2C2C] border border-[#3C3C3C] rounded-2xl p-3 ${
                    message.sender === "me" ? "rounded-br-md" : "rounded-bl-md"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#34C759] rounded-lg flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate">
                        {message.roomData.roomName}
                      </p>
                      <p className="text-[#8E8E93] text-xs truncate">
                        {message.roomData.songName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8E8E93] text-xs">
                      {message.roomData.memberCount} listening
                    </span>
                    <button className="px-3 py-1.5 bg-[#34C759] text-white text-xs rounded-full active:scale-95 transition-transform">
                      Join
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Timestamp */}
              <span className="text-[#666666] text-[10px] px-2">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-[#2C2C2C] border-t border-[#3C3C3C] px-4 py-3">
        <div className="flex items-end gap-2">
          {/* Input Field */}
          <div className="flex-1 bg-[#1E1E1E] rounded-2xl px-4 py-2 min-h-[40px] flex items-center">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message..."
              className="bg-transparent border-none text-white placeholder:text-[#666666] p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              inputValue.trim()
                ? "bg-[#34C759] text-white"
                : "bg-[#3C3C3C] text-[#666666]"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* User Info Sheet */}
      <UserInfoSheet
        open={showUserInfo}
        onOpenChange={setShowUserInfo}
        userName={userName}
        userAvatar={userAvatar}
        listeningHours={listeningHours}
      />
    </div>
  );
}
