interface FeaturesSection {
  title: string;
  features: { text: string; value: boolean }[]; // Array of feature objects for each category
}
export interface Plan {
  name: string;
  originalPrice: string;
  discountPrice: string;
  description: string;
  sections: FeaturesSection[];
}

export const plans: Plan[] = [
  {
    name: "Premium",
    originalPrice: '$5',
    discountPrice: '$2.5',
    description:
      "Supercharge your profile with advanced blocks, styling, analytics, integrations, and more.",
    sections: [
      {
        title: "General",
        features: [
          { text: "Unlimited blocks and socials", value: true },
          { text: "Custom Raabet URL", value: false },
          // { text: "liinksAffiliate", value: false }, next release
          // ticket for both 
          { text: "Verification badge", value: true },
          { text: "Share button with QR code + vCard", value: true },
        ],
      },
      {
        title: "Link Blocks",
        features: [
          { text: "Link to URL or Email", value: false },
          { text: "Image thumbnails", value: true },
          { text: "Customize colors, fonts, borders, etc...", value: true },
          { text: "Animate blocks to draw attention", value: false },
          // { text: "Schedule link publishing", value: true }, next attiration
          // { text: "Temporarily skip directly to a link", value: true },
        ],
      },
       {
        title: "Special Blocks",
        features: [
          { text: "Audio, Video and Media embed block", value: false },
          { text: "Rich text block", value: true },
          { text: "File download block", value: true },
          // { text: "Form block", value: false },
        ],
      },
      {
        title: "Analytics",
        features: [
          { text: "Total page view & link click analytics", value: false },
          { text: "Individual link analytics", value: true },
          { text: "Analytics for all time or custom date range", value: false },
          // { text: "Facebook pixel integration", value: false },
          // { text: "Google Analytics integration", value: true },
        ],
      },
      //  {
      //   title: "QR Codes",
      //   features: [
      //     { text: "Create unlimited dynamic QR codes", value: false },
      //     { text: "Individual link analytics", value: true },
      //     { text: "Analytics for all time or custom date range", value: false },
      //     // { text: "Facebook pixel integration", value: false },
      //     // { text: "Google Analytics integration", value: true },
      //   ],
      // },
    ],
  },
  // next release 
  // {
  //   name: "Pro+",
  //   price: 10,
  //   description:
  //     "Advanced features for pros and teams. Includes 5 Premium profiles to get you started.",
  //   sections: [
  //     {
  //       title: "General",
  //       features: [
  //         { text: "unlimitedBlocksAndSocials", value: true },
  //         { text: "customLiinksUrl", value: false },
  //         { text: "syncInstagramPosts", value: true },
  //         { text: "multiPageNavigation", value: true },
  //         { text: "liinksAffiliate", value: false },
  //         { text: "verificationBadge", value: true },
  //       ],
  //     },
  //     {
  //       title: "Link Blocks",
  //       features: [
  //         { text: "customizeColorsAndFonts", value: false },
  //         { text: "animateBlocks", value: true },
  //         { text: "scheduleLinkPublishing", value: true },
  //         { text: "skipLinkDirectly", value: false },
  //         { text: "audioVideoEmbedBlock", value: true },
  //         { text: "specialBlocks", value: true },
  //         { text: "richTextBlock", value: true },
  //         { text: "mailingListBlock", value: true },
  //         { text: "fileDownloadBlock", value: true },
  //         { text: "organizeBlocksInFolders", value: true },
  //       ],
  //     },
  //     {
  //       title: "Analytics",
  //       features: [
  //         { text: "accessBetaFeatures", value: false },
  //         { text: "customDomainProfile", value: true },
  //         { text: "linkToSubpages", value: false },
  //         { text: "customizeSharingMetadata", value: false },
  //         { text: "linkToUrlOrEmail", value: true },
  //         { text: "linkBlocks", value: false },
  //         { text: "imageEmojiIconThumbnails", value: false },
  //         { text: "gridCarouselHighlightLayouts", value: true },
  //       ],
  //     },
  //   ],
  // },
];
