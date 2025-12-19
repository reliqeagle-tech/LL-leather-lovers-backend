// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'
// import productRouter from './routes/productRoute.js'
// import cartRouter from './routes/cartRoute.js'
// import orderRouter from './routes/orderRoute.js'
// import reviewRouter from './routes/reviewRoute.js'

// import path from 'path';
// import { fileURLToPath } from 'url';
// import wishlistRouter from './routes/wishlistRoute.js'

// // Fix __dirname for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // App Config
// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// // Allowed host
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "https://llleatherlovers.com",
//   "https://www.llleatherlovers.com",
//   "https://admin.llleatherlovers.com",
// ];

// // middlewares
// app.use(express.json())
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

// // api endpoints
// app.use('/api/user',userRouter)
// app.use('/api/product',productRouter)
// app.use('/api/cart',cartRouter)
// app.use('/api/order',orderRouter)
// app.use('/api/review',reviewRouter)
// app.use('/api/wishlist',wishlistRouter)

// if (process.env.NODE_ENV === 'production') {
//   const frontendPath = path.join(__dirname, 'frontend', 'dist');

//   app.use(express.static(frontendPath));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(frontendPath, 'index.html'));
//   });
// }
// app.get('/',(req,res)=>{
//     res.send("API Working")
// })

// app.listen(port, ()=> console.log('Server started on PORT : '+ port))



import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import reviewRouter from './routes/reviewRoute.js'
import bannerRouter from './routes/bannerRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';
import wishlistRouter from './routes/wishlistRoute.js'

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Allowed host
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://llleatherlovers.com",
  "https://www.llleatherlovers.com",
  "https://admin.llleatherlovers.com",
];

// middlewares
app.use(express.json())
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/review',reviewRouter)
app.use('/api/wishlist',wishlistRouter)
app.use("/api/banner", bannerRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve admin panel for admin subdomain
  const adminPath = path.join(__dirname, 'admin', 'dist');
  const frontendPath = path.join(__dirname, 'frontend', 'dist');

  // Check subdomain and serve appropriate frontend
  app.use((req, res, next) => {
    if (req.hostname.includes('admin')) {
      express.static(adminPath)(req, res, next);
    } else {
      express.static(frontendPath)(req, res, next);
    }
  });

  // Catch-all for SPA routing
  app.get('*', (req, res) => {
    if (req.hostname.includes('admin')) {
      res.sendFile(path.join(adminPath, 'index.html'));
    } else {
      res.sendFile(path.join(frontendPath, 'index.html'));
    }
  });
}

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Server started on PORT : '+ port))
