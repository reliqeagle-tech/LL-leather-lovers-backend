// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//     const currency = "$";
//     const delivery_fee = 10;
//     const backendUrl = import.meta.env.DEV
//         ? import.meta.env.VITE_BACKEND_URL_D
//         : import.meta.env.VITE_BACKEND_URL;

//     const [search, setSearch] = useState("");
//     const [showSearch, setShowSearch] = useState(false);
//     const [cartItems, setCartItems] = useState({});
//     const [products, setProducts] = useState([]);
//     const [token, setToken] = useState("");
//     const [userId, setUserId] = useState(null);
//     const [wishlist, setWishlist] = useState([]);
//     const [banners, setBanners] = useState([]);

//     const navigate = useNavigate();

//     // Decode token into userId
//     const decodeToken = (tok) => {
//         try {
//             const decoded = jwtDecode(tok);
//             return decoded.id;
//         } catch {
//             return null;
//         }
//     };

//     // fetchBanners
// const fetchBanners = async () => {
//   try {
//     const res = await axios.get(`${backendUrl}/api/banner/list`);
//     // backend returns { success: true, banners: [...] }
//     if (res.data.success) setBanners(res.data.banners);
//     else setBanners([]);
//   } catch (err) {
//     console.log("Fetch banners error", err);
//     setBanners([]);
//   }
// };


// useEffect(() => {
//     fetchBanners();
// }, []);

//     /* ------------------------------- CART FUNCTIONS ------------------------------- */

//     const addToCart = async (itemId, size, color, customPrice = 0) => {
//         if (!size || !color) {
//             toast.error("Please select size and color");
//             return;
//         }

//         let cartData = structuredClone(cartItems);
//         const key = `${size}-${color}`;

//         if (!cartData[itemId]) cartData[itemId] = {};

//         if (cartData[itemId][key]) {
//             cartData[itemId][key].quantity += 1;
//         } else {
//             cartData[itemId][key] = {
//                 quantity: 1,
//                 customPrice,
//             };
//         }

//         setCartItems(cartData);

//         if (token) {
//             await axios.post(
//                 backendUrl + "/api/cart/add",
//                 { itemId, size, color, customPrice },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//         }
//     };

//     const updateQuantity = async (itemId, size, color, quantity) => {
//         const key = `${size}-${color}`;
//         let cartData = structuredClone(cartItems);

//         if (!cartData[itemId] || !cartData[itemId][key]) return;

//         if (quantity <= 0) {
//             delete cartData[itemId][key];
//             if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
//         } else {
//             cartData[itemId][key].quantity = quantity;
//         }

//         setCartItems(cartData);

//         if (token) {
//             await axios.post(
//                 backendUrl + "/api/cart/update",
//                 { itemId, size, color, quantity },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//         }
//     };

//     const getProductsData = async () => {
//         try {
//             const res = await axios.get(backendUrl + "/api/product/list");
//             if (res.data.success) {
//                 setProducts(res.data.products.reverse());
//             }
//         } catch (err) {
//             toast.error(err.message);
//         }
//     };

//     const getUserCart = async (tok) => {
//         try {
//             const id = decodeToken(tok);
//             if (!id) return;

//             const res = await axios.post(
//                 backendUrl + "/api/cart/get",
//                 { userId: id },
//                 { headers: { Authorization: `Bearer ${tok}` } }
//             );

//             if (res.data.success) {
//                 setCartItems(res.data.cartData);
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         getProductsData();
//     }, []);

//     useEffect(() => {
//         const saved = localStorage.getItem("token");
//         if (saved) {
//             setToken(saved);
//             setUserId(decodeToken(saved));
//             getUserCart(saved);
//         }
//     }, []);

//     useEffect(() => {
//         if (token) {
//             localStorage.setItem("token", token);
//             setUserId(decodeToken(token));
//             getUserCart(token);
//         }
//     }, [token]);

//     /* ------------------------------- REVIEW FUNCTIONS ------------------------------- */

//     const submitReview = async (product, rating, comment) => {
//         try {
//             if (!token) {
//                 toast.error("Please login to post review");
//                 return false;
//             }

//             const response = await axios.post(
//                 `${backendUrl}/api/review/add`,
//                 { product, rating, comment },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             toast.success("Review submitted!");
//             return true;
//         } catch (error) {
//             console.log(error);

//             if (error.response?.data?.message)
//                 toast.error(error.response.data.message);
//             else toast.error("Failed to submit review");

//             return false;
//         }
//     };

//     const getProductReviews = async (productId) => {
//         try {
//             const res = await axios.get(`${backendUrl}/api/review/${productId}`);
//             if (res.data.success) return res.data.reviews;
//             return [];
//         } catch {
//             toast.error("Failed to load reviews");
//             return [];
//         }
//     };

//     const deleteReview = async (reviewId) => {
//         try {
//             const res = await axios.delete(
//                 `${backendUrl}/api/review/${reviewId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (res.data.success) {
//                 toast.success("Review deleted");
//                 return true;
//             } else {
//                 toast.error(res.data.message);
//                 return false;
//             }
//         } catch (err) {
//             toast.error("Failed to delete review");
//             return false;
//         }
//     };

//     /* ------------------------ CART UTILS ------------------------ */

//     const getCartCount = () => {
//         let total = 0;

//         for (const id in cartItems) {
//             for (const combo in cartItems[id]) {
//                 const item = cartItems[id][combo];
//                 total += item?.quantity || 0;
//             }
//         }
//         return total;
//     };

// // ---------------Cart amount -----------------------------

// const getCartAmount = () => {
//   let total = 0;

//   for (const id in cartItems) {
//     const product = products.find((p) => p._id === id);
//     if (!product) continue;

//     for (const combo in cartItems[id]) {
//       const item = cartItems[id][combo];
//       const qty = item.quantity || 0;
//       const extra = Number(item.customPrice) || 0;

//       const original = Number(product.price);
//       const discounted = Number(product.discountPrice) || 0;

//       // Choose the correct price
//       const finalPrice =
//         discounted > 0 && discounted < original
//           ? discounted
//           : original;

//       total += (finalPrice + extra) * qty;
//     }
//   }

//   return Number(total.toFixed(2));
// };


// // -------------------------cart Discount ------------------

// const getCartDiscount = () => {
//   let saved = 0;

//   for (const id in cartItems) {
//     const product = products.find((p) => p._id === id);
//     if (!product) continue;

//     for (const combo in cartItems[id]) {
//       const item = cartItems[id][combo];
//       const qty = item.quantity || 0;

//       const original = Number(product.price);
//       const discounted = Number(product.discountPrice) || 0;

//       if (discounted > 0 && discounted < original) {
//         saved += (original - discounted) * qty;
//       }
//     }
//   }

//   return Number(saved.toFixed(2));
// };



//     const getCartDetails = () => {
//         const arr = [];
//         for (const id in cartItems) {
//             const product = products.find((p) => p._id === id);
//             if (!product) continue;

//             for (const combo in cartItems[id]) {
//                 const item = cartItems[id][combo];
//                 const [size, color] = combo.split("-");

//                 arr.push({
//                     productId: id,
//                     product,
//                     size,
//                     color,
//                     quantity: item.quantity,
//                 });
//             }
//         }
//         return arr;
//     };

//     /* ------------------------- Wishlist ------------------------------*/

//     // Toggle Wishlist
//     const toggleWishlistItem = async (productId) => {
//   try {
//     if (!userId) {
//       toast.error("Please login first");
//       return;
//     }

//     const res = await axios.post(`${backendUrl}/api/wishlist/toggle`, {
//       userId,
//       productId,
//     });

//     toast.success(res.data.message);
//     fetchWishlist();

//   } catch (error) {
//     console.error(error);
//     toast.error(error.response?.data?.message || "Failed to update wishlist");
//   }
// };

// const fetchWishlist = async () => {
//   try {
//     if (!userId) return;

//     const res = await axios.get(`${backendUrl}/api/wishlist/${userId}`);
//     setWishlist(res.data.wishlist);

//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to load wishlist");
//   }
// };

// // -------------------------- Detailed Description ------------------

// const getSingleProduct = async (productId) => {
//     try {
//         const res = await axios.post(backendUrl + "/api/product/single", { productId });
//         if (res.data.success) {
//             return res.data.product; // Includes detailedDescription
//         }
//         return null;
//     } catch (err) {
//         console.log(err);
//         toast.error("Failed to load product");
//         return null;
//     }
// };




//     /* ------------------------ PROVIDER VALUE ------------------------ */

//     const value = {
//         products,
//         currency,
//         delivery_fee,
//         search,
//         setSearch,
//         showSearch,
//         setShowSearch,
//         cartItems,
//         addToCart,
//         setCartItems,
//         getCartCount,
//         updateQuantity,
//         getCartAmount,
//         getCartDiscount,
//         getCartDetails,
//         navigate,
//         backendUrl,
//         token,
//         setToken,
//         userId,
//         submitReview,
//         getProductReviews,
//         deleteReview,
//         wishlist,
//         toggleWishlistItem,
//         fetchWishlist,
//         getSingleProduct,
//         fetchBanners,
//         banners
//     };

//     return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
// };

// export default ShopContextProvider;




import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.DEV
        ? import.meta.env.VITE_BACKEND_URL_D
        : import.meta.env.VITE_BACKEND_URL;

    // Guest cart fallback from localStorage
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("guestCart");
        return saved ? JSON.parse(saved) : {};
    });

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [banners, setBanners] = useState([]);

    const navigate = useNavigate();

    // ── Save guest cart whenever it changes ──
    useEffect(() => {
        localStorage.setItem("guestCart", JSON.stringify(cartItems));
    }, [cartItems]);

    const decodeToken = (tok) => {
        try {
            const decoded = jwtDecode(tok);
            return decoded.id;
        } catch {
            return null;
        }
    };

    const fetchBanners = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/banner/list`);
            if (res.data.success) setBanners(res.data.banners);
            else setBanners([]);
        } catch (err) {
            console.log("Fetch banners error:", err);
            setBanners([]);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    /* ─────────────────────────────── CART FUNCTIONS ─────────────────────────────── */

    const addToCart = async (itemId, size, color, customPrice = 0) => {
        if (!size || !color) {
            toast.error("Please select size and color");
            return;
        }

        let cartData = structuredClone(cartItems);
        const key = `${size}-${color}`;

        if (!cartData[itemId]) cartData[itemId] = {};

        if (cartData[itemId][key]) {
            cartData[itemId][key].quantity += 1;
        } else {
            cartData[itemId][key] = { quantity: 1, customPrice };
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/add`,
                    { itemId, size, color, customPrice },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (err) {
                console.error("Backend add to cart failed:", err);
            }
        }
    };

    const updateQuantity = async (itemId, size, color, quantity) => {
        const key = `${size}-${color}`;
        let cartData = structuredClone(cartItems);

        if (!cartData[itemId] || !cartData[itemId][key]) return;

        if (quantity <= 0) {
            delete cartData[itemId][key];
            if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
        } else {
            cartData[itemId][key].quantity = quantity;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, size, color, quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (err) {
                console.error("Backend update quantity failed:", err);
            }
        }
    };

    /* ────────────────────────────── LOGIN / CART SYNC ────────────────────────────── */

    useEffect(() => {
        if (!token) return;

        const syncCartOnLogin = async () => {
            try {
                const id = decodeToken(token);
                if (!id) return;

                // Get backend cart
                const res = await axios.post(
                    `${backendUrl}/api/cart/get`,
                    { userId: id },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (!res.data.success) return;

                let backendCart = res.data.cartData || {};

                // Get guest cart
                const guestStr = localStorage.getItem("guestCart");
                if (!guestStr || guestStr === "{}") {
                    setCartItems(backendCart);
                    return;
                }

                const guestCart = JSON.parse(guestStr);
                if (Object.keys(guestCart).length === 0) {
                    setCartItems(backendCart);
                    return;
                }

                // Merge guest → backend (guest wins on conflict by adding qty)
                let merged = structuredClone(backendCart);

                for (const itemId in guestCart) {
                    if (!merged[itemId]) {
                        merged[itemId] = { ...guestCart[itemId] };
                        continue;
                    }
                    for (const comboKey in guestCart[itemId]) {
                        if (merged[itemId][comboKey]) {
                            merged[itemId][comboKey].quantity +=
                                guestCart[itemId][comboKey].quantity;
                        } else {
                            merged[itemId][comboKey] = { ...guestCart[itemId][comboKey] };
                        }
                    }
                }

                // Sync merged cart to backend
                for (const itemId in merged) {
                    for (const comboKey in merged[itemId]) {
                        const [size, color] = comboKey.split("-");
                        const { quantity, customPrice = 0 } = merged[itemId][comboKey];

                        await axios.post(
                            `${backendUrl}/api/cart/add`,
                            { itemId, size, color, customPrice, quantity },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                    }
                }

                setCartItems(merged);
                localStorage.removeItem("guestCart");

                toast.success("Your previous cart items have been restored!");
            } catch (err) {
                console.error("Cart sync on login failed:", err);
                // Fallback: just load backend cart
                getUserCart(token);
            }
        };

        syncCartOnLogin();
    }, [token, backendUrl]);

    const getUserCart = async (tok) => {
        try {
            const id = decodeToken(tok);
            if (!id) return;

            const res = await axios.post(
                `${backendUrl}/api/cart/get`,
                { userId: id },
                { headers: { Authorization: `Bearer ${tok}` } }
            );

            if (res.data.success) {
                setCartItems(res.data.cartData);
            }
        } catch (err) {
            console.log("getUserCart error:", err);
        }
    };

    /* ────────────────────────────── PRODUCT & OTHER DATA ────────────────────────────── */

    const getProductsData = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/product/list`);
            if (res.data.success) {
                setProducts(res.data.products.reverse());
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    /* ────────────────────────────── TOKEN PERSISTENCE ────────────────────────────── */

    useEffect(() => {
        const saved = localStorage.getItem("token");
        if (saved) {
            setToken(saved);
            setUserId(decodeToken(saved));
        }
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setUserId(decodeToken(token));
        }
    }, [token]);

    /* ────────────────────────────── REVIEW FUNCTIONS ────────────────────────────── */

    const submitReview = async (product, rating, comment) => {
        try {
            if (!token) {
                toast.error("Please login to post a review");
                return false;
            }

            const response = await axios.post(
                `${backendUrl}/api/review/add`,
                { product, rating, comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Review submitted successfully!");
            return true;
        } catch (error) {
            console.log(error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to submit review");
            }
            return false;
        }
    };

    const getProductReviews = async (productId) => {
        try {
            const res = await axios.get(`${backendUrl}/api/review/${productId}`);
            if (res.data.success) return res.data.reviews;
            return [];
        } catch {
            toast.error("Failed to load reviews");
            return [];
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            const res = await axios.delete(
                `${backendUrl}/api/review/${reviewId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                toast.success("Review deleted");
                return true;
            } else {
                toast.error(res.data.message);
                return false;
            }
        } catch (err) {
            toast.error("Failed to delete review");
            return false;
        }
    };

    /* ────────────────────────────── WISHLIST ────────────────────────────── */

    const toggleWishlistItem = async (productId) => {
        try {
            if (!userId) {
                toast.error("Please login first");
                return;
            }

            const res = await axios.post(`${backendUrl}/api/wishlist/toggle`, {
                userId,
                productId,
            });

            toast.success(res.data.message);
            fetchWishlist();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update wishlist");
        }
    };

    const fetchWishlist = async () => {
        try {
            if (!userId) return;
            const res = await axios.get(`${backendUrl}/api/wishlist/${userId}`);
            setWishlist(res.data.wishlist);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load wishlist");
        }
    };

    /* ────────────────────────────── UTILITY FUNCTIONS ────────────────────────────── */

    const getCartCount = () => {
        let total = 0;
        for (const id in cartItems) {
            for (const combo in cartItems[id]) {
                total += cartItems[id][combo]?.quantity || 0;
            }
        }
        return total;
    };

    const getCartAmount = () => {
        let total = 0;
        for (const id in cartItems) {
            const product = products.find((p) => p._id === id);
            if (!product) continue;

            for (const combo in cartItems[id]) {
                const item = cartItems[id][combo];
                const qty = item.quantity || 0;
                const extra = Number(item.customPrice) || 0;

                const original = Number(product.price);
                const discounted = Number(product.discountPrice) || 0;
                const finalPrice = discounted > 0 && discounted < original ? discounted : original;

                total += (finalPrice + extra) * qty;
            }
        }
        return Number(total.toFixed(2));
    };

    const getCartDiscount = () => {
        let saved = 0;
        for (const id in cartItems) {
            const product = products.find((p) => p._id === id);
            if (!product) continue;

            for (const combo in cartItems[id]) {
                const qty = cartItems[id][combo].quantity || 0;
                const original = Number(product.price);
                const discounted = Number(product.discountPrice) || 0;

                if (discounted > 0 && discounted < original) {
                    saved += (original - discounted) * qty;
                }
            }
        }
        return Number(saved.toFixed(2));
    };

    const getCartDetails = () => {
        const arr = [];
        for (const id in cartItems) {
            const product = products.find((p) => p._id === id);
            if (!product) continue;

            for (const combo in cartItems[id]) {
                const item = cartItems[id][combo];
                const [size, color] = combo.split("-");

                arr.push({
                    productId: id,
                    product,
                    size,
                    color,
                    quantity: item.quantity,
                });
            }
        }
        return arr;
    };

    const getSingleProduct = async (productId) => {
        try {
            const res = await axios.post(`${backendUrl}/api/product/single`, { productId });
            if (res.data.success) {
                return res.data.product;
            }
            return null;
        } catch (err) {
            console.log(err);
            toast.error("Failed to load product details");
            return null;
        }
    };

    /* ────────────────────────────── CONTEXT VALUE ────────────────────────────── */

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        getCartDiscount,
        getCartDetails,
        navigate,
        backendUrl,
        token,
        setToken,
        userId,
        // Review functions – now included!
        submitReview,
        getProductReviews,
        deleteReview,
        wishlist,
        toggleWishlistItem,
        fetchWishlist,
        getSingleProduct,
        fetchBanners,
        banners,
    };

    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;