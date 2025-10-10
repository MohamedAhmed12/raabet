import QRCodeStyling, { Options } from "qr-code-styling";

export interface QRCodeConfig {
  qrSize: number;
  qrShape: "square" | "circle";
  qrLevel: "L" | "M" | "Q" | "H";
  includeMargin: boolean;
  foregroundColor: string;
  backgroundColor: string;
  logoUrl?: string;
}

/**
 * Creates QR code options for QRCodeStyling
 */
export const createQROptions = (
  url: string,
  size: number,
  config: QRCodeConfig
): Partial<Options> => ({
  width: size,
  height: size,
  type: "svg",
  data: url,
  shape: config.qrShape === "circle" ? "circle" : "square",
  qrOptions: {
    errorCorrectionLevel: config.qrLevel,
    typeNumber: 0,
  },
  margin: config.includeMargin ? 10 : 0,
  dotsOptions: {
    type: config.qrShape === "circle" ? "dots" : "square",
    color: config.foregroundColor,
    roundSize: config.qrShape === "circle",
  },
  cornersSquareOptions: {
    type: "square",
    color: config.foregroundColor,
  },
  cornersDotOptions: {
    type: "square",
    color: config.foregroundColor,
  },
  backgroundOptions: {
    color: config.backgroundColor,
    round: config.qrShape === "circle" ? 10 : 0,
  },
});

/**
 * Creates QR code extension for logo and border
 */
export const createQRExtension = (size: number, config: QRCodeConfig) => {
  return (svg: SVGElement, options: Options) => {
    const { width = size, height = size } = options;
    const qrSize = Math.min(width, height);

    // Add border for circular QR codes
    if (config.qrShape === "circle") {
      const borderWidth = qrSize === 200 ? 3 : 4;
      const borderAttributes = {
        fill: "none",
        x: (width - qrSize + borderWidth) / 2,
        y: (height - qrSize + borderWidth) / 2,
        width: qrSize - borderWidth,
        height: qrSize - borderWidth,
        stroke: config.foregroundColor,
        "stroke-width": borderWidth,
        rx: qrSize / 2,
      };

      const border = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      Object.entries(borderAttributes).forEach(([key, value]) => {
        border.setAttribute(key, value.toString());
      });
      svg.appendChild(border);
    }

    // Add logo if provided
    if (config.logoUrl) {
      const logoSize = Math.min(qrSize * 0.2, 60);
      const logoX = (width - logoSize) / 2;
      const logoY = (height - logoSize) / 2;

      // Create a circular white background for the logo
      const logoBackground = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      logoBackground.setAttribute("cx", (logoX + logoSize / 2).toString());
      logoBackground.setAttribute("cy", (logoY + logoSize / 2).toString());
      logoBackground.setAttribute("r", ((logoSize + 8) / 2).toString());
      logoBackground.setAttribute("fill", "#ffffff");
      svg.appendChild(logoBackground);

      // Create the logo image with circular clipping
      const logoImage = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );
      logoImage.setAttribute("href", config.logoUrl);
      logoImage.setAttribute("x", logoX.toString());
      logoImage.setAttribute("y", logoY.toString());
      logoImage.setAttribute("width", logoSize.toString());
      logoImage.setAttribute("height", logoSize.toString());

      logoImage.setAttribute("preserveAspectRatio", "xMidYMid meet");

      svg.appendChild(logoImage);
    }
  };
};

/**
 * Creates a QR code instance with the given configuration
 */
export const createQRCodeInstance = (
  url: string,
  size: number,
  config: QRCodeConfig
): QRCodeStyling => {
  const options = createQROptions(url, size, config);
  const qrCodeInstance = new QRCodeStyling(options);
  qrCodeInstance.applyExtension(createQRExtension(size, config));
  return qrCodeInstance;
};

/**
 * Compresses an image file to reduce its size
 */
const compressImage = (
  file: File,
  maxWidth: number = 200,
  quality: number = 0.8,
  t?: (key: string) => string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Fill canvas with white background (JPEG doesn't support transparency)
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
      }

      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      const errorMessage = t
        ? t("QR.validation.failedToLoadImage")
        : "Failed to load image";
      reject(new Error(errorMessage));
    };
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Handles logo upload and returns the data URL
 */
export const handleLogoUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  onSuccess: (logoUrl: string) => void,
  onError: (message: string) => void,
  t?: (key: string, params?: any) => string
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    const errorMessage = t
      ? t("QR.validation.invalidFileType")
      : "Invalid file type. Please upload an image file.";
    onError(errorMessage);
    return;
  }

  // Validate file size (5MB max before compression)
  const maxSizeMB = 5;
  if (file.size > maxSizeMB * 1024 * 1024) {
    const errorMessage = t
      ? t("QR.validation.fileTooLarge", { maxSizeMB })
      : `File too large. Maximum size is ${maxSizeMB}MB.`;
    onError(errorMessage);
    return;
  }

  try {
    // Compress the image to reduce base64 size
    const compressedDataUrl = await compressImage(file, 200, 0.8, t);

    // Validate compressed size (should be much smaller)
    const base64Size = compressedDataUrl.length;
    const maxBase64Size = 500000; // ~500KB base64 string

    if (base64Size > maxBase64Size) {
      const errorMessage = t
        ? t("QR.validation.imageTooLargeAfterCompression")
        : "Image is too large even after compression. Please try a smaller image.";
      onError(errorMessage);
      return;
    }

    onSuccess(compressedDataUrl);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : t
        ? t("QR.validation.failedToProcessImage")
        : "Failed to process image. Please try a different file.";
    onError(errorMessage);
  }
};

/**
 * Removes logo and clears file input
 */
export const removeLogo = (
  fileInputRef: React.RefObject<HTMLInputElement | null>,
  onSuccess: () => void
) => {
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
  onSuccess();
};
