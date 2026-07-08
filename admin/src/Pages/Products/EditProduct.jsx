import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { backendUrl } from "../../App";
import {
    TbPackage, TbPhoto, TbPalette, TbRuler, TbChartBar,
    TbX, TbPlus, TbTrash, TbCheck, TbAlertTriangle,
    TbDeviceFloppy, TbRocket, TbEye, TbChevronLeft,
    TbStar, TbInfoCircle, TbBolt, TbTag, TbEdit,
    TbArrowLeft, TbRefresh, TbCloudUpload
} from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* ═══════════════════ CONSTANTS ═══════════════════ */
const PRESETS = [
    { name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" },
    { name: "Red", hex: "#EF4444" }, { name: "Navy", hex: "#1E3A5F" },
    { name: "Royal Blue", hex: "#3B82F6" }, { name: "Green", hex: "#166534" },
    { name: "Yellow", hex: "#EAB308" }, { name: "Pink", hex: "#EC4899" },
    { name: "Lavender", hex: "#8B5CF6" }, { name: "Orange", hex: "#F97316" },
    { name: "Brown", hex: "#92400E" }, { name: "Gray", hex: "#9CA3AF" },
];

const INIT_STD = {
    XS: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
    S: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
    M: { multiplier: 1.0, stock: 0, customPrice: "", useCustomPrice: false },
    L: { multiplier: 1.1, stock: 0, customPrice: "", useCustomPrice: false },
    XL: { multiplier: 1.2, stock: 0, customPrice: "", useCustomPrice: false },
    XXL: { multiplier: 1.35, stock: 0, customPrice: "", useCustomPrice: false },
    "3XL": { multiplier: 1.5, stock: 0, customPrice: "", useCustomPrice: false },
};

// ✅ FIX 1 — Exactly same as Add.jsx — all 7 categories with correct subcategories
// const SUB_CATEGORIES = {
//     Men: [
//         "Jackets", "Bomber Biker Jacket", "Moto Biker Jacket",
//         "Racing Coat", "Leather Coats", "Men Winter Wear",
//     ],
//     Women: [
//         "Jackets", "Bomber Biker Jacket", "Moto Biker Jacket",
//         "Racing Coat", "Women Winter Wear", "Women Night Dress",
//         "Leather Pencil Skirt", "Leather Full Skirt", "Slim Bodycon Skirt",
//     ],
//     Others: [
//         "Pillow", "Cushion Cover", "Aprons", "Desk Mat", "Chair Cover",
//     ],
//     "Leather Pillow Cover": [
//         "Cylindrical Pillow Cover", "Square Pillow Cover",
//         "Rectangle Pillow Cover", "Round Pillow Cover",
//         "Ear Hole Pillow Cushion Cover",
//     ],
//     "Sofa Headrest": [
//         "Recliner Chair Headrest Cover",
//     ],
//     "Leather Desk Pad": [
//         "Leather Desk Mat",
//     ],
//     "Men Leather Apron": [
//         "Apron",
//     ],
// };

// ✅ FIX 2 — Default subCategory per category (same as Add.jsx CATEGORY_DEFAULT_SUB)
// const CATEGORY_DEFAULT_SUB = {
//     "Men": "Jackets",
//     "Women": "Jackets",
//     "Others": "Pillow",
//     "Leather Pillow Cover": "Cylindrical Pillow Cover",
//     "Sofa Headrest": "Recliner Chair Headrest Cover",
//     "Leather Desk Pad": "Leather Desk Mat",
//     "Men Leather Apron": "Apron",
// };

/* ═══════════════════ LIGHTBOX ═══════════════════ */
const Lightbox = ({ imgs, start, onClose }) => {
    const [cur, setCur] = useState(start);
    useEffect(() => {
        const h = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") setCur(p => Math.max(0, p - 1));
            if (e.key === "ArrowRight") setCur(p => Math.min(imgs.length - 1, p + 1));
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [imgs.length, onClose]);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/88 backdrop-blur-sm" onClick={onClose}>
            <div className="relative flex flex-col items-center gap-4 max-w-[90vw]" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg hover:rotate-90 transition-transform z-10">
                    <TbX size={14} className="text-gray-800" />
                </button>
                <img src={imgs[cur]} alt="" className="max-w-[80vw] max-h-[72vh] rounded-xl object-contain shadow-2xl" />
                {cur > 0 && <button onClick={() => setCur(p => p - 1)} className="absolute left-[-52px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"><FiChevronLeft size={22} /></button>}
                {cur < imgs.length - 1 && <button onClick={() => setCur(p => p + 1)} className="absolute right-[-52px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"><FiChevronRight size={22} /></button>}
                {imgs.length > 1 && (
                    <div className="flex gap-2 flex-wrap justify-center max-w-[80vw]">
                        {imgs.map((img, i) => <img key={i} src={img} alt="" onClick={() => setCur(i)} className={`w-12 h-12 rounded-lg object-cover cursor-pointer border-2 transition-all ${i === cur ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-75"}`} />)}
                    </div>
                )}
                <p className="text-white/50 text-xs">{cur + 1} / {imgs.length} · Esc to close</p>
            </div>
        </div>
    );
};

/* ═══════════════════ CARD ═══════════════════ */
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

/* ═══════════════════ FIELD ═══════════════════ */
const Field = ({ label, required, hint, children }) => (
    <div className="mb-5 last:mb-0">
        {label && <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">{label}{required && <span className="text-red-500 text-sm">*</span>}</label>}
        {children}
        {hint && <p className="text-[11.5px] text-gray-400 mt-1.5">{hint}</p>}
    </div>
);

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-all";
const selectCls = inputCls + " appearance-none cursor-pointer bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMiI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiLz48L3N2Zz4=')] bg-no-repeat bg-[right_12px_center] pr-9";

/* ═══════════════════ SKELETON ═══════════════════ */
const Skeleton = () => (
    <div className="min-h-screen bg-[#f7f7f5]">
        <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-xl animate-pulse" />
                <div className="w-px h-5 bg-gray-200" />
                <div className="w-32 h-5 bg-gray-100 rounded-lg animate-pulse" />
            </div>
            <div className="flex gap-2">
                <div className="w-24 h-9 bg-gray-100 rounded-xl animate-pulse" />
                <div className="w-32 h-9 bg-gray-100 rounded-xl animate-pulse" />
            </div>
        </div>
        <div className="p-6 grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 max-w-[1400px]">
            <div className="space-y-5">
                {[280, 220, 200, 260].map((h, i) => <div key={i} className="bg-white rounded-2xl border border-gray-100 animate-pulse" style={{ height: h }} />)}
            </div>
            <div className="space-y-4">
                {[180, 160, 200].map((h, i) => <div key={i} className="bg-white rounded-2xl border border-gray-100 animate-pulse" style={{ height: h }} />)}
            </div>
        </div>
    </div>
);

/* ═══════════════════ MAIN ═══════════════════ */
const UpdateProduct = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [slots, setSlots] = useState(Array(10).fill(null).map(() => ({ existing: null, newFile: null })));
    const [dragging, setDragging] = useState(false);
    const [lightbox, setLightbox] = useState(null);
    const dzRef = useRef(null);

    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [detDesc, setDetDesc] = useState("");
    const [price, setPrice] = useState("");
    const [discPrice, setDiscPrice] = useState("");
    const [category, setCategory] = useState("");
    // ✅ FIX 3 — Initial subCategory uses default map
    const [subCategory, setSubCat] = useState("");
    const [bestseller, setBest] = useState(false);
    const [sku, setSku] = useState('');
    const [categories, setCategories] = useState([]);

    /* ── Item Details ── */
    const [itemDetails, setItemDetails] = useState([{ title: "", value: "" }]);

    const [colors, setColors] = useState([]);
    const [newCName, setNewCName] = useState("");
    const [newCHex, setNewCHex] = useState("#000000");
    const [colorMode, setColorMode] = useState("both");

    const [sizeType, setSizeType] = useState("standard");
    const [stdSizes, setStdSizes] = useState(INIT_STD);
    const [enabledSz, setEnabledSz] = useState([]);
    const [inchSizes, setInchSizes] = useState([]);
    const [niSize, setNiSize] = useState("");
    const [niMult, setNiMult] = useState(1.0);
    const [niStock, setNiStock] = useState(0);
    const [niPrice, setNiPrice] = useState("");
    const [niCustom, setNiCustom] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [progress, setProgress] = useState(0);

    /* ── Derived ── */
    const allSlotImgs = slots.map(s => s.newFile ? URL.createObjectURL(s.newFile) : s.existing).filter(Boolean);
    const existingCount = slots.filter(s => s.existing && !s.newFile).length;
    const newFilesCount = slots.filter(s => s.newFile).length;
    const totalImages = slots.filter(s => s.newFile || s.existing).length;
    const discount = discPrice && +discPrice > 0 && +discPrice < 100 ? Math.round(+discPrice) : null;
    const hasSizes = sizeType === "standard" ? enabledSz.length > 0 : inchSizes.length > 0;
    const calcPrice = (d) => d.useCustomPrice && d.customPrice ? parseFloat(d.customPrice) : parseFloat(price || 0) * d.multiplier;

    /* ── Fetch product ── */
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await axios.post(backendUrl + "/api/product/single", { productId: id });
                if (res.data.success) {
                    const p = res.data.product;
                    setSku(p.sku || "");
                    setName(p.name || "");
                    setDesc(p.description || "");
                    setDetDesc(p.detailedDescription || "");
                    setPrice(String(p.price || ""));
                    setDiscPrice(String(p.discountPrice || ""));
                    setBest(p.bestseller || false);

                    // ✅ FIX 4 — Set category, then validate subCategory against full SUB_CATEGORIES map
                    // const cat = p.category || "Men";
                    // setCategory(cat);
                    // const validSubs = SUB_CATEGORIES[cat] || [];
                    // const savedSub = (p.subCategory || "").trim();
                    // // Use saved sub if valid, else fall back to default for that category
                    // setSubCat(
                    //     validSubs.some(s => s.toLowerCase() === savedSub.toLowerCase())
                    //         ? savedSub
                    //         : (CATEGORY_DEFAULT_SUB[cat] || validSubs[0] || "")
                    // );

                    setCategory(p.category || "");
                    setSubCat(p.subCategory || '');

                    const existingImgs = Array.isArray(p.image) ? p.image.filter(Boolean) : [p.image].filter(Boolean);
                    setSlots(Array(10).fill(null).map((_, i) => ({ existing: existingImgs[i] || null, newFile: null })));

                    if (p.color?.length) setColors(p.color.map(c => typeof c === "string" ? { name: c, hex: "#808080" } : { name: c.name || c, hex: c.hex || "#808080" }));

                    /* Item Details */
                    if (p.itemDetails?.length) {
                        setItemDetails(p.itemDetails);
                    } else {
                        setItemDetails([{ title: "", value: "" }]);
                    }

                    if (p.sizes?.length) {
                        const first = p.sizes[0];
                        const isStd = ["XS", "S", "M", "L", "XL", "XXL", "3XL"].includes(typeof first === "string" ? first : first?.size);
                        if (isStd) {
                            setSizeType("standard");
                            const en = []; const obj = { ...INIT_STD };
                            p.sizes.forEach(s => {
                                const k = typeof s === "string" ? s : s.size;
                                en.push(k);
                                obj[k] = {
                                    multiplier: s?.priceMultiplier || 1,
                                    stock: s?.stock ?? 0,
                                    customPrice: s?.customPrice > 0 ? String(s.customPrice) : "",
                                    useCustomPrice: s?.useCustomPrice === true,
                                };
                            });
                            setEnabledSz(en); setStdSizes(obj);
                        } else {
                            setSizeType("inch");
                            setInchSizes(p.sizes.map(s => ({ size: typeof s === "string" ? s : s.size, multiplier: s?.priceMultiplier || 1, stock: s?.stock || 0, customPrice: s?.customPrice || "", useCustomPrice: s?.useCustomPrice || false })));
                        }
                    }
                } else toast.error("Failed to load product");
            } catch { toast.error("Failed to load product"); }
            finally { setLoading(false); }
        };
        fetch();
    }, [id]);

    // ✅ FIX 5 — handleCategoryChange: auto-set first valid subCategory for new category
    // const handleCategoryChange = (newCat) => {
    //     setCategory(newCat);
    //     setSubCat(CATEGORY_DEFAULT_SUB[newCat] || SUB_CATEGORIES[newCat]?.[0] || "");
    // };

    /* ── Progress ── */
    useEffect(() => {
        let s = 0;
        if (name.trim()) s += 15;
        if (description.trim()) s += 10;
        if (price) s += 15;
        if (totalImages > 0) s += 15;
        if (colors.length) s += 15;
        if (hasSizes) s += 20;
        if (detDesc) s += 10;
        setProgress(Math.min(100, s));
    }, [name, description, price, totalImages, colors, hasSizes, detDesc]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    `${backendUrl}/api/category/list`
                );

                if (res.data.success) {
                    setCategories(res.data.categories || []);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
    }, []);

    /* ── Image handlers ── */
    const setSlotFile = (i, file) => setSlots(prev => { const n = [...prev]; n[i] = { ...n[i], newFile: file }; return n; });
    const clearSlotNew = (i) => setSlots(prev => { const n = [...prev]; n[i] = { ...n[i], newFile: null }; return n; });
    const clearSlotAll = (i) => setSlots(prev => { const n = [...prev]; n[i] = { existing: null, newFile: null }; return n; });

    const addFilesToSlots = (files) => {
        let added = 0;
        setSlots(prev => {
            const next = [...prev];
            for (const file of files) {
                const emptyIdx = next.findIndex(s => !s.existing && !s.newFile);
                if (emptyIdx === -1) break;
                next[emptyIdx] = { existing: null, newFile: file };
                added++;
            }
            return next;
        });
        requestAnimationFrame(() => { if (added > 0) toast.success(`${added} image${added > 1 ? "s" : ""} added!`); else toast.info("All slots full"); });
    };

    const handleDragEnter = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setDragging(true); }, []);
    const handleDragOver = useCallback((e) => { e.preventDefault(); e.stopPropagation(); e.dataTransfer.dropEffect = "copy"; setDragging(true); }, []);
    const handleDragLeave = useCallback((e) => { e.preventDefault(); e.stopPropagation(); if (dzRef.current && !dzRef.current.contains(e.relatedTarget)) setDragging(false); }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault(); e.stopPropagation(); setDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
        if (!files.length) { toast.error("Only image files allowed"); return; }
        addFilesToSlots(files);
    }, []);

    /* ── Color handlers ── */
    const addColor = () => {
        if (colorMode !== "hexOnly" && !newCName.trim()) return toast.error("Enter color name");
        const c = { name: newCName.trim() || `Color-${colors.length + 1}`, hex: newCHex || "#808080" };
        if (colors.some(x => x.name.toLowerCase() === c.name.toLowerCase())) return toast.error("Color exists");
        setColors([...colors, c]); setNewCName(""); setNewCHex("#000000"); toast.success(`${c.name} added`);
    };
    const rmColor = (n) => setColors(colors.filter(c => c.name !== n));
    const edColor = (i, f, v) => { const u = [...colors]; u[i][f] = v; setColors(u); };
    const addPreset = (p) => colors.some(c => c.name.toLowerCase() === p.name.toLowerCase()) ? toast.info(`${p.name} already added`) : (setColors([...colors, p]), toast.success(`${p.name} added!`));

    /* ════════════════════════════════════════════════════════
      ITEM DETAIL HANDLERS
   ════════════════════════════════════════════════════════ */
    const addItemDetail = () => setItemDetails([...itemDetails, { title: "", value: "" }]);
    const removeItemDetail = (index) => setItemDetails(itemDetails.filter((_, i) => i !== index));
    const updateItemDetail = (index, field, value) => {
        const updated = [...itemDetails];
        updated[index][field] = value;
        setItemDetails(updated);
    };

    /* ── Size handlers ── */
    const toggleSz = (k) => setEnabledSz(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);
    const setSzF = (k, f, v) => setStdSizes(p => ({ ...p, [k]: { ...p[k], [f]: f === "stock" ? parseInt(v) || 0 : f === "multiplier" ? parseFloat(v) || 1 : v } }));
    const toggleCP = (k) => setStdSizes(p => ({ ...p, [k]: { ...p[k], useCustomPrice: !p[k].useCustomPrice } }));
    const addInch = () => {
        if (!niSize.trim()) return toast.error("Enter size");
        if (inchSizes.some(s => s.size === niSize)) return toast.error("Size exists");
        setInchSizes([...inchSizes, { size: niSize, multiplier: niMult, stock: niStock, customPrice: niPrice, useCustomPrice: niCustom }]);
        setNiSize(""); setNiMult(1); setNiStock(0); setNiPrice(""); setNiCustom(false); toast.success("Size added!");
    };
    const rmInch = (s) => setInchSizes(inchSizes.filter(i => i.size !== s));
    const edInch = (i, f, v) => { const u = [...inchSizes]; if (f === "useCustomPrice") u[i].useCustomPrice = !u[i].useCustomPrice; else if (f === "stock") u[i].stock = parseInt(v) || 0; else if (f === "multiplier") u[i].multiplier = parseFloat(v) || 1; else u[i][f] = v; setInchSizes(u); };
    const fmtSizes = () => sizeType === "standard"
        ? enabledSz.map(k => ({ size: k, priceMultiplier: stdSizes[k].multiplier, stock: stdSizes[k].stock, customPrice: stdSizes[k].customPrice, useCustomPrice: stdSizes[k].useCustomPrice }))
        : inchSizes.map(s => ({ size: s.size, priceMultiplier: s.multiplier, stock: s.stock, customPrice: s.customPrice, useCustomPrice: s.useCustomPrice }));

    /* ── Submit ── */
    const onSubmit = async (e) => {
        e?.preventDefault();
        if (sku.trim() === "")
            return toast.error("SKU is required");
        if (!name.trim()) return toast.error("Product name required");
        if (!description.trim()) return toast.error("Product description required");
        if (!hasSizes) return toast.error("Select at least one size");
        if (colors.length === 0) return toast.error("Add at least one color");
        if (!price || isNaN(+price) || +price <= 0) return toast.error("Valid base price required");
        if (totalImages === 0) return toast.error("At least one image required");
        if (!subCategory || !subCategory.trim()) return toast.error("Sub category is required");

        setSaving(true);
        try {
            const fd = new FormData();
            fd.append('sku', sku.trim());
            fd.append("productId", id);
            fd.append("name", name.trim());
            fd.append("description", description.trim());
            fd.append("detailedDescription", detDesc);
            fd.append("itemDetails", JSON.stringify(itemDetails));
            fd.append("price", price);
            fd.append("discountPrice", discPrice || "");
            fd.append("category", category);
            fd.append("subCategory", subCategory);
            fd.append("bestseller", bestseller);
            fd.append("sizes", JSON.stringify(fmtSizes()));
            fd.append("color", JSON.stringify(colors));

            const existingImageUrls = slots
                .filter(s => s.existing && !s.newFile)
                .map(s => s.existing);
            fd.append("existingImages", JSON.stringify(existingImageUrls));

            slots.forEach((s) => { if (s.newFile) fd.append("images", s.newFile); });

            // const res = await axios.post(backendUrl + "/api/product/update", fd, { headers: { token } });
            // if (res.data.success) { toast.success("✅ Product updated!"); navigate(-1); }
            // else toast.error(res.data.message);

            const res = await axios.post(backendUrl + '/api/product/update', fd, { headers: { token } });
            if (res.data.success) {
                toast.success('✅ Product updated!');
                const slugifyPart = (str = '') =>
                    String(str).toLowerCase().trim()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/[\s_]+/g, '-')
                        .replace(/^-+|-+$/g, '');

                const newSlugUrl = `/product/${slugifyPart(category)}/${slugifyPart(subCategory)}/${slugifyPart(name)}/${sku.trim().toUpperCase().toLowerCase()}`;

                console.log('New product URL:', newSlugUrl); // ← test ke liye
                navigate(-1);
            } else {
                toast.error(res.data.message);
            }


        } catch { toast.error("Update failed!"); }
        finally { setSaving(false); }
    };

    if (loading) return <Skeleton />;

    /* ════════════════════════ RENDER ════════════════════════ */
    return (
        <div className="min-h-screen bg-[#f7f7f5]">
            <style>{`
                @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
                .ql-container { font-size:14px; border-radius:0 0 12px 12px !important; border-color:#e5e7eb !important; }
                .ql-toolbar  { border-radius:12px 12px 0 0 !important; border-color:#e5e7eb !important; background:#f9fafb; }
                .ql-editor   { min-height:160px; font-family:inherit; }
            `}</style>

            {/* ── TOP BAR ── */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-6 h-16 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all">
                        <TbArrowLeft size={18} />
                    </button>
                    <div className="w-px h-5 bg-gray-200" />
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                        <TbEdit size={17} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-[17px] font-extrabold text-gray-900 leading-none tracking-tight">Edit Product</h1>
                        <p className="text-[11px] text-gray-400 mt-0.5">{progress}% complete · ID: {id?.slice(-6).toUpperCase()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="button" onClick={onSubmit} disabled={saving}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold transition-colors shadow-sm disabled:opacity-60">
                        {saving ? <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</> : <><TbDeviceFloppy size={15} /> Save Changes</>}
                    </button>
                </div>
            </div>

            {/* ── PROGRESS ── */}
            <div className="h-1 bg-gray-100">
                <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 p-6 max-w-[1400px] items-start">
                    <div>

                        {/* ── BASIC INFO ── */}
                        <Card icon={<TbPackage size={18} />} title="Basic Information" subtitle="Name, description & categorisation">

                            <Field label="Product Name" required>
                                <div className="relative">
                                    <input className={inputCls + (name.length > 300 ? " border-red-400 bg-red-50" : "")} type="text" maxLength={300} placeholder="e.g. Classic Oxford Shirt" value={name} onChange={e => setName(e.target.value)} required />
                                    <span className={`absolute right-3 bottom-3 text-[10.5px] pointer-events-none ${name.length > 270 ? "text-amber-500" : "text-gray-400"}`}>{name.length}/300</span>
                                </div>
                            </Field>

                            <Field label="Short Description" required>
                                <div className="relative">
                                    <textarea className={inputCls + " resize-y min-h-[90px] " + (description.length > 480 ? "border-red-400 bg-red-50" : "")} maxLength={500} rows={3} placeholder="Brief description for listings…" value={description} onChange={e => setDesc(e.target.value)} required />
                                    <span className={`absolute right-3 bottom-3 text-[10.5px] pointer-events-none ${description.length > 480 ? "text-amber-500" : "text-gray-400"}`}>{description.length}/500</span>
                                </div>
                            </Field>

                            {/* ✅ FIX 6 — Category dropdown with all 7 categories (same as Add.jsx) */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* <Field label="Category">
                                    <select className={selectCls} value={category} onChange={e => handleCategoryChange(e.target.value)}>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Others">Others</option>
                                        <option value="Leather Pillow Cover">Leather Pillow Cover</option>
                                        <option value="Sofa Headrest">Sofa Headrest</option>
                                        <option value="Leather Desk Pad">Leather Desk Pad</option>
                                        <option value="Men Leather Apron">Men Leather Apron</option>
                                    </select>
                                </Field> */}
                                <Field label="Category">
                                    <select className={selectCls} value={category}
                                        // onChange={e => { setCat(e.target.value); setSubCat(CAT_DEFAULT[e.target.value] || SUB_CATEGORIES[e.target.value]?.[0] || ''); }}
                                        // onChange={e => {
                                        //     const selected = categories.find(
                                        //         c => c.categoryName === e.target.value
                                        //     );

                                        //     setCat(e.target.value);

                                        //     setSubCat(
                                        //         selected?.subCategories?.[0] || ''
                                        //     );
                                        // }}
                                        onChange={(e) => {
                                            const newCategory = e.target.value;

                                            setCategory(newCategory);

                                            const selected = categories.find(
                                                c => c.categoryName === newCategory
                                            );

                                            setSubCat(selected?.subCategories?.[0] || "");
                                        }}>
                                        {/* onFocus={focG} onBlur={blrB()} */}
                                        {categories.map(cat => (
                                            <option
                                                key={cat._id}
                                                value={cat.categoryName}
                                            >
                                                {cat.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                {/* ✅ FIX 7 — SubCategory renders dynamically from SUB_CATEGORIES map */}
                                {/* <Field label="Sub Category">
                                    <select className={selectCls} value={subCategory} onChange={e => setSubCat(e.target.value)}>
                                        {(SUB_CATEGORIES[category] || []).map(sub => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </Field> */}
                                <Field label="Sub Category">
                                    <select className={selectCls} value={subCategory} onChange={e => setSubCat(e.target.value)}>
                                        {/* {(SUB_CATEGORIES[category] || []).map(s => <option key={s} value={s}>{s}</option>)} */}
                                        {categories
                                            .find(c => c.categoryName === category)
                                            ?.subCategories?.map(sub => (
                                                <option key={sub} value={sub}>
                                                    {sub}
                                                </option>
                                            ))}
                                    </select>
                                </Field>

                                <Field label="SKU / Code" hint="Auto-generated if blank">
                                    <input onChange={(e) => setSku(e.target.value)} value={sku} className={inputCls} type="text" placeholder="Auto-generated" />
                                </Field>
                            </div>

                            <div className="border-t border-gray-100 pt-5 mt-1">
                                <Field label="Detailed Description" hint="Shown on product detail page — add specs, care instructions, materials">
                                    <ReactQuill theme="snow" value={detDesc} onChange={setDetDesc} />
                                </Field>
                            </div>
                        </Card>

                        <Card
                            icon={<TbInfoCircle size={18} />}
                            title="Item Details"
                            subtitle="Specifications shown on the product page"
                        >
                            <div className="space-y-4">

                                {itemDetails.map((item, index) => (

                                    <div
                                        key={index}
                                        className="grid grid-cols-[1fr_2fr_auto] gap-3 items-start"
                                    >

                                        <input
                                            type="text"
                                            placeholder="Title (Material)"
                                            className={inputCls}
                                            maxLength={100}
                                            value={item.title}
                                            onChange={(e) =>
                                                updateItemDetail(index, "title", e.target.value)
                                            }
                                        />

                                        <textarea
                                            placeholder="Value (100% Genuine Leather)"
                                            className={inputCls}
                                            rows={1}
                                            maxLength={500}
                                            value={item.value}
                                            onChange={(e) =>
                                                updateItemDetail(index, "value", e.target.value)
                                            }
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeItemDetail(index)}
                                            className="mt-1 w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 border border-red-100 text-red-500 hover:bg-red-100"
                                        >
                                            <TbTrash size={16} />
                                        </button>

                                    </div>

                                ))}

                                <button
                                    type="button"
                                    onClick={addItemDetail}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    <TbPlus size={16} />
                                    Add Item Detail
                                </button>

                            </div>
                        </Card>

                        {/* ── IMAGES ── */}
                        <Card
                            icon={<TbPhoto size={18} />}
                            title="Product Images"
                            subtitle={`${totalImages}/10 images · ${existingCount} existing · ${newFilesCount} new`}
                            action={allSlotImgs.length > 0 && (
                                <button type="button" onClick={() => setLightbox({ imgs: allSlotImgs, start: 0 })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                                    <TbEye size={13} /> View All
                                </button>
                            )}
                        >
                            <div ref={dzRef}
                                className={`relative rounded-2xl border-2 border-dashed text-center p-7 mb-5 transition-all duration-200 cursor-pointer ${dragging ? "border-indigo-500 bg-indigo-50 scale-[1.01]" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                                onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                            >
                                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${dragging ? "bg-indigo-100" : "bg-gray-100"}`}>
                                    <TbCloudUpload size={24} className={dragging ? "text-indigo-500" : "text-gray-400"} />
                                </div>
                                <p className="text-[14px] font-semibold text-gray-700 mb-1">{dragging ? "Drop images here!" : "Drag & drop to add images"}</p>
                                <p className="text-[12px] text-gray-400">or click individual slots below · PNG, JPG, WEBP · 800×800px recommended</p>
                                {!dragging && (
                                    <input type="file" accept="image/*" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-[0]"
                                        onChange={e => { addFilesToSlots(Array.from(e.target.files)); e.target.value = ""; }} />
                                )}
                            </div>

                            <div className="grid grid-cols-5 gap-2.5">
                                {slots.map((slot, i) => {
                                    const displayUrl = slot.newFile ? URL.createObjectURL(slot.newFile) : slot.existing;
                                    const hasImg = !!displayUrl;
                                    const isNew = !!slot.newFile;
                                    const isExisting = !!slot.existing && !slot.newFile;
                                    return (
                                        <div key={i} className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group
                                            ${hasImg ? (i === 0 ? "border-indigo-400 ring-2 ring-indigo-100" : isNew ? "border-emerald-400" : "border-transparent") : "border-dashed border-gray-200 bg-gray-50 hover:border-gray-300 cursor-pointer"}`}>
                                            {hasImg ? (
                                                <>
                                                    <img src={displayUrl} alt="" className="w-full h-full object-cover" />
                                                    {i === 0 && <span className="absolute top-1.5 left-1.5 bg-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md z-10">MAIN</span>}
                                                    {isNew && <span className="absolute bottom-1.5 left-1.5 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md z-10">NEW</span>}
                                                    {isExisting && <span className="absolute bottom-1.5 left-1.5 bg-gray-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md z-10">SAVED</span>}
                                                    <span className="absolute top-1.5 right-1.5 bg-black/50 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md z-10">{i + 1}</span>
                                                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 z-20">
                                                        <button type="button" className="bg-white text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-gray-100"
                                                            onMouseDown={e => { e.preventDefault(); e.stopPropagation(); setLightbox({ imgs: allSlotImgs, start: Math.max(0, allSlotImgs.indexOf(displayUrl)) }); }}>🔍 View</button>
                                                        {isNew && <button type="button" className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-amber-600"
                                                            onMouseDown={e => { e.preventDefault(); e.stopPropagation(); clearSlotNew(i); }}>↩ Revert</button>}
                                                        <button type="button" className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-red-600"
                                                            onMouseDown={e => { e.preventDefault(); e.stopPropagation(); clearSlotAll(i); }}>✕ Remove</button>
                                                    </div>
                                                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer text-[0] z-30 group-hover:z-0"
                                                        onChange={e => { if (e.target.files[0]) setSlotFile(i, e.target.files[0]); e.target.value = ""; }} />
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex flex-col items-center justify-center h-full">
                                                        <TbPlus size={16} className="text-gray-300 mb-0.5" />
                                                        <span className="text-[9px] text-gray-300 font-medium">{i + 1}</span>
                                                    </div>
                                                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer text-[0]"
                                                        onChange={e => { if (e.target.files[0]) setSlotFile(i, e.target.files[0]); e.target.value = ""; }} />
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-400"><div className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /> Main photo</div>
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-400"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> New (unsaved)</div>
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-400"><div className="w-2.5 h-2.5 rounded-sm bg-gray-500" /> Saved</div>
                            </div>
                            <p className="text-[11.5px] text-gray-400 mt-1.5">Hover any slot to view, replace or remove.</p>
                        </Card>

                        {/* ── COLORS ── */}
                        <Card icon={<TbPalette size={18} />} title="Color Variants" subtitle={`${colors.length} color${colors.length !== 1 ? "s" : ""} added`}
                            badge={colors.length > 0 && <span className="px-2 py-0.5 rounded-full bg-gray-900 text-white text-[10px] font-bold">{colors.length}</span>}>
                            <Field label="Input Mode">
                                <div className="flex gap-2 flex-wrap">
                                    {[["both", "Name + Color"], ["nameOnly", "Name Only"], ["hexOnly", "Color Only"]].map(([v, l]) => (
                                        <button key={v} type="button" onClick={() => setColorMode(v)}
                                            className={`px-3.5 py-2 rounded-xl text-[12.5px] font-semibold border transition-all ${colorMode === v ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>{l}</button>
                                    ))}
                                </div>
                            </Field>
                            <div className="flex flex-wrap items-end gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                                {(colorMode === "both" || colorMode === "nameOnly") && (
                                    <Field label="Name"><input className={inputCls} style={{ width: 160 }} type="text" placeholder="e.g. Navy Blue" value={newCName} onChange={e => setNewCName(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addColor())} /></Field>
                                )}
                                {(colorMode === "both" || colorMode === "hexOnly") && (
                                    <Field label="Color">
                                        <div className="flex gap-2 items-center">
                                            <input type="color" value={newCHex} onChange={e => setNewCHex(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                                            <input className={inputCls} style={{ width: 100 }} type="text" value={newCHex} onChange={e => setNewCHex(e.target.value)} />
                                        </div>
                                    </Field>
                                )}
                                <button type="button" onClick={addColor} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-[13px] font-semibold hover:bg-gray-800 transition-colors"><TbPlus size={14} /> Add</button>
                            </div>
                            {colors.length === 0 ? (
                                <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-xl mb-4">
                                    <TbPalette size={28} className="text-gray-200 mx-auto mb-2" />
                                    <p className="text-[13px] text-gray-400 font-medium">No colors yet</p>
                                    <p className="text-[12px] text-gray-300">Add above or pick from presets</p>
                                </div>
                            ) : (
                                <div className="space-y-2 mb-4">
                                    {colors.map((c, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors group">
                                            <input type="color" value={c.hex} onChange={e => edColor(i, "hex", e.target.value)} className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer p-1 flex-shrink-0" />
                                            <div className="flex-1 grid grid-cols-2 gap-2">
                                                <input type="text" value={c.name} onChange={e => edColor(i, "name", e.target.value)} placeholder="Color name" className="text-[13px] font-medium text-gray-800 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-gray-400 outline-none py-0.5 transition-colors" />
                                                <input type="text" value={c.hex} onChange={e => edColor(i, "hex", e.target.value)} placeholder="#000000" className="text-[12px] text-gray-400 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-gray-400 outline-none py-0.5 font-mono transition-colors" />
                                            </div>
                                            <div className="w-6 h-6 rounded-full border border-black/10 flex-shrink-0" style={{ background: c.hex }} />
                                            <button type="button" onClick={() => rmColor(c.name)} className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"><TbX size={13} /></button>
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
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${added ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"}`}>
                                                <div className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0" style={{ background: p.hex }} />
                                                {p.name}{added ? " ✓" : ""}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </Card>

                        {/* ── SIZES ── */}
                        <Card icon={<TbRuler size={18} />} title="Sizes & Inventory" subtitle="Manage sizes, stock & pricing per size"
                            badge={<span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold uppercase tracking-wide">Required</span>}>
                            <Field label="Base Price ($)" required>
                                <input className={inputCls + (price && (isNaN(+price) || +price <= 0) ? " border-red-400 bg-red-50" : "")}
                                    type="number" placeholder="e.g. 499" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
                                <div className="flex items-start gap-2 mt-2 p-3 bg-blue-50 border border-blue-100 rounded-xl text-[12px] text-blue-700">
                                    <TbInfoCircle size={14} className="flex-shrink-0 mt-0.5" />
                                    <span>Base price × multiplier = size's selling price. Example: XL at 1.2× = ${price ? (parseFloat(price) * 1.2).toFixed(2) : "—"}.</span>
                                </div>
                            </Field>
                            <Field label="Size System">
                                <div className="flex gap-2">
                                    {[["standard", "👕 Standard (XS–3XL)"], ["inch", "📏 Inch-Based"]].map(([v, l]) => (
                                        <button key={v} type="button" onClick={() => setSizeType(v)}
                                            className={`px-4 py-2 rounded-xl text-[13px] font-semibold border transition-all ${sizeType === v ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>{l}</button>
                                    ))}
                                </div>
                            </Field>
                            {sizeType === "standard" && (
                                <>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                                        {Object.keys(stdSizes).map(k => {
                                            const on = enabledSz.includes(k); const d = stdSizes[k];
                                            return (
                                                <div key={k} className={`rounded-xl border-2 p-3.5 transition-all cursor-pointer ${on ? "border-indigo-400 bg-indigo-50/30 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200"}`} onClick={() => !on && toggleSz(k)}>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <input type="checkbox" checked={on} onChange={() => toggleSz(k)} onClick={e => e.stopPropagation()} className="w-4 h-4 rounded accent-indigo-600 cursor-pointer" />
                                                        <span className={`text-[13px] font-extrabold px-2 py-0.5 rounded-md ${on ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}>{k}</span>
                                                        {on && d.stock > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full">{d.stock}×</span>}
                                                    </div>
                                                    {on && (
                                                        <div onClick={e => e.stopPropagation()} className="space-y-2 mt-2">
                                                            <label className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-600 cursor-pointer">
                                                                <input type="checkbox" checked={d.useCustomPrice} onChange={() => toggleCP(k)} className="w-3.5 h-3.5 rounded accent-indigo-600 cursor-pointer" /> Custom Price
                                                            </label>
                                                            {d.useCustomPrice ? (
                                                                <div>
                                                                    <label className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">Price ($)</label>
                                                                    <input type="number" step="0.01" min="0" value={d.customPrice} onChange={e => setSzF(k, "customPrice", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400 transition-colors" />
                                                                    <span className="text-[10.5px] text-indigo-600 font-bold mt-1 block">$ {d.customPrice || "—"}</span>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <label className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">Multiplier ×{d.multiplier}</label>
                                                                    <input type="number" step="0.05" min="0.5" max="3" value={d.multiplier} onChange={e => setSzF(k, "multiplier", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400 transition-colors" />
                                                                    <span className="text-[10.5px] text-emerald-600 font-bold mt-1 block">$ {price ? calcPrice(d).toFixed(2) : "—"}</span>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <label className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">Stock</label>
                                                                <input type="number" min="0" value={d.stock} onChange={e => setSzF(k, "stock", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400 transition-colors" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {enabledSz.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                            {enabledSz.map(k => (<span key={k} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-full text-[11.5px] font-semibold">{k} · ${price ? calcPrice(stdSizes[k]).toFixed(0) : "—"} · {stdSizes[k].stock}pcs</span>))}
                                        </div>
                                    )}
                                    <div className="flex gap-2 flex-wrap">
                                        {[["S/M/L/XL", ["S", "M", "L", "XL"]], ["All Sizes", Object.keys(stdSizes)]].map(([l, sz]) => (
                                            <button key={l} type="button" onClick={() => setEnabledSz(sz)} className="px-3 py-1.5 rounded-lg border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Select {l}</button>
                                        ))}
                                        <button type="button" onClick={() => setEnabledSz([])} className="px-3 py-1.5 rounded-lg border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-red-500 transition-colors">Clear All</button>
                                    </div>
                                </>
                            )}
                            {sizeType === "inch" && (
                                <>
                                    <div className="flex flex-wrap items-end gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                                        <Field label="Size Label"><input className={inputCls} style={{ width: 100 }} type="text" placeholder="14x14" value={niSize} onChange={e => setNiSize(e.target.value)} /></Field>
                                        <Field label="Stock"><input className={inputCls} style={{ width: 75 }} type="number" min="0" value={niStock} onChange={e => setNiStock(parseInt(e.target.value) || 0)} /></Field>
                                        <label className="flex items-center gap-1.5 text-[12px] font-medium text-gray-600 cursor-pointer pb-2.5">
                                            <input type="checkbox" checked={niCustom} onChange={e => setNiCustom(e.target.checked)} className="w-4 h-4 rounded accent-indigo-600" /> Custom Price
                                        </label>
                                        {niCustom ? <Field label="Price ($)"><input className={inputCls} style={{ width: 90 }} type="number" step="0.01" min="0" value={niPrice} onChange={e => setNiPrice(e.target.value)} /></Field>
                                            : <Field label="Multiplier"><input className={inputCls} style={{ width: 80 }} type="number" step="0.1" min="0.5" max="2" value={niMult} onChange={e => setNiMult(parseFloat(e.target.value) || 1)} /></Field>}
                                        <button type="button" onClick={addInch} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-[13px] font-semibold hover:bg-gray-800 transition-colors"><TbPlus size={14} /> Add</button>
                                    </div>
                                    {inchSizes.length === 0 ? (
                                        <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-xl"><TbRuler size={28} className="text-gray-200 mx-auto mb-2" /><p className="text-[13px] text-gray-400">No inch sizes yet</p></div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {inchSizes.map((s, i) => (
                                                <div key={i} className="bg-white border border-gray-100 rounded-xl p-3.5">
                                                    <div className="flex items-center justify-between mb-3"><span className="text-[14px] font-extrabold text-gray-900">{s.size}"</span><button type="button" onClick={() => rmInch(s.size)} className="w-6 h-6 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-100"><TbX size={11} /></button></div>
                                                    <label className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-600 mb-2 cursor-pointer"><input type="checkbox" checked={s.useCustomPrice} onChange={() => edInch(i, "useCustomPrice")} className="w-3.5 h-3.5 rounded accent-indigo-600" /> Custom Price</label>
                                                    {s.useCustomPrice ? <div className="mb-2"><label className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">Price ($)</label><input type="number" step="0.01" min="0" value={s.customPrice} onChange={e => edInch(i, "customPrice", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400" /></div>
                                                        : <div className="mb-2"><label className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">Multiplier</label><input type="number" step="0.1" min="0.5" max="2" value={s.multiplier} onChange={e => edInch(i, "multiplier", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400" /></div>}
                                                    <div><label className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">Stock</label><input type="number" min="0" value={s.stock} onChange={e => edInch(i, "stock", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] outline-none focus:border-indigo-400" /></div>
                                                    <span className="text-[10.5px] text-emerald-600 font-bold mt-1.5 block">$ {price && +price > 0 ? ((+price) * s.multiplier).toFixed(2) : "—"}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </Card>
                    </div>

                    {/* ══════════ SIDEBAR ══════════ */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center"><TbDeviceFloppy size={18} className="text-indigo-600" /></div>
                                <div><p className="text-[13.5px] font-bold text-gray-900">Save Changes</p><p className="text-[11px] text-gray-400">Update product on store</p></div>
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between text-[11.5px] font-semibold text-gray-500 mb-1.5"><span>Completion</span><span className="text-gray-900">{progress}%</span></div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} /></div>
                            </div>
                            <button type="button" onClick={() => setBest(p => !p)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border mb-4 transition-all ${bestseller ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-100 hover:border-gray-200"}`}>
                                <div className="flex items-center gap-2">
                                    <TbStar size={15} className={bestseller ? "text-amber-500" : "text-gray-400"} />
                                    <span className="text-[13px] font-semibold text-gray-700">Mark as Bestseller</span>
                                </div>
                                <div className="w-10 rounded-full relative transition-colors flex-shrink-0" style={{ height: 22, background: bestseller ? "#f59e0b" : "#e5e7eb" }}>
                                    <div className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${bestseller ? "translate-x-[22px]" : "translate-x-[3px]"}`} />
                                </div>
                            </button>
                            <button type="button" onClick={onSubmit} disabled={saving}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-bold transition-colors shadow-sm disabled:opacity-60 mb-2">
                                {saving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</> : <><TbDeviceFloppy size={15} /> Save Changes</>}
                            </button>
                            <button type="button" onClick={() => navigate(-1)} className="w-full py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center"><TbTag size={16} className="text-emerald-600" /></div>
                                <p className="text-[13.5px] font-bold text-gray-900">Discount Pricing</p>
                            </div>
                            {/* <Field label="Sale / Discount Price ($)" hint="Optional — shown as sale price to customers">
                                <input className={inputCls} type="number" placeholder="0.00" value={discPrice} onChange={e => setDiscPrice(e.target.value)} />
                            </Field> */}
                            <Field label="Discount (%)" hint="Optional — percentage off, e.g. 10 = 10% off">
                                <input className={inputCls} type="number" placeholder="e.g. 10" min="0" max="99" value={discPrice} onChange={e => setDiscPrice(e.target.value)} />
                            </Field>
                            {discount && (
                                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-100 rounded-xl mt-1">
                                    <span className="text-[12.5px] font-semibold text-emerald-700">💸 Discount active</span>
                                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{discount}% off</span>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center"><TbChartBar size={16} className="text-indigo-600" /></div>
                                <div><p className="text-[13.5px] font-bold text-gray-900">Summary</p><p className="text-[11px] text-gray-400">Live overview</p></div>
                            </div>
                            <div className="space-y-0">
                                {[
                                    ["Sku", sku || <span className="text-gray-300 italic text-[12px]">Not set</span>],
                                    ["Name", name || <span className="text-gray-300 italic text-[12px]">Not set</span>],
                                    ["Category", `${category} › ${subCategory || "—"}`],
                                    ["Base Price", price ? <span className="font-bold">${price}</span> : <span className="text-gray-300">—</span>],
                                    // ["Sale Price", discPrice ? <span className="text-emerald-600 font-bold">${discPrice}</span> : <span className="text-gray-300">—</span>],
                                    ["Discount", discount ? <span className="text-emerald-600 font-bold">{discount}% off</span> : <span className="text-gray-300">—</span>],
                                    ["Final Price", (price && discount) ? <span className="text-emerald-600 font-bold">${(+price - (+price * discount) / 100).toFixed(2)}</span> : <span className="text-gray-300">—</span>],
                                    ["Colors", colors.length > 0 ? <div className="flex gap-1 flex-wrap justify-end">{colors.map((c, i) => <div key={i} title={c.name} className="w-4 h-4 rounded-full border border-black/10" style={{ background: c.hex }} />)}</div> : <span className="text-gray-300">—</span>],
                                    ["Sizes", sizeType === "standard" ? (enabledSz.length ? <span className="font-semibold">{enabledSz.join(", ")}</span> : <span className="text-red-500 font-bold text-[11px]">⚠ Required</span>) : (inchSizes.length ? <span className="font-semibold">{inchSizes.map(s => s.size).join(", ")}</span> : <span className="text-red-500 font-bold text-[11px]">⚠ Required</span>)],
                                    ["Images", <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${totalImages > 0 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{totalImages}/10 · {newFilesCount} new</span>],
                                    ["Bestseller", bestseller ? <span className="bg-amber-100 text-amber-700 text-[10.5px] font-bold px-2 py-0.5 rounded-full">⭐ Yes</span> : <span className="text-gray-400 text-[12px]">No</span>],
                                ].map(([k, v], i) => (
                                    <div key={i} className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0 gap-3">
                                        <span className="text-[12px] text-gray-400 font-medium flex-shrink-0">{k}</span>
                                        <span className="text-[12.5px] text-gray-800 font-medium text-right max-w-[150px] truncate">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center"><TbBolt size={16} className="text-violet-600" /></div>
                                <p className="text-[13.5px] font-bold text-gray-900">Quick Actions</p>
                            </div>
                            <div className="space-y-2">
                                {[
                                    ["🎨 Add basic colors", () => { const toAdd = PRESETS.filter(p => !colors.some(c => c.name === p.name)).slice(0, 4); setColors([...colors, ...toAdd]); toast.success(`${toAdd.length} colors added`); }],
                                    ["👕 Select S/M/L/XL", () => { setEnabledSz(["S", "M", "L", "XL"]); setSizeType("standard"); toast.success("S/M/L/XL selected"); }],
                                    ["✅ Select all sizes", () => { setEnabledSz(Object.keys(stdSizes)); setSizeType("standard"); toast.success("All sizes selected"); }],
                                    ["🗑 Clear all colors", () => { setColors([]); toast.info("Colors cleared"); }],
                                    ["🗑 Clear all sizes", () => { setEnabledSz([]); toast.info("Sizes cleared"); }],
                                ].map(([l, fn], i) => (
                                    <button key={i} type="button" onClick={fn} className="w-full text-left px-3.5 py-2.5 rounded-xl border border-gray-100 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all">{l}</button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                            <div className="flex items-center gap-2.5 mb-3">
                                <HiOutlineLightBulb size={18} className="text-indigo-500 flex-shrink-0" />
                                <p className="text-[13px] font-bold text-indigo-800">Tips</p>
                            </div>
                            <ul className="space-y-1.5">
                                {["Drag & drop multiple images onto the drop zone", "Hover any image slot to view, replace or remove", "Green badge = new (unsaved), Gray = saved on server", "First slot is always the main product thumbnail", "Changes only save when you click 'Save Changes'", "Base price is used for multiplier calculations"].map((tip, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[12px] text-indigo-700">
                                        <span className="text-indigo-400 mt-0.5 flex-shrink-0">·</span> {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </form>

            {lightbox && <Lightbox imgs={lightbox.imgs} start={lightbox.start} onClose={() => setLightbox(null)} />}
        </div>
    );
};

export default UpdateProduct;