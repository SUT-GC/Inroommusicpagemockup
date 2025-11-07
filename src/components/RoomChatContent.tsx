import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
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

interface RoomChatContentProps {
  // No props needed for now, using mock data
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
  {
    id: "8",
    text: "I have a great playlist we can go through",
    senderId: "user2",
    senderName: "Bob",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    timestamp: "10:37 AM",
    isMe: false,
  },
  {
    id: "9",
    text: "That sounds perfect! 🎶",
    senderId: "me",
    senderName: "You",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    timestamp: "10:38 AM",
    isMe: true,
  },
  {
    id: "10",
    text: "How do I add songs to the queue?",
    senderId: "user3",
    senderName: "Charlie",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    timestamp: "10:39 AM",
    isMe: false,
  },
  {
    id: "11",
    text: "Let me show you, it's really easy!",
    senderId: "user1",
    senderName: "Alice",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    timestamp: "10:40 AM",
    isMe: false,
  },
  {
    id: "12",
    text: "This app is awesome! 😍",
    senderId: "user2",
    senderName: "Bob",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    timestamp: "10:41 AM",
    isMe: false,
  },
  {
    id: "13",
    text: "I know right? Best way to listen together",
    senderId: "me",
    senderName: "You",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    timestamp: "10:42 AM",
    isMe: true,
  },
  {
    id: "14",
    text: "We should do this more often!",
    senderId: "user3",
    senderName: "Charlie",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    timestamp: "10:43 AM",
    isMe: false,
  },
  {
    id: "15",
    text: "Definitely! Let's make it a weekly thing",
    senderId: "user1",
    senderName: "Alice",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    timestamp: "10:44 AM",
    isMe: false,
  },
];

export function RoomChatContent({}: RoomChatContentProps) {
  const [messages, setMessages] = useState<RoomChatMessage[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="space-y-4">
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
                  {showAvatar && (
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
              </motion.div>
            );
          })}
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="flex-shrink-0 pt-4 pb-[88px] px-5 bg-[#1E1E1E] border-t border-[#2C2C2C]">
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
    </div>
  );
}
