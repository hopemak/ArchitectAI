import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Circle, ArrowRight } from 'lucide-react';

export const RoadmapTimeline = ({ phases }) => {
  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Development Roadmap</h3>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500" />
          
          <div className="space-y-8">
            {phases.map((phase, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="relative flex gap-6"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${idx === 0 ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200' : 'bg-gray-200 text-gray-500'}`}>
                    {idx === 0 ? <Clock className="h-5 w-5" /> : idx + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900">{phase.phase}</h4>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold">{phase.duration}</span>
                  </div>
                  <div className="space-y-2">
                    {phase.tasks.map((task, tidx) => (
                      <div key={tidx} className="flex items-center gap-2 text-sm text-gray-600">
                        <Circle className="h-3 w-3 text-indigo-400 fill-indigo-400" />
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
