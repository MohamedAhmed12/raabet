import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create a User
  const hashedPassword = await bcrypt.hash("123123", 10);

  const user = await prisma.user.create({
    data: {
      email: "user@raabet.com",
      password: hashedPassword, // Use hashed password in real applications
      fullname: "johndoe",
      is_confirmed: true,
    },
  });

  console.log("User created:", user.id);

  // Create a Link associated with the created user
  const link = await prisma.link.create({
    data: {
      phone: "",
      website: "",
      instagram: "",
      twitter: "",
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
      header_styles_profile_shadow: 0.1,
      header_styles_profile_border_width: 0.1,
      header_styles_profile_border_color: "rgb(37, 37, 61)",
      header_styles_collapse_long_bio: true,
      header_styles_social_icons_size: 0.1,
      card_styles_design: 2,
      card_styles_card_color: "#F1F1F1",
      card_styles_text_color: "#000000",
      card_styles_label_color: "#F1F1F1",
      card_styles_label_text_color: "#000000",
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
    },
  });

  console.log("Link created:", link.id);

  // Create Social records for the created Link
  const socials = await prisma.social.createMany({
    data: [
      {
        linkId: link.id, // Make sure this matches the Link's ID
        icon: "facebook",
        url: "https://facebook.com/username",
        order: 1,
      },
      {
        linkId: link.id,
        icon: "",
        url: "",
        order: 2,
      },
      {
        linkId: link.id,
        icon: "twitter",
        url: "https://twitter.com/username",
        order: 3,
      },
      {
        linkId: link.id,
        icon: "",
        url: "",
        order: 4,
      },
      {
        linkId: link.id,
        icon: "instagram",
        url: "https://instagram.com/username",
        order: 5,
      },
      {
        linkId: link.id,
        icon: "instagram",
        url: "https://instagram.com/username",
        order: 6,
      },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log("Link socials created:");

  // Create Social records for the created Link
  const blocks = await prisma.block.createMany({
    data: [
      {
        linkId: link.id, // Make sure this matches the Link's ID
        title: "title1",
        text: "text1",
        textColor: link.card_styles_text_color,
        corner: 0,
      },
      {
        linkId: link.id, // Make sure this matches the Link's ID
        title: "title2",
        text: "text2",
        textColor: link.card_styles_text_color,
        corner: 0,
      },
      {
        linkId: link.id,
        title: "title3",
        text: "text3",
        textColor: link.card_styles_text_color,
        corner: 0,
      },
      {
        linkId: link.id,
        title: "title4",
        text: "text4",
        textColor: link.card_styles_text_color,
        corner: 0,
      },
      {
        linkId: link.id,
        title: "title5",
        text: "text5",
        textColor: link.card_styles_text_color,
        corner: 0,
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
