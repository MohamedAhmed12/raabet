/* eslint-disable */
// @ts-nocheck
import { Link } from "@/app/[locale]/store/use-link-store";
import { useMemo } from "react";

function generateShadows(hexColor) {
  // Convert hex to RGB
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  // Convert RGB to hex
  function rgbToHex(r, g, b) {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }

  function lightenColor(color, percent) {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.min(255, r + (255 - r) * percent);
    g = Math.min(255, g + (255 - g) * percent);
    b = Math.min(255, b + (255 - b) * percent);

    return `rgb(${r}, ${g}, ${b})`;
  }

  // Darken color by a percentage
  function darkenColor(hex, percent) {
    const { r, g, b } = hexToRgb(hex);
    const darken = (color) => Math.max(0, color - color * percent);
    return rgbToHex(darken(r), darken(g), darken(b));
  }

  // Generate shadows
  const lightShadow = lightenColor(hexColor, 0.2);

  const darkShadow = darkenColor(hexColor, 0.155);

  return `${lightShadow} -5px -5px 13px, ${darkShadow} 5px 5px 13px`;
}

function generateBackground(baseColor, design) {
  const lightenColor = (color, percent) => {
    // Extract RGB components
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    // Adjust RGB components
    r = Math.min(255, r + (255 - r) * percent);
    g = Math.min(255, g + (255 - g) * percent);
    b = Math.min(255, b + (255 - b) * percent);

    return `rgb(${r}, ${g}, ${b})`;
  };

  if (design === 1) {
    return `linear-gradient(145deg, ${baseColor}, ${baseColor})`;
  } else if (design === 2) {
    return `linear-gradient(145deg, ${lightenColor(
      baseColor,
      -0.17
    )}, ${lightenColor(baseColor, 0.15)})`;
  } else if (design === 3) {
    return `linear-gradient(145deg, ${lightenColor(
      baseColor,
      0.15
    )}, ${lightenColor(baseColor, -0.17)})`;
  }

  return baseColor; // Default fallback
}

const useLinkStyles = (link: Link) => {
  return useMemo(() => {
    const {
      card_styles_design,
      card_styles_card_corner,
      card_styles_card_color,
      card_styles_card_border_width,
      card_styles_card_border_color,
      card_styles_card_shadow,
      general_styles_primary_bgcolor,
    } = link || {}; // Destructure link properties

    const styles = {
      borderRadius: card_styles_card_corner ? card_styles_card_corner * 28 : 0,
      borderWidth:
        card_styles_design === 0 ? card_styles_card_border_width * 6 : 0,
    };

    // Check if the card design is 1
    if (card_styles_design !== 0) {
      // Apply styles for design 1
      styles.background = generateBackground(
        general_styles_primary_bgcolor,
        card_styles_design
      );
      styles.borderColor = general_styles_primary_bgcolor; // Using general_styles_primary_bgcolor
      styles.boxShadow =
        card_styles_design != 4
          ? generateShadows(general_styles_primary_bgcolor)
          : "unset";
    } else if (card_styles_design == 0) {
      // Apply styles for design 0
      styles.backgroundColor = card_styles_card_color;
      styles.borderColor = card_styles_card_border_color; // Using general_styles_primary_bgcolor
      styles.boxShadow = `0 0 ${(card_styles_card_shadow || 0) * 10}px ${
        (card_styles_card_shadow || 0) / 10
      }px rgba(0, 0, 0, 0.3)`;
    }

    return styles;
  }, [
    link?.card_styles_card_corner,
    link?.card_styles_card_color,
    link?.card_styles_card_border_width,
    link?.card_styles_card_border_color,
    link?.card_styles_card_shadow,
    link?.card_styles_design,
    link?.general_styles_primary_bgcolor, // Added general_styles_primary_bgcolor as dependency
  ]);
};

export default useLinkStyles;
