import React, { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { backendUrl } from '../../App';
import {
    TbPackage, TbPhoto, TbPalette, TbRuler, TbChartBar,
    TbX, TbPlus, TbTrash, TbCheck, TbAlertTriangle,
    TbDeviceFloppy, TbRocket, TbEye, TbChevronRight,
    TbStar, TbInfoCircle, TbBolt, TbTag
} from 'react-icons/tb';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/* ═══════════════════ CONSTANTS ═══════════════════ */
const PRESETS = [
    { name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" },
    { name: "Red", hex: "#EF4444" }, { name: "Navy Blue", hex: "#1E3A5F" },
    { name: "Royal Blue", hex: "#3B82F6" }, { name: "Forest Green", hex: "#166534" },
    { name: "Olive", hex: "#4D7C0F" }, { name: "Yellow", hex: "#EAB308" },
    { name: "Pink", hex: "#EC4899" }, { name: "Lavender", hex: "#8B5CF6" },
    { name: "Orange", hex: "#F97316" }, { name: "Brown", hex: "#92400E" },
    { name: "Cream", hex: "#FFFDD0" }, { name: "Gray", hex: "#9CA3AF" },
    { name: "Charcoal", hex: "#374151" }, { name: "Maroon", hex: "#7F1D1D" },
];

const INIT_SIZES = {
    XS: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
    S: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
    M: { multiplier: 1.0, stock: 0, customPrice: "", useCustomPrice: false },
    L: { multiplier: 1.1, stock: 0, customPrice: "", useCustomPrice: false },
    XL: { multiplier: 1.2, stock: 0, customPrice: "", useCustomPrice: false },
    XXL: { multiplier: 1.35, stock: 0, customPrice: "", useCustomPrice: false },
    "3XL": { multiplier: 1.5, stock: 0, customPrice: "", useCustomPrice: false },
};

/* ═══════════════════ LIGHTBOX ═══════════════════ */
const Lightbox = ({ imgs, start, onClose }) => {
    const [cur, setCur] = useState(start);
    useEffect(() => {
        const h = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') setCur(p => Math.max(0, p - 1));
            if (e.key === 'ArrowRight') setCur(p => Math.min(imgs.length - 1, p + 1));
        };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [imgs.length, onClose]);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/88 backdrop-blur-sm" onClick={onClose}>
            <div className="relative flex flex-col items-center gap-4 max-w-[90vw]" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg hover:rotate-90 transition-transform z-10">
                    <TbX size={14} className="text-gray-800" />
                </button>
                <img src={URL.createObjectURL(imgs[cur])} alt="" className="max-w-[80vw] max-h-[72vh] rounded-xl object-contain shadow-2xl" />
                {cur > 0 && <button onClick={() => setCur(p => p - 1)} className="absolute left-[-52px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"><FiChevronLeft size={22} /></button>}
                {cur < imgs.length - 1 && <button onClick={() => setCur(p => p + 1)} className="absolute right-[-52px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"><FiChevronRight size={22} /></button>}
                {imgs.length > 1 && (
                    <div className="flex gap-2">
                        {imgs.map((img, i) => (
                            <img key={i} src={URL.createObjectURL(img)} alt="" onClick={() => setCur(i)}
                                className={`w-12 h-12 rounded-lg object-cover cursor-pointer border-2 transition-all ${i === cur ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-75'}`} />
                        ))}
                    </div>
                )}
                <p className="text-white/50 text-xs">{cur + 1} / {imgs.length} · Esc to close</p>
            </div>
        </div>
    );
};

/* ═══════════════════ DRAFT PAGE ═══════════════════ */
const DraftPage = ({ formState, onContinue, onPublishNow, onNewProduct }) => {
    const { name, description, price, detailedDescription, hasImages, hasColors, hasSizes } = formState;
    const steps = [
        { label: "Basic Info", done: !!(name?.trim() && description?.trim()), detail: name?.trim() ? `"${name.slice(0, 30)}…"` : "Required" },
        { label: "Pricing", done: !!price, detail: price ? `$${price}` : "Required" },
        { label: "Product Images", done: !!hasImages, detail: hasImages ? "Uploaded" : "Add images" },
        { label: "Color Variants", done: !!hasColors, detail: hasColors ? "Added" : "Add at least 1" },
        { label: "Sizes & Inventory", done: !!hasSizes, detail: hasSizes ? "Configured" : "⚠ Required" },
        { label: "Detailed Description", done: !!detailedDescription, detail: detailedDescription ? "Added" : "Optional" },
    ];
    const doneCount = steps.filter(s => s.done).length;
    const pct = Math.round((doneCount / steps.length) * 100);
    const canPublish = steps.slice(0, 5).every(s => s.done);

    return (
        <div className="fixed inset-0 z-50 bg-gray-50 flex items-center justify-center p-5 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-10 max-w-[480px] w-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5">
                    <TbDeviceFloppy size={30} className="text-amber-500" />
                </div>
                <h2 className="text-[24px] font-extrabold text-gray-900 mb-2 tracking-tight">Draft Saved!</h2>
                <p className="text-[13.5px] text-gray-500 mb-7 leading-relaxed">Your listing is saved. Complete remaining steps before publishing.</p>
                <div className="mb-6 text-left">
                    <div className="flex justify-between text-[12px] font-semibold text-gray-500 mb-2">
                        <span>Listing Progress</span>
                        <span className="text-gray-900">{doneCount}/{steps.length} · {pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-900 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left mb-7">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Checklist</p>
                    <div className="space-y-2">
                        {steps.map((s, i) => (
                            <div key={i} className={`flex items-center gap-3 py-1.5 border-b border-gray-100 last:border-0 ${s.done ? 'text-emerald-700' : 'text-gray-600'}`}>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? 'bg-emerald-500' : 'bg-gray-100 border border-gray-200'}`}>
                                    {s.done && <TbCheck size={11} className="text-white" />}
                                </div>
                                <span className="flex-1 text-[12.5px] font-medium">{s.label}</span>
                                <span className={`text-[11px] font-bold ${s.done ? 'text-emerald-500' : 'text-gray-400'}`}>{s.done ? '✓ Done' : s.detail}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={onContinue} className="w-full py-3 rounded-xl bg-gray-900 text-white text-[13.5px] font-semibold hover:bg-gray-800 transition-colors">Continue Editing</button>
                    {canPublish && <button onClick={onPublishNow} className="w-full py-3 rounded-xl bg-emerald-500 text-white text-[13.5px] font-semibold hover:bg-emerald-600 transition-colors">🚀 Publish Now</button>}
                    <button onClick={onNewProduct} className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 text-[13.5px] font-semibold hover:bg-gray-50 transition-colors">+ Add Another Product</button>
                </div>
                <p className="text-[11px] text-gray-400 mt-4">Saved at {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
        </div>
    );
};

/* ═══════════════════ CARD WRAPPER ═══════════════════ */
const Card = ({ icon, title, subtitle, badge, children, action }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-500">{icon}</div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-gray-900">{title}</span>
                        {badge}
                    </div>
                    {subtitle && <p className="text-[11.5px] text-gray-400 mt-0.5">{subtitle}</p>}
                </div>
            </div>
            {action}
        </div>
        <div className="p-6">{children}</div>
    </div>
);

/* ═══════════════════ FORM FIELD ═══════════════════ */
const Field = ({ label, required, hint, children }) => (
    <div className="mb-5 last:mb-0">
        {label && (
            <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                {label} {required && <span className="text-red-500 text-sm">*</span>}
            </label>
        )}
        {children}
        {hint && <p className="text-[11.5px] text-gray-400 mt-1.5">{hint}</p>}
    </div>
);

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-all";
const selectCls = inputCls + " appearance-none cursor-pointer bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMiI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiLz48L3N2Zz4=')] bg-no-repeat bg-[right_12px_center] pr-9";

/* ═══════════════════ STEP INDICATOR ═══════════════════ */
const Steps = ({ steps }) => (
    <div className="bg-white border-b border-gray-100 px-6 py-0 flex items-center overflow-x-auto gap-0">
        {steps.map(([num, label, done], i) => (
            <React.Fragment key={num}>
                <div className={`flex items-center gap-2.5 py-4 px-2 flex-shrink-0 transition-opacity ${done ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10.5px] font-bold flex-shrink-0 ${done ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                        {done ? <TbCheck size={11} /> : num}
                    </div>
                    <span className={`text-[12.5px] whitespace-nowrap ${done ? 'font-bold text-gray-900' : 'font-medium text-gray-500'}`}>{label}</span>
                </div>
                {i < steps.length - 1 && <TbChevronRight size={14} className="text-gray-200 flex-shrink-0 mx-1" />}
            </React.Fragment>
        ))}
    </div>
);

/* ═══════════════════ MAIN ═══════════════════ */
const Add = ({ token }) => {
    const [images, setImages] = useState(Array(10).fill(null));
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscPrice] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [bestseller, setBestseller] = useState(false);
    const [detailedDescription, setDD] = useState("");
    const [colors, setColors] = useState([]);
    const [newColorName, setNewCName] = useState("");
    const [newColorHex, setNewCHex] = useState("#000000");
    const [sizeType, setSizeType] = useState("standard");
    const [stdSizes, setStdSizes] = useState(INIT_SIZES);
    const [enabledSizes, setEnabledSizes] = useState([]);
    const [inchSizes, setInchSizes] = useState([]);

    /* ── New inch form — NO niCustom, global pricingMode drives it ── */
    const [niSize, setNiSize] = useState("");
    const [niMult, setNiMult] = useState(1.0);
    const [niStock, setNiStock] = useState(0);
    const [niPrice, setNiPrice] = useState("");

    const [lbOpen, setLbOpen] = useState(false);
    const [lbIdx, setLbIdx] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [valErrs, setValErrs] = useState([]);
    const [draftNotif, setDraftNotif] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [draftSaving, setDraftSaving] = useState(false);
    const [showDraftPage, setShowDraftPage] = useState(false);
    const [sizeErr, setSizeErr] = useState(false);
    const [sizeCardShake, setSizeCardShake] = useState(false);

    /* ── FIX: itemDetails initialized as array, not null ── */
    const [itemDetails, setItemDetails] = useState([{ title: "", value: "" }]);
    /* ── FIX: pricingMode drives ALL sizes globally ── */
    const [pricingMode, setPricingMode] = useState("custom");
    /* ── SKU state ── */
    const [sku, setSku] = useState("");
    /* ── Dynamic categories from API ── */
    const [categories, setCategories] = useState([]);

    const dzRef = useRef(null);
    const sizeRef = useRef(null);

    const uploaded = images.filter(Boolean);
    const hasSizes = sizeType === 'standard' ? enabledSizes.length > 0 : inchSizes.length > 0;
    // const discount = discountPrice && price && +discountPrice < +price
    //     ? Math.round((1 - discountPrice / price) * 100) : null;
    const discount = discountPrice && +discountPrice > 0 && +discountPrice < 100
        ? Math.round(+discountPrice) : null;

    const progress = Math.min(100, [
        name.trim() ? 15 : 0, description.trim() ? 10 : 0, price ? 15 : 0,
        uploaded.length > 0 ? 15 : 0, colors.length > 0 ? 15 : 0,
        hasSizes ? 15 : 0, detailedDescription ? 8 : 0, (category && subCategory) ? 7 : 0,
    ].reduce((a, b) => a + b, 0));

    /* ── Auto-save ── */
    useEffect(() => {
        if (!name && !description && !price) return;
        const t = setTimeout(() => {
            try {
                localStorage.setItem('ap_draft', JSON.stringify({ name, description, price, discountPrice, category, subCategory, bestseller, detailedDescription }));
                setDraftNotif(true); setTimeout(() => setDraftNotif(false), 2500);
            } catch { }
        }, 2000);
        return () => clearTimeout(t);
    }, [name, description, price, discountPrice, category, subCategory, bestseller, detailedDescription]);

    /* ── FIX: Fetch categories + restore draft inside same flow to avoid race condition ── */
    useEffect(() => {
        const init = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/category/list`);
                if (res.data.success) {
                    const cats = res.data.categories;
                    setCategories(cats);

                    /* Try restoring draft */
                    try {
                        const d = JSON.parse(localStorage.getItem('ap_draft') || '{}');
                        if (d.name) {
                            setName(d.name || '');
                            setDescription(d.description || '');
                            setPrice(d.price || '');
                            setDiscPrice(d.discountPrice || '');
                            setBestseller(d.bestseller || false);
                            setDD(d.detailedDescription || '');

                            /* Restore category — validate against loaded cats */
                            const savedCat = d.category || '';
                            const validCat = cats.find(c => c.categoryName === savedCat);
                            if (validCat) {
                                setCategory(validCat.categoryName);
                                const savedSub = d.subCategory || '';
                                const validSub = validCat.subCategories?.includes(savedSub);
                                setSubCategory(validSub ? savedSub : (validCat.subCategories?.[0] || ''));
                            } else if (cats.length > 0) {
                                setCategory(cats[0].categoryName);
                                setSubCategory(cats[0].subCategories?.[0] || '');
                            }
                            toast.info('💾 Draft restored', { autoClose: 2500 });
                            return;
                        }
                    } catch { }

                    /* No draft — set defaults from first category */
                    if (cats.length > 0) {
                        setCategory(cats[0].categoryName);
                        setSubCategory(cats[0].subCategories?.[0] || '');
                    }
                }
            } catch (err) {
                console.error('Failed to load categories', err);
                toast.error('Could not load categories');
            }
        };
        init();
    }, []);

    /* ── Auto-set base price from smallest custom price size ── */
    useEffect(() => {
        let minPrice = null;
        if (sizeType === 'standard' && enabledSizes.length > 0) {
            const ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
            const sorted = [...enabledSizes].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
            const d = stdSizes[sorted[0]];
            if (d.useCustomPrice && d.customPrice) minPrice = parseFloat(d.customPrice);
        } else if (sizeType === 'inch' && inchSizes.length > 0) {
            const sorted = [...inchSizes].sort((a, b) => {
                const n = s => Math.min(...(s.match(/\d+\.?\d*/g) || ['Infinity']).map(parseFloat));
                return n(a.size) - n(b.size);
            });
            if (sorted[0].useCustomPrice && sorted[0].customPrice) minPrice = parseFloat(sorted[0].customPrice);
        }
        if (minPrice && minPrice > 0 && minPrice.toString() !== price) setPrice(minPrice.toString());
    }, [sizeType, enabledSizes, stdSizes, inchSizes]);

    /* ── Image handlers ── */
    const setImg = (i, f) => setImages(prev => { const n = [...prev]; n[i] = f; return n; });
    const delImg = (i) => setImages(prev => { const n = [...prev]; n[i] = null; return n; });

    const handleDragEnter = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setDragging(true); }, []);
    const handleDragOver = useCallback((e) => { e.preventDefault(); e.stopPropagation(); e.dataTransfer.dropEffect = 'copy'; setDragging(true); }, []);
    const handleDragLeave = useCallback((e) => { e.preventDefault(); e.stopPropagation(); if (dzRef.current && !dzRef.current.contains(e.relatedTarget)) setDragging(false); }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault(); e.stopPropagation(); setDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        if (!files.length) { toast.error('Only image files'); return; }
        let added = 0;
        setImages(prev => { const next = [...prev]; files.forEach(f => { const s = next.findIndex(x => !x); if (s !== -1) { next[s] = f; added++; } }); return next; });
        requestAnimationFrame(() => { if (added) toast.success(`${added} image${added > 1 ? 's' : ''} added!`); else toast.info('All slots full'); });
    }, []);

    /* ── FIX: Color handlers — single format (Name + Hex), no colorMode toggle ── */
    const addColor = () => {
        if (!newColorName.trim()) return toast.error("Enter color name");
        const c = { name: newColorName.trim(), hex: newColorHex || '#808080' };
        if (colors.some(x => x.name.toLowerCase() === c.name.toLowerCase())) return toast.error("Color already exists");
        setColors([...colors, c]); setNewCName(""); setNewCHex("#000000");
        toast.success(`${c.name} added!`);
    };
    const rmColor = (n) => setColors(colors.filter(c => c.name !== n));
    const edColor = (i, f, v) => { const u = [...colors]; u[i][f] = v; setColors(u); };
    const addPreset = (p) => {
        if (!colors.some(c => c.name.toLowerCase() === p.name.toLowerCase())) { setColors([...colors, p]); toast.success(`${p.name} added!`); }
        else toast.info(`${p.name} already added`);
    };

    /* ── Size handlers ── */
    const toggleSize = (k) => { setSizeErr(false); setEnabledSizes(p => p.includes(k) ? p.filter(s => s !== k) : [...p, k]); };
    const setSzF = (k, f, v) => setStdSizes(p => ({
        ...p,
        [k]: { ...p[k], [f]: f === 'stock' ? parseInt(v) || 0 : f === 'multiplier' ? parseFloat(v) || 1 : v }
    }));
    const calcP = (d) => d.useCustomPrice && d.customPrice
        ? parseFloat(d.customPrice)
        : parseFloat(price || 0) * d.multiplier;

    /* ── FIX: Inch handlers — no useCustomPrice toggle, pricingMode drives it ── */
    const addInch = () => {
        if (!niSize.trim()) return toast.error("Enter size");
        if (inchSizes.some(s => s.size === niSize)) return toast.error("Size exists");
        setSizeErr(false);
        setInchSizes([...inchSizes, {
            size: niSize,
            multiplier: niMult,
            stock: niStock,
            customPrice: niPrice,
            useCustomPrice: pricingMode === "custom",
        }]);
        setNiSize(""); setNiMult(1.0); setNiStock(0); setNiPrice('');
        toast.success("Size added!");
    };
    const rmInch = (s) => setInchSizes(inchSizes.filter(i => i.size !== s));
    const edInch = (i, f, v) => {
        const u = [...inchSizes];
        if (f === 'stock') u[i].stock = parseInt(v) || 0;
        else if (f === 'multiplier') u[i].multiplier = parseFloat(v) || 1;
        else u[i][f] = v;
        setInchSizes(u);
    };

    /* ── Item Detail handlers ── */
    const addItemDetail = () => setItemDetails([...itemDetails, { title: "", value: "" }]);
    const updateItemDetail = (index, field, value) => {
        const updated = [...itemDetails]; updated[index][field] = value; setItemDetails(updated);
    };
    const removeItemDetail = (index) => setItemDetails(itemDetails.filter((_, i) => i !== index));

    /* ── Format sizes for submit ── */
    const formatSizes = () => {
        if (sizeType === "standard") return enabledSizes.map(k => {
            const d = stdSizes[k];
            const obj = { size: k, priceMultiplier: d.multiplier, stock: d.stock };
            if (d.useCustomPrice) {
                const v = d.customPrice?.trim();
                if (!v || isNaN(+v) || +v <= 0) { toast.error(`Invalid price for ${k}`); throw new Error("bad"); }
                obj.customPrice = +v; obj.useCustomPrice = true;
            }
            return obj;
        });
        return inchSizes.map(s => {
            const obj = { size: s.size, priceMultiplier: s.multiplier, stock: s.stock };
            if (s.useCustomPrice) {
                const v = s.customPrice?.trim();
                if (!v || isNaN(+v) || +v <= 0) { toast.error(`Invalid price for ${s.size}`); throw new Error("bad"); }
                obj.customPrice = +v; obj.useCustomPrice = true;
            }
            return obj;
        });
    };

    const validate = (isDraft = false) => {
        const errs = [];
        if (!name.trim()) errs.push("Product name is required");
        if (!description.trim()) errs.push("Short description is required");
        if (!subCategory || !subCategory.trim()) errs.push("Sub category is required");
        if (!hasSizes) {
            errs.push("At least one size must be selected");
            setSizeErr(true); setSizeCardShake(true);
            setTimeout(() => setSizeCardShake(false), 600);
            setTimeout(() => sizeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        }
        if (!isDraft) {
            if (!price || isNaN(+price) || +price <= 0) errs.push("Base price is required");
            if (!uploaded.length) errs.push("At least one product image is required");
            if (!colors.length) errs.push("Add at least one color variant");
        }
        return errs;
    };

    const saveDraft = async () => {
        const errs = validate(true);
        if (errs.length) { setValErrs(errs); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        setValErrs([]); setDraftSaving(true);
        try {
            localStorage.setItem('ap_full_draft', JSON.stringify({ name, description, price, discountPrice, category, subCategory, bestseller, detailedDescription, savedAt: new Date().toISOString() }));
            toast.success('💾 Draft saved!'); setShowDraftPage(true);
        } catch { toast.error("Failed to save draft"); }
        finally { setDraftSaving(false); }
    };

    const onSubmit = async (e) => {
        e?.preventDefault();
        const errs = validate(false);
        if (errs.length) { setValErrs(errs); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        setValErrs([]); setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append("name", name.trim());
            fd.append("description", description.trim());
            fd.append("detailedDescription", detailedDescription);
            fd.append("price", price);
            fd.append("discountPrice", discountPrice || "");
            fd.append("category", category);
            fd.append("subCategory", subCategory);
            fd.append("bestseller", bestseller);
            fd.append("sizes", JSON.stringify(formatSizes()));
            fd.append("color", JSON.stringify(colors));
            fd.append("itemDetails", JSON.stringify(itemDetails));
            fd.append("sku", sku);
            images.forEach(img => { if (img) fd.append("images", img); });
            const res = await axios.post(`${backendUrl}/api/product/add`, fd, { headers: { token } });
            if (res.data.success) {
                toast.success("🎉 Product published!");
                try { localStorage.removeItem('ap_draft'); localStorage.removeItem('ap_full_draft'); } catch { }
                resetForm();
            } else {
                toast.error(res.data.message || "Failed to publish");
            }
        } catch (err) { if (err.message !== "bad") toast.error(err.response?.data?.message || "Something went wrong"); }
        finally { setSubmitting(false); }
    };

    /* ── FIX: resetForm — proper state resets ── */
    const resetForm = () => {
        setSku("");
        setItemDetails([{ title: "", value: "" }]);
        setPricingMode("custom");
        setName(""); setDescription(""); setDD(""); setPrice(""); setDiscPrice("");
        setColors([]); setEnabledSizes([]); setStdSizes(INIT_SIZES); setInchSizes([]);
        setImages(Array(10).fill(null)); setSizeType("standard");
        setCategory(categories?.[0]?.categoryName || "");
        setSubCategory(categories?.[0]?.subCategories?.[0] || "");
        setBestseller(false); setValErrs([]); setSizeErr(false); setShowDraftPage(false);
    };

    const clearAll = () => { resetForm(); try { localStorage.removeItem('ap_draft'); } catch { } toast.success("Form cleared"); };

    const draftFormState = { name, description, price, detailedDescription, hasImages: uploaded.length > 0, hasColors: colors.length > 0, hasSizes };

    if (showDraftPage) return (
        <DraftPage
            formState={draftFormState}
            onContinue={() => setShowDraftPage(false)}
            onPublishNow={() => { setShowDraftPage(false); setTimeout(() => onSubmit(), 100); }}
            onNewProduct={() => resetForm()}
        />
    );

    /* ════════════════════════════════════════════════════════
       RENDER
    ════════════════════════════════════════════════════════ */
    return (
        <div className="min-h-screen bg-[#f7f7f5]">
            <style>{`
                @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
                .shake { animation: shake 0.4s ease; }
                .ql-container { font-size: 14px; border-radius: 0 0 12px 12px !important; border-color: #e5e7eb !important; }
                .ql-toolbar { border-radius: 12px 12px 0 0 !important; border-color: #e5e7eb !important; background: #f9fafb; }
                .ql-editor { min-height: 160px; font-family: inherit; }
            `}</style>

            {/* ── TOP BAR ── */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-6 flex items-center justify-between shadow-sm h-16">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                        <TbPackage size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-[17px] font-extrabold text-gray-900 leading-none tracking-tight">Add Product</h1>
                        <p className="text-[11px] text-gray-400 mt-0.5">{progress}% complete</p>
                    </div>
                    {draftNotif && (
                        <span className="ml-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-[11px] font-semibold">
                            <TbDeviceFloppy size={12} /> Auto-saved
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={clearAll} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                        <TbTrash size={14} /> <span className="hidden sm:inline">Clear</span>
                    </button>
                    <button type="button" onClick={saveDraft} disabled={draftSaving} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-[13px] font-semibold hover:bg-amber-100 transition-colors disabled:opacity-60">
                        <TbDeviceFloppy size={14} /> <span className="hidden sm:inline">{draftSaving ? 'Saving…' : 'Save Draft'}</span>
                    </button>
                    <button type="button" onClick={onSubmit} disabled={submitting} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold transition-colors shadow-sm disabled:opacity-60">
                        <TbRocket size={14} /> <span>{submitting ? 'Publishing…' : 'Publish'}</span>
                    </button>
                </div>
            </div>

            {/* ── STEPS ── */}
            <Steps steps={[
                ['1', 'Basic Info', !!(name && description)],
                ['2', 'Pricing', !!price],
                ['3', 'Media', uploaded.length > 0],
                ['4', 'Colors', colors.length > 0],
                ['5', 'Sizes', hasSizes],
            ]} />
            <div className="h-1 bg-gray-100">
                <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 p-6 max-w-[1400px] items-start">
                    <div>
                        {/* Validation errors */}
                        {valErrs.length > 0 && (
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <TbAlertTriangle size={16} className="text-red-500 flex-shrink-0" />
                                    <h4 className="text-[13px] font-bold text-red-700">Please fix before continuing:</h4>
                                </div>
                                <ul className="space-y-1 pl-6">
                                    {valErrs.map((e, i) => <li key={i} className="text-[12.5px] text-red-600 list-disc">{e}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* ── BASIC INFO ── */}
                        <Card icon={<TbPackage size={18} />} title="Basic Information" subtitle="Name, description & category">
                            <Field label="Product Name" required>
                                <div className="relative">
                                    <input className={inputCls + (name.length > 220 ? ' border-red-400 bg-red-50' : '')}
                                        type="text" maxLength={250} placeholder="e.g. Classic Lambskin Leather Jacket"
                                        value={name} onChange={e => setName(e.target.value)} />
                                    <span className={`absolute right-3 bottom-3 text-[10.5px] pointer-events-none ${name.length > 220 ? 'text-amber-500' : 'text-gray-400'}`}>{name.length}/250</span>
                                </div>
                            </Field>

                            <Field label="Short Description" required>
                                <div className="relative">
                                    <textarea className={inputCls + " resize-y min-h-[90px] " + (description.length > 280 ? 'border-red-400 bg-red-50' : '')}
                                        maxLength={300} placeholder="Compelling product description…"
                                        value={description} onChange={e => setDescription(e.target.value)} />
                                    <span className={`absolute right-3 bottom-3 text-[10.5px] pointer-events-none ${description.length > 240 ? 'text-amber-500' : 'text-gray-400'}`}>{description.length}/300</span>
                                </div>
                            </Field>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* ── FIX: Dynamic category from API ── */}
                                <Field label="Category">
                                    <select className={selectCls} value={category}
                                        onChange={e => {
                                            const selected = categories.find(c => c.categoryName === e.target.value);
                                            setCategory(e.target.value);
                                            setSubCategory(selected?.subCategories?.[0] || '');
                                        }}>
                                        {categories.length === 0
                                            ? <option value="">Loading...</option>
                                            : categories.map(cat => (
                                                <option key={cat._id} value={cat.categoryName}>{cat.categoryName}</option>
                                            ))
                                        }
                                    </select>
                                </Field>

                                {/* ── FIX: Dynamic subCategory from selected category ── */}
                                <Field label="Sub Category">
                                    <select className={selectCls} value={subCategory} onChange={e => setSubCategory(e.target.value)}>
                                        {(categories.find(c => c.categoryName === category)?.subCategories || []).map(sub => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </Field>

                                {/* ── FIX: SKU properly bound to state ── */}
                                <Field label="SKU / Code" hint={<>Mandatory for inventory management. <br /> E.g. WHITE-BEAR-SQ-PK2</>}>
                                    <input className={inputCls} type="text" placeholder="e.g. WHITE-BEAR-SQ-PK2"
                                        value={sku} onChange={e => setSku(e.target.value)} />
                                </Field>
                            </div>

                            <div className="border-t border-gray-100 pt-5 mt-1">
                                <Field label="Detailed Description" hint="Shown on product detail page. Add specs, care instructions, materials.">
                                    <ReactQuill theme="snow" value={detailedDescription} onChange={setDD} />
                                </Field>
                            </div>
                        </Card>

                        {/* ── ITEM DETAILS (ported from ddollylamb) ── */}
                        <Card icon={<TbInfoCircle size={18} />} title="Item Details" subtitle="Additional product specifications">
                            <div className="space-y-3">
                                {itemDetails.map((item, index) => (
                                    <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
                                        <input type="text" placeholder="Title (e.g. Brand Name)" value={item.title}
                                            onChange={e => updateItemDetail(index, 'title', e.target.value)}
                                            className={inputCls} />
                                        <input type="text" placeholder="Value (e.g. LLeather Lovers)" value={item.value}
                                            onChange={e => updateItemDetail(index, 'value', e.target.value)}
                                            className={inputCls} />
                                        <button type="button" onClick={() => removeItemDetail(index)}
                                            className="w-10 h-10 rounded-xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                                            <TbTrash size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={addItemDetail}
                                    className="w-full py-3 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50 text-indigo-600 text-[13px] font-semibold hover:bg-indigo-100 transition-colors">
                                    + Add Item Detail
                                </button>
                            </div>
                        </Card>

                        {/* ── MEDIA ── */}
                        <Card icon={<TbPhoto size={18} />} title="Product Images" subtitle={`${uploaded.length}/10 uploaded`}
                            action={uploaded.length > 0 && (
                                <button type="button" onClick={() => { setLbIdx(0); setLbOpen(true); }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                                    <TbEye size={13} /> View All
                                </button>
                            )}>
                            <div ref={dzRef}
                                className={`relative rounded-2xl border-2 border-dashed text-center p-8 mb-4 transition-all duration-200 cursor-pointer
                                    ${dragging ? 'border-indigo-500 bg-indigo-50 scale-[1.01]' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
                                onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${dragging ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                                    <TbPhoto size={24} className={dragging ? 'text-indigo-500' : 'text-gray-400'} />
                                </div>
                                <p className="text-[14px] font-semibold text-gray-700 mb-1">{dragging ? 'Drop your images here!' : 'Drag & drop images here'}</p>
                                <p className="text-[12px] text-gray-400">or click to upload · PNG, JPG, WEBP · 800×800px recommended</p>
                                {!dragging && (
                                    <input type="file" accept="image/*" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-[0]"
                                        onChange={e => {
                                            const files = Array.from(e.target.files); let added = 0;
                                            setImages(prev => { const next = [...prev]; files.forEach(f => { const s = next.findIndex(x => !x); if (s !== -1) { next[s] = f; added++; } }); return next; });
                                            e.target.value = '';
                                            requestAnimationFrame(() => { if (added) toast.success(`${added} image${added > 1 ? 's' : ''} added!`); else toast.info('All slots full'); });
                                        }} />
                                )}
                            </div>
                            <div className="grid grid-cols-5 gap-2.5">
                                {images.map((img, i) => (
                                    <div key={i} className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group
                                        ${img ? (i === 0 ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-transparent') : 'border-dashed border-gray-200 bg-gray-50 hover:border-gray-300 cursor-pointer'}`}>
                                        {img ? (
                                            <>
                                                <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                                                {i === 0 && <span className="absolute top-1.5 left-1.5 bg-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">MAIN</span>}
                                                <span className="absolute top-1.5 right-1.5 bg-black/50 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">{i + 1}</span>
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
                                                    <button type="button" className="bg-white text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-gray-100"
                                                        onMouseDown={e => { e.preventDefault(); e.stopPropagation(); setLbIdx(uploaded.indexOf(img)); setLbOpen(true); }}>🔍 View</button>
                                                    <button type="button" className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-red-600"
                                                        onMouseDown={e => { e.preventDefault(); e.stopPropagation(); delImg(i); }}>✕ Remove</button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex flex-col items-center justify-center h-full">
                                                    <TbPlus size={16} className="text-gray-300 mb-0.5" />
                                                    <span className="text-[9px] text-gray-300 font-medium">{i + 1}</span>
                                                </div>
                                                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer text-[0]"
                                                    onChange={e => { if (e.target.files[0]) setImg(i, e.target.files[0]); e.target.value = ''; }} />
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-[11.5px] text-gray-400 mt-3">First slot = main thumbnail. Hover any image to view or remove.</p>
                        </Card>

                        {/* ── COLORS — single format: Name + Hex (ported from ddollylamb) ── */}
                        <Card icon={<TbPalette size={18} />} title="Color Variants" subtitle="Add available colors"
                            badge={colors.length > 0 && <span className="px-2 py-0.5 rounded-full bg-gray-900 text-white text-[10px] font-bold">{colors.length}</span>}>

                            {/* Single add form — Name + Color picker always shown, no toggle */}
                            <div className="flex flex-wrap items-end gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                                <Field label="Name">
                                    <input className={inputCls} style={{ width: 160 }} type="text" placeholder="e.g. Navy Blue"
                                        value={newColorName} onChange={e => setNewCName(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addColor())} />
                                </Field>
                                <Field label="Color">
                                    <div className="flex gap-2 items-center">
                                        <input type="color" value={newColorHex} onChange={e => setNewCHex(e.target.value)}
                                            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                                        <input className={inputCls} style={{ width: 100 }} type="text"
                                            value={newColorHex} onChange={e => setNewCHex(e.target.value)} />
                                    </div>
                                </Field>
                                <button type="button" onClick={addColor}
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-[13px] font-semibold hover:bg-gray-800 transition-colors">
                                    <TbPlus size={14} /> Add
                                </button>
                            </div>

                            {colors.length === 0 ? (
                                <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-xl mb-4">
                                    <TbPalette size={28} className="text-gray-200 mx-auto mb-2" />
                                    <p className="text-[13px] text-gray-400 font-medium">No colors yet</p>
                                    <p className="text-[12px] text-gray-300">Add above or pick from presets below</p>
                                </div>
                            ) : (
                                <div className="space-y-2 mb-4">
                                    {colors.map((c, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors group">
                                            <input type="color" value={c.hex} onChange={e => edColor(i, 'hex', e.target.value)}
                                                className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer p-1 flex-shrink-0" />
                                            <div className="flex-1 grid grid-cols-2 gap-2">
                                                <input type="text" value={c.name} onChange={e => edColor(i, 'name', e.target.value)} placeholder="Color name"
                                                    className="text-[13px] font-medium text-gray-800 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-gray-400 outline-none py-0.5 transition-colors" />
                                                <input type="text" value={c.hex} onChange={e => edColor(i, 'hex', e.target.value)} placeholder="#000000"
                                                    className="text-[12px] text-gray-400 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-gray-400 outline-none py-0.5 font-mono transition-colors" />
                                            </div>
                                            <div className="w-6 h-6 rounded-full border border-black/10 flex-shrink-0" style={{ background: c.hex }} />
                                            <button type="button" onClick={() => rmColor(c.name)}
                                                className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100">
                                                <TbX size={13} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">Quick Presets</p>
                                <div className="flex flex-wrap gap-2">
                                    {PRESETS.map((p, i) => {
                                        const added = colors.some(c => c.name.toLowerCase() === p.name.toLowerCase());
                                        return (
                                            <button key={i} type="button" onClick={() => addPreset(p)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all
                                                    ${added ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                                                <div className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0" style={{ background: p.hex }} />
                                                {p.name}{added ? ' ✓' : ''}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </Card>

                        {/* ── SIZES ── */}
                        <Card icon={<TbRuler size={18} />} title="Sizes & Inventory" subtitle="Minimum 1 size required"
                            badge={<span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold uppercase tracking-wide">Required</span>}>

                            {sizeErr && (
                                <div className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl mb-5 text-red-700">
                                    <TbAlertTriangle size={16} className="flex-shrink-0" />
                                    <span className="text-[12.5px] font-semibold">Please select at least one size — required before saving or publishing.</span>
                                </div>
                            )}

                            <Field label="Base Price ($)" required>
                                <input className={inputCls + (price && (isNaN(+price) || +price <= 0) ? ' border-red-400 bg-red-50' : '')}
                                    type="number" placeholder="e.g. 4999" min="0" step="0.01"
                                    value={price} onChange={e => setPrice(e.target.value)} />
                                <div className="flex items-start gap-2 mt-2 p-3 bg-blue-50 border border-blue-100 rounded-xl text-[12px] text-blue-700">
                                    <TbInfoCircle size={14} className="flex-shrink-0 mt-0.5" />
                                    <span>Base price × multiplier = size's selling price. XL at 1.2× = ${price ? (parseFloat(price) * 1.2).toFixed(2) : '—'}. Use Custom Price mode for fixed per-size pricing.</span>
                                </div>
                            </Field>

                            <Field label="Size System">
                                <div className="flex gap-2">
                                    {[['standard', '👕 Standard (XS–3XL)'], ['inch', '📏 Inch-Based']].map(([v, l]) => (
                                        <button key={v} type="button" onClick={() => setSizeType(v)}
                                            className={`px-4 py-2 rounded-xl text-[13px] font-semibold border transition-all ${sizeType === v ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </Field>

                            {/* ── GLOBAL PRICING MODE (ported from ddollylamb) ── */}
                            <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3">Global Pricing Mode</p>
                                <div className="flex gap-2">
                                    <button type="button"
                                        onClick={() => {
                                            setPricingMode("multiplier");
                                            const upd = { ...stdSizes };
                                            Object.keys(upd).forEach(k => { upd[k].useCustomPrice = false; });
                                            setStdSizes(upd);
                                            setInchSizes(prev => prev.map(s => ({ ...s, useCustomPrice: false })));
                                        }}
                                        className={`px-4 py-2 rounded-xl text-[13px] font-semibold border transition-all
                                            ${pricingMode === "multiplier" ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
                                        Multiplier Based
                                    </button>
                                    <button type="button"
                                        onClick={() => {
                                            setPricingMode("custom");
                                            const upd = { ...stdSizes };
                                            Object.keys(upd).forEach(k => { upd[k].useCustomPrice = true; });
                                            setStdSizes(upd);
                                            setInchSizes(prev => prev.map(s => ({ ...s, useCustomPrice: true })));
                                        }}
                                        className={`px-4 py-2 rounded-xl text-[13px] font-semibold border transition-all
                                            ${pricingMode === "custom" ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
                                        Custom Price
                                    </button>
                                </div>
                                <p className="text-[11.5px] text-gray-400 mt-2">Select once — applies to all sizes automatically.</p>
                            </div>

                            {/* ── STANDARD SIZES ── */}
                            {sizeType === "standard" && (
                                <>
                                    <div ref={sizeRef} className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4 ${sizeCardShake ? 'shake' : ''}`}>
                                        {Object.keys(stdSizes).map(k => {
                                            const on = enabledSizes.includes(k);
                                            const d = stdSizes[k];
                                            return (
                                                <div key={k}
                                                    className={`rounded-xl border-2 p-3.5 transition-all cursor-pointer ${on ? 'border-indigo-400 bg-indigo-50/30 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                                                    onClick={() => !on && toggleSize(k)}>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <input type="checkbox" checked={on} onChange={() => toggleSize(k)} onClick={e => e.stopPropagation()} className="w-4 h-4 rounded accent-indigo-600 cursor-pointer" />
                                                        <span className={`text-[13px] font-extrabold px-2 py-0.5 rounded-md ${on ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{k}</span>
                                                        {on && d.stock > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full">{d.stock}×</span>}
                                                    </div>
                                                    {on && (
                                                        <div onClick={e => e.stopPropagation()} className="space-y-2 mt-2">
                                                            {/* NO per-size checkbox — pricingMode drives it */}
                                                            {pricingMode === "custom" ? (
                                                                <div>
                                                                    <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Price ($)</label>
                                                                    <input type="number" step="0.01" min="0" value={d.customPrice}
                                                                        onChange={e => setSzF(k, 'customPrice', e.target.value)}
                                                                        className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400 transition-colors" />
                                                                    <span className="text-[10.5px] text-indigo-600 font-bold mt-1 block">$ {d.customPrice || '—'}</span>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Multiplier ×{d.multiplier}</label>
                                                                    <input type="number" step="0.05" min="0.5" max="3" value={d.multiplier}
                                                                        onChange={e => setSzF(k, 'multiplier', e.target.value)}
                                                                        className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400 transition-colors" />
                                                                    <span className="text-[10.5px] text-emerald-600 font-bold mt-1 block">$ {price ? calcP(d).toFixed(2) : '—'}</span>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <label className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Stock</label>
                                                                <input type="number" min="0" value={d.stock}
                                                                    onChange={e => setSzF(k, 'stock', e.target.value)}
                                                                    className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400 transition-colors" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {enabledSizes.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                            {enabledSizes.map(k => (
                                                <span key={k} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-full text-[11.5px] font-semibold">
                                                    {k} · ${price ? calcP(stdSizes[k]).toFixed(0) : (stdSizes[k].customPrice || '—')} · {stdSizes[k].stock}pcs
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex gap-2 flex-wrap">
                                        {[
                                            ['S/M/L/XL', () => { setEnabledSizes(['S', 'M', 'L', 'XL']); setSizeErr(false); toast.success('S/M/L/XL selected!'); }],
                                            ['All Sizes', () => { setEnabledSizes(Object.keys(stdSizes)); setSizeErr(false); toast.success('All selected!'); }],
                                            ['Clear', () => setEnabledSizes([])],
                                        ].map(([label, action]) => (
                                            <button key={label} type="button" onClick={action}
                                                className="px-3 py-1.5 rounded-lg border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* ── INCH SIZES — NO checkbox, pricingMode drives it ── */}
                            {sizeType === "inch" && (
                                <>
                                    <div className="flex flex-wrap items-end gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                                        <Field label="Size Label">
                                            <input className={inputCls} style={{ width: 100 }} type="text" placeholder="14x14"
                                                value={niSize} onChange={e => setNiSize(e.target.value)} />
                                        </Field>
                                        <Field label="Stock">
                                            <input className={inputCls} style={{ width: 75 }} type="number" min="0"
                                                value={niStock} onChange={e => setNiStock(parseInt(e.target.value) || 0)} />
                                        </Field>
                                        {/* Price or Multiplier based on global mode — NO checkbox */}
                                        {pricingMode === "custom" ? (
                                            <Field label="Price ($)">
                                                <input className={inputCls} style={{ width: 90 }} type="number" step="0.01" min="0"
                                                    value={niPrice} onChange={e => setNiPrice(e.target.value)} />
                                            </Field>
                                        ) : (
                                            <Field label="Multiplier">
                                                <input className={inputCls} style={{ width: 80 }} type="number" step="0.1" min="0.5" max="2"
                                                    value={niMult} onChange={e => setNiMult(parseFloat(e.target.value) || 1)} />
                                            </Field>
                                        )}
                                        <button type="button" onClick={addInch}
                                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-[13px] font-semibold hover:bg-gray-800 transition-colors">
                                            <TbPlus size={14} /> Add Size
                                        </button>
                                    </div>

                                    {inchSizes.length === 0 ? (
                                        <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-xl">
                                            <TbRuler size={28} className="text-gray-200 mx-auto mb-2" />
                                            <p className="text-[13px] text-gray-400">No inch sizes yet — add above</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {inchSizes.map((s, i) => (
                                                <div key={i} className="bg-white border border-gray-100 rounded-xl p-3.5">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-[14px] font-extrabold text-gray-900">{s.size}"</span>
                                                        <button type="button" onClick={() => rmInch(s.size)}
                                                            className="w-6 h-6 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-100">
                                                            <TbX size={11} />
                                                        </button>
                                                    </div>
                                                    {/* Card driven by pricingMode — NO checkbox */}
                                                    {pricingMode === "custom" ? (
                                                        <div className="mb-2">
                                                            <label className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">Price ($)</label>
                                                            <input type="number" step="0.01" min="0" value={s.customPrice}
                                                                onChange={e => edInch(i, 'customPrice', e.target.value)}
                                                                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400" />
                                                            <span className="text-[10.5px] text-indigo-600 font-bold mt-1 block">$ {s.customPrice || '—'}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="mb-2">
                                                            <label className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">Multiplier</label>
                                                            <input type="number" step="0.1" min="0.5" max="2" value={s.multiplier}
                                                                onChange={e => edInch(i, 'multiplier', e.target.value)}
                                                                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400" />
                                                            <span className="text-[10.5px] text-emerald-600 font-bold mt-1 block">$ {price && +price > 0 ? ((+price) * s.multiplier).toFixed(2) : '—'}</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <label className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">Stock</label>
                                                        <input type="number" min="0" value={s.stock}
                                                            onChange={e => edInch(i, 'stock', e.target.value)}
                                                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </Card>
                    </div>

                    {/* ══ SIDEBAR ══ */}
                    <div className="space-y-4">
                        {/* Publish card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <TbRocket size={18} className="text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-[13.5px] font-bold text-gray-900">Save & Publish</p>
                                    <p className="text-[11px] text-gray-400">Draft saves · Publish goes live</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between text-[11.5px] font-semibold text-gray-500 mb-1.5">
                                    <span>Completion</span><span className="text-gray-900">{progress}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                            <button type="button" onClick={() => setBestseller(p => !p)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border mb-4 transition-all ${bestseller ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}>
                                <div className="flex items-center gap-2">
                                    <TbStar size={15} className={bestseller ? 'text-amber-500' : 'text-gray-400'} />
                                    <span className="text-[13px] font-semibold text-gray-700">Mark as Bestseller</span>
                                </div>
                                <div className={`w-10 rounded-full relative transition-colors ${bestseller ? 'bg-amber-400' : 'bg-gray-200'}`} style={{ height: '22px' }}>
                                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${bestseller ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                                </div>
                            </button>
                            <button type="button" onClick={saveDraft} disabled={draftSaving}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-[13px] font-semibold hover:bg-amber-100 transition-colors mb-2.5 disabled:opacity-60">
                                <TbDeviceFloppy size={15} /> {draftSaving ? 'Saving…' : 'Save as Draft'}
                            </button>
                            <button type="submit" disabled={submitting}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold transition-colors shadow-sm disabled:opacity-60">
                                <TbRocket size={15} /> {submitting ? 'Publishing…' : 'Publish Now'}
                            </button>
                        </div>

                        {/* Pricing */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                                    <TbTag size={16} className="text-emerald-600" />
                                </div>
                                <p className="text-[13.5px] font-bold text-gray-900">Pricing</p>
                            </div>
                            {/* <Field label="Sale / Discount Price ($)" hint="Optional — shown as sale price">
                                <input className={inputCls} type="number" placeholder="0.00" value={discountPrice} onChange={e => setDiscPrice(e.target.value)} />
                            </Field> */}
                            <Field label="Discount (%)" hint="Optional — percentage off, e.g. 10 = 10% off">
                                <input className={inputCls} type="number" placeholder="e.g. 10" min="0" max="99" value={discountPrice} onChange={e => setDiscPrice(e.target.value)} />
                            </Field>
                            {discount && (
                                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                                    <span className="text-[12.5px] font-semibold text-emerald-700">💸 Discount active</span>
                                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{discount}% off</span>
                                </div>
                            )}
                        </div>

                        {/* Live Summary */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <TbChartBar size={16} className="text-indigo-600" />
                                </div>
                                <p className="text-[13.5px] font-bold text-gray-900">Live Summary</p>
                            </div>
                            <div className="space-y-2">
                                {[
                                    ["Name", name || <span className="text-gray-300 italic text-[12px]">Not set</span>],
                                    ["Category", `${category} › ${subCategory || '—'}`],
                                    ["Base Price", price ? <span className="font-bold text-gray-900">${price}</span> : <span className="text-gray-300">—</span>],
                                    // ["Sale Price", discountPrice ? <span className="text-emerald-600 font-bold">${discountPrice}</span> : <span className="text-gray-300">—</span>],
                                    ["Discount", discount ? <span className="text-emerald-600 font-bold">{discount}% off</span> : <span className="text-gray-300">—</span>],
                                    ["Final Price", (price && discount) ? <span className="text-emerald-600 font-bold">${(+price - (+price * discount) / 100).toFixed(2)}</span> : <span className="text-gray-300">—</span>],
                                    ["Colors", colors.length > 0
                                        ? <div className="flex gap-1 flex-wrap justify-end">{colors.map((c, i) => <div key={i} title={c.name} className="w-4 h-4 rounded-full border border-black/10" style={{ background: c.hex }} />)}</div>
                                        : <span className="text-gray-300">—</span>],
                                    ["Sizes", sizeType === 'standard'
                                        ? (enabledSizes.length ? <span className="font-semibold">{enabledSizes.join(', ')}</span> : <span className="text-red-500 font-bold text-[11px]">⚠ Required</span>)
                                        : (inchSizes.length ? <span className="font-semibold">{inchSizes.map(s => s.size).join(', ')}</span> : <span className="text-red-500 font-bold text-[11px]">⚠ Required</span>)],
                                    ["Images", <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${uploaded.length > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{uploaded.length}/10</span>],
                                    ["Bestseller", bestseller ? <span className="bg-amber-100 text-amber-700 text-[10.5px] font-bold px-2 py-0.5 rounded-full">⭐ Yes</span> : <span className="text-gray-400 text-[12px]">No</span>],
                                ].map(([k, v], i) => (
                                    <div key={i} className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0 gap-3">
                                        <span className="text-[12px] text-gray-400 font-medium flex-shrink-0">{k}</span>
                                        <span className="text-[12.5px] text-gray-800 font-medium text-right max-w-[150px] truncate">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                                    <TbBolt size={16} className="text-violet-600" />
                                </div>
                                <p className="text-[13.5px] font-bold text-gray-900">Quick Actions</p>
                            </div>
                            <div className="space-y-2">
                                {[
                                    ["🎨 Add 4 basic colors", () => { const toAdd = PRESETS.filter(p => !colors.some(c => c.name === p.name)).slice(0, 4); setColors([...colors, ...toAdd]); toast.success(`${toAdd.length} colors added!`); }],
                                    ["👕 Select S / M / L / XL", () => { setEnabledSizes(['S', 'M', 'L', 'XL']); setSizeErr(false); setSizeType('standard'); toast.success('S/M/L/XL selected!'); }],
                                    ["✅ Select all sizes", () => { setEnabledSizes(Object.keys(stdSizes)); setSizeErr(false); setSizeType('standard'); toast.success('All sizes selected!'); }],
                                    ["🗑 Clear all sizes", () => { setEnabledSizes([]); toast.info('Sizes cleared'); }],
                                    ["🗑 Clear all colors", () => { setColors([]); toast.info('Colors cleared'); }],
                                ].map(([label, action]) => (
                                    <button key={label} type="button" onClick={action}
                                        className="w-full text-left px-3.5 py-2.5 rounded-xl border border-gray-100 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all">
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                            <div className="flex items-center gap-2.5 mb-3">
                                <HiOutlineLightBulb size={18} className="text-indigo-500 flex-shrink-0" />
                                <p className="text-[13px] font-bold text-indigo-800">Admin Tips</p>
                            </div>
                            <ul className="space-y-1.5">
                                {[
                                    'Drag & drop multiple images onto the drop zone',
                                    'Base price × multiplier = size\'s selling price',
                                    'Global Pricing Mode applies to all sizes at once',
                                    'Sizes are required — select at least 1',
                                    'Draft auto-saves basic fields every 2 seconds',
                                    'Press Enter after typing a color name to add it',
                                    'Item Details shown on product detail page',
                                ].map((tip, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[12px] text-indigo-700">
                                        <span className="text-indigo-400 mt-0.5 flex-shrink-0">·</span> {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </form>

            {lbOpen && uploaded.length > 0 && (
                <Lightbox imgs={uploaded} start={Math.min(lbIdx, uploaded.length - 1)} onClose={() => setLbOpen(false)} />
            )}
        </div>
    );
};

export default Add;

