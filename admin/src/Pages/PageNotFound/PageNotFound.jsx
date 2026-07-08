import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    TbHome, TbArrowLeft, TbPackage, TbShoppingCart,
    TbCategory, TbLayoutDashboard, TbSearch,
} from 'react-icons/tb';

/* ════════════════════════════════════════════
   QUICK LINK CHIP
════════════════════════════════════════════ */
const QuickLink = ({ to, icon, label }) => (
    <Link
        to={to}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm text-[13px] font-semibold text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md transition-all"
    >
        {icon}
        {label}
    </Link>
);

/* ════════════════════════════════════════════
   404 — NOT FOUND PAGE
════════════════════════════════════════════ */
const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-[#f3f3f1] flex items-center justify-center overflow-hidden px-5">

            {/* ── Decorative gradient blobs (matches dashboard hero banner) ── */}
            <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 opacity-20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-500 opacity-20 blur-3xl" />

            <div className="relative w-full max-w-lg text-center">

                {/* ── Brand mark ── */}
                <div className="flex items-center justify-center gap-2 my-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 rotate-45 flex items-center justify-center shadow-sm">
                        <div className="w-3 h-3 rounded-sm bg-white -rotate-45" />
                    </div>
                    <div className="text-left leading-none">
                        <p className="text-[13px] font-extrabold text-gray-900 tracking-tight">LL Leather</p>
                        <p className="text-[9px] font-bold text-gray-400 tracking-widest ">LOVERS · ADMIN</p>
                    </div>
                </div>

                {/* ── Illustration ── */}
                <div className="relative w-40 h-40 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 shadow-lg flex items-center justify-center animate-[float_3s_ease-in-out_infinite]">
                            <TbPackage size={34} className="text-indigo-500" />
                        </div>
                    </div>
                    <span className="absolute top-3 right-4 w-3 h-3 rounded-full bg-amber-400" />
                    <span className="absolute bottom-6 left-2 w-2 h-2 rounded-full bg-purple-400" />
                </div>

                {/* ── 404 headline ── */}
                <p className="text-[72px] font-extrabold leading-none tracking-tight bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    404
                </p>
                <h1 className="text-[20px] font-extrabold text-gray-900 mt-2">Page not found</h1>
                <p className="text-[13.5px] text-gray-500 mt-2 leading-relaxed max-w-sm mx-auto">
                    The page you're looking for doesn't exist, was moved, or the URL was typed
                    incorrectly. Let's get you back on track.
                </p>

                {/* ── Actions ── */}
                <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm text-[13px] font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        <TbArrowLeft size={16} /> Go Back
                    </button>
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-[13px] font-semibold shadow-sm hover:shadow-md hover:opacity-95 transition-all"
                    >
                        <TbHome size={16} /> Back to Dashboard
                    </Link>
                </div>

                {/* ── Quick links ── */}
                <div className="mt-10">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Or jump straight to
                    </p>
                    <div className="flex items-center justify-center gap-2.5 flex-wrap">
                        <QuickLink to="/" icon={<TbLayoutDashboard size={15} />} label="Dashboard" />
                        <QuickLink to="/orders" icon={<TbShoppingCart size={15} />} label="Orders" />
                        <QuickLink to="/list" icon={<TbPackage size={15} />} label="Products" />
                        <QuickLink to="/category" icon={<TbCategory size={15} />} label="Category" />
                    </div>
                </div>

                {/* ── Search hint ── */}
                <div className="mt-8 flex items-center justify-center gap-1.5 text-[11.5px] text-gray-400">
                    <TbSearch size={13} />
                    <span>Tip: use the search bar in the header to find what you need</span>
                </div>
            </div>

            {/* Local keyframes for the floating icon */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
            `}</style>
        </div>
    );
};

export default PageNotFound;