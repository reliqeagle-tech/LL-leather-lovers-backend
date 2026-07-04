
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import {
//   TbCategory, TbPlus, TbPencil, TbTrash, TbCheck, TbX,
//   TbChevronDown, TbChevronUp, TbSearch, TbRefresh,
//   TbTag, TbAlertTriangle, TbFolder, TbFolderOpen,
//   TbDotsVertical, TbArrowsSort
// } from 'react-icons/tb';
// import { backendUrl } from '../../App';


// /* ── Color tokens — D Dolly Lamb theme ── */
// const B = {
//   bg: '#FAFAF8',
//   surface: '#F4F2EE',
//   surface2: '#EDE9E2',
//   surfaceCard: '#FFFFFF',
//   navy: '#1C2B3A',
//   navyMid: '#2E4057',
//   navySoft: '#4A6070',
//   navyGhost: '#8FA0AD',
//   green: '#1A7A4A',
//   greenLight: '#2A9960',
//   greenBg: '#E8F4EE',
//   greenBdr: '#A8D5BC',
//   gold: '#B8985A',
//   goldBg: '#FBF5E8',
//   goldBdr: '#DBC98A',
//   border: '#E0DBD3',
//   borderStrong: '#C8C2B8',
//   emerald: { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0', dot: '#10B981' },
//   amber: { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A', dot: '#F59E0B' },
//   red: { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA', dot: '#EF4444' },
//   blue: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE', dot: '#3B82F6' },
//   violet: { bg: '#F5F3FF', text: '#5B21B6', border: '#DDD6FE', dot: '#7C3AED' },
// };

// const cardStyle = (extra = {}) => ({
//   background: B.surfaceCard,
//   border: `1px solid ${B.border}`,
//   borderRadius: 16,
//   overflow: 'hidden',
//   boxShadow: '0 1px 4px rgba(28,43,58,0.06)',
//   ...extra,
// });

// const inputStyle = (err = false) => ({
//   width: '100%',
//   padding: '9px 13px',
//   borderRadius: 9,
//   border: `1px solid ${err ? B.red.border : B.border}`,
//   background: err ? '#FEF2F2' : B.surfaceCard,
//   color: B.navy,
//   fontSize: 13.5,
//   outline: 'none',
//   fontFamily: 'inherit',
//   transition: 'border-color .15s',
//   boxSizing: 'border-box',
// });

// /* ── Confirm Dialog ── */
// const ConfirmDialog = ({ msg, onYes, onNo }) => (
//   <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(28,43,58,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
//     <div style={{ ...cardStyle(), padding: 28, maxWidth: 380, width: '100%', textAlign: 'center', borderRadius: 18, boxShadow: '0 20px 60px rgba(28,43,58,0.18)' }}>
//       <div style={{ width: 52, height: 52, borderRadius: 14, background: B.red.bg, border: `1px solid ${B.red.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
//         <TbAlertTriangle size={24} style={{ color: B.red.dot }} />
//       </div>
//       <p style={{ color: B.navy, fontSize: 15, fontWeight: 700, marginBottom: 8, fontFamily: 'Georgia, serif' }}>Confirm Delete</p>
//       <p style={{ color: B.navySoft, fontSize: 13, lineHeight: 1.6, marginBottom: 22 }}>{msg}</p>
//       <div style={{ display: 'flex', gap: 10 }}>
//         <button onClick={onNo} style={{ flex: 1, padding: '10px', borderRadius: 10, border: `1px solid ${B.border}`, background: B.surfaceCard, color: B.navySoft, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
//         <button onClick={onYes} style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: B.red.dot, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Delete</button>
//       </div>
//     </div>
//   </div>
// );

// /* ══════════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════════ */
// const CategoryManagement = ({ token }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');

//   /* Add category */
//   const [newCatName, setNewCatName] = useState('');
//   const [addingCat, setAddingCat] = useState(false);

//   /* Edit category */
//   const [editCatId, setEditCatId] = useState(null);
//   const [editCatName, setEditCatName] = useState('');

//   /* Expanded categories */
//   const [expanded, setExpanded] = useState(new Set());

//   /* Add subcategory */
//   const [newSubMap, setNewSubMap] = useState({}); // { catId: '' }
//   const [addingSubId, setAddingSubId] = useState(null);

//   /* Edit subcategory */
//   const [editSub, setEditSub] = useState(null); // { catId, idx, val }

//   /* Delete confirm */
//   const [confirm, setConfirm] = useState(null); // { msg, onYes }

//   const newCatRef = useRef(null);

//   /* ── Fetch ── */
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${backendUrl}/api/category/list`);
//       if (res.data.success) setCategories(res.data.categories);
//       else toast.error(res.data.message);
//     } catch { toast.error('Failed to load categories'); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchCategories(); }, []);

//   /* ── Toggle expand ── */
//   const toggleExpand = (id) => {
//     setExpanded(prev => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };

//   /* ── Add Category ── */
//   const addCategory = async () => {
//     if (!newCatName.trim()) return toast.error('Enter category name');
//     setAddingCat(true);
//     try {
//       const res = await axios.post(`${backendUrl}/api/category/add`, { categoryName: newCatName.trim() }, { headers: { token } });
//       if (res.data.success) {
//         toast.success(`"${newCatName.trim()}" added!`);
//         setNewCatName('');
//         fetchCategories();
//       } else toast.error(res.data.message);
//     } catch { toast.error('Failed to add category'); }
//     finally { setAddingCat(false); }
//   };

//   /* ── Update Category name ── */
//   const updateCatName = async (id) => {
//     if (!editCatName.trim()) return toast.error('Name cannot be empty');
//     try {
//       const res = await axios.put(`${backendUrl}/api/category/update/${id}`, { categoryName: editCatName.trim() }, { headers: { token } });
//       if (res.data.success) {
//         toast.success('Category renamed!');
//         setEditCatId(null);
//         fetchCategories();
//       } else toast.error(res.data.message);
//     } catch { toast.error('Update failed'); }
//   };

//   /* ── Delete Category ── */
//   const deleteCategory = (cat) => {
//     setConfirm({
//       msg: `Delete "${cat.categoryName}" and all its ${cat.subCategories.length} subcategories? This cannot be undone.`,
//       onYes: async () => {
//         setConfirm(null);
//         try {
//           const res = await axios.delete(`${backendUrl}/api/category/delete/${cat._id}`, { headers: { token } });
//           if (res.data.success) { toast.success('Category deleted!'); fetchCategories(); }
//           else toast.error(res.data.message);
//         } catch { toast.error('Delete failed'); }
//       }
//     });
//   };

//   /* ── Add Subcategory ── */
//   const addSubcategory = async (cat) => {
//     const val = (newSubMap[cat._id] || '').trim();
//     if (!val) return toast.error('Enter subcategory name');
//     if (cat.subCategories.includes(val)) return toast.error('Already exists');
//     setAddingSubId(cat._id);
//     try {
//       const updated = [...cat.subCategories, val];
//       const res = await axios.put(`${backendUrl}/api/category/update/${cat._id}`, { subCategories: updated }, { headers: { token } });
//       if (res.data.success) {
//         toast.success(`"${val}" added!`);
//         setNewSubMap(prev => ({ ...prev, [cat._id]: '' }));
//         fetchCategories();
//       } else toast.error(res.data.message);
//     } catch { toast.error('Failed to add subcategory'); }
//     finally { setAddingSubId(null); }
//   };

//   /* ── Update Subcategory ── */
//   const updateSub = async (cat, idx, newVal) => {
//     if (!newVal.trim()) return toast.error('Name cannot be empty');
//     const updated = [...cat.subCategories];
//     updated[idx] = newVal.trim();
//     try {
//       const res = await axios.put(`${backendUrl}/api/category/update/${cat._id}`, { subCategories: updated }, { headers: { token } });
//       if (res.data.success) { toast.success('Updated!'); setEditSub(null); fetchCategories(); }
//       else toast.error(res.data.message);
//     } catch { toast.error('Update failed'); }
//   };

//   /* ── Delete Subcategory ── */
//   const deleteSub = (cat, idx) => {
//     setConfirm({
//       msg: `Delete subcategory "${cat.subCategories[idx]}"?`,
//       onYes: async () => {
//         setConfirm(null);
//         const updated = cat.subCategories.filter((_, i) => i !== idx);
//         try {
//           const res = await axios.put(`${backendUrl}/api/category/update/${cat._id}`, { subCategories: updated }, { headers: { token } });
//           if (res.data.success) { toast.success('Subcategory deleted!'); fetchCategories(); }
//           else toast.error(res.data.message);
//         } catch { toast.error('Delete failed'); }
//       }
//     });
//   };

//   /* ── Filtered categories ── */
//   // const filtered = categories.filter(c =>
//   //   c.name.toLowerCase().includes(search.toLowerCase()) ||
//   //   c.subcategories.some(s => s.toLowerCase().includes(search.toLowerCase()))
//   // );

//   const filtered = categories.filter(c =>
//     (c.categoryName || "")
//       .toLowerCase()
//       .includes(search.toLowerCase()) ||

//     (c.subCategories || []).some(s =>
//       s.toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   // const totalSubs = categories.reduce((sum, c) => sum + c.subcategories.length, 0);
//   const totalSubs = categories.reduce(
//     (sum, c) => sum + (c.subCategories?.length || 0),
//     0
//   );

//   /* ══════════════════════════════════════════
//      RENDER
//   ══════════════════════════════════════════ */
//   return (
//     <div style={{ background: B.bg, minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", WebkitFontSmoothing: 'antialiased', marginTop: 50 }}>
//       <style>{`
//                 @keyframes slideDown { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
//                 @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
//                 .cm-card  { animation: fadeIn .25s ease; }
//                 .cm-sub   { animation: slideDown .2s ease; }
//                 .cm-btn   { transition: all .15s; }
//                 .cm-btn:hover { opacity: .85; }
//                 input::placeholder { color: ${B.navyGhost}; }
//             `}</style>

//       {/* ══ HEADER ══ */}
//       <div style={{ position: 'sticky', top: 0, zIndex: 40, background: `${B.surfaceCard}f2`, backdropFilter: 'blur(14px)', borderBottom: `1px solid ${B.border}`, boxShadow: '0 2px 8px rgba(28,43,58,0.07)', height: 60, display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//           <div style={{ width: 36, height: 36, borderRadius: 10, background: B.greenBg, border: `1px solid ${B.greenBdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <TbCategory size={18} style={{ color: B.green }} />
//           </div>
//           <div>
//             <h1 style={{ color: B.navy, fontSize: 16, fontWeight: 800, letterSpacing: -.3, margin: 0, fontFamily: 'Georgia, serif' }}>Categories</h1>
//             <p style={{ color: B.navyGhost, fontSize: 11, margin: 0 }}>Manage product categories & subcategories</p>
//           </div>
//         </div>
//         <button onClick={fetchCategories} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, border: `1px solid ${B.border}`, background: B.surfaceCard, color: B.navySoft, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
//           <TbRefresh size={13} /> Refresh
//         </button>
//       </div>

//       <div style={{ padding: '20px 24px 60px', maxWidth: 960, margin: '0 auto' }}>

//         {/* ══ STATS ══ */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
//           {[
//             { label: 'Total Categories', val: categories.length, color: B.blue, icon: <TbFolder size={16} style={{ color: B.blue.text }} /> },
//             { label: 'Total Subcategories', val: totalSubs, color: B.emerald, icon: <TbTag size={16} style={{ color: B.emerald.text }} /> },
//             { label: 'Avg Subcategories', val: categories.length ? (totalSubs / categories.length).toFixed(1) : 0, color: B.violet, icon: <TbArrowsSort size={16} style={{ color: B.violet.text }} /> },
//           ].map(({ label, val, color, icon }) => (
//             <div key={label} style={{ ...cardStyle(), padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
//               <div style={{ width: 40, height: 40, borderRadius: 11, background: color.bg, border: `1px solid ${color.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                 {icon}
//               </div>
//               <div>
//                 <p style={{ color: B.navy, fontSize: 22, fontWeight: 800, margin: 0, fontFamily: 'Georgia, serif', lineHeight: 1 }}>{val}</p>
//                 <p style={{ color: B.navyGhost, fontSize: 11, margin: '3px 0 0', fontWeight: 600 }}>{label}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ══ ADD CATEGORY ══ */}
//         <div style={{ ...cardStyle(), marginBottom: 16 }}>
//           <div style={{ padding: '14px 20px', borderBottom: `1px solid ${B.border}`, background: B.surface, display: 'flex', alignItems: 'center', gap: 12 }}>
//             <div style={{ width: 32, height: 32, borderRadius: 9, background: B.greenBg, border: `1px solid ${B.greenBdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <TbPlus size={15} style={{ color: B.green }} />
//             </div>
//             <p style={{ color: B.navy, fontSize: 13.5, fontWeight: 700, margin: 0, fontFamily: 'Georgia, serif' }}>Add New Category</p>
//           </div>
//           <div style={{ padding: 20 }}>
//             <div style={{ display: 'flex', gap: 10 }}>
//               <input
//                 ref={newCatRef}
//                 style={inputStyle()}
//                 type="text"
//                 placeholder="e.g. Men's Jackets, Pillow Covers…"
//                 value={newCatName}
//                 onChange={e => setNewCatName(e.target.value)}
//                 onKeyDown={e => e.key === 'Enter' && addCategory()}
//                 onFocus={e => e.target.style.borderColor = B.greenBdr}
//                 onBlur={e => e.target.style.borderColor = B.border}
//               />
//               <button
//                 onClick={addCategory}
//                 disabled={addingCat}
//                 style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 9, background: B.green, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', flexShrink: 0, opacity: addingCat ? .6 : 1, transition: 'background .15s' }}
//                 onMouseEnter={e => { if (!addingCat) e.currentTarget.style.background = B.greenLight; }}
//                 onMouseLeave={e => e.currentTarget.style.background = B.green}
//               >
//                 <TbPlus size={15} /> {addingCat ? 'Adding…' : 'Add Category'}
//               </button>
//             </div>
//             <p style={{ color: B.navyGhost, fontSize: 11.5, marginTop: 8 }}>Press Enter or click Add. Category name must be unique.</p>
//           </div>
//         </div>

//         {/* ══ SEARCH ══ */}
//         <div style={{ position: 'relative', marginBottom: 16 }}>
//           <TbSearch size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: B.navyGhost, pointerEvents: 'none' }} />
//           <input
//             style={{ ...inputStyle(), paddingLeft: 38 }}
//             type="text"
//             placeholder="Search categories or subcategories…"
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             onFocus={e => e.target.style.borderColor = B.greenBdr}
//             onBlur={e => e.target.style.borderColor = B.border}
//           />
//           {search && (
//             <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: B.navyGhost, display: 'flex', alignItems: 'center' }}>
//               <TbX size={14} />
//             </button>
//           )}
//         </div>

//         {/* ══ CATEGORIES LIST ══ */}
//         {loading ? (
//           <div style={{ textAlign: 'center', padding: '60px 0' }}>
//             <div style={{ width: 36, height: 36, borderRadius: '50%', border: `3px solid ${B.border}`, borderTopColor: B.green, animation: 'spin 1s linear infinite', margin: '0 auto 14px' }} />
//             <p style={{ color: B.navyGhost, fontSize: 13 }}>Loading categories…</p>
//             <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//           </div>
//         ) : filtered.length === 0 ? (
//           <div style={{ ...cardStyle(), padding: '52px 20px', textAlign: 'center' }}>
//             <TbFolder size={40} style={{ color: B.navyGhost, margin: '0 auto 14px', display: 'block', opacity: .5 }} />
//             <p style={{ color: B.navySoft, fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
//               {search ? 'No results found' : 'No categories yet'}
//             </p>
//             <p style={{ color: B.navyGhost, fontSize: 12.5 }}>
//               {search ? `Try a different search term` : 'Add your first category above'}
//             </p>
//           </div>
//         ) : (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//             {filtered.map((cat) => {
//               const isExpanded = expanded.has(cat._id);
//               const isEditingCat = editCatId === cat._id;
//               const subInput = newSubMap[cat._id] || '';

//               return (
//                 <div key={cat._id} className="cm-card" style={cardStyle()}>

//                   {/* ── Category Row ── */}
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: isExpanded ? B.greenBg : B.surfaceCard, borderBottom: isExpanded ? `1px solid ${B.greenBdr}` : 'none', transition: 'background .2s' }}>

//                     {/* Expand toggle */}
//                     <button
//                       onClick={() => toggleExpand(cat._id)}
//                       style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${isExpanded ? B.greenBdr : B.border}`, background: isExpanded ? B.green : B.surface, color: isExpanded ? '#fff' : B.navySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .18s' }}>
//                       {isExpanded ? <TbChevronUp size={13} /> : <TbChevronDown size={13} />}
//                     </button>

//                     {/* Icon */}
//                     <div style={{ flexShrink: 0 }}>
//                       {isExpanded
//                         ? <TbFolderOpen size={18} style={{ color: B.green }} />
//                         : <TbFolder size={18} style={{ color: B.navySoft }} />}
//                     </div>

//                     {/* Name / Edit input */}
//                     {isEditingCat ? (
//                       <div style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'center' }}>
//                         <input
//                           autoFocus
//                           style={{ ...inputStyle(), flex: 1 }}
//                           value={editCatName}
//                           onChange={e => setEditCatName(e.target.value)}
//                           onKeyDown={e => {
//                             if (e.key === 'Enter') updateCatName(cat._id);
//                             if (e.key === 'Escape') setEditCatId(null);
//                           }}
//                           onFocus={e => e.target.style.borderColor = B.greenBdr}
//                           onBlur={e => e.target.style.borderColor = B.border}
//                         />
//                         <button onClick={() => updateCatName(cat._id)} style={{ width: 32, height: 32, borderRadius: 8, background: B.green, border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
//                           <TbCheck size={14} />
//                         </button>
//                         <button onClick={() => setEditCatId(null)} style={{ width: 32, height: 32, borderRadius: 8, background: B.red.bg, border: `1px solid ${B.red.border}`, color: B.red.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
//                           <TbX size={14} />
//                         </button>
//                       </div>
//                     ) : (
//                       <div style={{ flex: 1 }}>
//                         <p style={{ color: B.navy, fontSize: 14, fontWeight: 700, margin: 0 }}>{cat.categoryName}</p>
//                         <p style={{ color: B.navyGhost, fontSize: 11, margin: '2px 0 0' }}>
//                           {cat.subCategories.length} subcategor{cat.subCategories.length === 1 ? 'y' : 'ies'}
//                         </p>
//                       </div>
//                     )}

//                     {/* Subcategory count badge */}
//                     {!isEditingCat && cat.subCategories.length > 0 && (
//                       <span style={{ padding: '3px 10px', borderRadius: 99, background: isExpanded ? B.green : B.surface2, color: isExpanded ? '#fff' : B.navySoft, fontSize: 11, fontWeight: 700, flexShrink: 0, transition: 'all .2s' }}>
//                         {cat.subCategories.length}
//                       </span>
//                     )}

//                     {/* Edit / Delete buttons */}
//                     {!isEditingCat && (
//                       <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
//                         <button
//                           onClick={() => { setEditCatId(cat._id); setEditCatName(cat.categoryName); }}
//                           style={{ width: 32, height: 32, borderRadius: 8, background: B.blue.bg, border: `1px solid ${B.blue.border}`, color: B.blue.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .15s' }}
//                           title="Rename category">
//                           <TbPencil size={13} />
//                         </button>
//                         <button
//                           onClick={() => deleteCategory(cat)}
//                           style={{ width: 32, height: 32, borderRadius: 8, background: B.red.bg, border: `1px solid ${B.red.border}`, color: B.red.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .15s' }}
//                           title="Delete category">
//                           <TbTrash size={13} />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   {/* ── Subcategories Panel ── */}
//                   {isExpanded && (
//                     <div className="cm-sub" style={{ padding: '16px 18px', background: B.surfaceCard }}>

//                       {/* Add subcategory input */}
//                       <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
//                         <input
//                           style={{ ...inputStyle(), flex: 1 }}
//                           type="text"
//                           placeholder={`Add subcategory to "${cat.categoryName}"…`}
//                           value={subInput}
//                           onChange={e => setNewSubMap(prev => ({ ...prev, [cat._id]: e.target.value }))}
//                           onKeyDown={e => e.key === 'Enter' && addSubcategory(cat)}
//                           onFocus={e => e.target.style.borderColor = B.greenBdr}
//                           onBlur={e => e.target.style.borderColor = B.border}
//                         />
//                         <button
//                           onClick={() => addSubcategory(cat)}
//                           disabled={addingSubId === cat._id}
//                           style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 9, background: B.greenBg, color: B.green, border: `1px solid ${B.greenBdr}`, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', flexShrink: 0, transition: 'all .15s' }}
//                           onMouseEnter={e => { e.currentTarget.style.background = B.green; e.currentTarget.style.color = '#fff'; }}
//                           onMouseLeave={e => { e.currentTarget.style.background = B.greenBg; e.currentTarget.style.color = B.green; }}>
//                           <TbPlus size={13} /> {addingSubId === cat._id ? 'Adding…' : 'Add'}
//                         </button>
//                       </div>

//                       {/* Subcategory list */}
//                       {cat.subCategories.length === 0 ? (
//                         <div style={{ textAlign: 'center', padding: '20px', border: `2px dashed ${B.border}`, borderRadius: 10 }}>
//                           <TbTag size={22} style={{ color: B.navyGhost, margin: '0 auto 6px', display: 'block', opacity: .5 }} />
//                           <p style={{ color: B.navyGhost, fontSize: 12.5 }}>No subcategories yet — add one above</p>
//                         </div>
//                       ) : (
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                           {cat.subCategories.map((sub, idx) => {
//                             const isEditingSub = editSub?.catId === cat._id && editSub?.idx === idx;
//                             return (
//                               <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', background: B.surface, border: `1px solid ${B.border}`, borderRadius: 10, transition: 'border-color .15s' }}
//                                 onMouseEnter={e => e.currentTarget.style.borderColor = B.greenBdr}
//                                 onMouseLeave={e => e.currentTarget.style.borderColor = B.border}>

//                                 {/* Sub icon */}
//                                 <div style={{ width: 6, height: 6, borderRadius: '50%', background: B.green, flexShrink: 0, opacity: .6 }} />

//                                 {/* Sub name / edit */}
//                                 {isEditingSub ? (
//                                   <div style={{ flex: 1, display: 'flex', gap: 7 }}>
//                                     <input
//                                       autoFocus
//                                       style={{ ...inputStyle(), flex: 1, padding: '6px 10px', fontSize: 13 }}
//                                       value={editSub.val}
//                                       onChange={e => setEditSub(prev => ({ ...prev, val: e.target.value }))}
//                                       onKeyDown={e => {
//                                         if (e.key === 'Enter') updateSub(cat, idx, editSub.val);
//                                         if (e.key === 'Escape') setEditSub(null);
//                                       }}
//                                       onFocus={e => e.target.style.borderColor = B.greenBdr}
//                                       onBlur={e => e.target.style.borderColor = B.border}
//                                     />
//                                     <button onClick={() => updateSub(cat, idx, editSub.val)} style={{ width: 28, height: 28, borderRadius: 7, background: B.green, border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
//                                       <TbCheck size={12} />
//                                     </button>
//                                     <button onClick={() => setEditSub(null)} style={{ width: 28, height: 28, borderRadius: 7, background: B.red.bg, border: `1px solid ${B.red.border}`, color: B.red.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
//                                       <TbX size={12} />
//                                     </button>
//                                   </div>
//                                 ) : (
//                                   <span style={{ flex: 1, color: B.navyMid, fontSize: 13, fontWeight: 500 }}>{sub}</span>
//                                 )}

//                                 {/* Sub edit/delete buttons */}
//                                 {!isEditingSub && (
//                                   <div style={{ display: 'flex', gap: 5 }}>
//                                     <button
//                                       onClick={() => setEditSub({ catId: cat._id, idx, val: sub })}
//                                       style={{ width: 26, height: 26, borderRadius: 7, background: B.blue.bg, border: `1px solid ${B.blue.border}`, color: B.blue.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
//                                       title="Edit">
//                                       <TbPencil size={11} />
//                                     </button>
//                                     <button
//                                       onClick={() => deleteSub(cat, idx)}
//                                       style={{ width: 26, height: 26, borderRadius: 7, background: B.red.bg, border: `1px solid ${B.red.border}`, color: B.red.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
//                                       title="Delete">
//                                       <TbX size={11} />
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             );
//                           })}
//                         </div>
//                       )}

//                       {/* Sub count footer */}
//                       {cat.subCategories.length > 0 && (
//                         <p style={{ color: B.navyGhost, fontSize: 11, marginTop: 10, textAlign: 'right' }}>
//                           {cat.subCategories.length} subcategor{cat.subCategories.length === 1 ? 'y' : 'ies'} in "{cat.categoryName}"
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Result count */}
//         {search && filtered.length > 0 && (
//           <p style={{ color: B.navyGhost, fontSize: 12, textAlign: 'center', marginTop: 14 }}>
//             Showing {filtered.length} of {categories.length} categories
//           </p>
//         )}
//       </div>

//       {/* ── Confirm Dialog ── */}
//       {confirm && <ConfirmDialog msg={confirm.msg} onYes={confirm.onYes} onNo={() => setConfirm(null)} />}
//     </div>
//   );
// };

// export default CategoryManagement;



// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import {
//   TbCategory, TbPlus, TbPencil, TbTrash, TbCheck, TbX,
//   TbChevronDown, TbChevronUp, TbSearch, TbRefresh,
//   TbTag, TbAlertTriangle, TbFolder, TbFolderOpen,
//   TbArrowsSort
// } from 'react-icons/tb';
// import { backendUrl } from '../../App';

// /* ══════════════════════════════════════════
//    CONFIRM DIALOG
// ══════════════════════════════════════════ */
// const ConfirmDialog = ({ msg, onYes, onNo }) => (
//   <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-5">
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl p-7 max-w-sm w-full text-center">
//       <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
//         <TbAlertTriangle size={26} className="text-red-500" />
//       </div>
//       <p className="text-[15px] font-bold text-gray-900 mb-2">Confirm Delete</p>
//       <p className="text-[13px] text-gray-500 leading-relaxed mb-6">{msg}</p>
//       <div className="flex gap-3">
//         <button onClick={onNo}
//           className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-[13px] font-semibold hover:bg-gray-50 transition-colors">
//           Cancel
//         </button>
//         <button onClick={onYes}
//           className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors">
//           Delete
//         </button>
//       </div>
//     </div>
//   </div>
// );

// /* ══════════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════════ */
// const CategoryManagement = ({ token }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');

//   /* Add category */
//   const [newCatName, setNewCatName] = useState('');
//   const [addingCat, setAddingCat] = useState(false);

//   /* Edit category */
//   const [editCatId, setEditCatId] = useState(null);
//   const [editCatName, setEditCatName] = useState('');

//   /* Expanded */
//   const [expanded, setExpanded] = useState(new Set());

//   /* Add subcategory */
//   const [newSubMap, setNewSubMap] = useState({});
//   const [addingSubId, setAddingSubId] = useState(null);

//   /* Edit subcategory */
//   const [editSub, setEditSub] = useState(null);

//   /* Confirm dialog */
//   const [confirm, setConfirm] = useState(null);

//   const newCatRef = useRef(null);

//   /* ── Fetch ── */
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${backendUrl}/api/category/list`);
//       if (res.data.success) setCategories(res.data.categories);
//       else toast.error(res.data.message);
//     } catch { toast.error('Failed to load categories'); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchCategories(); }, []);

//   /* ── Toggle expand ── */
//   const toggleExpand = (id) => {
//     setExpanded(prev => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };

//   /* ── Add Category ── */
//   const addCategory = async () => {
//     if (!newCatName.trim()) return toast.error('Enter category name');
//     setAddingCat(true);
//     try {
//       const res = await axios.post(`${backendUrl}/api/category/add`,
//         { categoryName: newCatName.trim() },
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         toast.success(`"${newCatName.trim()}" added!`);
//         setNewCatName('');
//         fetchCategories();
//       } else toast.error(res.data.message);
//     } catch { toast.error('Failed to add category'); }
//     finally { setAddingCat(false); }
//   };

//   /* ── Update Category name ── */
//   const updateCatName = async (id) => {
//     if (!editCatName.trim()) return toast.error('Name cannot be empty');
//     try {
//       const res = await axios.put(
//         `${backendUrl}/api/category/update/${id}`,
//         { categoryName: editCatName.trim() },
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         toast.success('Category renamed!');
//         setEditCatId(null);
//         fetchCategories();
//       } else toast.error(res.data.message);
//     } catch { toast.error('Update failed'); }
//   };

//   /* ── Delete Category ── */
//   const deleteCategory = (cat) => {
//     setConfirm({
//       msg: `Delete "${cat.categoryName}" and all its ${cat.subCategories.length} subcategories? This cannot be undone.`,
//       onYes: async () => {
//         setConfirm(null);
//         try {
//           const res = await axios.delete(
//             `${backendUrl}/api/category/delete/${cat._id}`,
//             { headers: { token } }
//           );
//           if (res.data.success) { toast.success('Category deleted!'); fetchCategories(); }
//           else toast.error(res.data.message);
//         } catch { toast.error('Delete failed'); }
//       }
//     });
//   };

//   /* ── Add Subcategory ── */
//   const addSubcategory = async (cat) => {
//     const val = (newSubMap[cat._id] || '').trim();
//     if (!val) return toast.error('Enter subcategory name');
//     if (cat.subCategories.includes(val)) return toast.error('Already exists');
//     setAddingSubId(cat._id);
//     try {
//       const updated = [...cat.subCategories, val];
//       const res = await axios.put(
//         `${backendUrl}/api/category/update/${cat._id}`,
//         { subCategories: updated },
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         toast.success(`"${val}" added!`);
//         setNewSubMap(prev => ({ ...prev, [cat._id]: '' }));
//         fetchCategories();
//       } else toast.error(res.data.message);
//     } catch { toast.error('Failed to add subcategory'); }
//     finally { setAddingSubId(null); }
//   };

//   /* ── Update Subcategory ── */
//   const updateSub = async (cat, idx, newVal) => {
//     if (!newVal.trim()) return toast.error('Name cannot be empty');
//     const updated = [...cat.subCategories];
//     updated[idx] = newVal.trim();
//     try {
//       const res = await axios.put(
//         `${backendUrl}/api/category/update/${cat._id}`,
//         { subCategories: updated },
//         { headers: { token } }
//       );
//       if (res.data.success) { toast.success('Updated!'); setEditSub(null); fetchCategories(); }
//       else toast.error(res.data.message);
//     } catch { toast.error('Update failed'); }
//   };

//   /* ── Delete Subcategory ── */
//   const deleteSub = (cat, idx) => {
//     setConfirm({
//       msg: `Delete subcategory "${cat.subCategories[idx]}"?`,
//       onYes: async () => {
//         setConfirm(null);
//         const updated = cat.subCategories.filter((_, i) => i !== idx);
//         try {
//           const res = await axios.put(
//             `${backendUrl}/api/category/update/${cat._id}`,
//             { subCategories: updated },
//             { headers: { token } }
//           );
//           if (res.data.success) { toast.success('Subcategory deleted!'); fetchCategories(); }
//           else toast.error(res.data.message);
//         } catch { toast.error('Delete failed'); }
//       }
//     });
//   };

//   /* ── Filtered ── */
//   const filtered = categories.filter(c =>
//     (c.categoryName || '').toLowerCase().includes(search.toLowerCase()) ||
//     (c.subCategories || []).some(s => s.toLowerCase().includes(search.toLowerCase()))
//   );

//   const totalSubs = categories.reduce((sum, c) => sum + (c.subCategories?.length || 0), 0);

//   /* ══════════════════════════════════════════
//      RENDER
//   ══════════════════════════════════════════ */
//   return (
//     <div className="min-h-screen bg-[#f7f7f5]">
//       <style>{`
//         @keyframes slideDown { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:none } }
//         @keyframes fadeIn    { from { opacity:0 } to { opacity:1 } }
//         @keyframes spin      { to   { transform: rotate(360deg) } }
//         .cm-card { animation: fadeIn .2s ease; }
//         .cm-sub  { animation: slideDown .18s ease; }
//       `}</style>

//       {/* ══ STICKY HEADER ══ */}
//       <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm h-16 flex items-center px-6 justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
//             <TbCategory size={18} className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-[17px] font-extrabold text-gray-900 leading-none tracking-tight">Categories</h1>
//             <p className="text-[11px] text-gray-400 mt-0.5">Manage product categories & subcategories</p>
//           </div>
//         </div>
//         <button onClick={fetchCategories}
//           className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
//           <TbRefresh size={14} /> Refresh
//         </button>
//       </div>

//       <div className="p-6 max-w-4xl mx-auto pb-16">

//         {/* ══ STATS ══ */}
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           {[
//             { label: 'Total Categories', val: categories.length, icon: <TbFolder size={16} className="text-indigo-600" />, bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600' },
//             { label: 'Total Subcategories', val: totalSubs, icon: <TbTag size={16} className="text-emerald-600" />, bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600' },
//             { label: 'Avg Subcategories', val: categories.length ? (totalSubs / categories.length).toFixed(1) : '0', icon: <TbArrowsSort size={16} className="text-violet-600" />, bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-600' },
//           ].map(({ label, val, icon, bg, border, text }) => (
//             <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
//               <div className={`w-11 h-11 rounded-xl ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
//                 {icon}
//               </div>
//               <div>
//                 <p className="text-[24px] font-extrabold text-gray-900 leading-none">{val}</p>
//                 <p className="text-[11px] text-gray-400 mt-1 font-medium">{label}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ══ ADD CATEGORY CARD ══ */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5">
//           <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
//             <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
//               <TbPlus size={15} className="text-indigo-600" />
//             </div>
//             <p className="text-[14px] font-bold text-gray-900">Add New Category</p>
//           </div>
//           <div className="p-5">
//             <div className="flex gap-3">
//               <input
//                 ref={newCatRef}
//                 type="text"
//                 placeholder="e.g. Men's Jackets, Pillow Covers…"
//                 value={newCatName}
//                 onChange={e => setNewCatName(e.target.value)}
//                 onKeyDown={e => e.key === 'Enter' && addCategory()}
//                 className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-all"
//               />
//               <button
//                 onClick={addCategory}
//                 disabled={addingCat}
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold transition-colors shadow-sm disabled:opacity-60 flex-shrink-0">
//                 <TbPlus size={15} /> {addingCat ? 'Adding…' : 'Add Category'}
//               </button>
//             </div>
//             <p className="text-[11.5px] text-gray-400 mt-2">Press Enter or click Add. Category name must be unique.</p>
//           </div>
//         </div>

//         {/* ══ SEARCH ══ */}
//         <div className="relative mb-5">
//           <TbSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//           <input
//             type="text"
//             placeholder="Search categories or subcategories…"
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-[13.5px] text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all shadow-sm"
//           />
//           {search && (
//             <button onClick={() => setSearch('')}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
//               <TbX size={14} />
//             </button>
//           )}
//         </div>

//         {/* ══ LIST ══ */}
//         {loading ? (
//           <div className="text-center py-16">
//             <div className="w-9 h-9 rounded-full border-[3px] border-gray-200 border-t-indigo-500 mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
//             <p className="text-[13px] text-gray-400">Loading categories…</p>
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-14 text-center">
//             <TbFolder size={40} className="text-gray-200 mx-auto mb-3" />
//             <p className="text-[14px] font-semibold text-gray-500 mb-1">
//               {search ? 'No results found' : 'No categories yet'}
//             </p>
//             <p className="text-[12.5px] text-gray-400">
//               {search ? 'Try a different search term' : 'Add your first category above'}
//             </p>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {filtered.map((cat) => {
//               const isExpanded = expanded.has(cat._id);
//               const isEditingCat = editCatId === cat._id;
//               const subInput = newSubMap[cat._id] || '';

//               return (
//                 <div key={cat._id} className="cm-card bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

//                   {/* ── Category Row ── */}
//                   <div className={`flex items-center gap-3 px-5 py-4 transition-colors ${isExpanded ? 'bg-indigo-50 border-b border-indigo-100' : 'bg-white'}`}>

//                     {/* Expand toggle */}
//                     <button
//                       onClick={() => toggleExpand(cat._id)}
//                       className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all
//                         ${isExpanded
//                           ? 'bg-indigo-600 border-indigo-600 text-white'
//                           : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'}`}>
//                       {isExpanded ? <TbChevronUp size={13} /> : <TbChevronDown size={13} />}
//                     </button>

//                     {/* Folder icon */}
//                     <div className="flex-shrink-0">
//                       {isExpanded
//                         ? <TbFolderOpen size={18} className="text-indigo-600" />
//                         : <TbFolder size={18} className="text-gray-400" />}
//                     </div>

//                     {/* Name / edit input */}
//                     {isEditingCat ? (
//                       <div className="flex-1 flex gap-2 items-center">
//                         <input
//                           autoFocus
//                           value={editCatName}
//                           onChange={e => setEditCatName(e.target.value)}
//                           onKeyDown={e => {
//                             if (e.key === 'Enter') updateCatName(cat._id);
//                             if (e.key === 'Escape') setEditCatId(null);
//                           }}
//                           className="flex-1 px-3 py-2 rounded-xl border border-indigo-300 bg-white text-[13.5px] text-gray-800 outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
//                         />
//                         <button onClick={() => updateCatName(cat._id)}
//                           className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors">
//                           <TbCheck size={14} />
//                         </button>
//                         <button onClick={() => setEditCatId(null)}
//                           className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
//                           <TbX size={14} />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex-1 min-w-0">
//                         <p className="text-[14px] font-bold text-gray-900 truncate">{cat.categoryName}</p>
//                         <p className="text-[11px] text-gray-400 mt-0.5">
//                           {cat.subCategories.length} subcategor{cat.subCategories.length === 1 ? 'y' : 'ies'}
//                         </p>
//                       </div>
//                     )}

//                     {/* Sub count badge */}
//                     {!isEditingCat && cat.subCategories.length > 0 && (
//                       <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex-shrink-0 transition-all
//                         ${isExpanded ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
//                         {cat.subCategories.length}
//                       </span>
//                     )}

//                     {/* Edit / Delete */}
//                     {!isEditingCat && (
//                       <div className="flex gap-2 flex-shrink-0">
//                         <button
//                           onClick={() => { setEditCatId(cat._id); setEditCatName(cat.categoryName); }}
//                           className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
//                           title="Rename">
//                           <TbPencil size={13} />
//                         </button>
//                         <button
//                           onClick={() => deleteCategory(cat)}
//                           className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
//                           title="Delete">
//                           <TbTrash size={13} />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   {/* ── Subcategories Panel ── */}
//                   {isExpanded && (
//                     <div className="cm-sub p-5 bg-white">

//                       {/* Add sub input */}
//                       <div className="flex gap-2.5 mb-4">
//                         <input
//                           type="text"
//                           placeholder={`Add subcategory to "${cat.categoryName}"…`}
//                           value={subInput}
//                           onChange={e => setNewSubMap(prev => ({ ...prev, [cat._id]: e.target.value }))}
//                           onKeyDown={e => e.key === 'Enter' && addSubcategory(cat)}
//                           className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-all"
//                         />
//                         <button
//                           onClick={() => addSubcategory(cat)}
//                           disabled={addingSubId === cat._id}
//                           className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-[12.5px] font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex-shrink-0 disabled:opacity-60">
//                           <TbPlus size={13} /> {addingSubId === cat._id ? 'Adding…' : 'Add'}
//                         </button>
//                       </div>

//                       {/* Sub list */}
//                       {cat.subCategories.length === 0 ? (
//                         <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-xl">
//                           <TbTag size={22} className="text-gray-300 mx-auto mb-2" />
//                           <p className="text-[12.5px] text-gray-400">No subcategories yet — add one above</p>
//                         </div>
//                       ) : (
//                         <div className="flex flex-col gap-2">
//                           {cat.subCategories.map((sub, idx) => {
//                             const isEditingSub = editSub?.catId === cat._id && editSub?.idx === idx;
//                             return (
//                               <div key={idx}
//                                 className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">

//                                 {/* Dot */}
//                                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 opacity-60" />

//                                 {/* Name / edit */}
//                                 {isEditingSub ? (
//                                   <div className="flex-1 flex gap-2">
//                                     <input
//                                       autoFocus
//                                       value={editSub.val}
//                                       onChange={e => setEditSub(prev => ({ ...prev, val: e.target.value }))}
//                                       onKeyDown={e => {
//                                         if (e.key === 'Enter') updateSub(cat, idx, editSub.val);
//                                         if (e.key === 'Escape') setEditSub(null);
//                                       }}
//                                       className="flex-1 px-2.5 py-1.5 rounded-lg border border-indigo-300 bg-white text-[13px] text-gray-800 outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
//                                     />
//                                     <button onClick={() => updateSub(cat, idx, editSub.val)}
//                                       className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors">
//                                       <TbCheck size={12} />
//                                     </button>
//                                     <button onClick={() => setEditSub(null)}
//                                       className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
//                                       <TbX size={12} />
//                                     </button>
//                                   </div>
//                                 ) : (
//                                   <span className="flex-1 text-[13px] text-gray-700 font-medium">{sub}</span>
//                                 )}

//                                 {/* Sub edit/delete — show on hover */}
//                                 {!isEditingSub && (
//                                   <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
//                                     <button
//                                       onClick={() => setEditSub({ catId: cat._id, idx, val: sub })}
//                                       className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
//                                       <TbPencil size={11} />
//                                     </button>
//                                     <button
//                                       onClick={() => deleteSub(cat, idx)}
//                                       className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
//                                       <TbX size={11} />
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             );
//                           })}
//                         </div>
//                       )}

//                       {cat.subCategories.length > 0 && (
//                         <p className="text-[11px] text-gray-400 text-right mt-3">
//                           {cat.subCategories.length} subcategor{cat.subCategories.length === 1 ? 'y' : 'ies'} in "{cat.categoryName}"
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {search && filtered.length > 0 && (
//           <p className="text-[12px] text-gray-400 text-center mt-4">
//             Showing {filtered.length} of {categories.length} categories
//           </p>
//         )}
//       </div>

//       {confirm && <ConfirmDialog msg={confirm.msg} onYes={confirm.onYes} onNo={() => setConfirm(null)} />}
//     </div>
//   );
// };

// export default CategoryManagement;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  TbCategory, TbPlus, TbPencil, TbTrash, TbCheck, TbX,
  TbChevronDown, TbChevronUp, TbSearch, TbRefresh,
  TbTag, TbAlertTriangle, TbFolder, TbFolderOpen,
  TbArrowsSort
} from 'react-icons/tb';
import { backendUrl } from '../../App';

/* ══════════════════════════════════════════
   CONFIRM DIALOG
══════════════════════════════════════════ */
const ConfirmDialog = ({ msg, onYes, onNo }) => (
  <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-5">
    <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-7 max-w-sm w-full text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
        <TbAlertTriangle size={26} className="text-red-500" />
      </div>
      <p className="text-[15px] font-bold text-gray-900 mb-2">Confirm Delete</p>
      <p className="text-[13px] text-gray-500 leading-relaxed mb-6">{msg}</p>
      <div className="flex gap-3">
        <button onClick={onNo}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-[13px] font-semibold hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={onYes}
          className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors">
          Delete
        </button>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
const CategoryManagement = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [newCatName, setNewCatName] = useState('');
  const [addingCat, setAddingCat] = useState(false);
  const [editCatId, setEditCatId] = useState(null);
  const [editCatName, setEditCatName] = useState('');
  const [expanded, setExpanded] = useState(new Set());
  const [newSubMap, setNewSubMap] = useState({});
  const [addingSubId, setAddingSubId] = useState(null);
  const [editSub, setEditSub] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const newCatRef = useRef(null);

  /* ── Fetch ── */
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/category/list`);
      if (res.data.success) setCategories(res.data.categories);
      else toast.error(res.data.message);
    } catch { toast.error('Failed to load categories'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const toggleExpand = (id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ── Add Category ── */
  const addCategory = async () => {
    if (!newCatName.trim()) return toast.error('Enter category name');
    setAddingCat(true);
    try {
      const res = await axios.post(`${backendUrl}/api/category/add`,
        { categoryName: newCatName.trim() }, { headers: { token } });
      if (res.data.success) {
        toast.success(`"${newCatName.trim()}" added!`);
        setNewCatName(''); fetchCategories();
      } else toast.error(res.data.message);
    } catch { toast.error('Failed to add category'); }
    finally { setAddingCat(false); }
  };

  /* ── Update Category ── */
  const updateCatName = async (id) => {
    if (!editCatName.trim()) return toast.error('Name cannot be empty');
    try {
      const res = await axios.put(`${backendUrl}/api/category/update/${id}`,
        { categoryName: editCatName.trim() }, { headers: { token } });
      if (res.data.success) {
        toast.success('Category renamed!'); setEditCatId(null); fetchCategories();
      } else toast.error(res.data.message);
    } catch { toast.error('Update failed'); }
  };

  /* ── Delete Category ── */
  const deleteCategory = (cat) => {
    setConfirm({
      msg: `Delete "${cat.categoryName}" and all its ${cat.subCategories.length} subcategories? This cannot be undone.`,
      onYes: async () => {
        setConfirm(null);
        try {
          const res = await axios.delete(`${backendUrl}/api/category/delete/${cat._id}`, { headers: { token } });
          if (res.data.success) { toast.success('Category deleted!'); fetchCategories(); }
          else toast.error(res.data.message);
        } catch { toast.error('Delete failed'); }
      }
    });
  };

  /* ── Add Subcategory ── */
  const addSubcategory = async (cat) => {
    const val = (newSubMap[cat._id] || '').trim();
    if (!val) return toast.error('Enter subcategory name');
    if (cat.subCategories.includes(val)) return toast.error('Already exists');
    setAddingSubId(cat._id);
    try {
      const updated = [...cat.subCategories, val];
      const res = await axios.put(`${backendUrl}/api/category/update/${cat._id}`,
        { subCategories: updated }, { headers: { token } });
      if (res.data.success) {
        toast.success(`"${val}" added!`);
        setNewSubMap(prev => ({ ...prev, [cat._id]: '' })); fetchCategories();
      } else toast.error(res.data.message);
    } catch { toast.error('Failed to add subcategory'); }
    finally { setAddingSubId(null); }
  };

  /* ── Update Subcategory ── */
  const updateSub = async (cat, idx, newVal) => {
    if (!newVal.trim()) return toast.error('Name cannot be empty');
    const updated = [...cat.subCategories];
    updated[idx] = newVal.trim();
    try {
      const res = await axios.put(`${backendUrl}/api/category/update/${cat._id}`,
        { subCategories: updated }, { headers: { token } });
      if (res.data.success) { toast.success('Updated!'); setEditSub(null); fetchCategories(); }
      else toast.error(res.data.message);
    } catch { toast.error('Update failed'); }
  };

  /* ── Delete Subcategory ── */
  const deleteSub = (cat, idx) => {
    setConfirm({
      msg: `Delete subcategory "${cat.subCategories[idx]}"?`,
      onYes: async () => {
        setConfirm(null);
        const updated = cat.subCategories.filter((_, i) => i !== idx);
        try {
          const res = await axios.put(`${backendUrl}/api/category/update/${cat._id}`,
            { subCategories: updated }, { headers: { token } });
          if (res.data.success) { toast.success('Subcategory deleted!'); fetchCategories(); }
          else toast.error(res.data.message);
        } catch { toast.error('Delete failed'); }
      }
    });
  };

  const filtered = categories.filter(c =>
    (c.categoryName || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.subCategories || []).some(s => s.toLowerCase().includes(search.toLowerCase()))
  );
  const totalSubs = categories.reduce((sum, c) => sum + (c.subCategories?.length || 0), 0);

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-5px) } to { opacity:1; transform:none } }
        @keyframes fadeIn    { from { opacity:0 } to { opacity:1 } }
        @keyframes spin      { to   { transform: rotate(360deg) } }
        .cm-card { animation: fadeIn .2s ease; }
        .cm-sub  { animation: slideDown .18s ease; }
      `}</style>

      {/* ══ STICKY HEADER ══ */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <TbCategory size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-[17px] font-extrabold text-gray-900 leading-none tracking-tight">Categories</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">Manage product categories & subcategories</p>
          </div>
        </div>
        <button onClick={fetchCategories}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          <TbRefresh size={14} /> Refresh
        </button>
      </div>

      <div className="p-6 max-w-4xl mx-auto pb-16">

        {/* ══ STATS ══ */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            {
              label: 'Total Categories', val: categories.length,
              icon: <TbFolder size={17} className="text-indigo-600" />,
              bg: 'bg-indigo-50', border: 'border-indigo-200', num: 'text-indigo-700'
            },
            {
              label: 'Total Subcategories', val: totalSubs,
              icon: <TbTag size={17} className="text-emerald-600" />,
              bg: 'bg-emerald-50', border: 'border-emerald-200', num: 'text-emerald-700'
            },
            {
              label: 'Avg Subcategories', val: categories.length ? (totalSubs / categories.length).toFixed(1) : '0',
              icon: <TbArrowsSort size={17} className="text-violet-600" />,
              bg: 'bg-violet-50', border: 'border-violet-200', num: 'text-violet-700'
            },
          ].map(({ label, val, icon, bg, border, num }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                {icon}
              </div>
              <div>
                <p className={`text-[26px] font-extrabold leading-none ${num}`}>{val}</p>
                <p className="text-[11.5px] text-gray-500 mt-1.5 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ══ ADD CATEGORY CARD ══ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-5 overflow-hidden">
          {/* Card header with bg */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
              <TbPlus size={15} className="text-white" />
            </div>
            <p className="text-[14px] font-bold text-gray-900">Add New Category</p>
          </div>
          <div className="p-5">
            <div className="flex gap-3">
              <input
                ref={newCatRef}
                type="text"
                placeholder="e.g. Men's Jackets, Pillow Covers…"
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCategory()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-all"
              />
              <button onClick={addCategory} disabled={addingCat}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold transition-colors shadow-sm disabled:opacity-60 flex-shrink-0">
                <TbPlus size={15} /> {addingCat ? 'Adding…' : 'Add Category'}
              </button>
            </div>
            <p className="text-[11.5px] text-gray-400 mt-2.5">Press Enter or click Add. Category name must be unique.</p>
          </div>
        </div>

        {/* ══ SEARCH ══ */}
        <div className="relative mb-5">
          <TbSearch size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search categories or subcategories…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-[13.5px] text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
              <TbX size={13} />
            </button>
          )}
        </div>

        {/* ══ CATEGORY LIST ══ */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-9 h-9 rounded-full border-[3px] border-gray-200 border-t-indigo-500 mx-auto mb-4"
              style={{ animation: 'spin 1s linear infinite' }} />
            <p className="text-[13px] text-gray-400">Loading categories…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-14 text-center">
            <TbFolder size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-[14.5px] font-semibold text-gray-500 mb-1">
              {search ? 'No results found' : 'No categories yet'}
            </p>
            <p className="text-[12.5px] text-gray-400">
              {search ? 'Try a different search term' : 'Add your first category above'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((cat) => {
              const isExpanded = expanded.has(cat._id);
              const isEditingCat = editCatId === cat._id;
              const subInput = newSubMap[cat._id] || '';

              return (
                <div key={cat._id} className="cm-card bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                  {/* ── Category Row ── */}
                  <div className={`flex items-center gap-3 px-5 py-4 transition-all border-b
                    ${isExpanded
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'border-transparent hover:bg-gray-50'}`}>

                    {/* Left accent bar */}
                    <div className={`w-1 h-10 rounded-full flex-shrink-0 transition-all
                      ${isExpanded ? 'bg-indigo-500' : 'bg-gray-200'}`} />

                    {/* Expand toggle */}
                    <button onClick={() => toggleExpand(cat._id)}
                      className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all font-bold
                        ${isExpanded
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600'}`}>
                      {isExpanded ? <TbChevronUp size={14} /> : <TbChevronDown size={14} />}
                    </button>

                    {/* Folder icon */}
                    <div className="flex-shrink-0">
                      {isExpanded
                        ? <TbFolderOpen size={20} className="text-indigo-600" />
                        : <TbFolder size={20} className="text-gray-400" />}
                    </div>

                    {/* Name / edit input */}
                    {isEditingCat ? (
                      <div className="flex-1 flex gap-2 items-center">
                        <input autoFocus
                          value={editCatName}
                          onChange={e => setEditCatName(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') updateCatName(cat._id);
                            if (e.key === 'Escape') setEditCatId(null);
                          }}
                          className="flex-1 px-3.5 py-2 rounded-xl border-2 border-indigo-400 bg-white text-[13.5px] text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                        <button onClick={() => updateCatName(cat._id)}
                          className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-sm">
                          <TbCheck size={15} />
                        </button>
                        <button onClick={() => setEditCatId(null)}
                          className="w-9 h-9 rounded-xl bg-white border-2 border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
                          <TbX size={15} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 min-w-0">
                        <p className="text-[14.5px] font-bold text-gray-900 truncate">{cat.categoryName}</p>
                        <p className="text-[11.5px] text-gray-400 mt-0.5">
                          {cat.subCategories.length} subcategor{cat.subCategories.length === 1 ? 'y' : 'ies'}
                        </p>
                      </div>
                    )}

                    {/* Sub count badge */}
                    {!isEditingCat && (
                      <span className={`min-w-[28px] h-7 px-2.5 rounded-full text-[12px] font-bold flex items-center justify-center flex-shrink-0 transition-all
                        ${isExpanded
                          ? 'bg-indigo-600 text-white'
                          : cat.subCategories.length > 0
                            ? 'bg-gray-100 text-gray-600 border border-gray-200'
                            : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
                        {cat.subCategories.length}
                      </span>
                    )}

                    {/* Edit / Delete buttons */}
                    {!isEditingCat && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => { setEditCatId(cat._id); setEditCatName(cat.categoryName); }}
                          className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                          title="Rename">
                          <TbPencil size={13} />
                        </button>
                        <button
                          onClick={() => deleteCategory(cat)}
                          className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                          title="Delete">
                          <TbTrash size={13} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ── Subcategories Panel ── */}
                  {isExpanded && (
                    <div className="cm-sub p-5 bg-white border-t border-gray-100">

                      {/* Add sub input */}
                      <div className="flex gap-2.5 mb-4">
                        <input
                          type="text"
                          placeholder={`Add subcategory to "${cat.categoryName}"…`}
                          value={subInput}
                          onChange={e => setNewSubMap(prev => ({ ...prev, [cat._id]: e.target.value }))}
                          onKeyDown={e => e.key === 'Enter' && addSubcategory(cat)}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-all"
                        />
                        <button
                          onClick={() => addSubcategory(cat)}
                          disabled={addingSubId === cat._id}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 border-2 border-indigo-200 text-indigo-700 text-[12.5px] font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex-shrink-0 disabled:opacity-60">
                          <TbPlus size={13} /> {addingSubId === cat._id ? 'Adding…' : 'Add'}
                        </button>
                      </div>

                      {/* Sub list */}
                      {cat.subCategories.length === 0 ? (
                        <div className="text-center py-7 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                          <TbTag size={22} className="text-gray-300 mx-auto mb-2" />
                          <p className="text-[12.5px] text-gray-400 font-medium">No subcategories yet — add one above</p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {cat.subCategories.map((sub, idx) => {
                            const isEditingSub = editSub?.catId === cat._id && editSub?.idx === idx;
                            return (
                              <div key={idx}
                                className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/40 transition-all group">

                                {/* Accent dot */}
                                <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />

                                {/* Name / edit */}
                                {isEditingSub ? (
                                  <div className="flex-1 flex gap-2">
                                    <input autoFocus
                                      value={editSub.val}
                                      onChange={e => setEditSub(prev => ({ ...prev, val: e.target.value }))}
                                      onKeyDown={e => {
                                        if (e.key === 'Enter') updateSub(cat, idx, editSub.val);
                                        if (e.key === 'Escape') setEditSub(null);
                                      }}
                                      className="flex-1 px-3 py-1.5 rounded-lg border-2 border-indigo-400 bg-white text-[13px] text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                                    />
                                    <button onClick={() => updateSub(cat, idx, editSub.val)}
                                      className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-sm">
                                      <TbCheck size={13} />
                                    </button>
                                    <button onClick={() => setEditSub(null)}
                                      className="w-8 h-8 rounded-lg bg-white border-2 border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
                                      <TbX size={13} />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="flex-1 text-[13px] text-gray-700 font-medium">{sub}</span>
                                )}

                                {/* Sub edit/delete — appear on hover */}
                                {!isEditingSub && (
                                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => setEditSub({ catId: cat._id, idx, val: sub })}
                                      className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                                      <TbPencil size={11} />
                                    </button>
                                    <button
                                      onClick={() => deleteSub(cat, idx)}
                                      className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                                      <TbX size={11} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {cat.subCategories.length > 0 && (
                        <p className="text-[11px] text-gray-400 text-right mt-3">
                          {cat.subCategories.length} subcategor{cat.subCategories.length === 1 ? 'y' : 'ies'} in "{cat.categoryName}"
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {search && filtered.length > 0 && (
          <p className="text-[12px] text-gray-400 text-center mt-4">
            Showing {filtered.length} of {categories.length} categories
          </p>
        )}
      </div>

      {confirm && <ConfirmDialog msg={confirm.msg} onYes={confirm.onYes} onNo={() => setConfirm(null)} />}
    </div>
  );
};

export default CategoryManagement;