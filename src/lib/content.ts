export const org = {
  name: "Nigeria Water Project",
  legal:
    "Nigeria Water Project is under Mud Global Solutions, a 501(c)(3) nonprofit organization.",
  ein: "33-3795843",
  emails: {
    general: "nigeriawaterproject@outlook.com",
    stanford: "mudiar@alumni.stanford.edu",
    partner: "ogbereuben@gmail.com",
  },
  locations: ["Stanford, CA", "Tampa, FL"],
  donorbox: "https://donorbox.org/nigeria-water-project?default_interval=m",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61574057251365",
    linkedin: "https://www.linkedin.com/company/nigeria-water-project",
  },
} as const;

export type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

export const nav: NavLink[] = [
  { label: "Impact", href: "/impact" },
  {
    label: "Communities",
    href: "/#communities",
    children: [
      { label: "Uvbe Village", href: "/uvbevillage" },
      { label: "Urhokuosa Village", href: "/urhokuosa" },
      { label: "Ebue-Neki Village", href: "/ebueneki-village" },
      { label: "Iguovbiobo Village", href: "/iguovbiobo" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Stories", href: "/photos" },
  { label: "Contact", href: "/contact" },
];

export const impactStats = [
  { value: 4, suffix: "", label: "Boreholes Completed", detail: "Across Edo State communities" },
  { value: 10000, suffix: "+", label: "Residents Served Across All Villages", detail: "Over 10,000 people with cleaner water access" },
  { value: 100, suffix: "%", label: "Of Donations to Water Work", detail: "Infrastructure, maintenance, sustainability" },
  { value: 45000, suffix: "L", label: "Water Storage per Borehole", detail: "Three 15,000L GeePee tanks at each site" },
] as const;

export const crisisPoints = [
  {
    title: "Long, Unsafe Walks",
    body: "Families often travel long distances to reach unreliable or contaminated water sources, time that could be spent in school, work, or care.",
  },
  {
    title: "Health at Risk",
    body: "Contaminated water drives waterborne disease, especially for children, and places an invisible tax on every household.",
  },
  {
    title: "Opportunity Deferred",
    body: "When collecting water fills the day, education and livelihood suffer. Clean water restores hours and hope to a community.",
  },
] as const;

export const whyNigeria = {
  title: "Why Nigeria",
  body: "Across rural communities in Edo State, access to clean and safe water remains one of the most pressing barriers to health and opportunity. Nigeria Water Project partners with local residents to build lasting borehole infrastructure where need is urgent and community ownership is strong.",
} as const;

export const mission = {
  title: "Our Mission",
  body: "We bring clean, sustainable water access to communities in Nigeria through borehole construction, community partnerships, education, and transparent impact, so families stay healthy, children stay in school, and villages can thrive.",
} as const;

export const communities = [
  {
    slug: "uvbevillage",
    name: "Uvbe Village",
    date: "January 2025",
    status: "Complete",
    summary:
      "Our first borehole, located in the Uvbe Primary School compound, brings clean water to students and the surrounding community.",
    image: "/assets/images/FRK_2940.JPG",
  },
  {
    slug: "urhokuosa",
    name: "Urhokuosa Village",
    date: "March 2025",
    status: "Complete",
    summary:
      "A residential water point serving the community with easier access to clean water, celebrated in video and images from early December.",
    image: "/assets/images/PHOTO-2024-12-20-13-13-58.jpg",
  },
  {
    slug: "ebueneki-village",
    name: "Ebue-Neki Village",
    date: "June 2025",
    status: "Complete",
    summary:
      "Home to approximately 4,000 people. Clean, reliable water now supports health, education, and opportunity for generations to come.",
    image: "/assets/images/1c99c754-3e3e-4f3c-98a4-76a28541e77f.jpg",
  },
  {
    slug: "iguovbiobo",
    name: "Iguovbiobo Village",
    date: "2025",
    status: "Complete",
    summary:
      "Borehole #4 is fully completed: a generator-powered pump system connected to three 15,000-liter GeePee tanks (45,000 liters total), chosen by residents for a central village location.",
    image: "/assets/images/IMG-20251112-WA0012.jpg",
  },
] as const;

export const processSteps = [
  {
    title: "Deep Borehole Drilling",
    body: "Deep drilling into the earth, sometimes over 100 feet, to reach clean underground water sources.",
  },
  {
    title: "Gravel Packing",
    body: "A layer of clean gravel surrounds the borehole casing at the water zone, acting as a natural filter to block sand and silt.",
  },
  {
    title: "Sanitary Sealing",
    body: "Bentonite clay or cement seals the top of the borehole to prevent surface contamination from entering the water source.",
  },
  {
    title: "Submersible Pump & Generator",
    body: "A powerful electric pump (powered by a generator) draws water from the borehole and pushes it up through galvanized steel piping.",
  },
  {
    title: "Elevated Storage (GeePee Tanks)",
    body: "Each borehole stores 45,000 liters across three 15,000-liter GeePee tanks mounted on a steel tower, providing pressure for reliable flow.",
  },
  {
    title: "Sediment Filtration",
    body: "Before reaching the taps, water passes through sediment filters to remove particles like dirt, sand, and rust, making it cleaner and clearer.",
  },
  {
    title: "Community Tap Access",
    body: "Clean water flows through multiple taps installed on a concrete platform serving all.",
  },
] as const;

export const timeline = [
  { year: "2025 · Jan", title: "Uvbe Borehole Complete", body: "First site live at Uvbe Primary School." },
  { year: "2025 · Mar", title: "Urhokuosa Water Point", body: "Residential access celebrated with the community." },
  { year: "2025 · Jun", title: "Ebue-Neki Delivering Water", body: "Serving ~4,000 residents in Edo State." },
  { year: "2025", title: "Iguovbiobo Borehole #4", body: "Fully completed: generator-powered system with three 15,000L tanks (45,000L total)." },
] as const;

export const testimonials = [
  {
    quote: "Leviticus 23:22",
    name: "Generous Donor",
  },
  {
    quote: "Good job. I’m very proud of you. Please keep it up.",
    name: "Osasogie Akporotu",
  },
  {
    quote: "Inspired by your work. Let’s make a big impact in 2025!",
    name: "Raymond",
  },
] as const;

export const myWhy = [
  "As I’ve gotten older and continually had conversations with my family back in Nigeria, I’ve seen a range of hardships and poor living conditions these families and children live in. Access to clean and safe water is one of the most pressing issues. In many areas, people have to walk long distances to fetch water from unreliable and often contaminated sources. Growing up, my parents told me various stories about the treks and journeys they’d have to take to make sure their family had the food and water necessary. This not only poses significant health risks but also consumes a substantial amount of time and energy that could be better spent on education or other productive activities. Most of these children's lives in the village consist of labor work and it’s drastically different from the life my parents were fortunate enough to bring me. Whether it be a walk to the farm to collect crops and food or a long walk to the river to collect potentially dangerous water it’s what they do every day.",
  "By building these boreholes, I’m attempting to do the bare minimum to better their living standards. I aim to alleviate some of these challenges. The boreholes in Uvbe, located in the school compound, will ensure that students have access to clean water throughout the day, reducing waterborne diseases and improving overall health. It will also benefit the surrounding community, making water more accessible and reducing the time and effort required to obtain it. This project is a step towards improving the quality of life in these villages and providing a more stable and healthier environment for the residents, particularly the children who are the future of these communities.",
] as const;

export const whyGive = [
  "Your donation helps fund borehole projects that deliver safe, drinkable water to underserved communities in Nigeria.",
  "100% of donations go toward water infrastructure, maintenance, and sustainability efforts, ensuring every dollar creates real change.",
  "We don’t just build boreholes. We implement long-term water solutions, empowering local communities to maintain and manage their resources.",
  "We provide regular updates, project reports, and impact stories, so you see exactly how your support is making a difference.",
  "As a 501(c)(3) nonprofit, all donations are tax-deductible, making your generosity even more rewarding.",
  "Every donation, big or small, is a step closer in transforming lives through clean water!",
] as const;

export const faqs = [
  {
    q: "How can I write off my donation on my taxes?",
    a: "Nigeria Water Project is under Mud Global Solutions, a 501(c)(3) nonprofit organization, which means your donation is tax-deductible. After donating, you will receive a donation receipt with our EIN (Employer Identification Number: 33-3795843), which you can use when filing your taxes. If you donate more than $250, we will provide a written acknowledgment as required by the IRS. Please consult a tax professional to ensure proper deduction based on your specific situation.",
  },
  {
    q: "How will my donation be used?",
    a: "100% of your donation goes directly toward building boreholes, maintaining water infrastructure, and supporting sustainable clean water initiatives in underserved Nigerian communities. We prioritize transparency, and regular project updates are shared so you can see the direct impact of your contribution.",
  },
  {
    q: "Can I make recurring donations?",
    a: "Yes! Recurring donations are one of the best ways to ensure ongoing clean water access for communities. You can set up a monthly or weekly donation on this website to make a lasting impact.",
  },
  {
    q: "How do you decide where to build boreholes?",
    a: "We work with local communities, experts, and leaders to identify villages in urgent need of clean water. Each borehole site is chosen based on population needs, water accessibility, and long-term sustainability.",
  },
  {
    q: "How can my company partner with you?",
    a: "We welcome corporate partnerships, matching gifts, and sponsorship of full borehole projects. Reach out at nigeriawaterproject@outlook.com or ogbereuben@gmail.com to start a conversation.",
  },
  {
    q: "How can I volunteer or get involved beyond donating?",
    a: "Share our work, host a fundraiser, connect us with communities or partners, or write to mudiar@alumni.stanford.edu with ideas. Every skill and network can help bring clean water farther.",
  },
] as const;

export const sdgs = [
  { code: "6", title: "Clean Water & Sanitation", body: "Directly expanding access to safe drinking water." },
  { code: "3", title: "Good Health & Well-Being", body: "Reducing exposure to waterborne disease." },
  { code: "4", title: "Quality Education", body: "Freeing time for school, especially for children." },
  { code: "17", title: "Partnerships for the Goals", body: "Community-led sites with local ownership." },
] as const;

export const team = [
  {
    name: "Founding Story",
    role: "From Family Conversations to Community Wells",
    body: "Nigeria Water Project grew from conversations with family in Nigeria about the daily cost of unsafe water, and a commitment to do something tangible about it.",
  },
  {
    name: "Community Partners",
    role: "Residents Lead Site Selection",
    body: "Local residents help choose central, accessible locations, like the Iguovbiobo site, so water points reflect unity as well as need.",
  },
  {
    name: "Operations",
    role: "Stanford, CA · Tampa, FL",
    body: "A lean team coordinating engineering partners, village leaders, and donors with a focus on transparency and follow-through.",
  },
] as const;

export const waysToHelp = [
  {
    title: "Donate",
    body: "Fund drilling, tanks, pumps, filtration, and long-term reliability.",
    href: "/donate",
    cta: "Give Now",
  },
  {
    title: "Partner",
    body: "Sponsor a borehole, match gifts, or collaborate as a corporate ally.",
    href: "/contact",
    cta: "Start a Partnership",
  },
  {
    title: "Share Stories",
    body: "Amplify community voices through our photo and video galleries.",
    href: "/photos",
    cta: "Explore Stories",
  },
] as const;

export const videos = {
  urhokuosa: {
    src: "https://video.squarespace-cdn.com/content/v1/6713770948a462333697c688/c2d9ae18-6720-497f-b9c3-35c4da61d0f1/playlist.m3u8",
    poster: "/assets/images/c2d9ae18-6720-497f-b9c3-35c4da61d0f1-thumb.jpg",
  },
  ebue: {
    src: "https://video.squarespace-cdn.com/content/v1/6713770948a462333697c688/d927d8a6-31ee-4d55-8734-de9dd5a4306a/playlist.m3u8",
    poster: "/assets/images/d927d8a6-31ee-4d55-8734-de9dd5a4306a-thumb.jpg",
  },
  ebueShort: {
    src: "https://video.squarespace-cdn.com/content/v1/6713770948a462333697c688/249346e0-17a9-40df-92c7-86e8f0dece78/playlist.m3u8",
    poster: "/assets/images/249346e0-17a9-40df-92c7-86e8f0dece78-thumb.jpg",
  },
  uvbe: {
    src: "https://video.squarespace-cdn.com/content/v1/6713770948a462333697c688/32496a36-b2a0-4f64-96d0-92d49d98644d/playlist.m3u8",
    poster: "/assets/images/32496a36-b2a0-4f64-96d0-92d49d98644d-thumb.jpg",
  },
} as const;

export const albums: Record<
  string,
  { title: string; cover: string; images: string[]; blurb: string }
> = {
  kidscommunity: {
    title: "Children of the Community",
    cover: "10.jpg",
    blurb: "Faces of the next generation who deserve clean water every day.",
    images: [
      "10.jpg",
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "8.jpg",
      "ff415645-0a6a-4ebe-9438-68b4664a3478.jpeg",
      "71d25622-cfe1-4b06-a478-08a9e374b8e2.jpeg",
    ],
  },
  "project-one-f5w4d-2ks86": {
    title: "Uvbe Primary School",
    cover: "FRK_2822.JPG",
    blurb: "Where students learn, and where clean water now flows.",
    images: [
      "FRK_2822.JPG",
      "FRK_2823.JPG",
      "FRK_2857.JPG",
      "FRK_2862.JPG",
      "FRK_2869.JPG",
      "FRK_2880.JPG",
      "FRK_2931.JPG",
      "FRK_2940.JPG",
      "FRK_2941.JPG",
      "FRK_2944.JPG",
      "FRK_2947.JPG",
      "FRK_2960.JPG",
      "FRK_2963.JPG",
      "FRK_2972.JPG",
    ],
  },
  "uvbe-borehole-site": {
    title: "Uvbe Borehole Site",
    cover: "5002e44a-aefb-458b-9245-45345ae1b513.jpg",
    blurb: "Construction and completion of our first water point.",
    images: [
      "5002e44a-aefb-458b-9245-45345ae1b513.jpg",
      "5002e44a-aefb-458b-9245-45345ae1b513-1-.jpg",
      "PHOTO-2024-12-17-09-53-05.jpg",
      "a3e4332f-a07a-424a-9d02-2eafd05766a2.jpg",
      "PHOTO-2024-12-17-09-51-31.jpg",
    ],
  },
  "urhokuosa-water-site": {
    title: "Urhokuosa Water Site",
    cover: "PHOTO-2024-12-20-13-13-58.jpg",
    blurb: "Joy, access, and development in early December.",
    images: [
      "PHOTO-2024-12-20-13-13-58.jpg",
      "PHOTO-2024-12-20-13-23-29.jpg",
      "PHOTO-2024-12-20-13-23-41.jpg",
      "PHOTO-2024-12-20-14-41-00.jpg",
      "PHOTO-2024-12-20-14-41-00-1-.jpg",
      "PHOTO-2024-12-21-00-13-23.jpg",
      "PHOTO-2024-12-21-00-13-23-1-.jpg",
      "PHOTO-2024-12-21-00-13-24.jpg",
      "7ca66f71-3ea1-4a22-ad79-24e1045c9a74.jpg",
      "883f4bc5-b4d4-4ecc-9e45-24e174d8219d.jpg",
    ],
  },
  "ebueneki-water-site": {
    title: "Ebue-Neki Water Site",
    cover: "1c99c754-3e3e-4f3c-98a4-76a28541e77f.jpg",
    blurb: "From groundbreaking to clean water for thousands.",
    images: [
      "1c99c754-3e3e-4f3c-98a4-76a28541e77f.jpg",
      "b87873f0-8745-4a67-b6f8-ead2777c87a1.jpg",
      "b87873f0-8745-4a67-b6f8-ead2777c87a1-2-.jpg",
      "0254c0e4-78e6-46e0-bf37-d5e832a7713e.jpg",
      "93710f96-061e-4193-a32e-dd7fe3c5b6a1.jpg",
      "fa21bdbe-3905-4a7d-88f3-be86585e83f7.jpg",
      "d26e4986-2b9d-4e9a-b150-fd856259d364.jpg",
      "IMG_8237.JPG",
      "PHOTO-2025-04-16-06-47-57-2-.jpg",
      "2ce68b37-5eab-4e85-bc5d-fe535daa45da.jpg",
    ],
  },
};

/** Village pins in Edo State (Uhunmwonde LGA), WGS84 */
export const mapPins = [
  {
    id: "uvbe",
    name: "Uvbe",
    lat: 6.28939,
    lng: 5.95282,
    href: "/uvbevillage",
  },
  {
    id: "urhokuosa",
    name: "Urhokuosa",
    lat: 6.38535,
    lng: 5.85172,
    href: "/urhokuosa",
  },
  {
    id: "ebue",
    name: "Ebue-Neki",
    lat: 6.330614,
    lng: 5.866264,
    href: "/ebueneki-village",
  },
  {
    id: "iguovbiobo",
    name: "Iguovbiobo",
    lat: 6.51259,
    lng: 5.86034,
    href: "/iguovbiobo",
  },
] as const;
