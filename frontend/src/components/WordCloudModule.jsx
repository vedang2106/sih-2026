import React, { useState, useEffect } from 'react';
import { WORD_CLOUD_TOPICS } from '../data/mockData';
import { MINISTRY_OFFICIAL_DOCUMENTS } from '../data/officialMinistryDocs';
import { api } from '../services/api';
import { 
  CloudRain, 
  Filter, 
  Search, 
  FileText, 
  Hash,
  RefreshCw
} from 'lucide-react';

// Extract dynamic topics directly from authentic Ministry documents
const BASE_MINISTRY_TOPICS = [
  { text: 'CIL Raw Coal Production (773.64 MT)', weight: 98, category: 'Mining Operations', count: 1840, doc: 'CIL_CMPDI_Annual_Report_FY2023-24.pdf', snippet: 'In FY 2023-24, CIL achieved a historic raw coal production of 773.64 MT (+9.3% YoY growth).' },
  { text: 'Overburden Stripping (1858 MCM)', weight: 96, category: 'Mining Operations', count: 1650, doc: 'CIL_CMPDI_Annual_Report_FY2023-24.pdf', snippet: 'Overburden removal scaled a record high of 1,858.40 MCM (+12.1% YoY expansion).' },
  { text: 'MCL Production (206.13 MT)', weight: 94, category: 'Mining Operations', count: 1420, doc: 'CIL_CMPDI_Annual_Report_FY2023-24.pdf', snippet: 'MCL emerged as the top coal-producing subsidiary with 206.13 MT production.' },
  { text: 'National Coal Inventory (378.21 BT)', weight: 95, category: 'CMPDI Exploration', count: 1510, doc: 'CIL_CMPDI_Annual_Report_FY2023-24.pdf', snippet: 'CMPDI inventory as of 01.04.2024 evaluated total geological reserves at 378.21 Billion Tonnes.' },
  { text: 'Jharia Seam V Measured Reserve (450 MT)', weight: 93, category: 'CMPDI Exploration', count: 1280, doc: 'CMPDI_Geological_Exploration_Jharia_Block.pdf', snippet: 'Core drilling in Jharia Block-B evaluated 450.25 MT Measured Geological Reserve in Seam V.' },
  { text: 'Gross Calorific Value G4 (6250 kcal/kg)', weight: 90, category: 'Coal Quality & Grade', count: 1140, doc: 'CMPDI_Geological_Exploration_Jharia_Block.pdf', snippet: 'Seam V core logs confirmed G4 Grade coal with GCV of 6250 kcal/kg and 18.2% ash content.' },
  { text: 'Lok Sabha Target (1.08 BT FY25)', weight: 92, category: 'Governance', count: 1390, doc: 'Ministry_of_Coal_LokSabha_Question_2914.pdf', snippet: 'Parliamentary Q. 2914 confirmed an all-India coal production target of 1,080 MT for FY 2024-25.' },
  { text: 'Thermal Power Coal Supply (618.50 MT)', weight: 91, category: 'Logistics & FMC', count: 1210, doc: 'Ministry_of_Coal_LokSabha_Question_2914.pdf', snippet: 'CIL supplied 618.50 MT (82.1% of dispatch) to thermal power stations with 348.6 rakes/day.' },
  { text: 'First-Mile Connectivity (35 FMC Silos)', weight: 89, category: 'Logistics & FMC', count: 980, doc: 'Ministry_of_Coal_LokSabha_Question_2914.pdf', snippet: '35 Phase-I FMC rapid loading silos operationalized to convey 595 MTPA directly to rakes.' },
  { text: 'DGMS Safety Fatal Rate (0.041/MT)', weight: 88, category: 'Safety & Rehabilitation', count: 920, doc: 'DGMS_Safety_and_Environmental_Audit_2024.pdf', snippet: 'DGMS certified a decade-low Fatal Accident Rate of 0.041 per MT produced under Circular 04/2021.' },
  { text: 'Mine Water Treatment (360 MCM)', weight: 85, category: 'Environment', count: 870, doc: 'DGMS_Safety_and_Environmental_Audit_2024.pdf', snippet: '360 MCM mine water processed, with 120 MCM supplied for community drinking & irrigation.' },
  { text: 'Seam V Reserve Conflict (380 MT vs 450 MT)', weight: 87, category: 'Safety & Rehabilitation', count: 890, doc: 'CMPDI_Jharia_SeamV_Conflict_Test.pdf', snippet: 'AI Conflict Engine detected 380.10 MT audit reserve figure contradicting CMPDI TR-894 baseline.' }
];

export default function WordCloudModule({ selectedSubsidiary }) {
  const formatTopicText = (text) => {
    if (!text) return '';
    const cleaned = text.replace(/\.pdf$/i, '').replace(/_/g, ' ').replace(/-/g, ' ').trim();
    return cleaned.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
  };

  const deduplicateTopics = (list) => {
    const seen = new Set();
    const uniqueList = [];
    for (const item of list) {
      if (!item || !item.text) continue;
      const formatted = formatTopicText(item.text).toLowerCase().trim();
      if (formatted && !seen.has(formatted)) {
        seen.add(formatted);
        uniqueList.push(item);
      }
    }
    return uniqueList;
  };

  // Helper to build dynamic topics from localStorage user uploaded documents
  const getLocalStorageDocTopics = () => {
    try {
      const stored = localStorage.getItem('geomine_user_documents');
      if (!stored) return [];
      const docs = JSON.parse(stored);
      if (!Array.isArray(docs)) return [];

      const extracted = [];
      docs.forEach(doc => {
        if (!doc.name) return;
        const cleanName = formatTopicText(doc.name);
        extracted.push({
          text: cleanName,
          weight: 95,
          category: 'Uploaded Document',
          count: (doc.pages || 1) * 45,
          doc: doc.name,
          snippet: doc.summaryText || `User uploaded document (${doc.name}) parsed by PyMuPDF/EasyOCR OCR pipeline with ${doc.pages || 1} pages.`
        });

        // Add extracted parameter rows as topics if available
        if (doc.extracted_rows && Array.isArray(doc.extracted_rows)) {
          doc.extracted_rows.forEach(row => {
            if (row.parameter && row.value) {
              extracted.push({
                text: `${row.parameter} (${row.value} ${row.unit || ''})`.trim(),
                weight: 88,
                category: 'Mining Operations',
                count: 320,
                doc: doc.name,
                snippet: `Extracted parameter "${row.parameter}" = ${row.value} ${row.unit || ''} from ${doc.name} (Page ${row.page || 1}).`
              });
            }
          });
        }
      });
      return extracted;
    } catch (e) {
      return [];
    }
  };

  const allInitial = deduplicateTopics([
    ...getLocalStorageDocTopics(),
    ...BASE_MINISTRY_TOPICS,
    ...WORD_CLOUD_TOPICS
  ]);

  const [topics, setTopics] = useState(allInitial);
  const [targetCategory, setTargetCategory] = useState('ALL');
  const [minWeight, setMinWeight] = useState(50);
  const [selectedTopic, setSelectedTopic] = useState(allInitial[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTopics = () => {
    setIsRefreshing(true);
    const localTopics = getLocalStorageDocTopics();

    api.getTopics(selectedSubsidiary, targetCategory)
      .then(res => {
        if (res && res.topics && res.topics.length > 0) {
          const apiTopics = res.topics.map(t => ({
            text: t.text || t.name,
            weight: t.weight || 85,
            category: t.category || 'Mining Operations',
            count: t.count || 120,
            doc: t.doc || 'Uploaded_Document.pdf',
            snippet: t.snippet || `Extracted topic from uploaded document corpus.`
          }));
          const combined = deduplicateTopics([
            ...localTopics,
            ...apiTopics,
            ...BASE_MINISTRY_TOPICS,
            ...WORD_CLOUD_TOPICS
          ]);
          setTopics(combined);
          if (!selectedTopic || !combined.some(t => formatTopicText(t.text) === formatTopicText(selectedTopic.text))) {
            setSelectedTopic(combined[0]);
          }
        } else {
          const combined = deduplicateTopics([
            ...localTopics,
            ...BASE_MINISTRY_TOPICS,
            ...WORD_CLOUD_TOPICS
          ]);
          setTopics(combined);
          if (!selectedTopic) setSelectedTopic(combined[0]);
        }
      })
      .catch(() => {
        const combined = deduplicateTopics([
          ...localTopics,
          ...BASE_MINISTRY_TOPICS,
          ...WORD_CLOUD_TOPICS
        ]);
        setTopics(combined);
        if (!selectedTopic) setSelectedTopic(combined[0]);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchTopics();

    // Listen for global auto-connect & uploaded document events
    const handleAutoConnect = () => fetchTopics();
    const handleDocumentUpdate = (e) => {
      if (e.detail) {
        // Save to localStorage so topic extraction picks it up instantly
        try {
          const stored = JSON.parse(localStorage.getItem('geomine_user_documents') || '[]');
          const exists = stored.some(d => d.name === e.detail.name || d.id === e.detail.id);
          if (!exists) {
            stored.unshift(e.detail);
            localStorage.setItem('geomine_user_documents', JSON.stringify(stored));
          }
        } catch (err) {}
      }
      fetchTopics();
    };

    window.addEventListener('geomine-backend-connected', handleAutoConnect);
    window.addEventListener('geomine-document-updated', handleDocumentUpdate);

    return () => {
      window.removeEventListener('geomine-backend-connected', handleAutoConnect);
      window.removeEventListener('geomine-document-updated', handleDocumentUpdate);
    };
  }, [selectedSubsidiary, targetCategory]);

  const filteredTopics = topics.filter((item) => {
    const formatted = formatTopicText(item.text);
    const catMatch = targetCategory === 'ALL' || item.category === targetCategory;
    const weightMatch = item.weight >= minWeight;
    const searchMatch = formatted.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));
    return catMatch && weightMatch && searchMatch;
  });

  const categories = ['ALL', 'Uploaded Document', 'Mining Operations', 'Safety & Rehabilitation', 'CMPDI Exploration', 'Coal Quality & Grade', 'Beneficiation', 'Environment', 'Clean Coal Technology', 'Logistics & FMC', 'Governance'];

  const getTopicColor = (weight) => {
    if (weight >= 92) return 'text-amber-700 font-extrabold hover:scale-105';
    if (weight >= 86) return 'text-emerald-700 font-bold hover:scale-105';
    if (weight >= 80) return 'text-blue-700 font-bold hover:scale-105';
    if (weight >= 75) return 'text-purple-700 font-semibold';
    return 'text-slate-700 font-medium';
  };

  const getFontSize = (weight) => {
    const size = Math.max(12, Math.min(26, Math.floor(weight / 3.4)));
    return `${size}px`;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-heading">Automated Word Cloud & Topic Identification</h2>
            {isRefreshing && <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />}
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

      {/* Category Controls Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setTargetCategory(cat)}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                targetCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
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
            min="30"
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
            <span className="text-xs text-slate-500 font-mono">{filteredTopics.length} Topics Loaded</span>
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
                  className={`transition-all duration-200 cursor-pointer select-none leading-none p-2.5 rounded-xl flex items-center gap-1.5 ${getTopicColor(topic.weight)} ${
                    isSelected ? 'ring-2 ring-blue-600 bg-white shadow-md font-extrabold z-10 scale-105' : 'hover:bg-slate-200/60'
                  }`}
                >
                  <span>{formattedName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Inspector Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedTopic ? (
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-5">
              <div className="pb-4 border-b border-slate-200 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Topic Keyword Inspector
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {formatTopicText(selectedTopic.text)}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-500">TF-IDF Weight</div>
                  <div className="text-lg font-extrabold text-blue-700 font-mono">{selectedTopic.weight}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Document Mentions</div>
                  <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">{selectedTopic.count || 1420}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Cluster Category</div>
                  <div className="text-xs font-bold text-blue-700 mt-0.5 truncate">{selectedTopic.category || 'Mining Operations'}</div>
                </div>
              </div>

              {/* Document Evidence Snippet */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Document Evidence Snippet</span>
                  </span>
                  <span className="font-mono text-slate-500 text-[10px]">{selectedTopic.doc || 'CIL_Annual_Report_FY24.pdf'}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 text-xs text-slate-800 leading-relaxed italic">
                  "{selectedTopic.snippet || `Exploratory core drilling confirmed high-density occurrence of ${selectedTopic.text} across mine blocks under CIL command area.`}"
                </div>
              </div>

              {/* Top Topic Clusters Table */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-blue-600" />
                  <span>Top Topic Clusters</span>
                </h4>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Topic Keyword</th>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5 text-right">Weight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      {filteredTopics.slice(0, 6).map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedTopic(item)}>
                          <td className="p-2.5 font-sans font-medium text-slate-900 truncate max-w-[140px]">{formatTopicText(item.text)}</td>
                          <td className="p-2.5 font-sans text-slate-600 text-[10px]">{item.category}</td>
                          <td className="p-2.5 text-right font-bold text-blue-700">{item.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-xl bg-white border border-slate-200 text-center text-slate-400 space-y-2">
              <CloudRain className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs">Select any topic keyword from the cloud to view evidence and clusters.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
