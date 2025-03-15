interface FeaturesSection {
  title: string;
  features: { text: string; value: boolean }[]; // Array of feature objects for each category
}
export interface Plan {
  name: string;
  price: number;
  description: string;
  sections: FeaturesSection[];
}

export const plans: Plan[] = [
  {
    name: "Premium",
    price: 4,
    description:
      "Supercharge your profile with advanced blocks, styling, analytics, integrations, and more.",
    sections: [
      {
        title: "General",
        features: [
          { text: "unlimitedBlocksAndSocials", value: true },
          { text: "customLiinksUrl", value: false },
          { text: "syncInstagramPosts", value: true },
          { text: "multiPageNavigation", value: false },
          { text: "liinksAffiliate", value: false },
          { text: "verificationBadge", value: true },
        ],
      },
      {
        title: "Link Blocks",
        features: [
          { text: "customizeColorsAndFonts", value: false },
          { text: "animateBlocks", value: true },
          { text: "scheduleLinkPublishing", value: true },
          { text: "skipLinkDirectly", value: false },
          { text: "audioVideoEmbedBlock", value: true },
          { text: "specialBlocks", value: true },
          { text: "richTextBlock", value: true },
          { text: "mailingListBlock", value: true },
          { text: "fileDownloadBlock", value: true },
          { text: "organizeBlocksInFolders", value: true },
        ],
      },
      {
        title: "Analytics",
        features: [
          { text: "accessBetaFeatures", value: false },
          { text: "customDomainProfile", value: true },
          { text: "linkToSubpages", value: false },
          { text: "customizeSharingMetadata", value: false },
          { text: "linkToUrlOrEmail", value: true },
          { text: "linkBlocks", value: false },
          { text: "imageEmojiIconThumbnails", value: false },
          { text: "gridCarouselHighlightLayouts", value: true },
        ],
      },
    ],
  },
  {
    name: "Pro+",
    price: 10,
    description:
      "Advanced features for pros and teams. Includes 5 Premium profiles to get you started.",
    sections: [
      {
        title: "General",
        features: [
          { text: "unlimitedBlocksAndSocials", value: true },
          { text: "customLiinksUrl", value: false },
          { text: "syncInstagramPosts", value: true },
          { text: "multiPageNavigation", value: true },
          { text: "liinksAffiliate", value: false },
          { text: "verificationBadge", value: true },
        ],
      },
      {
        title: "Link Blocks",
        features: [
          { text: "customizeColorsAndFonts", value: false },
          { text: "animateBlocks", value: true },
          { text: "scheduleLinkPublishing", value: true },
          { text: "skipLinkDirectly", value: false },
          { text: "audioVideoEmbedBlock", value: true },
          { text: "specialBlocks", value: true },
          { text: "richTextBlock", value: true },
          { text: "mailingListBlock", value: true },
          { text: "fileDownloadBlock", value: true },
          { text: "organizeBlocksInFolders", value: true },
        ],
      },
      {
        title: "Analytics",
        features: [
          { text: "accessBetaFeatures", value: false },
          { text: "customDomainProfile", value: true },
          { text: "linkToSubpages", value: false },
          { text: "customizeSharingMetadata", value: false },
          { text: "linkToUrlOrEmail", value: true },
          { text: "linkBlocks", value: false },
          { text: "imageEmojiIconThumbnails", value: false },
          { text: "gridCarouselHighlightLayouts", value: true },
        ],
      },
    ],
  },
];
