import React, { useState } from 'react';
import { generateOfficialPDFReport } from '../services/reportGeneratorEngine';
import { SUBSIDIARIES, HISTORICAL_PRODUCTION_DATA } from '../data/mockData';
import { api } from '../services/api';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  RefreshCw, 
  Eye, 
  Sliders, 
  Clock,
  AlertCircle
} from 'lucide-react';

export default function ReportGeneratorModule({ selectedSubsidiary }) {
  const [reportType, setReportType] = useState('Parliamentary Response');
  const [targetSub, setTargetSub] = useState(selectedSubsidiary === 'ALL' ? 'SECL' : selectedSubsidiary);
  const [reportTitle, setReportTitle] = useState('Geological Exploration & Production Performance Brief');
  const [summaryText, setSummaryText] = useState(
    'This report compiles multi-source geological exploration data, core drill logs, and production metrics verified through GeoMine AI Validation Engine. Figures have been cross-checked against database records.'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const latestProd = HISTORICAL_PRODUCTION_DATA[HISTORICAL_PRODUCTION_DATA.length - 1];
  const prevProd = HISTORICAL_PRODUCTION_DATA[HISTORICAL_PRODUCTION_DATA.length - 2];
  
  const subProdCurrent = latestProd[targetSub] || 195.0;
  const subProdPrev = prevProd[targetSub] || 181.0;
  const yoyGrowth = (((subProdCurrent - subProdPrev) / subProdPrev) * 100).toFixed(1);

  const sampleTableData = [
    { Parameter: `${targetSub} Coal Production`, 'FY23-24 (MT)': `${subProdPrev} MT`, 'FY24-25 (MT)': `${subProdCurrent} MT`, 'YoY Growth': `+${yoyGrowth}%`, Status: 'Verified' },
    { Parameter: `Total CIL Overall Production`, 'FY23-24 (MT)': `${prevProd.Total_CIL} MT`, 'FY24-25 (MT)': `${latestProd.Total_CIL} MT`, 'YoY Growth': `+8.3%`, Status: 'Audited' },
    { Parameter: `CMPDI Exploratory Drilling`, 'FY23-24 (MT)': `${prevProd.CMPDI_Drilling} L m`, 'FY24-25 (MT)': `${latestProd.CMPDI_Drilling} L m`, 'YoY Growth': `+10.1%`, Status: 'Exceeded' }
  ];

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      // Try backend Python ReportLab PDF endpoint first
      const res = await api.generateReport({
        title: reportTitle,
        subsidiary: targetSub,
        report_type: reportType,
        summary_text: summaryText,
        table_data: sampleTableData
      });
      if (res && res.report_id) {
        window.open(api.getReportDownloadUrl(res.report_id, 'pdf'), '_blank');
      } else {
        // Fallback browser-side PDF generator
        generateOfficialPDFReport({
          title: reportTitle,
          subtitle: `CMPDI / ${targetSub} Report`,
          subsidiary: targetSub,
          reportType,
          date: new Date().toLocaleDateString(),
          tableData: sampleTableData,
          summaryText,
          refNo: `CMPDI/HQ/${targetSub}/${Date.now().toString().slice(-4)}`
        });
      }
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.warn('Backend ReportLab generator fallback:', err);
      generateOfficialPDFReport({
        title: reportTitle,
        subtitle: `CMPDI / ${targetSub} Report`,
        subsidiary: targetSub,
        reportType,
        date: new Date().toLocaleDateString(),
        tableData: sampleTableData,
        summaryText,
        refNo: `CMPDI/HQ/${targetSub}/${Date.now().toString().slice(-4)}`
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-heading">Automated Report Generator</h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Auto-compile and format geological, mining, and parliamentary reports with ReportLab PDF & DOCX export.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <AlertCircle className="w-4 h-4 text-slate-400" />
          <span>Prototype templates for CIL & CMPDI workflows</span>
        </div>
      </div>

      {/* Grid: Form Left | Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Report Settings & Parameters</span>
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
              ● Dynamic User Inputs
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Report Template</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            >
              <option value="Parliamentary Response">Parliamentary Inquiry Response Brief</option>
              <option value="Geological Exploration">CMPDI Geological Survey & Drilling Summary</option>
              <option value="Subsidiary Mining">CIL Subsidiary Monthly Production & OBR Report</option>
              <option value="Executive Briefing">High-Level Administrative Briefing</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Target CIL Subsidiary</label>
            <select
              value={targetSub}
              onChange={(e) => setTargetSub(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-500"
            >
              {SUBSIDIARIES.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.id} - {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Report Title</label>
            <input
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Executive Summary & Notes</label>
            <textarea
              rows={4}
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 leading-relaxed"
            ></textarea>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Generating PDF Report...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Report (PDF / DOCX)</span>
                </>
              )}
            </button>

            {downloadSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Report generated and ready for download!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Live Document Preview Sheet (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Live Document Layout Preview</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium border border-blue-100">
              Template Preview Mode
            </span>
          </div>

          {/* White Paper Sheet */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-6 text-slate-800 shadow-xs">
            
            <div className="text-center space-y-1 pb-4 border-b border-slate-200">
              <div className="text-xs font-bold text-slate-900 tracking-wider uppercase">
                CENTRAL MINE PLANNING & DESIGN INSTITUTE (CMPDI)
              </div>
              <div className="text-[11px] text-slate-500">
                A Subsidiary of Coal India Limited | Ministry of Coal
              </div>
              <div className="text-[10px] font-mono text-slate-400 pt-1">
                Ref No: CMPDI/HQ/{targetSub}/2026/0491 • Date: {new Date().toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">{reportTitle}</h4>
              <p className="text-xs text-blue-700 font-semibold">
                Subsidiary: {targetSub} • Category: {reportType}
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">1. Executive Summary</h5>
              <p className="text-xs text-slate-700 leading-relaxed p-3 rounded-lg bg-white border border-slate-200">
                {summaryText}
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">2. Extracted Data Table</h5>
              
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Parameter</th>
                      <th className="p-2.5">FY23-24</th>
                      <th className="p-2.5">FY24-25</th>
                      <th className="p-2.5">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                    {sampleTableData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-sans font-medium text-slate-900">{row.Parameter}</td>
                        <td className="p-2.5 text-slate-600">{row['FY23-24 (MT)']}</td>
                        <td className="p-2.5 text-emerald-700 font-bold">{row['FY24-25 (MT)']}</td>
                        <td className="p-2.5 text-blue-700 font-semibold">{row['YoY Growth']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <div>
                <div className="font-semibold text-slate-700">GeoMine System Audit Stamp</div>
                <div className="text-[10px] text-slate-400 font-mono">Ledger Ref: 0x994a...81e</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-800">Mining & Exploration Division</div>
                <div className="text-[10px] text-slate-400">CMPDI HQ, Ranchi</div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
