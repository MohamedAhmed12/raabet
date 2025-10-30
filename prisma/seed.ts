import { createTrackedQRcodeURL } from "../src/lib/createTrackedQRcodeURL";
import { BlockType, PrismaClient, QRType, PaymentMethod } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create a User
  const hashedPassword = await bcrypt.hash("123123", 10);

  const user = await prisma.user.create({
    data: {
      email: "support@rabet-link.com",
      password: hashedPassword, // Use hashed password in real applications
      fullname: "admin",
      is_confirmed: true,
    },
  });

  console.log("User created:", user.id);

  const subscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      paymentMethod: PaymentMethod.stripe,
      amount: 0,
    },
  });

  console.log("subscription created:", subscription.id);

  // Create a Link associated with the created user
  const link = await prisma.link.create({
    data: {
      phone: "",
      website: "",
      instagram: "",
      twitter: "",
      displayname: "John Doe",
      bio: "Write you Bio here...",
      userName: user.fullname, // Link it to the user
      userId: user.id, // Link it to the user
      general_styles_desktop_bgcolor: "#F1F1F1",
      general_styles_primary_text_color: "#000000",
      general_styles_primary_bgcolor: "#FFFFFF",
      general_styles_is_secondary_bgcolor: false,
      general_styles_is_label_exist: false,
      general_styles_secondary_bgcolor: "#000000",
      general_styles_soft_shadow: true,
      general_styles_background_type: "solid",
      header_styles_profile_shadow: 0.1,
      header_styles_profile_border_width: 0.1,
      header_styles_profile_border_color: "rgb(37, 37, 61)",
      header_styles_collapse_long_bio: true,
      header_styles_social_icons_size: 0.1,
      card_styles_design: 2,
      card_styles_card_color: "#F1F1F1",
      card_styles_text_color: "#000000",
      card_styles_label_color: "#F1F1F1",
      card_styles_card_corner: 0,
      card_styles_card_border_width: 5,
      card_styles_card_border_color: "rgb(37, 37, 61)",
      card_styles_card_shadow: 5,
      card_styles_card_spacing: 0,
      title_font: "font-noto-sans",
      text_font: "font-noto-sans",
      social_enable_add_contacts: true,
      social_enable_share_btn: true,
      social_enable_search: true,
      social_enable_qr_code: true,
      social_enable_hide_raabet_branding: false,
      // social_enable_enable_verified_badge: false,
      social_custom_logo: "",
      social_custom_logo_size:0,
    },
  });

  console.log("Link created:", link.id);

  // Create Social records for the created Link
  await prisma.social.createMany({
    data: [
      {
        linkId: link.id,
        icon: "instagram",
        url: "https://instagram.com/username",
        label: "",
        order: 0,
      },
      {
        linkId: link.id, // Make sure this matches the Link's ID
        icon: "facebook",
        url: "https://facebook.com/username",
        label: "",
        order: 1,
      },
      {
        linkId: link.id,
        icon: "",
        url: "",
        label: "",
        order: 2,
      },
      {
        linkId: link.id,
        icon: "twitter",
        url: "https://twitter.com/username",
        label: "",
        order: 3,
      },
      {
        linkId: link.id,
        icon: "",
        url: "",
        label: "",
        order: 4,
      },
    ],
  });

  console.log("Link socials created:");

  // Create sample QR codes for the link
  await prisma.qRCode.createMany({
    data: [
      {
        linkId: link.id,
        type: QRType.profile,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${user.fullname}`,
        destination_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${user.fullname}`,
        display_url: createTrackedQRcodeURL(`${process.env.NEXT_PUBLIC_BASE_URL}/${user.fullname}`),
        isMain: true,
      },
      {
        linkId: link.id,
        type: QRType.url,
        url: "https://instagram.com/username",
        destination_url: 'https://instagram.com/username',
        display_url: createTrackedQRcodeURL('https://instagram.com/username'),
      },
      {
        linkId: link.id,
        type: QRType.url,
        url: "https://twitter.com/username",
        destination_url: 'https://twitter.com/username',
        display_url: createTrackedQRcodeURL('https://twitter.com/username'),
      },
    ],
  });

  console.log("QR codes created successfully");

  // Create Social records for the created Link
  await prisma.block.createMany({
    data: [
      {
        linkId: link.id, // Make sure this matches the Link's ID
        url: "https://picsum.photos/200/300",
        type: BlockType.text,
        title: "title1",
        description: "",
        text_color: link.card_styles_text_color,
        corner: 0,
        layout: "2",
        order: 0,
      },
      {
        linkId: link.id, // Make sure this matches the Link's ID
        url: "https://picsum.photos/200/300",
        type: BlockType.url,
        title: "title2",
        description: "description 2",
        text_color: link.card_styles_text_color,
        corner: 0,
        layout: "2",
        order: 1,
      },
      {
        linkId: link.id,
        url: "https://picsum.photos/200/300",
        type: BlockType.email,
        title: "title3",
        description: "description 3",
        text_color: link.card_styles_text_color,
        corner: 0,
        layout: "1",
        order: 2,
      },
      {
        linkId: link.id,
        url: "https://picsum.photos/300/200",
        type: BlockType.file,
        title: "title4",
        description: "description 4",
        text_color: link.card_styles_text_color,
        corner: 0,
        layout: "1",
        order: 3,
      },
      {
        linkId: link.id,
        url: "/images/7.jpg",
        type: BlockType.image,
        title: "title5",
        description: "description 5",
        text_color: link.card_styles_text_color,
        corner: 0,
        layout: "1",
        order: 4,
      },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log("Link socials created:");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
