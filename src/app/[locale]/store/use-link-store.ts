import { iconNameType } from "@/assets/icons";
import { Block, QRCode } from "@prisma/client";
import { User } from "next-auth";
import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type SetLinkProps = {
  key: keyof Link;
  value: string | boolean | number | User | Block[] | LinkSocial[] | any;
};
export interface LinkSocial {
  id: string;
  icon: iconNameType | string;
  url: string;
  order: number;
  label: string | null;
}

export interface Link {
  id: string;
  phone?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  displayname?: string;
  bio?: string;
  // used as forgein key
  userName?: string;
  general_styles_desktop_bgcolor?: string;
  general_styles_primary_text_color?: string;
  general_styles_primary_bgcolor?: string;
  general_styles_is_secondary_bgcolor?: boolean;
  general_styles_is_label_exist?: boolean;
  general_styles_secondary_bgcolor?: string;
  general_styles_background_type?: string;
  general_styles_gradient_color?: string;
  general_styles_gradient_direction?: number;
  general_styles_gradient_offset?: number;
  general_styles_bg_image?: string | null;
  general_styles_bg_image_blur?: boolean;
  // implement in link viewer
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
  title_font?: string;
  text_font?: string;
  social_enable_add_contacts?: boolean;
  social_enable_share_btn?: boolean;
  social_enable_search?: boolean;
  social_enable_qr_code?: boolean;
  social_enable_hide_raabet_branding?: boolean;
  // social_enable_enable_verified_badge?: boolean;
  social_custom_logo?: string;
  social_custom_logo_size?: number;
  last_feedback_ts?: Date | null | undefined;
  user?: User;
  socials?: LinkSocial[];
  blocks?: Block[];
  qrcodes?: QRCode[];
}

interface LinkState {
  link: Link;
  linkRaw: Link;
  setLink: (props: SetLinkProps) => void;
  replaceLink: (link: Link | ((prev: Link) => Link)) => void;
  setLinkRaw: (update: Link | ((prev: Link) => Link)) => void;
}

const createLinkSlice: StateCreator<LinkState> = (set) => ({
  link: {
    id: "",
  },

  linkRaw: {
    id: "",
  },

  setLink: ({ key, value }: SetLinkProps) => {
    set((state) => ({
      link: {
        ...state.link,
        [key]: typeof value === "function" ? value(state.link) : value,
      },
    }));
  },

  replaceLink: (update) =>
    set((state) => ({
      link: typeof update === "function" ? update(state.link) : update,
    })),

  setLinkRaw: (update: Link | ((prev: Link) => Link)) => {
    set(
      (state) => ({
        linkRaw: typeof update === "function" ? update(state.linkRaw) : update,
      }),
      false // Skip store equality check for performance
    );
  },
});

export const useLinkStore = create<LinkState>()(
  devtools(createLinkSlice, { name: "user-context-store" })
);
