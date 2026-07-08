import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../../App';
import {
  TbPackage, TbCurrencyRupee, TbCurrencyDollar, TbCircleCheck, TbTruck,
  TbSun, TbSearch, TbX, TbRefresh, TbChevronDown,
  TbPhone, TbMail, TbMapPin, TbCopy,
  TbShoppingBag, TbCreditCard, TbCalendar,
  TbAlertCircle, TbArrowRight, TbDownload,
  TbCheck, TbBan, TbArrowBack, TbBolt, TbChartBar,
  TbFileExport,
} from 'react-icons/tb';

/* ═══════════════════ CONSTANTS ═══════════════════ */
const STATUS_STEPS = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];
const ALL_STATUSES = [...STATUS_STEPS, 'Cancelled'];

const STATUS_CFG = {
  'Order Placed': { emoji: '📦', dot: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 border-blue-200', bar: 'from-blue-500 to-blue-400', select: 'bg-blue-50 text-blue-700 border-blue-300', label: 'Order Placed' },
  'Packing': { emoji: '📫', dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200', bar: 'from-amber-500 to-yellow-400', select: 'bg-amber-50 text-amber-700 border-amber-300', label: 'Packing' },
  'Shipped': { emoji: '🚚', dot: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700 border-violet-200', bar: 'from-violet-600 to-violet-400', select: 'bg-violet-50 text-violet-700 border-violet-300', label: 'Shipped' },
  'Out for delivery': { emoji: '🏃', dot: 'bg-cyan-500', badge: 'bg-cyan-50 text-cyan-700 border-cyan-200', bar: 'from-cyan-500 to-sky-400', select: 'bg-cyan-50 text-cyan-700 border-cyan-300', label: 'Out for Delivery' },
  'Delivered': { emoji: '✅', dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', bar: 'from-emerald-500 to-green-400', select: 'bg-emerald-50 text-emerald-700 border-emerald-300', label: 'Delivered' },
  'Cancelled': { emoji: '❌', dot: 'bg-red-400', badge: 'bg-red-50 text-red-600 border-red-200', bar: 'from-red-500 to-red-400', select: 'bg-red-50 text-red-600 border-red-300', label: 'Cancelled' },
};

/* ═══════════════════ HELPERS ═══════════════════ */
// Safe quantity extractor — handles both {quantity: N} objects and plain numbers
const safeQty = (q) => typeof q === 'object' ? (q?.quantity ?? 1) : (Number(q) || 1);
// Safe size/color extractors — handle object or string variants
const safeSize = (s) => typeof s === 'object' ? (s?.label || s?.value || '') : (s || '');
const safeColor = (c) => typeof c === 'object' ? (c?.name || '') : (c || '');

const fmtDate = (ts) => ts ? new Date(ts).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const fmtTime = (ts) => ts ? new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
const fmtRel = (ts) => {
  if (!ts) return '';
  const m = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

/* ═══════════════════ SMALL COMPONENTS ═══════════════════ */

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CFG[status] || STATUS_CFG['Order Placed'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const PayBadge = ({ paid }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10.5px] font-bold ${paid ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
    {paid ? <TbCheck size={9} /> : <span className="text-[8px]">⏳</span>}
    {paid ? 'Paid' : 'Pending'}
  </span>
);

/* Shimmer skeleton block */
const Skel = ({ className = '' }) => (
  <div className={`rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:300%_100%] animate-[shimmer_1.8s_ease-in-out_infinite] ${className}`} />
);

/* Stat card */
const StatCard = ({ icon, value, label, iconBg, delay = 0 }) => (
  <div
    className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    style={{ animation: `fadeUp 0.4s ease ${delay}s both` }}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${iconBg}`}>{icon}</div>
    <div className="text-[22px] font-extrabold text-gray-900 leading-none tracking-tight">{value}</div>
    <div className="text-[11.5px] text-gray-400 font-medium mt-1">{label}</div>
  </div>
);

/* Order status progress tracker */
const StatusTracker = ({ status }) => {
  const cur = STATUS_STEPS.indexOf(status);
  return (
    <div className="flex items-start w-full">
      {STATUS_STEPS.map((step, i) => {
        const done = cur > i;
        const active = cur === i;
        return (
          <div key={step} className="flex-1 flex flex-col items-center relative">
            {i < STATUS_STEPS.length - 1 && (
              <div
                className="absolute top-[11px] left-1/2 w-full h-[2.5px] z-0 transition-all duration-500"
                style={{ background: done ? '#10b981' : '#e5e7eb' }}
              />
            )}
            <div className={`relative z-10 w-[23px] h-[23px] rounded-full flex items-center justify-center text-[9px] font-extrabold border-2 transition-all duration-300
              ${done ? 'bg-emerald-500 border-emerald-500 text-white' :
                active ? 'bg-gray-900 border-gray-900 text-white ring-4 ring-gray-900/10' :
                  'bg-gray-100 border-gray-200 text-gray-400'}`}>
              {done ? <TbCheck size={11} /> : i + 1}
            </div>
            <span className={`mt-1.5 text-[9px] font-semibold text-center leading-tight px-0.5
              ${done ? 'text-emerald-600' : active ? 'text-gray-900' : 'text-gray-400'}`}>
              {step === 'Out for delivery' ? 'Out for\nDelivery' : step.replace('Order ', '')}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* Quick action button */
const QBtn = ({ children, onClick, disabled, variant = 'default' }) => {
  const variants = {
    default: 'bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
    cancel: 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100',
    revert: 'bg-white border-dashed border-gray-300 text-gray-500 hover:border-gray-500',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-[12.5px] font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

/* Copy-to-clipboard button */
const CopyBtn = ({ text, id, copiedId, onCopy }) => (
  <button
    onClick={() => onCopy(text, id)}
    className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-400 transition-all flex-shrink-0"
    title="Copy"
  >
    {copiedId === id ? <TbCheck size={12} /> : <TbCopy size={12} />}
  </button>
);

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [payFilter, setPayFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  /* ── fetch ── */
  const fetchAllOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        // Sort newest first on load
        setOrders((res.data.orders || []).slice().reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      toast.error(e?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* ── status update ── */
  const statusHandler = useCallback(async (newStatus, orderId) => {
    setUpdatingId(orderId);
    try {
      const res = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (res.data.success) {
        // Optimistic local update — no full refetch needed
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        toast.success(`Status updated → ${newStatus}`);
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Status update failed');
    } finally {
      setUpdatingId(null);
    }
  }, [token]);

  /* ── copy helper ── */
  const copyText = useCallback((text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => { });
    }
    setCopiedId(id);
    toast.success('Copied!');
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  /* ── export CSV ── */
  const exportCSV = useCallback(() => {
    const rows = [['Order ID', 'Customer', 'Email', 'Phone', 'Amount', 'Status', 'Payment', 'Method', 'Date']];
    filtered.forEach(o => rows.push([
      o._id,
      `${o.address?.firstName || ''} ${o.address?.lastName || ''}`.trim(),
      o.address?.email || '',
      o.address?.phone || '',
      o.finalAmount || o.amount || 0,
      o.status || '',
      o.payment ? 'Paid' : 'Pending',
      o.paymentMethod || '',
      fmtDate(o.date),
    ]));
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Orders exported!');
  }, []);

  useEffect(() => { fetchAllOrders(); }, [fetchAllOrders]);

  /* ── derived data ── */
  const payMethods = useMemo(() =>
    [...new Set(orders.map(o => o.paymentMethod).filter(Boolean))],
    [orders]);

  const stats = useMemo(() => {
    const now = new Date();
    const isToday = (ts) => {
      const d = new Date(ts);
      return d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear();
    };
    // GMV = total value of ALL orders (including unpaid/COD)
    // paidRevenue = only payment-confirmed orders
    const gmv = orders.reduce((s, o) => s + (Number(o.finalAmount) || Number(o.amount) || 0), 0);
    const paidRevenue = orders.filter(o => o.payment).reduce((s, o) => s + (Number(o.finalAmount) || Number(o.amount) || 0), 0);
    return {
      total: orders.length,
      revenue: gmv,          // headline = all orders GMV
      paidRevenue,                 // collected/confirmed payments
      delivered: orders.filter(o => o.status === 'Delivered').length,
      active: orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status)).length,
      today: orders.filter(o => isToday(o.date)).length,
      pending: orders.filter(o => !o.payment).length,
    };
  }, [orders]);

  const filtered = useMemo(() => {
    let r = [...orders];
    const q = search.toLowerCase().trim();
    if (q) {
      r = r.filter(o =>
        `${o.address?.firstName || ''} ${o.address?.lastName || ''}`.toLowerCase().includes(q) ||
        (o._id || '').toLowerCase().includes(q) ||
        (o.address?.phone || '').includes(q) ||
        (o.address?.email || '').toLowerCase().includes(q) ||
        (o.items || []).some(it => (it.name || '').toLowerCase().includes(q))
      );
    }
    if (statusFilter !== 'all') r = r.filter(o => o.status === statusFilter);
    if (payFilter === 'paid') r = r.filter(o => o.payment);
    if (payFilter === 'pending') r = r.filter(o => !o.payment);
    if (methodFilter !== 'all') r = r.filter(o => o.paymentMethod === methodFilter);

    const now = Date.now();
    if (dateFilter === 'today') {
      const n = new Date();
      r = r.filter(o => {
        const d = new Date(o.date);
        return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
      });
    }
    if (dateFilter === 'week') r = r.filter(o => now - new Date(o.date).getTime() < 7 * 86400000);
    if (dateFilter === 'month') r = r.filter(o => now - new Date(o.date).getTime() < 30 * 86400000);

    if (sortBy === 'newest') r.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortBy === 'oldest') r.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === 'amount-h') r.sort((a, b) => (Number(b.finalAmount) || 0) - (Number(a.finalAmount) || 0));
    if (sortBy === 'amount-l') r.sort((a, b) => (Number(a.finalAmount) || 0) - (Number(b.finalAmount) || 0));
    if (sortBy === 'name') r.sort((a, b) => (a.address?.firstName || '').localeCompare(b.address?.firstName || ''));
    return r;
  }, [orders, search, statusFilter, payFilter, methodFilter, dateFilter, sortBy]);

  const hasFilters = !!(search || statusFilter !== 'all' || payFilter !== 'all' || methodFilter !== 'all' || dateFilter !== 'all');
  const clearFilters = () => { setSearch(''); setStatusFilter('all'); setPayFilter('all'); setMethodFilter('all'); setDateFilter('all'); };

  /* ══════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
        .op    { font-family: 'Outfit', sans-serif; }
        .dmono { font-family: 'DM Mono', monospace; }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer   { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes spin-fast { to{transform:rotate(360deg)} }
        .sp-anim { animation: spin-fast 0.85s linear infinite; }
        .ce      { animation: fadeUp    0.35s ease both; }
        .de      { animation: slideDown 0.2s  ease both; }
        .fsel {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }
        .ssel {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }
      `}</style>

      <div className="op">

        {/* ── HEADER ── */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 h-16 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm flex-shrink-0">
                <TbShoppingBag size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-[17px] font-extrabold text-gray-900 leading-none tracking-tight">Orders</h1>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-none">
                  {loading ? 'Loading…' : `${orders.length} total orders`}
                </p>
              </div>
              {!loading && stats.active > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  {stats.active} active
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchAllOrders}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[12.5px] font-semibold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                <TbRefresh size={14} className={loading ? 'sp-anim' : ''} />
                Refresh
              </button>
              <button
                onClick={exportCSV}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 text-[12.5px] font-semibold text-white hover:bg-indigo-700 transition-all shadow-sm"
              >
                <TbFileExport size={14} />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 max-w-[1400px] mx-auto">

          {/* ── STATS ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {[
              { icon: <TbPackage size={18} className="text-indigo-600" />, iconBg: 'bg-indigo-50', value: loading ? '—' : stats.total, label: 'Total Orders', delay: 0 },
              { icon: <TbCurrencyDollar size={18} className="text-emerald-600" />, iconBg: 'bg-emerald-50', value: loading ? '—' : `$${stats.revenue.toLocaleString('en-US')}`, label: `GMV · $${loading ? '…' : stats.paidRevenue.toLocaleString('en-US')} paid`, delay: 0.05 },
              { icon: <TbCircleCheck size={18} className="text-emerald-600" />, iconBg: 'bg-emerald-50', value: loading ? '—' : stats.delivered, label: 'Delivered', delay: 0.08 },
              { icon: <TbTruck size={18} className="text-amber-600" />, iconBg: 'bg-amber-50', value: loading ? '—' : stats.active, label: 'In Progress', delay: 0.12 },
              { icon: <TbSun size={18} className="text-violet-600" />, iconBg: 'bg-violet-50', value: loading ? '—' : stats.today, label: "Today's Orders", delay: 0.16 },
              { icon: <TbCreditCard size={18} className="text-red-500" />, iconBg: 'bg-red-50', value: loading ? '—' : stats.pending, label: 'Unpaid', delay: 0.20 },
            ].map((s, i) => <StatCard key={i} {...s} />)}
          </div>

          {/* ── TOOLBAR ── */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 mb-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <TbSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search name, order ID, phone, item…"
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  >
                    <TbX size={10} className="text-gray-600" />
                  </button>
                )}
              </div>

              {/* Filter selects */}
              {[
                {
                  val: statusFilter, set: setStatusFilter,
                  opts: [['all', 'All Statuses'], ...ALL_STATUSES.map(s => [s, s])],
                },
                {
                  val: payFilter, set: setPayFilter,
                  opts: [['all', 'All Payments'], ['paid', '✓ Paid'], ['pending', '⏳ Unpaid']],
                },
                // Only show method filter if there are multiple methods
                ...(payMethods.length > 1 ? [{
                  val: methodFilter, set: setMethodFilter,
                  opts: [['all', 'All Methods'], ...payMethods.map(m => [m, m])],
                }] : []),
                {
                  val: dateFilter, set: setDateFilter,
                  opts: [['all', 'All Time'], ['today', 'Today'], ['week', 'This Week'], ['month', 'This Month']],
                },
                {
                  val: sortBy, set: setSortBy,
                  opts: [['newest', '↓ Newest'], ['oldest', '↑ Oldest'], ['amount-h', '$ High–Low'], ['amount-l', '$ Low–High'], ['name', 'A–Z Name']],
                },
              ].map((s, i) => (
                <select
                  key={i}
                  value={s.val}
                  onChange={e => s.set(e.target.value)}
                  className="fsel px-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 cursor-pointer hover:border-gray-300 transition-all"
                >
                  {s.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              ))}

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-red-200 bg-red-50 text-[12.5px] font-semibold text-red-600 hover:bg-red-100 transition-all whitespace-nowrap"
                >
                  <TbX size={13} /> Clear Filters
                </button>
              )}
            </div>

            {/* Results bar + quick-filter pills */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 gap-3 flex-wrap">
              <p className="text-[12.5px] text-gray-400">
                {loading ? 'Loading…' : (
                  <>
                    Showing{' '}
                    <strong className="text-gray-700">{filtered.length}</strong> of{' '}
                    <strong className="text-gray-700">{orders.length}</strong> orders
                  </>
                )}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                {ALL_STATUSES.map(s => {
                  const cnt = orders.filter(o => o.status === s).length;
                  if (!cnt) return null;
                  const cfg = STATUS_CFG[s];
                  return (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[10.5px] font-semibold transition-all
                        ${statusFilter === s
                          ? cfg.badge
                          : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label} <span className="opacity-60">({cnt})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── ORDER LIST ── */}
          <div className="flex flex-col gap-3">

            {/* Skeleton */}
            {loading && [0, 0.06, 0.12, 0.18, 0.22].map((d, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ce"
                style={{ animationDelay: `${d}s` }}
              >
                <div className="h-[3px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:300%_100%] animate-[shimmer_1.8s_ease-in-out_infinite]" />
                <div className="p-4 flex items-center gap-4">
                  <Skel className="w-11 h-11 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skel className="w-20 h-3" />
                    <Skel className="w-36 h-4" />
                    <Skel className="w-56 h-3" />
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-2">
                    <Skel className="w-20 h-3" />
                    <Skel className="w-14 h-3" />
                  </div>
                  <Skel className="w-24 h-8 rounded-xl flex-shrink-0" />
                </div>
              </div>
            ))}

            {/* Empty state */}
            {!loading && filtered.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-20 ce">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="text-[17px] font-extrabold text-gray-900 mb-2">No orders found</h3>
                <p className="text-[13px] text-gray-400 mb-6">
                  {hasFilters ? 'Adjust your filters or clear them' : 'Orders will appear here once customers place them'}
                </p>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-[13px] font-semibold hover:bg-indigo-700 transition-all shadow-sm"
                  >
                    <TbX size={14} /> Clear All Filters
                  </button>
                )}
              </div>
            )}

            {/* Order cards */}
            {!loading && filtered.map((order, idx) => {
              const isExpanded = expandedId === order._id;
              const isUpdating = updatingId === order._id;
              const cfg = STATUS_CFG[order.status] || STATUS_CFG['Order Placed'];
              const stepIdx = STATUS_STEPS.indexOf(order.status);
              const nextSteps = STATUS_STEPS.filter(s => STATUS_STEPS.indexOf(s) > stepIdx);
              const totalQty = (order.items || []).reduce((s, it) => s + safeQty(it.quantity), 0);
              const preview = (order.items || []).map(it => `${it.name || 'Item'} ×${safeQty(it.quantity)}`).join(' · ') || '—';
              const amount = Number(order.finalAmount) || Number(order.amount) || 0;

              return (
                <div
                  key={order._id}
                  className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 ce
                    ${isExpanded ? 'border-indigo-200 shadow-md' : 'border-gray-100 hover:shadow-md hover:-translate-y-0.5'}`}
                  style={{ animationDelay: `${Math.min(idx, 8) * 0.045}s` }}
                >
                  {/* Colour bar */}
                  <div className={`h-[3px] bg-gradient-to-r ${cfg.bar}`} />

                  {/* ── Summary row ── */}
                  <div
                    className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : order._id)}
                  >
                    {/* Status emoji */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border text-xl ${cfg.badge}`}>
                      {cfg.emoji}
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <div className="flex items-center gap-1">
                          <span className="dmono text-[10px] text-gray-400 tracking-wider flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-md max-w-[130px] truncate">
                            #{(order._id || '').toUpperCase()}
                          </span>
                          <button
                            onClick={e => { e.stopPropagation(); copyText(order._id, order._id + '-hdr'); }}
                            className="w-5 h-5 flex items-center justify-center rounded-md bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-400 transition-all"
                          >
                            {copiedId === order._id + '-hdr' ? <TbCheck size={10} /> : <TbCopy size={10} />}
                          </button>
                        </div>
                        <span className="text-[10px] text-gray-300">·</span>
                        <span className="text-[10px] text-gray-400">{fmtRel(order.date)}</span>
                      </div>
                      <p className="text-[15px] font-bold text-gray-900 leading-tight">
                        {order.address?.firstName || ''} {order.address?.lastName || ''}
                      </p>
                      <p className="text-[12px] text-gray-400 mt-0.5 truncate">{preview}</p>
                    </div>

                    {/* Desktop meta */}
                    <div className="hidden lg:flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-[12px] text-gray-500 flex items-center gap-1">
                        <TbCalendar size={11} className="text-gray-400" />
                        {fmtDate(order.date)}
                      </span>
                      <span className="text-[12px] text-gray-500 flex items-center gap-1">
                        <TbShoppingBag size={11} className="text-gray-400" />
                        {totalQty} item{totalQty !== 1 ? 's' : ''}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11.5px] text-gray-400">{order.paymentMethod || '—'}</span>
                        <PayBadge paid={order.payment} />
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="hidden md:block text-right flex-shrink-0 min-w-[78px]">
                      <div className="text-[18px] font-extrabold text-gray-900 tracking-tight leading-none">
                        {currency}{amount.toLocaleString('en-US')}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Order total</div>
                    </div>

                    {/* Status select + expand */}
                    <div className="flex items-center gap-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
                      <select
                        value={order.status || 'Order Placed'}
                        disabled={isUpdating}
                        onChange={e => statusHandler(e.target.value, order._id)}
                        className={`ssel pl-3 pr-8 py-2 rounded-xl border text-[12px] font-bold outline-none cursor-pointer transition-all disabled:opacity-60 ${cfg.select}`}
                      >
                        {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {isUpdating && (
                        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full sp-anim flex-shrink-0" />
                      )}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : order._id)}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all flex-shrink-0
                          ${isExpanded
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                            : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}
                      >
                        <TbChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Mobile strip */}
                  <div className="sm:hidden flex items-center justify-between px-5 py-2.5 border-t border-gray-50 bg-gray-50/50">
                    <div className="flex items-center gap-1.5">
                      <StatusBadge status={order.status} />
                      <PayBadge paid={order.payment} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-extrabold text-gray-900">{currency}{amount.toLocaleString('en-US')}</span>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : order._id)}
                        className="text-[12px] font-semibold text-indigo-600"
                      >
                        {isExpanded ? '▲ Hide' : '▼ Details'}
                      </button>
                    </div>
                  </div>

                  {/* ── Expanded details ── */}
                  {isExpanded && (
                    <div className="de border-t border-gray-100 bg-[#fafbfc]">
                      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">

                        {/* COL 1 — Items */}
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <TbShoppingBag size={12} />Order Items
                            </h3>
                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-[10px] font-semibold text-gray-500">
                              {(order.items || []).length} product{(order.items || []).length !== 1 ? 's' : ''}
                            </span>
                          </div>

                          <div className="space-y-0">
                            {(order.items || []).map((item, ii) => {
                              const qty = safeQty(item.quantity);
                              const size = safeSize(item.size);
                              const color = safeColor(item.color);
                              const img = Array.isArray(item.image) ? item.image[0] : item.image;
                              const lineTotal = item.subtotal
                                ? Number(item.subtotal)
                                : item.price ? Number(item.price) * qty : null;

                              return (
                                <div key={ii} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                                  <div className="w-10 h-10 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex-shrink-0">
                                    {img
                                      ? <img src={img} alt={item.name} className="w-full h-full object-cover" />
                                      : <div className="w-full h-full flex items-center justify-center text-lg">👕</div>
                                    }
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-semibold text-gray-800 leading-snug truncate">{item.name || '—'}</p>
                                    {(size || color) && (
                                      <div className="flex gap-1.5 mt-1 flex-wrap">
                                        {size && <span className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-[10px] font-medium text-gray-500">Size: {size}</span>}
                                        {color && <span className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-[10px] font-medium text-gray-500">{color.startsWith('#') ? '●' : `Color: ${color}`}</span>}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                                    <span className="text-[12px] font-bold text-gray-500">×{qty}</span>
                                    {lineTotal != null && (
                                      <span className="text-[12.5px] font-extrabold text-gray-900">
                                        {currency}{lineTotal.toFixed(0)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                            <span className="text-[12px] text-gray-400">{totalQty} item{totalQty !== 1 ? 's' : ''} · {order.paymentMethod || '—'}</span>
                            <span className="text-[17px] font-extrabold text-gray-900">{currency}{amount.toLocaleString('en-US')}</span>
                          </div>
                        </div>

                        {/* COL 2 — Address + Payment */}
                        <div className="p-5">
                          <h3 className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            <TbMapPin size={12} />Delivery Address
                          </h3>
                          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-5">
                            <p className="text-[14.5px] font-extrabold text-gray-900 mb-2">
                              {order.address?.firstName || ''} {order.address?.lastName || ''}
                            </p>
                            <p className="text-[13px] text-gray-600 leading-relaxed">{order.address?.street || '—'}</p>
                            <p className="text-[13px] text-gray-600">
                              {[order.address?.city, order.address?.state, order.address?.country].filter(Boolean).join(', ') || '—'}
                            </p>
                            {order.address?.zipcode && (
                              <p className="text-[12.5px] text-gray-400 mt-0.5">PIN: {order.address.zipcode}</p>
                            )}
                            <div className="flex flex-wrap gap-2 mt-3">
                              {order.address?.phone && (
                                <div className="flex items-center gap-1">
                                  <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[12px] font-semibold text-gray-700">
                                    <TbPhone size={11} className="text-gray-400" />
                                    {order.address.phone}
                                  </span>
                                  <CopyBtn text={order.address.phone} id={order._id + '-ph'} copiedId={copiedId} onCopy={copyText} />
                                </div>
                              )}
                              {order.address?.email && (
                                <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[12px] text-gray-600 max-w-full truncate">
                                  <TbMail size={11} className="text-gray-400 flex-shrink-0" />
                                  {order.address.email}
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            <TbCreditCard size={12} />Payment Details
                          </h3>
                          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            {[
                              ['Order ID', (
                                <div className="flex items-center gap-1">
                                  <span className="dmono text-[11px] text-gray-500 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg max-w-[160px] truncate block">
                                    #{(order._id || '').toUpperCase()}
                                  </span>
                                  <CopyBtn text={order._id} id={order._id + '-oid'} copiedId={copiedId} onCopy={copyText} />
                                </div>
                              )],
                              ['Payment ID', order.paymentId ? (
                                <div className="flex items-center gap-1">
                                  <span className="dmono text-[11px] text-gray-500 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg max-w-[160px] truncate block">
                                    {order.paymentId}
                                  </span>
                                  <CopyBtn text={order.paymentId} id={order._id + '-pid'} copiedId={copiedId} onCopy={copyText} />
                                </div>
                              ) : '—'],
                              ['Date', `${fmtDate(order.date)} · ${fmtTime(order.date)}`],
                              ['Method', order.paymentMethod || '—'],
                              ['Status', <PayBadge paid={order.payment} />],
                              ['Total', <span className="text-[15px] font-extrabold text-gray-900">{currency}{amount.toLocaleString('en-US')}</span>],
                            ].map(([k, v], i) => (
                              <div key={i} className={`flex items-center justify-between px-4 py-2.5 text-[13px] ${i < 5 ? 'border-b border-gray-50' : ''}`}>
                                <span className="text-gray-400 font-medium">{k}</span>
                                <span className="font-semibold text-gray-800 text-right">{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* COL 3 — Tracker + Quick Update */}
                        <div className="p-5">
                          <h3 className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                            <TbChartBar size={12} />Fulfillment Progress
                          </h3>

                          {order.status === 'Cancelled' ? (
                            <div className="flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl mb-5">
                              <TbBan size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[13px] font-bold text-red-700">Order Cancelled</p>
                                <p className="text-[12px] text-red-400 mt-0.5">This order will not be fulfilled.</p>
                              </div>
                            </div>
                          ) : (
                            <div className="mb-6">
                              <StatusTracker status={order.status || 'Order Placed'} />
                            </div>
                          )}

                          <h3 className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            <TbBolt size={12} />Quick Update
                          </h3>
                          <div className="space-y-2">
                            {nextSteps.map(s => {
                              const scfg = STATUS_CFG[s];
                              return (
                                <QBtn key={s} disabled={isUpdating} onClick={() => statusHandler(s, order._id)}>
                                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${scfg.dot}`} />
                                  <span>Mark as <strong>{s}</strong></span>
                                  <TbArrowRight size={13} className="ml-auto text-gray-400" />
                                </QBtn>
                              );
                            })}

                            {stepIdx > 0 && order.status !== 'Cancelled' && (
                              <QBtn variant="revert" disabled={isUpdating} onClick={() => statusHandler(STATUS_STEPS[stepIdx - 1], order._id)}>
                                <TbArrowBack size={13} className="text-gray-400" />
                                <span>Revert to <strong>{STATUS_STEPS[stepIdx - 1]}</strong></span>
                              </QBtn>
                            )}

                            {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                              <QBtn
                                variant="cancel"
                                disabled={isUpdating}
                                onClick={() => {
                                  if (window.confirm('Cancel this order? This cannot be undone.')) {
                                    statusHandler('Cancelled', order._id);
                                  }
                                }}
                              >
                                <TbBan size={13} />
                                <span>Cancel Order</span>
                              </QBtn>
                            )}
                          </div>

                          <div className="flex items-start gap-2.5 p-3 bg-indigo-50 border border-indigo-100 rounded-xl mt-4">
                            <TbAlertCircle size={14} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                            <p className="text-[11.5px] text-indigo-600 leading-relaxed">
                              Use the dropdown or quick buttons to update status. Changes save instantly.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom spacer */}
          <div className="h-10" />
        </div>
      </div>
    </div>
  );
};

export default Orders;