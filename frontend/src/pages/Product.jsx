import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { FaInfoCircle } from 'react-icons/fa';
import RelatedProducts from '../components/RelatedProducts';
import Modal from '../components/Modal';
import JacketLiningSelector from '../components/JacketLiningSelector';
import { toast } from 'react-toastify'
import CartDrawer from '../components/CartDrawer';
import { IoHeartSharp } from "react-icons/io5";

// ✅ Color Map (case-insensitive handling)
const colorMap = {
  wine: '#722F37',
  red: '#FF0000',
  black: '#000000',
  olive: '#808000',
  green: '#008000',
  cognac: '#D2691E',
  white: '#FFFFFF',
  yellow: '#FFFF00',
  gray: '#808080',
  rose: '#FF007F',
  tobacco: '#A0522D',
  navy: '#000080',
  beige: '#F5F5DC',
  blue: '#0000FF',
  brown: '#8B4513',
};

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const { submitReview, getProductReviews, token, backendUrl, deleteReview, userId } = useContext(ShopContext);

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
  const [displayPrice, setDisplayPrice] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { wishlist, toggleWishlistItem } = useContext(ShopContext);
  const { getSingleProduct } = useContext(ShopContext);


  const navigate = useNavigate();

  // ---- wishlist -------
  const isWishlisted = Array.isArray(wishlist)
    ? wishlist.some(item => item.productId === productId)
    : false;

  // ✅ Fetch product data
  const fetchProductData = async () => {
    const item = await getSingleProduct(productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
      setSelectedIndex(0);
    }
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);


  useEffect(() => {
    if (productId) {
      loadReviews();
    }
  }, [productId]);

  const loadReviews = async () => {
    const data = await getProductReviews(productId);
    setReviews(data);
  };

  // ✅ Set default color (first available)
  useEffect(() => {
    if (productData?.color?.length) {
      if (Array.isArray(productData.color)) {
        setSelectedColor(productData.color[0]);
      } else {
        setSelectedColor(productData.color);
      }
    }
  }, [productData]);

  useEffect(() => {
    if (productData) {
      setDisplayPrice(productData.price);
    }
  }, [productData]);


  const handleAddToCart = () => {
    if (!size || !selectedColor) {
      toast.error('Please select a size and color before adding to cart.', { duration: 2000 });
      return;
    }

    // ✅ Calculate customPrice (addon only: displayPrice - base)
    const customPrice = displayPrice - productData.price;
    console.log(`Adding to cart: Base ${productData.price}, Custom ${customPrice}, Total ${displayPrice}`);  // 🔍 Debug

    addToCart(productData._id, size, selectedColor, customPrice);  // ✅ Pass customPrice (number), not makeMeasure
    setIsButtonDisabled(true);

    setTimeout(() => {
      toast.success('Product added to cart!', { duration: 2000 });
      setIsButtonDisabled(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);  // Sync with toast duration
  };

  const handleReviewSubmit = async () => {
    if (!token) return toast.error("Please login first");

    if (!rating || !comment.trim()) {
      return toast.error("Please add rating and comment");
    }

    const success = await submitReview(productId, rating, comment);

    if (success) {
      setComment("");
      setRating(5);
      loadReviews();
    }
  };

  // ----- Review -----

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  // Round to nearest whole star
  const roundedRating = Math.round(avgRating);

  const toggleMakeMeasure = () => setMakeMeasure(!makeMeasure);
  const toggleExpansion = () => setIsExpanded((prev) => !prev);
  const handleTabClick = (tab) => setActiveTab(tab);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }



  const content = `Simple 7-day return or exchange policy—no questions asked, just pure satisfaction.
    Get your order delivered swiftly with tracking updates every step of the way.
    We use sustainable, recyclable materials to keep your delivery green and guilt-free.
    Products adhere to international quality benchmarks, ensuring top-tier performance.
    Sizes tailored for real bodies—refer to our detailed size guide for the perfect match.`;

  const shownContent = isExpanded ? content : `${content.substring(0, 250)}...`;

  // ✅ Custom breakdown text
  const customBreakdown = displayPrice > productData.price ? ` (incl. +${currency}${(displayPrice - productData.price).toFixed(2)} customization)` : '';

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-10">
      {/* -------- Product Layout ---------- */}
      <div className="flex gap-10 sm:gap-12 flex-col sm:flex-row">
        {/* ---------- Product Images ------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row md:sticky md:top-28 self-start ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] lg:w-[10%] lg:h-[10%] w-full lg:mr-12">
            {productData.image.map((item, index) => (
              <div
                key={index}
                className={`flex-shrink-0 cursor-pointer transition-all duration-200 w-[70px] h-[90px] sm:w-full sm:h-auto rounded-md 
                ${index === selectedIndex ? 'border-2 border-blue-500' : 'border-2 border-transparent'}`}
                onClick={() => {
                  setImage(item);
                  setSelectedIndex(index);
                }}
              >
                <img src={item} alt="" className="w-full h-full object-cover rounded-md" />
              </div>
            ))}
          </div>

          <div className="w-full sm:w-[80%] lg:w-[60%] flex justify-center items-center">
            <div className="w-full max-h-[600px] aspect-[3/4] overflow-hidden rounded-lg bg-white flex items-center justify-center shadow-sm">
              <img className="w-full h-full object-contain" src={image} alt={productData.name} />
            </div>
          </div>
        </div>

        {/* ---------- Product Info ------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">

            {/* ⭐ Dynamic Stars Using map() */}
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-500 text-sm">
                {index < roundedRating ? "★" : "☆"}
              </span>
            ))}

            {/* Review Count */}
            <p className="pl-2 text-sm text-gray-600">({reviews.length})</p>
          </div>

          {/* ✅ Price with custom breakdown */}
        
{/* PRICE DISPLAY LOGIC */}
{productData.discountPrice > 0 ? (
  productData.discountActive ? (
    // CASE 1: Discount Active = TRUE → Show original + discounted
    <div className="flex items-center gap-3 mt-5">
      {/* Original Price */}
      <p className="text-2xl font-medium text-gray-500 line-through">
        {currency}{productData.price.toFixed(2)}
      </p>

      {/* Discounted Price */}
      <p className="text-3xl font-semibold text-green-600">
        {currency}
        {(productData.price - (productData.price * productData.discountPrice / 100)).toFixed(2)}
      </p>
    </div>
  ) : (
    // CASE 2: Discount Active = FALSE → Show ONLY discounted price
    <p className="mt-5 text-3xl font-semibold text-green-600">
      {currency}
      {(productData.price - (productData.price * productData.discountPrice / 100)).toFixed(2)}
    </p>
  )
) : (
  // CASE 3: No discount at all → Show normal price
  <p className="mt-5 text-3xl font-medium text-gray-800">
    {currency}{productData.price.toFixed(2)}
  </p>
)}



          

          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* -------- Color Selection -------- */}
          <div className="flex flex-col gap-4 my-8">
            <div>
              <div className="flex items-center mb-2">
                <p className="text-sm font-medium text-gray-700 mr-2">Color :</p>
                <span className="text-sm text-gray-900 capitalize">{selectedColor}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {productData.color && productData.color.length > 0 ? (
                  productData.color.map((clr, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <button
                        onClick={() => setSelectedColor(clr)}
                        className={`w-10 h-10 rounded-md border transition-all duration-200 ${selectedColor === clr
                          ? 'ring-2 ring-black scale-110'
                          : 'hover:ring-1 hover:ring-gray-400'
                          }`}
                        style={{
                          backgroundColor: colorMap[clr?.toLowerCase()] || '#CCCCCC',  // Fallback gray
                        }}
                        title={clr}
                      ></button>
                      <p className="text-xs text-gray-600 mt-1 capitalize">{clr}</p>
                    </div>
                  ))
                ) : (
                  <p>No colors available</p>
                )}
              </div>
            </div>

            {/* -------- Size Selection -------- */}
            <div>
              <div className="flex gap-0 justify-between mr-20 mb-2">
                <p className="text-sm font-medium text-gray-700">Select Size</p>
                <button
                  className="underline hover:no-underline text-sm text-blue-600"
                  onClick={() => setShowModal(true)}
                >
                  Size Guide
                </button>
                {showModal && <Modal onclose={() => setShowModal(false)} />}
              </div>
              <div className="flex gap-2 mb-2 flex-wrap">
                {productData.sizes && productData.sizes.length > 0 ? (
                  productData.sizes.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(s)}
                      className={`border py-2 px-4 rounded-md ${size === s
                        ? 'border-orange-500 bg-orange-100'
                        : 'border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                      {s}
                    </button>
                  ))
                ) : (
                  <p>No sizes available</p>
                )}
              </div>
            </div>

            {/* -------- Made to Measure -------- */}
            <div className="flex flex-col justify-center items-center">
              <button
                onClick={toggleMakeMeasure}
                className="w-[90%] border border-gray-300 text-gray-800 font-semibold py-2.5 rounded-md hover:bg-gray-100 transition-colors mb-4"
              >
                MADE TO MEASURE
              </button>
              {makeMeasure && (
                <div className="flex items-center justify-center text-sm md:text-base lg:text-lg text-gray-600 bg-gray-100 p-4 rounded-md w-[80%] -mb-4">
                  <FaInfoCircle className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
                  Measurements can be added on the Cart page
                </div>
              )}
            </div>
          </div>


          {/* ADD TO Wishlist */}
          <div className="flex flex-col items-center gap-3  top-24 z-[9] mb-10">
            <button
              onClick={() => toggleWishlistItem(productId)}
              className="w-[90%] border border-gray-300 py-2.5 rounded-md 
             text-gray-800 hover:bg-gray-100 transition-colors"
            >
              {isWishlisted ? "❤️ Remove from Wishlist" : "🖤 Add to Wishlist"}
            </button>

          </div>


          {/* -------- Add to Cart Button -------- */}
          <div className="flex items-center justify-center md:sticky top-24 z-[999]" >
            <button
              onClick={() => {
                handleAddToCart();
                toggleCartDrawer();
              }}
              disabled={isButtonDisabled || !size || !selectedColor}
              className="w-[90%] bg-gray-500 text-white font-semibold py-2.5 rounded-md 
hover:bg-indigo-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed 
md:sticky md:top-4 self-start z-50"
            >
              ADD TO CART
            </button>
          </div>

          <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
          <JacketLiningSelector
            basePrice={productData.price}
            onPriceChange={(newPrice) => setDisplayPrice(newPrice)}
          />

          <hr className="mt-8 sm:w-4/3" />

          {/* -------- Description Text -------- */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Every item is 100% original, crafted with premium materials for lasting style and comfort.</p>
            <p>Enjoy secure cash on delivery options, plus multiple payment methods to suit your preference.</p>
            <p>{shownContent}</p>
            <p
              className="underline hover:no-underline cursor-pointer text-base text-gray-600"
              onClick={toggleExpansion}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Tabs (Description / Reviews) ---------- */}
      <div className="mt-20">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => handleTabClick('description')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'description'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Description
          </button>
          <button
            onClick={() => handleTabClick('reviews')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'reviews'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="mt-4">
          {activeTab === 'description' && (
            <div
              className="text-gray-700 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: productData.detailedDescription }}
            />
          )}

          {activeTab === 'reviews' && (
            <div className="text-gray-600">

              {/* ------- Add Review Form (Only if logged in) -------- */}
              {token ? (
                <div className="mb-6 p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Write a Review</h3>

                  {/* Rating */}
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="border p-2 rounded mb-3"
                  >
                    <option value="5">★★★★★ (5)</option>
                    <option value="4">★★★★☆ (4)</option>
                    <option value="3">★★★☆☆ (3)</option>
                    <option value="2">★★☆☆☆ (2)</option>
                    <option value="1">★☆☆☆☆ (1)</option>
                  </select>

                  {/* Comment */}
                  <textarea
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border p-2 rounded mb-3"
                    rows="3"
                  ></textarea>

                  <button
                    onClick={handleReviewSubmit}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    Submit Review
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 mb-4">Login to write a review.</p>
              )}

              {/* ------- List of Reviews -------- */}
              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev._id} className="mb-4 border-b pb-4">

                    {/* Review Header: Name + Stars + Delete (if owner) */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold">{rev.user?.name || "User"}</span>
                        <span className="text-yellow-500 ml-3">
                          {"★".repeat(rev.rating)}
                          {"☆".repeat(5 - rev.rating)}
                        </span>
                      </div>

                      {/* 🔥 Delete button (ONLY for review owner) */}
                      {rev.user?._id === userId && (
                        <button
                          onClick={async () => {
                            const ok = await deleteReview(rev._id);
                            if (ok) loadReviews();
                          }}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    {/* Comment */}
                    <p className="mt-1">{rev.comment}</p>

                    {/* Date */}
                    <span className="text-sm text-gray-400">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                ))
              )}
            </div>

          )}
        </div>
      </div>

      {/* -------- Related Products -------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;