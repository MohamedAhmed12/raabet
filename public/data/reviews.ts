export interface Review {
  id: number;
  name: string;
  title: string;
  review: string;
  image: string;
  stars: number;
}

const reviews1: Review[] = [
  {
    id: 1,
    name: "Sara Al‑Zahrani",
    title: "Designer, Riyadh",
    review:
      "Rabet made sharing my links effortless. Looks great and works fast!",
    image: "/images/avatars/sara-al‑zahrani.webp",
    stars: 5,
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    title: "Marketing, Cairo",
    review:
      "رابط تعامل معاه سهل حتى فى الدفع بدفع انستا باى او فودافون كاش و  سعره لذيذ", // need saudi review
    image: "/images/avatars/ahmed-hassan.webp",

    stars: 5,
  },
  {
    id: 3,
    name: "Noah Johnson",
    title: "Entrepreneur, Dubai",
    review:
      "Seriously, it’s a super neat and easy-to-use link. Great price, and support replies fast!",
    image: "/images/avatars/noah-johnson.webp",
    stars: 4,
  },
  {
    id: 4,
    name: "crunchiees store",
    title: "Online store",
    review: `رابط منظم ومريح وفر علينا وقت كان بيروح في زحمه اللينكات`,
    image: "/images/avatars/crunchiees.jpeg",
    stars: 4,
  },
  {
    id: 5,
    name: "Amara Johnson",
    title: "Product Designer, UK",
    review: "Clean, stylish and easy to customize—great for showcasing links",
    image: "/images/avatars/amara-johnson.webp",
    stars: 5,
  },
  {
    id: 6,
    name: "Ameera Al-Eisaei",
    title: "Content Creator, Bahrain",
    review:
      "الرابط مرررة سهل لرتب روابطي، و فيه مميزات خوش مثل الأنيمشن و الـ flexible customization",
    image: "/images/avatars/ameera-al-eisaei.webp",
    stars: 5,
  },
];

const reviews2: Review[] = [
  {
    id: 1,
    name: "Noura Al‑Hashimi",
    title: "Marketer, Abu Dhabi",
    review:
      "Built my full Rabet/links page in one afternoon. Smooth and flexible",
    image: "/images/avatars/noura-al-hashimi.webp",
    stars: 5,
  },
  {
    id: 2,
    name: "Mohamed Hamdan",
    title: "Business Owner, Cairo",
    review: "رابط بعد سهل لرتب روابط مشروعي بسرعة وبلا مشاكل",
    image: "/images/avatars/mohamed-hamdan.webp",
    stars: 5,
  },
  {
    id: 3,
    name: "Khalid Al Gurayed",
    title: "Creator, Bahrain",
    review: "Rabet looks amazing makes my profile links shine",
    image: "/images/avatars/khalid-al-gurayed.webp",
    stars: 5,
  },
  {
    id: 4,
    name: "Ovioo",
    title: "Virtual Design saas, USA",
    review: "رابط منظم واحترافي. مناسب لعرض الصور والأعمال بسهولة",
    image: "/images/avatars/ovioo.webp",
    stars: 5,
  },
  {
    id: 5,
    name: "Emily Smith",
    title: "Designer, UK",
    review:
      "A great link-in-bio tool. Easy UI, flexible layout and advanced options",
    image: "/images/avatars/emily-smith.webp",
    stars: 5,
  },
  {
    id: 6,
    name: "Bas Michielsen",
    title: "Verified Reviewer, Netherlands",
    review: "I’ve tried many bio‑link, Rabet tools were the easiest to set up",
    image: "/images/avatars/bas-michielsen.webp",
    stars: 5,
  },
];

export { reviews1, reviews2 };
