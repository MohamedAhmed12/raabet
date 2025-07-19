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
    name: "premium",
    originalPrice: "$5",
    discountPrice: "$2.5",
    description:
      "Supercharge your profile with advanced blocks, styling, analytics, integrations, and more.",
    sections: [
      {
        title: "General",
        features: [
          { text: "Unlimited blocks and socials", value: true },
          { text: "Custom Rabet URL", value: false },
          // { text: "RabetAffiliate", value: false }, next release
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
  //         { text: "customRabetUrl", value: false },
  //         { text: "syncInstagramPosts", value: true },
  //         { text: "multiPageNavigation", value: true },
  //         { text: "RabetAffiliate", value: false },
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

export const arPlans: Plan[] = [
  {
    name: "متميز",
    originalPrice: "$5",
    discountPrice: "$2.5",
    description: "طوّر ملفك الشخصي باستخدام كتل متقدمة، وتنسيق مخصص، وتحليلات، وتكاملات، والمزيد.",
    sections: [
      {
        title: "عام",
        features: [
          { "text": "كتل وروابط اجتماعية غير محدودة", "value": true },
          { "text": "رابط Rabet مخصص", "value": false },
          { "text": "شارة التحقق", "value": true },
          { "text": "زر مشاركة مع رمز QR وبطاقة vCard", "value": true }
        ]
      },
      {
        title: "كتل الروابط",
        features: [
          { "text": "رابط إلى URL أو بريد إلكتروني", "value": false },
          { "text": "صور مصغّرة", "value": true },
          { "text": "تخصيص الألوان والخطوط والحدود، وغير ذلك...", "value": true },
          { "text": "تحريك الكتل لجذب الانتباه", "value": false }
        ]
      },
      {
        title: "كتل خاصة",
        features: [
          { "text": "كتل تضمين صوت وفيديو ووسائط", "value": false },
          { "text": "كتل نص غني", "value": true },
          { "text": "كتل تحميل ملفات", "value": true }
        ]
      },
      {
        title: "تحليلات",
        features: [
          { "text": "تحليلات إجمالي مشاهدة الصفحة ونقر الروابط", "value": false },
          { "text": "تحليلات كل رابط على حدة", "value": true },
          { "text": "تحليلات طوال الوقت أو ضمن نطاق زمني مخصص", "value": false }
        ]
      }
    ]
  }
  
];
