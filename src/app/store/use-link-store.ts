import { iconNameType } from "@/assets/icons";
import { User } from "next-auth";
import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface LinkSocial {
  id: string;
  icon: iconNameType;
  url: string;
  order: number;
  linkId: string;
  link?: Link;
}

export interface Block {
  id: string;
  style: number;
  text: string;
  textColor: number;
  corner: number;
  linkId: string;
  link?: Link;
}

export interface Link {
  id: string;
  phone: string;
  website: string;
  instagram: string;
  twitter: string;
  bio: string;
  userName: string;
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
  card_styles_design: number;
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
  socials?: LinkSocial[];
  blocks?: Block[];
}

interface LinkState {
  link: Link;
  setLink: (link: Partial<Link>) => void;
}

const createLinkSlice: StateCreator<LinkState> = (set) => ({
  link: {
    id: "",
    // contact data
    phone: "",
    website: "",
    instagram: "",
    twitter: "",
    bio: "",
    userName: "",
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
    header_styles_profile_border_color: "#000000",
    header_styles_collapse_long_bio: false,
    header_styles_social_icons_size: 10,

    // card style
    //         // card_styles_tactile_cards: 10,
    card_styles_design: 1,
    card_styles_card_color: "#000000",
    card_styles_text_color: "#000000",
    card_styles_card_corner: 0, // border radius
    card_styles_card_border_width: 5,
    card_styles_card_border_color: "#000000",
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
