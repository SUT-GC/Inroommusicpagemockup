import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserPlus, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { UserInfoSheet } from "./UserInfoSheet";
import { toast } from "sonner@2.0.3";

interface Member {
  id: string;
  name: string;
  avatar: string;
  isCreator: boolean;
}

interface RoomMembersAreaProps {
  members: Member[];
  onInvite: () => void;
  realtimeMessage?: string;
}

export function RoomMembersArea({
  members,
  onInvite,
  realtimeMessage,
}: RoomMembersAreaProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [memberData, setMemberData] = useState<{
    listeningHours: number;
    isFriend: boolean;
  } | null>(null);

  useEffect(() => {
    if (realtimeMessage) {
      setShowMessage(true);
      setOpacity(1);

      const fadeTimeout = setTimeout(() => {
        const fadeInterval = setInterval(() => {
          setOpacity((prev) => {
            const newOpacity = prev - 0.05;
            if (newOpacity <= 0) {
              clearInterval(fadeInterval);
              setShowMessage(false);
              return 0;
            }
            return newOpacity;
          });
        }, 50);
      }, 2000);

      return () => clearTimeout(fadeTimeout);
    }
  }, [realtimeMessage]);

  const displayMembers = members.slice(0, 5);
  const remainingCount = Math.max(0, members.length - 5);

  return (
    <div className="px-5 pb-3">
      {/* Title Bar */}
      <div className="flex items-center justify-between w-full max-w-[280px] mx-auto">
        <h3 className="text-white">Room Members</h3>
        <button
          onClick={onInvite}
          className="flex items-center gap-1 text-[#34C759] active:opacity-60 transition-opacity"
        >
          <UserPlus className="w-5 h-5" />
          <span>Invite</span>
        </button>
      </div>

      {/* Member Avatar List */}
      <div className="flex gap-3 mt-[15px] overflow-x-auto hide-scrollbar px-[10px]">
        {members.map((member) => (
          <div key={member.id} className="flex flex-col items-center flex-shrink-0">
            <button
              onClick={() => {
                setSelectedMember(member);
                // Generate data once when member is clicked
                setMemberData({
                  listeningHours: Math.floor(Math.random() * 50) + 5,
                  isFriend: Math.random() > 0.3, // 70% chance of being friends
                });
                setShowUserInfo(true);
              }}
              className="relative active:opacity-60 transition-opacity"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-[#333333] text-white">
                  {member.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {member.isCreator && (
                <div className="absolute -top-1 -right-1">
                  <Crown className="w-3 h-3 text-[#34C759] fill-[#34C759]" />
                </div>
              )}
            </button>
            <span className="text-white mt-2 max-w-[40px] truncate">
              {member.name.length > 4
                ? `${member.name.slice(0, 4)}...`
                : member.name}
            </span>
          </div>
        ))}
      </div>

      {/* Real-Time Prompt */}
      {showMessage && (
        <p
          className="text-[#999999] text-center mt-[10px]"
          style={{ opacity }}
        >
          {realtimeMessage}
        </p>
      )}

      {/* User Info Sheet */}
      {selectedMember && memberData && (
        <UserInfoSheet
          open={showUserInfo}
          onOpenChange={setShowUserInfo}
          userName={selectedMember.name}
          userAvatar={selectedMember.avatar}
          listeningHours={memberData.listeningHours}
          isFriend={memberData.isFriend}
          onSendMessage={() => {
            setShowUserInfo(false);
            toast.success(`Opening chat with ${selectedMember.name}`);
          }}
          onAddFriend={() => {
            setShowUserInfo(false);
            toast.success(`Friend request sent to ${selectedMember.name}`);
          }}
        />
      )}
    </div>
  );
}
