export const getOptimizedImage = (url, width = 300) => {
    if (!url.includes("res.cloudinary.com")) return url;

    return url.replace(
        "/upload/",
        `/upload/f_auto,q_auto,w_${width},c_limit/`
    );
};