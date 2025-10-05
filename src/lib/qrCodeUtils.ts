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

      const border = document.createElementNS("http://www.w3.org/2000/svg", "rect");
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
      logoBackground.setAttribute("cx", (width / 2).toString());
      logoBackground.setAttribute("cy", (height / 2).toString());
      logoBackground.setAttribute("r", ((logoSize + 8) / 2).toString()); // Larger radius for better coverage
      logoBackground.setAttribute("fill", "#ffffff");

      const logoImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
      logoImage.setAttribute("href", config.logoUrl);
      logoImage.setAttribute("x", logoX.toString());
      logoImage.setAttribute("y", logoY.toString());
      logoImage.setAttribute("width", logoSize.toString());
      logoImage.setAttribute("height", logoSize.toString());
      logoImage.setAttribute("r", (logoSize / 2).toString()); // Larger radius for better coverage
      logoImage.setAttribute("fill", "white");
      logoImage.setAttribute("preserveAspectRatio", "xMidYMid meet");

      svg.appendChild(logoBackground);
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
 * Handles logo upload and returns the data URL
 */
export const handleLogoUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  onSuccess: (logoUrl: string) => void,
  onError: (message: string) => void
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    onError("Invalid file type. Please upload an image file.");
    return;
  }

  // Validate file size (2MB max for all components)
  const maxSizeMB = 2;
  if (file.size > maxSizeMB * 1024 * 1024) {
    onError(`File too large. Maximum size is ${maxSizeMB}MB.`);
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target?.result as string;
    onSuccess(result);
  };
  reader.readAsDataURL(file);
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
