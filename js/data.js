const DATA = {
  about: {
    title: "Who I Am",
    subtitle: "Pavitra Dwivedi // Security & Backend Engineer",
    content: "I'm a Computer Science student at UPES, Dehradun, focused on Security and Backend Engineering. I have hands-on experience in VAPT, SIEM analysis, and building secure backend architectures. I work with Python, Bash, and Java to build systems for secure data handling and ransomware-resilient infrastructure. My core interest lies in building unhackable, scalable, and privacy-preserving systems.",
    vision: "I'm here to solve the hard problems at the intersection of Security and Backend Architecture. My goal is to build the unhackable infrastructure of tomorrow. No cap."
  },
  skills: [
    {
      category: "Programming",
      items: ["Python", "Bash", "Java (OOP)", "C"]
    },
    {
      category: "Security & Monitoring",
      items: ["SIEM", "VAPT", "OWASP Top 10", "Log Analysis", "Incident Response"]
    },
    {
      category: "Secure Backend Design",
      items: ["Scalability", "Zero Trust", "System Hardening", "Secure APIs", "Encryption"]
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS (S3, IAM)", "Docker", "Kubernetes", "CI/CD (GitHub Actions)", "Git"]
    },
    {
      category: "Systems & Backend",
      items: ["REST APIs", "Multithreading", "API Integration"]
    },
    {
      category: "Databases",
      items: ["MySQL", "MongoDB"]
    }
  ],
  projects: [
    {
      id: 1,
      title: "API Performance & Reliability Monitoring",
      tech: "Python",
      description: "Simulated 500+ concurrent users to evaluate system behavior under load.",
      highlights: [
        "Monitored latency, throughput, and error rates to identify performance bottlenecks",
        "Developed secure API endpoints with robust authentication and validation layers",
        "Analyzed system behavior under high-concurrency stress conditions to ensure availability"
      ]
    },
    {
      id: 2,
      title: "Privacy-Preserving Scam Detection",
      tech: "Python | ML",
      description: "Designed a secure, real-time processing pipeline without storing sensitive user data.",
      highlights: [
        "Implemented privacy-aware architecture using transient in-memory analysis",
        "Structured system for scalability and modular development with focus on privacy",
        "Filed for copyright protection for system design and methodology"
      ]
    },
    {
      id: 3,
      title: "Secure Microservices Gateway",
      tech: "Java | Spring Boot | JWT",
      description: "Built a high-performance API gateway with Zero-Trust principles and granular access control.",
      highlights: [
        "Implemented centralized JWT-based authentication and rate limiting",
        "Configured automated threat detection rules for incoming traffic",
        "Optimized gateway latency for high-throughput backend communication"
      ]
    },
    {
      id: 4,
      title: "RansomSafe: Resilient Backup System",
      tech: "Python | Minikube | Restic",
      description: "Designed a backup and recovery system using snapshot-based backups triggered on file changes.",
      highlights: [
        "Integrated Restic for incremental backups and utilized Minikube-based S3 object storage",
        "Enabled restoration of clean data states during simulated ransomware scenarios",
        "Logged backup and recovery events to ensure auditability and data integrity"
      ]
    }
  ],
  experience: [
    {
      role: "Cybersecurity Intern",
      company: "INFERA, Noida",
      duration: "June 2025 - August 2025",
      points: [
        "Conducted VAPT assessments on web applications, identifying 15+ vulnerabilities including OWASP Top 10 issues",
        "Monitored and analyzed SIEM logs and security alerts to detect anomalies",
        "Developed SOC runbooks and incident response workflows",
        "Assisted in log correlation and alert analysis to identify suspicious patterns"
      ]
    },
    {
      role: "Security & Data Engineering Intern",
      company: "IQSec Labs, Hybrid",
      duration: "March 2025 - August 2025",
      points: [
        "Built and maintained data pipelines for sensitive datasets, ensuring reliability and secure data handling",
        "Automated data processing and API workflows, reducing manual effort by 60-70%",
        "Improved system reliability by optimizing preprocessing workflows",
        "Supported analytical and detection systems by preparing structured datasets"
      ]
    }
  ],
  blog: [
    {
      id: 1,
      title: "What I Learned in My First Cybersecurity Internship",
      date: "May 2026",
      readTime: "10 min",
      excerpt: "A student's honest take on breaking into cybersecurity, the tools I used, and the mistakes I made."
    },
    {
      id: 2,
      title: "Building a Privacy-Preserving Scam Detector",
      date: "May 2026",
      readTime: "12 min",
      excerpt: "How I designed a real-time scam detection system and the technical challenges of keeping user data private."
    }
  ],
  contact: {
    email: "dwivedipavitr92@gmail.com",
    linkedin: "linkedin.com/in/pavitra-dwivedi",
    github: "github.com/PavitraDwivedi2005",
    phone: "+91 74518 05888"
  },
  status: {
    availability: "OPEN TO OPPORTUNITIES",
    roles: ["Internships", "Security Roles", "Collaborations", "Freelance Projects"]
  }
};

if (typeof module !== 'undefined') {
  module.exports = DATA;
}
