import { createTrackedQRcodeURL } from "@/lib/createTrackedQRcodeURL";
import prisma from "@/lib/prisma";

export const postSignupProcess = async (userId: string, fullname: string) => {
  try {
    // 1. Create a link for the user
    const link = await prisma.link.create({
      data: {
        userId: userId,
        userName: fullname,
        displayname: fullname,
        bio: "",
        phone: "",
        website: "",
        instagram: "",
        twitter: "",
        general_styles_desktop_bgcolor: "#ffffff",
        general_styles_primary_text_color: "#000000",
        general_styles_primary_bgcolor: "#f3f4f6",
        general_styles_is_secondary_bgcolor: false,
        general_styles_is_label_exist: false,
        general_styles_secondary_bgcolor: "#f9fafb",
        general_styles_soft_shadow: true,
        header_styles_profile_shadow: 0,
        header_styles_profile_border_width: 0,
        header_styles_profile_border_color: "#000000",
        header_styles_collapse_long_bio: false,
        header_styles_social_icons_size: 24,
        card_styles_design: 0,
        card_styles_card_color: "#ffffff",
        card_styles_text_color: "#000000",
        card_styles_label_color: "#6b7280",
        card_styles_card_corner: 12,
        card_styles_card_border_width: 1,
        card_styles_card_border_color: "#e5e7eb",
        card_styles_card_shadow: 1,
        card_styles_card_spacing: 8,
        title_font: "Inter",
        text_font: "Inter",
        social_enable_add_contacts: true,
        social_enable_share_btn: true,
        social_enable_search: true,
        social_enable_qr_code: true,
        social_enable_hide_raabet_branding: false,
        social_custom_logo: "",
        social_custom_logo_size: 0,
      },
    });

    // 2. Create a trial subscription for the user
    const subscription = await prisma.subscription.create({
      data: {
        userId: userId,
        status: "trialing",
        paymentMethod: "stripe",
        amount: 0, // Free trial
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      },
    });

    // 3. Create a QR code for the user's profile
    const qrCode = await createQRCode(
      `https://raabet.com/${link.userName}`,
      link.id
    );

    return { link, subscription, qrCode };
  } catch (error) {
    console.error("Post-signup process failed:", error);
    // Consider implementing a retry mechanism or notification for admin
    throw error;
  }
};

export const createQRCode = async (url: string, linkId: string) => {
  try {
    // Adjust domain as needed
    const qrCode = await prisma.qRCode.create({
      data: {
        type: "profile",
        url: url,
        display_url: createTrackedQRcodeURL(url),
        isMain: true,
        link: {
          connect: { id: linkId },
        },
      },
    });
    return qrCode;
  } catch (error) {
    console.error("Failed to create QR code:", error);
    throw error;
  }
};
