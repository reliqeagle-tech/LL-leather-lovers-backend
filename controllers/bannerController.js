import Banner from "../models/bannerModel.js";
import { v2 as cloudinary } from "cloudinary";

import streamifier from "streamifier";

export const addBanner = async (req, res) => {
  try {
    const { title, link } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Banner image required" });
    }

    // Convert buffer -> stream -> Cloudinary upload
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "banners" },
      async (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Cloudinary upload failed" });
        }

        const banner = await Banner.create({
          image: result.secure_url,
          title,
          link,
        });

        return res.json({
          success: true,
          message: "Banner added",
          banner,
        });
      }
    );

    // Pipe buffer into cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
// export const addBanner = async (req, res) => {
//   try {
//     const { title, link } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "Banner image required" });
//     }

//     const banner = await Banner.create({
//       image: req.file.filename,
//       title, 
//       link,
//     });

//     res.json({ success: true, message: "Banner added", banner });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json({ success: true, banners });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) return res.status(404).json({ error: "Banner not found" });

    res.json({ success: true, message: "Banner deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



