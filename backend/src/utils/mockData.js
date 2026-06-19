export const mockBlueprint = {
  executiveSummary: "This project is a comprehensive software solution designed to address key industry challenges through modern architecture and user-centric design.",
  
  businessAnalysis: {
    problemsSolved: ["Inefficient manual processes", "Lack of centralized data", "Poor user experience", "Scalability limitations", "Security vulnerabilities"],
    stakeholders: ["End Users", "Business Owners", "Development Team", "Operations Team", "Compliance Officers"],
    targetUsers: ["Individual Consumers", "Small Business Owners", "Enterprise Teams", "Administrators", "Developers"],
    businessValue: ["Reduce costs by 40%", "Increase engagement by 60%", "Improve data accuracy", "Enable rapid scaling", "Ensure compliance"]
  },

  userStories: [
    { id: "US-001", role: "User", want: "create an account", reason: "I can use the platform" },
    { id: "US-002", role: "Admin", want: "manage permissions", reason: "I control access" },
    { id: "US-003", role: "Developer", want: "access API docs", reason: "I can integrate" },
    { id: "US-004", role: "Manager", want: "view analytics", reason: "I make decisions" },
    { id: "US-005", role: "User", want: "get notifications", reason: "I stay informed" }
  ],

  systemModules: [
    { name: "Authentication", description: "Secure login and access control", features: ["JWT login", "OAuth", "MFA", "Password recovery"] },
    { name: "User Management", description: "Profile and account handling", features: ["Profile edit", "Settings", "Activity log", "Preferences"] },
    { name: "Content Management", description: "Create and publish content", features: ["Rich editor", "Media upload", "Versioning", "Scheduling"] },
    { name: "Analytics", description: "Data insights and reporting", features: ["Dashboard", "Reports", "Export", "Trends"] },
    { name: "API Gateway", description: "API routing and management", features: ["Routing", "Rate limiting", "Versioning", "Docs"] }
  ],

  functionalRequirements: [
    "FR-001: User registration", "FR-002: User login", "FR-003: Password reset",
    "FR-004: CRUD operations", "FR-005: Profile updates", "FR-006: RBAC support",
    "FR-007: Email notifications", "FR-008: File uploads", "FR-009: Search/filter", "FR-010: PDF generation"
  ],

  nonFunctionalRequirements: [
    "NFR-001: 10K concurrent users", "NFR-002: <200ms response", "NFR-003: 99.9% uptime",
    "NFR-004: Encryption", "NFR-005: GDPR/CCPA", "NFR-006: 80% test coverage",
    "NFR-007: Horizontal scaling", "NFR-008: <100ms DB queries"
  ],

  softwareArchitecture: {
    frontend: "React 18 + Vite + Tailwind CSS",
    backend: "Node.js 20 + Express.js",
    database: "MongoDB Atlas + Mongoose",
    authentication: "JWT + bcrypt",
    hosting: "Vercel + Render"
  },

  databaseDesign: {
    entities: [
      { name: "User", attributes: ["_id", "email", "password", "name", "role"], primaryKey: "_id" },
      { name: "Project", attributes: ["_id", "name", "industry", "description", "status"], primaryKey: "_id" }
    ],
    relationships: ["User has many Projects"]
  },

  apiBlueprint: [
    { method: "POST", endpoint: "/api/auth/register", description: "Register", auth: false, admin: false },
    { method: "POST", endpoint: "/api/auth/login", description: "Login", auth: false, admin: false },
    { method: "GET", endpoint: "/api/projects", description: "List projects", auth: true, admin: false },
    { method: "POST", endpoint: "/api/projects", description: "Create project", auth: true, admin: false },
    { method: "POST", endpoint: "/api/projects/:id/generate", description: "Generate blueprint", auth: true, admin: false }
  ],

  developmentRoadmap: [
    { phase: "Phase 1", duration: "3 Weeks", tasks: ["Setup", "DB design", "Auth", "API"] },
    { phase: "Phase 2", duration: "4 Weeks", tasks: ["Users", "Projects", "AI", "Dashboard"] },
    { phase: "Phase 3", duration: "3 Weeks", tasks: ["Analytics", "Uploads", "Email", "Optimize"] },
    { phase: "Phase 4", duration: "2 Weeks", tasks: ["Audit", "Testing", "Docs", "Deploy"] }
  ],

  costEstimation: { duration: "12 Weeks", teamSize: "4", estimatedCost: "$48,000 - $62,000" },

  riskAnalysis: [
    { category: "Technical", level: "High", title: "AI Complexity", mitigation: "Error handling + mock fallback" },
    { category: "Security", level: "High", title: "Data Breach", mitigation: "Encryption + audits" },
    { category: "Schedule", level: "Medium", title: "Scope Creep", mitigation: "Agile sprints" },
    { category: "Performance", level: "Medium", title: "DB Bottlenecks", mitigation: "Indexing + caching" },
    { category: "Operational", level: "Low", title: "Team Issues", mitigation: "Cross-training" }
  ],

  aiSuggestions: [
    { title: "AI Code Review", impact: "High", effort: "Medium", description: "Auto code quality checks" },
    { title: "Smart Search", impact: "High", effort: "High", description: "NLP-powered search" },
    { title: "Predictive Analytics", impact: "Medium", effort: "High", description: "ML behavior prediction" },
    { title: "Auto-Scaling", impact: "Medium", effort: "Low", description: "K8s auto-scaling" },
    { title: "Real-time Collab", impact: "High", effort: "Medium", description: "WebSocket live editing" }
  ]
};

export const getIndustryMockBlueprint = (industry) => {
  const overviews = {
    'EdTech': 'Educational platform with AI tutoring and progress tracking.',
    'HealthTech': 'Healthcare solution with telemedicine and EHR management.',
    'FinTech': 'Financial platform with secure payments and analytics.',
    'E-commerce': 'Online marketplace with recommendations and checkout.',
    'SaaS': 'Cloud platform with subscription and tenant management.',
    'Social Media': 'Social platform with real-time feeds and moderation.',
    'Real Estate': 'PropTech with virtual tours and transaction tools.',
    'Gaming': 'Multiplayer platform with matchmaking and leaderboards.'
  };
  return { ...mockBlueprint, executiveSummary: overviews[industry] || mockBlueprint.executiveSummary };
};
