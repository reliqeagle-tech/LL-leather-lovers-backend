import express from 'express';
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct,
  bulkUploadProducts,
  bulkUploadZipProducts
} from '../controllers/productController.js';

import upload from '../middleware/multer.js';               // Image upload
import adminAuth from '../middleware/adminAuth.js';         // Admin auth
import uploadFile from '../middleware/multerFiles.js';      // CSV/JSON upload
import uploadZip from "../middleware/uploadZip.js";

const productRouter = express.Router();

// ----------------------------------------------
// ADD PRODUCT (with 4 images)
// ----------------------------------------------
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

// ----------------------------------------------
// UPDATE PRODUCT (images + fields)
// ----------------------------------------------
productRouter.post(
  '/update',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  updateProduct
);

// ----------------------------------------------
// GET SINGLE PRODUCT
// ----------------------------------------------
productRouter.post('/single', singleProduct);

// ----------------------------------------------
// LIST ALL PRODUCTS
// ----------------------------------------------
productRouter.get('/list', listProducts);

// ----------------------------------------------
// REMOVE PRODUCT
// ----------------------------------------------
productRouter.post('/remove', adminAuth, removeProduct);

// ----------------------------------------------
// BULK UPLOAD (CSV + JSON)
// ----------------------------------------------
productRouter.post(
  '/bulk-upload',
  adminAuth,
  uploadFile.single('file'),
  bulkUploadProducts
);

productRouter.post(
  "/bulk-upload-zip",
  adminAuth,
  uploadZip.fields([
    { name: "csv", maxCount: 1 },
    { name: "images", maxCount: 1 }
  ]),
  bulkUploadZipProducts
);

export default productRouter;
