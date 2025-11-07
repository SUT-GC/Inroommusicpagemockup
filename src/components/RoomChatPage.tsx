import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { motion } from "motion/react";

interface RoomChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  isMe: boolean;
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  isCreator: boolean;
}

interface RoomChatPageProps {
  members: Member[];
}

const mockMessages: RoomChatMessage[] = [
  {
    id: "1",
    text: "Hey everyone! Love this song 🎵",
    senderId: "user1",
    senderName: "Alice",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    timestamp: "10:30 AM",
    isMe: false,
  },
  {
    id: "2",
    text: "Same here! The beat is amazing 🔥",
    senderId: "me",
    senderName: "You",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    timestamp: "10:31 AM",
    isMe: true,
  },
  {
    id: "3",
    text: "Can we play that other song next?",
    senderId: "user2",
    senderName: "Bob",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    timestamp: "10:32 AM",
    isMe: false,
  },
  {
    id: "4",
    text: "Sure! Let me add it to the queue",
    senderId: "user1",
    senderName: "Alice",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    timestamp: "10:33 AM",
    isMe: false,
  },
  {
    id: "5",
    text: "This is so much fun! 🎉",
    senderId: "user3",
    senderName: "Charlie",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    timestamp: "10:34 AM",
    isMe: false,
  },
  {
    id: "6",
    text: "Thanks for creating this room!",
    senderId: "me",
    senderName: "You",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    timestamp: "10:35 AM",
    isMe: true,
  },
  {
    id: "7",
    text: "Anyone want to suggest the next song?",
    senderId: "user1",
    senderName: "Alice",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    timestamp: "10:36 AM",
    isMe: false,
  },
];

export function RoomChatPage({ members }: RoomChatPageProps) {
  const [messages, setMessages] = useState<RoomChatMessage[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: RoomChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      senderId: "me",
      senderName: "You",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      isMe: true,
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
    <div className="h-full flex flex-col bg-[#1E1E1E]">
      {/* Safe Area Top */}
      <div className="h-[44px]" />

      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-[#2C2C2C]">
        <h2 className="text-white">Room Chat</h2>
        <p className="text-[#999999] text-xs mt-1">
          {members.length} {members.length === 1 ? "member" : "members"} online
        </p>
      </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="p-5 space-y-4">
          {messages.map((message, index) => {
            // Check if we should show the avatar (first message or different sender from previous)
            const showAvatar =
              index === 0 ||
              messages[index - 1].senderId !== message.senderId;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-2 ${message.isMe ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className="w-8 flex-shrink-0">
                  {!message.isMe && showAvatar && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.senderAvatar} />
                      <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`flex flex-col ${message.isMe ? "items-end" : "items-start"} max-w-[75%]`}
                >
                  {!message.isMe && showAvatar && (
                    <span className="text-[#999999] text-xs mb-1 px-3">
                      {message.senderName}
                    </span>
                  )}
                  <div
                    className={`px-4 py-2.5 rounded-[18px] ${
                      message.isMe
                        ? "bg-[#34C759] text-white"
                        : "bg-[#2C2C2C] text-white"
                    }`}
                  >
                    <p className="break-words">{message.text}</p>
                  </div>
                  <span className="text-[#666666] text-xs mt-1 px-3">
                    {message.timestamp}
                  </span>
                </div>

                {/* Spacer for alignment */}
                {message.isMe && <div className="w-8" />}
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-5 bg-[#1E1E1E] border-t border-[#2C2C2C]">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message..."
              className="bg-[#2C2C2C] border-none text-white placeholder:text-[#666666] h-10 rounded-[20px] px-4"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-full bg-[#34C759] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Bottom Safe Area */}
      <div className="h-[114px]" />
    </div>
  );
}
