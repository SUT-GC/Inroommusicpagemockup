import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface LyricsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lyrics: string[];
}

export function LyricsSheet({ open, onOpenChange, lyrics }: LyricsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="bg-black/95 border-none text-white h-[70vh]"
      >
        <SheetHeader>
          <SheetTitle className="text-white text-center">Lyrics</SheetTitle>
        </SheetHeader>
        <div className="mt-6 overflow-y-auto h-[calc(100%-60px)] flex flex-col items-center gap-4">
          {lyrics.map((line, index) => (
            <p key={index} className="text-center text-white/80">
              {line}
            </p>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
