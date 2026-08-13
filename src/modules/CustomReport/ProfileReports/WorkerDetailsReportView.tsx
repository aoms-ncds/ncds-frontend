// /* eslint-disable require-jsdoc */
// /* eslint-disable react/no-multi-comp */
// /* eslint-disable max-len */
// import { useState, useMemo } from 'react';
// import CommonPageLayout from '../../../components/CommonPageLayout';
// import { CssBaseline } from '@mui/material';
// import { useLocation } from 'react-router-dom';

// /* ─── Palette & Theme ─────────────────────────────────── */
// const theme = {
//   primary: '#2a31d8',
//   primaryDark: '#1e26b8',
//   primaryLight: '#eef0ff',
//   bg: '#f7f8fc',
//   surface: '#ffffff',
//   border: '#e2e5ef',
//   textPrimary: '#0f1535',
//   textSecondary: '#6b7280',
//   textMuted: '#9ca3af',
//   success: '#065f46',
//   successBg: '#e8f5e9',
//   successDot: '#43a047',
//   warning: '#92400e',
//   warningBg: '#fff3e0',
//   warningDot: '#fb8c00',
// };

// /* ─── Data ────────────────────────────────────────────── */
// const ALL_DATA = [
//   { id: 1, frNo: 'FRN0838', frDate: '25/04/2024', division: 'BARIPADA', amount: 35000, sanctionPer: 'As Per Budget', narration: 'Towards the security deposit for Fakir Mohan Parichha for his rental house at Bangalore.' },
//   { id: 2, frNo: 'FRN0645', frDate: '18/04/2024', division: 'BARIPADA', amount: 519, sanctionPer: 'As Per Budget', narration: 'Towards the expense for Postage charges.' },
//   { id: 3, frNo: 'FRN0835', frDate: '25/04/2024', division: 'BARIPADA', amount: null, sanctionPer: '', narration: 'Payment of truck rent for the transport of the house holds of Fakir Mohan Parichha from Baripada to Phulbani. Sanctioned by Pastor Ajayan Abraham. Recommendation letter with Pastor Boney Thomas.' },
//   { id: 4, frNo: 'FRN0642', frDate: '18/04/2024', division: 'BARIPADA', amount: 7000, sanctionPer: 'As Per Policy', narration: 'Towards the expense for Vehicle running charges (Diesel) for the month of March, 2024.' },
//   { id: 5, frNo: 'FRN0901', frDate: '02/05/2024', division: 'KOLKATA', amount: 12500, sanctionPer: 'As Per Budget', narration: 'Office stationery and supplies procurement for Q2.' },
//   { id: 6, frNo: 'FRN0712', frDate: '10/04/2024', division: 'BHUBANESWAR', amount: 48000, sanctionPer: 'As Per Policy', narration: 'Annual maintenance contract renewal for generator at Bhubaneswar office.' },
//   { id: 7, frNo: 'FRN0774', frDate: '15/04/2024', division: 'KOLKATA', amount: 3200, sanctionPer: 'As Per Budget', narration: 'Travel reimbursement for field visit to Sundarbans zone.' },
//   { id: 8, frNo: 'FRN0660', frDate: '20/04/2024', division: 'BHUBANESWAR', amount: 9800, sanctionPer: 'As Per Budget', narration: 'Medical allowance for staff members for April 2024.' },
// ];

// const DIVISIONS = ['All', ...new Set(ALL_DATA.map((d) => d.division))];
// const SANCTION_TYPES = ['All', ...new Set(ALL_DATA.map((d) => d.sanctionPer).filter(Boolean))];

// /* ─── MUI-style Base Components ──────────────────────── */

// // Paper
// const Paper = ({ children, sx = {} }) => (
//   <div style={{
//     background: theme.surface,
//     borderRadius: 12,
//     boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
//     overflow: 'hidden',
//     ...sx,
//   }}>{children}</div>
// );

// // TextField (outlined)
// const TextField = ({ label, value, onChange, placeholder, startAdornment, ...props }) => {
//   const [focused, setFocused] = useState(false);
//   return (
//     <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//       {startAdornment && (
//         <span style={{ position: 'absolute', left: 12, color: theme.textMuted, display: 'flex', alignItems: 'center', zIndex: 1 }}>
//           {startAdornment}
//         </span>
//       )}
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         onFocus={() => setFocused(true)}
//         onBlur={() => setFocused(false)}
//         style={{
//           width: '100%',
//           height: 42,
//           padding: `0 14px 0 ${startAdornment ? 40 : 14}px`,
//           border: `${focused ? 2 : 1.5}px solid ${focused ? theme.primary : theme.border}`,
//           borderRadius: 10,
//           fontSize: 14,
//           fontFamily: '\'DM Sans\', sans-serif',
//           color: theme.textPrimary,
//           background: 'white',
//           outline: 'none',
//           transition: 'border-color 0.15s',
//           boxSizing: 'border-box',
//         }}
//         {...props}
//       />
//     </div>
//   );
// };

// // Select (outlined)
// const Select = ({ value, onChange, options }) => {
//   const [focused, setFocused] = useState(false);
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       onFocus={() => setFocused(true)}
//       onBlur={() => setFocused(false)}
//       style={{
//         width: '100%',
//         height: 42,
//         padding: '0 32px 0 12px',
//         border: `${focused ? 2 : 1.5}px solid ${focused ? theme.primary : theme.border}`,
//         borderRadius: 10,
//         fontSize: 14,
//         fontFamily: '\'DM Sans\', sans-serif',
//         color: theme.textPrimary,
//         background: 'white',
//         outline: 'none',
//         appearance: 'none',
//         cursor: 'pointer',
//         backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M7 10l5 5 5-5z\' fill=\'%236b7280\'/%3E%3C/svg%3E")',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'right 10px center',
//       }}
//     >
//       {options.map((o) => <option key={o} value={o}>{o}</option>)}
//     </select>
//   );
// };

// // Button
// const Button = ({ children, variant = 'contained', onClick, sx = {}, size = 'medium' }) => {
//   const [hovered, setHovered] = useState(false);
//   const base = {
//     display: 'inline-flex', alignItems: 'center', gap: 6,
//     fontFamily: '\'DM Sans\', sans-serif',
//     fontWeight: 600, fontSize: size === 'small' ? 12 : 13,
//     letterSpacing: '0.02em',
//     border: 'none', borderRadius: 10, cursor: 'pointer',
//     padding: size === 'small' ? '5px 12px' : '8px 18px',
//     height: size === 'small' ? 30 : 38,
//     transition: 'all 0.15s',
//   };
//   const styles = {
//     contained: {
//       background: hovered ? theme.primaryDark : theme.primary,
//       color: 'white',
//       boxShadow: hovered ? '0 4px 14px rgba(42,49,216,0.35)' : '0 2px 6px rgba(42,49,216,0.2)',
//       transform: hovered ? 'translateY(-1px)' : 'none',
//     },
//     outlined: {
//       background: hovered ? theme.primaryLight : 'transparent',
//       color: theme.primary,
//       border: `1.5px solid ${hovered ? theme.primary : 'rgba(42,49,216,0.4)'}`,
//     },
//     ghost: {
//       background: hovered ? '#f3f4f6' : 'transparent',
//       color: theme.textSecondary,
//       border: `1.5px solid ${theme.border}`,
//     },
//     danger: {
//       background: hovered ? '#fef2f2' : 'transparent',
//       color: '#ef4444',
//       border: '1.5px solid #fecaca',
//     },
//   };
//   return (
//     <button
//       onClick={onClick}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{ ...base, ...styles[variant], ...sx }}
//     >
//       {children}
//     </button>
//   );
// };

// // Chip
// const Chip = ({ label, onDelete, color = 'primary' }) => (
//   <span style={{
//     display: 'inline-flex', alignItems: 'center', gap: 4,
//     height: 26, padding: '0 10px',
//     borderRadius: 20, fontSize: 12, fontWeight: 600,
//     background: theme.primaryLight, color: theme.primary,
//     fontFamily: '\'DM Sans\', sans-serif',
//   }}>
//     {label}
//     {onDelete && (
//       <span onClick={onDelete} style={{ cursor: 'pointer', fontSize: 15, lineHeight: 1, opacity: 0.7, marginLeft: 2 }}>×</span>
//     )}
//   </span>
// );

// // Sanction Tag
// const SanctionTag = ({ value }) => {
//   if (!value) return <span style={{ color: theme.textMuted, fontSize: 12, fontStyle: 'italic' }}>—</span>;
//   const isBudget = value === 'As Per Budget';
//   return (
//     <span style={{
//       display: 'inline-flex', alignItems: 'center', gap: 5,
//       padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
//       background: isBudget ? theme.successBg : theme.warningBg,
//       color: isBudget ? theme.success : theme.warning,
//       fontFamily: '\'DM Sans\', sans-serif',
//     }}>
//       <span style={{ width: 6, height: 6, borderRadius: '50%', background: isBudget ? theme.successDot : theme.warningDot, display: 'inline-block' }} />
//       {value}
//     </span>
//   );
// };

// // StatCard
// const StatCard = ({ icon, value, label, color = theme.primary }) => (
//   <div style={{
//     background: theme.surface,
//     border: `1.5px solid ${theme.border}`,
//     borderRadius: 14,
//     padding: '16px 20px',
//     display: 'flex', flexDirection: 'column', gap: 4,
//     flex: '1 1 140px',
//   }}>
//     <div style={{ fontSize: 22 }}>{icon}</div>
//     <div style={{ fontSize: 22, fontWeight: 800, color, fontFamily: '\'Syne\', sans-serif', lineHeight: 1.1 }}>{value}</div>
//     <div style={{ fontSize: 12, color: theme.textMuted, fontWeight: 500 }}>{label}</div>
//   </div>
// );

// // Table sort icon
// const SortIcon = ({ active, dir }) => (
//   <span style={{ marginLeft: 4, fontSize: 11, opacity: active ? 1 : 0.3 }}>
//     {active ? (dir === 'asc' ? '↑' : '↓') : '↕'}
//   </span>
// );

// /* ─── Main Component ──────────────────────────────────── */
// export default function ReportView() {
//   const [search, setSearch] = useState('');
//   const [division, setDivision] = useState('All');
//   const [sanctionType, setSanctionType] = useState('All');
//   const [amountMin, setAmountMin] = useState('');
//   const [amountMax, setAmountMax] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortField, setSortField] = useState('id');
//   const [sortDir, setSortDir] = useState('asc');
//   const [snack, setSnack] = useState(false);
//   const location = useLocation();
//   const { reportData, filters } = location.state || {};
// console.log(reportData, 'reportData');

//   const filtered = useMemo(() => {
//     const d = ALL_DATA.filter((row) => {
//       const q = search.toLowerCase();
//       const matchSearch = !q || row.frNo.toLowerCase().includes(q) || row.narration.toLowerCase().includes(q) || row.division.toLowerCase().includes(q);
//       const matchDiv = division === 'All' || row.division === division;
//       const matchSanction = sanctionType === 'All' || row.sanctionPer === sanctionType;
//       const matchMin = !amountMin || (row.amount ?? 0) >= parseFloat(amountMin);
//       const matchMax = !amountMax || (row.amount ?? 0) <= parseFloat(amountMax);
//       return matchSearch && matchDiv && matchSanction && matchMin && matchMax;
//     });
//     return [...d].sort((a, b) => {
//       let va = a[sortField]; let vb = b[sortField];
//       if (sortField === 'amount') {
//         va = va ?? -1; vb = vb ?? -1;
//       }
//       if (typeof va === 'string') va = va.toLowerCase();
//       if (typeof vb === 'string') vb = vb.toLowerCase();
//       if (va < vb) return sortDir === 'asc' ? -1 : 1;
//       if (va > vb) return sortDir === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }, [search, division, sanctionType, amountMin, amountMax, sortField, sortDir]);

//   const handleSort = (field) => {
//     if (sortField === field) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
//     else {
//       setSortField(field); setSortDir('asc');
//     }
//   };

//   const activeFilters = [
//     division !== 'All' && { label: division, clear: () => setDivision('All') },
//     sanctionType !== 'All' && { label: sanctionType, clear: () => setSanctionType('All') },
//     amountMin && { label: `≥ ₹${amountMin}`, clear: () => setAmountMin('') },
//     amountMax && { label: `≤ ₹${amountMax}`, clear: () => setAmountMax('') },
//   ].filter(Boolean);

//   const clearAll = () => {
//     setDivision('All'); setSanctionType('All'); setAmountMin(''); setAmountMax(''); setSearch('');
//   };

//   const exportCSV = () => {
//     const rows = [['Sl No', 'FR No', 'FR Date', 'Division', 'Sanction Amount', 'Sanction As Per', 'Narration'],
//       ...filtered.map((r, i) => [i+1, r.frNo, r.frDate, r.division, r.amount??'', r.sanctionPer, r.narration])];
//     const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
//     const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,\uFEFF'+encodeURIComponent(csv); a.download = 'finance_records.csv'; a.click();
//     setSnack(true); setTimeout(() => setSnack(false), 3000);
//   };

//   const totalAmount = filtered.reduce((s, r) => s + (r.amount || 0), 0);

//   const cols = [
//     { field: 'id', label: 'Sl', width: 52 },
//     { field: 'frNo', label: 'Worker ID', width: 120 },
//     { field: 'frNo', label: 'Worker Name', width: 120 },
//     { field: 'frDate', label: 'FR Date', width: 115 },
//     { field: 'division', label: 'Division', width: 130 },
//     { field: 'amount', label: 'Amount', width: 130 },
//     { field: 'sanctionPer', label: 'Sanction As Per', width: 160 },
//     { field: 'narration', label: 'Narration', width: 'auto' },
//   ];

//   return (
//     <>

//       <CommonPageLayout>

//       <CssBaseline />
//         <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: '\'DM Sans\', sans-serif', padding: '28px 20px' }}>

//           {/* Header */}
//           <div style={{ marginBottom: 24 }}>
//             <div style={{ fontFamily: '\'Syne\', sans-serif', fontSize: 28, fontWeight: 800, color: theme.textPrimary, letterSpacing: '-0.5px' }}>
//             WrokersRecords
//             </div>
//             <div style={{ color: theme.textSecondary, fontSize: 14, marginTop: 3 }}>
//             Sanction register · {filtered.length} of {ALL_DATA.length} entries
//             </div>
//           </div>

//           {/* Stat Cards */}
         

//           {/* Main Paper */}
//           <Paper>
//             {/* Toolbar */}
//             <div style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', borderBottom: `1px solid ${theme.border}` }}>
//               {/* Search */}
//               <div style={{ flex: '1 1 240px', maxWidth: 380 }}>
//                 <TextField
//                   value={search}
//                   onChange={setSearch}
//                   placeholder="Search FR No, narration, division…"
//                   startAdornment={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>}
//                 />
//               </div>

//               <Button
//                 variant={showFilters ? 'contained' : 'outlined'}
//                 onClick={() => setShowFilters((f) => !f)}
//               >
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
//               Filters
//                 {activeFilters.length > 0 && (
//                   <span style={{ background: showFilters ? 'rgba(255,255,255,0.3)' : theme.primary, color: 'white', borderRadius: '50%', width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
//                     {activeFilters.length}
//                   </span>
//                 )}
//               </Button>

//               <Button variant="contained" onClick={exportCSV}>
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
//               Export CSV
//               </Button>

//               {activeFilters.length > 0 && (
//                 <Button variant="danger" onClick={clearAll}>
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
//                 Clear All
//                 </Button>
//               )}
//             </div>

//             {/* Filter Panel */}
//             {showFilters && (
//               <div className="filter-panel" style={{ padding: '18px 20px 20px', borderBottom: `1px solid ${theme.border}`, background: '#fafbff' }}>
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
//                   {[
//                     { label: 'Division', el: <Select value={division} onChange={setDivision} options={DIVISIONS} /> },
//                     { label: 'Sanction Type', el: <Select value={sanctionType} onChange={setSanctionType} options={SANCTION_TYPES} /> },
//                     { label: 'Min Amount (₹)', el: <TextField value={amountMin} onChange={setAmountMin} placeholder="0" type="number" /> },
//                     { label: 'Max Amount (₹)', el: <TextField value={amountMax} onChange={setAmountMax} placeholder="Any" type="number" /> },
//                   ].map(({ label, el }) => (
//                     <div key={label}>
//                       <div style={{ fontSize: 11, fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>{label}</div>
//                       {el}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Active filter chips */}
//             {activeFilters.length > 0 && (
//               <div style={{ padding: '10px 20px', display: 'flex', flexWrap: 'wrap', gap: 8, borderBottom: `1px solid ${theme.border}` }}>
//                 {activeFilters.map((f: any, idx) => (
//                   <Chip key={idx} label={f.label} onDelete={f.clear} />
//                 ))}
//               </div>
//             )}

//             {/* Table */}
//             <div style={{ overflowX: 'auto' }}>
//               <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
//                 <thead>
//                   <tr style={{ background: '#f7f8fc' }}>
//                     {cols.map((col) => (
//                       <th
//                         key={col.field}
//                         className="fin-th"
//                         onClick={() => col.field !== 'narration' && handleSort(col.field)}
//                         style={{
//                           padding: '13px 16px',
//                           textAlign: 'left',
//                           fontSize: 11.5, fontWeight: 700,
//                           color: sortField === col.field ? theme.primary : theme.textSecondary,
//                           letterSpacing: '0.07em', textTransform: 'uppercase',
//                           borderBottom: `2px solid ${theme.border}`,
//                           whiteSpace: 'nowrap',
//                           width: col.width,
//                           cursor: col.field !== 'narration' ? 'pointer' : 'default',
//                           transition: 'color 0.15s',
//                           userSelect: 'none',
//                         }}
//                       >
//                         {col.label}
//                         {col.field !== 'narration' && <SortIcon active={sortField === col.field} dir={sortDir} />}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.length === 0 ? (
//                     <tr>
//                       <td colSpan={7} style={{ textAlign: 'center', padding: '56px 24px', color: theme.textMuted }}>
//                         <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
//                         <div style={{ fontSize: 15, fontWeight: 500 }}>No records match your filters</div>
//                       </td>
//                     </tr>
//                   ) : filtered.map((row, i) => (
//                     <tr key={row.id} className="fin-row" style={{ borderBottom: `1px solid ${theme.border}`, transition: 'background 0.12s' }}>
//                       <td style={{ padding: '14px 16px', color: theme.textMuted, fontWeight: 600, fontSize: 12 }}>{i + 1}</td>
//                       <td style={{ padding: '14px 16px' }}>
//                         <span style={{ fontFamily: '\'Syne\', sans-serif', fontWeight: 700, color: theme.primary, fontSize: 13 }}>{row.frNo}</span>
//                       </td>
//                       <td style={{ padding: '14px 16px', color: theme.textSecondary, whiteSpace: 'nowrap', fontSize: 13 }}>{row.frDate}</td>
//                       <td style={{ padding: '14px 16px' }}>
//                         <span style={{ display: 'inline-block', background: '#eff6ff', color: '#1d4ed8', fontWeight: 600, fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>
//                           {row.division}
//                         </span>
//                       </td>
//                       <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
//                         {row.amount != null ?
//                           <span style={{ fontWeight: 700, color: '#065f46' }}>₹{row.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span> :
//                           <span style={{ color: theme.textMuted, fontStyle: 'italic', fontSize: 12 }}>—</span>}
//                       </td>
//                       <td style={{ padding: '14px 16px' }}>
//                         <SanctionTag value={row.sanctionPer} />
//                       </td>
//                       <td style={{ padding: '14px 16px', color: '#374151', lineHeight: 1.6, maxWidth: 400, fontSize: 13 }}>{row.narration}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Footer */}
//             <div style={{ padding: '13px 20px', borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
//               <span style={{ fontSize: 13, color: theme.textMuted }}>
//               Showing <strong style={{ color: theme.textPrimary }}>{filtered.length}</strong> of {ALL_DATA.length} records
//               </span>
//               <span style={{ fontSize: 13, color: theme.textMuted }}>
//               Total sanctioned: <strong style={{ color: '#059669' }}>₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
//               </span>
//             </div>
//           </Paper>
//         </div>

//         {/* Snackbar */}
//         {snack && (
//           <div style={{
//             position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
//             background: '#1f2937', color: 'white', padding: '12px 22px', borderRadius: 10,
//             fontSize: 14, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
//             display: 'flex', alignItems: 'center', gap: 8, zIndex: 9999,
//             animation: 'slideUp 0.25s ease',
//           }}>
//             <span style={{ color: '#34d399' }}>✓</span> CSV exported successfully
//           </div>
//         )}
//       </CommonPageLayout>
//     </>
//   );
// }
