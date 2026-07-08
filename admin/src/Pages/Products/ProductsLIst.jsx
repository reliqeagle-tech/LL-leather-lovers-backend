import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { backendUrl, currency, MyContext } from '../../App'
import { HiOutlineSearch, HiOutlineRefresh } from 'react-icons/hi'
import { MdOutlineGridView, MdOutlineTableRows, MdOutlineInventory2 } from 'react-icons/md'
import { TbEdit, TbTrash, TbEye, TbChartBar, TbPackage, TbStar, TbAlertTriangle, TbPlus, TbX, TbFileExport } from 'react-icons/tb'
import { FiChevronUp, FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { BsBoxSeam } from 'react-icons/bs'

/* ═══════════════════ HELPERS ═══════════════════ */
const getStock = (sizes) => {
  if (!sizes || !Array.isArray(sizes)) return 0
  return sizes.reduce((sum, s) => sum + (Number(s?.stock) || 0), 0)
}

// const getDiscount = (price, discountPrice) => {
//   if (!discountPrice || !price || +discountPrice >= +price) return null
//   return Math.round((1 - discountPrice / price) * 100)
// }

const getDiscount = (price, discountPrice) => {
  if (!discountPrice || +discountPrice <= 0 || +discountPrice >= 100) return null
  return Math.round(+discountPrice)
}

const formatId = (id) => id ? `#${id.toString().slice(-6).toUpperCase()}` : '—'

/* ═══════════════════ IMAGE MODAL ═══════════════════ */
const ImgModal = ({ images, start, name, onClose }) => {
  const [cur, setCur] = useState(start ?? 0)
  const imgs = Array.isArray(images) ? images.filter(Boolean) : [images].filter(Boolean)

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCur(p => Math.max(0, p - 1))
      if (e.key === 'ArrowRight') setCur(p => Math.min(imgs.length - 1, p + 1))
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [imgs.length, onClose])

  if (!imgs[cur]) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center gap-4 max-w-[90vw]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg text-gray-700 hover:rotate-90 transition-transform z-10"
        >
          <TbX size={14} />
        </button>

        <img
          src={imgs[cur]}
          alt={name}
          className="max-w-[80vw] max-h-[70vh] rounded-xl object-contain shadow-2xl"
        />

        {cur > 0 && (
          <button
            onClick={() => setCur(p => p - 1)}
            className="absolute left-[-52px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <FiChevronLeft size={22} />
          </button>
        )}
        {cur < imgs.length - 1 && (
          <button
            onClick={() => setCur(p => p + 1)}
            className="absolute right-[-52px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <FiChevronRight size={22} />
          </button>
        )}

        {imgs.length > 1 && (
          <div className="flex gap-2">
            {imgs.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setCur(i)}
                className={`w-12 h-12 rounded-lg object-cover cursor-pointer border-2 transition-all ${i === cur ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-75'}`}
              />
            ))}
          </div>
        )}
        <p className="text-white/50 text-xs">{name} · {cur + 1}/{imgs.length} · Esc to close</p>
      </div>
    </div>
  )
}

/* ═══════════════════ CONFIRM MODAL ═══════════════════ */
const ConfirmModal = ({ title, desc, onConfirm, onCancel }) => (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
    onClick={onCancel}
  >
    <div
      className="bg-white rounded-2xl p-7 w-[360px] max-w-[90vw] shadow-2xl text-center animate-slideUp"
      onClick={e => e.stopPropagation()}
    >
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
        <TbTrash size={26} className="text-red-500" />
      </div>
      <h3 className="text-[17px] font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">{desc}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)

/* ═══════════════════ SKELETON ROW ═══════════════════ */
const SkeletonRow = () => (
  <tr className="border-b border-gray-100">
    {[40, 240, 100, 100, 90, 70, 80, 80, 110, 130].map((w, i) => (
      <td key={i} className="px-4 py-3.5">
        <div className="h-4 bg-gray-100 rounded-md animate-pulse" style={{ width: w }} />
      </td>
    ))}
  </tr>
)

/* ═══════════════════ STAT CARD ═══════════════════ */
const StatCard = ({ icon, value, label, color, loading }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      {icon}
    </div>
    <div>
      <div className="text-[22px] font-extrabold text-gray-900 leading-none tracking-tight">
        {loading
          ? <div className="w-12 h-6 bg-gray-100 rounded animate-pulse" />
          : Number(value ?? 0).toLocaleString()
        }
      </div>
      <div className="text-[11.5px] text-gray-400 font-medium mt-1">{label}</div>
    </div>
  </div>
)

/* ═══════════════════ BADGE ═══════════════════ */
const Badge = ({ type, children }) => {
  const styles = {
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200',
    red: 'bg-red-50 text-red-600 border border-red-200',
    blue: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    gray: 'bg-gray-50 text-gray-600 border border-gray-200',
    violet: 'bg-violet-50 text-violet-700 border border-violet-200',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${styles[type] || styles.gray}`}>
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
const ProductsList = ({ token }) => {
  const navigate = useNavigate()
  const context = useContext(MyContext)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [subCatFilter, setSubCatFilter] = useState('all')
  const [stockFilter, setStockFilter] = useState('all')   // NEW: all | in | low | out
  const [sortBy, setSortBy] = useState('newest')
  const [sortDir, setSortDir] = useState('desc')
  const [viewMode, setViewMode] = useState('table')
  const [selected, setSelected] = useState([])
  const [deletingIds, setDeletingIds] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [imgModal, setImgModal] = useState(null)
  const [page, setPage] = useState(1)
  const PER_PAGE = 12

  /* ── fetch ── */
  const fetchList = async () => {
    setLoading(true)
    try {
      const res = await axios.get(backendUrl + '/api/product/list')
      if (res.data.success) setList(res.data.products || [])
      else toast.error(res.data.message)
    } catch (e) {
      toast.error(e?.message || 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  /* ── delete single ── */
  const removeProduct = async (id) => {
    setDeletingIds(p => [...p, id])
    try {
      const res = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )
      if (res.data.success) {
        toast.success('Product removed')
        setList(prev => prev.filter(p => p._id !== id))
        setSelected(prev => prev.filter(x => x !== id))
      } else {
        toast.error(res.data.message)
      }
    } catch (e) {
      toast.error(e?.message || 'Delete failed')
    } finally {
      setDeletingIds(p => p.filter(x => x !== id))
    }
  }

  /* ── bulk delete ── */
  const removeBulk = async () => {
    const ids = [...selected]
    // Sequential deletes to avoid rate limiting
    for (const id of ids) await removeProduct(id)
    setSelected([])
  }

  /* ── export CSV ── */
  const exportCSV = () => {
    const rows = [['ID', 'Name', 'Category', 'Sub-Category', 'Price', 'Discount Price', 'Stock', 'Bestseller']]
    filtered.forEach(p => rows.push([
      p._id,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      p.category || '',
      p.subCategory || '',
      p.price || 0,
      p.discountPrice || '',
      getStock(p.sizes),
      p.bestseller ? 'Yes' : 'No',
    ]))
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `products_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Products exported!')
  }

  useEffect(() => { fetchList() }, [])
  useEffect(() => { setPage(1) }, [search, catFilter, subCatFilter, stockFilter, sortBy])

  /* ── derived lists for filter dropdowns ── */
  const categories = ['all', ...new Set(list.map(p => p.category).filter(Boolean))]
  const subCategories = [
    'all',
    ...new Set(
      list
        .filter(p => catFilter === 'all' || p.category === catFilter)
        .map(p => p.subCategory)
        .filter(Boolean)
    ),
  ]

  /* ── filtering + sorting ── */
  const filtered = list
    .filter(p => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q))
      const matchCat = catFilter === 'all' || p.category === catFilter
      const matchSub = subCatFilter === 'all' || p.subCategory === subCatFilter
      const stock = getStock(p.sizes)
      const matchStock =
        stockFilter === 'all' ? true :
          stockFilter === 'out' ? stock === 0 :
            stockFilter === 'low' ? stock > 0 && stock <= 10 :
        /* in */                  stock > 10
      return matchSearch && matchCat && matchSub && matchStock
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return sortDir === 'asc'
          ? a._id.localeCompare(b._id)
          : b._id.localeCompare(a._id)
      }
      if (sortBy === 'name') {
        const r = (a.name || '').localeCompare(b.name || '')
        return sortDir === 'asc' ? r : -r
      }
      const getVal = (p) =>
        sortBy === 'price' ? (+p.price || 0) : getStock(p.sizes)
      return sortDir === 'asc'
        ? getVal(a) - getVal(b)
        : getVal(b) - getVal(a)
    })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  /* ── selection helpers ── */
  const toggleSelect = (id) =>
    setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const toggleAll = () =>
    setSelected(selected.length === paginated.length ? [] : paginated.map(p => p._id))

  /* ── sort helper ── */
  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir('asc') }
  }

  /* ── stats ── */
  const totalStock = list.reduce((s, p) => s + getStock(p.sizes), 0)
  const bestsellerCount = list.filter(p => p.bestseller).length
  const outOfStock = list.filter(p => getStock(p.sizes) === 0).length

  /* ── shared styles ── */
  const selectCls = "border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-700 bg-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMiI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiLz48L3N2Zz4=')] bg-no-repeat bg-[right_10px_center]"

  /* ── sort button ── */
  const SortBtn = ({ col, label }) => (
    <button
      onClick={() => handleSort(col)}
      className={`flex items-center gap-1 group transition-colors ${sortBy === col ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-700'}`}
    >
      {label}
      <span className="flex flex-col opacity-60 group-hover:opacity-100">
        <FiChevronUp size={9} className={sortBy === col && sortDir === 'asc' ? 'text-indigo-600 opacity-100' : ''} />
        <FiChevronDown size={9} className={sortBy === col && sortDir === 'desc' ? 'text-indigo-600 opacity-100' : ''} />
      </span>
    </button>
  )

  /* ══════════════════════════════════════
     TABLE VIEW
  ══════════════════════════════════════ */
  const renderTable = () => (
    <div className="mx-6 mb-8 overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-100">
            <th className="px-4 py-3.5 text-left w-10">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
                checked={paginated.length > 0 && selected.length === paginated.length}
                onChange={toggleAll}
              />
            </th>
            <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 min-w-[220px]">
              <SortBtn col="name" label="Product" />
            </th>
            <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Category</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Sub-cat</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <SortBtn col="price" label="Price" />
            </th>
            <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <SortBtn col="stock" label="Stock" />
            </th>
            <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Colors</th>
            <th className="px-4 py-3.5 min-w-[160px] text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Sizes</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 min-w-[140px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {loading ? (
            Array(8).fill(0).map((_, i) => <SkeletonRow key={i} />)
          ) : paginated.length === 0 ? (
            <tr>
              <td colSpan={10}>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <BsBoxSeam size={28} className="text-gray-300" />
                  </div>
                  <h3 className="text-[16px] font-bold text-gray-700 mb-1">No products found</h3>
                  <p className="text-[13px] text-gray-400">Try adjusting your search or filters</p>
                  <button
                    onClick={() => { setSearch(''); setCatFilter('all'); setSubCatFilter('all'); setStockFilter('all') }}
                    className="mt-4 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-[13px] font-semibold hover:bg-indigo-100 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </td>
            </tr>
          ) : paginated.map((item) => {
            const stock = getStock(item.sizes)
            const disc = getDiscount(item.price, item.discountPrice)
            const imgs = Array.isArray(item.image) ? item.image.filter(Boolean) : [item.image].filter(Boolean)
            const colors = item.color || []
            const sizes = item.sizes || []
            const isDeleting = deletingIds.includes(item._id)

            return (
              <tr
                key={item._id}
                className={`transition-colors group
                  ${selected.includes(item._id) ? 'bg-indigo-50/60' : 'hover:bg-gray-50/60'}
                  ${isDeleting ? 'opacity-40 pointer-events-none' : ''}`}
              >
                {/* Checkbox */}
                <td className="px-4 py-3.5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
                    checked={selected.includes(item._id)}
                    onChange={() => toggleSelect(item._id)}
                  />
                </td>

                {/* Product */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50 cursor-pointer group/img"
                      onClick={() => imgs.length > 0 && setImgModal({ images: imgs, name: item.name, start: 0 })}
                    >
                      {imgs[0]
                        ? <img src={imgs[0]} alt={item.name} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-200" />
                        : <div className="w-full h-full flex items-center justify-center text-gray-200"><BsBoxSeam size={20} /></div>
                      }
                      {imgs.length > 1 && (
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-bold rounded px-1 leading-tight">
                          +{imgs.length - 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <div
                        className="text-[13.5px] font-semibold text-gray-900 leading-snug cursor-pointer hover:text-indigo-600 transition-colors line-clamp-2 max-w-[180px]"
                        onClick={() => navigate(`/update-product/${item._id}`)}
                      >
                        {item.name}
                      </div>
                      <div className="text-[10.5px] text-gray-400 font-mono mt-0.5">SKU : {item.sku}</div>
                      {item.bestseller && (
                        <span className="inline-block mt-0.5 text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                          ⭐ Bestseller
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3.5">
                  <Badge type="gray">{item.category || '—'}</Badge>
                </td>

                {/* Sub-cat */}
                <td className="px-4 py-3.5">
                  <Badge type="gray">{item.subCategory || '—'}</Badge>
                </td>

                {/* Price */}
                <td className="px-4 py-3.5">
                  {/* <div className="text-[14px] font-bold text-gray-900">
                    {currency}{(item.discountPrice || item.price || 0).toLocaleString()}
                  </div>
                  {disc && (
                    <>
                      <div className="text-[11px] text-gray-400 line-through">{currency}{(+item.price).toLocaleString()}</div>
                      <div className="text-[10.5px] text-emerald-600 font-bold">{disc}% off</div>
                    </>
                  )} */}
                  <div className="text-[14px] font-bold text-gray-900">
                    {currency}{(disc ? (item.price - (item.price * disc) / 100) : (item.price || 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  {disc && (
                    <>
                      <div className="text-[11px] text-gray-400 line-through">{currency}{(+item.price).toLocaleString()}</div>
                      <div className="text-[10.5px] text-emerald-600 font-bold whitespace-nowrap">{disc}% off</div>
                    </>
                  )}
                </td>

                {/* Stock */}
                <td className="px-4 py-3.5">
                  <div className={`text-[13px] font-bold ${stock > 10 ? 'text-emerald-600' : stock > 0 ? 'text-amber-600' : 'text-red-500'}`}>
                    {stock > 0 ? stock.toLocaleString() : 'Out'}
                  </div>
                  {stock > 0 && stock <= 10 && (
                    <div className="text-[10px] text-amber-500 font-semibold">Low stock</div>
                  )}
                </td>

                {/* Colors */}
                <td className="px-4 py-3.5">
                  {colors.length > 0 ? (
                    <div className="flex gap-1 flex-wrap">
                      {colors.slice(0, 5).map((c, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                          style={{ backgroundColor: c?.hex || c }}
                          title={c?.name || c}
                        />
                      ))}
                      {colors.length > 5 && (
                        <span className="text-[10.5px] text-gray-400 font-semibold self-center">+{colors.length - 5}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-300 text-[12px]">—</span>
                  )}
                </td>

                {/* Sizes */}
                <td className="px-4 py-3.5">
                  {sizes.length > 0 ? (
                    <div className="flex gap-1 flex-wrap">
                      {sizes.slice(0, 4).map((s, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10px] font-bold">
                          {typeof s === 'object' ? (s.size || '?') : s}
                        </span>
                      ))}
                      {sizes.length > 4 && (
                        <span className="bg-gray-100 text-gray-500 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10px] font-bold">
                          +{sizes.length - 4}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-300 text-[12px]">—</span>
                  )}
                </td>

                {/* Status */}
                <td className="px-4 py-3.5">
                  <div className="flex flex-col gap-1">
                    {stock === 0
                      ? <Badge type="red">Out of stock</Badge>
                      : stock <= 10
                        ? <Badge type="amber">Low stock</Badge>
                        : <Badge type="green">In stock</Badge>
                    }
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                    <button
                      title="Preview"
                      onClick={() => imgs.length > 0 && setImgModal({ images: imgs, name: item.name, start: 0 })}
                      className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
                    >
                      <TbEye size={15} />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => navigate(`/update-product/${item._id}`)}
                      className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-all"
                    >
                      <TbEdit size={15} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => setConfirmDelete({ id: item._id, name: item.name })}
                      className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-100 transition-all"
                      disabled={isDeleting}
                    >
                      {isDeleting
                        ? <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                        : <TbTrash size={15} />
                      }
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

  /* ══════════════════════════════════════
     GRID VIEW
  ══════════════════════════════════════ */
  const renderGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-6 mb-8">
      {loading ? (
        Array(10).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="w-full aspect-square bg-gray-100 animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-gray-100 rounded-md animate-pulse w-3/5" />
              <div className="h-4 bg-gray-100 rounded-md animate-pulse w-4/5" />
              <div className="h-4 bg-gray-100 rounded-md animate-pulse w-2/5" />
            </div>
          </div>
        ))
      ) : paginated.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-20">
          <BsBoxSeam size={32} className="text-gray-200 mb-3" />
          <h3 className="text-[15px] font-bold text-gray-600 mb-1">No products found</h3>
          <p className="text-[13px] text-gray-400">Try adjusting your filters</p>
          <button
            onClick={() => { setSearch(''); setCatFilter('all'); setSubCatFilter('all'); setStockFilter('all') }}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-[13px] font-semibold hover:bg-indigo-100 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : paginated.map((item) => {
        const stock = getStock(item.sizes)
        const disc = getDiscount(item.price, item.discountPrice)
        const imgs = Array.isArray(item.image) ? item.image.filter(Boolean) : [item.image].filter(Boolean)
        const colors = item.color || []

        return (
          <div
            key={item._id}
            className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group
              ${selected.includes(item._id) ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-gray-100'}`}
          >
            {/* Image */}
            <div
              className="relative overflow-hidden aspect-square cursor-pointer bg-gray-50"
              onClick={() => imgs.length > 0 && setImgModal({ images: imgs, name: item.name, start: 0 })}
            >
              {imgs[0]
                ? <img src={imgs[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                : <div className="w-full h-full flex items-center justify-center"><BsBoxSeam size={36} className="text-gray-200" /></div>
              }

              {item.bestseller && (
                <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  ⭐ BESTSELLER
                </span>
              )}
              {imgs.length > 1 && (
                <span className="absolute top-2 right-2 bg-black/55 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  +{imgs.length - 1}
                </span>
              )}

              {/* Checkbox overlay */}
              <div
                onClick={e => { e.stopPropagation(); toggleSelect(item._id) }}
                className={`absolute bottom-2 right-2 w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all text-xs font-bold
                  ${selected.includes(item._id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-300 text-transparent hover:border-indigo-400'}`}
              >
                ✓
              </div>
            </div>

            {/* Body */}
            <div className="p-3">
              <div className="flex gap-1.5 mb-1.5 flex-wrap">
                {item.category && <span className="text-[10px] bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-medium">{item.category}</span>}
                {item.subCategory && <span className="text-[10px] bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-medium">{item.subCategory}</span>}
              </div>

              <div
                className="text-[13px] font-bold text-gray-900 line-clamp-2 leading-snug mb-2 cursor-pointer hover:text-indigo-600 transition-colors"
                onClick={() => navigate(`/update-product/${item._id}`)}
              >
                {item.name}
              </div>

              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-[16px] font-extrabold text-gray-900">
                  {currency}{(item.discountPrice || item.price || 0).toLocaleString()}
                </span>
                {disc && (
                  <>
                    <span className="text-[11px] text-gray-400 line-through">{currency}{(+item.price).toLocaleString()}</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">{disc}% off</span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {stock === 0
                  ? <Badge type="red">Out of stock</Badge>
                  : stock <= 10
                    ? <Badge type="amber">{stock} left</Badge>
                    : <Badge type="green">{stock} in stock</Badge>
                }
                {colors.length > 0 && (
                  <div className="flex gap-1 items-center">
                    {colors.slice(0, 4).map((c, i) => (
                      <div key={i} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c?.hex || c }} title={c?.name || c} />
                    ))}
                    {colors.length > 4 && <span className="text-[10px] text-gray-400 font-semibold">+{colors.length - 4}</span>}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="flex gap-2 pt-2.5 border-t border-gray-100">
                <button
                  onClick={() => imgs.length > 0 && setImgModal({ images: imgs, name: item.name, start: 0 })}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 text-[11.5px] font-semibold hover:bg-gray-100 transition-colors"
                >
                  <TbEye size={13} /> View
                </button>
                <button
                  onClick={() => navigate(`/update-product/${item._id}`)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 text-[11.5px] font-semibold hover:bg-indigo-100 transition-colors"
                >
                  <TbEdit size={13} /> Edit
                </button>
                <button
                  onClick={() => setConfirmDelete({ id: item._id, name: item.name })}
                  className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors flex-shrink-0"
                >
                  <TbTrash size={13} />
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  /* ══════════════════════════════════════
     RENDER
  ══════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#f8f8f6] font-sans">
      <style>{`
        @keyframes fadeIn  { from{opacity:0}to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
        .animate-fadeIn  { animation: fadeIn 0.15s ease; }
        .animate-slideUp { animation: slideUp 0.2s ease; }
      `}</style>

      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-6 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
            <TbPackage size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 leading-none tracking-tight">Products</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {loading ? '…' : `${list.length} total products`}
            </p>
          </div>
          {!loading && (
            <span className="ml-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-bold border border-indigo-100">
              {list.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <TbFileExport size={15} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={fetchList}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <HiOutlineRefresh size={15} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={() => context.setIsOpenFullScreenPanel({ open: true, modal: 'Add product' })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold transition-colors shadow-sm"
          >
            <TbPlus size={16} />
            <span className="hidden sm:inline">Add Product</span>
          </button>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 pb-0">
        <StatCard icon={<MdOutlineInventory2 size={20} className="text-indigo-600" />} value={list.length} label="Total Products" color="bg-indigo-50" loading={loading} />
        <StatCard icon={<TbChartBar size={20} className="text-emerald-600" />} value={totalStock} label="Total Stock Units" color="bg-emerald-50" loading={loading} />
        <StatCard icon={<TbStar size={20} className="text-amber-600" />} value={bestsellerCount} label="Bestsellers" color="bg-amber-50" loading={loading} />
        <StatCard icon={<TbAlertTriangle size={20} className="text-red-500" />} value={outOfStock} label="Out of Stock" color="bg-red-50" loading={loading} />
      </div>

      {/* ── TOOLBAR ── */}
      <div className="flex flex-wrap items-center gap-3 px-6 pt-5 pb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <HiOutlineSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Name, Category, SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <TbX size={10} className="text-gray-600" />
            </button>
          )}
        </div>

        {/* Category */}
        <select className={selectCls} value={catFilter} onChange={e => { setCatFilter(e.target.value); setSubCatFilter('all') }}>
          {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
        </select>

        {/* Sub-category */}
        <select className={selectCls} value={subCatFilter} onChange={e => setSubCatFilter(e.target.value)}>
          {subCategories.map(s => <option key={s} value={s}>{s === 'all' ? 'All Sub-cats' : s}</option>)}
        </select>

        {/* Stock filter — NEW */}
        <select className={selectCls} value={stockFilter} onChange={e => setStockFilter(e.target.value)}>
          <option value="all">All Stock</option>
          <option value="in">In Stock (&gt;10)</option>
          <option value="low">Low Stock (≤10)</option>
          <option value="out">Out of Stock</option>
        </select>

        {/* Sort */}
        <select
          className={selectCls}
          value={sortBy}
          onChange={e => { setSortBy(e.target.value); setSortDir(e.target.value === 'newest' ? 'desc' : 'asc') }}
        >
          <option value="newest">Newest First</option>
          <option value="name">Name (A–Z)</option>
          <option value="price">Price (Low–High)</option>
          <option value="stock">Stock (Low–High)</option>
        </select>

        {/* View Toggle */}
        <div className="flex border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-2.5 flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors ${viewMode === 'table' ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <MdOutlineTableRows size={15} />
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2.5 flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <MdOutlineGridView size={15} />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>
      </div>

      {/* ── RESULTS BAR ── */}
      <div className="flex items-center justify-between px-6 pb-3">
        <p className="text-[12.5px] text-gray-400 font-medium">
          {loading ? 'Loading…' : (
            <>
              Showing{' '}
              <span className="font-bold text-gray-700">{paginated.length}</span> of{' '}
              <span className="font-bold text-gray-700">{filtered.length}</span> products
              {search && <span className="text-indigo-500"> for "{search}"</span>}
            </>
          )}
        </p>
        {selected.length > 0 && (
          <span className="text-[12px] text-indigo-600 font-bold bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
            {selected.length} selected
          </span>
        )}
      </div>

      {/* ── CONTENT ── */}
      {viewMode === 'table' ? renderTable() : renderGrid()}

      {/* ── PAGINATION ── */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 px-6 pb-10">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .reduce((acc, p, i, arr) => {
              if (i > 0 && arr[i - 1] !== p - 1) acc.push('…')
              acc.push(p)
              return acc
            }, [])
            .map((p, i) =>
              p === '…'
                ? <span key={`e${i}`} className="text-gray-400 text-sm px-1">…</span>
                : <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl border text-[13px] font-semibold transition-colors
                      ${page === p ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  {p}
                </button>
            )
          }

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      )}

      {/* ── BULK ACTION FLOATING BAR ── */}
      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl bg-gray-950 text-white shadow-2xl min-w-[320px] animate-slideUp">
          <div className="text-[13.5px] font-semibold">
            {selected.length} selected{' '}
            <span className="opacity-50 font-normal">· Bulk actions</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelected([])}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-[12px] font-semibold hover:bg-white/20 transition-colors"
            >
              <TbX size={12} /> Deselect
            </button>
            <button
              onClick={() => setConfirmDelete('bulk')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500 text-[12px] font-semibold hover:bg-red-600 transition-colors"
            >
              <TbTrash size={13} /> Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* ── MODALS ── */}
      {confirmDelete && (
        <ConfirmModal
          title={confirmDelete === 'bulk' ? `Delete ${selected.length} Products?` : 'Delete Product?'}
          desc={
            confirmDelete === 'bulk'
              ? `This will permanently remove ${selected.length} selected products. This cannot be undone.`
              : `"${confirmDelete.name}" will be permanently deleted. This cannot be undone.`
          }
          onConfirm={() => {
            setConfirmDelete(null)
            if (confirmDelete === 'bulk') removeBulk()
            else removeProduct(confirmDelete.id)
          }}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
      {imgModal && <ImgModal {...imgModal} onClose={() => setImgModal(null)} />}
    </div>
  )
}

export default ProductsList