export type Language = "en" | "ar";

type Localized = Record<Language, string>;

export const copy = {
  en: {
    navWork: "Work",
    navAbout: "About",
    navCertificates: "Certificates",
    navContact: "Contact",
    available: "Available for work",
    role: "COMPUTER SCIENCE & AI STUDENT",
    tagline: "I build modern web interfaces, full-stack applications and accessible experiences from concept through deployment.",
    intro: "Building thoughtful, accessible and high-performing digital experiences.",
    explore: "Explore featured work",
    connect: "Connect on Instagram",
    about: "I’m Mohamed Omar, a Computer Science and Artificial Intelligence student building web projects and exploring practical AI applications.",
    story: "I care about readable code, accessible interfaces and the small details that make a product feel finished.",
    workTitle: "Selected work",
    skillsTitle: "Technologies",
    certificatesTitle: "Certificates",
    journeyTitle: "Learning journey",
    journeySubtitle: "Education, training, projects and certificates.",
    journeyLabel: "The path",
    contactTitle: "LET'S BUILD SOMETHING MEANINGFUL.",
    contactText: "Have an idea? Let's turn it into a real digital product.",
    contactCta: "Start a project",
    viewProject: "View project",
    livePreview: "Live Preview",
    footer: "Mohamed Omar · AI & Full-Stack Developer",
    skillsLabel: "Technologies",
    practicesLabel: "How I work",
    backToTop: "Back to top",
  },
  ar: {
    navWork: "الأعمال",
    navAbout: "نبذة",
    navCertificates: "الشهادات",
    navContact: "تواصل",
    available: "متاح للعمل",
    role: "طالب علوم الحاسب والذكاء الاصطناعي",
    tagline: "أبني واجهات ويب حديثة وتطبيقات متكاملة وتجارب سهلة الاستخدام من الفكرة حتى النشر.",
    intro: "أبني تجارب رقمية مدروسة وسهلة الاستخدام وعالية الأداء.",
    explore: "استعرض أعمالي",
    connect: "تواصل عبر إنستغرام",
    about: "أنا محمد عمر، طالب علوم الحاسب والذكاء الاصطناعي، أعمل على مشاريع ويب وأستكشف تطبيقات الذكاء الاصطناعي العملية.",
    story: "أهتم بالكود المقروء والواجهات التي يسهل على الجميع استخدامها، وبالتفاصيل الصغيرة التي تجعل المنتج يبدو مكتملًا.",
    workTitle: "مشاريعي",
    skillsTitle: "التقنيات",
    certificatesTitle: "الشهادات",
    journeyTitle: "رحلة التعلم",
    journeySubtitle: "الدراسة والتدريب والمشاريع والشهادات.",
    journeyLabel: "المسار",
    contactTitle: "لنبنِ شيئًا ذا معنى.",
    contactText: "هل لديك فكرة؟ لنعمل على تحويلها إلى منتج رقمي حقيقي.",
    contactCta: "ابدأ مشروعًا",
    viewProject: "عرض المشروع",
    livePreview: "معاينة مباشرة",
    footer: "محمد عمر · الذكاء الاصطناعي وتطوير الويب",
    skillsLabel: "التقنيات",
    practicesLabel: "أسلوبي في العمل",
    backToTop: "العودة إلى الأعلى",
  },
} satisfies Record<Language, Record<string, string>>;

export const projects: Array<{
  name: string;
  category: Localized;
  description: Localized;
  image: string;
  live: string;
}> = [
  {
    name: "EXTRA TOP",
    category: {
      en: "Restaurant Website / Food Ordering",
      ar: "موقع مطعم / طلب الطعام",
    },
    description: {
      en: "Restaurant website featuring its menu and food-ordering experience.",
      ar: "موقع مطعم يعرض قائمة الطعام وتجربة الطلب.",
    },
    image: "/assets/projects/extra-top.png",
    live: "https://extra-top.vercel.app/",
  },
  {
    name: "Fruit Shop",
    category: {
      en: "E-commerce / Fruit Store",
      ar: "متجر إلكتروني / فاكهة",
    },
    description: {
      en: "Fruit-store website showcasing its products and online shop.",
      ar: "موقع متجر فاكهة يعرض المنتجات وتجربة التسوق.",
    },
    image: "/assets/projects/fruit-shop.png",
    live: "https://fruit-shop-teal.vercel.app/",
  },
  {
    name: "REVO Coffee",
    category: {
      en: "Coffee Shop / Business Website",
      ar: "مقهى / موقع أعمال",
    },
    description: {
      en: "Coffee shop website introducing the brand and its menu.",
      ar: "موقع مقهى للتعريف بالعلامة التجارية وقائمة المشروبات.",
    },
    image: "/assets/projects/revo-coffee.png",
    live: "https://revo-cafee-n1.vercel.app/",
  },
];

export const certificates = [
  {
    title: "AI for App Building",
    issuer: "Google · Coursera",
    image: "/assets/certificates/google-ai-for-app-building.png",
  },
  {
    title: "Generative AI Tools CSW",
    issuer: "Microsoft · Egypt Digital",
    image: "/assets/certificates/microsoft-generative-ai-tools.png",
  },
  {
    title: "System Analysis Using AI CSW",
    issuer: "Microsoft · Egypt Digital",
    image: "/assets/certificates/microsoft-system-analysis-ai.png",
  },
  {
    title: "Front End — El-khaima El-ramadania",
    issuer: "Training certificate",
    image: "/assets/certificates/front-end-training.png",
  },
];

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Bootstrap",
];

export const practices: Record<Language, string[]> = {
  en: [
    "Clean code",
    "User experience",
    "Responsive interfaces",
    "Accessibility",
    "Performance",
    "Continuous learning",
    "Problem-solving",
  ],
  ar: [
    "كود نظيف",
    "تجربة المستخدم",
    "واجهات متجاوبة",
    "سهولة الوصول",
    "الأداء",
    "تعلّم مستمر",
    "حل المشكلات",
  ],
};

export const values: Record<Language, Array<[string, string]>> = {
  en: [
    ["Clean code", "Readable, maintainable and well structured."],
    ["User experience", "Interfaces that feel obvious to use."],
    ["Responsive interfaces", "Designed for every screen size."],
    ["Continuous learning", "New tools and steady practice."],
    ["Problem-solving", "Breaking big problems into small steps."],
  ],
  ar: [
    ["كود نظيف", "مقروء وقابل للصيانة ومنظم."],
    ["تجربة المستخدم", "واجهات بديهية الاستخدام."],
    ["واجهات متجاوبة", "مصممة لجميع أحجام الشاشات."],
    ["تعلّم مستمر", "أدوات جديدة وممارسة منتظمة."],
    ["حل المشكلات", "تقسيم المشكلات الكبيرة إلى خطوات صغيرة."],
  ],
};

export const timeline: Array<{
  label: Localized;
  title: Localized;
  description: Localized;
}> = [
  {
    label: { en: "Education", ar: "التعليم" },
    title: {
      en: "Computer Science & Artificial Intelligence",
      ar: "علوم الحاسب والذكاء الاصطناعي",
    },
    description: {
      en: "Third-year student at El Saleheya El Gadida University, Faculty of Computers and Information.",
      ar: "طالب في الفرقة الثالثة بجامعة الصالحية الجديدة، كلية الحاسبات والمعلومات.",
    },
  },
  {
    label: { en: "Training", ar: "التدريب" },
    title: {
      en: "AI Agents Development Using Python",
      ar: "تطوير وكلاء الذكاء الاصطناعي باستخدام Python",
    },
    description: {
      en: "120-hour training program at the Information Technology Institute (ITI).",
      ar: "برنامج تدريبي لمدة 120 ساعة بمعهد تكنولوجيا المعلومات (ITI).",
    },
  },
  {
    label: { en: "Projects", ar: "المشاريع" },
    title: {
      en: "Restaurant, fruit shop & coffee shop websites",
      ar: "مواقع مطعم ومتجر فاكهة ومقهى",
    },
    description: {
      en: "Explore the EXTRA TOP, Fruit Shop, and REVO Coffee websites in the projects section.",
      ar: "تصفح مواقع EXTRA TOP وFruit Shop وREVO Coffee في قسم المشاريع.",
    },
  },
  {
    label: { en: "Certificates", ar: "الشهادات" },
    title: {
      en: "AI and front-end training certificates",
      ar: "شهادات تدريب الذكاء الاصطناعي والواجهات",
    },
    description: {
      en: "Google Career Certificates via Coursera, Microsoft / Egypt Digital, and front-end course certificates.",
      ar: "شهادات Google Career Certificates عبر Coursera وMicrosoft / Egypt Digital، وشهادة دورة Front End.",
    },
  },
];

export const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/share/1Q6yzr3gom/" },
  { name: "Instagram", url: "https://www.instagram.com/mohamed.omar.72/" },
  { name: "GitHub", url: "https://github.com/mo420563-cmyk" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mohamed-omar-ai/" },
  { name: "Telegram", url: "https://t.me/mohamedomar1933" },
];
