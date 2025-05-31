import { useEffect, useRef } from "react";
import QRCodeStyling, { Options } from "qr-code-styling";
import { toast } from "sonner";

interface BorderAttributes {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  stroke: string;
  "stroke-width": number;
  rx: number;
}

interface UseQRCodeProps {
  url: string;
  width: number;
  height: number;
  onDownload?: (qrId: string) => void;
}

export function useQRCode({
  url,
  width = 160,
  height = 160,
  onDownload,
}: UseQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const QRCodeInstanceRef = useRef<QRCodeStyling | null>(null);

  const extension = (svg: SVGElement, options: Options) => {
    const { width = 600, height = 600 } = options;
    const size = Math.min(width, height);
    const borderWidth = size === 600 ? 10 : 3;

    // Calculate rounded corner radius based on size
    const roundedCornerRadius = size === 600 ? 600 : 160;

    const borderAttributes: BorderAttributes = {
      fill: "none",
      x: (width - size + borderWidth) / 2,
      y: (height - size + borderWidth) / 2,
      width: size - borderWidth,
      height: size - borderWidth,
      stroke: "black",
      "stroke-width": borderWidth,
      rx: roundedCornerRadius,
    };

    // "http://www.w3.org/2000/svg" is the official namespace URI for SVG elements.
    //  It's not a real "website" but a unique identifier that tells the browser you want to use the SVG vocabulary.
    const border = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    Object.entries(borderAttributes).forEach(([key, value]) => {
      border.setAttribute(key, value.toString());
    });

    svg.appendChild(border);
  };

  const QRStylingOptions: Partial<Options> = {
    width,
    height,
    type: "svg",
    data: url,
    shape: "circle",
    qrOptions: {
      errorCorrectionLevel: "M",
      typeNumber: 0,
    },
    dotsOptions: {
      type: "dots",
      roundSize: true,
    },
    cornersSquareOptions: {
      type: "square",
    },
    cornersDotOptions: {
      type: "square",
    },
    backgroundOptions: {
      color: "#ffffff",
    },
  } as const;

  useEffect(() => {
    try {
      if (!url) return;
console.log(canvasRef.current, url);

      // Create QR code instance
      QRCodeInstanceRef.current = new QRCodeStyling(QRStylingOptions);
      QRCodeInstanceRef.current.applyExtension(extension);

      // Append to canvas if available
      if (canvasRef.current && canvasRef.current.children.length === 0) {
        QRCodeInstanceRef.current.append(canvasRef.current);
      }

      return () => {
        if (QRCodeInstanceRef.current) {
          QRCodeInstanceRef.current = null;
        }
        if (canvasRef.current) {
          canvasRef.current = null;
        }
      };
    } catch (error) {
      console.error("Failed to create QR code:", error);
      toast.error("Failed to create QR code");
    }
  }, [url, QRCodeInstanceRef.current]);

  const handleDownload = (qrId: string) => {
    if (!canvasRef.current) {
      toast.error("QR code is not available");
      return;
    }

    try {
      QRCodeInstanceRef.current?.update({
        width: 600,
        height: 600,
      });
      QRCodeInstanceRef.current?.download({
        name: `qr-code-${qrId}`,
        extension: "png",
      });
      onDownload?.(qrId);
    } catch (error) {
      console.error("Failed to download QR code:", error);
      toast.error("Failed to download QR code");
    }
  };

  return {
    canvasRef,
    handleDownload,
  };
}
