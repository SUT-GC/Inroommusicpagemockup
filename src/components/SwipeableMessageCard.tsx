import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Trash2, Pin, Mail, MailOpen } from "lucide-react";

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

interface SwipeableMessageCardProps {
  message: Message;
  onClick: () => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onToggleRead: (id: string) => void;
}

export function SwipeableMessageCard({
  message,
  onClick,
  onDelete,
  onPin,
  onToggleRead,
}: SwipeableMessageCardProps) {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const SWIPE_THRESHOLD = -80;
  const ACTION_WIDTH = 240; // Width of all action buttons

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = offsetX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX.current;
    const newOffset = currentX.current + deltaX;

    // Only allow left swipe (negative offset)
    if (newOffset <= 0 && newOffset >= -ACTION_WIDTH) {
      setOffsetX(newOffset);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Snap to open or closed position
    if (offsetX < SWIPE_THRESHOLD) {
      setOffsetX(-ACTION_WIDTH);
    } else {
      setOffsetX(0);
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        offsetX !== 0
      ) {
        setOffsetX(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [offsetX]);

  const handleAction = (action: () => void) => {
    action();
    setOffsetX(0);
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-2xl">
      {/* Action Buttons (Hidden Behind) */}
      <div className="absolute inset-0 flex items-center justify-end">
        <button
          onClick={() => handleAction(() => onToggleRead(message.id))}
          className="h-full w-20 bg-[#007AFF] flex items-center justify-center active:bg-[#0056CC] transition-colors"
        >
          {message.unread ? (
            <MailOpen className="w-5 h-5 text-white" />
          ) : (
            <Mail className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={() => handleAction(() => onPin(message.id))}
          className="h-full w-20 bg-[#FF9500] flex items-center justify-center active:bg-[#CC7700] transition-colors"
        >
          <Pin className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => handleAction(() => onDelete(message.id))}
          className="h-full w-20 bg-[#FF3B30] flex items-center justify-center active:bg-[#CC2E25] transition-colors rounded-r-2xl"
        >
          <Trash2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Message Card */}
      <button
        onClick={onClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full bg-[#2C2C2C] rounded-2xl p-4 flex items-center gap-3 active:bg-[#3C3C3C] transition-colors overflow-hidden"
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        {/* Pin Indicator - Left Bar */}
        {message.isPinned && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF9500]" />
        )}

        {/* Unread Indicator */}
        {message.unread && (
          <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FF3B30] rounded-full" />
        )}

        {/* Avatar */}
        <Avatar className="w-12 h-12">
          <AvatarImage src={message.userAvatar} alt={message.userName} />
          <AvatarFallback className="bg-[#34C759] text-white">
            {message.userName[0]}
          </AvatarFallback>
        </Avatar>

        {/* Message Content */}
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white truncate">{message.userName}</h3>
            <span className="text-[#8E8E93] text-xs ml-2">
              {message.timestamp}
            </span>
          </div>
          <p
            className={`text-sm truncate mb-1 ${
              message.unread ? "text-white" : "text-[#8E8E93]"
            }`}
          >
            {message.lastMessage}
          </p>
          <p className="text-[#666666] text-xs">
            Listened together {message.listeningHours} hours
          </p>
        </div>
      </button>
    </div>
  );
}
