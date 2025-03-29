import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a User
  const user = await prisma.user.create({
    data: {
      email: "user@raabet.com",
      password: "123123", // Use hashed password in real applications
      fullname: "johndoe",
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
      general_styles_desktop_bgcolor: "#F1F1F1",
      general_styles_primary_text_color: "#000000",
      general_styles_primary_bgcolor: "#FFFFFF",
      general_styles_is_secondary_bgcolor: false,
      general_styles_secondary_bgcolor: "#000000",
      general_styles_soft_shadow: true,
      header_styles_profile_shadow: 0.1,
      header_styles_profile_border_width: 0,
      header_styles_profile_border_color: "rgb(37, 37, 61)",
      header_styles_collapse_long_bio: true,
      header_styles_social_icons_size: 10,
      card_styles_card_color: "#F1F1F1",
      card_styles_text_color: "#000000",
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
        icon: "Facebook",
        url: "https://facebook.com/username",
        order: 1,
      },
      {
        linkId: link.id,
        icon: "Twitter",
        url: "https://twitter.com/username",
        order: 2,
      },
      {
        linkId: link.id,
        icon: "Instagram",
        url: "https://instagram.com/username",
        order: 3,
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
