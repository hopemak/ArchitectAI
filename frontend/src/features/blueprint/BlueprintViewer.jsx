import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Users, Code, Database, Shield, Lightbulb, 
  Layers, GitBranch, AlertTriangle, X, Download, Sparkles, ChevronRight, Loader2
} from 'lucide-react';
import { mockBlueprint } from '../../services/mockData';
import { exportBlueprintToPDF } from '../../utils/pdfExport';

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

export const BlueprintViewer = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [isExporting, setIsExporting] = useState(false);
  const bp = mockBlueprint;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportBlueprintToPDF(project?.name || 'Blueprint', 'blueprint-content');
    } catch (err) {
      console.error('Export failed:', err);
    }
    setIsExporting(false);
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
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
              📋
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{project?.name || 'Software Blueprint'}</h2>
              <p className="text-sm text-gray-500 mt-0.5">Generated {new Date().toLocaleDateString()} • {project?.industry}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExport} 
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} 
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </button>
            <button onClick={onClose} className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-white overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div id="blueprint-content" className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-8"
            >
              {/* EXECUTIVE SUMMARY */}
              {activeTab === 'summary' && (
                <div className="max-w-4xl">
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-base">{bp.executiveSummary}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-5">
                    {[
                      { label: 'Duration', value: bp.costEstimation.duration, icon: '⏱️', color: 'from-blue-500 to-indigo-600' },
                      { label: 'Team Size', value: bp.costEstimation.teamSize, icon: '👥', color: 'from-purple-500 to-pink-600' },
                      { label: 'Budget', value: bp.costEstimation.estimatedCost, icon: '💰', color: 'from-emerald-500 to-teal-600' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-3">{item.icon}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{item.label}</div>
                        <div className={`text-xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BUSINESS ANALYSIS */}
              {activeTab === 'business' && (
                <div className="max-w-4xl space-y-6">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="h-8 w-8 bg-red-50 rounded-lg flex items-center justify-center text-red-600 text-sm">!</span>
                      Problems Solved
                    </h3>
                    <div className="grid gap-3">
                      {bp.businessAnalysis.problemsSolved.map((problem, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-red-50/50 border border-red-100 rounded-xl p-4">
                          <span className="h-6 w-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</span>
                          <span className="text-gray-700 font-medium">{problem}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Target Users</h3>
                    <div className="flex flex-wrap gap-2">
                      {bp.businessAnalysis.targetUsers.map((user, idx) => (
                        <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-semibold border border-indigo-100">
                          {user}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-emerald-600 text-lg">✓</span>
                      Business Value
                    </h3>
                    <div className="grid gap-3">
                      {bp.businessAnalysis.businessValue.map((value, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                          <ChevronRight className="h-5 w-5 text-emerald-600" />
                          <span className="text-gray-700 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* USER STORIES */}
              {activeTab === 'stories' && (
                <div className="max-w-4xl">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">User Stories ({bp.userStories.length})</h3>
                    <div className="space-y-4">
                      {bp.userStories.map((story, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50/50 to-transparent">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold font-mono">{story.id}</span>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{story.role}</span>
                          </div>
                          <p className="text-gray-800 leading-relaxed">
                            <span className="text-gray-400">As a </span>
                            <span className="font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">{story.role}</span>
                            <span className="text-gray-400">, I want to </span>
                            <span className="font-semibold text-gray-900">{story.want}</span>
                            <span className="text-gray-400">, so that </span>
                            <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">{story.reason}</span>
                            <span className="text-gray-400">.</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SYSTEM MODULES */}
              {activeTab === 'modules' && (
                <div className="max-w-4xl">
                  <div className="grid gap-5">
                    {bp.systemModules.map((module, idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                              {idx + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{module.name}</h4>
                              <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {module.features.map((feature, fidx) => (
                            <span key={fidx} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-100">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REQUIREMENTS */}
              {activeTab === 'requirements' && (
                <div className="max-w-4xl space-y-6">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Functional Requirements ({bp.functionalRequirements.length})</h3>
                    <div className="space-y-2">
                      {bp.functionalRequirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                          <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold font-mono shrink-0">FR-{String(idx+1).padStart(3,'0')}</span>
                          <span className="text-sm text-gray-700 font-medium">{req.replace(/^FR-\d+:\s*/, '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Non-Functional Requirements ({bp.nonFunctionalRequirements.length})</h3>
                    <div className="space-y-2">
                      {bp.nonFunctionalRequirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-emerald-50/30 rounded-xl p-3.5 border border-emerald-100">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold font-mono shrink-0">NFR-{String(idx+1).padStart(3,'0')}</span>
                          <span className="text-sm text-gray-700 font-medium">{req.replace(/^NFR-\d+:\s*/, '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TECHNICAL SPEC */}
              {activeTab === 'technical' && (
                <div className="max-w-4xl space-y-6">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Architecture Stack</h3>
                    <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm space-y-3">
                      {Object.entries(bp.softwareArchitecture).map(([key, value]) => (
                        <div key={key} className="flex items-start gap-3">
                          <span className="text-indigo-400 font-bold min-w-[120px] capitalize">{key}:</span>
                          <span className="text-green-300">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Database Schema</h3>
                    <div className="grid gap-4">
                      {bp.databaseDesign.entities.map((entity, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-xl p-5 bg-gradient-to-r from-gray-50/50 to-transparent">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold font-mono">{entity.name}</span>
                            <span className="text-xs text-gray-400">PK: {entity.primaryKey}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {entity.attributes.map((attr, aidx) => (
                              <span key={aidx} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-mono">{attr}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                      <h4 className="text-sm font-bold text-indigo-900 mb-2">Relationships</h4>
                      <div className="space-y-1">
                        {bp.databaseDesign.relationships.map((rel, idx) => (
                          <div key={idx} className="text-sm text-indigo-700 font-mono flex items-center gap-2">
                            <GitBranch className="h-4 w-4" /> {rel}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">API Endpoints ({bp.apiBlueprint.length})</h3>
                    <div className="space-y-2">
                      {bp.apiBlueprint.map((api, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${api.method === 'GET' ? 'bg-blue-100 text-blue-700' : api.method === 'POST' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {api.method}
                          </span>
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
                <div className="max-w-4xl">
                  <div className="grid gap-4">
                    {bp.riskAnalysis.map((risk, idx) => (
                      <div key={idx} className={`bg-white rounded-2xl border p-6 ${getRiskColor(risk.level)}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5" />
                            <h4 className="font-bold">{risk.title}</h4>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${risk.level === 'High' ? 'bg-red-100 text-red-700' : risk.level === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {risk.level} Risk
                          </span>
                        </div>
                        <div className="text-sm opacity-80 mb-2 font-medium">Category: {risk.category}</div>
                        <div className="bg-white/50 rounded-xl p-4 mt-3">
                          <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Mitigation Strategy</div>
                          <div className="text-sm leading-relaxed">{risk.mitigation}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI SUGGESTIONS */}
              {activeTab === 'suggestions' && (
                <div className="max-w-4xl">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-6 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="h-6 w-6 text-indigo-600" />
                      <h3 className="text-lg font-bold text-indigo-900">AI-Generated Improvement Suggestions</h3>
                    </div>
                    <p className="text-indigo-700 text-sm">Based on your project description, here are features that could enhance your platform.</p>
                  </div>
                  <div className="grid gap-4">
                    {bp.aiSuggestions.map((suggestion, idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                              {idx + 1}
                            </div>
                            <h4 className="font-bold text-gray-900">{suggestion.title}</h4>
                          </div>
                          <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getImpactColor(suggestion.impact)}`}>
                              {suggestion.impact} Impact
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">
                              {suggestion.effort} Effort
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{suggestion.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
