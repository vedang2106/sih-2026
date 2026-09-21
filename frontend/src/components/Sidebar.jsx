import React from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  FileText, 
  CloudRain, 
  MessageSquareCode, 
  BarChart3, 
  Layers, 
  Database,
  Activity
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'digitization', label: 'Documents & OCR', icon: FileSearch, badge: 'Pipeline' },
    { id: 'report-generator', label: 'Report Generator', icon: FileText, badge: 'Module 1' },
    { id: 'word-cloud', label: 'Word Cloud & Topics', icon: CloudRain, badge: 'Module 2' },
    { id: 'parliamentary-rag', label: 'AI Assistant & RAG', icon: MessageSquareCode, badge: 'Module 3' },
    { id: 'impact-metrics', label: 'Evaluation & Health', icon: BarChart3, badge: 'Measured' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)]">
      <div className="p-4 space-y-6">
        
        <div>
          <div className="px-3 mb-2 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Navigation</span>
            <Layers className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium text-xs transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isActive 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Database Repository Info Box */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>MongoDB & Vector DB</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-mono font-bold">Indexed</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Multi-modal document store, ChromaDB semantic embeddings & line-item audit trail.
          </p>
        </div>

      </div>

      <div className="p-3.5 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
        <span>CMPDI AI Intelligence</span>
        <span className="font-mono text-slate-600 font-semibold">v3.0 Production</span>
      </div>
    </aside>
  );
}
