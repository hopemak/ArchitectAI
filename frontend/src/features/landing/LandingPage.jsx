import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, FileText, Code, Database, Globe, Shield, Layers } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: FileText, title: 'Executive Summary', desc: 'AI-generated project overview with business goals and scope' },
    { icon: Code, title: 'Requirements', desc: '20+ functional & non-functional requirements with professional numbering' },
    { icon: Database, title: 'Database Design', desc: 'Complete entity-relationship diagrams and schema definitions' },
    { icon: Globe, title: 'API Blueprint', desc: 'RESTful endpoint design with methods, payloads, and responses' },
    { icon: Layers, title: 'Architecture', desc: 'Technology stack recommendations with justification' },
    { icon: Shield, title: 'Risk Analysis', desc: 'Technical, business, and security risk assessment' },
  ];

  const steps = [
    { num: '01', title: 'Describe Your Idea', desc: 'Enter project name, industry, target users, and vision' },
    { num: '02', title: 'AI Analysis', desc: 'Gemini 2.5 Flash analyzes and structures your requirements' },
    { num: '03', title: 'Get Blueprint', desc: 'Download complete SRS document with architecture diagrams' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Architect<span className="text-indigo-600">AI</span></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">How it Works</a>
            <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-indigo-200 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-6">
              <Zap className="h-4 w-4" /> Powered by Gemini 2.5 Flash
            </div>
            <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
              Transform<br />
              Ideas Into<br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Production-ready
              </span><br />
              Blueprints
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              AI-powered software planning platform that generates complete architecture blueprints, 
              requirements specifications, and development roadmaps from your project ideas.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/dashboard')} className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-indigo-200 transition-all flex items-center gap-2 group">
                Start Building
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('/dashboard')} className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold text-lg hover:border-indigo-300 hover:text-indigo-700 transition-all">
                View Demo
              </button>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-gray-400">
              <span className="flex items-center gap-2">✓ No credit card required</span>
              <span className="flex items-center gap-2">✓ Free forever plan</span>
              <span className="flex items-center gap-2">✓ Export to PDF</span>
            </div>
          </motion.div>

          {/* Hero Visual - Floating Cards */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl" />
            
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 right-8 bg-white rounded-2xl p-5 shadow-xl shadow-indigo-100/50 border border-gray-100 w-72">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm">Executive Summary</div>
                  <div className="text-xs text-gray-400">Generated 2 min ago</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-lg p-3">
                E-Commerce platform enabling local merchants to sell products online with integrated payments...
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-48 left-4 bg-white rounded-2xl p-5 shadow-xl shadow-purple-100/50 border border-gray-100 w-64">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                  <Code className="h-4 w-4" />
                </div>
                <span className="font-bold text-sm">42 Requirements</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded font-mono font-bold">FR-001</span>
                  <span className="text-gray-600">User Authentication</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded font-mono font-bold">FR-002</span>
                  <span className="text-gray-600">Product Catalog</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded font-mono font-bold">FR-003</span>
                  <span className="text-gray-600">Shopping Cart</span>
                </div>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-24 right-16 bg-white rounded-2xl p-5 shadow-xl shadow-pink-100/50 border border-gray-100 w-60">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  <Database className="h-4 w-4" />
                </div>
                <span className="font-bold text-sm">Architecture</span>
              </div>
              <div className="bg-gray-900 rounded-xl p-3 font-mono text-xs text-gray-300 space-y-1.5">
                <div><span className="text-indigo-400">Frontend:</span> React + Vite</div>
                <div><span className="text-indigo-400">Backend:</span> Node.js + Express</div>
                <div><span className="text-indigo-400">Database:</span> MongoDB Atlas</div>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-8 left-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 shadow-xl text-white w-52">
              <div className="text-xs font-medium opacity-80 mb-1">Estimated Cost</div>
              <div className="text-2xl font-black">$32,000</div>
              <div className="text-xs opacity-80 mt-1">11 Weeks • 4 Engineers</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">Everything You Need to Plan Software</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              From idea to implementation-ready documentation in minutes, not weeks.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                <div className="h-12 w-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">How It Works</h2>
            <p className="text-lg text-gray-500">Three simple steps to your complete software blueprint</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-7xl font-black text-gray-100 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-12 right-0 w-full h-px bg-gradient-to-r from-gray-200 to-transparent" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-black tracking-tight mb-6">Ready to Build Your Blueprint?</h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of developers and product managers who use ArchitectAI to plan their software projects.
          </p>
          <button onClick={() => navigate('/dashboard')} className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all">
            Get Started Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold">Architect<span className="text-indigo-600">AI</span></span>
          </div>
          <div className="text-sm text-gray-400">© 2026 ArchitectAI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
