import { iconNameType } from "@/assets/icons";
import { Block } from "@prisma/client";
import { User } from "next-auth";
import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface LinkSocial {
  id: string;
  icon: iconNameType;
  url: string;
  order: number;
  label: string;
}

export interface Link {
  id: string;
  phone?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  displayname?: string;
  bio?: string;
  userName?: string;
  general_styles_desktop_bgcolor?: string;
  general_styles_primary_text_color?: string;
  general_styles_primary_bgcolor?: string;
  general_styles_is_secondary_bgcolor?: boolean;
  general_styles_is_label_exist?: boolean;
  general_styles_secondary_bgcolor?: string;
  general_styles_soft_shadow?: boolean;
  header_styles_profile_shadow?: number;
  header_styles_profile_border_width?: number;
  header_styles_profile_border_color?: string;
  header_styles_collapse_long_bio?: boolean;
  header_styles_social_icons_size?: number;
  //     // card_styles_tactile_cards?: number;
  card_styles_design?: number;
  card_styles_card_color?: string;
  card_styles_text_color?: string;
  card_styles_card_corner?: number;
  card_styles_card_border_width?: number;
  card_styles_card_border_color?: string;
  card_styles_card_shadow?: number;
  card_styles_card_spacing?: number;
  card_styles_label_color?: string;
  card_styles_label_text_color?: string;
  title_font?: string;
  text_font?: string;
  social_enable_add_contacts?: boolean;
  social_enable_share_btn?: boolean;
  social_enable_search?: boolean;
  social_enable_qr_code?: boolean;
  user?: User;
  socials?: LinkSocial[];
  blocks?: Block[];
}

interface LinkState {
  link: Link;
  setLink: (link: Partial<Link>) => void;
  replaceLink: (link: Link | ((prev: Link) => Link)) => void;
}

const createLinkSlice: StateCreator<LinkState> = (set) => ({
  link: {
    id: "",
  },

  setLink: (data: Partial<Link>) => {
    set((state) => ({
      link: {
        ...state.link,
        ...data,
      },
    }));
  },

  replaceLink: (update) =>
    set((state) => ({
      link: typeof update === "function" ? update(state.link) : update,
    })),
});

export const useLinkStore = create<LinkState>()(
  devtools(createLinkSlice, { name: "user-context-store" })
);
