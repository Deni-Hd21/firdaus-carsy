"use client";

import { useState, useRef, useEffect } from "react";

export default function ImageCropper({ imageSrc, originalFileName, onCrop, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [baseDimensions, setBaseDimensions] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // Update container size on mount or resize
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({
        width: rect.width,
        height: rect.height,
      });
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // When image or container size changes, calculate base dimensions (cover fit)
  const handleImageLoad = (e) => {
    const img = e.target;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    if (containerSize.width === 0 || containerSize.height === 0) return;

    const containerAspect = containerSize.width / containerSize.height; // 16:9 = 1.777
    const imageAspect = naturalWidth / naturalHeight;

    let baseWidth = 0;
    let baseHeight = 0;

    if (imageAspect > containerAspect) {
      // Image is wider than 16:9 container, height fits container height
      baseHeight = containerSize.height;
      baseWidth = containerSize.height * imageAspect;
    } else {
      // Image is taller or equal, width fits container width
      baseWidth = containerSize.width;
      baseHeight = containerSize.width / imageAspect;
    }

    const initialX = (containerSize.width - baseWidth) / 2;
    const initialY = (containerSize.height - baseHeight) / 2;

    setBaseDimensions({ width: baseWidth, height: baseHeight });
    setOffset({ x: initialX, y: initialY });
    setZoom(1);
    setImageLoaded(true);
  };

  // Ensure image dimensions are calculated if containerSize changes after load
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && containerSize.width > 0) {
      const e = { target: imgRef.current };
      handleImageLoad(e);
    }
  }, [containerSize]);

  // Helper to constrain offsets so the image always covers the viewport
  const constrainOffsets = (currentZoom, targetX, targetY) => {
    if (baseDimensions.width === 0 || baseDimensions.height === 0) return { x: 0, y: 0 };

    const renderedWidth = baseDimensions.width * currentZoom;
    const renderedHeight = baseDimensions.height * currentZoom;

    const minX = containerSize.width - renderedWidth;
    const minY = containerSize.height - renderedHeight;

    // X must be between minX and 0 (since it covers the container)
    const constrainedX = Math.min(0, Math.max(minX, targetX));
    // Y must be between minY and 0
    const constrainedY = Math.min(0, Math.max(minY, targetY));

    return { x: constrainedX, y: constrainedY };
  };

  // Handle Zoom Change
  const handleZoomChange = (e) => {
    const nextZoom = parseFloat(e.target.value);
    
    // Zoom centered in the viewport
    const centerX = containerSize.width / 2;
    const centerY = containerSize.height / 2;

    // Relative distance of center to image top-left
    const relX = centerX - offset.x;
    const relY = centerY - offset.y;

    // Scale that relative distance by zoom ratio
    const zoomRatio = nextZoom / zoom;
    const nextRelX = relX * zoomRatio;
    const nextRelY = relY * zoomRatio;

    // Calculate new top-left offsets
    const proposedX = centerX - nextRelX;
    const proposedY = centerY - nextRelY;

    const constrained = constrainOffsets(nextZoom, proposedX, proposedY);
    setZoom(nextZoom);
    setOffset(constrained);
  };

  // Drag Events using Pointer API (supports touch and mouse seamlessly)
  const handlePointerDown = (e) => {
    if (!imageLoaded) return;
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragStartOffset({ x: offset.x, y: offset.y });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    const proposedX = dragStartOffset.x + dx;
    const proposedY = dragStartOffset.y + dy;

    const constrained = constrainOffsets(zoom, proposedX, proposedY);
    setOffset(constrained);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
  };

  // Canvas Crop & Save
  const handleCropSave = () => {
    if (!imageLoaded || !imgRef.current) return;

    const canvas = document.createElement("canvas");
    // High-resolution export (16:9)
    canvas.width = 1280;
    canvas.height = 720;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Ratio between output canvas and screen viewport container
    const R = 1280 / containerSize.width;

    const drawX = offset.x * R;
    const drawY = offset.y * R;
    const drawW = baseDimensions.width * zoom * R;
    const drawH = baseDimensions.height * zoom * R;

    // Draw the image exactly matching the viewport position and zoom
    ctx.drawImage(imgRef.current, drawX, drawY, drawW, drawH);

    // Export as WebP
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          alert("Gagal memotong foto. Silakan coba lagi.");
          return;
        }

        // Convert Blob to File object to integrate with upload components
        const croppedFile = new File([blob], originalFileName || "foto_akad_cropped.webp", {
          type: "image/webp",
          lastModified: Date.now(),
        });

        onCrop(croppedFile);
      },
      "image/webp",
      0.92
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 flex flex-col gap-4 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Sesuaikan Foto Akad</h3>
            <p className="text-xs text-gray-400">Rasio Crop 16:9 otomatis untuk Tampilan Beranda</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Crop viewport (16:9 container) */}
        <div
          ref={containerRef}
          className="relative w-full aspect-video overflow-hidden bg-slate-950 rounded-xl border border-slate-700 select-none touch-none cursor-move"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Base image */}
          {imageSrc && (
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop preview"
              onLoad={handleImageLoad}
              className="absolute pointer-events-none origin-top-left max-w-none max-h-none"
              style={{
                width: `${baseDimensions.width * zoom}px`,
                height: `${baseDimensions.height * zoom}px`,
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0px)`,
              }}
            />
          )}

          {/* Guidelines overlay */}
          <div className="absolute inset-0 pointer-events-none border-2 border-cyan-400/30 rounded-xl">
            {/* Grid lines */}
            <div className="absolute inset-0 flex justify-around">
              <div className="w-[1px] bg-white/20 h-full border-dashed" />
              <div className="w-[1px] bg-white/20 h-full border-dashed" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-around">
              <div className="h-[1px] bg-white/20 w-full border-dashed" />
              <div className="h-[1px] bg-white/20 w-full border-dashed" />
            </div>
          </div>
          
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-400" />
            </div>
          )}
        </div>

        {/* Instructions */}
        <p className="text-xs text-gray-400 text-center">
          💡 Seret/geser foto untuk menentukan area sorotan, gunakan slider di bawah untuk memperbesar.
        </p>

        {/* Zoom Control */}
        <div className="flex items-center gap-4 py-2">
          <span className="text-gray-400 text-xs font-semibold">ZOOM</span>
          <button
            onClick={() => handleZoomChange({ target: { value: Math.max(1, zoom - 0.2) } })}
            className="text-gray-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold transition select-none"
          >
            -
          </button>
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoom}
            onChange={handleZoomChange}
            className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
          />
          <button
            onClick={() => handleZoomChange({ target: { value: Math.min(3, zoom + 0.2) } })}
            className="text-gray-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold transition select-none"
          >
            +
          </button>
          <span className="text-cyan-400 text-xs font-semibold w-10 text-right">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="border border-slate-700 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition text-sm font-semibold"
          >
            Batal
          </button>
          <button
            onClick={handleCropSave}
            disabled={!imageLoaded}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Potong & Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}
