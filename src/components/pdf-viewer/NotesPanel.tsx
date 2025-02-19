
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface NotesPanelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const NotesPanel = ({ isOpen, setIsOpen }: NotesPanelProps) => {
  const [notes, setNotes] = useState<{ id: number; text: string }[]>([]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: newNote.trim() }]);
      setNewNote("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-14 bottom-0 w-80 bg-white border-l border-zinc-200 flex flex-col animate-slide-in-right">
      <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
        <h2 className="font-semibold text-zinc-800">Notes</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-3 rounded-lg bg-zinc-50 border border-zinc-200"
            >
              <p className="text-sm text-zinc-600">{note.text}</p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-zinc-200">
        <div className="flex gap-2">
          <Input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            onKeyDown={(e) => e.key === "Enter" && addNote()}
          />
          <Button onClick={addNote}>Add</Button>
        </div>
      </div>
    </div>
  );
};
