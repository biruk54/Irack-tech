/* ------------------------------------------------------------------ */
/* iRack IT Solutions — central content source                         */
/* All data sourced from the official Company Profile (V0.7, 2026)     */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "iRack IT Solutions",
  shortName: "iRack",
  tagline: "Smart Solutions, Stronger Future",
  established: 2014,
  address: "Piyassa, Wastna Building 5th Floor, Office No. 501, Addis Ababa, Ethiopia",
  email: "info@iracktech.com",
  phone: "+251 111 704 557",
  phoneAlt: "+251 92 015 5779",
  phoneRaw: "+251111704557",
  hours: "Mon – Sat: 8:30 AM – 6:00 PM",
  copyright: "iRack IT Solutions — All rights reserved.",
};

/* Company performance highlights (from profile) */
export const STATS = [
  { value: 12, suffix: "", label: "Years in the Market", description: "Delivering turnkey IT solutions since 2014" },
  { value: 100, suffix: "+", label: "Projects Completed", description: "End-to-end projects across every sector in Ethiopia" },
  { value: 70, suffix: "+", label: "Certified Professionals", description: "Engineers and experts certified across our solution areas" },
  { value: 40, suffix: "+", label: "Global Industry Partners", description: "Partnered with top global technology leaders" },
];

export const ROTATING_WORDS = [
  "Data Centers",
  "Enterprise Networks",
  "Cyber Security",
  "Cloud Solutions",
  "Smart Infrastructure",
  "Software Solutions",
];

/* ------------------------------------------------------------------ */
/* Mission · Vision · Core Values                                      */
/* ------------------------------------------------------------------ */

export const VISION =
  "To become Ethiopia's most trusted and leading IT solution provider, empowering businesses through smart infrastructure, modern technology, and lasting partnerships.";

export const MISSION =
  "To deliver innovative, reliable, and value-driven IT solutions by listening to our clients, understanding their needs, and using technology to drive their success.";

export const CORE_VALUES = [
  { title: "Customer Focus", icon: "Users", text: "Listening to our clients and putting their needs at the center of every solution we deliver." },
  { title: "Integrity", icon: "ShieldCheck", text: "Operating transparently and honestly in every engagement, partnership and delivery." },
  { title: "Teamwork", icon: "Handshake", text: "Collaborating across disciplines — and with our clients — to achieve shared success." },
  { title: "Excellence", icon: "Award", text: "Pursuing the highest standards of quality in every design, installation and service." },
  { title: "Innovation", icon: "Lightbulb", text: "Continuously adopting modern technology to drive our clients' success forward." },
  { title: "Sustainability", icon: "Leaf", text: "Building durable, future-ready infrastructure that creates lasting value." },
];

/* ------------------------------------------------------------------ */
/* Company journey timeline                                            */
/* ------------------------------------------------------------------ */

export const STORY_MILESTONES = [
  {
    year: "2014",
    title: "The Beginning",
    text: "iRack IT Solutions was established in Addis Ababa, Ethiopia, starting as a hardware and network solution provider.",
  },
  {
    year: "2015",
    title: "Data Center Era",
    text: "Expanded into data center infrastructure — designing and building mission-critical facilities.",
  },
  {
    year: "2016",
    title: "Systems & Cloud",
    text: "Added systems integration, cloud and virtualization solutions to our portfolio.",
  },
  {
    year: "2017",
    title: "Cyber Security",
    text: "Launched dedicated cyber security practices — from firewalls to SIEM and VAPT.",
  },
  {
    year: "2018",
    title: "Certified Expertise",
    text: "Built a strong, multi-vendor certified team across all of our solution areas.",
  },
  {
    year: "2020",
    title: "Top IT Company",
    text: "Became one of the top IT companies in Ethiopia — trusted by government, BFSI and telecom.",
  },
  {
    year: "Today",
    title: "Digital Era Partner",
    text: "One of Ethiopia's leading IT solution providers, delivering smart solutions for a stronger future.",
  },
];

/* ------------------------------------------------------------------ */
/* Annual turnover growth (from Company Performance, ETB)              */
/* ------------------------------------------------------------------ */

export const REVENUE_GROWTH = {
  points: [
    { year: "2020/21", value: 65748255, label: "65.7M" },
    { year: "2021/22", value: 100969456, label: "101.0M" },
    { year: "2022/23", value: 189801341, label: "189.8M" },
    { year: "2023/24", value: 350688383, label: "350.7M" },
    { year: "2024/25", value: 527024426, label: "527.0M" },
  ],
  average: "246.8M ETB",
  growth: "+701.6%",
  multiple: "8.02x",
  cagr: "68.3%",
};

/* ------------------------------------------------------------------ */
/* Solutions — six service lines from the company profile              */
/* ------------------------------------------------------------------ */

export type Solution = {
  id: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  icon: string;
  span?: "large" | "wide" | "normal";
};

export const SOLUTIONS: Solution[] = [
  {
    id: "datacenter-power",
    title: "Data Center & Power Infrastructure",
    short:
      "Design, build and power mission-critical data centers — from modular rooms to full DCIM monitoring.",
    description:
      "We deliver complete turnkey data center solutions: consultancy and design, modular data center builds, UPS and power infrastructure, cooling and environmental control, rack and containment systems, fire detection and suppression, plus DCIM monitoring — everything your facility needs to run 24/7.",
    features: [
      "Data Center Design & Consultancy",
      "Modular Data Center Solutions",
      "UPS & Power Infrastructure",
      "Cooling & Environmental Control Systems",
      "Rack & Containment Systems",
      "Fire Detection & Suppression Systems",
      "Data Center Monitoring & DCIM Systems",
      "Structured Cabling & Network Infrastructure",
      "Physical Security & Access Control Systems",
    ],
    icon: "Server",
    span: "large",
  },
  {
    id: "enterprise-networking",
    title: "Enterprise Networking",
    short:
      "Design, implement and optimize LAN/WAN, wireless and fiber backbone networks for enterprises and campuses.",
    description:
      "Our networking specialists design and implement enterprise networks end-to-end: core, distribution and access switching, wireless LAN, structured cabling and fiber backbones, SD-WAN branch connectivity — with continuous monitoring and maintenance support.",
    features: [
      "LAN/WAN Network Design & Implementation",
      "Core, Distribution & Access Switching",
      "Wireless LAN & Wi-Fi Infrastructure",
      "Structured Cabling & Fiber Backbone",
      "SD-WAN & Branch Connectivity Solutions",
      "Network Monitoring & Performance Optimization",
      "Network Testing, Documentation & Maintenance",
    ],
    icon: "Network",
    span: "normal",
  },
  {
    id: "cyber-security",
    title: "Cyber Security Solutions",
    short:
      "Protect your organization from modern threats — from perimeter security to SIEM, IAM and VAPT.",
    description:
      "As threats grow more sophisticated, we secure your entire environment: firewalls and perimeter security, endpoint protection, email and web security, SIEM, identity and access management, vulnerability assessment and penetration testing, plus backup and disaster recovery.",
    features: [
      "Firewall & Perimeter Security",
      "Endpoint Protection & Antivirus",
      "Email & Web Security Solutions",
      "Security Information & Event Management (SIEM)",
      "Identity & Access Management (IAM)",
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "Data Protection, Backup & Disaster Recovery",
      "Security Monitoring, Incident Response & Support",
    ],
    icon: "ShieldCheck",
    span: "normal",
  },
  {
    id: "mdc-cloud",
    title: "Modern Data Center & Cloud",
    short:
      "Server, storage, virtualization and cloud solutions — including VDI and business continuity.",
    description:
      "We modernize your compute and storage estate: server infrastructure, storage and backup, virtualization, cloud migration, Microsoft/Linux administration, VDI and thin-client computing — with system monitoring and technical support to keep everything running.",
    features: [
      "Server Infrastructure Solutions",
      "Storage & Backup Solutions",
      "Virtualization Solutions",
      "Cloud Infrastructure & Migration Services",
      "Microsoft/Linux System Administration",
      "Data Backup, Recovery & Business Continuity",
      "VDI, Thin Client & Centralized Computing",
      "System Monitoring, Maintenance & Support",
    ],
    icon: "Cloud",
    span: "normal",
  },
  {
    id: "smart-infrastructure",
    title: "Smart City Infrastructure",
    short:
      "Smart meeting rooms, classrooms, buildings and public safety systems — connected and intelligent.",
    description:
      "From smart meeting rooms and classrooms to building management and public safety infrastructure, we integrate audio-visual, video conferencing, interactive displays and smart surveillance into intelligent environments — backed by full IT infrastructure support and preventive maintenance.",
    features: [
      "Smart Meeting Room Solutions",
      "Smart Classroom Solutions",
      "Smart Building Management Systems",
      "Audio-Visual & Video Conferencing",
      "Interactive Display & Collaboration Systems",
      "Smart Surveillance & Public Safety Infrastructure",
      "IT Infrastructure Support & Maintenance",
      "Network Support & Preventive Maintenance",
    ],
    icon: "Building2",
    span: "normal",
  },
  {
    id: "software-solutions",
    title: "Software Solutions",
    short:
      "Custom web, mobile and enterprise software — designed, integrated and supported by expert developers.",
    description:
      "Our software team builds what your business needs: custom web and mobile applications, enterprise software, UI/UX design, API and system integration, database design, business intelligence and automation — with long-term maintenance and enhancement.",
    features: [
      "Custom Web Application Development",
      "Mobile Application Development",
      "Enterprise Software Development",
      "UI/UX Design & Front-End Development",
      "API Integration & System Integration",
      "Database Design & Management",
      "Business Intelligence & Automation",
      "Software Maintenance, Support & Enhancement",
    ],
    icon: "Code2",
    span: "normal",
  },
];

/* Our delivery workflow: Consult → Design → Supply → Install → Commission */
export const SERVICE_WORKFLOW = [
  { step: "01", title: "Consult", text: "We listen and assess your needs, then advise the best-fit approach." },
  { step: "02", title: "Design", text: "Our engineers design a complete, standards-based solution blueprint." },
  { step: "03", title: "Supply", text: "Through top global partners, we source quality equipment and software." },
  { step: "04", title: "Install", text: "Certified teams install and integrate everything — on site, on time." },
  { step: "05", title: "Commission", text: "We test, commission, train your staff and support you long-term." },
];

/* ------------------------------------------------------------------ */
/* Leadership team (from profile)                                      */
/* ------------------------------------------------------------------ */

export type Leader = {
  name: string;
  role: string;
  photo: string;
};

export const LEADERS: Leader[] = [
  { name: "Zenagebriel Fekadu", role: "Chief Operating Officer", photo: "/images/leaders/zenagebriel-fekadu.png" },
  { name: "Sintayehu Getachew", role: "Project Coordinator", photo: "/images/leaders/sintayehu-getachew.png" },
  { name: "Abrham Yeshingda", role: "Chief Business Development Manager", photo: "/images/leaders/abrham-yeshingda.png" },
  { name: "Arsema Tadesse", role: "Pre-Sales Manager", photo: "/images/leaders/arsema-tadesse.png" },
];

export const TEAMS = [
  {
    id: "operations",
    title: "Operations Team",
    icon: "Wrench",
    photo: "/images/team-operations.png",
    description:
      "Our operations team delivers on the ground: infrastructure deployment, network and security installation, data center build-outs, commissioning and after-sales support — coordinated by our project office with training management included.",
  },
  {
    id: "business-dev",
    title: "Business Development Team",
    icon: "Handshake",
    photo: "/images/team-bizdev.png",
    description:
      "Our business development team covers pre-sales engineering, sales and marketing, channel management and solution development — organized to serve public sectors, BFSI, multinational and telecom clients across Ethiopia.",
  },
  {
    id: "technical",
    title: "Technical Experts",
    icon: "Cpu",
    photo: "/images/team-main.png",
    description:
      "70+ certified professionals across data center & power, enterprise networking, cyber security, modern data center & cloud, smart infrastructure and software solutions — certified by the world's leading technology vendors.",
  },
];

/* ------------------------------------------------------------------ */
/* Completed project portfolio (from profile)                          */
/* ------------------------------------------------------------------ */

export type Project = {
  id: number;
  title: string;
  client: string;
  year: number;
  size: string;
  region: string;
  category: string;
};

export const PROJECT_CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "datacenter", label: "Data Center & Power" },
  { id: "networking", label: "Enterprise Networking" },
  { id: "security", label: "Cyber Security" },
  { id: "cloud", label: "Cloud & Virtualization" },
  { id: "smart", label: "Smart Infrastructure" },
  { id: "supply", label: "IT Supply & Support" },
] as const;

export const PROJECTS: Project[] = [
  { id: 1, title: "Information systems design, supply, rehabilitation and commissioning of the existing data center", client: "Ministry of Water and Energy", year: 2026, size: "510M ETB", region: "Addis Ababa", category: "datacenter" },
  { id: 2, title: "Supply, installation, commissioning, training and testing of modular data center, enterprise network infrastructure, cyber security, IP phone and video surveillance system", client: "FDRE Defense Ministry", year: 2023, size: "108.5M ETB", region: "Addis Ababa", category: "datacenter" },
  { id: 3, title: "Supply and installation, commissioning, training of hyper-converged infrastructure, storage and 410 virtual desktop infrastructure (VDI)", client: "Wachamo University", year: 2024, size: "90.6M ETB", region: "South West Ethiopia", category: "cloud" },
  { id: 4, title: "Setting up STEM education and innovation centers, including supply of equipment, devices and mentoring — at Gelan Boys and Etege Menen Girls boarding schools", client: "Addis Ababa City Education Bureau", year: 2026, size: "250M ETB", region: "Addis Ababa", category: "smart" },
  { id: 5, title: "Supply, installation, configuration and implementation of enterprise network and related infrastructure", client: "Debre Markos University", year: 2026, size: "174.6M ETB", region: "Amhara", category: "networking" },
  { id: 6, title: "Supply, design, installation, testing and commissioning of network infrastructure, video surveillance system (VSS), data center and video conference room", client: "Addis Ababa ITDB", year: 2026, size: "148.9M ETB", region: "Addis Ababa", category: "networking" },
  { id: 7, title: "Supply and installation of electronics maintenance materials, IT spare parts, security devices and firewall", client: "Addis Ababa ITDB", year: 2025, size: "179.4M ETB", region: "Addis Ababa", category: "supply" },
  { id: 8, title: "Supply, installation, configuration and testing of storage with SAN switch", client: "City Government of Addis Ababa Education Bureau", year: 2025, size: "74M ETB", region: "Addis Ababa", category: "cloud" },
  { id: 9, title: "Supply, installation and commissioning of data backup and storage related hardware and system software for the Ethiopia e-government procurement (e-GP) system", client: "Ministry of Finance", year: 2025, size: "98M ETB", region: "Addis Ababa", category: "cloud" },
  { id: 10, title: "Design, supply, installation and commissioning of situation room at HQ", client: "Ministry of Defense", year: 2026, size: "74M ETB", region: "Addis Ababa", category: "smart" },
  { id: 11, title: "Procurement of digital signage (outdoor screen) with delivery and installation of digital market promotion system", client: "Ministry of Trade and Regional Integration", year: 2026, size: "38.4M ETB", region: "Addis Ababa", category: "smart" },
  { id: 12, title: "Supply and installation of 100GB firewall, IP camera and NAS storage", client: "Addis Ababa ITDB", year: 2025, size: "35M ETB", region: "Addis Ababa", category: "security" },
  { id: 13, title: "Supply and installation of network infrastructure", client: "Ethiopian News Agency", year: 2025, size: "13M ETB", region: "Addis Ababa", category: "networking" },
  { id: 14, title: "Design, supply, installation and commissioning of CCTV cameras", client: "EKA Kotebe Hospital", year: 2026, size: "25M ETB", region: "Addis Ababa", category: "security" },
  { id: 15, title: "Supply, construction and installation of data center infrastructure", client: "Ministry of Trade", year: 2024, size: "25M ETB", region: "Addis Ababa", category: "datacenter" },
  { id: 16, title: "Design, supply, installation and commissioning of fire prevention and protection system at HQ", client: "Ethio Telecom", year: 2026, size: "25M ETB", region: "Addis Ababa", category: "datacenter" },
  { id: 17, title: "Supply & integration of devices, including workstations and audio system for training center", client: "Ethiopian Statistics Service", year: 2025, size: "24M ETB", region: "Addis Ababa", category: "supply" },
  { id: 18, title: "Supply, installation, configuration, testing, commissioning and training of IP CCTV system", client: "Federal Housing Corporation", year: 2026, size: "24M ETB", region: "Addis Ababa", category: "security" },
  { id: 19, title: "Supply of building information modeling (BIM) capable desktop computers, hardware, UPS, server and 42U rack equipment", client: "ECWC", year: 2016, size: "25.3M ETB", region: "Addis Ababa", category: "supply" },
  { id: 20, title: "Design, supply, installation and commissioning of outdoor and indoor LED screens", client: "CRRSA", year: 2026, size: "15.9M ETB", region: "Addis Ababa", category: "smart" },
  { id: 21, title: "Design, supply, installation and commissioning of network infrastructure", client: "National Archive and Library Agency", year: 2024, size: "15M ETB", region: "Addis Ababa", category: "networking" },
  { id: 22, title: "Supply and installation of smart meeting room with video conference system", client: "Mekdela Amba University", year: 2022, size: "12.3M ETB", region: "Amhara", category: "smart" },
  { id: 23, title: "Installation of network devices, video conference, cabling and trunking", client: "FDRE Defense Ministry", year: 2023, size: "90.6M ETB", region: "Addis Ababa", category: "networking" },
  { id: 24, title: "Design, supply, installation and commissioning of video conference room", client: "Institute of Foreign Affairs", year: 2023, size: "5.9M ETB", region: "Addis Ababa", category: "smart" },
  { id: 25, title: "Supply of network related materials", client: "Office of the Prime Minister", year: 2024, size: "5.5M ETB", region: "Addis Ababa", category: "supply" },
  { id: 26, title: "Supply and deployment of antivirus", client: "Institute of Foreign Affairs", year: 2023, size: "4.5M ETB", region: "Addis Ababa", category: "security" },
  { id: 27, title: "Design, supply and installation of CCTV cameras and related materials", client: "Addis Ababa Public Service & HR Development Bureau", year: 2023, size: "2.1M ETB", region: "Addis Ababa", category: "security" },
];

/* ------------------------------------------------------------------ */
/* Market segments (from profile)                                      */
/* ------------------------------------------------------------------ */

export const MARKETS = [
  {
    title: "Public Sectors",
    description:
      "Ministries, agencies, universities and city administrations across Ethiopia rely on iRack for secure, large-scale technology foundations.",
    icon: "Landmark",
    examples: ["Ministry of Water & Energy", "Ministry of Finance", "Addis Ababa ITDB"],
  },
  {
    title: "Banking, Financial Services & Insurance (BFSI)",
    description:
      "Mission-critical infrastructure, cyber security and business continuity for Ethiopia's financial institutions.",
    icon: "Landmark",
    examples: ["Banks", "Insurance Companies", "Financial Regulators"],
  },
  {
    title: "Multinational & Telecom",
    description:
      "Enterprise networks, smart facilities and managed services for telecom operators and multinational organizations.",
    icon: "RadioTower",
    examples: ["Ethio Telecom", "Multinational Offices", "Enterprise Campuses"],
  },
];

/* ------------------------------------------------------------------ */
/* Client logos (extracted from the company profile)                   */
/* ------------------------------------------------------------------ */

export const CLIENT_LOGOS = [
  { name: "Ethiopian Electric Power", src: "/images/clients/eep.png" },
  { name: "Ministry of Water and Energy", src: "/images/clients/mowe.png" },
  { name: "Ethio Telecom", src: "/images/clients/ethio-telecom.png" },
  { name: "Ministry of Finance", src: "/images/clients/mof.png" },
  { name: "FDRE Defense Ministry", src: "/images/clients/defense.png" },
  { name: "Ministry of Foreign Affairs", src: "/images/clients/foreign-affairs.png" },
  { name: "Ministry of Health", src: "/images/clients/moh.png" },
  { name: "Federal Supreme Court", src: "/images/clients/supreme-court.png" },
  { name: "Federal Ethics & Anti-Corruption Commission", src: "/images/clients/feacc.png" },
  { name: "Office of the Federal Auditor General", src: "/images/clients/auditor-general.png" },
  { name: "Customs Commission", src: "/images/clients/customs.png" },
  { name: "Federal Housing Corporation", src: "/images/clients/federal-housing.png" },
  { name: "Ethiopian Construction Works Corporation", src: "/images/clients/ecwc.png" },
  { name: "Addis Ababa City Roads Authority", src: "/images/clients/roads-authority.png" },
  { name: "Ministry of Trade", src: "/images/clients/mot.png" },
  { name: "Ethiopian News Agency", src: "/images/clients/ministry.png" },
];

/* ------------------------------------------------------------------ */
/* Industry partner logos (extracted from the company profile)         */
/* ------------------------------------------------------------------ */

export const PARTNER_LOGOS = [
  { name: "Dell", src: "/images/partners-grid.png", direct: false },
];

export const PARTNERS = [
  { name: "Dell", tagline: "Computing", src: null },
  { name: "HP", tagline: "Enterprise IT", src: null },
  { name: "Cisco", tagline: "Networking", src: null },
  { name: "Microsoft", tagline: "Software & Cloud", src: null },
  { name: "Huawei", tagline: "ICT Infrastructure", src: null },
  { name: "Oracle", tagline: "Database & Applications", src: "/images/partners/oracle.png" },
  { name: "SAP", tagline: "Enterprise Software", src: "/images/partners/sap.png" },
  { name: "Palo Alto Networks", tagline: "Network Security", src: "/images/partners/palo-alto.png" },
  { name: "Kaspersky", tagline: "Cyber Security", src: "/images/partners/kaspersky.png" },
  { name: "CyberArk", tagline: "Identity Security", src: "/images/partners/cyberark.png" },
  { name: "Red Hat", tagline: "Open Source", src: "/images/partners/redhat.png" },
  { name: "Veeam", tagline: "Backup & Recovery", src: "/images/partners/veeam.png" },
  { name: "APC by Schneider Electric", tagline: "Power & Cooling", src: "/images/partners/apc.png" },
  { name: "Vertiv", tagline: "Critical Infrastructure", src: null },
  { name: "Canon", tagline: "Imaging & Printing", src: "/images/partners/canon.png" },
  { name: "Hitachi", tagline: "Technology", src: "/images/partners/hitachi.png" },
  { name: "Nutanix", tagline: "Hyperconverged", src: null },
  { name: "Omnissa", tagline: "Digital Workspace", src: "/images/partners/omnissa.png" },
  { name: "Avaya", tagline: "Communications", src: "/images/partners/avaya.png" },
  { name: "SolarWinds", tagline: "IT Management", src: "/images/partners/solarwinds.png" },
  { name: "ZKTeco", tagline: "Access Control", src: "/images/partners/zkteco.png" },
  { name: "Absen", tagline: "LED Displays", src: "/images/partners/absen.png" },
  { name: "Hikvision", tagline: "Video Surveillance", src: null },
  { name: "Dahua", tagline: "Video Surveillance", src: null },
];

export const PARTNERS_GRID_IMAGE = "/images/partners-grid.png";

/* ------------------------------------------------------------------ */
/* Why us                                                              */
/* ------------------------------------------------------------------ */

export const WHY_US = [
  {
    title: "12 Years of Proven Delivery",
    text: "Since 2014, iRack has completed 100+ projects for Ethiopia's most demanding government, education, financial and telecom clients.",
    icon: "Award",
  },
  {
    title: "70+ Certified Professionals",
    text: "A strong, multi-vendor certified team across data center, networking, security, cloud, smart infrastructure and software disciplines.",
    icon: "BadgeCheck",
  },
  {
    title: "Turnkey: Consult to Commission",
    text: "One partner for the full lifecycle — consult, design, supply, install and commission — with training and after-sales support included.",
    icon: "Layers",
  },
  {
    title: "Top Global Industry Leaders",
    text: "40+ partnerships with the world's leading technology vendors — Dell, Cisco, Microsoft, Oracle, Palo Alto, Vertiv, Canon and more.",
    icon: "Globe",
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];
