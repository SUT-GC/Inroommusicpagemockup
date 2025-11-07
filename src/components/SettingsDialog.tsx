import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomName: string;
  onRoomNameChange: (name: string) => void;
  creatorOnlyMode: boolean;
  onCreatorOnlyModeChange: (enabled: boolean) => void;
  isPrivate: boolean;
  onIsPrivateChange: (isPrivate: boolean) => void;
}

export function SettingsDialog({
  open,
  onOpenChange,
  roomName,
  onRoomNameChange,
  creatorOnlyMode,
  onCreatorOnlyModeChange,
  isPrivate,
  onIsPrivateChange,
}: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2C2C2C] border-none text-white max-w-[260px]">
        <DialogHeader>
          <DialogTitle className="text-white">Room Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="room-name" className="text-white">
              Room Name
            </Label>
            <Input
              id="room-name"
              value={roomName}
              onChange={(e) => onRoomNameChange(e.target.value)}
              className="bg-[#1E1E1E] border-[#3C3C3C] text-white"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="private-room" className="text-white">
              Private Room
            </Label>
            <Switch
              id="private-room"
              checked={isPrivate}
              onCheckedChange={onIsPrivateChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="creator-mode" className="text-white">
              Only Creator Can Switch Songs
            </Label>
            <Switch
              id="creator-mode"
              checked={creatorOnlyMode}
              onCheckedChange={onCreatorOnlyModeChange}
            />
          </div>
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-[#34C759] hover:bg-[#2da84c] text-white"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
