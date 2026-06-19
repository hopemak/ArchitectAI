import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext.jsx';
import { useProjects } from '../../hooks/useProjects.js';
import { StatsWidgets } from './StatsWidgets.jsx';
import { Sparkles, Terminal, CheckCircle, FileText, Users, GitBranch, Layers, Code, Database, Shield, Lightbulb } from 'lucide-react';

const tabs = [
  { id: 'summary', name: 'Executive Summary', icon: FileText },
  { id: 'business', name: 'Business Analysis', icon: Users },
  { id: 'stories', name: 'User Stories', icon: GitBranch },
  { id: 'modules', name: 'System Modules', icon: Layers },
  { id: 'requirements', name: 'Requirements', icon: Code },
  { id: 'technical', name: 'Technical Spec', icon: Database },
  { id: 'risks', name: 'Risk Analysis', icon: Shield },
  { id: 'suggestions', name: 'AI Suggestions', icon: Lightbulb },
];

export const DashboardWorkspace = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { generateBlueprint, isGenerating } = useProjects();
  const [activeTab, setActiveTab] = useState('summary');
  const [blueprint, setBlueprint] = useState(null);
  const [generatedProject, setGeneratedProject] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    targetUsers: '',
    budgetRange: '',
    timeline: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    const missing = [];
    if (!formData.name.trim()) missing.push('Project Name');
    if (!formData.industry.trim()) missing.push('Industry');
    if (!formData.targetUsers.trim()) missing.push('Target Audience');
    if (!formData.budgetRange.trim()) missing.push('Budget');
    if (!formData.timeline.trim()) missing.push('Timeline');
    if (!formData.description.trim()) missing.push('Description');
    
    if (missing.length > 0) {
      addToast(`Please fill in: ${missing.join(', ')}`, 'error');
      return;
    }
    
    setBlueprint(null);
    setGeneratedProject(null);
    
    try {
      const response = await generateBlueprint(formData);
      if (response?.data?.project && response?.data?.blueprint) {
        setBlueprint(response.data.blueprint);
        setGeneratedProject(response.data.project);
        addToast('Blueprint generated successfully!', 'success');
      }
    } catch (err) {
      console.error('Generation error:', err);
    }
  };

  const getRiskColor = (level) => {
    if (level === 'High') return 'bg-red-50 text-red-700 border-red-200';
    if (level === 'Medium') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  const getImpactColor = (impact) => {
    if (impact === 'High') return 'text-emerald-600 bg-emerald-50';
    if (impact === 'Medium') return 'text-amber-600 bg-amber-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your workspace</p>
        </div>
        <button onClick={() => navigate('/projects')} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View All Projects →
        </button>
      </div>

      <StatsWidgets />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold">Generate Blueprint</h2>
          </div>
          
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Project Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                placeholder="e.g. Hero Team Tutorial" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" required />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Industry *</label>
                <input type="text" name="industry" value={formData.industry} onChange={handleInputChange}
                  placeholder="EdTech" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" required />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Timeline *</label>
                <input type="text" name="timeline" value={formData.timeline} onChange={handleInputChange}
                  placeholder="3 Months" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" required />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Target Audience *</label>
              <input type="text" name="targetUsers" value={formData.targetUsers} onChange={handleInputChange}
                placeholder="Students, Teachers" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" required />
            </div>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Budget *</label>
              <input type="text" name="budgetRange" value={formData.budgetRange} onChange={handleInputChange}
                placeholder="$25,000 - $40,000" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" required />
            </div>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4}
                placeholder="Describe your project idea in detail..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none" required />
            </div>
            
            <button type="submit" disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
              {isGenerating ? <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {isGenerating ? 'Generating...' : 'Generate Blueprint'}
            </button>
          </form>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2 space-y-6">
          {isGenerating && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4">
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              </div>
              <p className="text-center text-gray-500 text-sm">Generating your blueprint...</p>
            </div>
          )}

          {!isGenerating && !blueprint && (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Terminal className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Ready to Generate</h3>
              <p className="text-sm text-gray-500 max-w-sm">Fill in the form to generate your software architecture blueprint.</p>
            </div>
          )}

          {blueprint && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <div>
                  <h3 className="font-bold text-gray-900">Blueprint Generated!</h3>
                  <p className="text-sm text-gray-500">{generatedProject?.name} - {generatedProject?.industry}</p>
                </div>
              </div>
              
              <div className="border-b border-gray-200 bg-gray-50/50 px-2 overflow-x-auto flex gap-1 custom-scrollbar">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3.5 border-b-2 font-medium text-sm whitespace-nowrap transition-all ${activeTab===tab.id?'border-indigo-600 text-indigo-600':'border-transparent text-gray-500 hover:text-gray-700'}`}>
                    <tab.icon className="h-4 w-4" />{tab.name}
                  </button>
                ))}
              </div>
              
              <div className="p-6 text-sm leading-relaxed text-gray-700 max-h-[600px] overflow-y-auto custom-scrollbar">
                
                {/* EXECUTIVE SUMMARY */}
                {activeTab === 'summary' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Executive Summary</h3>
                    <p className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-gray-700 whitespace-pre-wrap leading-relaxed">{blueprint.executiveSummary}</p>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {[{label:'Duration',value:blueprint.costEstimation?.duration,icon:'⏱️'},{label:'Team',value:blueprint.costEstimation?.teamSize,icon:'👥'},{label:'Cost',value:blueprint.costEstimation?.estimatedCost,icon:'💰'}].map((item,i) => (
                        <div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-5 rounded-xl text-center">
                          <div className="text-3xl mb-2">{item.icon}</div>
                          <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">{item.label}</div>
                          <div className="text-lg font-extrabold text-indigo-900">{item.value || 'N/A'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* BUSINESS ANALYSIS */}
                {activeTab === 'business' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-red-500">!</span> Problems Solved</h4>
                      <div className="grid gap-2">
                        {blueprint.businessAnalysis?.problemsSolved?.map((item,idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-red-50/50 border border-red-100 rounded-xl p-4">
                            <span className="h-6 w-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{idx+1}</span>
                            <span className="text-gray-700 font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Target Users</h4>
                      <div className="flex flex-wrap gap-2">
                        {blueprint.businessAnalysis?.targetUsers?.map((user,idx) => (
                          <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-semibold border border-indigo-100">{user}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-emerald-600">✓</span> Business Value</h4>
                      <div className="grid gap-2">
                        {blueprint.businessAnalysis?.businessValue?.map((value,idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                            <span className="text-emerald-600">→</span>
                            <span className="text-gray-700 font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* USER STORIES */}
                {activeTab === 'stories' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-6">User Stories ({blueprint.userStories?.length || 0})</h3>
                    <div className="space-y-4">
                      {blueprint.userStories?.map((story,idx) => (
                        <div key={idx} className="border border-gray-100 rounded-xl p-5 bg-gradient-to-r from-gray-50/50 to-transparent">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold font-mono">{story.id}</span>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{story.role}</span>
                          </div>
                          <p className="text-gray-800 leading-relaxed">
                            As a <span className="font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">{story.role}</span>, I want to <span className="font-semibold text-gray-900">{story.want}</span>, so that <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">{story.reason}</span>.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SYSTEM MODULES */}
                {activeTab === 'modules' && (
                  <div className="grid gap-5">
                    {blueprint.systemModules?.map((module,idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">{idx+1}</div>
                          <div>
                            <h4 className="font-bold text-gray-900">{module.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {module.features?.map((feature,fidx) => (
                            <span key={fidx} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-100">{feature}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* REQUIREMENTS */}
                {activeTab === 'requirements' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Functional Requirements ({blueprint.functionalRequirements?.length || 0})</h3>
                      <div className="space-y-2">
                        {blueprint.functionalRequirements?.map((req,idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                            <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold font-mono shrink-0">FR-{String(idx+1).padStart(3,'0')}</span>
                            <span className="text-sm text-gray-700 font-medium">{req.replace(/^FR-\d+:\s*/,'')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Non-Functional Requirements ({blueprint.nonFunctionalRequirements?.length || 0})</h3>
                      <div className="space-y-2">
                        {blueprint.nonFunctionalRequirements?.map((req,idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-emerald-50/30 rounded-xl p-3.5 border border-emerald-100">
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold font-mono shrink-0">NFR-{String(idx+1).padStart(3,'0')}</span>
                            <span className="text-sm text-gray-700 font-medium">{req.replace(/^NFR-\d+:\s*/,'')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TECHNICAL SPEC */}
                {activeTab === 'technical' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">Architecture Stack</h4>
                      <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm space-y-3">
                        {blueprint.softwareArchitecture && Object.entries(blueprint.softwareArchitecture).map(([key,value]) => (
                          <div key={key} className="flex items-start gap-3">
                            <span className="text-indigo-400 font-bold min-w-[120px] capitalize">{key}:</span>
                            <span className="text-green-300">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">Database Schema</h4>
                      <div className="grid gap-4">
                        {blueprint.databaseDesign?.entities?.map((entity,idx) => (
                          <div key={idx} className="border border-gray-200 rounded-xl p-5 bg-gradient-to-r from-gray-50/50 to-transparent">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold font-mono">{entity.name}</span>
                              <span className="text-xs text-gray-400">PK: {entity.primaryKey}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {entity.attributes?.map((attr,aidx) => (
                                <span key={aidx} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-mono">{attr}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <h4 className="text-sm font-bold text-indigo-900 mb-2">Relationships</h4>
                        <div className="space-y-1">
                          {blueprint.databaseDesign?.relationships?.map((rel,idx) => (
                            <div key={idx} className="text-sm text-indigo-700 font-mono">↳ {rel}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">API Endpoints ({blueprint.apiBlueprint?.length || 0})</h4>
                      <div className="space-y-2">
                        {blueprint.apiBlueprint?.map((api,idx) => (
                          <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${api.method==='GET'?'bg-blue-100 text-blue-700':api.method==='POST'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>{api.method}</span>
                            <code className="text-sm font-mono text-gray-800 flex-1">{api.endpoint}</code>
                            <span className="text-xs text-gray-500">{api.description}</span>
                            {api.auth && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">AUTH</span>}
                            {api.admin && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-bold">ADMIN</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* RISK ANALYSIS */}
                {activeTab === 'risks' && (
                  <div className="grid gap-4">
                    {blueprint.riskAnalysis?.map((risk,idx) => (
                      <div key={idx} className={`bg-white rounded-2xl border p-6 ${getRiskColor(risk.level)}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">⚠️</span>
                            <h4 className="font-bold">{risk.title}</h4>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${risk.level==='High'?'bg-red-100 text-red-700':risk.level==='Medium'?'bg-amber-100 text-amber-700':'bg-emerald-100 text-emerald-700'}`}>{risk.level} Risk</span>
                        </div>
                        <div className="text-sm opacity-80 mb-2 font-medium">Category: {risk.category}</div>
                        <div className="bg-white/50 rounded-xl p-4 mt-3">
                          <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Mitigation Strategy</div>
                          <div className="text-sm leading-relaxed">{risk.mitigation}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* AI SUGGESTIONS */}
                {activeTab === 'suggestions' && (
                  <div>
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-6 mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="h-6 w-6 text-indigo-600" />
                        <h3 className="text-lg font-bold text-indigo-900">AI-Generated Improvement Suggestions</h3>
                      </div>
                      <p className="text-indigo-700 text-sm">Based on your project description, here are features that could enhance your platform.</p>
                    </div>
                    <div className="grid gap-4">
                      {blueprint.aiSuggestions?.map((suggestion,idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">{idx+1}</div>
                              <h4 className="font-bold text-gray-900">{suggestion.title}</h4>
                            </div>
                            <div className="flex gap-2">
                              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getImpactColor(suggestion.impact)}`}>{suggestion.impact} Impact</span>
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">{suggestion.effort} Effort</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{suggestion.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
