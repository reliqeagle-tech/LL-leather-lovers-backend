import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
    })

    // await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "e-commerce",
    });

}

export default connectDB;



// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     console.log(process.env.MONGODB_URI);

//     await mongoose.connect(process.env.MONGODB_URI, {
//       serverSelectionTimeoutMS: 10000,
//     });

//     console.log("DB Connected");
//   } catch (error) {
//     console.log("Mongo Error:", error);
//   }
// };

// export default connectDB;