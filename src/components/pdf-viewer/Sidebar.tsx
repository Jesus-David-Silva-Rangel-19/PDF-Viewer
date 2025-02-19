
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  Bookmark,
  Highlighter,
  Languages,
  Settings,
} from "lucide-react";

interface SidebarProps {
  pageNumber: number;
  numPages: number;
  setPageNumber: (page: number) => void;
}

export const Sidebar = ({ pageNumber, numPages, setPageNumber }: SidebarProps) => {
  const thumbnails = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div className="w-64 border-r border-zinc-200 bg-white flex flex-col">
      <div className="p-4 border-b border-zinc-200">
        <h1 className="text-xl font-semibold text-zinc-800">Título del documento</h1>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-2 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" />
            Resumen
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Bookmark className="h-4 w-4" />
            Marcadores
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Highlighter className="h-4 w-4" />
            Resaltados
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Languages className="h-4 w-4" />
            Traducir
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Ajustes
          </Button>
        </div>

        <ScrollArea className="flex-1 p-2">
          <div className="space-y-2">
            {thumbnails.map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className={`w-full p-2 text-left rounded-lg transition-colors ${
                  pageNumber === page
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                Página {page}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
