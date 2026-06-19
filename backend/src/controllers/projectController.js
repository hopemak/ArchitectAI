import * as ProjectModule from '../models/Project.js';
const Project = ProjectModule.default || ProjectModule.Project || ProjectModule;

import { generateBlueprintWithAI, testAIConnection } from '../services/groqService.js';
import { getIndustryMockBlueprint } from '../utils/mockData.js';

export const createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.user._id, status: 'pending' });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
    if (!project) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateBlueprint = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
    if (!project) return res.status(404).json({ success: false, message: 'Not found' });

    let blueprint, usedAI = false;

    try {
      blueprint = await generateBlueprintWithAI(project);
      usedAI = true;
      console.log('[Groq] Blueprint generated');
    } catch (aiError) {
      console.error('[Groq] Failed: ' + aiError.message);
      blueprint = getIndustryMockBlueprint(project.industry);
    }

    project.blueprint = blueprint;
    project.status = 'generated';
    project.aiGenerated = usedAI;
    await project.save();

    res.json({ success: true, data: { project, blueprint }, aiGenerated: usedAI });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const testGemini = async (req, res) => {
  try {
    const result = await testAIConnection();
    res.json({ success: true, message: result.message, provider: 'Groq' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, provider: 'Groq' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!project) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
