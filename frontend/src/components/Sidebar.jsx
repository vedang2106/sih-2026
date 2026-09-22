import React from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  FileText, 
  CloudRain, 
  MessageSquareCode, 
  BarChart3, 
  Layers
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'digitization', label: 'Documents & OCR', icon: FileSearch, badge: null },
    { id: 'report-generator', label: 'Report Generator', icon: FileText, badge: null },
    { id: 'word-cloud', label: 'Word Cloud & Topics', icon: CloudRain, badge: null },
    { id: 'parliamentary-rag', label: 'AI Assistant & RAG', icon: MessageSquareCode, badge: null },
    { id: 'impact-metrics', label: 'Evaluation & Health', icon: BarChart3, badge: null },
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

      </div>

      <div className="p-3.5 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
        <span>CMPDI AI Intelligence</span>
        <span className="font-mono text-slate-600 font-semibold">v3.0 Production</span>
      </div>
    </aside>
  );
}
