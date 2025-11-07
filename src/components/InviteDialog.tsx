import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Share2, Copy } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomName: string;
  roomLink: string;
}

export function InviteDialog({
  open,
  onOpenChange,
  roomName,
  roomLink,
}: InviteDialogProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomLink);
    toast.success("Link copied to clipboard!");
  };

  const handleShareWeChat = () => {
    toast.success("Opening WeChat...");
  };

  const handleShareQQ = () => {
    toast.success("Opening QQ...");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2C2C2C] border-none text-white max-w-[260px]">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            Invite to {roomName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <Button
            onClick={handleShareWeChat}
            className="w-full bg-[#1E1E1E] hover:bg-[#2C2C2C] text-white border border-[#3C3C3C]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share via WeChat
          </Button>
          <Button
            onClick={handleShareQQ}
            className="w-full bg-[#1E1E1E] hover:bg-[#2C2C2C] text-white border border-[#3C3C3C]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share via QQ
          </Button>
          <Button
            onClick={handleCopyLink}
            className="w-full bg-[#34C759] hover:bg-[#2da84c] text-white"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
