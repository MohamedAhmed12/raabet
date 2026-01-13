// import { Theme } from "@prisma/client";

// /**
//  * Theme configuration interface
//  * Each theme defines styling properties that will be applied to the Link table
//  */
// export interface ThemeConfig {
//   name: string;
//   description: string;
//   styles: {
//     // General styles
//     general_styles_desktop_bgcolor: string;
//     general_styles_primary_text_color: string;
//     general_styles_primary_bgcolor: string;
//     general_styles_is_secondary_bgcolor: boolean;
//     general_styles_is_label_exist: boolean;
//     general_styles_secondary_bgcolor: string;
//     general_styles_soft_shadow: boolean;
//     general_styles_background_type: string;
//     general_styles_gradient_color?: string;
//     general_styles_gradient_direction?: number;
//     general_styles_gradient_offset?: number;
//     general_styles_bg_image?: string;
//     general_styles_bg_image_blur: boolean;
    
//     // Header styles
//     header_styles_profile_shadow: number;
//     header_styles_profile_border_width: number;
//     header_styles_profile_border_color: string;
//     header_styles_collapse_long_bio: boolean;
//     header_styles_social_icons_size: number;
//     header_styles_text_spacing: number;
    
//     // Card styles
//     card_styles_design: number;
//     card_styles_card_color: string;
//     card_styles_text_color: string;
//     card_styles_label_color: string;
//     card_styles_card_corner: number;
//     card_styles_card_border_width: number;
//     card_styles_card_border_color: string;
//     card_styles_card_shadow: number;
//     card_styles_card_spacing: number;
    
//     // Font styles
//     title_font: string;
//     text_font: string;
//   };
// }

// /**
//  * Theme configurations map
//  * Placeholder data - will be populated with actual theme data later
//  */
// export const THEME_CONFIGS: Record<Theme, ThemeConfig | null> = {
//   none: null,
  
//   theme1: {
//     name: "Theme 1",
//     description: "Placeholder for Theme 1 - to be configured",
//     styles: {
//       general_styles_desktop_bgcolor: "#ffffff",
//       general_styles_primary_text_color: "#000000",
//       general_styles_primary_bgcolor: "#f3f4f6",
//       general_styles_is_secondary_bgcolor: false,
//       general_styles_is_label_exist: false,
//       general_styles_secondary_bgcolor: "#f9fafb",
//       general_styles_soft_shadow: true,
//       general_styles_background_type: "solid",
//       general_styles_gradient_color: "#ffffff",
//       general_styles_gradient_direction: 145,
//       general_styles_gradient_offset: 50,
//       general_styles_bg_image: null,
//       general_styles_bg_image_blur: false,
//       header_styles_profile_shadow: 0,
//       header_styles_profile_border_width: 0,
//       header_styles_profile_border_color: "#000000",
//       header_styles_collapse_long_bio: false,
//       header_styles_social_icons_size: 0.1,
//       header_styles_text_spacing: 0,
//       card_styles_design: 0,
//       card_styles_card_color: "#ffffff",
//       card_styles_text_color: "#000000",
//       card_styles_label_color: "#6b7280",
//       card_styles_card_corner: 0.3,
//       card_styles_card_border_width: 0.4,
//       card_styles_card_border_color: "#e5e7eb",
//       card_styles_card_shadow: 0,
//       card_styles_card_spacing: 0.5,
//       title_font: "Inter",
//       text_font: "Inter",
//     },
//   },
  
//   theme2: {
//     name: "Theme 2",
//     description: "Placeholder for Theme 2 - to be configured",
//     styles: {
//       general_styles_desktop_bgcolor: "#ffffff",
//       general_styles_primary_text_color: "#000000",
//       general_styles_primary_bgcolor: "#f3f4f6",
//       general_styles_is_secondary_bgcolor: false,
//       general_styles_is_label_exist: false,
//       general_styles_secondary_bgcolor: "#f9fafb",
//       general_styles_soft_shadow: true,
//       general_styles_background_type: "solid",
//       general_styles_gradient_color: "#ffffff",
//       general_styles_gradient_direction: 145,
//       general_styles_gradient_offset: 50,
//       general_styles_bg_image: null,
//       general_styles_bg_image_blur: false,
//       header_styles_profile_shadow: 0,
//       header_styles_profile_border_width: 0,
//       header_styles_profile_border_color: "#000000",
//       header_styles_collapse_long_bio: false,
//       header_styles_social_icons_size: 0.1,
//       header_styles_text_spacing: 0,
//       card_styles_design: 0,
//       card_styles_card_color: "#ffffff",
//       card_styles_text_color: "#000000",
//       card_styles_label_color: "#6b7280",
//       card_styles_card_corner: 0.3,
//       card_styles_card_border_width: 0.4,
//       card_styles_card_border_color: "#e5e7eb",
//       card_styles_card_shadow: 0,
//       card_styles_card_spacing: 0.5,
//       title_font: "Inter",
//       text_font: "Inter",
//     },
//   },
  
//   theme3: {
//     name: "Theme 3",
//     description: "Placeholder for Theme 3 - to be configured",
//     styles: {
//       general_styles_desktop_bgcolor: "#ffffff",
//       general_styles_primary_text_color: "#000000",
//       general_styles_primary_bgcolor: "#f3f4f6",
//       general_styles_is_secondary_bgcolor: false,
//       general_styles_is_label_exist: false,
//       general_styles_secondary_bgcolor: "#f9fafb",
//       general_styles_soft_shadow: true,
//       general_styles_background_type: "solid",
//       general_styles_gradient_color: "#ffffff",
//       general_styles_gradient_direction: 145,
//       general_styles_gradient_offset: 50,
//       general_styles_bg_image: null,
//       general_styles_bg_image_blur: false,
//       header_styles_profile_shadow: 0,
//       header_styles_profile_border_width: 0,
//       header_styles_profile_border_color: "#000000",
//       header_styles_collapse_long_bio: false,
//       header_styles_social_icons_size: 0.1,
//       header_styles_text_spacing: 0,
//       card_styles_design: 0,
//       card_styles_card_color: "#ffffff",
//       card_styles_text_color: "#000000",
//       card_styles_label_color: "#6b7280",
//       card_styles_card_corner: 0.3,
//       card_styles_card_border_width: 0.4,
//       card_styles_card_border_color: "#e5e7eb",
//       card_styles_card_shadow: 0,
//       card_styles_card_spacing: 0.5,
//       title_font: "Inter",
//       text_font: "Inter",
//     },
//   },
  
//   theme4: {
//     name: "Theme 4",
//     description: "Placeholder for Theme 4 - to be configured",
//     styles: {
//       general_styles_desktop_bgcolor: "#ffffff",
//       general_styles_primary_text_color: "#000000",
//       general_styles_primary_bgcolor: "#f3f4f6",
//       general_styles_is_secondary_bgcolor: false,
//       general_styles_is_label_exist: false,
//       general_styles_secondary_bgcolor: "#f9fafb",
//       general_styles_soft_shadow: true,
//       general_styles_background_type: "solid",
//       general_styles_gradient_color: "#ffffff",
//       general_styles_gradient_direction: 145,
//       general_styles_gradient_offset: 50,
//       general_styles_bg_image: null,
//       general_styles_bg_image_blur: false,
//       header_styles_profile_shadow: 0,
//       header_styles_profile_border_width: 0,
//       header_styles_profile_border_color: "#000000",
//       header_styles_collapse_long_bio: false,
//       header_styles_social_icons_size: 0.1,
//       header_styles_text_spacing: 0,
//       card_styles_design: 0,
//       card_styles_card_color: "#ffffff",
//       card_styles_text_color: "#000000",
//       card_styles_label_color: "#6b7280",
//       card_styles_card_corner: 0.3,
//       card_styles_card_border_width: 0.4,
//       card_styles_card_border_color: "#e5e7eb",
//       card_styles_card_shadow: 0,
//       card_styles_card_spacing: 0.5,
//       title_font: "Inter",
//       text_font: "Inter",
//     },
//   },
  
//   theme5: {
//     name: "Theme 5",
//     description: "Placeholder for Theme 5 - to be configured",
//     styles: {
//       general_styles_desktop_bgcolor: "#ffffff",
//       general_styles_primary_text_color: "#000000",
//       general_styles_primary_bgcolor: "#f3f4f6",
//       general_styles_is_secondary_bgcolor: false,
//       general_styles_is_label_exist: false,
//       general_styles_secondary_bgcolor: "#f9fafb",
//       general_styles_soft_shadow: true,
//       general_styles_background_type: "solid",
//       general_styles_gradient_color: "#ffffff",
//       general_styles_gradient_direction: 145,
//       general_styles_gradient_offset: 50,
//       general_styles_bg_image: null,
//       general_styles_bg_image_blur: false,
//       header_styles_profile_shadow: 0,
//       header_styles_profile_border_width: 0,
//       header_styles_profile_border_color: "#000000",
//       header_styles_collapse_long_bio: false,
//       header_styles_social_icons_size: 0.1,
//       header_styles_text_spacing: 0,
//       card_styles_design: 0,
//       card_styles_card_color: "#ffffff",
//       card_styles_text_color: "#000000",
//       card_styles_label_color: "#6b7280",
//       card_styles_card_corner: 0.3,
//       card_styles_card_border_width: 0.4,
//       card_styles_card_border_color: "#e5e7eb",
//       card_styles_card_shadow: 0,
//       card_styles_card_spacing: 0.5,
//       title_font: "Inter",
//       text_font: "Inter",
//     },
//   },
  
//   theme6: {
//     name: "Theme 6",
//     description: "Placeholder for Theme 6 - to be configured",
//     styles: {
//       general_styles_desktop_bgcolor: "#ffffff",
//       general_styles_primary_text_color: "#000000",
//       general_styles_primary_bgcolor: "#f3f4f6",
//       general_styles_is_secondary_bgcolor: false,
//       general_styles_is_label_exist: false,
//       general_styles_secondary_bgcolor: "#f9fafb",
//       general_styles_soft_shadow: true,
//       general_styles_background_type: "solid",
//       general_styles_gradient_color: "#ffffff",
//       general_styles_gradient_direction: 145,
//       general_styles_gradient_offset: 50,
//       general_styles_bg_image: null,
//       general_styles_bg_image_blur: false,
//       header_styles_profile_shadow: 0,
//       header_styles_profile_border_width: 0,
//       header_styles_profile_border_color: "#000000",
//       header_styles_collapse_long_bio: false,
//       header_styles_social_icons_size: 0.1,
//       header_styles_text_spacing: 0,
//       card_styles_design: 0,
//       card_styles_card_color: "#ffffff",
//       card_styles_text_color: "#000000",
//       card_styles_label_color: "#6b7280",
//       card_styles_card_corner: 0.3,
//       card_styles_card_border_width: 0.4,
//       card_styles_card_border_color: "#e5e7eb",
//       card_styles_card_shadow: 0,
//       card_styles_card_spacing: 0.5,
//       title_font: "Inter",
//       text_font: "Inter",
//     },
//   },
  
//   theme7: {
//     name: "Theme 7",
//     description: "Placeholder for Theme 7 - to be configured",
//     styles: {
//       general_styles_desktop_bgcolor: "#ffffff",
//       general_styles_primary_text_color: "#000000",
//       general_styles_primary_bgcolor: "#f3f4f6",
//       general_styles_is_secondary_bgcolor: false,
//       general_styles_is_label_exist: false,
//       general_styles_secondary_bgcolor: "#f9fafb",
//       general_styles_soft_shadow: true,
//       general_styles_background_type: "solid",
//       general_styles_gradient_color: "#ffffff",
//       general_styles_gradient_direction: 145,
//       general_styles_gradient_offset: 50,
//       general_styles_bg_image: null,
//       general_styles_bg_image_blur: false,
//       header_styles_profile_shadow: 0,
//       header_styles_profile_border_width: 0,
//       header_styles_profile_border_color: "#000000",
//       header_styles_collapse_long_bio: false,
//       header_styles_social_icons_size: 0.1,
//       header_styles_text_spacing: 0,
//       card_styles_design: 0,
//       card_styles_card_color: "#ffffff",
//       card_styles_text_color: "#000000",
//       card_styles_label_color: "#6b7280",
//       card_styles_card_corner: 0.3,
//       card_styles_card_border_width: 0.4,
//       card_styles_card_border_color: "#e5e7eb",
//       card_styles_card_shadow: 0,
//       card_styles_card_spacing: 0.5,
//       title_font: "Inter",
//       text_font: "Inter",
//     },
//   },
  
//   theme8: {
//     name: "Theme 8",
//     description: "Placeholder for Theme 8 - to be configured",
//     styles: {
//       general_styles_desktop_bgcolor: "#ffffff",
//       general_styles_primary_text_color: "#000000",
//       general_styles_primary_bgcolor: "#f3f4f6",
//       general_styles_is_secondary_bgcolor: false,
//       general_styles_is_label_exist: false,
//       general_styles_secondary_bgcolor: "#f9fafb",
//       general_styles_soft_shadow: true,
//       general_styles_background_type: "solid",
//       general_styles_gradient_color: "#ffffff",
//       general_styles_gradient_direction: 145,
//       general_styles_gradient_offset: 50,
//       general_styles_bg_image: null,
//       general_styles_bg_image_blur: false,
//       header_styles_profile_shadow: 0,
//       header_styles_profile_border_width: 0,
//       header_styles_profile_border_color: "#000000",
//       header_styles_collapse_long_bio: false,
//       header_styles_social_icons_size: 0.1,
//       header_styles_text_spacing: 0,
//       card_styles_design: 0,
//       card_styles_card_color: "#ffffff",
//       card_styles_text_color: "#000000",
//       card_styles_label_color: "#6b7280",
//       card_styles_card_corner: 0.3,
//       card_styles_card_border_width: 0.4,
//       card_styles_card_border_color: "#e5e7eb",
//       card_styles_card_shadow: 0,
//       card_styles_card_spacing: 0.5,
//       title_font: "Inter",
//       text_font: "Inter",
//     },
//   },
  
//   theme9: {
//     name: "Theme 9",
//     description: "Placeholder for Theme 9 - to be configured",
//     styles: {
//       general_styles_desktop_bgcolor: "#ffffff",
//       general_styles_primary_text_color: "#000000",
//       general_styles_primary_bgcolor: "#f3f4f6",
//       general_styles_is_secondary_bgcolor: false,
//       general_styles_is_label_exist: false,
//       general_styles_secondary_bgcolor: "#f9fafb",
//       general_styles_soft_shadow: true,
//       general_styles_background_type: "solid",
//       general_styles_gradient_color: "#ffffff",
//       general_styles_gradient_direction: 145,
//       general_styles_gradient_offset: 50,
//       general_styles_bg_image: null,
//       general_styles_bg_image_blur: false,
//       header_styles_profile_shadow: 0,
//       header_styles_profile_border_width: 0,
//       header_styles_profile_border_color: "#000000",
//       header_styles_collapse_long_bio: false,
//       header_styles_social_icons_size: 0.1,
//       header_styles_text_spacing: 0,
//       card_styles_design: 0,
//       card_styles_card_color: "#ffffff",
//       card_styles_text_color: "#000000",
//       card_styles_label_color: "#6b7280",
//       card_styles_card_corner: 0.3,
//       card_styles_card_border_width: 0.4,
//       card_styles_card_border_color: "#e5e7eb",
//       card_styles_card_shadow: 0,
//       card_styles_card_spacing: 0.5,
//       title_font: "Inter",
//       text_font: "Inter",
//     },
//   },
// };

// /**
//  * Get theme configuration by theme enum value
//  */
// export function getThemeConfig(theme: Theme): ThemeConfig | null {
//   return THEME_CONFIGS[theme];
// }

// /**
//  * Apply theme styles to link data
//  * This function merges theme styles with any custom overrides
//  */
// export function applyThemeStyles(
//   theme: Theme,
//   customStyles?: Partial<ThemeConfig["styles"]>
// ): ThemeConfig["styles"] | null {
//   const themeConfig = getThemeConfig(theme);
  
//   if (!themeConfig) {
//     return null;
//   }
  
//   return {
//     ...themeConfig.styles,
//     ...customStyles,
//   };
// }

