export const BRAND = {
  name: "RudraStack",
  tld: ".dev",
  full: "RudraStack.dev",
  person: "Rudrani Gawande",
  role: "Cloud & DevOps Engineer",
  tagline: "Where Creativity Meets Code, Cloud & Automation.",
  email: "rudranigawande228@gmail.com",
  phone: "+91 81808 54303",
  location: "Yavatmal, Maharashtra, India",
  github: "https://github.com/rudrani025",
  githubHandle: "Rudrani025",
  linkedin: "https://linkedin.com/in/rudranigawande",
  whatsapp: "https://wa.me/918180854303",
  whatsappHandle: "@rudra51",
  instagram: "https://instagram.com/rudrani_215",
  instagramHandle: "rudrani_215",
};

export const SECTIONS = [
  { id: "start", label: "START" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "cloud", label: "CLOUD" },
  { id: "projects", label: "PROJECTS" },
  { id: "devops", label: "DEVOPS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "trophies", label: "TROPHIES" },
  { id: "resume", label: "RESUME" },
  { id: "contact", label: "CONTACT" },
] as const;

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export type SkillBranch = {
  branch: string;
  icon: string;
  skills: { name: string; glyph: string }[];
};

export const SKILL_TREE: SkillBranch[] = [
  {
    branch: "CLOUD",
    icon: "☁",
    skills: [
      { name: "AWS", glyph: "☁" },
      { name: "EC2", glyph: "▤" },
      { name: "S3", glyph: "🪣" },
      { name: "VPC", glyph: "▦" },
      { name: "IAM", glyph: "🔐" },
      { name: "RDS", glyph: "🗄" },
      { name: "ALB", glyph: "⚖" },
      { name: "Auto Scaling", glyph: "⇅" },
      { name: "CloudWatch", glyph: "👁" },
      { name: "Route 53", glyph: "🧭" },
    ],
  },
  {
    branch: "DEVOPS",
    icon: "⚙",
    skills: [
      { name: "Docker", glyph: "🐳" },
      { name: "Kubernetes", glyph: "☸" },
      { name: "Jenkins", glyph: "🔧" },
      { name: "Terraform", glyph: "▩" },
      { name: "Ansible", glyph: "🅰" },
      { name: "Git", glyph: "⑂" },
      { name: "GitHub", glyph: "🐙" },
      { name: "CI/CD", glyph: "♾" },
    ],
  },
  {
    branch: "PROGRAMMING",
    icon: "⌨",
    skills: [
      { name: "Python", glyph: "🐍" },
      { name: "Java", glyph: "☕" },
      { name: "HTML", glyph: "</>" },
      { name: "CSS", glyph: "🎨" },
      { name: "MySQL", glyph: "🗃" },
    ],
  },
  {
    branch: "OS",
    icon: "🐧",
    skills: [{ name: "Linux", glyph: "🐧" }],
  },
];

export const ARCHITECTURE_STEPS = [
  { label: "VPC", detail: "10.0.0.0/16 network boundary", glyph: "▦" },
  { label: "Route 53", detail: "DNS routing for the domain", glyph: "🧭" },
  { label: "Public Subnets", detail: "2 AZs + Internet Gateway", glyph: "▤" },
  { label: "Application Load Balancer", detail: "HTTP/HTTPS traffic spread across AZs", glyph: "⚖" },
  { label: "EC2 + Auto Scaling", detail: "Nginx app tier, scales on CPU", glyph: "🖥" },
  { label: "Private Subnets + NAT", detail: "No inbound internet, egress via NAT GW", glyph: "▩" },
  { label: "RDS MySQL", detail: "Private, multi-AZ database tier", glyph: "🗄" },
  { label: "IAM + Security Groups", detail: "Least-privilege access everywhere", glyph: "🔐" },
  { label: "CloudWatch", detail: "Metrics, logs and alarms", glyph: "👁" },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  world: string;
  tech: string[];
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  github: string;
  demo?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "three-tier",
    index: "01",
    title: "Production-Ready Three-Tier Web Application",
    world: "AWS Cloud City",
    tech: ["AWS VPC", "EC2", "ALB", "Auto Scaling", "RDS MySQL", "IAM", "CloudWatch", "Nginx"],
    problem:
      "Traditional single-server deployments have one point of failure, no elasticity for traffic spikes, and a database exposed on the same box as the app.",
    solution:
      "Designed and deployed a highly available three-tier architecture on AWS: a public web/ALB tier across two Availability Zones, an auto-scaled EC2 app tier running Nginx, and a private RDS MySQL data tier reachable only from the app security group.",
    architecture: [
      "Internet → Route 53 → Application Load Balancer",
      "ALB → Auto Scaling Group of EC2 (Nginx) in public subnets across 2 AZs",
      "EC2 → RDS MySQL in private subnets, egress via NAT Gateway",
      "CloudWatch alarms drive scale-out / scale-in policies",
    ],
    features: [
      "Multi-AZ high availability with health-check based failover",
      "CPU-based Auto Scaling policies",
      "Database isolated in private subnets, no public IP",
      "Least-privilege IAM roles and tight security groups",
      "CloudWatch dashboards, logs and alarms",
    ],
    github: "https://github.com/rudrani025",
  },
  {
    id: "dockerized-site",
    index: "02",
    title: "Dockerized Static Website Deployment",
    world: "Container Harbour",
    tech: ["Docker", "Nginx", "Linux", "Git"],
    problem:
      "A static site that behaved differently on every machine, with manual copying of files to the server on each change.",
    solution:
      "Containerized the site with a slim Nginx image, built and versioned the Docker image, and ran it with explicit port mapping so the exact same artifact runs locally and on the server.",
    architecture: [
      "Dockerfile (nginx:alpine) → build image → tag version",
      "docker run -p 80:80 → container serves static assets",
      "Image pushed to registry for repeatable deploys",
    ],
    features: [
      "One reproducible artifact for every environment",
      "Custom Nginx config for caching and routing",
      "Image and container lifecycle managed from the CLI",
    ],
    github: "https://github.com/rudrani025",
  },
  {
    id: "registration-app",
    index: "03",
    title: "Online Registration Application System",
    world: "Full-Stack Village",
    tech: ["Python", "MySQL", "HTML", "CSS", "Bootstrap"],
    problem:
      "Manual paper registration caused data-entry errors, slow processing and no real-time visibility into enrollments.",
    solution:
      "Built a full-stack registration application with validated forms, MySQL persistence and an admin view for real-time tracking of submissions.",
    architecture: [
      "Bootstrap UI → Python backend → MySQL database",
      "Server-side validation layer before persistence",
      "Admin dashboard reads live registration data",
    ],
    features: [
      "Automated enrollment with data validation",
      "Zero paperwork, faster processing",
      "Real-time registration tracking",
    ],
    github: "https://github.com/rudrani025",
  },
];

export const PIPELINE = [
  { stage: "GIT", glyph: "⑂" },
  { stage: "BUILD", glyph: "🔨" },
  { stage: "TEST", glyph: "🧪" },
  { stage: "DOCKER", glyph: "🐳" },
  { stage: "DEPLOY", glyph: "🚀" },
  { stage: "MONITOR", glyph: "👁" },
];

export const EXPERIENCE = [
  {
    role: "Web Developer Intern",
    org: "Imagine Script Pvt. Ltd.",
    period: "Sep 2024 – Dec 2024",
    kind: "Internship",
    points: [
      "Built web applications with HTML, CSS and JavaScript",
      "Worked on UI design, backend integration and debugging",
    ],
    tech: ["HTML", "CSS", "Java", "Python", "Node.js", "MySQL"],
  },
  {
    role: "Cloud & DevOps Intern",
    org: "Cravita Technology",
    period: "Present",
    kind: "Training / Internship",
    points: [
      "Trained in AWS services, Linux administration and DevOps practices",
      "Deployed and managed projects across AWS with Git and CI/CD tooling",
    ],
    tech: ["AWS", "Linux", "Docker", "Git", "CI/CD"],
  },
];

export const ACHIEVEMENTS = [
  {
    title: "Web Development Internship Certificate",
    org: "Imagine Script Pvt. Ltd.",
    date: "Dec 2024",
    link: "https://github.com/rudrani025",
  },
  {
    title: "Generative AI Workshop — 2-Day Training",
    org: "Training Program",
    date: "2025",
    link: "https://github.com/rudrani025",
  },
];

export const RESUME = {
  education: [
    {
      title: "B.Sc. Computer Science",
      org: "Vidya Bharti Mahavidyalaya, Amravati (SGBAU)",
      period: "Jun 2022 – Jul 2025",
    },
  ],
  skills: [
    "AWS (EC2, S3, VPC, IAM, RDS, ALB, Auto Scaling, CloudWatch, Route 53)",
    "Docker, Jenkins, Terraform, Git, GitHub, CI/CD",
    "Python, Java, C, HTML, CSS, JavaScript, MySQL",
    "Linux, Nginx, VS Code, Bootstrap",
  ],
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Computer Networks",
    "Operating Systems",
  ],
};
