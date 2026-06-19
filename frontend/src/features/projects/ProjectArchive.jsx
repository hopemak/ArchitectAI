import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Trash2, Eye, Download, Clock, DollarSign, AlertTriangle, X, Sparkles, Loader2, FolderOpen } from 'lucide-react';
import { BlueprintViewer } from '../blueprint/BlueprintViewer';

const DeleteModal = ({ project, onConfirm, onCancel, isDeleting }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onCancel}>
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
      onClick={e => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-red-50 rounded-xl flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-red-600" /></div>
        <div><h3 className="font-semibold text-gray-900">Delete Project</h3><p className="text-sm text-gray-500">This cannot be undone.</p></div>
      </div>
      <p className="text-sm text-gray-600 mb-6">Delete <span className="font-semibold text-gray-900">"{project.name}"</span>?</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl">Cancel</button>
        <button onClick={onConfirm} disabled={isDeleting} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl disabled:opacity-50 flex items-center gap-2">
          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}{isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export const ProjectArchive = () => {
  const navigate = useNavigate();
  const { projects, isLoading, deleteProject, isDeleting } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToView, setProjectToView] = useState(null);

  const filtered = useMemo(() => projects.filter(p => {
    const ms = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const mf = filterStatus === 'all' || p.status === filterStatus;
    return ms && mf;
  }), [projects, searchQuery, filterStatus]);

  if (isLoading) return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded-lg w-1/3 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 animate-pulse"><div className="h-32 bg-gray-200 rounded-xl"/><div className="h-5 bg-gray-200 rounded w-3/4"/><div className="h-4 bg-gray-200 rounded w-1/2"/></div>)}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h1><p className="text-sm text-gray-500 mt-1">{projects.length} projects in workspace</p></div>
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
          <Sparkles className="h-4 w-4" />New Project
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search projects..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-all" />
        </div>
        <div className="relative"><Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer">
            <option value="all">All Status</option><option value="generated">Generated</option><option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
          <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><FolderOpen className="h-6 w-6" /></div>
          <h3 className="font-semibold text-gray-900">No Projects Found</h3>
          <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium">Create First Project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <motion.div key={project._id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                <div className="h-40 relative overflow-hidden">
                  <div style={{width:'100%',height:'100%',background:project.image,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'48px'}}>{project.icon}</div>
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${project.status==='generated'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>
                    {project.status === 'generated' ? 'Generated' : 'Pending'}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-base mb-1">{project.name}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{project.timeline}</div>
                    <div className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{project.budgetRange}</div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button onClick={() => setProjectToView(project)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />Preview
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button onClick={() => setProjectToDelete(project)} className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {projectToDelete && <DeleteModal project={projectToDelete} onConfirm={() => { deleteProject(projectToDelete._id); setProjectToDelete(null); }} onCancel={() => setProjectToDelete(null)} isDeleting={isDeleting} />}
        {projectToView && <BlueprintViewer project={projectToView} onClose={() => setProjectToView(null)} />}
      </AnimatePresence>
    </div>
  );
};
