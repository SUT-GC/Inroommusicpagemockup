import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Music2, MessageCircle, UserPlus } from "lucide-react";

interface UserInfoSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userAvatar: string;
  listeningHours: number;
  isFriend?: boolean;
  onSendMessage?: () => void;
  onAddFriend?: () => void;
}

export function UserInfoSheet({
  open,
  onOpenChange,
  userName,
  userAvatar,
  listeningHours,
  isFriend = true,
  onSendMessage,
  onAddFriend,
}: UserInfoSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="bg-[#2C2C2C] border-t border-[#3C3C3C] rounded-t-3xl max-w-[430px] mx-auto"
      >
        <SheetHeader className="space-y-6">
          <SheetTitle className="sr-only">{userName} Profile</SheetTitle>
          
          {/* User Avatar and Info */}
          <div className="flex flex-col items-center pt-4">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-[#34C759] text-white text-2xl">
                  {userName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute top-1 right-1 w-5 h-5 bg-[#34C759] border-[3px] border-[#2C2C2C] rounded-full" />
            </div>
            
            <h2 className="text-white text-2xl">{userName}</h2>
          </div>

          {/* Stats Card */}
          <div className="bg-[#1E1E1E] rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#34C759]/20 rounded-full flex items-center justify-center">
                <Music2 className="w-6 h-6 text-[#34C759]" />
              </div>
              <div className="flex-1">
                <p className="text-[#8E8E93] text-sm">Listened together</p>
                <p className="text-white text-xl">{listeningHours} hours</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pb-4">
            {isFriend ? (
              <>
                <button 
                  onClick={onSendMessage}
                  className="w-full bg-[#34C759] text-white py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-98 transition-transform"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
                
                <button className="w-full bg-[#1E1E1E] text-white py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-98 transition-transform">
                  <Music2 className="w-5 h-5" />
                  <span>Invite to Listen</span>
                </button>
              </>
            ) : (
              <button 
                onClick={onAddFriend}
                className="w-full bg-[#34C759] text-white py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-98 transition-transform"
              >
                <UserPlus className="w-5 h-5" />
                <span>Add Friend</span>
              </button>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
