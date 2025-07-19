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
    review: "Rabet made sharing my links effortless. Looks great and works fast!",
    image: "/images/gulf1.jpg",
    stars: 5,
  },
  {
    id: 2,
    name: "Mohamed El‑Shamy",
    title: "Marketing, Cairo",
    review: "رابط تعامل معاه سهل حتى فى الدفع بدفع انستا باى او فودافون كاش و  سعره لذيذ",
    image: "/images/egypt1.jpg",
    stars: 5,
  },
  {
    id: 3,
    name: "Huda Al‑Amiri",
    title: "Entrepreneur, Dubai",
    review: `بالج والله، رابط مرتب مرة وسهل استخدامه، والسعر كويس، والدعم يرد بسرعة`,
    image: "/images/gulf2.jpg",
    stars: 4,
  },
  {
    id: 4,
    name: "Yasmine Gad",
    title: "Photographer, Alexandria",
    review: `رابط منظم ومريح وفر علي وقت كان بيروح في زحمه اللينكات`,
    image: "/images/egypt2.jpg",
    stars: 4,
  },
  {
    id: 5,
    name: "Oliver Bennett",
    title: "Product Designer, UK",
    review: "Clean, stylish and easy to customize—great for showcasing links",
    image: "/images/english1.jpg",
    stars: 5,
  },
  {
    id: 6,
    name: "Layla Al‑Faraj",
    title: "Content Creator, Bahrain",
    review: `رابط سهل علي تنسيق روابطي بشكل مرتب و فى مميزات كويسه زى الانيمشن و ال flexible customization`,
    image: "/images/gulf3.jpg",
    stars: 5,
  },
];

const reviews2: Review[] = [
  {
    id: 1,
    name: "Noura Al‑Hashimi",
    title: "Marketer, Abu Dhabi",
    review: "Built my full Rabet/links page in one afternoon. Smooth and flexible",
    image: "/images/gulf1.jpg",
    stars: 5,
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    title: "Business Owner, Cairo",
    review: "رابط  سهل علي ترتيب روابط مشروعي بسرعة وبدون مشاكل",
    image: "/images/egypt1.jpg",
    stars: 5,
  },
  {
    id: 3,
    name: "Layla Al‑Faraj",
    title: "Creator, Bahrain",
    review: "Rabet looks amazing makes my profile links shine",
    image: "/images/gulf2.jpg",
    stars: 5,
  },
  {
    id: 4,
    name: "Yara Mostafa",
    title: "Photographer, Alexandria",
    review: "رابط منظم واحترافي. مناسب لعرض الصور والأعمال بسهولة",
    image: "/images/egypt2.jpg",
    stars: 4,
  },
  {
    id: 5,
    name: "Oliver Bennett",
    title: "UK Designer",
    review: "A great link-in-bio tool. Easy UI, flexible layout and advanced options",
    image: "/images/english1.jpg",
    stars: 5,
  },
  {
    id: 6,
    name: "Angela Bierman",
    title: "Verified Reviewer, US",
    review: "I’ve tried many bio‑link, Rabet tools were the easiest to set up",
    image: "/images/english2.jpg",
    stars: 5,
  },
];



export { reviews1, reviews2 };
