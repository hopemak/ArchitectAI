export const mockBlueprint = {
  executiveSummary: 'AI-generated project overview will appear here...',
  
  businessAnalysis: {
    problemsSolved: ['Problem 1', 'Problem 2', 'Problem 3'],
    stakeholders: ['Customer', 'Admin', 'Developer'],
    targetUsers: ['End Users', 'Administrators'],
    businessValue: ['Increase efficiency', 'Reduce costs']
  },

  userStories: [
    { id: 'US-001', role: 'User', want: 'use the system', reason: 'I can achieve my goals' }
  ],

  systemModules: [
    { name: 'Auth Module', description: 'Authentication and authorization', features: ['Login', 'Register'] }
  ],

  functionalRequirements: ['FR-001: User can login'],
  nonFunctionalRequirements: ['NFR-001: System must be secure'],

  softwareArchitecture: {
    frontend: 'React + Vite + Tailwind',
    backend: 'Node.js + Express',
    database: 'MongoDB Atlas',
    authentication: 'JWT + bcrypt',
    hosting: 'Vercel + Render'
  },

  databaseDesign: {
    entities: [{ name: 'User', attributes: ['id', 'name', 'email'], primaryKey: 'id' }],
    relationships: ['User has many Projects']
  },

  apiBlueprint: [
    { method: 'GET', endpoint: '/api/users', description: 'Get all users', auth: true, admin: false }
  ],

  developmentRoadmap: [
    { phase: 'Phase 1', duration: '2 Weeks', tasks: ['Setup', 'Design'] }
  ],

  costEstimation: { duration: '11 Weeks', teamSize: '4', estimatedCost: '$32,000' },

  riskAnalysis: [
    { category: 'Technical', level: 'Medium', title: 'Scalability', mitigation: 'Use caching' }
  ],

  aiSuggestions: [
    { title: 'Add AI Chat', impact: 'High', effort: 'Medium', description: 'AI-powered support chat' }
  ]
};
