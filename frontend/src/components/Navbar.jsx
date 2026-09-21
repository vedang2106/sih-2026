import React, { useState, useEffect } from 'react';
import { SUBSIDIARIES } from '../data/mockData';
import { api } from '../services/api';
import { Pickaxe, ShieldCheck, Building2, Activity, Award } from 'lucide-react';

export default function Navbar({ selectedSubsidiary, setSelectedSubsidiary, activeTab, setActiveTab, onOpenMetricsModal }) {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    let isMounted = true;
    api.getHealth()
      .then(data => { if (isMounted) setHealth(data); })
      .catch(() => { if (isMounted) setHealth({ status: 'degraded', backend_api: 'disconnected' }); });
    return () => { isMounted = false; };
  }, []);

  const isConnected = health && (health.status === 'ok' || health.backend_api === 'connected');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 lg:px-8 py-3 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
            <Pickaxe className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 font-heading">CMPDI <span className="text-blue-600">AI</span></span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">Govt Intelligence</span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">AI-Powered Geological, Mining & Parliamentary Intelligence</p>
          </div>
        </div>

        {/* Center: Subsidiary Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs">
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-500 hidden md:inline font-medium">Subsidiary:</span>
            <select
              value={selectedSubsidiary}
              onChange={(e) => setSelectedSubsidiary(e.target.value)}
              className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer pr-2"
            >
              <option value="ALL">All CIL Subsidiaries & CMPDI</option>
              {SUBSIDIARIES.map(sub => (
                <option key={sub.id} value={sub.id}>
                  {sub.id} - {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Health & Evaluation Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMetricsModal}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition cursor-pointer text-xs font-semibold"
          >
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Evaluation & ROI Metrics</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className="text-slate-700 font-mono text-[11px] font-medium">
              {isConnected ? 'Backend API ● Connected' : 'Local Fallback Active'}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
