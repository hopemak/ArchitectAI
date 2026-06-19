import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  industry: { type: String, required: true },
  targetUsers: { type: String, required: true },
  budgetRange: { type: String, required: true },
  timeline: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'generated', 'archived'], default: 'pending' },
  icon: { type: String, default: '🚀' },
  image: { type: String, default: 'linear-gradient(135deg, #667eea, #764ba2)' },
  blueprint: {
    executiveSummary: String,
    businessAnalysis: {
      problemsSolved: [String],
      stakeholders: [String],
      targetUsers: [String],
      businessValue: [String]
    },
    userStories: [{
      id: String,
      role: String,
      want: String,
      reason: String
    }],
    systemModules: [{
      name: String,
      description: String,
      features: [String]
    }],
    functionalRequirements: [String],
    nonFunctionalRequirements: [String],
    softwareArchitecture: {
      frontend: String,
      backend: String,
      database: String,
      authentication: String,
      hosting: String
    },
    databaseDesign: {
      entities: [{
        name: String,
        attributes: [String],
        primaryKey: String
      }],
      relationships: [String]
    },
    apiBlueprint: [{
      method: String,
      endpoint: String,
      description: String,
      auth: Boolean,
      admin: Boolean
    }],
    developmentRoadmap: [{
      phase: String,
      duration: String,
      tasks: [String]
    }],
    costEstimation: {
      duration: String,
      teamSize: String,
      estimatedCost: String
    },
    riskAnalysis: [{
      category: String,
      level: String,
      title: String,
      mitigation: String
    }],
    aiSuggestions: [{
      title: String,
      impact: String,
      effort: String,
      description: String
    }]
  }
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);
