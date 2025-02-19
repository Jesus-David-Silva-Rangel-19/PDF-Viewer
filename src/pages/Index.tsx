
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Sidebar } from "@/components/pdf-viewer/Sidebar";
import { Toolbar } from "@/components/pdf-viewer/Toolbar";
import { Attribution } from "@/components/pdf-viewer/Attribution";
import { NotesPanel } from "@/components/pdf-viewer/NotesPanel";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Upload, Menu } from "lucide-react";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Index = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();
  const [scale, setScale] = useState(1);
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(800);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    toast({
      title: "Documento cargado exitosamente",
      description: `Total de páginas: ${numPages}`,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfFile(url);
      setPageNumber(1);
      setScale(1);
    }
  };

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  useEffect(() => {
    const updatePageWidth = () => {
      const container = document.querySelector('.pdf-container');
      if (container) {
        const width = container.clientWidth;
        const maxWidth = Math.min(width - (isMobile ? 32 : 100), 800);
        setPageWidth(maxWidth);
      }
    };

    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);
    return () => window.removeEventListener('resize', updatePageWidth);
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-zinc-50 relative">
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out absolute md:relative z-40 md:translate-x-0`}>
        <Sidebar 
          pageNumber={pageNumber} 
          numPages={numPages} 
          setPageNumber={setPageNumber}
          onClose={() => isMobile && setIsSidebarOpen(false)}
        />
      </div>
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Toolbar 
          scale={scale} 
          setScale={setScale}
          isNotesOpen={isNotesOpen}
          setIsNotesOpen={setIsNotesOpen}
        />
        
        <div className="flex-1 relative overflow-hidden bg-zinc-100 pdf-container">
          {!pdfFile ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <label className="flex flex-col items-center gap-4 cursor-pointer">
                <div className="p-6 rounded-full bg-white/90 shadow-lg">
                  <Upload className="w-8 h-8 text-zinc-600" />
                </div>
                <span className="text-zinc-600 text-lg font-medium text-center">
                  Haz clic para subir un PDF
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center overflow-auto">
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={3}
                onZoom={(ref) => setScale(ref.state.scale)}
                centerOnInit={true}
              >
                <TransformComponent
                  wrapperClass="w-full h-full"
                  contentClass="flex items-center justify-center p-4 md:p-8"
                >
                  <Document
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="pdf-document"
                    loading={
                      <div className="flex items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-600"></div>
                      </div>
                    }
                    error={
                      <div className="text-red-500 text-center p-4">
                        Error al cargar el PDF. Por favor, intente de nuevo.
                      </div>
                    }
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={pageWidth}
                      className="page"
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                      loading={
                        <div className="animate-pulse bg-zinc-200 rounded-lg" 
                             style={{ width: pageWidth, height: pageWidth * 1.414 }} />
                      }
                    />
                  </Document>
                </TransformComponent>
              </TransformWrapper>
            </div>
          )}

          {pdfFile && numPages > 0 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 bg-white/90 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full shadow-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                Página {pageNumber} de {numPages}
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
          )}
        </div>

        <NotesPanel isOpen={isNotesOpen} setIsOpen={setIsNotesOpen} />
      </main>

      <Attribution />
    </div>
  );
};

export default Index;
