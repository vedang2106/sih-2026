// GeoMine AI - Comprehensive CMPDI & CIL Subsidiary Mock Dataset

export const SUBSIDIARIES = [
  { id: 'CMPDI', name: 'Central Mine Planning & Design Institute', hq: 'Ranchi, Jharkhand', code: 'CMPDI', color: '#f59e0b', type: 'Planning & Exploration' },
  { id: 'ECL', name: 'Eastern Coalfields Limited', hq: 'Sanctoria, West Bengal', code: 'ECL', color: '#3b82f6', type: 'Opencast & Underground' },
  { id: 'BCCL', name: 'Bharat Coking Coal Limited', hq: 'Dhanbad, Jharkhand', code: 'BCCL', color: '#ef4444', type: 'Coking Coal Specialist' },
  { id: 'CCL', name: 'Central Coalfields Limited', hq: 'Ranchi, Jharkhand', color: '#10b981', type: 'Opencast & Underground' },
  { id: 'NCL', name: 'Northern Coalfields Limited', hq: 'Singrauli, Madhya Pradesh', color: '#8b5cf6', type: 'Heavy Opencast Mining' },
  { id: 'WCL', name: 'Western Coalfields Limited', hq: 'Nagpur, Maharashtra', color: '#ec4899', type: 'Opencast & Underground' },
  { id: 'SECL', name: 'South Eastern Coalfields Limited', hq: 'Bilaspur, Chhattisgarh', color: '#06b6d4', type: 'Mega Opencast Mines' },
  { id: 'MCL', name: 'Mahanadi Coalfields Limited', hq: 'Sambalpur, Odisha', color: '#84cc16', type: 'High Capacity Opencast' },
  { id: 'NEC', name: 'North Eastern Coalfields', hq: 'Margherita, Assam', color: '#f97316', type: 'Tertiary Coal Deposit' },
];

export const HISTORICAL_PRODUCTION_DATA = [
  { year: '2019-20', SECL: 150.55, MCL: 140.36, NCL: 108.05, CCL: 66.88, ECL: 50.40, WCL: 57.64, BCCL: 27.73, CMPDI_Drilling: 13.8, Total_CIL: 602.14 },
  { year: '2020-21', SECL: 150.61, MCL: 148.01, NCL: 112.66, CCL: 62.59, ECL: 45.02, WCL: 50.28, BCCL: 24.66, CMPDI_Drilling: 12.4, Total_CIL: 596.22 },
  { year: '2021-22', SECL: 142.52, MCL: 168.17, NCL: 122.43, CCL: 68.84, ECL: 32.43, WCL: 57.71, BCCL: 30.50, CMPDI_Drilling: 14.2, Total_CIL: 622.63 },
  { year: '2022-23', SECL: 167.00, MCL: 193.30, NCL: 131.17, CCL: 76.09, ECL: 35.02, WCL: 64.28, BCCL: 35.84, CMPDI_Drilling: 15.6, Total_CIL: 703.20 },
  { year: '2023-24', SECL: 181.00, MCL: 206.10, NCL: 136.20, CCL: 86.00, ECL: 42.50, WCL: 68.50, BCCL: 41.10, CMPDI_Drilling: 16.8, Total_CIL: 773.60 },
  { year: '2024-25 (P)', SECL: 195.00, MCL: 220.00, NCL: 142.00, CCL: 95.00, ECL: 48.00, WCL: 72.00, BCCL: 45.00, CMPDI_Drilling: 18.5, Total_CIL: 838.00 },
];

export const GEOLOGICAL_RESERVES_SUMMARY = [
  { coalfield: 'Jharia Coalfield', subsidiary: 'BCCL', proven: 16420, indicated: 4120, inferred: 890, total: 21430, mainGrade: 'Coking (Prime & Medium)', maxDepthMeters: 900 },
  { coalfield: 'Raniganj Coalfield', subsidiary: 'ECL', proven: 14210, indicated: 8950, inferred: 2310, total: 25470, mainGrade: 'Non-Coking G1-G7', maxDepthMeters: 600 },
  { coalfield: 'Korba Coalfield', subsidiary: 'SECL', proven: 12890, indicated: 2450, inferred: 420, total: 15760, mainGrade: 'Non-Coking G11-G14', maxDepthMeters: 450 },
  { coalfield: 'Talcher Coalfield', subsidiary: 'MCL', proven: 28940, indicated: 15600, inferred: 6400, total: 50940, mainGrade: 'Non-Coking G12-G15', maxDepthMeters: 500 },
  { coalfield: 'Singrauli Coalfield', subsidiary: 'NCL', proven: 10450, indicated: 3120, inferred: 610, total: 14180, mainGrade: 'Power Grade G10-G13', maxDepthMeters: 350 },
  { coalfield: 'North Karanpura', subsidiary: 'CCL', proven: 15300, indicated: 6800, inferred: 1900, total: 24000, mainGrade: 'Non-Coking G10-G14', maxDepthMeters: 400 },
  { coalfield: 'Ib Valley Coalfield', subsidiary: 'MCL', proven: 18200, indicated: 7100, inferred: 2200, total: 27500, mainGrade: 'Non-Coking G13-G16', maxDepthMeters: 380 },
];

export const PARLIAMENTARY_QUESTIONS_BANK = [
  {
    id: 'PQ-2026-LS-3402',
    house: 'Lok Sabha',
    session: '264th Budget Session',
    questionNo: 'Starred Question No. 3402',
    date: '2026-03-12',
    ministry: 'Ministry of Coal',
    askedBy: 'Shri Rajeshwar Singh, M.P. (Dhanbad)',
    subject: 'Status of Coking Coal Production, Washery Upgradation, and Jharia Master Plan Progress',
    questionText: '(a) Whether the Government has assessed the current coking coal shortage in domestic steel plants; (b) the total production of coking coal by BCCL and CCL during FY 2024-25; (c) the status of CMPDI geological exploration reports for new coking coal blocks in Jharia and East Bokaro; and (d) details of measures taken for fire control under the Jharia Master Plan.',
    aiAnswerSummary: 'In FY 2024-25, BCCL produced 45.00 MT and CCL produced 18.20 MT of coking coal. CMPDI completed 2.45 lakh meters of exploratory drilling in Jharia Coalfield, identifying 840 MT of additional prime coking coal reserves at depth. Under the Jharia Master Plan, 38 surface fire sites out of 67 have been successfully extinguished, reducing the fire area by 72%.',
    tableData: [
      { Parameter: 'BCCL Coking Production', FY23_24: '41.10 MT', FY24_25: '45.00 MT', Target_FY26: '52.00 MT' },
      { Parameter: 'CCL Coking Production', FY23_24: '15.80 MT', FY24_25: '18.20 MT', Target_FY26: '22.50 MT' },
      { Parameter: 'CMPDI Drilling (Jharia)', FY23_24: '2.10 Lakh m', FY24_25: '2.45 Lakh m', Target_FY26: '2.80 Lakh m' },
      { Parameter: 'Active Fire Sites (Jharia)', FY23_24: '42 Sites', FY24_25: '29 Sites', Target_FY26: '18 Sites' },
    ],
    sourceDocuments: [
      { docName: 'BCCL_Annual_Production_Report_FY25.pdf', page: 14, snippet: 'Coking coal off-take to steel plants reached 38.4 MT with a grade consistency of 94.2%.' },
      { docName: 'CMPDI_Geological_Exploration_Jharia_2025.pdf', page: 42, snippet: 'Deep directional drilling confirmed Seam IX/X continuation up to 750m depth with GCV > 6700 kcal/kg.' }
    ],
    confidenceScore: 99.2,
    status: 'Verified & Approved by Coal Secretary'
  },
  {
    id: 'PQ-2026-RS-1890',
    house: 'Rajya Sabha',
    session: '264th Session',
    questionNo: 'Unstarred Question No. 1890',
    date: '2026-02-24',
    ministry: 'Ministry of Coal',
    askedBy: 'Smt. Anita Mahapatra, M.P. (Odisha)',
    subject: 'Geological Reserve Assessment and Environmental Clearance in Talcher & Ib Valley Coalfields',
    questionText: '(a) The total estimated coal reserves in Odisha under MCL jurisdiction; (b) the quantum of land reclaimed by MCL after opencast mining in the last 3 years; and (c) the number of 3D Seismic Surveys conducted by CMPDI in Talcher coalfield.',
    aiAnswerSummary: 'Total estimated coal reserves in Odisha (Talcher & Ib Valley) stand at 78,440 Million Tonnes, of which 47,140 MT are under Proven category. MCL has reclaimed 4,820 hectares of mined-out land with over 1.2 crore saplings planted. CMPDI Regional Institute-VII conducted 3D seismic surveys over 45 sq. km in Talcher to delineate fault structures.',
    tableData: [
      { Parameter: 'Talcher Coalfield Reserves', Proven: '28,940 MT', Indicated: '15,600 MT', Total: '50,940 MT' },
      { Parameter: 'Ib Valley Reserves', Proven: '18,200 MT', Indicated: '7,100 MT', Total: '27,500 MT' },
      { Parameter: 'MCL Plantation Area', FY23: '1,250 Ha', FY24: '1,680 Ha', FY25: '1,890 Ha' },
    ],
    sourceDocuments: [
      { docName: 'MCL_Environmental_Clearance_Audit_2025.pdf', page: 8, snippet: 'Overburden dump bio-reclamation successfully restored 1,890 hectares in FY 2024-25.' },
      { docName: 'CMPDI_RI7_3D_Seismic_Report_Talcher.pdf', page: 19, snippet: 'High-resolution 3D seismic imaging revealed sub-surface seam displacement along the Anugul fault line.' }
    ],
    confidenceScore: 98.7,
    status: 'Verified & Ready for Submission'
  },
  {
    id: 'PQ-2026-LS-1105',
    house: 'Lok Sabha',
    session: '264th Budget Session',
    questionNo: 'Unstarred Question No. 1105',
    date: '2026-02-10',
    ministry: 'Ministry of Coal',
    askedBy: 'Shri Vikram Chouhan, M.P. (Korba)',
    subject: 'Overburden Removal Efficiency and Heavy Earth Moving Machinery (HEMM) Utilization in SECL & NCL',
    questionText: '(a) The targets and achievements of overburden removal (OBR) in SECL and NCL opencast mines; (b) average breakdown hours of 240-T Dumper and 42-CuM Shovels; and (c) AI monitoring solutions deployed by CMPDI.',
    aiAnswerSummary: 'In FY 2024-25, SECL achieved 245 MCM of OBR against a target of 250 MCM (98.0%), while NCL achieved 165 MCM against a 160 MCM target (103.1%). HEMM availability averaged 86.4% across mega mines. CMPDI deployed AI-based drone photogrammetry and video analytics for automated OBR measurement across 18 mega-mines.',
    tableData: [
      { Subsidiary: 'SECL Gevra & Dipka', OBR_Target: '250 MCM', OBR_Achieved: '245 MCM', HEMM_Avail: '87.2%' },
      { Subsidiary: 'NCL Jayant & Nigahi', OBR_Target: '160 MCM', OBR_Achieved: '165 MCM', HEMM_Avail: '88.5%' },
    ],
    sourceDocuments: [
      { docName: 'SECL_Mega_Mine_OBR_Review_2025.pdf', page: 3, snippet: 'Gevra Expansion mine registered 60 MT coal production with 92 MCM overburden stripping.' },
      { docName: 'CMPDI_Drone_OBR_Analytics_Report.pdf', page: 11, snippet: 'Volumetric drone survey precision matched physical total-station surveys within 0.8% variance.' }
    ],
    confidenceScore: 99.5,
    status: 'Verified & Approved'
  },
  {
    id: 'PQ-2026-LS-1105',
    house: 'Lok Sabha',
    session: '264th Budget Session',
    questionNo: 'Unstarred Question No. 1105',
    date: '2026-02-10',
    ministry: 'Ministry of Coal',
    askedBy: 'Shri Vikram Chouhan, M.P. (Korba)',
    subject: 'Overburden Removal Efficiency and Heavy Earth Moving Machinery (HEMM) Utilization in SECL & NCL',
    questionText: '(a) The targets and achievements of overburden removal (OBR) in SECL and NCL opencast mines; (b) average breakdown hours of 240-T Dumper and 42-CuM Shovels; and (c) AI monitoring solutions deployed by CMPDI.',
    aiAnswerSummary: 'In FY 2024-25, SECL achieved 245 MCM of OBR against a target of 250 MCM (98.0%), while NCL achieved 165 MCM against a 160 MCM target (103.1%). HEMM availability averaged 86.4% across mega mines. CMPDI deployed AI-based drone photogrammetry and video analytics for automated OBR measurement across 18 mega-mines.',
    tableData: [
      { Subsidiary: 'SECL Gevra & Dipka', OBR_Target: '250 MCM', OBR_Achieved: '245 MCM', HEMM_Avail: '87.2%' },
      { Subsidiary: 'NCL Jayant & Nigahi', OBR_Target: '160 MCM', OBR_Achieved: '165 MCM', HEMM_Avail: '88.5%' },
    ],
    sourceDocuments: [
      { docName: 'SECL_Mega_Mine_OBR_Review_2025.pdf', page: 3, snippet: 'Gevra Expansion mine registered 60 MT coal production with 92 MCM overburden stripping.' },
      { docName: 'CMPDI_Drone_OBR_Analytics_Report.pdf', page: 11, snippet: 'Volumetric drone survey precision matched physical total-station surveys within 0.8% variance.' }
    ],
    confidenceScore: 99.5,
    status: 'Verified & Approved'
  },
  {
    id: 'PQ-2026-RS-2104',
    house: 'Rajya Sabha',
    session: '264th Session',
    questionNo: 'Starred Question No. 2104',
    date: '2026-03-05',
    ministry: 'Ministry of Coal',
    askedBy: 'Shri Rameshwar Teli, M.P. (Assam)',
    subject: 'First-Mile Connectivity (FMC) Rail Projects and Dust Suppression Infrastructure in CIL Subsidiaries',
    questionText: '(a) Total number of First-Mile Connectivity (FMC) rapid loading systems commissioned in CIL mines; (b) reduction in diesel consumption and carbon emissions achieved; and (c) automatic mist-spray fogger deployment status.',
    aiAnswerSummary: 'CIL has commissioned 34 First-Mile Connectivity (FMC) projects with a total handling capacity of 410 MTPA, eliminating over 8,500 daily truck trips. This has yielded an annual reduction of 1.4 Lakh Kilo-liters of diesel consumption and 3.8 Lakh Tonnes of CO2 emissions. Automatic foggers are installed at all 64 major railway sidings.',
    tableData: [
      { Parameter: 'FMC Projects Commissioned', FY23: '18 Systems', FY24: '26 Systems', FY25: '34 Systems' },
      { Parameter: 'Handling Capacity', FY23: '210 MTPA', FY24: '310 MTPA', FY25: '410 MTPA' },
      { Parameter: 'Carbon Emission Reduction', FY23: '1.8 L Tonnes', FY24: '2.7 L Tonnes', FY25: '3.8 L Tonnes' },
    ],
    sourceDocuments: [
      { docName: 'CIL_FMC_Infrastructure_Masterplan_2025.pdf', page: 6, snippet: 'Silobased rapid loading loading speed improved by 400% with average rake loading time under 55 minutes.' },
      { docName: 'CMPDI_Environmental_Audit_FMC_2025.pdf', page: 24, snippet: 'Ambient PM10 concentrations reduced by 34% in conveyor transport corridors.' }
    ],
    confidenceScore: 99.1,
    status: 'Verified & Approved by Coal Ministry'
  },
  {
    id: 'PQ-2026-LS-0488',
    house: 'Lok Sabha',
    session: '264th Budget Session',
    questionNo: 'Unstarred Question No. 0488',
    date: '2026-01-29',
    ministry: 'Ministry of Coal',
    askedBy: 'Smt. Gayatri Devi, M.P. (Singrauli)',
    subject: 'Clean Coal Technologies, Underground Coal Gasification (UCG), and Coal-to-Chemicals Initiatives',
    questionText: '(a) Status of CMPDI pilot projects for Coal Bed Methane (CBM) extraction in Jharia and Raniganj; (b) progress on Coal-to-Ammonium Nitrate plant in NCL; and (c) R&D funds allocated for Underground Coal Gasification.',
    aiAnswerSummary: 'CMPDI has commercialized CBM extraction blocks in Jharia (BCCL) and Raniganj (ECL) with an estimated gas resource of 26 Billion Cubic Meters. NCL has initiated the Coal-to-Ammonium Nitrate (CTAN) project at Singrauli with a planned capacity of 6.6 Lakh Tonnes/Year. Rs. 240 Crore has been allocated for UCG trial blocks in tertiary coal fields.',
    tableData: [
      { Project: 'Jharia CBM Block I', Resource: '14.2 BCM', Status: 'Commercial Exploitation Phase' },
      { Project: 'Raniganj CBM Block II', Resource: '11.8 BCM', Status: 'Exploratory Drilling Completed' },
      { Project: 'NCL Coal-to-Chemicals', Capacity: '6.6 L T/Yr', Status: 'Detailed Project Report (DPR)' },
    ],
    sourceDocuments: [
      { docName: 'CMPDI_Clean_Coal_Tech_Review_2025.pdf', page: 15, snippet: 'CBM drainage prior to underground mining reduced gas outburst hazard by 98% in Jharia deep seams.' },
      { docName: 'NCL_Singrauli_CTAN_Feasibility_Report.pdf', page: 31, snippet: 'Syngas conversion efficiency benchmarked at 78.4% using high-ash indigenous coal feed.' }
    ],
    confidenceScore: 98.4,
    status: 'Verified & Approved'
  }
];

export const WORD_CLOUD_TOPICS = [
  { text: 'Overburden Removal', weight: 98, category: 'Mining Operations', count: 1420 },
  { text: 'Jharia Master Plan', weight: 92, category: 'Safety & Rehabilitation', count: 1180 },
  { text: 'Geological Reserves', weight: 95, category: 'CMPDI Exploration', count: 1350 },
  { text: 'Gross Calorific Value', weight: 88, category: 'Coal Quality & Grade', count: 960 },
  { text: 'Exploratory Drilling', weight: 90, category: 'CMPDI Exploration', count: 1100 },
  { text: 'Coking Coal Washery', weight: 84, category: 'Beneficiation', count: 820 },
  { text: '3D Seismic Survey', weight: 82, category: 'Geophysics', count: 790 },
  { text: 'First Mile Connectivity', weight: 89, category: 'Logistics & FMC', count: 910 },
  { text: 'Parliamentary Question', weight: 96, category: 'Governance', count: 1390 },
  { text: 'Coal Evacuation Rail-Line', weight: 85, category: 'Logistics', count: 870 },
  { text: 'Bio-Reclamation Dump', weight: 79, category: 'Environment', count: 680 },
  { text: 'Surface Miner Operations', weight: 87, category: 'Mining Operations', count: 890 },
  { text: 'Coal Seam Gas & CBM', weight: 81, category: 'Clean Coal Technology', count: 720 },
  { text: 'Underground Gasification', weight: 76, category: 'Clean Coal Technology', count: 610 },
  { text: 'Fly Ash Mine Void Filling', weight: 78, category: 'Environment', count: 640 },
  { text: 'Slope Stability Sensor', weight: 75, category: 'Safety', count: 590 },
  { text: 'Grade Conformity G11-G14', weight: 83, category: 'Quality Control', count: 780 },
  { text: 'HEMM Fleet Telematics', weight: 80, category: 'Automation', count: 710 },
  { text: 'Core Boring Hydro-geology', weight: 77, category: 'CMPDI Exploration', count: 630 },
  { text: 'Methane Drainage', weight: 74, category: 'Safety', count: 540 }
];

export const SAMPLE_DOCUMENTS = [
  {
    id: 'DOC-2026-001',
    name: 'CMPDI_Annual_Geological_Exploration_Report_FY25.pdf',
    type: 'PDF',
    size: '14.2 MB',
    pages: 148,
    uploadDate: '2026-03-01',
    subsidiary: 'CMPDI',
    category: 'Geological Exploration',
    ocrStatus: 'Completed (100%)',
    extractedTables: 42,
    confidence: 99.4,
    extracted_rows: [
      { parameter: 'CMPDI Exploratory Drilling Meterage', value: '18.50', unit: 'Lakh Meters', page: 12, status: 'Verified' },
      { parameter: 'Jharia Deep Prime Coking Reserves', value: '840.00', unit: 'Million Tonnes', page: 42, status: 'Verified' },
      { parameter: 'Hydro-Geological Core Bore Holes', value: '1420', unit: 'Boreholes', page: 84, status: 'Verified' }
    ],
    anomaliesFound: 0,
    tags: ['Drilling', 'Reserves', 'Core Bore', 'Jharia', 'Raniganj']
  },
  {
    id: 'DOC-2026-002',
    name: 'SECL_Gevra_Mega_Opencast_Production_Sheet_Q4.xlsx',
    type: 'XLSX',
    size: '4.8 MB',
    pages: 12,
    uploadDate: '2026-03-10',
    subsidiary: 'SECL',
    category: 'Production & OBR',
    ocrStatus: 'Completed (100%)',
    extractedTables: 18,
    confidence: 98.9,
    extracted_rows: [
      { parameter: 'Gevra Mine Coal Production', value: '60.00', unit: 'Million Tonnes', page: 1, status: 'Verified' },
      { parameter: 'Overburden Stripping (OBR)', value: '92.40', unit: 'Million Cu. M', page: 3, status: 'Verified' },
      { parameter: '240-T Dumper Availability', value: '87.2', unit: 'Percent (%)', page: 5, status: 'Verified' }
    ],
    anomaliesFound: 1,
    anomalyDetail: 'Unit mismatch in Row 45: OBR recorded in Tonnes instead of MCM. Auto-corrected by AI rule.',
    tags: ['SECL', 'Gevra', 'OBR', 'HEMM', 'Production']
  },
  {
    id: 'DOC-2026-003',
    name: 'BCCL_Jharia_Fire_Status_&_Coking_Washery_Audit.pdf',
    type: 'PDF',
    size: '18.6 MB',
    pages: 94,
    uploadDate: '2026-02-18',
    subsidiary: 'BCCL',
    category: 'Safety & Coking Coal',
    ocrStatus: 'Completed (100%)',
    extractedTables: 28,
    confidence: 97.8,
    extracted_rows: [
      { parameter: 'BCCL Total Coking Coal Production', value: '45.00', unit: 'Million Tonnes', page: 14, status: 'Verified' },
      { parameter: 'Extinguished Jharia Fire Sites', value: '38', unit: 'Sites (72% Red.)', page: 28, status: 'Verified' },
      { parameter: 'Coking Washery Clean Coal Yield', value: '48.5', unit: 'Yield (%)', page: 56, status: 'Verified' }
    ],
    anomaliesFound: 0,
    tags: ['BCCL', 'Jharia', 'Washery', 'Coking', 'Fire']
  },
  {
    id: 'DOC-2026-004',
    name: 'MCL_Talcher_3D_Seismic_&_Environmental_Audit_2025.pdf',
    type: 'PDF',
    size: '22.1 MB',
    pages: 116,
    uploadDate: '2026-02-28',
    subsidiary: 'MCL',
    category: 'Environmental & Seismic',
    ocrStatus: 'Completed (100%)',
    extractedTables: 35,
    confidence: 99.1,
    extracted_rows: [
      { parameter: 'MCL Total Coal Production', value: '220.00', unit: 'Million Tonnes', page: 4, status: 'Verified' },
      { parameter: 'Talcher Proven Coal Reserves', value: '28940.00', unit: 'Million Tonnes', page: 18, status: 'Verified' },
      { parameter: 'Overburden Plantation Reclaimed Area', value: '1890.00', unit: 'Hectares', page: 88, status: 'Verified' }
    ],
    anomaliesFound: 0,
    tags: ['MCL', 'Talcher', 'Seismic', 'Plantation', 'Reclamation']
  },
  {
    id: 'DOC-2026-005',
    name: 'CIL_Parliamentary_Inquiry_Response_Archive_2024_2026.pdf',
    type: 'PDF',
    size: '35.4 MB',
    pages: 230,
    uploadDate: '2026-03-14',
    subsidiary: 'CMPDI',
    category: 'Parliamentary Archive',
    ocrStatus: 'Completed (100%)',
    extractedTables: 64,
    confidence: 99.6,
    extracted_rows: [
      { parameter: 'Total CIL Coal Production FY25', value: '838.00', unit: 'Million Tonnes', page: 2, status: 'Verified' },
      { parameter: 'Answered Parliamentary Inquiries', value: '412', unit: 'Questions', page: 15, status: 'Verified' },
      { parameter: 'Overall CIL OBR Volume', value: '1150.00', unit: 'Million Cu. M', page: 45, status: 'Verified' }
    ],
    anomaliesFound: 0,
    tags: ['Lok Sabha', 'Rajya Sabha', 'Ministry of Coal', 'Inquiry']
  },
  {
    id: 'DOC-2026-006',
    name: 'NCL_Jayant_Opencast_Dragline_Performance_Audit.pdf',
    type: 'PDF',
    size: '11.8 MB',
    pages: 68,
    uploadDate: '2026-02-14',
    subsidiary: 'NCL',
    category: 'Heavy Mining Machinery',
    ocrStatus: 'Completed (100%)',
    extractedTables: 22,
    confidence: 98.4,
    extracted_rows: [
      { parameter: 'NCL Annual Coal Production', value: '142.00', unit: 'Million Tonnes', page: 3, status: 'Verified' },
      { parameter: 'Dragline Availability Factor', value: '88.5', unit: 'Percent (%)', page: 19, status: 'Verified' },
      { parameter: 'Specific Fuel Consumption (HEMM)', value: '0.94', unit: 'Liters/Cu.M', page: 32, status: 'Verified' }
    ],
    anomaliesFound: 0,
    tags: ['NCL', 'Singrauli', 'Dragline', 'HEMM', 'Fuel Efficiency']
  },
  {
    id: 'DOC-2026-007',
    name: 'CCL_North_Karanpura_Coalfield_Geological_Report.pdf',
    type: 'PDF',
    size: '16.5 MB',
    pages: 110,
    uploadDate: '2026-01-22',
    subsidiary: 'CCL',
    category: 'Geological & Core Log',
    ocrStatus: 'Completed (100%)',
    extractedTables: 31,
    confidence: 98.1,
    extracted_rows: [
      { parameter: 'CCL Total Coal Production', value: '95.00', unit: 'Million Tonnes', page: 5, status: 'Verified' },
      { parameter: 'North Karanpura Proven Reserves', value: '15300.00', unit: 'Million Tonnes', page: 24, status: 'Verified' },
      { parameter: 'Coal Seam Thickness (Average)', value: '14.50', unit: 'Meters', page: 51, status: 'Verified' }
    ],
    anomaliesFound: 0,
    tags: ['CCL', 'Karanpura', 'Core Log', 'Coal Seam', 'Geology']
  },
  {
    id: 'DOC-2026-008',
    name: 'WCL_Nagpur_Underground_Safety_&_Methane_Audit.pdf',
    type: 'PDF',
    size: '9.4 MB',
    pages: 56,
    uploadDate: '2026-02-05',
    subsidiary: 'WCL',
    category: 'Underground Mine Safety',
    ocrStatus: 'Completed (100%)',
    extractedTables: 16,
    confidence: 97.9,
    extracted_rows: [
      { parameter: 'WCL Annual Coal Production', value: '72.00', unit: 'Million Tonnes', page: 2, status: 'Verified' },
      { parameter: 'Underground Methane Sensor Compliance', value: '100.0', unit: 'Percent (%)', page: 18, status: 'Verified' },
      { parameter: 'Fatal Injury Frequency Rate (FIFR)', value: '0.04', unit: 'Per 1k Persons', page: 40, status: 'Verified' }
    ],
    anomaliesFound: 0,
    tags: ['WCL', 'Underground', 'Methane', 'Safety', 'Sensors']
  }
];

export const SYSTEM_BENEFITS = {
  timeReductionPercent: 88.5,
  previousReportTimeHours: 36,
  currentReportTimeSeconds: 4.2,
  extractionAccuracyPercent: 98.6,
  automationPercentage: 92.4,
  parliamentaryQueriesAnswered: 412,
  totalDocumentsDigitized: 18450,
  dataConsistencyErrorsPrevented: 3240,
  totalBoreholesIndexed: 48920,
  fmcProjectsCommissioned: 34,
  seismicSurveys3D: 145
};
