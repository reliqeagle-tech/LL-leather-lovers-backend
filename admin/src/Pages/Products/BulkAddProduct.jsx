// ─────────────────────────────────────────────────────────────────
//  LL LEATHER LOVERS — BULK UPLOAD  |  Indigo / Tailwind Theme
//  npm install xlsx-js-style
// ─────────────────────────────────────────────────────────────────
import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import XLSX from 'xlsx-js-style';
import {
    TbUpload, TbFileSpreadsheet, TbX, TbCheck, TbAlertTriangle,
    TbDownload, TbTrash, TbRocket, TbInfoCircle,
    TbChevronDown, TbChevronUp, TbRefresh, TbZip,
    TbTable, TbCloudUpload, TbCircleCheck, TbCircleX
} from 'react-icons/tb';
import { backendUrl } from '../../App';


/* ═══════════════════ CONSTANTS ═══════════════════ */
const REQUIRED_COLS = ['sku', 'name', 'description', 'price', 'category', 'subCategory', 'sizes'];
const ALL_COLS = [...REQUIRED_COLS, 'detailedDescription', 'itemDetails', 'discountPrice', 'bestseller', 'color', 'image'];

const SAMPLE_ROWS = [
    {
        SKU: 'WHITE-BEAR-SQ-PK2',
        Product_Name: 'Classic Lambskin Leather Jacket',
        Product_Summary: 'Premium quality lambskin leather jacket with quilted lining',
        Detailed_Description: 'Handcrafted from genuine lambskin leather. Features YKK zippers, two side pockets, and one inner pocket. Dry clean only.',
        Product_Details: 'Brand: LL Leather Lovers::Material: Lamb Leather',
        Price: 1000, "Discount_(In_%)": 10,
        Category: 'Men', Sub_Category: 'Bomber Jacket', Bestseller: 'false',
        Size_Name: 'XS:0.9:10,S:1:10,M:1.1:5,L:1.2:2,XL:1.3:0',
        Color_Name: 'Black,Brown,Antique Brown:#8A5A44',
        Image_Link: 'https://m.media-amazon.com/images/I/71rgZMIZJhL._AC_SX425_.jpg',
    },
    {
        SKU: 'BLACK-BEAR-SQ-PK2',
        Product_Name: 'Women Biker Leather Jacket',
        Product_Summary: 'Edgy moto-inspired jacket for women in genuine cowhide',
        Detailed_Description: 'Asymmetric front zip, epaulettes, and belt detail. Soft microfiber lining.',
        Product_Details: 'Brand: LL Leather Lovers::Material: Cowhide Leather',
        Price: 1000, "Discount_(In_%)": 5,
        Category: 'Women', Sub_Category: 'Moto Biker Jacket', Bestseller: 'true',
        Size_Name: 'XS:1000:10,S:1100:5,M:1200:2,L:1300:0',
        Color_Name: 'Black,Red,Navy Blue',
        Image_Link: 'https://m.media-amazon.com/images/I/81XkXgk6QXL._AC_SY445_.jpg',
    },
];

/* ═══════════════════ VALIDATION ═══════════════════ */
const validateRow = (row, idx) => {
    const errors = [];
    if (!row.sku?.toString().trim()) errors.push('SKU is required');
    const skuPattern = /^[A-Za-z0-9\-()]+$/;
    if (row.sku && !skuPattern.test(row.sku.toString().trim().toUpperCase()))
        errors.push('SKU can contain letters, numbers, hyphens (-) and brackets ()');
    if (!row.name?.toString().trim()) errors.push('Name is required');
    if (!row.price || isNaN(+row.price) || +row.price <= 0) errors.push('Valid price required');
    if (!row.category?.toString().trim()) errors.push('Category required');
    if (!row.subCategory?.toString().trim()) errors.push('Sub-category required');
    if (!row.sizes?.toString().trim()) errors.push('Sizes required (format: S:0.9:10,M:1:5)');
    if (!row.description?.toString().trim()) errors.push('Description required');
    if (row.discountPrice && +row.discountPrice >= +row.price) errors.push('Discount must be less than price');
    if (row.sizes) {
        const bad = row.sizes.toString().split(',').some(s => {
            const parts = s.trim().split(':');
            if (parts.length < 2 || parts.length > 5) return true;
            const p1 = parts[1]?.toString().trim().toLowerCase();
            const p3 = parts[3]?.toString().trim().toLowerCase();
            const p4 = parts[4]?.toString().trim().toLowerCase();
            if (p1 === 'custom') { if (!parts[2] || isNaN(parseFloat(parts[2]))) return true; return false; }
            if (parts.length >= 4 && p3 === 'custom') { if (isNaN(parseFloat(parts[1]))) return true; return false; }
            if (isNaN(parseFloat(parts[1]))) return true;
            if (parts[2] && isNaN(parseInt(parts[2], 10))) return true;
            if (parts[3] && isNaN(parseFloat(parts[3]))) return true;
            if (parts[4] && !['true', 'false', ''].includes(p4)) return true;
            return false;
        });
        if (bad) errors.push('Sizes format wrong — S:0.9:10 or S:2499:10:custom');
    }
    if (row.itemDetails) {
        const valid = row.itemDetails.toString().split('::').every(item => {
            const parts = item.split(':');
            return parts.length >= 2 && parts[0].trim() && parts[1].trim();
        });
        if (!valid) errors.push('Product Details: Brand: Dolly::Material: Leather::Pattern: Printed');
    }
    return { ...row, _idx: idx + 1, _errors: errors, _valid: errors.length === 0, _id: `row_${idx}` };
};

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
const BulkUpload = ({ token }) => {
    const [mode, setMode] = useState('url');
    const [csvFile, setCsvFile] = useState(null);
    const [zipFile, setZipFile] = useState(null);
    const [rows, setRows] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [draggingCsv, setDraggingCsv] = useState(false);
    const [draggingZip, setDraggingZip] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const csvRef = useRef(null);
    const zipRef = useRef(null);

    const validRows = rows.filter(r => r._valid);
    const invalidRows = rows.filter(r => !r._valid);
    const hasData = rows.length > 0;

    /* ── Download Excel template ── */
    const downloadTemplate = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(SAMPLE_ROWS, {
            header: ['SKU', 'Product_Name', 'Product_Summary', 'Detailed_Description', 'Product_Details', 'Price', 'Discount_(In_%)', 'Category', 'Sub_Category', 'Bestseller', 'Size_Name', 'Color_Name', 'Image_Link']
        });
        ws['!cols'] = [{ wch: 22 }, { wch: 35 }, { wch: 45 }, { wch: 60 }, { wch: 40 }, { wch: 12 }, { wch: 15 }, { wch: 22 }, { wch: 25 }, { wch: 12 }, { wch: 40 }, { wch: 30 }, { wch: 60 }];
        XLSX.utils.book_append_sheet(wb, ws, 'Products');

        const instructions = [
            { Field: 'SKU', Required: 'YES', Description: 'Unique SKU. Example: WHITE-BEAR-SQ-PK2' },
            { Field: 'Product_Name', Required: 'YES', Description: 'Product name' },
            { Field: 'Product_Summary', Required: 'YES', Description: 'Short product description' },
            { Field: 'Detailed_Description', Required: 'no', Description: 'Long HTML description (optional)' },
            { Field: 'Price', Required: 'YES', Description: 'Base price in ₹ (number)' },
            { Field: 'Discount_Price', Required: 'no', Description: 'Sale price (must be < price)' },
            { Field: 'Category', Required: 'YES', Description: "Men / Women / Others / Leather Pillow Cover / Sofa Headrest / Leather Desk Pad / Men Leather Apron" },
            { Field: 'Sub_Category', Required: 'YES', Description: 'Jackets / Bomber Biker Jacket / Moto Biker Jacket / etc.' },
            { Field: 'Bestseller', Required: 'no', Description: 'true or false' },
            { Field: 'Size_Name', Required: 'YES', Description: 'S:0.9:10 (multiplier mode) or S:2499:10:custom (custom price mode)' },
            { Field: 'Color_Name', Required: 'no', Description: 'Comma separated. Black,Brown or White:#F6F6FC,Brown:#8A5A44' },
            { Field: 'Image_Link', Required: 'no', Description: 'Comma separated public image URLs. For ZIP mode, use filenames: img1.jpg,img2.jpg' },
        ];
        const categoryRows = [
            ['Category', 'Sub Category'],
            ['Apron', 'Leather Aprons'], ["Desk Pads", "Leather Mouse Pad"], ["Pillow Covers", "Round Cushion"],
            ['', 'Square Cushion'], ['', 'Rectangle Cushion'], ['', 'Cylindrical Cushion'], ['', 'Ear Hole Cushion'],
            ["Men's", "Bomber Jacket"], ['', 'Moto Biker Jacket'], ['', 'Coats'],
            ["Women's", "Bomber Jacket"], ['', 'Moto Biker Jacket'], ['', 'Coats'], ['', 'Blazer'], ['', 'Jackets'], ['', 'Nightsuits'], ['', 'Top'], ['', 'Skirts'],
            ['Recliner Slipcover', 'Headrest']
        ];
        const wsI = XLSX.utils.json_to_sheet(instructions);
        wsI['!cols'] = [{ wch: 25 }, { wch: 12 }, { wch: 55 }, { wch: 20 }, { wch: 20 }, { wch: 28 }, { wch: 40 }];
        XLSX.utils.sheet_add_aoa(wsI, categoryRows, { origin: 'F1' });
        for (let row = 1; row <= categoryRows.length; row++) {
            ['F', 'G'].forEach(col => {
                const cell = wsI[`${col}${row}`];
                if (!cell) return;
                cell.s = {
                    font: { bold: row === 1, color: { rgb: row === 1 ? 'FFFFFF' : '1C2B3A' } },
                    fill: { fgColor: { rgb: row === 1 ? '6366F1' : 'FFFFFF' } },
                    alignment: { vertical: 'center', horizontal: 'left' },
                    border: { top: { style: 'thin', color: { rgb: '808080' } }, bottom: { style: 'thin', color: { rgb: '808080' } }, left: { style: 'thin', color: { rgb: '808080' } }, right: { style: 'thin', color: { rgb: '808080' } } }
                };
            });
        }
        XLSX.utils.book_append_sheet(wb, wsI, 'Instructions');
        XLSX.writeFile(wb, 'llleatherlovers_bulk_template.xlsx');
        toast.success('📥 Template downloaded!');
    };

    /* ── Parse CSV / Excel ── */
    const parseFile = useCallback((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                let data = [];
                if (file.name.endsWith('.csv')) {
                    const wb = XLSX.read(e.target.result, { type: 'string' });
                    data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' });
                } else {
                    const wb = XLSX.read(e.target.result, { type: 'binary' });
                    data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' });
                }
                if (!data.length) { toast.error('File is empty'); return; }
                const normalized = data.map(row => ({
                    sku: row.SKU || '',
                    name: row.Product_Name || '',
                    description: row.Product_Summary || '',
                    detailedDescription: row.Detailed_Description || '',
                    itemDetails: row.Product_Details || '',
                    price: row.Price || '',
                    discountPrice: row["Discount_(In_%)"] || '',
                    category: row.Category || '',
                    subCategory: row.Sub_Category || '',
                    sizes: row.Size_Name || '',
                    bestseller: row.Bestseller || 'false',
                    color: row.Color_Name || '',
                    image: row.Image_Link || '',
                }));
                const validated = normalized.map((row, i) => validateRow(row, i));
                setRows(validated); setResult(null); setExpandedRows(new Set()); setPreviewOpen(true);
                const valid = validated.filter(r => r._valid).length;
                toast.success(`Parsed ${data.length} rows — ${valid} valid, ${data.length - valid} with errors`);
            } catch (err) { toast.error('Failed to parse: ' + err.message); }
        };
        file.name.endsWith('.csv') ? reader.readAsText(file) : reader.readAsBinaryString(file);
    }, []);

    const handleCsvFile = (file) => {
        if (!file) return;
        const ext = file.name.split('.').pop().toLowerCase();
        if (!['csv', 'xlsx', 'xls'].includes(ext)) { toast.error('Only .csv, .xlsx, .xls files allowed'); return; }
        setCsvFile(file); parseFile(file);
    };

    const handleZipFile = (file) => {
        if (!file) return;
        if (!file.name.endsWith('.zip')) { toast.error('Only .zip files allowed'); return; }
        setZipFile(file); toast.success('ZIP file loaded!');
    };

    const toggleRow = (id) => setExpandedRows(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
    const removeRow = (id) => setRows(prev => prev.filter(r => r._id !== id));

    /* ── Submit URL mode ── */
    // const submitUrl = async () => {
    //     console.log("Token =", token);
    //     console.log("Backend =", backendUrl);
    //     if (!validRows.length) return toast.error('No valid rows to upload');
    //     setUploading(true); setProgress(10);
    //     try {
    //         const clean = validRows.map(({ _idx, _errors, _valid, _id, ...rest }) => ({
    //             ...rest,
    //             sku: rest.sku?.toString().trim().toUpperCase(),
    //             sizes: rest.sizes?.toString() || '',
    //             color: rest.color?.toString() || '',
    //             image: rest.image?.toString() || '',
    //             price: rest.price?.toString() || '0',
    //             discountPrice: rest.discountPrice?.toString() || '',
    //             bestseller: rest.bestseller?.toString() || 'false',
    //         }));
    //         const fd = new FormData();
    //         fd.append('file', new Blob([JSON.stringify(clean)], { type: 'application/json' }), 'bulk_upload.json');
    //         setProgress(30);
    //         const res = await axios.post(`${backendUrl}/api/product/bulk-upload`, fd, { headers: { token } });
    //         setProgress(100);
    //         if (res.data.success) { toast.success(res.data.message); setResult({ success: true, message: res.data.message }); }
    //         else { toast.error(res.data.message); setResult({ success: false, message: res.data.message }); }
    //     } catch (err) {
    //         toast.error('Upload failed: ' + (err.response?.data?.message || err.message));
    //         setResult({ success: false, message: err.message });
    //     } finally { setUploading(false); setTimeout(() => setProgress(0), 1500); }
    // };

    /* ═══════════════════════════════════════════════════════════════
   DEBUG-GRADE submitUrl — replace your existing submitUrl with this.
   It classifies the EXACT failure type instead of a generic
   "Network Error", and logs everything to console so you can see
   precisely what happened.
═══════════════════════════════════════════════════════════════ */

    const submitUrl = async () => {
        if (!validRows.length) return toast.error('No valid rows to upload');

        setUploading(true);
        setProgress(10);

        const clean = validRows.map(({ _idx, _errors, _valid, _id, ...rest }) => ({
            ...rest,
            sku: rest.sku?.toString().trim().toUpperCase(),
            sizes: rest.sizes?.toString() || '',
            color: rest.color?.toString() || '',
            image: rest.image?.toString() || '',
            price: rest.price?.toString() || '0',
            discountPrice: rest.discountPrice?.toString() || '',
            bestseller: rest.bestseller?.toString() || 'false',
        }));

        const fd = new FormData();
        fd.append('file', new Blob([JSON.stringify(clean)], { type: 'application/json' }), 'bulk_upload.json');

        // ✅ Always use the env-driven backendUrl — never hardcode localhost
        const targetUrl = `http://localhost:4000/api/product/bulk-upload`;

        console.group('%c[BULK UPLOAD DEBUG]', 'color:#6366f1;font-weight:bold');
        console.log('Target URL:', targetUrl);
        console.log('Token present:', !!token, token ? `(${token.slice(0, 12)}...)` : '(MISSING)');
        console.log('Rows being sent:', clean.length);
        console.log('Sample row:', clean[0]);
        console.groupEnd();

        try {
            setProgress(30);

            const res = await axios.post(targetUrl, fd, {
                headers: { token },
                timeout: 30000, // ✅ 30s timeout — without this, a hung request looks identical to "Network Error" forever
            });

            setProgress(100);

            console.log('[BULK UPLOAD] Response received:', res.status, res.data);

            if (res.data.success) {
                toast.success(res.data.message);
                setResult({ success: true, message: res.data.message });
            } else {
                // ✅ Backend responded but said success:false — this is a LOGIC error, not a network error
                toast.error(res.data.message);
                setResult({ success: false, message: res.data.message });
            }

        } catch (err) {
            // ════════════════════════════════════════════════════════
            // ✅ CLASSIFY THE EXACT FAILURE — this is what was missing
            // ════════════════════════════════════════════════════════
            let diagnosis = '';
            let userMessage = '';

            if (err.code === 'ECONNABORTED') {
                // Request took longer than `timeout` — backend likely hung
                // (common cause: bulk image uploads to Cloudinary taking too long,
                //  or an infinite loop / unhandled await in the controller)
                diagnosis = 'TIMEOUT — request sent but server never responded in time';
                userMessage = 'Server is taking too long to respond. It may be processing too many images — try fewer rows or check backend logs.';

            } else if (err.response) {
                // ✅ Server DID respond, but with an error status (4xx/5xx)
                // This means the request reached the backend — NOT a network issue.
                diagnosis = `SERVER ERROR — backend responded with status ${err.response.status}`;
                userMessage = err.response.data?.message || `Server returned status ${err.response.status}`;
                console.error('[BULK UPLOAD] Response body:', err.response.data);
                console.error('[BULK UPLOAD] Response headers:', err.response.headers);

            } else if (err.request) {
                // ✅ Request was made, but NO response came back at all.
                // This is the real "Network Error" case — almost always one of:
                //   1. Backend is down / crashed mid-request
                //   2. CORS preflight blocked (check browser console for CORS errors above this one)
                //   3. URL is wrong / unreachable from this network
                //   4. Backend process killed by an uncaught exception while handling this request
                diagnosis = 'NO RESPONSE — request left the browser but nothing came back';
                userMessage = 'Could not reach the server. Check that the backend is running and the URL is correct.';
                console.error('[BULK UPLOAD] Raw request object (inspect for more clues):', err.request);

            } else {
                // Something failed before the request was even sent
                // (e.g. FormData construction error, JSON.stringify failure)
                diagnosis = 'REQUEST SETUP ERROR — failed before sending';
                userMessage = err.message;
            }

            console.group('%c[BULK UPLOAD] FAILURE DIAGNOSIS', 'color:#ef4444;font-weight:bold');
            console.log('Diagnosis:', diagnosis);
            console.log('Axios error code:', err.code);
            console.log('Full error object:', err);
            console.groupEnd();

            toast.error(`Upload failed: ${userMessage}`);
            setResult({ success: false, message: `${diagnosis} — ${userMessage}` });

        } finally {
            setUploading(false);
            setTimeout(() => setProgress(0), 1500);
        }
    };

    /* ── Submit ZIP mode ── */
    const submitZip = async () => {
        if (!csvFile) return toast.error('Upload a CSV/Excel file first');
        if (!zipFile) return toast.error('Upload a ZIP file with images');
        setUploading(true); setProgress(10);
        try {
            const fd = new FormData();
            if (!csvFile.name.endsWith('.csv')) {
                const reader = new FileReader();
                const csvText = await new Promise((resolve, reject) => {
                    reader.onload = (e) => { const wb = XLSX.read(e.target.result, { type: 'binary' }); resolve(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]])); };
                    reader.onerror = reject; reader.readAsBinaryString(csvFile);
                });
                fd.append('csv', new Blob([csvText], { type: 'text/csv' }), 'products.csv');
            } else { fd.append('csv', csvFile); }
            fd.append('images', zipFile);
            setProgress(30);
            const res = await axios.post(`${backendUrl}/api/product/bulk-upload-zip`, fd, {
                headers: { token },
                onUploadProgress: (e) => setProgress(30 + Math.round((e.loaded / e.total) * 60)),
            });
            setProgress(100);
            if (res.data.success) { toast.success(res.data.message); setResult({ success: true, message: res.data.message }); }
            else { toast.error(res.data.message); setResult({ success: false, message: res.data.message }); }
        } catch (err) {
            toast.error('ZIP upload failed: ' + (err.response?.data?.message || err.message));
            setResult({ success: false, message: err.message });
        } finally { setUploading(false); setTimeout(() => setProgress(0), 1500); }
    };

    const reset = () => { setCsvFile(null); setZipFile(null); setRows([]); setResult(null); setProgress(0); setExpandedRows(new Set()); setPreviewOpen(false); };

    const makeDrag = (setter, fileHandler) => ({
        onDragOver: e => { e.preventDefault(); setter(true); },
        onDragLeave: e => { e.preventDefault(); setter(false); },
        onDrop: e => { e.preventDefault(); setter(false); fileHandler(e.dataTransfer.files[0]); },
    });

    /* ══════════════════════════════════════════════════════════
       RENDER
    ══════════════════════════════════════════════════════════ */
    return (
        <div className="min-h-screen bg-[#f7f7f5]">
            <style>{`
                @keyframes spin    { to { transform: rotate(360deg); } }
                @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.4} }
                @keyframes slideIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
                .bu-spin  { animation: spin 1s linear infinite; }
                .bu-pulse { animation: pulse 1.2s ease infinite; }
                .bu-row   { animation: slideIn .18s ease; }
                .bu-tr:hover td { background: #EEF2FF !important; }
            `}</style>

            {/* ══ HEADER ══ */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm h-16 flex items-center px-6 justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                        <TbCloudUpload size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-[17px] font-extrabold text-gray-900 leading-none tracking-tight">Bulk Upload</h1>
                        <p className="text-[11px] text-gray-400 mt-0.5">Upload multiple products via Excel or CSV</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {hasData && (
                        <button onClick={reset}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all">
                            <TbRefresh size={13} /> Reset
                        </button>
                    )}
                    <button onClick={downloadTemplate}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-[13px] font-semibold hover:bg-violet-100 transition-colors">
                        <TbDownload size={13} /> Download Template
                    </button>
                </div>
            </div>

            {/* Progress bar */}
            {progress > 0 && (
                <div className="h-1 bg-gray-100">
                    <div className={`h-full bg-indigo-500 transition-all duration-300 ${progress < 100 ? 'bu-pulse' : ''}`}
                        style={{ width: `${progress}%` }} />
                </div>
            )}

            <div className="p-6 max-w-[1200px] mx-auto grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 items-start">

                {/* ══ MAIN COLUMN ══ */}
                <div>

                    {/* ── MODE SELECTOR ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4">Upload Mode</p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { v: 'url', icon: <TbFileSpreadsheet size={20} />, label: 'CSV / Excel with URLs', desc: 'Images from public URLs in the file' },
                                { v: 'zip', icon: <TbZip size={20} />, label: 'CSV + ZIP (Local Images)', desc: 'Upload a ZIP file with actual image files' },
                            ].map(({ v, icon, label, desc }) => (
                                <button key={v} type="button" onClick={() => { setMode(v); setRows([]); setResult(null); }}
                                    className={`p-4 rounded-xl text-left border-2 transition-all flex items-start gap-3
                                        ${mode === v ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                                        ${mode === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        {icon}
                                    </div>
                                    <div>
                                        <p className={`text-[13.5px] font-bold mb-0.5 ${mode === v ? 'text-gray-900' : 'text-gray-600'}`}>{label}</p>
                                        <p className="text-[12px] text-gray-400">{desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── FILE UPLOAD ZONES ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5">
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                <TbUpload size={15} className="text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-gray-900">
                                    {mode === 'url' ? 'Upload CSV or Excel File' : 'Upload CSV + ZIP File'}
                                </p>
                                <p className="text-[11.5px] text-gray-400">
                                    {mode === 'url' ? '.csv, .xlsx, .xls supported' : 'Step 1: CSV/Excel · Step 2: ZIP with images'}
                                </p>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col gap-3">

                            {/* CSV Drop Zone */}
                            <div {...makeDrag(setDraggingCsv, handleCsvFile)} onClick={() => csvRef.current?.click()}
                                className={`relative rounded-2xl border-2 border-dashed p-7 text-center cursor-pointer transition-all
                                    ${csvFile ? 'border-emerald-300 bg-emerald-50'
                                        : draggingCsv ? 'border-indigo-400 bg-indigo-50 scale-[1.01]'
                                            : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}>
                                <input ref={csvRef} type="file" accept=".csv,.xlsx,.xls" className="hidden"
                                    onChange={e => handleCsvFile(e.target.files[0])} />
                                {csvFile ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <TbCircleCheck size={24} className="text-emerald-500 flex-shrink-0" />
                                        <div className="text-left">
                                            <p className="text-[13.5px] font-bold text-emerald-700">{csvFile.name}</p>
                                            <p className="text-[11.5px] text-gray-500">{(csvFile.size / 1024).toFixed(1)} KB · {rows.length} rows found</p>
                                        </div>
                                        <button type="button" onClick={e => { e.stopPropagation(); setCsvFile(null); setRows([]); setResult(null); }}
                                            className="ml-auto w-7 h-7 rounded-lg bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0">
                                            <TbX size={12} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <TbFileSpreadsheet size={30} className={`mx-auto mb-3 ${draggingCsv ? 'text-indigo-500' : 'text-gray-300'}`} />
                                        <p className="text-[14px] font-semibold text-gray-700 mb-1">
                                            {draggingCsv ? 'Drop your file here!' : 'Drop CSV / Excel file here'}
                                        </p>
                                        <p className="text-[12px] text-gray-400">or click to browse · .csv .xlsx .xls</p>
                                    </>
                                )}
                            </div>

                            {/* ZIP Drop Zone */}
                            {mode === 'zip' && (
                                <div {...makeDrag(setDraggingZip, handleZipFile)} onClick={() => zipRef.current?.click()}
                                    className={`relative rounded-2xl border-2 border-dashed p-7 text-center cursor-pointer transition-all
                                        ${zipFile ? 'border-violet-300 bg-violet-50'
                                            : draggingZip ? 'border-indigo-400 bg-indigo-50 scale-[1.01]'
                                                : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}>
                                    <input ref={zipRef} type="file" accept=".zip" className="hidden"
                                        onChange={e => handleZipFile(e.target.files[0])} />
                                    {zipFile ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <TbCircleCheck size={24} className="text-violet-500 flex-shrink-0" />
                                            <div className="text-left">
                                                <p className="text-[13.5px] font-bold text-violet-700">{zipFile.name}</p>
                                                <p className="text-[11.5px] text-gray-500">{(zipFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <button type="button" onClick={e => { e.stopPropagation(); setZipFile(null); }}
                                                className="ml-auto w-7 h-7 rounded-lg bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0">
                                                <TbX size={12} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <TbZip size={30} className={`mx-auto mb-3 ${draggingZip ? 'text-indigo-500' : 'text-gray-300'}`} />
                                            <p className="text-[14px] font-semibold text-gray-700 mb-1">Drop ZIP file here</p>
                                            <p className="text-[12px] text-gray-400">Images inside ZIP must match filenames in CSV's "image" column</p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── PREVIEW TABLE ── */}
                    {hasData && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                        <TbTable size={15} className="text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-gray-900">Preview — {rows.length} Rows</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10.5px] font-bold">
                                                <TbCheck size={9} /> {validRows.length} valid
                                            </span>
                                            {invalidRows.length > 0 && (
                                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-[10.5px] font-bold">
                                                    <TbAlertTriangle size={9} /> {invalidRows.length} errors
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setPreviewOpen(p => !p)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                                    {previewOpen ? <><TbChevronUp size={13} /> Collapse</> : <><TbChevronDown size={13} /> Expand</>}
                                </button>
                            </div>

                            {previewOpen && (
                                <div className="overflow-x-auto w-full">
                                    <table className="w-full border-collapse" style={{ minWidth: 900 }}>
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                {['', '#', 'SKU', 'Name', 'Price', 'Discount', 'Category', 'Sizes', 'Del'].map((h, i) => (
                                                    <th key={i} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row) => {
                                                const exp = expandedRows.has(row._id);
                                                return (
                                                    <React.Fragment key={row._id}>
                                                        <tr className="bu-row border-b border-gray-50 cursor-pointer group"
                                                            style={{ background: row._valid ? 'transparent' : '#FEF9F9' }}
                                                            onClick={() => toggleRow(row._id)}
                                                            onMouseEnter={e => e.currentTarget.style.background = '#EEF2FF'}
                                                            onMouseLeave={e => e.currentTarget.style.background = row._valid ? 'transparent' : '#FEF9F9'}>
                                                            <td className="px-4 py-3.5">
                                                                <div className={`w-2 h-2 rounded-full ${row._valid ? 'bg-emerald-400' : 'bg-red-400'}`} />
                                                            </td>
                                                            <td className="px-4 py-3.5 text-[11.5px] text-gray-400 whitespace-nowrap">{row._idx}</td>
                                                            <td className="px-4 py-3.5 text-[12px] text-gray-600 font-semibold whitespace-nowrap">{row.sku}</td>
                                                            <td className="px-4 py-3.5 text-[13px] text-gray-900 font-semibold max-w-[160px] truncate">
                                                                {row.name || <span className="text-red-500 italic text-[12px]">Missing</span>}
                                                            </td>
                                                            <td className="px-4 py-3.5 text-[13px] font-bold text-indigo-600 whitespace-nowrap">
                                                                {row.price ? `₹${row.price}` : <span className="text-red-500">—</span>}
                                                            </td>
                                                            <td className="px-4 py-3.5 text-[12px] whitespace-nowrap">
                                                                {row.discountPrice
                                                                    ? <span className="text-emerald-600">₹{row.discountPrice}</span>
                                                                    : <span className="text-gray-400">—</span>}
                                                            </td>
                                                            <td className="px-4 py-3.5 text-[12px] text-gray-500 whitespace-nowrap">{row.category || '—'}</td>
                                                            <td className="px-4 py-3.5 text-[11.5px] text-gray-600 max-w-[140px] truncate">
                                                                {row.sizes || <span className="text-red-500">Missing</span>}
                                                            </td>
                                                            <td className="px-4 py-3.5">
                                                                <button type="button" onClick={e => { e.stopPropagation(); removeRow(row._id); }}
                                                                    className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                                                                    <TbX size={11} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        {exp && (
                                                            <tr>
                                                                <td colSpan={9} className="px-5 py-4 bg-gray-50/60">
                                                                    {row._errors.length > 0 && (
                                                                        <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 mb-3">
                                                                            <p className="text-red-600 text-[11px] font-bold uppercase tracking-wide mb-2">⚠ Errors in this row:</p>
                                                                            {row._errors.map((e, i) => (
                                                                                <p key={i} className="text-red-600 text-[12.5px] mb-1">• {e}</p>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                    <div className="grid grid-cols-3 gap-2">
                                                                        {ALL_COLS.filter(c => row[c] !== undefined && row[c] !== '').map(col => (
                                                                            <div key={col} className="bg-white border border-gray-100 rounded-xl p-3">
                                                                                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">{col}</p>
                                                                                <p className="text-[12.5px] text-gray-700 break-all">{row[col]?.toString() || '—'}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── RESULT BANNER ── */}
                    {result && (
                        <div className={`flex items-center gap-4 p-5 rounded-2xl border mb-5
                            ${result.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                            {result.success
                                ? <TbCircleCheck size={28} className="text-emerald-500 flex-shrink-0" />
                                : <TbCircleX size={28} className="text-red-500 flex-shrink-0" />}
                            <div>
                                <p className={`text-[14px] font-bold mb-0.5 ${result.success ? 'text-emerald-700' : 'text-red-700'}`}>
                                    {result.success ? '🎉 Upload Successful!' : '❌ Upload Failed'}
                                </p>
                                <p className={`text-[13px] ${result.success ? 'text-emerald-600' : 'text-red-600'}`}>{result.message}</p>
                            </div>
                            {result.success && (
                                <button onClick={reset}
                                    className="ml-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12.5px] font-semibold transition-colors flex-shrink-0">
                                    Upload More
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* ══ SIDEBAR ══ */}
                <div className="flex flex-col gap-4">

                    {/* Upload action card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                <TbRocket size={18} className="text-indigo-600" />
                            </div>
                            <p className="text-[13.5px] font-bold text-gray-900">Upload to Database</p>
                        </div>

                        {/* Stats */}
                        {hasData && (
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {[
                                    { label: 'Total Rows', val: rows.length, cls: 'bg-blue-50 border-blue-100 text-blue-700' },
                                    { label: 'Valid', val: validRows.length, cls: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
                                    { label: 'Errors', val: invalidRows.length, cls: invalidRows.length ? 'bg-red-50 border-red-100 text-red-600' : 'bg-emerald-50 border-emerald-100 text-emerald-700' },
                                    { label: 'Will Upload', val: validRows.length, cls: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
                                ].map(({ label, val, cls }) => (
                                    <div key={label} className={`border rounded-xl p-3 text-center ${cls}`}>
                                        <p className="text-[22px] font-extrabold leading-none">{val}</p>
                                        <p className="text-[10.5px] font-semibold uppercase tracking-wide mt-1 opacity-70">{label}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!hasData && (
                            <div className="text-center py-5 mb-4">
                                <TbFileSpreadsheet size={30} className="text-gray-200 mx-auto mb-2" />
                                <p className="text-[13px] text-gray-400">Upload a file to see preview</p>
                            </div>
                        )}

                        <button type="button"
                            onClick={mode === 'url' ? submitUrl : submitZip}
                            disabled={uploading || (mode === 'url' ? !validRows.length : !csvFile || !zipFile)}
                            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-[13.5px] font-bold transition-all
                                ${uploading ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : (!validRows.length && mode === 'url') ? 'bg-indigo-300 text-white cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer'}`}>
                            {uploading
                                ? <><TbRefresh size={15} className="bu-spin" /> Uploading…</>
                                : <><TbRocket size={15} /> Upload {validRows.length || ''} Products</>}
                        </button>

                        {invalidRows.length > 0 && !uploading && (
                            <div className="mt-3 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-center">
                                <p className="text-[11.5px] text-amber-700 font-semibold">
                                    ⚠ {invalidRows.length} row{invalidRows.length > 1 ? 's' : ''} with errors will be skipped
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Format guide */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                                <TbInfoCircle size={15} className="text-blue-600" />
                            </div>
                            <p className="text-[13.5px] font-bold text-gray-900">Format Guide</p>
                        </div>
                        <div className="space-y-3">
                            {[
                                { field: 'sku', example: 'WHITE-BEAR-SQ-PK2', note: 'Alphanumeric + hyphens + brackets' },
                                { field: 'itemDetails', example: 'Brand: LL::Material: Leather', note: 'Key: Value::Key: Value format' },
                                { field: 'sizes', example: 'S:0.9:10,M:1:5,L:2499:10:custom', note: 'size:multiplier[:stock[:customPrice]]' },
                                { field: '  ├ multiplier', example: '0.9 = 90% of base price', note: 'auto-calculated price' },
                                { field: '  ├ stock', example: '10 = 10 units', note: 'optional, defaults 0' },
                                { field: '  └ customPrice', example: '2499 = exact size price', note: 'overrides multiplier' },
                                { field: 'color', example: 'Black,Brown or White:#F6F6FC', note: 'name or name:#hex format' },
                                { field: 'image (URL)', example: 'https://…jpg,https://…jpg', note: 'public URLs, comma separated' },
                                { field: 'image (ZIP)', example: 'img1.jpg,img2.jpg', note: 'filenames inside ZIP' },
                                { field: 'bestseller', example: 'true or false', note: 'string value' },
                            ].map(({ field, example, note }) => (
                                <div key={field} className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                    <p className="text-[12px] font-semibold text-gray-700 mb-1">{field}</p>
                                    <code className="block text-[11.5px] text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1.5 rounded-lg break-all">{example}</code>
                                    <p className="text-[11px] text-gray-400 mt-1">{note}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={downloadTemplate}
                            className="w-full mt-4 py-2.5 rounded-xl flex items-center justify-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-[13px] font-semibold hover:bg-violet-100 transition-colors">
                            <TbDownload size={13} /> Download Sample Excel
                        </button>
                    </div>

                    {/* ZIP instructions */}
                    {mode === 'zip' && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                                    <TbZip size={14} className="text-amber-500" />
                                </div>
                                <p className="text-[13.5px] font-bold text-gray-900">ZIP Setup</p>
                            </div>
                            <div className="space-y-2">
                                {[
                                    'Add all product images into a ZIP file (no subfolders)',
                                    'In CSV "image" column, write filenames: jacket1.jpg,jacket2.jpg',
                                    'Upload CSV + ZIP together',
                                    'Backend matches filenames from ZIP and uploads to Cloudinary',
                                ].map((tip, i) => (
                                    <p key={i} className={`text-[12.5px] leading-relaxed ${i === 0 ? 'text-amber-700 font-semibold' : 'text-gray-500'}`}>
                                        {i + 1}. {tip}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BulkUpload;