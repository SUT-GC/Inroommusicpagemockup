import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock } from "lucide-react";

interface CreateRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (roomName: string, password?: string) => void;
}

export function CreateRoomDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateRoomDialogProps) {
  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");

  const handleCreate = () => {
    if (roomName.trim()) {
      if (isPrivate && !password.trim()) {
        return; // 私有房间必须设置密码
      }
      onCreate(roomName.trim(), isPrivate ? password.trim() : undefined);
      setRoomName("");
      setIsPrivate(false);
      setPassword("");
      onOpenChange(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // 关闭时重置所有状态
      setRoomName("");
      setIsPrivate(false);
      setPassword("");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#2C2C2C] border-none text-white max-w-[280px]">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            Create New Room
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Room Name Input */}
          <div className="space-y-2">
            <Label htmlFor="new-room-name" className="text-white">
              Room Name
            </Label>
            <Input
              id="new-room-name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name..."
              className="bg-[#1E1E1E] border-[#3C3C3C] text-white placeholder:text-[#666666]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isPrivate) {
                  handleCreate();
                }
              }}
            />
          </div>

          {/* Private Room Switch */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#999999]" />
              <Label htmlFor="private-room" className="text-white cursor-pointer">
                Private Room
              </Label>
            </div>
            <Switch
              id="private-room"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
              className="data-[state=checked]:bg-[#34C759]"
            />
          </div>

          {/* Password Input (Animated) */}
          <AnimatePresence>
            {isPrivate && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-2">
                  <Label htmlFor="room-password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="room-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set room password..."
                    className="bg-[#1E1E1E] border-[#3C3C3C] text-white placeholder:text-[#666666]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCreate();
                      }
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={() => handleOpenChange(false)}
              className="flex-1 bg-[#3C3C3C] hover:bg-[#4C4C4C] text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!roomName.trim() || (isPrivate && !password.trim())}
              className="flex-1 bg-[#34C759] hover:bg-[#2da84c] text-white disabled:bg-[#3C3C3C] disabled:text-[#666666]"
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
