/**
 * Static site copy and navigation. Sources: .plan/reference/notes.md (captured from the live page).
 * Anything not present in the reference is marked `// PLACEHOLDER` and logged in .plan/PROGRESS.md.
 */

export const SITE_URL = "https://sharepal.in";
export const LIVE_SITE = "https://sharepal.in";

export const brand = {
  name: "SharePal",
  legalName: "SWNAC E-Kiraya Services Pvt Ltd",
  tagline: "Made with ♥️ for India",
  supportEmail: "care@sharepal.in",
} as const;

export interface City {
  slug: string;
  name: string;
}

/** Cities from the live page's location data. Only Bangalore is backed by product-list.json. */
export const cities: readonly City[] = [
  { slug: "bangalore", name: "Bangalore" },
  { slug: "mumbai", name: "Mumbai" },
  { slug: "delhi", name: "Delhi" },
  { slug: "pune", name: "Pune" },
  { slug: "hyderabad", name: "Hyderabad" },
  { slug: "chennai", name: "Chennai" },
  { slug: "kolkata", name: "Kolkata" },
  { slug: "gurgaon", name: "Gurgaon" },
  { slug: "noida", name: "Noida" },
  { slug: "ghaziabad", name: "Ghaziabad" },
  { slug: "faridabad", name: "Faridabad" },
];

export const DEFAULT_CITY = "bangalore";
export const DEFAULT_CATEGORY = "gaming-gadgets-on-rent";

export interface CategoryPage {
  slug: string;
  /** Hero H1 */
  heroTitle: string;
  heroSubtitle: string;
  heroBrands: readonly string[];
  /** Listing title bar */
  listTitle: string;
  breadcrumbLabel: string;
  metaTitle: (city: string) => string;
  metaDescription: (city: string) => string;
  keywords: (city: string) => string[];
}

export const categoryPages: Record<string, CategoryPage> = {
  "gaming-gadgets-on-rent": {
    slug: "gaming-gadgets-on-rent",
    heroTitle: "Gaming Consoles",
    heroSubtitle:
      "Rent the latest gaming gadgets from PS5, Xbox, Oculus VR, Racing Wheel on rent.",
    heroBrands: ["PlayStation", "Xbox", "Meta Quest"],
    listTitle: "gaming gadgets on rent",
    breadcrumbLabel: "Gaming gadgets on rent",
    metaTitle: (city) =>
      `Rent gaming gadgets in ${city} | Zero Deposit Rentals | SharePal`,
    metaDescription: (city) =>
      `Rent gaming gadgets in ${city} from SharePal - India's most trusted lifestyle gear rental platform. Zero Deposit | Free Delivery | Excellent Quality | Pay on Delivery`,
    keywords: (city) => [
      `gaming gadgets on rent in ${city}`,
      `rent gaming gadgets in ${city}`,
      `gaming gadgets rental in ${city}`,
    ],
  },
};

/** Super-category tabs shown under the header. */
export const superCategories = [
  { label: "Photography", href: `${LIVE_SITE}/bangalore/photography-on-rent` },
  { label: "Gaming", href: "/bangalore/gaming-gadgets-on-rent", active: true },
  { label: "Outdoor", href: `${LIVE_SITE}/bangalore/outdoor-gears-on-rent` },
  {
    label: "Entertainment",
    href: `${LIVE_SITE}/bangalore/entertainment-on-rent`,
  },
] as const;

/** Trust points from the page's meta description ("Zero Deposit | Free Delivery | ..."). */
export const trustPoints = [
  "Zero Deposit",
  "Free Delivery",
  "Excellent Quality",
  "Pay on Delivery",
] as const;

/**
 * How renting works — steps paraphrased from the reference FAQ "How can I rent from SharePal?".
 */
export const howItWorks = [
  {
    title: "Pick your gear",
    body: "Browse consoles and combos and choose what you want to play.",
  },
  {
    title: "Select rental dates",
    body: "Choose delivery and pickup dates to see your rental period.",
  },
  {
    title: "Checkout",
    body: "Add to cart and check out — pay online or on delivery.",
  },
  {
    title: "Play & return",
    body: "We deliver to your door and pick it up when your rental ends.",
  },
] as const;

/** Benefits — taken from the page's trust line and FAQ answers (quality checks, verification). */
export const benefits = [
  {
    title: "Zero deposit",
    body: "Rent without blocking money in a security deposit.",
  },
  {
    title: "Free delivery",
    body: "Doorstep delivery and pickup across the city.",
  },
  {
    title: "Inspected & cleaned",
    body: "Every item is checked and cleaned before it is sent out.",
  },
  {
    title: "Pay on delivery",
    body: "Pay online, or when your order reaches you.",
  },
] as const;

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

/** Questions verbatim from the reference; answers condensed from the reference answers. */
export const faqs: readonly Faq[] = [
  {
    id: "how-to-rent",
    question: "How can I rent from SharePal?",
    answer:
      "Browse the products, select your rental dates, add items to your cart and check out. You can pay online or when the order is delivered.",
  },
  {
    id: "partial-extension",
    question:
      "If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?",
    answer:
      "Partial extension isn't possible — every product in an order has to be extended together.",
  },
  {
    id: "rental-start",
    question: "When does the rental start?",
    answer:
      "Rental is counted from the day after delivery and ends the day before pickup. For example, delivery on 5 June and return on 8 June is charged as 2 rental days.",
  },
  {
    id: "condition",
    question:
      "What will be the condition of the products at the time of delivery?",
    answer:
      "Each item is inspected and cleaned before it is sent out, so it reaches you in great condition. If anything isn't right, customer support will help.",
  },
  {
    id: "verification",
    question: "Why is verification required?",
    answer:
      "Profile verification confirms who is renting, helps prevent fraud and keeps the platform safe for everyone.",
  },
  {
    id: "rental-calculation",
    question: "How is the rental calculated?",
    answer:
      "Rentals are priced so the effective per-day cost goes down the longer you rent, keeping both short and long rentals affordable.",
  },
];

export const FAQ_VISIBLE_COUNT = 5;

export interface Review {
  name: string;
  city: string;
  category: string;
  quote: string;
  rating: number;
}

/** Customer reviews shown on the reference page (a subset, quoted as displayed). */
export const reviews: readonly Review[] = [
  {
    name: "Afrana",
    city: "Bangalore",
    category: "Gaming Console",
    rating: 5,
    quote:
      "Have used their services twice now. They never disappoint. Quick responses, polite, transparent, hassle free, great products as well. Rented trekking gear and PS4. Thanks Sharepal! Cheers to you guys!",
  },
  {
    name: "Amal",
    city: "Bangalore",
    category: "Gaming Console",
    rating: 5,
    quote:
      "I am a regular customer and order ps4. It's very affordable and booking an order is super easy and user friendly website and polite staff.",
  },
  {
    name: "Manish",
    city: "Mumbai",
    category: "Gaming console",
    rating: 5,
    quote:
      "I like the way sharepal work and really enjoyed the ps4 will order again. Thanks sharepal",
  },
  {
    name: "Satyaki",
    city: "Kolkata",
    category: "Trekking Gear",
    rating: 5,
    quote:
      "I would recommend SharePal for anybody looking to rent trekking gears, on time delivery, condition of products delivered were very good, super transparent deposit return policy.",
  },
  {
    name: "Amit",
    city: "Delhi",
    category: "Riding Gear",
    rating: 5,
    quote:
      "Awesome experience. Please be the way you are. Received excellent clothes and shoes in washed and clean state. They looked like new ones. Received hasslefree refund.",
  },
  {
    name: "Jayaraman",
    city: "Mumbai",
    category: "Riding Gear",
    rating: 5,
    quote:
      "Great company amazing products at affordable prices and great service I would recommend share pal to everybody.",
  },
];

export const stats = [
  { value: "250Cr+", label: "Saved Together" },
  { value: "4.5M Kg", label: "CO₂e Emissions Saved" },
  { value: "100K+", label: "Products in Circulation" },
] as const;

export interface LinkItem {
  label: string;
  href: string;
  badge?: string;
}

interface LinkGroup {
  title: string;
  links: readonly LinkItem[];
}

const live = (path: string) => `${LIVE_SITE}${path}`;
const cat = (group: string, sub: string) => live(`/bangalore/${group}/${sub}`);

/** Footer category columns, as on the reference page. */
export const footerCategories: readonly LinkGroup[] = [
  {
    title: "Action Cameras",
    links: [
      {
        label: "Action Cameras",
        href: cat("photography-on-rent", "action-cameras-on-rent"),
      },
      {
        label: "Pocket Cameras",
        href: cat("photography-on-rent", "pocket-cameras-on-rent"),
      },
      {
        label: "GoPro Cameras",
        href: cat("photography-on-rent", "gopro-cameras-on-rent"),
      },
      {
        label: "DJI Cameras",
        href: cat("photography-on-rent", "dji-cameras-on-rent"),
      },
      {
        label: "DJI Drones",
        href: cat("photography-on-rent", "dji-drones-on-rent"),
      },
      {
        label: "360 Cameras",
        href: cat("photography-on-rent", "360-cameras-on-rent"),
      },
    ],
  },
  {
    title: "Cameras",
    links: [
      {
        label: "DSLR Cameras",
        href: cat("photography-on-rent", "dslr-cameras-on-rent"),
      },
      {
        label: "Cameras",
        href: cat("photography-on-rent", "all-cameras-on-rent"),
      },
      { label: "iPhones", href: cat("photography-on-rent", "iphones-on-rent") },
      {
        label: "DSLR Gimbal Combos",
        href: cat("photography-on-rent", "dslr-gimbal-on-rent"),
      },
      {
        label: "Wildlife Photography",
        href: cat(
          "photography-on-rent",
          "wildlife-photography-cameras-on-rent",
        ),
      },
      {
        label: "Tripod and camera accessories",
        href: cat(
          "photography-on-rent",
          "tripod-and-camera-accessories-on-rent",
        ),
      },
    ],
  },
  {
    title: "Trekking Gear",
    links: [
      {
        label: "Trekking Gear",
        href: cat("outdoor-gears-on-rent", "trekking-gear-on-rent"),
      },
      {
        label: "Trekking Jackets",
        href: cat("outdoor-gears-on-rent", "trekking-jackets-on-rent"),
      },
      {
        label: "Trek/Snow Pants",
        href: cat("outdoor-gears-on-rent", "trek-snow-pants-on-rent"),
      },
      {
        label: "Trekking Shoes",
        href: cat("outdoor-gears-on-rent", "trekking-shoes-on-rent"),
      },
      {
        label: "Trek Accessories",
        href: cat("outdoor-gears-on-rent", "trek-accessories-on-rent"),
      },
    ],
  },
  {
    title: "Riding Gear",
    links: [
      {
        label: "Riding Gear",
        href: cat("outdoor-gears-on-rent", "riding-gear-on-rent"),
      },
      {
        label: "Riding Luggage",
        href: cat("outdoor-gears-on-rent", "riding-luggage-on-rent"),
      },
      {
        label: "Riding Jackets",
        href: cat("outdoor-gears-on-rent", "riding-jackets-on-rent"),
      },
      {
        label: "Riding Essentials",
        href: cat("outdoor-gears-on-rent", "riding-essentials-on-rent"),
      },
      {
        label: "Riding Boots",
        href: cat("outdoor-gears-on-rent", "riding-boots-on-rent"),
      },
    ],
  },
  {
    title: "Binoculars",
    links: [
      {
        label: "Binoculars",
        href: cat("photography-on-rent", "binoculars-on-rent"),
      },
    ],
  },
  {
    title: "Creator Gear",
    links: [
      {
        label: "Wireless & Collar Mics",
        href: cat("photography-on-rent", "wireless-and-collar-mics-on-rent"),
      },
      {
        label: "Professional Cameras",
        href: cat("photography-on-rent", "professional-cameras-on-rent"),
      },
      {
        label: "Mirrorless Cameras",
        href: cat("photography-on-rent", "mirrorless-cameras-on-rent"),
      },
      {
        label: "UNLMTD Vlogging",
        href: cat("photography-on-rent", "unlmtd-vlogging-on-rent"),
      },
      {
        label: "Mobile Gimbals",
        href: cat("photography-on-rent", "mobile-gimbals-on-rent"),
      },
      {
        label: "Vlogging",
        href: cat("photography-on-rent", "vlogging-cameras-on-rent"),
      },
    ],
  },
  {
    title: "Gaming Console",
    links: [
      {
        label: "PS5 Console",
        href: cat("gaming-gadgets-on-rent", "ps5-console-on-rent"),
      },
      { label: "VR", href: cat("gaming-gadgets-on-rent", "vr-on-rent") },
      {
        label: "Racing Wheel",
        href: cat("gaming-gadgets-on-rent", "gaming-controllers-on-rent"),
      },
      {
        label: "Big Screen Gaming",
        href: cat("gaming-gadgets-on-rent", "big-screen-gaming"),
      },
      {
        label: "Xbox Console",
        href: cat("gaming-gadgets-on-rent", "xbox-console-on-rent"),
      },
    ],
  },
  {
    title: "Winter Wear",
    links: [
      {
        label: "Snow Boots",
        href: cat("outdoor-gears-on-rent", "snow-boots-on-rent"),
      },
      {
        label: "Winter Jackets",
        href: cat("outdoor-gears-on-rent", "winter-jackets-on-rent"),
      },
      {
        label: "Backpacks",
        href: cat("outdoor-gears-on-rent", "backpacks-on-rent"),
      },
    ],
  },
  {
    title: "Camping Gear",
    links: [
      {
        label: "Camping Gear",
        href: cat("outdoor-gears-on-rent", "camping-gear-on-rent"),
      },
      {
        label: "Camping Stools & Tables",
        href: cat("outdoor-gears-on-rent", "camping-stools-and-tables-on-rent"),
      },
      {
        label: "Camping Tents",
        href: cat("outdoor-gears-on-rent", "camping-tents-on-rent"),
      },
      {
        label: "Sleeping Bags & Mats",
        href: cat("outdoor-gears-on-rent", "sleeping-bags-and-mats-on-rent"),
      },
    ],
  },
  {
    title: "Audio Visual Equipment",
    links: [
      {
        label: "Projectors",
        href: cat("entertainment-on-rent", "projectors-on-rent"),
      },
      { label: "VR", href: cat("gaming-gadgets-on-rent", "vr-on-rent") },
      { label: "Mics", href: cat("entertainment-on-rent", "mics-on-rent") },
      {
        label: "Speakers",
        href: cat("entertainment-on-rent", "speakers-on-rent"),
      },
    ],
  },
];

export const footerLinks: readonly LinkGroup[] = [
  {
    title: "Sharepal",
    links: [
      { label: "About", href: live("/about") },
      { label: "Why SharePal", href: live("/why-sharepal") },
      { label: "Sitemap", href: live("/sitemap") },
      { label: "CarePal", href: live("/carepal") },
      { label: "Become a Pal", href: live("/become-a-pal") },
      { label: "Sharepal for Creators", href: live("/creators") },
      { label: "Careers", href: live("/careers") },
      { label: "Sharepal for Brands", href: live("/brands") },
      {
        label: "Asset Funding Program",
        href: live("/asset-funding-program"),
        badge: "New",
      },
      { label: "Rent Your Gear", href: live("/rent-your-gear"), badge: "New" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "How it works?", href: live("/how-it-works") },
      { label: "FAQs", href: live("/faqs") },
      { label: "Verification", href: live("/verification") },
      { label: "Cancellation Policy", href: live("/cancellation-policy") },
      { label: "Life at Sharepal", href: live("/life-at-sharepal") },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Terms & Condition", href: live("/terms-and-conditions") },
      { label: "Shipping policy", href: live("/shipping-policy") },
      { label: "Damage Policy", href: live("/damage-policy") },
      { label: "Terms of Use", href: live("/terms-of-use") },
      { label: "Privacy Policy", href: live("/privacy-policy") },
    ],
  },
];

export const supportLinks = {
  contactUs: live("/support"),
  email: `mailto:${brand.supportEmail}`,
} as const;

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/Sharepal.in" },
  { label: "Instagram", href: "https://www.instagram.com/sharepal.in/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/sharepal/" },
] as const;

/** Other categories for the related-links block (all exist on the live site). */
export const relatedCategories: readonly LinkItem[] = [
  {
    label: "PS5 Console on rent",
    href: cat("gaming-gadgets-on-rent", "ps5-console-on-rent"),
  },
  {
    label: "Xbox on rent",
    href: cat("gaming-gadgets-on-rent", "xbox-console-on-rent"),
  },
  { label: "VR on rent", href: cat("gaming-gadgets-on-rent", "vr-on-rent") },
  {
    label: "Racing Wheel on rent",
    href: cat("gaming-gadgets-on-rent", "gaming-controllers-on-rent"),
  },
  {
    label: "Projectors on rent",
    href: cat("entertainment-on-rent", "projectors-on-rent"),
  },
  {
    label: "Action Cameras on rent",
    href: cat("photography-on-rent", "action-cameras-on-rent"),
  },
];

/**
 * PLACEHOLDER — the reference page renders its SEO block client-side (empty in SSR HTML).
 * This copy is original, written only from facts present in the reference and JSON.
 */
export const seoContent = {
  title: "Rent a PS5 and gaming gadgets in Bangalore",
  paragraphs: [
    "Want to play the latest releases without buying a console? SharePal lets you rent PlayStation 5 consoles and gaming combos in Bangalore for as long as you need — a weekend tournament with friends, a holiday binge, or a trial before you buy.",
    "Choose from console-only rentals, combos with 100+ games, EA Play bundles, football titles like FC 26 and FC 27 with up to four controllers, and single-player favourites such as God of War Ragnarök, Ghost of Tsushima and Spider-Man Miles Morales. Racing fans can pick the Mega Racing Wheel combo.",
    "Every rental comes with zero deposit, free delivery and the option to pay on delivery. Items are inspected and cleaned before dispatch, and the effective per-day price drops the longer you rent.",
    "Pick your dates, add your combo to the cart and we'll deliver it to your door. When your rental ends, we pick it up — no storage, no resale hassle.",
  ],
} as const;

/** Rental-date dialog copy, from the owner's screenshot of the live date picker. */
export const rentalDatesCopy = {
  title: "Select your Dates",
  sameDayWindow: "5PM and 11PM",
  pickupWindow: "9AM to 1PM",
  savingsTitle: "Save more with us!",
  savingsBody:
    "Longer rental periods mean bigger savings—enjoy discounts of up to 12%. We don't charge you for delivery and pickup days!",
  /** How far ahead dates can be booked. PLACEHOLDER — the live limit is unknown. */
  maxDaysAhead: 180,
} as const;
