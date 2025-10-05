import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { createQRCodeInstance, QRCodeConfig } from "@/lib/qrCodeUtils";

interface UseQRCodeProps {
  url: string;
  qrSize?: number;
  qrShape?: "circle" | "square";
  qrLevel?: "L" | "M" | "Q" | "H";
  foregroundColor?: string;
  backgroundColor?: string;
  logoUrl?: string;
  onDownload?: (qrId: string) => void;
}

export function useQRCode({
  url,
  qrSize = 600,
  qrShape = "square",
  qrLevel = "M",
  foregroundColor = "#000000",
  backgroundColor = "#ffffff",
  logoUrl,
  onDownload,
}: UseQRCodeProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      if (!url) return;

      // Clear canvas content
      if (canvasRef.current) {
        canvasRef.current.innerHTML = "";
      }

      const displaySize = qrSize > 180 ? 180 : qrSize;
      const config: QRCodeConfig = {
        qrSize,
        qrShape,
        qrLevel,
        foregroundColor,
        backgroundColor,
        logoUrl,
      };

      const qrCodeInstance = createQRCodeInstance(url, displaySize, config);

      // Append to canvas if available
      if (canvasRef.current) {
        qrCodeInstance.append(canvasRef.current);
      }
    } catch (error) {
      console.error("Failed to create QR code:", error);
      toast.error("Failed to create QR code");
    }
  }, [
    url,
    qrSize,
    qrShape,
    qrLevel,
    foregroundColor,
    backgroundColor,
    logoUrl,
  ]);

  const handleDownload = (qrId: string) => {
    try {
      // Create a new instance for download using full size
      const config: QRCodeConfig = {
        qrSize,
        qrShape,
        qrLevel,
        foregroundColor,
        backgroundColor,
        logoUrl,
      };

      const downloadInstance = createQRCodeInstance(url, qrSize, config);

      downloadInstance.download({
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
