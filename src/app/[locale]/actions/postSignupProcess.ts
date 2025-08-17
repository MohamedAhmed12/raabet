import { createTrackedQRcodeURL } from "@/lib/createTrackedQRcodeURL";
import { formatUsername } from "@/lib/formatUsername";
import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { BlockType } from "@prisma/client";

export const postSignupProcess = async (userId: string, fullname: string) => {
  try {
    const userName = formatUsername(fullname);
    const QRCodeURL = `${process.env.NEXT_PUBLIC_BASE_URL}/ar/${userName}`;

    // 1. Create a link for the user
    const link = await prisma.link.create({
      data: {
        userId: userId,
        userName,
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
        card_styles_card_corner: 0.3,
        card_styles_card_border_width: 0.4,
        card_styles_card_border_color: "#e5e7eb",
        card_styles_card_shadow: 0,
        card_styles_card_spacing: 0.5,
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

    // 3. Create default blocks for the new link
    const defaultBlocks = [
      // Text block
      {
        linkId: link.id,
        type: "text" as BlockType,
        title: `Welcome to My Page!`,
        description: "Thanks for visiting. Here's how you can connect with me.",
        url: "#", // Adding required url field
        layout: "1",
        order: 0,
        corner: 8,
        text_color: "#1e293b",
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Social media URL block
      {
        linkId: link.id,
        type: "url" as BlockType,
        title: "Connect on Social Media",
        description: "Follow me for updates and more content",
        url: "#", // Replace with actual social media URL
        layout: "2",
        order: 1,
        corner: 8,
        text_color: "#0369a1",
        bg_image: "/images/7.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Email block
      {
        linkId: link.id,
        type: "email" as BlockType,
        title: "Get in Touch",
        description: "Send me an email",
        url: `mailto:${userId}@example.com`,
        layout: "1",
        order: 2,
        corner: 8,
        text_color: "#166534",
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Portfolio URL block
      {
        linkId: link.id,
        type: "url" as BlockType,
        title: "Check Out My Work",
        description: "View my portfolio and latest projects",
        url: "#", // Adding required url field
        layout: "1",
        order: 0,
        corner: 8,
        text_color: "#1e293b",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Create all blocks in a transaction
    await prisma.$transaction(
      defaultBlocks.map((block) => prisma.block.create({ data: block }))
    );

    // 4. Create a QR code for the user's profile
    const qrCode = await createQRCode(QRCodeURL, link.id);

    return { link, subscription, qrCode };
  } catch (error) {
    logError(error, {
      action: "postSignupProcess",
      userId,
      fullname,
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
    });
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
    logError(error, {
      action: "postSignupProcess/createQRCode",
      url,
      linkId,
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
    });
    throw error;
  }
};
