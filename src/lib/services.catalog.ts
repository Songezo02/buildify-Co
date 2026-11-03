import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Code2,
  Wrench,
  ShoppingCart,
  CalendarCheck,
  Search,
  Bot,
  RefreshCw,
  Cloud,
  BarChart3,
  Smartphone,
  Database,
  Accessibility,
} from "lucide-react";


/**
 * Central, maintainable service catalogue for Buildify Co.
 *
 * This file is the single source of truth for every service shown on the
 * Services page: names, descriptions, features, pricing labels, categories
 * and maintenance plans. When a database-backed admin dashboard is added
 * later, this structure maps 1:1 to a `services` table.
 */

export type ServiceCategory = "websites" | "software" | "ecommerce" | "automation" | "maintenance";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  icon: LucideIcon;
  short: string;
  body: string;
  benefits: string[];
  features: string[];
  suitable: string[];
  /** Display-only price line. Custom projects use "Request a quote". */
  priceLabel: string;
  /** Honest caveats shown in the detail view. */
  notes?: string[];
}

export const CATEGORIES: { id: "all" | ServiceCategory; label: string }[] = [
  { id: "all", label: "All Services" },
  { id: "websites", label: "Websites" },
  { id: "software", label: "Software and Applications" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "automation", label: "Business Automation" },
  { id: "maintenance", label: "Maintenance and Support" },
];

export const SERVICES: Service[] = [
  {
    id: "website-development",
    name: "Website Design and Development",
    category: "websites",
    icon: Globe,
    short:
      "Responsive, modern websites tailored to each business — from landing pages to corporate sites.",
    body: "We design and build responsive, modern websites tailored to each business. Whether you need a simple landing page or a full corporate presence, every build is fast, accessible and SEO-ready.",
    benefits: [
      "Custom design, no templates",
      "Fast and mobile-responsive",
      "SEO-friendly structure",
      "Built-in lead capture",
    ],
    features: [
      "Business websites",
      "Landing pages",
      "Portfolio websites",
      "Corporate websites",
      "Personal and professional websites",
      "Mobile-responsive designs",
      "Contact forms",
      "WhatsApp integration",
      "SEO-friendly structure",
    ],
    suitable: [
      "Any business needing an online presence",
      "Startups",
      "Professionals and personal brands",
    ],
    priceLabel: "From R1 800 (once-off, per industry package)",
  },
  {
    id: "ecommerce-stores",
    name: "E-commerce and Online Stores",
    category: "ecommerce",
    icon: ShoppingCart,
    short: "Sell products and services online with catalogues, carts and order management.",
    body: "We help businesses sell products and services online with a store built around their catalogue, their workflows and their customers.",
    benefits: ["Sell 24/7 online", "Full order management", "Customer accounts", "Sales reporting"],
    features: [
      "Product catalogues",
      "Product search and filtering",
      "Shopping carts",
      "Secure checkout integrations",
      "Payment gateway integration",
      "Order management",
      "Stock and inventory integration where required",
      "Customer accounts",
      "Order notifications",
      "Sales reporting",
    ],
    suitable: [
      "Retailers",
      "Crafters and makers",
      "Wholesalers",
      "Service businesses selling packages",
    ],
    priceLabel: "Request a quote",
    notes: [
      "Payment options are only displayed as available on your store once the payment integration has been implemented and tested.",
      "Payment gateway providers charge their own transaction fees.",
    ],
  },
  {
    id: "application-development",
    name: "Custom Web Applications and Business Systems",
    category: "software",
    icon: Code2,
    short:
      "Customised software for business operations — portals, dashboards, CRM, invoicing and more.",
    body: "We build customised software solutions that match how your business actually works — from client portals to full management systems, all backed by a secure database.",
    benefits: [
      "Built around your workflows",
      "Secure role-based access",
      "Scales with your business",
      "Custom integrations",
    ],
    features: [
      "Client portals",
      "Admin dashboards",
      "Inventory management systems",
      "Customer relationship management systems (CRM)",
      "Employee and business management systems",
      "Invoicing and quotation systems",
      "Reporting dashboards",
      "Database-driven applications",
      "Custom API integrations",
    ],
    suitable: ["Growing businesses", "Operations-heavy teams", "Anyone outgrowing spreadsheets"],
    priceLabel: "Request a quote",
  },
  {
    id: "booking-systems",
    name: "Booking and Reservation Systems",
    category: "automation",
    icon: CalendarCheck,
    short: "Accept and manage online bookings with calendars, confirmations and notifications.",
    body: "We help businesses accept and manage bookings online — appointments, reservations and availability handled automatically so you spend less time on the phone.",
    benefits: [
      "Bookings while you sleep",
      "Fewer no-shows with confirmations",
      "One calendar for everything",
      "Optional deposits",
    ],
    features: [
      "Appointment scheduling",
      "Availability calendars",
      "Booking forms",
      "Customer notifications",
      "Booking confirmation workflows",
      "Reservation management",
      "Cancellation and rescheduling",
      "Optional deposit or payment integration",
    ],
    suitable: ["Salons", "Healthcare practices", "Guesthouses and BnBs", "Consultants", "Tutors"],
    priceLabel: "Request a quote",
  },
  {
    id: "maintenance-support",
    name: "Website Maintenance and Care Plans",
    category: "maintenance",
    icon: Wrench,
    short:
      "Ongoing updates, security checks, backups and support after launch — on a steady cadence.",
    body: "We don't disappear after launch. Our care plans keep your website updated, monitored and supported month after month, with three levels to choose from.",
    benefits: [
      "Site stays healthy",
      "Security patches applied",
      "Backups configured",
      "A real person to talk to",
    ],
    features: [
      "Website updates",
      "Bug fixes",
      "Security checks",
      "Backup configuration",
      "Performance monitoring",
      "Broken-link checks",
      "Content updates",
      "Technical support",
      "Hosting and domain assistance",
    ],
    suitable: ["Any business with a live website", "Teams without technical staff"],
    priceLabel: "Monthly plans — see care plans below",
  },
  {
    id: "seo",
    name: "Search Engine Optimisation (SEO)",
    category: "websites",
    icon: Search,
    short: "Technical SEO foundations, local SEO and search performance reporting.",
    body: "We improve how easily search engines can find, understand and rank your website — with solid technical foundations and reporting you can actually read.",
    benefits: [
      "Easier to find on Google",
      "Better page structure",
      "Local visibility",
      "Clear reporting",
    ],
    features: [
      "Technical SEO foundations",
      "Page titles and meta descriptions",
      "Search-friendly URLs",
      "Sitemap and robots.txt configuration",
      "Structured data where appropriate",
      "Image optimisation",
      "Local SEO",
      "Google Business Profile setup assistance",
      "Search performance reporting",
    ],
    suitable: ["Local businesses", "Service providers", "Anyone competing in search"],
    priceLabel: "Request a quote",
    notes: [
      "Search rankings and traffic growth are not guaranteed — we follow best practice and measure what changes.",
    ],
  },
  {
    id: "ai-automation",
    name: "AI Chatbots and Business Automation",
    category: "automation",
    icon: Bot,
    short: "Website chatbots, FAQ assistants, lead capture and automated enquiry workflows.",
    body: "We automate customer interactions and repetitive tasks — chat assistants that answer common questions, capture leads and route enquiries to the right place.",
    benefits: [
      "Instant answers for visitors",
      "Leads captured automatically",
      "Enquiries routed correctly",
      "Fewer repetitive tasks",
    ],
    features: [
      "Website AI chatbots",
      "Frequently asked questions assistants",
      "Lead capture",
      "Customer enquiry routing",
      "Automated email notifications",
      "Booking notification workflows",
      "Contact form automation",
      "AI-powered knowledge assistants",
      "API integrations",
    ],
    suitable: [
      "Businesses with frequent common questions",
      "Lead-driven websites",
      "Teams drowning in email",
    ],
    priceLabel: "Request a quote",
    notes: [
      "Some services require third-party subscriptions or API keys — we identify these up front, including their costs.",
      "A chatbot is only shown as functional on your site once it is properly connected and tested.",
    ],
  },
  {
    id: "redesign-performance",
    name: "Website Redesign and Performance Optimisation",
    category: "websites",
    icon: RefreshCw,
    short: "Modernise existing websites, improve speed, usability and mobile responsiveness.",
    body: "We modernise existing websites and improve how they feel and perform — layout, speed, accessibility and navigation.",
    benefits: [
      "Fresh modern look",
      "Faster load times",
      "Better mobile experience",
      "Easier navigation",
    ],
    features: [
      "Website redesigns",
      "Mobile responsiveness improvements",
      "Page speed optimisation",
      "Image compression",
      "Accessibility improvements",
      "Layout and navigation improvements",
      "Code optimisation",
      "Technical issue diagnosis",
    ],
    suitable: ["Sites that look dated", "Slow-loading websites", "Poor mobile experiences"],
    priceLabel: "Request a quote",
    notes: [
      "We improve real-world speed, but we don't guarantee a particular performance score or loading time.",
    ],
  },
  {
    id: "hosting-domains",
    name: "Hosting and Domain Assistance",
    category: "maintenance",
    icon: Cloud,
    short: "Domain registration, DNS, deployment, SSL and renewal reminders — handled for you.",
    body: "We help clients publish and maintain their websites online — domains, DNS, hosting and SSL taken care of, with reminders before anything expires.",
    benefits: [
      "We handle the technical setup",
      "Renewal reminders",
      "SSL configured",
      "Deployment support",
    ],
    features: [
      "Domain registration assistance",
      "DNS configuration",
      "Website deployment",
      "Hosting setup",
      "Domain and hosting renewal reminders",
      "SSL configuration",
      "Deployment troubleshooting",
      "Email domain configuration assistance",
    ],
    suitable: [
      "New websites going live",
      "Businesses migrating hosts",
      "Expired or misconfigured domains",
    ],
    priceLabel: "Request a quote",
    notes: [
      "Hosting and domain registrar fees are third-party costs, billed separately from our services — we clearly separate the two.",
    ],
  },
  {
    id: "analytics-reporting",
    name: "Website Analytics and Reporting",
    category: "automation",
    icon: BarChart3,
    short:
      "Know how your website performs — visitors, traffic sources, popular pages and conversions.",
    body: "We help clients understand how their websites perform with clean analytics setups and plain-language reporting.",
    benefits: [
      "Know your visitors",
      "See what's working",
      "Track conversions",
      "Monthly summaries",
    ],
    features: [
      "Google Analytics integration",
      "Google Search Console setup",
      "Visitor and page-view reporting",
      "Traffic source analysis",
      "Popular page reporting",
      "Conversion event tracking",
      "Monthly performance summaries",
      "Custom analytics dashboards where required",
    ],
    suitable: ["Marketing-focused businesses", "Online stores", "Anyone running campaigns"],
    priceLabel: "Request a quote",
    notes: [
      "We take a privacy-conscious approach to analytics and add appropriate consent mechanisms where legally required.",
    ],
  },
  {
    id: "mobile-apps",
    name: "Mobile Applications",
    category: "software",
    icon: Smartphone,
    short: "Android and cross-platform mobile apps with authentication, APIs and databases.",
    body: "We develop custom mobile applications where they genuinely suit the business — from Android apps to cross-platform products.",
    benefits: [
      "Your brand on customers' phones",
      "Native-feeling experience",
      "Push notifications",
      "Backed by real data",
    ],
    features: [
      "Android applications",
      "Cross-platform mobile applications",
      "API integration",
      "User authentication",
      "Push notifications",
      "Database integration",
      "Application maintenance",
    ],
    suitable: ["Businesses with repeat customers", "Field teams", "Products beyond the browser"],
    priceLabel: "Request a quote",
    notes: [
      "App-store publishing, payment services and third-party subscriptions are treated as separate requirements where applicable.",
    ],
  },
  {
    id: "database-integration",
    name: "Database Design and Integration",
    category: "software",
    icon: Database,
    short: "Database design, modelling, APIs and integration with your existing business systems.",
    body: "We design and build the data layer behind serious business tools — secure, validated and integrated with the systems you already use.",
    benefits: [
      "One source of truth",
      "Secure access control",
      "Connects your systems",
      "Room to grow",
    ],
    features: [
      "Database design",
      "MySQL integration",
      "Data modelling",
      "Backend API development",
      "Data validation",
      "Database access control",
      "Backup planning",
      "Database performance improvements",
      "Integration with existing business systems",
    ],
    suitable: [
      "Businesses consolidating data",
      "Teams replacing manual records",
      "Existing apps needing a backend",
    ],
    priceLabel: "Request a quote",
    notes: [
      "Database credentials and unrestricted access are never exposed in frontend code — all access is server-side and controlled.",
    ],
  },
  {
    id: "accessibility-ux",
    name: "Website Accessibility and User Experience",
    category: "websites",
    icon: Accessibility,
    short: "Make your website easier to navigate and use for every visitor.",
    body: "We make websites easier to navigate and use — clearer typography, better contrast, keyboard-friendly forms and layouts that work for everyone.",
    benefits: [
      "Usable by more people",
      "Clearer navigation",
      "Readable content",
      "Inclusive forms",
    ],
    features: [
      "Keyboard navigation improvements",
      "Accessible form labels",
      "Readable typography",
      "Appropriate colour contrast",
      "Image alternative text",
      "Responsive layouts",
      "Clear navigation and calls to action",
      "Accessibility checks against relevant WCAG guidance",
    ],
    suitable: [
      "Public-facing businesses",
      "Government-adjacent services",
      "Sites with older audiences",
    ],
    priceLabel: "Request a quote",
    notes: [
      "We work to WCAG guidance, but we don't claim formal accessibility certification without an appropriate assessment.",
    ],
  },
];

export interface MaintenancePlan {
  id: string;
  name: string;
  tagline: string;
  /** Monthly price in ZAR. null = priced per client (shows "Request a quote"). */
  monthlyPrice: number | null;
  popular?: boolean;
  features: string[];
}

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For simple sites that just need to stay healthy.",
    monthlyPrice: null,
    features: [
      "Website updates (small content changes)",
      "Security updates and checks",
      "Backup configuration",
      "Monthly performance check",
      "Email support (1 business day response)",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For active businesses whose website does real work.",
    monthlyPrice: null,
    popular: true,
    features: [
      "Everything in Starter",
      "Bug fixes prioritised",
      "Broken-link checks",
      "One small feature request per month",
      "Quarterly review call",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For teams that rely on their website every day.",
    monthlyPrice: null,
    features: [
      "Everything in Business",
      "Ongoing feature development time",
      "Monthly analytics summary",
      "Priority response (same business day)",
      "Quarterly SEO and performance check",
    ],
  },
];
