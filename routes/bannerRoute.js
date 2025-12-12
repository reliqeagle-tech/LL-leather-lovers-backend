import express from "express";
// import { addBanner, getBanners, deleteBanner } from "../controllers/bannerController.js";
import { addBanner,getBanners,deleteBanner } from "../controllers/bannerController.js";
import upload from "../middleware/multer.js";

const bannerRouter = express.Router();

bannerRouter.post("/add", upload.single("image"), addBanner);
bannerRouter.get("/list", getBanners);
bannerRouter.delete("/delete/:id", deleteBanner);

export default bannerRouter;
