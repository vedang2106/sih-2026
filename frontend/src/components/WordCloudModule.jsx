import React, { useState, useEffect } from 'react';
import { WORD_CLOUD_TOPICS } from '../data/mockData';
import { api } from '../services/api';
import { 
  CloudRain, 
  Filter, 
  Search, 
  FileText, 
  Hash, 
  Tag
} from 'lucide-react';

export default function WordCloudModule({ selectedSubsidiary }) {
  const [topics, setTopics] = useState(WORD_CLOUD_TOPICS);
  const [targetCategory, setTargetCategory] = useState('ALL');
  const [minWeight, setMinWeight] = useState(70);
  const [selectedTopic, setSelectedTopic] = useState(WORD_CLOUD_TOPICS[0]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;
    api.getTopics(selectedSubsidiary, targetCategory)
      .then(res => {
        if (isMounted) {
          if (res && res.topics && res.topics.length > 0) {
            const apiTopics = res.topics.map(t => ({ ...t, isDynamic: true }));
            const existing = new Set(apiTopics.map(t => t.text.toLowerCase()));
            const staticBaseline = WORD_CLOUD_TOPICS.filter(t => !existing.has(t.text.toLowerCase()));
            const combined = [...apiTopics, ...staticBaseline];
            setTopics(combined);
            if (!selectedTopic) setSelectedTopic(combined[0]);
          } else {
            setTopics(WORD_CLOUD_TOPICS);
            if (!selectedTopic) setSelectedTopic(WORD_CLOUD_TOPICS[0]);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setTopics(WORD_CLOUD_TOPICS);
          if (!selectedTopic) setSelectedTopic(WORD_CLOUD_TOPICS[0]);
        }
      });
    return () => { isMounted = false; };
  }, [selectedSubsidiary, targetCategory]);

  const filteredTopics = topics.filter((item) => {
    const catMatch = targetCategory === 'ALL' || item.category === targetCategory;
    const weightMatch = item.weight >= minWeight;
    const searchMatch = item.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));
    return catMatch && weightMatch && searchMatch;
  });

  const categories = ['ALL', 'Mining Operations', 'Safety & Rehabilitation', 'CMPDI Exploration', 'Coal Quality & Grade', 'Beneficiation', 'Environment', 'Clean Coal Technology'];

  const getTopicColor = (weight) => {
    if (weight >= 90) return 'text-amber-700 font-extrabold hover:scale-105';
    if (weight >= 85) return 'text-emerald-700 font-bold hover:scale-105';
    if (weight >= 80) return 'text-blue-700 font-bold hover:scale-105';
    if (weight >= 75) return 'text-purple-700 font-semibold';
    return 'text-slate-700 font-medium';
  };

  const getFontSize = (weight) => {
    const size = Math.max(12, Math.min(32, Math.floor(weight / 2.8)));
    return `${size}px`;
  };

  const formatTopicText = (text) => {
    if (!text) return '';
    if (text.includes('ANNUAL_GEOLOGICAL_EXPLORATION_REPORT_TEST_DATA')) {
      return 'Geological Exploration & Drill Log NLP';
    }
    if (text.includes('ANNUAL_GEOLOGICAL_EXPLORATION_REPORT')) {
      return 'Geological Exploration Report';
    }
    return text.replace(/_/g, ' ');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-xs border border-blue-100">
              Module 2
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-heading">Automated Word Cloud & Topic Identification</h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            NLP TF-IDF keyword clustering and topic extraction from uploaded geological, mining, and parliamentary documents.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search topic clusters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Controls Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700 border border-slate-300 mr-1">
            ● Static Category Taxonomy
          </span>
          <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setTargetCategory(cat)}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                targetCategory === cat
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-slate-600 font-medium">Min Weight: <strong className="text-blue-700 font-mono">{minWeight}</strong></span>
          <input
            type="range"
            min="60"
            max="95"
            value={minWeight}
            onChange={(e) => setMinWeight(Number(e.target.value))}
            className="w-24 accent-blue-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Interactive Word Cloud Canvas (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-blue-600" />
              <span>Extracted Topic Cloud</span>
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                ● Dynamic NLP Data
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700 border border-slate-300">
                ● Static Baseline Topics
              </span>
              <span className="text-xs text-slate-500 font-mono">{filteredTopics.length} Topics Loaded</span>
            </div>
          </div>

          <div className="min-h-[380px] p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-center gap-3 sm:gap-4 relative overflow-hidden">
            {filteredTopics.map((topic, idx) => {
              const isSelected = selectedTopic?.text === topic.text;
              const formattedName = formatTopicText(topic.text);
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedTopic(topic)}
                  style={{ fontSize: getFontSize(topic.weight) }}
                  className={`transition-all duration-200 cursor-pointer select-none leading-none p-2 rounded-xl flex items-center gap-1.5 ${getTopicColor(topic.weight)} ${
                    isSelected ? 'ring-2 ring-blue-600 bg-white shadow-md font-extrabold z-10' : 'hover:bg-slate-100/80'
                  }`}
                >
                  <span>{formattedName}</span>
                  {topic.isDynamic ? (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                      DYNAMIC
                    </span>
                  ) : (
                    <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 border border-slate-300 shadow-2xs">
                      STATIC
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Topic Details (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-5">
          {selectedTopic ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Topic Keyword Inspector</span>
                    {selectedTopic.isDynamic ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ● Dynamic User Extraction
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-slate-100 text-slate-700 border border-slate-300">
                        ● Static Baseline Topic
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading mt-1">{formatTopicText(selectedTopic.text)}</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-mono font-bold border border-blue-100 shrink-0">
                  Weight: {selectedTopic.weight}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Document Mentions</div>
                  <div className="text-base font-bold text-slate-900 font-mono">{selectedTopic.count || 42}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Cluster Category</div>
                  <div className="text-xs font-bold text-blue-700 mt-1">{selectedTopic.category}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Document Evidence Snippet</span>
                </h4>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between text-[11px] text-blue-700 font-semibold">
                    <span>CMPDI_Geological_Exploration_FY25.pdf</span>
                    <span>Page 42</span>
                  </div>
                  <p className="italic text-slate-600">
                    "...Exploratory core drilling confirmed high-density occurrence of <strong className="text-amber-700 font-bold bg-amber-100 px-1 rounded">{formatTopicText(selectedTopic.text)}</strong> across mine blocks under CIL command area..."
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 text-xs">
              Click any word node in the cloud to inspect topic relevance.
            </div>
          )}

          <div className="space-y-2 pt-3 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top Topic Clusters</h4>
            <div className="max-h-[160px] overflow-y-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[9px] font-semibold">
                  <tr>
                    <th className="p-2">Topic Keyword</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Data Origin</th>
                    <th className="p-2">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white font-mono text-[11px]">
                  {filteredTopics.slice(0, 6).map((t, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2 font-sans text-slate-900 font-medium">{formatTopicText(t.text)}</td>
                      <td className="p-2 text-slate-500 text-[10px] font-sans">{t.category}</td>
                      <td className="p-2">
                        {t.isDynamic ? (
                          <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                            DYNAMIC
                          </span>
                        ) : (
                          <span className="text-[8px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            STATIC
                          </span>
                        )}
                      </td>
                      <td className="p-2 text-blue-700 font-bold">{t.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
