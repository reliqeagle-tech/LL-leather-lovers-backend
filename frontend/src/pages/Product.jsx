import { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { FaInfoCircle } from 'react-icons/fa';
import RelatedProducts from '../components/RelatedProducts';
import Modal from '../components/Modal';
import JacketLiningSelector from '../components/JacketLiningSelector';
import { toast } from 'react-toastify';
import CartDrawer from '../components/CartDrawer';
import axios from 'axios';

const colorMap = {
  wine: '#722F37', red: '#FF0000', black: '#000000', olive: '#808000', green: '#008000',
  cognac: '#D2691E', white: '#FFFFFF', yellow: '#FFFF00', gray: '#808080', rose: '#FF007F',
  tobacco: '#A0522D', navy: '#000080', beige: '#F5F5DC', blue: '#0000FF', brown: '#8B4513',
  'dark-wine': '#453333', 'tobacco-dark': '#6e351a',
  'royal blue': '#4169e1', 'royal-blue': '#4169e1',
};

/* ══════════════════════════════════════════════════════════════════
   STYLES — original indigo/black colors, layout fixes only
══════════════════════════════════════════════════════════════════ */
const ProductPageStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    .thumb-inner-v {
      overflow-y: auto; overflow-x: hidden;
      scrollbar-width: none; -ms-overflow-style: none;
    }
    .thumb-inner-v::-webkit-scrollbar { display: none; }

    .thumb-inner-h {
      overflow-x: auto; overflow-y: hidden;
      scrollbar-width: none; -ms-overflow-style: none;
    }
    .thumb-inner-h::-webkit-scrollbar { display: none; }

    .thumb-arrow {
      width: 72px; height: 24px;
      display: flex; align-items: center; justify-content: center;
      background: transparent;
      border: 1px solid rgba(99,102,241,0.35);
      border-radius: 6px; cursor: pointer;
      transition: background .12s, border-color .12s;
      flex-shrink: 0; outline: none;
    }
    .thumb-arrow:hover:not(:disabled) {
      background: rgba(99,102,241,0.1);
      border-color: rgba(99,102,241,0.6);
    }
    .thumb-arrow:disabled { opacity: 0.28; cursor: default; pointer-events: none; }

    .ptab-btn { position: relative; overflow: hidden; }
    .ptab-btn::after {
      content: ''; position: absolute; bottom: 0; left: 50%; right: 50%;
      height: 2px; background: linear-gradient(90deg,#6366f1,#818cf8);
      transition: left .35s ease, right .35s ease; border-radius: 99px;
    }
    .ptab-btn.ptab-active::after { left: 0; right: 0; }

    .star-pick { transition: transform .15s, filter .15s; }
    .star-pick:hover { transform: scale(1.05); filter: drop-shadow(0 0 6px #f59e0b88); }

    .rev-card { transition: border-color .2s, box-shadow .2s, transform .2s; }
    .rev-card:hover {
      border-color: rgba(99,102,241,.25) !important;
      box-shadow: 0 8px 32px rgba(0,0,0,.4), inset 0 0 0 1px rgba(99,102,241,.08);
      transform: translateY(-1px);
    }
    .rev-textarea:focus {
      outline: none; border-color: rgba(99,102,241,.55) !important;
      box-shadow: 0 0 0 3px rgba(99,102,241,.12), 0 0 24px rgba(99,102,241,.08);
    }
    .submit-btn {
      background: linear-gradient(135deg,#6366f1 0%,#4f46e5 100%);
      transition: transform .2s, box-shadow .2s, filter .2s;
    }
    .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(99,102,241,.45); filter: brightness(1.1); }
    .submit-btn:active { transform: translateY(0); }

    .desc-prose p { margin-bottom: 1.2em; }
    .desc-prose h2,.desc-prose h3 { color: #c7c9ff; font-family: 'Cormorant Garamond',serif; font-weight: 400; margin: 1.6em 0 .6em; }
    .desc-prose ul { list-style: none; padding: 0; }
    .desc-prose ul li { padding-left: 1.4em; position: relative; margin-bottom: .55em; color: rgba(255,255,255,.70); }
    .desc-prose ul li::before { content: ''; position: absolute; left: 0; top: .55em; width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#818cf8); }

    @keyframes ringIn { from{stroke-dashoffset:220} to{stroke-dashoffset:var(--offset)} }
    .ring-arc { animation: ringIn 1.1s cubic-bezier(.22,1,.36,1) forwards; }
    @keyframes barFill { from{width:0} to{width:var(--w)} }
    .bar-fill { animation: barFill .9s cubic-bezier(.22,1,.36,1) forwards; }
    @keyframes bPulse { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5)} 50%{box-shadow:0 0 0 8px rgba(99,102,241,0)} }
    .verified-badge { animation: bPulse 2.5s infinite; }

    .main-img { transition: transform .5s cubic-bezier(.22,1,.36,1); }
    .main-img-wrap:hover .main-img { transform: scale(1.04); }
    .size-btn:hover:not([disabled]) { border-color: rgba(99,102,241,.55) !important; background: rgba(99,102,241,.08) !important; }

    /* color swatch hover */
    .color-swatch { transition: transform .15s, box-shadow .15s; }
    .color-swatch:hover { transform: scale(1.12); }

    /* mobile overflow guard */
    @media (max-width: 640px) {
      .product-gallery-wrap { overflow: hidden; width: 100%; max-width: 100%; }
    }
  `}</style>
);

/* ══════════════════════════════════════════════════════════════════
   VERTICAL THUMBNAIL RAIL (desktop)
══════════════════════════════════════════════════════════════════ */
const ThumbRail = ({ images, selectedIndex, onSelect }) => {
  const scrollRef = useRef(null);
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);

  const THUMB_H = 60;
  const THUMB_GAP = 6;
  const STEP = (THUMB_H + THUMB_GAP) * 2;

  const sync = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanUp(el.scrollTop > 1);
    setCanDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  };

  useEffect(() => {
    sync();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    return () => el.removeEventListener('scroll', sync);
  }, [images]);

  return (
    <div className="flex flex-col items-center gap-1.5" style={{ width: 60, flexShrink: 0 }}>
      <button className="thumb-arrow" disabled={!canUp}
        onClick={() => scrollRef.current?.scrollBy({ top: -STEP, behavior: 'smooth' })}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      <div ref={scrollRef} className="thumb-inner-v" style={{ width: '100%', maxHeight: 420 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: THUMB_GAP, padding: '2px 0' }}>
          {images.map((img, i) => (
            <button key={i} onClick={() => onSelect(img, i)}
              style={{
                width: '100%', height: THUMB_H, flexShrink: 0,
                borderRadius: 8, overflow: 'hidden', background: '#ffffff',
                border: i === selectedIndex ? '2px solid #6366f1' : '1px solid rgba(99,102,241,0.25)',
                outline: 'none', cursor: 'pointer',
                transition: 'border-color .15s, opacity .15s',
                opacity: i === selectedIndex ? 1 : 0.6,
              }}>
              <img src={img} alt={`view-${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 5, display: 'block' }} />
            </button>
          ))}
        </div>
      </div>

      <button className="thumb-arrow" disabled={!canDown}
        onClick={() => scrollRef.current?.scrollBy({ top: STEP, behavior: 'smooth' })}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   MOBILE HORIZONTAL THUMBNAIL RAIL
══════════════════════════════════════════════════════════════════ */
const MobileThumbRail = ({ images, selectedIndex, onSelect }) => {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const THUMB_W = 60;
  const THUMB_GAP = 8;
  const STEP = (THUMB_W + THUMB_GAP) * 2;

  const sync = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    sync();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    return () => el.removeEventListener('scroll', sync);
  }, [images]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%', minWidth: 0 }}>
      <button className="thumb-arrow" disabled={!canLeft}
        onClick={() => scrollRef.current?.scrollBy({ left: -STEP, behavior: 'smooth' })}
        style={{ width: 24, height: 60, flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div ref={scrollRef} className="thumb-inner-h" style={{ flex: 1, minWidth: 0 }} onScroll={sync}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: THUMB_GAP, padding: '2px 0' }}>
          {images.map((img, i) => (
            <button key={i} onClick={() => onSelect(img, i)}
              style={{
                flexShrink: 0, width: THUMB_W, height: THUMB_W,
                borderRadius: 8, overflow: 'hidden', background: '#ffffff',
                border: i === selectedIndex ? '2px solid #6366f1' : '1px solid rgba(99,102,241,0.25)',
                outline: 'none', cursor: 'pointer',
                transition: 'border-color .15s, opacity .15s',
                opacity: i === selectedIndex ? 1 : 0.6,
              }}>
              <img src={img} alt={`m-${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4, display: 'block' }} />
            </button>
          ))}
        </div>
      </div>

      <button className="thumb-arrow" disabled={!canRight}
        onClick={() => scrollRef.current?.scrollBy({ left: STEP, behavior: 'smooth' })}
        style={{ width: 24, height: 60, flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   RATING RING
══════════════════════════════════════════════════════════════════ */
const RatingRing = ({ avg, total }) => {
  const circ = 220, offset = circ - (avg / 5) * circ;
  return (
    <div className="flex flex-col items-center justify-center gap-1" style={{ minWidth: 110 }}>
      <div className="relative" style={{ width: 90, height: 90 }}>
        <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="45" cy="45" r="35" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
          <circle cx="45" cy="45" r="35" fill="none" stroke="url(#rgrad)" strokeWidth="7" strokeLinecap="round"
            strokeDasharray={circ} className="ring-arc" style={{ '--offset': offset, strokeDashoffset: offset }} />
          <defs>
            <linearGradient id="rgrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: '#fff', lineHeight: 1 }}>{avg.toFixed(1)}</span>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: 1 }}>/ 5.0</span>
        </div>
      </div>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < Math.round(avg) ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.70)' }}>
        {total} {total === 1 ? 'review' : 'reviews'}
      </span>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   STAR BARS
══════════════════════════════════════════════════════════════════ */
const StarBars = ({ reviews }) => {
  const counts = [5, 4, 3, 2, 1].map(s => ({ star: s, count: reviews.filter(r => r.rating === s).length }));
  const max = Math.max(...counts.map(c => c.count), 1);
  return (
    <div className="flex flex-col gap-2 flex-1" style={{ minWidth: 180 }}>
      {counts.map(({ star, count }) => (
        <div key={star} className="flex items-center gap-2.5">
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.70)', width: 8, textAlign: 'right' }}>{star}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="bar-fill h-full rounded-full"
              style={{
                '--w': `${(count / max) * 100}%`, width: `${(count / max) * 100}%`,
                background: star >= 4 ? 'linear-gradient(90deg,#6366f1,#818cf8)' : star === 3 ? '#f59e0b' : '#f87171'
              }} />
          </div>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.70)', width: 14, textAlign: 'right' }}>{count}</span>
        </div>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
const Product = () => {
  const { productId, category, subCategory, ProductName, sku } = useParams();
  const {
    products, currency, addToCart, submitReview, getProductReviews,
    token, backendUrl, deleteReview, userId, wishlist,
    toggleWishlistItem, getSingleProduct
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [size, setSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [makeMeasure, setMakeMeasure] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [sizeStock, setSizeStock] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [addonCost, setAddonCost] = useState(0);

  const displayPrice = basePrice + addonCost;
  const isWishlisted = Array.isArray(wishlist) ? wishlist.some(w => w.productId === productData?._id) : false;

  // const fetchProductData = async () => {
  //   const item = await getSingleProduct(productId);
  //   if (item) {
  //     setProductData(item);
  //     setImage(item.image[0]);
  //     setSelectedIndex(0);
  //     setBasePrice(item.price);
  //     setAddonCost(0);
  //   }
  // };

  useEffect(() => {
    const fetchProduct = async () => {
      // Slug-based route
      // if (sku) {
      //   const res = await axios.get(
      //     `${backendUrl}/api/product/${category}/${subCategory}/${name}/${sku}`
      //   );
      //   setProductData(res.data.product);
      // }
      if (sku) {
        const res = await axios.get(
          `${backendUrl}/api/product/sku/${sku}`
        );

        if (res.data.success) {
          setProductData(res.data.product);
          setImage(res.data.product.image?.[0] || "");
          setBasePrice(res.data.product.price);
          setAddonCost(0);
        }
      }
      // Old ID-based route (backward compatible)
      else if (productId) {
        const res = await axios.post(
          `${backendUrl}/api/product/single`,
          { productId }
        );
        setProductData(res.data.product);
        setImage(res.data.product.image?.[0] || "");
        setBasePrice(res.data.product.price);
        setAddonCost(0);
      }
    };
    fetchProduct();
  }, [sku]);

  // const loadReviews = async () => {
  //   const data = await getProductReviews(productId);
  //   setReviews(data);
  // };

  const loadReviews = async () => {
    if (!productData?._id) return;
    const data = await getProductReviews(productData._id);
    setReviews(data);
  };
  useEffect(() => {
    if (productData?._id) loadReviews();
  }, [productData?._id]);

  useEffect(() => {
    if (productData?.image?.length) {
      setImage(productData.image[0]);
    }
  }, [productData]);

  const handleSizeSelect = (sizeObj) => {
    if (!sizeObj) return;
    if (typeof sizeObj === 'string') {
      setSize(sizeObj); setSizeStock(0); setBasePrice(productData?.price || 0);
    } else if (sizeObj.size) {
      setSize(sizeObj.size); setSizeStock(sizeObj.stock || 0);
      setBasePrice(sizeObj.useCustomPrice && sizeObj.customPrice > 0
        ? sizeObj.customPrice
        : productData.price * (sizeObj.priceMultiplier || 1));
    }
  };

  const handleAddToCart = () => {
    if (!size || !selectedColor) { toast.error('Please select a size and color.'); return; }
    addToCart(productData._id, size, selectedColor, addonCost, basePrice);
    setIsButtonDisabled(true);
    setTimeout(() => { toast.success('Product added to cart!'); setIsButtonDisabled(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 2000);
  };

  const handleReviewSubmit = async () => {
    if (!token) return toast.error('Please login first');
    if (!rating || !comment.trim()) return toast.error('Please add rating and comment');
    const ok = await submitReview(productData._id, rating, comment);
    if (ok) { setComment(''); setRating(5); loadReviews(); }
  };

  // useEffect(() => { fetchProductData(); }, [productId, products]);
  useEffect(() => { if (productId) loadReviews(); }, [productId]);
  useEffect(() => {
    if (productData?.color?.length) {
      const c = productData.color[0];
      setSelectedColor(typeof c === 'string' ? c : c?.name || 'Unknown');
    }
  }, [productData]);

  if (!productData) return <div className="opacity-0" />;

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const roundedRating = Math.round(avgRating);
  const content = `Simple 7-day return or exchange policy—no questions asked, just pure satisfaction. Get your order delivered swiftly with tracking updates every step of the way. We use sustainable, recyclable materials to keep your delivery green and guilt-free. Products adhere to international quality benchmarks, ensuring top-tier performance. Sizes tailored for real bodies—refer to our detailed size guide for the perfect match.`;
  const shownContent = isExpanded ? content : `${content.substring(0, 250)}...`;
  const extraAboveBase = displayPrice - productData.price;
  const customBreakdown = extraAboveBase > 0 ? ` (incl. +${currency}${extraAboveBase.toFixed(2)} for size/customization)` : '';

  return (
    <div style={{ background: 'linear-gradient(180deg,#08080f 0%,#0b0b14 100%)' }} className="min-h-screen">
      <ProductPageStyles />

      {/* Original indigo top accent line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10">

        {/* ══ PRODUCT MAIN — improved grid layout ══ */}
        <div style={{
          display: 'grid',
          // gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)',
          gridTemplateColumns: '420px 1fr',
          gap: '24px',
          alignItems: 'start',
        }} className="product-main-grid">

          {/* ── IMAGE GALLERY ── */}
          <div className="product-gallery-wrap lg:sticky lg:top-24 self-start" style={{ overflow: 'hidden', maxWidth: '100%', width: '100%' }}>

            {/* DESKTOP: vertical thumb rail + main image */}
            <div className="hidden sm:flex flex-row gap-3" style={{ alignItems: 'flex-start' }}>
              <ThumbRail
                images={productData.image}
                selectedIndex={selectedIndex}
                onSelect={(img, idx) => { setImage(img); setSelectedIndex(idx); }}
              />

              {/* MAIN IMAGE — aspect-ratio based, not fixed px */}
              <div className="main-img-wrap overflow-hidden relative"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  aspectRatio: '3/4',
                  maxHeight: 450,
                }}>
                <img src={image} alt={productData.name} className="main-img"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16, display: 'block' }} />
                <button onClick={() => toggleWishlistItem(productData._id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: isWishlisted ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.85)',
                    border: isWishlisted ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(4px)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'all .2s'
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24"
                    fill={isWishlisted ? '#ef4444' : 'none'} stroke={isWishlisted ? '#ef4444' : '#888'}
                    strokeWidth="1.5" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <div className="absolute bottom-3 left-3 rounded-full px-2.5 py-1"
                  style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>
                    {selectedIndex + 1} / {productData.image.length}
                  </span>
                </div>
              </div>
            </div>

            {/* MOBILE: main image + horizontal strip */}
            <div className="flex sm:hidden flex-col gap-3" style={{ width: '100%', maxWidth: '100%' }}>
              <div className="rounded-2xl overflow-hidden relative"
                style={{ background: '#fff', border: '1px solid rgba(255,255,255,0.06)', width: '100%', aspectRatio: '1/1', maxHeight: '80vw' }}>
                <img src={image} alt={productData.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12, display: 'block' }} />
                <button onClick={() => toggleWishlistItem(productData._id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: isWishlisted ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.85)',
                    border: isWishlisted ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(0,0,0,0.1)'
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24"
                    fill={isWishlisted ? '#ef4444' : 'none'} stroke={isWishlisted ? '#ef4444' : '#888'} strokeWidth="1.5" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <div className="absolute bottom-3 left-3 rounded-full px-2.5 py-1"
                  style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>
                    {selectedIndex + 1} / {productData.image.length}
                  </span>
                </div>
              </div>
              <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                <MobileThumbRail images={productData.image} selectedIndex={selectedIndex}
                  onSelect={(img, i) => { setImage(img); setSelectedIndex(i); }} />
              </div>
            </div>
          </div>

          {/* ── PRODUCT INFO — improved spacing & hierarchy ── */}
          <div style={{ maxWidth: '100%', width: '100%' }}>

            {/* Category */}
            <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-3"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '3px' }}>
              {productData.category} / {productData.subCategory}
            </p>

            {/* Product name — IMPROVED: Cormorant serif, larger */}
            {/* <h1 className="text-white font-light mb-4"
              style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,2.8vw,38px)', lineHeight:1.2, letterSpacing:'-0.01em' }}>
              {productData.name}
            </h1> */}
            <h1 className="text-white font-light mb-4"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(20px,3.5vw,20px)' }}>
              {productData.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-1.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                  fill={i < roundedRating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-white/70 ml-1" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {/* PRICE — IMPROVED: larger, more breathing room */}
            {/* <div className="mb-5 pb-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
              {productData.discountPrice > 0 && productData.discountActive ? (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-green-400 font-medium"
                    style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'34px', lineHeight:1 }}>
                    {currency}{(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
                  </span>
                  <span className="text-white/40 line-through"
                    style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'18px' }}>
                    {currency}{displayPrice.toFixed(2)}
                  </span>
                  <span className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-2.5 py-1"
                    style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'10px', fontWeight:700 }}>
                    {productData.discountPrice}% OFF
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-white"
                    style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'34px', lineHeight:1 }}>
                    {currency}{displayPrice.toFixed(2)}
                  </span>
                  {customBreakdown && (
                    <span className="text-white/35" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px' }}>{customBreakdown}</span>
                  )}
                </div>
              )}
              <p className="text-white/25 mt-1" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'10px' }}>Incl. of all taxes</p>
            </div> */}

            <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {productData.discountPrice > 0 && productData.discountActive ? (
                <div className="flex items-center gap-3">
                  <span className="text-white/40 line-through" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '22px' }}>{currency}{displayPrice.toFixed(2)}</span>
                  <span className="text-green-400 font-medium" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
                    {currency}{(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
                  </span>
                  <span className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-2.5 py-1"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 700 }}>
                    {productData.discountPrice}% OFF
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-white " style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
                    {currency}{displayPrice.toFixed(2)}
                  </span>
                  {customBreakdown && <span className="text-white/35 ml-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{customBreakdown}</span>}
                </div>
              )}
            </div>

            <p className="text-white/60 leading-relaxed mb-7"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', lineHeight: '1.8' }}>
              {productData.description}
            </p>

            {/* COLOUR — round swatches */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-white/70 font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Colour</p>
                <span className="text-white/70 capitalize"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>— {selectedColor}</span>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {productData.color?.length > 0 ? productData.color.map((c, i) => {
                  const n = typeof c === 'string' ? c : c?.name || 'Unknown';
                  const h = typeof c === 'string' ? (colorMap[c.toLowerCase()] || '#CCCCCC') : (c.hex || colorMap[c?.name?.toLowerCase()] || '#CCCCCC');
                  const sel = selectedColor === n;
                  return (
                    <button key={i} onClick={() => setSelectedColor(n)} title={n}
                      className="color-swatch"
                      style={{
                        width: 34, height: 34, borderRadius: '50%',
                        backgroundColor: h,
                        border: sel ? '3px solid #6366f1' : '2px solid rgba(255,255,255,0.15)',
                        boxShadow: sel ? '0 0 0 3px rgba(99,102,241,0.3)' : 'none',
                        cursor: 'pointer', outline: 'none',
                        transition: 'transform .15s, box-shadow .15s',
                      }} />
                  );
                }) : (
                  <p className="text-white/60" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>No colors available</p>
                )}
              </div>
            </div>

            {/* SIZE */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/70 font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Select Size</p>
                <button onClick={() => setShowModal(true)}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Size Guide
                </button>
                {showModal && <Modal onclose={() => setShowModal(false)} />}
              </div>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes?.length > 0 ? productData.sizes.map((s, i) => {
                  const lbl = s?.size || s;
                  let sp = productData.price;
                  if (typeof s === 'object') sp = (s.useCustomPrice && s.customPrice > 0) ? s.customPrice : productData.price * (s.priceMultiplier || 1);
                  const sel = size === lbl;
                  const oos = typeof s === 'object' && s.stock === 0;
                  return (
                    <button key={i} type="button" onClick={() => handleSizeSelect(s)}
                      className="size-btn flex flex-col items-center rounded-xl px-3 py-2.5 transition-all duration-200"
                      style={{
                        border: sel ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                        background: sel ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                        transform: sel ? 'scale(1.05)' : 'scale(1)', minWidth: '60px',
                        opacity: oos ? 0.4 : 1, boxShadow: sel ? '0 0 0 3px rgba(99,102,241,0.18)' : 'none',
                        cursor: oos ? 'not-allowed' : 'pointer'
                      }}>
                      <span className="text-white font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>{lbl}</span>
                      <span className="text-white/70" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>{currency}{sp.toFixed(2)}</span>
                    </button>
                  );
                }) : (
                  <p className="text-white/60" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>No sizes available</p>
                )}
              </div>
              {size && sizeStock <= 0 && <p className="text-red-400 mt-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>⚠️ This size is out of stock</p>}
              {size && sizeStock > 0 && sizeStock < 5 && <p className="text-amber-400 mt-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>⚠️ Only {sizeStock} left in stock</p>}
            </div>

            {/* MADE TO MEASURE */}
            {/* <div className="mb-4">
              <button onClick={() => setMakeMeasure(!makeMeasure)}
                className="w-full rounded-xl py-3 transition-all duration-200 font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
                style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2px',
                  color: makeMeasure ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)',
                  border: makeMeasure ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(255,255,255,0.1)',
                  background: makeMeasure ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer'
                }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 3H3v18h18V3z M7 7h.01 M7 12h.01 M7 17h.01 M11 7h6 M11 12h6 M11 17h6" />
                </svg>
                Made to Measure
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ transform: makeMeasure ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {makeMeasure && (
                <div className="mt-2 rounded-xl p-3 flex items-center gap-2"
                  style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <FaInfoCircle className="text-indigo-400 shrink-0" size={14} />
                  <p className="text-white/50" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>Measurements can be added on the Cart page</p>
                </div>
              )}
            </div> */}

            {/* ADD TO CART — original indigo gradient */}
            <button onClick={() => { handleAddToCart(); setDrawerOpen(true); }}
              disabled={isButtonDisabled || !size || !selectedColor}
              className="w-full relative overflow-hidden rounded-xl text-white font-semibold uppercase tracking-widest py-4 mb-4 group"
              style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: '11px', letterSpacing: '2.5px',
                background: isButtonDisabled ? '#4b4b6b' : 'linear-gradient(135deg,#6366f1,#4f46e5)',
                opacity: (!size || !selectedColor) ? 0.5 : 1,
                cursor: (!size || !selectedColor) ? 'not-allowed' : 'pointer', transition: 'all 0.2s', border: 'none',
                boxShadow: (!size || !selectedColor || isButtonDisabled) ? 'none' : '0 8px 24px rgba(99,102,241,0.35)'
              }}>
              <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-xl"
                style={{ display: (!size || !selectedColor) ? 'none' : 'block' }} />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isButtonDisabled ? (
                  <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Adding…</>
                ) : (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>Add to Cart</>
                )}
              </span>
            </button>

            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={() => setDrawerOpen(!drawerOpen)} />
            {/* <JacketLiningSelector basePrice={basePrice} onPriceChange={(c) => setAddonCost(c)} /> */}
            {
              productData.itemDetails?.some(item => item.title || item.value) && (

                <div
                  style={{
                    marginTop: 4,
                    marginBottom: 24,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    overflow: "hidden",
                    backdropFilter: "blur(8px)",
                  }}
                >

                  {/* Header */}

                  <div
                    style={{
                      padding: "10px 22px",
                      background: "rgba(99,102,241,0.08)",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#ffffff",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        fontFamily: "'Montserrat',sans-serif",
                      }}
                    >
                      Product Specifications
                    </h2>
                  </div>

                  {/* Specification Rows */}

                  {productData.itemDetails.map((item, index) => (

                    item.title || item.value ? (

                      <div
                        key={index}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "250px 1fr",
                          alignItems: "center",
                          padding: "10px 22px",
                          background:
                            index % 2 === 0
                              ? "rgba(255,255,255,.015)"
                              : "transparent",

                          borderBottom:
                            index !== productData.itemDetails.length - 1
                              ? "1px solid rgba(255,255,255,.06)"
                              : "none",
                        }}
                      >

                        {/* Left */}

                        <p
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "rgba(255,255,255,.90)",
                            letterSpacing: ".05em",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.title}
                        </p>

                        {/* Right */}

                        <p
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            fontSize: 12,
                            color: "rgba(255,255,255,.70)",
                            lineHeight: 1.8,
                          }}
                        >
                          {item.value}
                        </p>

                      </div>

                    ) : null

                  ))}

                </div>

              )
            }


            {/* POLICY — original indigo icons */}
            <div className="mt-6 space-y-2.5 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', text: '100% original, premium materials' },
                { icon: 'M4 12l6 6L20 6', text: 'Secure cash on delivery + multiple payment methods' },
                { icon: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5', text: 'Simple 7-day return or exchange policy' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.50)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,.90)" strokeWidth="2" strokeLinecap="round">
                      <path d={icon} />
                    </svg>
                  </div>
                  <span className="text-white/70" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{text}</span>
                </div>
              ))}
              <p className="text-white/60 leading-relaxed" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', lineHeight: '1.8' }}>
                {shownContent}
              </p>
              <button onClick={() => setIsExpanded(p => !p)}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        </div>

        {/* ══ TABS — all original ══ */}
        <div className="mt-20">
          <div className="flex items-end gap-0 mb-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {['description', 'reviews'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`ptab-btn px-8 py-4 font-semibold uppercase tracking-widest transition-colors duration-200 ${activeTab === tab ? 'ptab-active' : ''}`}
                style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '2.5px',
                  color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.50)', background: 'none', border: 'none', cursor: 'pointer'
                }}>
                {tab === 'reviews' ? `Reviews (${reviews.length})` : 'Description'}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="pt-10 pb-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,rgba(99,102,241,.70),transparent)' }} />
                {/* <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: 'rgba(120,125,241,.90)', letterSpacing: '4px', textTransform: 'uppercase' }}>Product Details</span> */}
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px",        // 13 → 18
                    fontWeight: 600,         // thoda bold
                    color: "#8b93ff",        // brighter indigo
                    letterSpacing: "6px",    // 4 → 6
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  Product Details
                </span>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,.70))' }} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="desc-prose" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,.45)' }}
                    dangerouslySetInnerHTML={{ __html: productData.detailedDescription }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="pt-10 space-y-8">
              {reviews.length > 0 && (
                <div className="rounded-2xl p-6 flex flex-wrap gap-8 items-center"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <RatingRing avg={avgRating} total={reviews.length} />
                  <div className="w-px self-stretch hidden sm:block" style={{ background: 'rgba(255,255,255,0.07)' }} />
                  <StarBars reviews={reviews} />
                  <div className="w-px self-stretch hidden lg:block" style={{ background: 'rgba(255,255,255,0.07)' }} />
                  <div className="flex flex-col gap-2">
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: '2px', textTransform: 'uppercase' }}>Top sentiments</span>
                    {['Premium quality', 'Great fit', 'Fast delivery'].map(s => (
                      <span key={s} className="rounded-full px-3 py-1.5 flex items-center gap-1.5"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ color: '#6366f1', fontSize: 12 }}>✦</span> {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {token ? (
                <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(99,102,241,0.04)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: '#fff', fontWeight: 300 }}>Share Your Experience</span>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 12 }}>Your Rating</p>
                      <div className="flex gap-3 flex-wrap">
                        {[5, 4, 3, 2, 1].map(r => {
                          const active = Number(rating) === r;
                          return (
                            <button key={r} type="button" onClick={() => setRating(r)}
                              className="star-pick flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-200"
                              style={{
                                fontFamily: "'Montserrat',sans-serif", fontSize: 12,
                                // background: active ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.03)',
                                // border: active ? '1px solid rgba(245,158,11,0.45)' : '1px solid rgba(255,255,255,0.08)',
                                // color: active ? '#f59e0b' : 'rgba(255,255,255,.3)',
                                // boxShadow: active ? '0 0 16px rgba(245,158,11,0.2)' : 'none', cursor: 'pointer'
                                background: active
                                  ? 'rgba(251,191,36,0.28)'
                                  : 'rgba(255,255,255,0.04)',

                                border: active
                                  ? '1px solid #fbbf24'
                                  : '1px solid rgba(255,255,255,0.10)',

                                color: active
                                  ? '#facc15'
                                  : 'rgba(255,255,255,.35)',

                                boxShadow: active
                                  ? '0 0 20px rgba(251,191,36,.55)'
                                  : 'none',
                              }}>
                              <span style={{ fontSize: 14 }}>{'★'.repeat(r)}</span>
                              <span style={{ fontSize: 11 }}>{r}.0</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 10 }}>Your Review</p>
                      <div className="relative">
                        <textarea className="rev-textarea w-full rounded-xl resize-none transition-all duration-200"
                          value={comment} onChange={e => setComment(e.target.value)}
                          placeholder="What did you love about this product? Quality, fit, style…" rows={4}
                          style={{
                            fontFamily: "'Montserrat',sans-serif", fontSize: 13, lineHeight: 1.7,
                            padding: '14px 16px', background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,.65)', width: '100%'
                          }} />
                        <span className="absolute bottom-3 right-4" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.40)' }}>
                          {comment.length}/500
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={handleReviewSubmit} className="submit-btn rounded-xl text-white font-semibold uppercase tracking-widest px-8 py-3.5"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '2.5px', cursor: 'pointer', border: 'none' }}>
                        <span className="flex items-center gap-2">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                          Submit Review
                        </span>
                      </button>
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.70)' }}>Your review is public</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(99,102,241,0.04)', border: '1px dashed rgba(99,102,241,0.2)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,.5)" strokeWidth="1.2" strokeLinecap="round" className="mx-auto mb-3">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.70)' }}>Sign in to share your experience</p>
                </div>
              )}

              {reviews.length === 0 ? (
                <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.070)' }}>
                  <div className="text-4xl mb-3 text-indigo-500">✦</div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: 'rgba(255,255,255,.40)', fontWeight: 300 }}>No reviews yet</p>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: 'rgba(255,255,255,.40)', marginTop: 6 }}>Be the first to share your thoughts</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                    </span>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: '1px' }}>Most recent</span>
                  </div>
                  {reviews.map((rev, idx) => {
                    const init = (rev.user?.name || 'U')[0].toUpperCase();
                    const cols = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b'];
                    const col = cols[idx % cols.length];
                    return (
                      <div key={rev._id} className="rev-card rounded-2xl p-5"
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                              style={{ background: `${col}22`, border: `1px solid ${col}44`, fontFamily: "'Montserrat',sans-serif", fontSize: 13, color: col }}>
                              {init}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>
                                  {rev.user?.name || 'User'}
                                </p>
                                <span className="verified-badge rounded-full px-2 py-0.5 flex items-center gap-1"
                                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,.25)' }}>
                                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: '#818cf8', letterSpacing: '1px' }}>Verified</span>
                                </span>
                              </div>
                              <div className="flex gap-0.5 mt-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} width="10" height="10" viewBox="0 0 24 24"
                                    fill={i < rev.rating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.70)' }}>
                              {new Date(rev.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            {rev.user?._id === userId && (
                              // <button onClick={async () => { const ok = await deleteReview(rev._id); if (ok) loadReviews(); }}
                              //   className="flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all duration-150"
                              //   style={{
                              //     fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: '1px',
                              //     color: 'rgba(248,113,113,.6)', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.15)', textTransform: 'uppercase', cursor: 'pointer'
                              //   }}
                              //   onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; }}
                              //   onMouseLeave={e => { e.currentTarget.style.color = 'rgba(248,113,113,.6)'; e.currentTarget.style.background = 'rgba(248,113,113,0.07)'; }}>
                              //   <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              //     <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6 M14 11v6" />
                              //   </svg>
                              //   Delete
                              // </button>
                              <button
                                onClick={async () => {
                                  const ok = await deleteReview(rev._id);
                                  if (ok) loadReviews();
                                }}
                                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all duration-200"
                                style={{
                                  fontFamily: "'Montserrat',sans-serif",
                                  fontSize: 10,
                                  fontWeight: 600,
                                  letterSpacing: "1px",
                                  color: "#f87171",
                                  background: "rgba(248,113,113,0.15)",
                                  border: "1px solid rgba(248,113,113,0.35)",
                                  textTransform: "uppercase",
                                  cursor: "pointer",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = "#ffffff";
                                  e.currentTarget.style.background = "#ef4444";
                                  e.currentTarget.style.borderColor = "#ef4444";
                                  e.currentTarget.style.boxShadow =
                                    "0 0 16px rgba(239,68,68,.45)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = "#f87171";
                                  e.currentTarget.style.background =
                                    "rgba(248,113,113,0.15)";
                                  e.currentTarget.style.borderColor =
                                    "rgba(248,113,113,0.35)";
                                  e.currentTarget.style.boxShadow = "none";
                                }}
                              >
                                <svg
                                  width="11"
                                  height="11"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14H6L5 6" />
                                  <path d="M10 11v6 M14 11v6" />
                                </svg>

                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="mt-4 leading-relaxed"
                          style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, lineHeight: 1.8, color: 'rgba(255,255,255,.70)', paddingLeft: 52 }}>
                          {rev.comment}
                        </p>
                        <div className="flex items-center gap-3 mt-4" style={{ paddingLeft: 52 }}>
                          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.70)' }}>Helpful?</span>
                          {['👍', '👎'].map(e => (
                            <button key={e} className="rounded-lg px-2.5 py-1 transition-colors"
                              style={{ fontSize: 11, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}
                              onMouseEnter={ev => { ev.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                              onMouseLeave={ev => { ev.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                              {e}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-20">
          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>

      </div>

      {/* Responsive grid: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .product-main-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Product;