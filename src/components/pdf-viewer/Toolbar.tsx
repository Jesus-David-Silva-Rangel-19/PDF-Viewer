
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  StickyNote,
  Download,
  Share2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ToolbarProps {
  scale: number;
  setScale: (scale: number) => void;
  isNotesOpen: boolean;
  setIsNotesOpen: (open: boolean) => void;
}

export const Toolbar = ({
  scale,
  setScale,
  isNotesOpen,
  setIsNotesOpen,
}: ToolbarProps) => {
  return (
    <div className="h-14 border-b border-zinc-200 bg-white px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm text-zinc-600 min-w-[48px] text-center">
          {Math.round(scale * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setScale((s) => Math.min(s + 0.1, 3))}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsNotesOpen(!isNotesOpen)}
          className={isNotesOpen ? "text-blue-600" : ""}
        >
          <StickyNote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Print</DropdownMenuItem>
            <DropdownMenuItem>Properties</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
