import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { Lock } from "lucide-react";

interface RoomPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomName: string;
  onSubmit: (password: string) => void;
}

export function RoomPasswordDialog({
  open,
  onOpenChange,
  roomName,
  onSubmit,
}: RoomPasswordDialogProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password.trim()) {
      onSubmit(password.trim());
      setPassword("");
    }
  };

  const handleCancel = () => {
    setPassword("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2C2C2C] border-none text-white max-w-[280px]">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-[#3C3C3C] flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#34C759]" />
            </div>
          </div>
          <DialogTitle className="text-white text-center">
            Private Room
          </DialogTitle>
          <DialogDescription className="text-[#999999] text-center">
            "{roomName}" is password protected
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="room-password" className="text-white">
              Password
            </Label>
            <Input
              id="room-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter room password..."
              className="bg-[#1E1E1E] border-[#3C3C3C] text-white placeholder:text-[#666666]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCancel}
              className="flex-1 bg-[#3C3C3C] hover:bg-[#4C4C4C] text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!password.trim()}
              className="flex-1 bg-[#34C759] hover:bg-[#2da84c] text-white disabled:bg-[#3C3C3C] disabled:text-[#666666]"
            >
              Join
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
