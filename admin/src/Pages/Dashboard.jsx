import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  TbShoppingCart, TbUsers, TbCurrencyDollar, TbPackage,
  TbTrendingUp, TbTrendingDown, TbPlus, TbDownload,
  TbEdit, TbEye, TbTrash, TbSearch,
  TbChevronDown, TbChevronUp, TbRefresh,
  TbArrowRight, TbCheck, TbX, TbChartBar,
  TbCalendar, TbStar, TbAlertTriangle, TbCircleCheck,
  TbClock, TbTruck, TbChartPie, TbFilter,
  TbSortAscending, TbSortDescending, TbPrinter,
  TbCopy, TbInfoCircle, TbArrowUp, TbArrowDown,
  TbBuildingStore, TbTag, TbPhoto, TbBox,
  TbChevronLeft, TbChevronRight, TbDotsVertical,
  TbFileExport, TbUpload, TbCategory,
  TbPercentage, TbStarFilled, TbGridDots,
  TbList, TbBell, TbSettings, TbLogout
} from 'react-icons/tb';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl, MyContext } from '../App';
import Orders from './Orders/Orders';
import ProductsList from './Products/ProductsLIst';
import Users from './Users/Users';
import Analytics from './Analytics/Analytics';
// import ProductsList from './Pages/Products/ProductsList';
// import Orders from './Pages/Orders/Orders';
// import Users from './Pages/Users/Users';
// import Analytics from './Analytics/Analytics';



const STATUS_CONFIG = {
  pending: { label: 'Pending', cls: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500', icon: <TbClock size={11} /> },
  shipped: { label: 'Shipped', cls: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500', icon: <TbTruck size={11} /> },
  delivered: { label: 'Delivered', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', icon: <TbCircleCheck size={11} /> },
  cancelled: { label: 'Cancelled', cls: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500', icon: <TbX size={11} /> },
  active: { label: 'Active', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', icon: null },
  inactive: { label: 'Inactive', cls: 'bg-gray-50 text-gray-500 border-gray-200', dot: 'bg-gray-400', icon: null },
};

/* ─────────────────────────────────────────────
   UTILITY COMPONENTS
───────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase();
  const cfg = STATUS_CONFIG[s] || STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11.5px] font-semibold ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};


const MiniStat = ({ icon, label, value, trend, color }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl border ${color}`}>
    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shadow-sm flex-shrink-0">{icon}</div>
    <div>
      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-[17px] font-extrabold text-gray-900 leading-none mt-0.5">{value}</p>
    </div>
    {trend !== undefined && (
      <div className={`ml-auto flex items-center gap-0.5 text-[11px] font-bold ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
        {trend >= 0 ? <TbTrendingUp size={13} /> : <TbTrendingDown size={13} />}
        {Math.abs(trend)}%
      </div>
    )}
  </div>
);

const SectionCard = ({ title, subtitle, children, toolbar, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
    <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
      <div>
        <h2 className="text-[15px] font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-[12px] text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {toolbar}
    </div>
    {children}
  </div>
);

const Btn = ({ children, onClick, variant = 'ghost', size = 'sm', className = '', disabled = false, title }) => {
  const base = 'inline-flex items-center gap-1.5 font-semibold rounded-xl transition-all cursor-pointer border select-none';
  const sizes = { xs: 'px-2 py-1 text-[11px]', sm: 'px-3 py-2 text-[12.5px]', md: 'px-5 py-2.5 text-[13.5px]' };
  const variants = {
    primary: 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-sm',
    ghost: 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50',
    success: 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700',
    danger: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    outline: 'bg-transparent text-indigo-600 border-indigo-300 hover:bg-indigo-50',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const IconBtn = ({ icon, onClick, title, color = 'gray', className = '' }) => {
  const colors = {
    gray: 'bg-gray-100 hover:bg-gray-200 text-gray-600',
    indigo: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600',
    red: 'bg-red-50 hover:bg-red-100 text-red-500',
    amber: 'bg-amber-50 hover:bg-amber-100 text-amber-600',
    green: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600',
  };
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${colors[color]} ${className}`}
    >
      {icon}
    </button>
  );
};

const SearchInput = ({ value, onChange, placeholder = 'Search…', className = '' }) => (
  <div className={`relative ${className}`}>
    <TbSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="pl-9 pr-8 py-2 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-all w-full"
    />
    {value && (
      <button onClick={() => onChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
        <TbX size={13} />
      </button>
    )}
  </div>
);

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-xl rounded-xl p-3 text-[12.5px]">
      <p className="font-bold text-gray-900 mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-bold text-gray-900">{p.name === 'Revenue' ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const KPICard = ({ icon, label, value, change, changeLabel, color, sparkData }) => {
  const isPositive = change >= 0;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
        <span className={`inline-flex items-center gap-1 text-[12px] font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
          {isPositive ? <TbTrendingUp size={12} /> : <TbTrendingDown size={12} />}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="text-[13px] text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-[24px] font-extrabold text-gray-900 tracking-tight">{value}</p>
      <p className="text-[11.5px] text-gray-400 mt-1">{changeLabel}</p>
      <div className="mt-3 -mx-1">
        <ResponsiveContainer width="100%" height={40}>
          <AreaChart data={sparkData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={2} fill={`url(#spark-${label})`} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ORDERS — delegates to standalone Orders page
   ConfirmDialog, OrderDetailModal, OrdersTable
   have been removed. The Orders tab now renders
   the full-featured <Orders> page directly.
───────────────────────────────────────────── */
/* ═══════════════════════════════════════════
   ACTIVITY FEED — REAL DATA
═══════════════════════════════════════════ */
const ActivityFeed = ({ orders = [], products = [] }) => {
  /* Build a real activity timeline from the most recent orders and stock alerts */
  const activities = useMemo(() => {
    const items = [];

    // Recent orders (last 5)
    const recent = [...orders]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    recent.forEach(o => {
      const name = `${o.address?.firstName || ''} ${o.address?.lastName || ''}`.trim() || 'Customer';
      const amount = Number(o.finalAmount) || Number(o.amount) || 0;
      const ts = o.date ? new Date(o.date) : null;

      if (o.status === 'Delivered') {
        items.push({
          icon: <TbCircleCheck size={14} className="text-emerald-600" />,
          bg: 'bg-emerald-50',
          text: `Order delivered to ${name}`,
          time: ts,
          type: 'delivery',
        });
      } else if (o.status === 'Shipped') {
        items.push({
          icon: <TbTruck size={14} className="text-blue-600" />,
          bg: 'bg-blue-50',
          text: `Order shipped to ${name}`,
          time: ts,
          type: 'shipped',
        });
      } else if (o.status === 'Cancelled') {
        items.push({
          icon: <TbX size={14} className="text-red-500" />,
          bg: 'bg-red-50',
          text: `Order cancelled by ${name}`,
          time: ts,
          type: 'cancel',
        });
      } else {
        items.push({
          icon: <TbShoppingCart size={14} className="text-indigo-600" />,
          bg: 'bg-indigo-50',
          text: `New order $${amount.toLocaleString('en-US')} from ${name}`,
          time: ts,
          type: 'order',
        });
      }

      // Payment events
      if (o.payment && amount > 0) {
        items.push({
          icon: <TbCurrencyDollar size={14} className="text-emerald-600" />,
          bg: 'bg-emerald-50',
          text: `Payment $${amount.toLocaleString('en-US')} received from ${name}`,
          time: ts,
          type: 'payment',
        });
      }
    });

    // Stock alerts from products
    products
      .filter(p => {
        const stock = Array.isArray(p.sizes)
          ? p.sizes.reduce((s, sz) => s + (Number(sz?.stock) || 0), 0)
          : Number(p.stock) || 0;
        return stock === 0 || stock <= 5;
      })
      .slice(0, 3)
      .forEach(p => {
        const stock = Array.isArray(p.sizes)
          ? p.sizes.reduce((s, sz) => s + (Number(sz?.stock) || 0), 0)
          : Number(p.stock) || 0;
        items.push({
          icon: <TbAlertTriangle size={14} className={stock === 0 ? 'text-red-500' : 'text-amber-600'} />,
          bg: stock === 0 ? 'bg-red-50' : 'bg-amber-50',
          text: stock === 0
            ? `"${p.name}" is out of stock`
            : `"${p.name}" — only ${stock} left`,
          time: null,
          type: 'stock',
        });
      });

    // Sort by time descending (stock alerts have null time — push to end)
    return items
      .sort((a, b) => {
        if (!a.time && !b.time) return 0;
        if (!a.time) return 1;
        if (!b.time) return -1;
        return b.time - a.time;
      })
      .slice(0, 8);
  }, [orders, products]);

  const fmtRel = (ts) => {
    if (!ts) return 'Stock alert';
    const m = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50">
        <h2 className="text-[15px] font-bold text-gray-900">Activity Feed</h2>
        <p className="text-[12px] text-gray-400 mt-0.5">Live store events from real orders</p>
      </div>

      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
          <TbShoppingCart size={28} className="opacity-30" />
          <p className="text-[13px]">No activity yet</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {activities.map((a, i) => (
            <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
              <div className={`w-7 h-7 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {a.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-gray-700 font-medium leading-snug">{a.text}</p>
                <p className="text-[11.5px] text-gray-400 mt-0.5 flex items-center gap-1">
                  <TbClock size={11} /> {fmtRel(a.time)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="px-5 py-3 border-t border-gray-50">
        <p className="text-[11.5px] text-gray-400">{activities.length} recent event{activities.length !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN DASHBOARD — REAL DATA
═══════════════════════════════════════════ */
const Dashboard = ({ token }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [greeting, setGreeting] = useState('Good Morning');
  const [liveTime, setLiveTime] = useState(new Date());

  // All real data fetched once and shared down
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingO, setLoadingO] = useState(true);
  const [loadingP, setLoadingP] = useState(true);

  const context = useContext(MyContext)

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening');
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ── Fetch orders ── */
  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoadingO(true);
    try {
      const res = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (res.data.success) setOrders((res.data.orders || []).slice().reverse());
      else toast.error(res.data.message);
    } catch (e) { toast.error(e?.message || 'Failed to load orders'); }
    finally { setLoadingO(false); }
  }, [token]);

  /* ── Fetch products ── */
  const fetchProducts = useCallback(async () => {
    if (!token) return;
    setLoadingP(true);
    try {
      const res = await axios.get(backendUrl + '/api/product/list', { headers: { token } });
      if (res.data.success) setProducts(res.data.products || []);
      else toast.error(res.data.message);
    } catch (e) { toast.error(e?.message || 'Failed to load products'); }
    finally { setLoadingP(false); }
  }, [token]);

  const refreshAll = useCallback(() => {
    fetchOrders();
    fetchProducts();
  }, [fetchOrders, fetchProducts]);

  useEffect(() => { refreshAll(); }, [refreshAll]);

  /* ── Derived KPI stats from real data ── */
  const kpi = useMemo(() => {
    const now = new Date();
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const curY = now.getFullYear();
    const curM = now.getMonth();

    // Date helpers
    const isToday = (ts) => {
      const d = new Date(ts);
      return d.getDate() === now.getDate() && d.getMonth() === curM && d.getFullYear() === curY;
    };
    const thisMonthStart = new Date(curY, curM, 1);
    const prevMonthStart = new Date(curY, curM - 1, 1);
    const prevMonthEnd = new Date(curY, curM, 0, 23, 59, 59);

    const amt = (o) => Number(o.finalAmount) || Number(o.amount) || 0;
    const statusIs = (o, ...ss) => ss.some(s => (o.status || '').toLowerCase() === s.toLowerCase());

    // Partition orders by time window
    const todayOrders = orders.filter(o => isToday(o.date));
    const thisMonthOrders = orders.filter(o => new Date(o.date) >= thisMonthStart);
    const prevMonthOrders = orders.filter(o => {
      const d = new Date(o.date);
      return d >= prevMonthStart && d <= prevMonthEnd;
    });

    // Revenue
    // GMV = total value of ALL orders placed (including unpaid)
    // paidRevenue = only orders where payment is confirmed
    const totalGMV = orders.reduce((s, o) => s + amt(o), 0);
    const totalRevenue = totalGMV;   // show GMV as headline (all orders)
    const paidRevenue = orders.filter(o => o.payment).reduce((s, o) => s + amt(o), 0);
    const todayRevenue = todayOrders.reduce((s, o) => s + amt(o), 0);
    const thisMonthRev = thisMonthOrders.reduce((s, o) => s + amt(o), 0);
    const prevMonthRev = prevMonthOrders.reduce((s, o) => s + amt(o), 0);
    const revenueChange = prevMonthRev > 0 ? Math.round(((thisMonthRev - prevMonthRev) / prevMonthRev) * 100)
      : thisMonthRev > 0 ? 100 : 0;
    const ordersChange = prevMonthOrders.length > 0
      ? Math.round(((thisMonthOrders.length - prevMonthOrders.length) / prevMonthOrders.length) * 100)
      : thisMonthOrders.length > 0 ? 100 : 0;

    // Status counts — match real status strings used in Orders.jsx
    const shipped = orders.filter(o => statusIs(o, 'Shipped')).length;
    const delivered = orders.filter(o => statusIs(o, 'Delivered')).length;
    const cancelled = orders.filter(o => statusIs(o, 'Cancelled')).length;
    const pending = orders.filter(o => statusIs(o, 'Order Placed', 'Packing', 'pending')).length;
    const inTransit = orders.filter(o => statusIs(o, 'Shipped', 'Out for delivery')).length;

    // Stock helpers
    const getStock = (p) => Array.isArray(p.sizes)
      ? p.sizes.reduce((s, sz) => s + (Number(sz?.stock) || 0), 0)
      : Number(p.stock) || 0;
    const outOfStock = products.filter(p => getStock(p) === 0).length;
    const lowStock = products.filter(p => { const st = getStock(p); return st > 0 && st <= 10; }).length;

    // Month-over-month trend for mini stats
    const shippedPrev = prevMonthOrders.filter(o => statusIs(o, 'Shipped')).length;
    const deliveredPrev = prevMonthOrders.filter(o => statusIs(o, 'Delivered')).length;
    const cancelledPrev = prevMonthOrders.filter(o => statusIs(o, 'Cancelled')).length;
    const pendingPrev = prevMonthOrders.filter(o => statusIs(o, 'Order Placed', 'Packing', 'pending')).length;
    const pct = (cur, prev) => prev > 0 ? Math.round(((cur - prev) / prev) * 100) : cur > 0 ? 100 : 0;

    // ── Spark lines: rolling 12 months for current calendar year ──
    // revenueByMonth: cumulative paid revenue per calendar month
    const revenueByMonth = MONTHS.map((_, mi) => ({
      v: orders
        .filter(o => new Date(o.date).getFullYear() === curY && new Date(o.date).getMonth() === mi)
        .reduce((s, o) => s + amt(o), 0),
    }));

    // ordersByMonth: order count per calendar month this year
    const ordersByMonth = MONTHS.map((_, mi) => ({
      v: orders.filter(o => new Date(o.date).getFullYear() === curY && new Date(o.date).getMonth() === mi).length,
    }));

    // deliveredByMonth: delivered count per month this year (for "Delivered" KPI spark)
    const deliveredByMonth = MONTHS.map((_, mi) => ({
      v: orders.filter(o =>
        statusIs(o, 'Delivered') &&
        new Date(o.date).getFullYear() === curY &&
        new Date(o.date).getMonth() === mi
      ).length,
    }));

    // productStockByCategory: stock health per product category (for Products KPI spark)
    const catStock = {};
    products.forEach(p => {
      const cat = p.category || 'Other';
      if (!catStock[cat]) catStock[cat] = 0;
      catStock[cat] += getStock(p);
    });
    const productSparkData = Object.values(catStock).length > 0
      ? Object.values(catStock).map(v => ({ v }))
      : MONTHS.map(() => ({ v: products.length }));

    return {
      totalRevenue, paidRevenue, todayRevenue, thisMonthRev, prevMonthRev, revenueChange,
      totalOrders: orders.length, todayOrders: todayOrders.length,
      ordersChange,
      totalProducts: products.length, outOfStock, lowStock,
      shipped, delivered, cancelled, pending, inTransit,
      shippedTrend: pct(inTransit, shippedPrev),
      deliveredTrend: pct(delivered, deliveredPrev),
      cancelledTrend: pct(cancelled, cancelledPrev),
      pendingTrend: pct(pending, pendingPrev),
      revenueByMonth, ordersByMonth, deliveredByMonth, productSparkData,
    };
  }, [orders, products]);

  const TABS = [
    { id: 'overview', label: 'Overview', icon: <TbChartBar size={15} /> },
    { id: 'orders', label: 'Orders', icon: <TbShoppingCart size={15} /> },
    { id: 'products', label: 'Products', icon: <TbPackage size={15} /> },
    { id: 'users', label: 'Users', icon: <TbUsers size={15} /> },
    { id: 'analytics', label: 'Analytics', icon: <TbChartPie size={15} /> },
  ];

  const loading = loadingO || loadingP;

  const KPI_CARDS = [
    {
      icon: <TbCurrencyDollar size={20} className="text-indigo-600" />,
      label: 'Total GMV',
      value: loading ? '…' : `$${kpi.totalRevenue.toLocaleString('en-US')}`,
      change: kpi.revenueChange,
      changeLabel: `$${kpi.paidRevenue.toLocaleString('en-US')} collected · $${kpi.todayRevenue.toLocaleString('en-US')} today`,
      color: 'bg-indigo-50',
      sparkData: kpi.revenueByMonth,
    },
    {
      icon: <TbShoppingCart size={20} className="text-emerald-600" />,
      label: 'Total Orders',
      value: loading ? '…' : kpi.totalOrders.toLocaleString(),
      change: kpi.ordersChange,
      changeLabel: `${kpi.todayOrders} today · ${kpi.ordersChange >= 0 ? '+' : ''}${kpi.ordersChange}% vs last month`,
      color: 'bg-emerald-50',
      sparkData: kpi.ordersByMonth,
    },
    {
      icon: <TbPackage size={20} className="text-amber-600" />,
      label: 'Products',
      value: loading ? '…' : kpi.totalProducts.toLocaleString(),
      change: kpi.outOfStock > 0 ? -kpi.outOfStock : 0,
      changeLabel: `${kpi.outOfStock} out of stock · ${kpi.lowStock} low stock`,
      color: 'bg-amber-50',
      sparkData: kpi.productSparkData,
    },
    {
      icon: <TbCircleCheck size={20} className="text-violet-600" />,
      label: 'Delivered',
      value: loading ? '…' : kpi.delivered.toLocaleString(),
      change: kpi.deliveredTrend,
      changeLabel: `${kpi.pending} pending · ${kpi.cancelled} cancelled`,
      color: 'bg-violet-50',
      sparkData: kpi.deliveredByMonth,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* BANNER */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 px-6 py-6 mb-6 mt-16">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-indigo-200 text-[13px] font-medium mb-1 flex items-center gap-2">
              <TbCalendar size={13} /> {liveTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} ·
              <TbClock size={13} /> {liveTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <h1 className="text-[26px] font-extrabold text-white tracking-tight">{greeting}, Admin 👋</h1>
            <p className="text-indigo-200 text-[14px] mt-1">
              {loading ? 'Loading your store data…' : `${kpi.totalOrders} orders · $${kpi.totalRevenue.toLocaleString('en-US')} GMV · $${kpi.paidRevenue.toLocaleString('en-US')} collected`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white">
              <p className="text-[11px] text-indigo-200 font-medium">Today's Revenue</p>
              <p className="text-[20px] font-extrabold">
                {loading ? '…' : `$${kpi.todayRevenue.toLocaleString('en-US')}`}
              </p>
              <p className="text-[11px] text-indigo-200 flex items-center gap-1">
                {kpi.todayOrders} order{kpi.todayOrders !== 1 ? 's' : ''} today
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Btn variant="primary" size="sm" className="!bg-white !text-indigo-700 !border-white hover:!bg-indigo-50"
                onClick={() => context.setIsOpenFullScreenPanel({ open: true, modal: 'Add product' })}>
                <TbPlus size={14} /> Add Product
              </Btn>
              <Btn size="sm" className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
                onClick={refreshAll} disabled={loading}>
                <TbRefresh size={14} className={loading ? 'animate-spin' : ''} /> Refresh
              </Btn>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-10">
        {/* TABS */}
        <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 shadow-sm mb-6 w-fit overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all whitespace-nowrap
                ${activeTab === t.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {KPI_CARDS.map((card, i) => <KPICard key={i} {...card} />)}
            </div>

            {/* Mini order status stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MiniStat icon={<TbTruck size={16} className="text-blue-600" />} label="In Transit" value={loading ? '…' : kpi.inTransit} color="border-blue-100 bg-blue-50/50" trend={loading ? undefined : kpi.shippedTrend} />
              <MiniStat icon={<TbCircleCheck size={16} className="text-emerald-600" />} label="Delivered" value={loading ? '…' : kpi.delivered} color="border-emerald-100 bg-emerald-50/50" trend={loading ? undefined : kpi.deliveredTrend} />
              <MiniStat icon={<TbClock size={16} className="text-amber-600" />} label="Pending" value={loading ? '…' : kpi.pending} color="border-amber-100 bg-amber-50/50" trend={loading ? undefined : kpi.pendingTrend} />
              <MiniStat icon={<TbX size={16} className="text-red-500" />} label="Cancelled" value={loading ? '…' : kpi.cancelled} color="border-red-100 bg-red-50/50" trend={loading ? undefined : kpi.cancelledTrend} />
            </div>

            {/* Charts + Activity Feed */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
              <Analytics orders={orders} products={products} />
              <ActivityFeed orders={orders} products={products} />
            </div>
          </div>
        )}

        {activeTab === 'orders' && <Orders token={token} />}
        {activeTab === 'products' && <ProductsList token={token} />}
        {activeTab === 'users' && <Users token={token} />}
        {activeTab === 'analytics' && (
          <Analytics orders={orders} products={products} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;