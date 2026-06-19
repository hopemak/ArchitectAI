import React from 'react';
import { motion } from 'framer-motion';
import { Folder, FileCheck, Clock, TrendingUp } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects.js';

export const StatsWidgets = () => {
  const { stats } = useProjects();

  const widgets = [
    { 
      label: 'Total Projects', 
      value: stats.totalProjects, 
      icon: Folder, 
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Generated', 
      value: stats.generatedBlueprints, 
      icon: FileCheck, 
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    { 
      label: 'Pending', 
      value: stats.pendingBlueprints, 
      icon: Clock, 
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    { 
      label: 'Completion Rate', 
      value: stats.totalProjects > 0 
        ? Math.round((stats.generatedBlueprints / stats.totalProjects) * 100) + '%'
        : '0%', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {widgets.map((widget, i) => (
        <motion.div
          key={widget.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`h-10 w-10 ${widget.bgColor} rounded-xl flex items-center justify-center`}>
              <widget.icon className={`h-5 w-5 ${widget.textColor}`} />
            </div>
            <span className={`text-2xl font-black bg-gradient-to-r ${widget.color} bg-clip-text text-transparent`}>
              {widget.value}
            </span>
          </div>
          <div className="text-sm font-medium text-gray-500">{widget.label}</div>
        </motion.div>
      ))}
    </div>
  );
};
