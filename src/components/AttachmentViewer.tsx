import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Document, Page, pdfjs } from 'react-pdf';
import {
  FileText,
  AlertCircle,
  Loader2,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  ArrowLeft,
} from "lucide-react";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface Attachment {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  url?: string;
}

interface AttachmentViewerProps {
  attachment: Attachment;
}

export const AttachmentViewer = ({ attachment }: AttachmentViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pdfViewerRef = useRef<HTMLDivElement>(null);
  const imageViewerRef = useRef<HTMLDivElement>(null);
  const modalPdfViewerRef = useRef<HTMLDivElement>(null);
  const modalImageViewerRef = useRef<HTMLDivElement>(null);

  const isPDF = attachment.file_type?.includes('pdf') || attachment.file_name.toLowerCase().endsWith('.pdf');
  const isImage = attachment.file_type?.startsWith('image/') || 
                  /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(attachment.file_name);

  // Prevent browser zoom with native event listener - use capture phase and document level
  useEffect(() => {
    const handleNativeWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        // Check if event target is inside THIS component's specific viewer refs
        const isInsideThisViewer = 
          (pdfViewerRef.current?.contains(e.target as Node)) ||
          (imageViewerRef.current?.contains(e.target as Node)) ||
          (modalPdfViewerRef.current?.contains(e.target as Node)) ||
          (modalImageViewerRef.current?.contains(e.target as Node));

        if (isInsideThisViewer) {
          e.preventDefault();
          e.stopImmediatePropagation();
          
          const delta = e.deltaY > 0 ? -0.1 : 0.1;
          setScale(prev => Math.max(0.5, Math.min(3.0, prev + delta)));
        }
      }
    };

    // Add listener to document in CAPTURE phase with passive: false
    // This catches events before they reach the canvas
    document.addEventListener('wheel', handleNativeWheel, { passive: false, capture: true });

    return () => {
      document.removeEventListener('wheel', handleNativeWheel, { capture: true });
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoadError(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setLoadError(true);
  };

  const handleDownload = () => {
    if (attachment.url) {
      window.open(attachment.url, '_blank');
    }
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3.0));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setScale(1.0);
    setPanPosition({ x: 0, y: 0 });
  };
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  // Pan/Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Allow panning at any zoom level (useful for large documents)
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-muted/50 border-b">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <FileText className="h-4 w-4 text-primary flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{attachment.file_name}</p>
            {attachment.file_size && (
              <p className="text-xs text-muted-foreground">
                {(attachment.file_size / 1024).toFixed(1)} KB
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="flex-shrink-0"
            title="Full Screen View"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="flex-shrink-0"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {loadError ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-sm text-muted-foreground">Failed to load file</p>
            <Button variant="link" size="sm" onClick={handleDownload} className="mt-2">
              Download to view
            </Button>
          </div>
        ) : isPDF ? (
          <div className="space-y-2">
            {/* Zoom Controls */}
            <div className="flex items-center justify-center gap-2 pb-2 border-b">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetZoom}
                disabled={scale === 1.0}
                title="Reset Zoom"
              >
                {Math.round(scale * 100)}%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={scale >= 3.0}
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRotate}
                title="Rotate 90°"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            {/* PDF Viewer */}
            <div 
              ref={pdfViewerRef}
              className="attachment-viewer overflow-auto max-h-[600px] flex items-center justify-center"
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <div
                style={{
                  transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${scale}) rotate(${rotation}deg)`,
                  transformOrigin: 'center',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
              >
                <Document
                  file={attachment.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    width={400}
                    rotate={0}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>
            </div>

            {/* Page Navigation */}
            {numPages > 1 && (
              <div className="flex items-center justify-between pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber <= 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {pageNumber} of {numPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                  disabled={pageNumber >= numPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        ) : isImage ? (
          <div className="space-y-2">
            {/* Zoom Controls for Images */}
            <div className="flex items-center justify-center gap-2 pb-2 border-b">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetZoom}
                disabled={scale === 1.0}
                title="Reset Zoom"
              >
                {Math.round(scale * 100)}%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={scale >= 3.0}
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRotate}
                title="Rotate 90°"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Image Viewer */}
            <div 
              ref={imageViewerRef}
              className="attachment-viewer overflow-auto max-h-[600px] flex items-center justify-center"
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={attachment.url}
                alt={attachment.file_name}
                className="rounded select-none"
                style={{ 
                  transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${scale}) rotate(${rotation}deg)`,
                  transformOrigin: 'center',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
                onError={(e) => {
                  setLoadError(true);
                  e.currentTarget.style.display = 'none';
                }}
                draggable={false}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Preview not available</p>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] w-full h-full p-0 [&>button]:right-6 [&>button]:bg-background [&>button]:border [&>button]:shadow-sm [&>button]:h-9 [&>button]:w-9 [&>button]:flex [&>button]:items-center [&>button]:justify-center">
          <DialogHeader className="p-4 pr-16 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {attachment.file_name}
              </DialogTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                title="Download"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto p-6">
            {loadError ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <p className="text-lg text-muted-foreground mb-4">Failed to load file</p>
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download to view
                </Button>
              </div>
            ) : isPDF ? (
              <div className="space-y-4">
                {/* Zoom Controls */}
                <div className="flex items-center justify-center gap-2 pb-4 border-b sticky top-0 bg-background z-10">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleZoomOut}
                    disabled={scale <= 0.5}
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4 mr-2" />
                    Zoom Out
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleResetZoom}
                    disabled={scale === 1.0}
                    title="Reset Zoom"
                  >
                    {Math.round(scale * 100)}%
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleZoomIn}
                    disabled={scale >= 3.0}
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4 mr-2" />
                    Zoom In
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleRotate}
                    title="Rotate 90°"
                  >
                    <RotateCw className="h-4 w-4 mr-2" />
                    Rotate
                  </Button>
                </div>

                {/* PDF Viewer - Full Screen */}
                <div 
                  ref={modalPdfViewerRef}
                  className="attachment-viewer flex items-center justify-center min-h-[70vh]"
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    style={{
                      transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${scale}) rotate(${rotation}deg)`,
                      transformOrigin: 'center',
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    }}
                  >
                    <Document
                      file={attachment.url}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={onDocumentLoadError}
                      loading={
                        <div className="flex items-center justify-center py-16">
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                      }
                    >
                      <Page
                        pageNumber={pageNumber}
                        width={Math.min(window.innerWidth * 0.8, 1200)}
                        rotate={0}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </Document>
                  </div>
                </div>

                {/* Page Navigation */}
                {numPages > 1 && (
                  <div className="flex items-center justify-center gap-4 pt-4 border-t sticky bottom-0 bg-background">
                    <Button
                      variant="outline"
                      onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                      disabled={pageNumber <= 1}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <span className="text-base font-medium">
                      Page {pageNumber} of {numPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                      disabled={pageNumber >= numPages}
                    >
                      Next
                      <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                  </div>
                )}
              </div>
            ) : isImage ? (
              <div className="space-y-4">
                {/* Zoom Controls for Images */}
                <div className="flex items-center justify-center gap-2 pb-4 border-b sticky top-0 bg-background z-10">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleZoomOut}
                    disabled={scale <= 0.5}
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4 mr-2" />
                    Zoom Out
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleResetZoom}
                    disabled={scale === 1.0}
                    title="Reset Zoom"
                  >
                    {Math.round(scale * 100)}%
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleZoomIn}
                    disabled={scale >= 3.0}
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4 mr-2" />
                    Zoom In
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleRotate}
                    title="Rotate 90°"
                  >
                    <RotateCw className="h-4 w-4 mr-2" />
                    Rotate
                  </Button>
                </div>

                {/* Image Viewer - Full Screen */}
                <div 
                  ref={modalImageViewerRef}
                  className="attachment-viewer flex items-center justify-center min-h-[70vh]"
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={attachment.url}
                    alt={attachment.file_name}
                    className="max-w-full max-h-[70vh] rounded select-none"
                    style={{ 
                      transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${scale}) rotate(${rotation}deg)`,
                      transformOrigin: 'center',
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    }}
                    onError={(e) => {
                      setLoadError(true);
                      e.currentTarget.style.display = 'none';
                    }}
                    draggable={false}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground mb-4">Preview not available</p>
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
