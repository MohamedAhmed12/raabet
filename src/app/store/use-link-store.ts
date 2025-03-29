import { User } from "next-auth";
import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Link {
  phone: number;
  website: string;
  instagram: string;
  twitter: string;
  bio: string;
  general_styles_desktop_bgcolor: string;
  general_styles_primary_text_color: string;
  general_styles_primary_bgcolor: string;
  general_styles_is_secondary_bgcolor: boolean;
  general_styles_secondary_bgcolor: string;
  general_styles_soft_shadow: boolean;
  header_styles_profile_shadow: number;
  header_styles_profile_border_width: number;
  header_styles_profile_border_color: string;
  header_styles_collapse_long_bio: boolean;
  header_styles_social_icons_size: number;
  //     // card_styles_tactile_cards: number;
  card_styles_card_color: string;
  card_styles_text_color: string;
  card_styles_card_corner: number;
  card_styles_card_border_width: number;
  card_styles_card_border_color: string;
  card_styles_card_shadow: number;
  card_styles_card_spacing: number;
  title_font: string;
  text_font: string;
  social_enable_add_contacts: boolean;
  social_enable_share_btn: boolean;
  social_enable_search: boolean;
  social_enable_qr_code: boolean;
  user?: User;
}

interface LinkState {
  link: Link;
  setLink: (link: Partial<Link>) => void;
}

const createLinkSlice: StateCreator<LinkState> = (set) => ({
  // link: {
  //   // general style
  //   general_styles_desktop_bgcolor: "#F1F1F1",
  //   general_styles_primary_text_color: "#000000",
  //   general_styles_primary_bgcolor: "#FFFFFF",
  //   general_styles_is_secondary_bgcolor: false,
  //   general_styles_secondary_bgcolor: "#000000",
  //   general_styles_soft_shadow: true,
  //   // header style
  //   header_styles_profile_shadow: 0.1,
  //   header_styles_profile_border_width: 0,
  //   header_styles_profile_border_color: "rgb(37, 37, 61)",
  //   header_styles_collapse_long_bio: true,
  //   header_styles_social_icons_size: 10,

  //   // card style
  //   //         // card_styles_tactile_cards: 10,
  //   card_styles_card_color: "#F1F1F1",
  //   card_styles_text_color: "#000000",
  //   card_styles_card_corner: 0, // border radius
  //   card_styles_card_border_width: 5,
  //   card_styles_card_border_color: "rgb(37, 37, 61)",
  //   card_styles_card_shadow: 5,
  //   card_styles_card_spacing: 0,
  //   // fonts
  //   title_font: "font-noto-sans",
  //   text_font: "font-noto-sans",
  //   // social
  //   social_enable_add_contacts: true,
  //   social_enable_share_btn: true,
  //   social_enable_search: true,
  //   social_enable_qr_code: true,
  //   user: {
  //     id: "",
  //     name: "mohamed",
  //     image: "/images/user-placeholder.png",
  //   },
  // },

  link: {
    // contact data
    phone: 0,
    website: "",
    instagram: "",
    twitter: "",
    bio:"",
    // general style
    general_styles_desktop_bgcolor: "",
    general_styles_primary_text_color: "",
    general_styles_primary_bgcolor: "",
    general_styles_is_secondary_bgcolor: false,
    general_styles_secondary_bgcolor: "",
    general_styles_soft_shadow: true,
    // header style
    header_styles_profile_shadow: 0.1,
    header_styles_profile_border_width: 0,
    header_styles_profile_border_color: "",
    header_styles_collapse_long_bio: true,
    header_styles_social_icons_size: 10,

    // card style
    //         // card_styles_tactile_cards: 10,
    card_styles_card_color: "",
    card_styles_text_color: "",
    card_styles_card_corner: 0, // border radius
    card_styles_card_border_width: 5,
    card_styles_card_border_color: "",
    card_styles_card_shadow: 5,
    card_styles_card_spacing: 0,
    // fonts
    title_font: "",
    text_font: "",
    // social
    social_enable_add_contacts: true,
    social_enable_share_btn: true,
    social_enable_search: true,
    social_enable_qr_code: true,
    // user:{}
  },

  setLink: (data: Partial<Link>) => {
    set((state) => ({
      link: {
        ...state.link,
        ...data,
      },
    }));
  },
});

export const useLinkStore = create<LinkState>()(
  devtools(createLinkSlice, { name: "user-context-store" })
);
