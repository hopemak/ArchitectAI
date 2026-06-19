import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, Clock, TrendingUp, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

const defaultData = [
  { name: 'Frontend Dev', hours: 120, rate: 45, color: '#6366f1' },
  { name: 'Backend Dev', hours: 140, rate: 50, color: '#8b5cf6' },
  { name: 'UI/UX Design', hours: 60, rate: 40, color: '#ec4899' },
  { name: 'DevOps', hours: 40, rate: 55, color: '#10b981' },
  { name: 'QA Testing', hours: 50, rate: 35, color: '#f59e0b' },
  { name: 'Project Mgmt', hours: 30, rate: 60, color: '#3b82f6' },
];

export const CostEstimator = () => {
  const [teamSize, setTeamSize] = useState(4);
  const [duration, setDuration] = useState(11);
  const [hourlyRate, setHourlyRate] = useState(45);

  const chartData = defaultData.map(d => ({
    ...d,
    cost: d.hours * d.rate,
    adjustedCost: Math.round(d.hours * d.rate * (teamSize / 4) * (duration / 11))
  }));

  const totalCost = chartData.reduce((sum, d) => sum + d.adjustedCost, 0);
  const totalHours = chartData.reduce((sum, d) => sum + d.hours, 0);

  const pieData = chartData.map(d => ({ name: d.name, value: d.adjustedCost }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Cost Estimator</h2>
          <p className="text-sm text-gray-500">Interactive budget breakdown</p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Team Size</label>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <input type="number" min="1" max="20" value={teamSize} onChange={e => setTeamSize(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500" />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Weeks</label>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <input type="number" min="1" max="52" value={duration} onChange={e => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500" />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Avg Rate ($/hr)</label>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <input type="number" min="10" max="200" value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500" />
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estimated Total</div>
          <div className="text-3xl font-black text-indigo-900">${totalCost.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Hours</div>
          <div className="text-xl font-bold text-indigo-700">{totalHours * teamSize} hrs</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-3">Cost by Role</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{fontSize: 11}} interval={0} angle={-20} textAnchor="end" height={60} />
              <YAxis tick={{fontSize: 11}} tickFormatter={v => '$' + v/1000 + 'k'} />
              <Tooltip formatter={v => '$' + v.toLocaleString()} />
              <Bar dataKey="adjustedCost" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-3">Cost Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={v => '$' + v.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {pieData.map((entry, i) => (
              <span key={i} className="text-xs flex items-center gap-1">
                <span className="h-2 w-2 rounded-full" style={{background: COLORS[i]}} />{entry.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
