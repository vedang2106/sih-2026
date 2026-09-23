import React, { useState, useEffect } from 'react';
import { Pickaxe, ShieldCheck, Activity, Cpu, Database, CheckCircle2, Server } from 'lucide-react';
import { api } from '../services/api';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Initializing GeoMine AI Core Systems...');
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'connected' | 'fallback'
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    let isMounted = true;

    // Step 1: Start initialization
    const timer1 = setTimeout(() => {
      if (!isMounted) return;
      setProgress(40);
      setCurrentStep(2);
      setStatusText('Connecting to FastAPI Backend & Vector Store...');
    }, 400);

    // Step 2: Check backend health
    api.getHealth()
      .then(data => {
        if (!isMounted) return;
        if (data && (data.status === 'ok' || data.backend_api === 'connected')) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('fallback');
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setBackendStatus('fallback');
      })
      .finally(() => {
        if (!isMounted) return;
        // Step 3: Data indexing
        setTimeout(() => {
          if (!isMounted) return;
          setProgress(75);
          setCurrentStep(3);
          setStatusText('Loading Geological Datasets & Topic Extractors...');

          // Step 4: Complete
          setTimeout(() => {
            if (!isMounted) return;
            setProgress(100);
            setCurrentStep(4);
            setStatusText('Platform Ready! Launching Executive Workspace...');

            setTimeout(() => {
              if (isMounted && onComplete) onComplete();
            }, 600);
          }, 600);
        }, 500);
      });

    return () => {
      isMounted = false;
      clearTimeout(timer1);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      
      {/* Background ambient glow effect */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-md space-y-8 text-center relative z-10">
        
        {/* Brand Logo & Glowing Ring */}
        <div className="relative inline-block mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 shadow-2xl flex items-center justify-center mx-auto relative group">
            <Pickaxe className="w-10 h-10 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)] animate-bounce" />
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-blue-500/20 blur-xl -z-10 animate-pulse"></div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-[11px] font-bold uppercase tracking-wider text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-blue-400 animate-spin" />
            <span>CMPDI AI Intelligence Platform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white">
            GeoMine <span className="text-blue-500">AI</span> Solution
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Automated Report Generation, Topic Word Cloud & AI Parliamentary RAG Assistant
          </p>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="space-y-3 bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              {statusText}
            </span>
            <span className="font-bold text-amber-400">{progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-400 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Connection Status Badge */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-slate-400" />
              Backend Link:
            </span>
            {backendStatus === 'checking' && (
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono text-[10px] animate-pulse">
                ● Connecting to API Host...
              </span>
            )}
            {backendStatus === 'connected' && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold">
                ● Hosted API Connected (FastAPI v3.0)
              </span>
            )}
            {backendStatus === 'fallback' && (
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[10px] font-bold">
                ● Local Fallback Pipeline Active
              </span>
            )}
          </div>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
          <div className={`p-2 rounded-lg border text-center transition ${currentStep >= 1 ? 'bg-blue-950/60 border-blue-500/40 text-blue-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
            1. Core UI
          </div>
          <div className={`p-2 rounded-lg border text-center transition ${currentStep >= 2 ? 'bg-blue-950/60 border-blue-500/40 text-blue-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
            2. Backend
          </div>
          <div className={`p-2 rounded-lg border text-center transition ${currentStep >= 3 ? 'bg-blue-950/60 border-blue-500/40 text-blue-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
            3. Datasets
          </div>
          <div className={`p-2 rounded-lg border text-center transition ${currentStep >= 4 ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
            4. Ready
          </div>
        </div>

        {/* Direct Bypass Button */}
        <div>
          <button
            onClick={() => onComplete && onComplete()}
            className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer transition"
          >
            Skip & Enter Workspace Immediately →
          </button>
        </div>

      </div>

      {/* Footer Govt Badge */}
      <div className="absolute bottom-6 text-[11px] text-slate-500 font-medium">
        Central Mine Planning & Design Institute • Coal India Limited (Ministry of Coal)
      </div>

    </div>
  );
}
