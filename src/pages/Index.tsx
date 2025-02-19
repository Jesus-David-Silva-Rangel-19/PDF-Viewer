
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Sidebar } from "@/components/pdf-viewer/Sidebar";
import { Toolbar } from "@/components/pdf-viewer/Toolbar";
import { Attribution } from "@/components/pdf-viewer/Attribution";
import { NotesPanel } from "@/components/pdf-viewer/NotesPanel";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Index = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const { toast } = useToast();
  const [scale, setScale] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    toast({
      title: "Document loaded successfully",
      description: `Total pages: ${numPages}`,
    });
  };

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  return (
    <div className="flex h-screen bg-zinc-50">
      <Sidebar pageNumber={pageNumber} numPages={numPages} setPageNumber={setPageNumber} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Toolbar 
          scale={scale} 
          setScale={setScale}
          isNotesOpen={isNotesOpen}
          setIsNotesOpen={setIsNotesOpen}
        />
        
        <div className="flex-1 relative overflow-hidden bg-zinc-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={3}
              onZoom={(ref) => setScale(ref.state.scale)}
            >
              <TransformComponent>
                <Document
                  file="/sample.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="pdf-document"
                >
                  <Page
                    pageNumber={pageNumber}
                    className="page"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
              </TransformComponent>
            </TransformWrapper>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Page {pageNumber} of {numPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <NotesPanel isOpen={isNotesOpen} setIsOpen={setIsNotesOpen} />
      </main>

      <Attribution />
    </div>
  );
};

export default Index;
