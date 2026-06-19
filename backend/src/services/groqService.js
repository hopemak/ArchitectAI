import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const MODELS = [
  'llama-3.1-8b-instant',
  'llama-3.1-70b-versatile',
  'mixtral-8x7b-32768',
  'gemma-7b-it'
];

const callGroq = async (prompt, modelIndex) => {
  if (!modelIndex) modelIndex = 0;
  if (modelIndex >= MODELS.length) throw new Error('All Groq models failed');
  const model = MODELS[modelIndex];
  
  console.log('[Groq] Trying model: ' + model);
  
  try {
    const response = await axios.post(GROQ_URL, {
      model: model,
      messages: [
        { role: 'system', content: 'You are an expert software architect. Generate a software architecture blueprint as valid JSON only. ALL array items must be strings. ALL object values must be strings, arrays of strings, or simple objects with string values only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    }, {
      headers: {
        'Authorization': 'Bearer ' + GROQ_API_KEY,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    console.log('[Groq] Success with: ' + model);
    return response.data.choices[0].message.content;
  } catch (error) {
    let errMsg = error.message || 'Unknown';
    if (error.response) {
      errMsg = 'HTTP ' + error.response.status + ' - ' + JSON.stringify(error.response.data).substring(0, 300);
    }
    console.warn('[Groq] ' + model + ' failed: ' + errMsg);
    return callGroq(prompt, modelIndex + 1);
  }
};

const buildPrompt = (project) => {
  return 'Generate a software architecture blueprint in JSON for this ' + project.industry + ' project:\n\n' +
    'Name: ' + project.name + '\n' +
    'Users: ' + project.targetUsers + '\n' +
    'Budget: ' + project.budgetRange + '\n' +
    'Timeline: ' + project.timeline + '\n' +
    'Description: ' + project.description + '\n\n' +
    'Return ONLY JSON. CRITICAL RULES:\n' +
    '1. ALL values in arrays must be plain strings (no objects inside arrays)\n' +
    '2. relationships array: use strings like "Seller has many Orders" (NOT objects)\n' +
    '3. features arrays: use strings like "Login", "Register" (NOT objects)\n' +
    '4. attributes arrays: use strings like "id", "name", "email" (NOT objects)\n' +
    '5. tasks arrays: use strings like "Setup database", "Build API" (NOT objects)\n' +
    '6. problemsSolved, stakeholders, targetUsers, businessValue: all strings\n\n' +
    'JSON structure:\n' +
    '{"executiveSummary":"...","businessAnalysis":{"problemsSolved":["..."],"stakeholders":["..."],"targetUsers":["..."],"businessValue":["..."]},"userStories":[{"id":"US-001","role":"...","want":"...","reason":"..."}],"systemModules":[{"name":"...","description":"...","features":["string1","string2"]}],"functionalRequirements":["FR-001: ..."],"nonFunctionalRequirements":["NFR-001: ..."],"softwareArchitecture":{"frontend":"...","backend":"...","database":"...","authentication":"...","hosting":"..."},"databaseDesign":{"entities":[{"name":"...","attributes":["id","name","email"],"primaryKey":"..."}],"relationships":["EntityA has many EntityB","EntityC belongs to EntityD"]},"apiBlueprint":[{"method":"GET","endpoint":"...","description":"...","auth":true,"admin":false}],"developmentRoadmap":[{"phase":"Phase 1","duration":"...","tasks":["task1","task2"]}],"costEstimation":{"duration":"...","teamSize":"...","estimatedCost":"..."},"riskAnalysis":[{"category":"...","level":"...","title":"...","mitigation":"..."}],"aiSuggestions":[{"title":"...","impact":"...","effort":"...","description":"..."}]}\n\n' +
    'Make ALL content specific to ' + project.industry + '. NO generic templates.';
};

const parseResponse = (text) => {
  let clean = text.trim();
  if (clean.startsWith('```json')) clean = clean.slice(7);
  if (clean.startsWith('```')) clean = clean.slice(3);
  if (clean.endsWith('```')) clean = clean.slice(0, -3);
  clean = clean.trim();
  
  try {
    const parsed = JSON.parse(clean);
    
    // Fix any non-string relationships to strings
    if (parsed.databaseDesign && parsed.databaseDesign.relationships) {
      parsed.databaseDesign.relationships = parsed.databaseDesign.relationships.map(r => {
        if (typeof r === 'string') return r;
        if (typeof r === 'object' && r !== null) {
          // Convert object to string description
          return (r.entity1 || 'Entity') + ' ' + (r.type || 'has') + ' ' + (r.entity2 || 'Entity');
        }
        return String(r);
      });
    }
    
    // Fix any non-string features to strings
    if (parsed.systemModules) {
      parsed.systemModules = parsed.systemModules.map(m => ({
        ...m,
        features: (m.features || []).map(f => typeof f === 'string' ? f : String(f))
      }));
    }
    
    // Fix any non-string attributes to strings
    if (parsed.databaseDesign && parsed.databaseDesign.entities) {
      parsed.databaseDesign.entities = parsed.databaseDesign.entities.map(e => ({
        ...e,
        attributes: (e.attributes || []).map(a => typeof a === 'string' ? a : String(a))
      }));
    }
    
    // Fix any non-string tasks to strings
    if (parsed.developmentRoadmap) {
      parsed.developmentRoadmap = parsed.developmentRoadmap.map(r => ({
        ...r,
        tasks: (r.tasks || []).map(t => typeof t === 'string' ? t : String(t))
      }));
    }
    
    return parsed;
  } catch (e) { 
    console.error('JSON parse failed: ' + e.message); 
    console.log('Raw: ' + clean.substring(0, 500));
    throw new Error('Invalid JSON'); 
  }
};

export const generateBlueprintWithAI = async (projectData) => {
  if (!GROQ_API_KEY) throw new Error('GROQ_API_KEY not set');
  const text = await callGroq(buildPrompt(projectData));
  return parseResponse(text);
};

export const testAIConnection = async () => {
  const text = await callGroq('Say "Groq AI is working" only.');
  return { success: true, message: text.trim() };
};
