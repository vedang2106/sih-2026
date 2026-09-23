import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import DigitizationModule from './components/DigitizationModule';
import ReportGeneratorModule from './components/ReportGeneratorModule';
import WordCloudModule from './components/WordCloudModule';
import ParliamentaryQAModule from './components/ParliamentaryQAModule';
import ImpactMetricsModal from './components/ImpactMetricsModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('ALL');
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        selectedSubsidiary={selectedSubsidiary}
        setSelectedSubsidiary={setSelectedSubsidiary}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMetricsModal={() => setIsMetricsModalOpen(true)}
      />

      {/* Main Container Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Right Dynamic Tab Content View */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <ExecutiveDashboard
              selectedSubsidiary={selectedSubsidiary}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'digitization' && (
            <DigitizationModule
              selectedSubsidiary={selectedSubsidiary}
            />
          )}

          {activeTab === 'report-generator' && (
            <ReportGeneratorModule
              selectedSubsidiary={selectedSubsidiary}
            />
          )}

          {activeTab === 'word-cloud' && (
            <WordCloudModule
              selectedSubsidiary={selectedSubsidiary}
            />
          )}

          {activeTab === 'parliamentary-rag' && (
            <ParliamentaryQAModule
              selectedSubsidiary={selectedSubsidiary}
            />
          )}

          {activeTab === 'impact-metrics' && (
            <div className="glass-panel p-8 rounded-3xl space-y-6 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white font-heading">Quantified System Benefits & ROI Impact</h2>
              <p className="text-sm text-slate-300">
                GeoMine AI delivers 88.5% report preparation time reduction, 98.6% extraction accuracy, and 92.4% workflow automation for CMPDI & Coal India Limited subsidiaries.
              </p>
              <button
                onClick={() => setIsMetricsModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Open Full Impact Metrics Modal
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Impact Metrics Modal Overlay */}
      <ImpactMetricsModal
        isOpen={isMetricsModalOpen}
        onClose={() => setIsMetricsModalOpen(false)}
      />

    </div>
  );
}
