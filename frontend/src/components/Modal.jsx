// import React, { useRef, useState } from 'react';
// import { X } from 'lucide-react';
// import { assets } from '../assets/assets';

// const Modal = ({ onclose }) => {
//   const modalRef = useRef();

//   const closeModal = (e) => {
//     if (modalRef.current === e.target) {
//       onclose();
//     }
//   };

//   const [unit, setUnit] = useState('inch');
//   const CM_TO_INCH = 0.393701;

//   const sizeData = [
//     { size: 'XS(34)', chest: 86, jacketChest: 102, length: 65, shoulder: 44, sleeves: 62, stomach: 97 },
//     { size: 'S(36)', chest: 91, jacketChest: 107, length: 66, shoulder: 46, sleeves: 64, stomach: 102 },
//     { size: 'M(38)', chest: 97, jacketChest: 112, length: 69, shoulder: 47, sleeves: 65, stomach: 107 },
//     { size: 'L(40)', chest: 102, jacketChest: 117, length: 70, shoulder: 48, sleeves: 65, stomach: 112 },
//     { size: 'XL(42)', chest: 107, jacketChest: 122, length: 71, shoulder: 48, sleeves: 66, stomach: 117 },
//     { size: '2XL(44)', chest: 112, jacketChest: 130, length: 74, shoulder: 51, sleeves: 67, stomach: 124 },
//     { size: '3XL(46)', chest: 117, jacketChest: 137, length: 75, shoulder: 53, sleeves: 67, stomach: 132 },
//     { size: '4XL(48)', chest: 122, jacketChest: 147, length: 76, shoulder: 56, sleeves: 67, stomach: 142 },
//   ];

//   const convertValue = (val) => {
//     return unit === 'inch' ? (val * CM_TO_INCH).toFixed(1) + ' in' : val + ' cm';
//   };

//   return (
//     <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
//       <div className="bg-white text-black rounded-xl p-4 md:p-6 flex flex-col items-center gap-4 w-full max-w-4xl mx-2 max-h-[90vh] overflow-y-auto">
//         <button onClick={onclose} className="self-end">
//           <X size={30} />
//         </button>
//         <h1 className="text-2xl font-medium">Size Guide</h1>
//         <div className="flex justify-center items-center space-x-4">
//           <label className="flex items-center space-x-2 cursor-pointer">
//             <input
//               type="radio"
//               name="unit"
//               value="inch"
//               checked={unit === 'inch'}
//               onChange={() => setUnit('inch')}
//             />
//             <span>Inch</span>
//           </label>
//           <label className="flex items-center space-x-2 cursor-pointer">
//             <input
//               type="radio"
//               name="unit"
//               value="cm"
//               checked={unit === 'cm'}
//               onChange={() => setUnit('cm')}
//             />
//             <span>cm</span>
//           </label>
//         </div>
//         {/* Illustrations */}
//         <div className="grid grid-cols-5 gap-2 justify-items-center w-full overflow-x-auto">
//           <div><img className='w-20 md:w-32' src={assets.size_leather_1} alt="Size Icon" /></div>
//           <div><img className='w-20 md:w-32' src={assets.size_leather_2} alt="Chest Icon" /></div>
//           <div><img className='w-20 md:w-32' src={assets.size_leather_3} alt="Length Icon" /></div>
//           <div><img className='w-20 md:w-32' src={assets.size_leather_4} alt="Shoulder Icon" /></div>
//           <div><img className='w-20 md:w-32' src={assets.size_leather_5} alt="Sleeves Icon" /></div>
//         </div>
//         {/* Table */}
//         <div className="w-full overflow-x-auto">
//           <table className="min-w-max table-auto border border-gray-300">
//             <thead className="bg-gray-200 text-gray-700">
//               <tr>
//                 <th className="border p-2 sticky left-0 bg-gray-200 z-10">Size</th>
//                 <th className="border p-2 sticky left-[80px] bg-gray-200 z-10 min-w-[80px]">Suitable For Chest</th>
//                 <th className="border p-2 min-w-[80px]">Jacket Chest</th>
//                 <th className="border p-2 min-w-[80px]">Jacket Length</th>
//                 <th className="border p-2 min-w-[80px]">Jacket Shoulder</th>
//                 <th className="border p-2 min-w-[80px]">Jacket Sleeves</th>
//                 <th className="border p-2 min-w-[80px]">Jacket Stomach</th>
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               {sizeData.map((row, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50">
//                   <td className="border p-2 sticky left-0 bg-white z-10">{row.size}</td>
//                   <td className="border p-2 sticky left-[80px] bg-white z-10">{convertValue(row.chest)}</td>
//                   <td className="border p-2">{convertValue(row.jacketChest)}</td>
//                   <td className="border p-2">{convertValue(row.length)}</td>
//                   <td className="border p-2">{convertValue(row.shoulder)}</td>
//                   <td className="border p-2">{convertValue(row.sleeves)}</td>
//                   <td className="border p-2">{convertValue(row.stomach)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;





import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { assets } from '../assets/assets';

const Modal = ({ onclose }) => {
  const modalRef = useRef();
  const [unit, setUnit] = useState('inch');
  const CM_TO_INCH = 0.393701;

  const closeModal = (e) => {
    if (modalRef.current === e.target) onclose();
  };

  const sizeData = [
    { size: 'XS(34)', chest: 86,  jacketChest: 102, length: 65, shoulder: 44, sleeves: 62, stomach: 97  },
    { size: 'S(36)',  chest: 91,  jacketChest: 107, length: 66, shoulder: 46, sleeves: 64, stomach: 102 },
    { size: 'M(38)',  chest: 97,  jacketChest: 112, length: 69, shoulder: 47, sleeves: 65, stomach: 107 },
    { size: 'L(40)',  chest: 102, jacketChest: 117, length: 70, shoulder: 48, sleeves: 65, stomach: 112 },
    { size: 'XL(42)', chest: 107, jacketChest: 122, length: 71, shoulder: 48, sleeves: 66, stomach: 117 },
    { size: '2XL(44)',chest: 112, jacketChest: 130, length: 74, shoulder: 51, sleeves: 67, stomach: 124 },
    { size: '3XL(46)',chest: 117, jacketChest: 137, length: 75, shoulder: 53, sleeves: 67, stomach: 132 },
    { size: '4XL(48)',chest: 122, jacketChest: 147, length: 76, shoulder: 56, sleeves: 67, stomach: 142 },
  ];

  const headers = ['Size', 'Chest Fit', 'Jacket Chest', 'Length', 'Shoulder', 'Sleeves', 'Stomach'];
  const illustrations = [
    assets.size_leather_1, assets.size_leather_2, assets.size_leather_3,
    assets.size_leather_4, assets.size_leather_5,
  ];
  const illustrationLabels = ['Body', 'Chest', 'Length', 'Shoulder', 'Sleeves'];

  const convertValue = (val) =>
    unit === 'inch' ? (val * CM_TO_INCH).toFixed(1) + '"' : val + ' cm';

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 z-50 mt-24 flex items-center justify-center p-4"
      style={{
        background: 'rgba(4,4,10,0.85)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <style>{`
        @keyframes modalIn {
          from { opacity:0; transform:scale(0.92) translateY(16px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        .modal-table tr:hover td { background: rgba(99,102,241,0.06) !important; }
        .unit-radio:checked + span {
          background: #6366f1;
          color: #fff;
        }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius:4px; }
      `}</style>

      <div
        className="relative w-full max-w-4xl flex flex-col rounded-2xl overflow-hidden"
        style={{
          maxHeight: '92vh',
          background: 'linear-gradient(160deg, #0d0d1a 0%, #0a0a14 100%)',
          border: '1px solid rgba(99,102,241,0.2)',
          boxShadow: '0 0 0 1px rgba(99,102,241,0.08), 0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(99,102,241,0.06)',
          animation: 'modalIn 0.35s cubic-bezier(0.34,1.4,0.64,1)',
        }}
      >
        {/* Top indigo accent line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #6366f1, transparent)' }} />

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          <div>
            <p className="uppercase tracking-[0.22em] mb-1"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', color: '#6366f1', fontWeight: 600 }}>
              Leather Jacket
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(20px,2.5vw,26px)',
              color: '#fff', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1 }}>
              Size <em style={{ fontStyle: 'italic', color: '#c97c3a' }}>Guide</em>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Unit toggle */}
            <div className="flex items-center rounded-lg overflow-hidden"
              style={{ border: '1px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.06)' }}>
              {['inch', 'cm'].map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className="px-4 py-2 transition-all duration-200"
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: unit === u ? '#6366f1' : 'transparent',
                    color: unit === u ? '#fff' : 'rgba(255,255,255,0.35)',
                  }}
                >
                  {u}
                </button>
              ))}
            </div>

            <button
              onClick={onclose}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              <X size={15} color="rgba(255,255,255,0.6)" />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-6 pb-7">

          {/* Illustration strip */}
          <div className="grid grid-cols-5 gap-3 py-6"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {illustrations.map((src, i) => (
              <div key={i} className="flex flex-col items-center gap-2.5">
                <div className="w-full aspect-square rounded-xl flex items-center justify-center overflow-hidden p-2"
                  style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <img src={src} alt={illustrationLabels[i]} className="w-full h-full object-contain opacity-90" />
                </div>
                <span className="text-center uppercase tracking-widest"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '8px',
                    color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>
                  {illustrationLabels[i]}
                </span>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="mt-5 overflow-x-auto rounded-xl"
            style={{ border: '1px solid rgba(99,102,241,0.15)' }}>
            <table className="modal-table min-w-max w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: 'rgba(99,102,241,0.15)' }}>
                  {headers.map((h, i) => (
                    <th key={h} className="px-4 py-3 text-left whitespace-nowrap"
                      style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: '9px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: i === 0 ? '#6366f1' : 'rgba(255,255,255,0.4)',
                        borderBottom: '1px solid rgba(99,102,241,0.2)',
                      }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2.5 py-1 rounded-md"
                        style={{
                          fontFamily: "'Montserrat',sans-serif",
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          background: 'rgba(99,102,241,0.15)',
                          color: '#818cf8',
                          border: '1px solid rgba(99,102,241,0.25)',
                        }}>
                        {row.size}
                      </span>
                    </td>
                    {[row.chest, row.jacketChest, row.length, row.shoulder, row.sleeves, row.stomach].map((val, vi) => (
                      <td key={vi} className="px-4 py-3 tabular-nums"
                        style={{
                          fontFamily: "'Montserrat',sans-serif",
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.55)',
                          fontWeight: 400,
                        }}>
                        {convertValue(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <p className="mt-4 text-center"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px',
              color: 'rgba(255,255,255,0.2)', lineHeight: 1.6 }}>
            All measurements are approximate. We recommend measuring over a light shirt for best fit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;