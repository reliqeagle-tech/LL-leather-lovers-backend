// import React from 'react'
// import { IoBagCheckOutline } from "react-icons/io5";
// import { IoIosLogOut } from "react-icons/io";
// import { IoMdHeartEmpty } from "react-icons/io";
// import { NavLink } from 'react-router-dom';
// import { FaCloudUploadAlt, FaRegUser } from "react-icons/fa";
// import Button from '@mui/material/Button';
// // import { MyContext } from '../../App';
// import { useState } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import { assets } from '../assets/assets';
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ShopContext } from "../context/ShopContext";
// import { useContext } from "react";



// const AccountSidebar = () => {
//     const [previews, setPreviews] = useState([]);
//     const [uploading, setUploading] = useState(false);
//     const [profileImage, setProfileImage] = useState(assets.profileImg);
//     const [previewImage, setPreviewImage] = useState(null);


//     // const context = useContext(MyContext);
//     let img_arr = [];
//     let uniqeArray = [];
//     let seletedImages = []; 


//     const { backendUrl } = useContext(ShopContext);


//     const onChangeFile = async(e, apiEndPoint) =>{
//         try {
//             setPreviews([]);
//             const files = e.target.files;
//             setUploading(true); 
//             console.log(files)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//     };

//      const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setPreviewImage(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//         setUploading(true);

//         const token = localStorage.getItem("token");

//         const { data } = await axios.post(
//             `${backendUrl}/api/user/upload-profile`,
//             formData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data",
//                 },
//             }
//         );

//         if (data.success) {
//             toast.success("Profile photo updated!");
//             setProfileImage(data.imageUrl);
//             setPreviewImage(null);
//         } else {
//             toast.error(data.message || "Upload failed");
//         }

//     } catch (error) {
//         console.error(error);
//         toast.error("Image upload failed");
//     } finally {
//         setUploading(false);
//     }
// };



//     return (
//         <div className='card bg-white shadow-md rounded-md sticky top-[10px]'>
//             <div className='w-full p-5 flex items-center justify-center flex-col'>
//                 {/* <div className='w-[110px] h-[110px] rounded-full overflow-hidden relative group'>
//                     <img src={assets.profileImg} className='w-full h-full object-cover ' alt="" />
//                     <div className='overlay w-[100%] h-[100%] top-0 left-0 absolute z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100'>
//                         <FaCloudUploadAlt className='text-[#fff] text-2xl' />
//                         <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' onChange={(e)=> onChangeFile(e, "/api/user/user-avatar")} name='avatar' />
//                     </div>
//                 </div> */}
//                 <label className="relative cursor-pointer group">
//                     <img
//                         src={previewImage || profileImage}
//                         alt="Profile"
//                         className={`w-28 h-28 rounded-full border-2 border-gray-300 object-cover transition 
//                         ${uploading ? "opacity-50" : "hover:opacity-80"}`}
//                     />
//                     {uploading && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full">
//                             <div className="w-6 h-6 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
//                         </div>
//                     )}
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                     />
//                     <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 opacity-0 group-hover:opacity-100 text-center transition">
//                         Change photo
//                     </div>
//                 </label>
//                 <h3 className='text-gray-800 font-semibold pt-4'>Rajesh Verma</h3>
//                 <h5 className='text-[13px] text-gray-500 font-medium'>reliqeagle@gmail.com</h5>
//             </div>

//             <ul className='list-none bg-[#f1f1f1]  myAccountTabs'>
//                 <li className='w-full'>
//                     <NavLink to='/profile'  className={({isActive})=> isActive ? "active block" : "block"}>
//                         <Button className='flex items-center gap-4 w-full !text-gray-700 !text-left !justify-start !px-4 !py-2' ><FaRegUser className='text-[16px]' /> My Profile</Button>
//                     </NavLink>
//                 </li>
//                 <li className='w-full'>
//                     <NavLink to='/wishlist' className={({isActive})=> isActive ? "active block" : "block"}>
//                         <Button className='flex items-center gap-3 w-full !text-gray-700 !text-left !justify-start !px-4 !py-2' ><IoMdHeartEmpty className='text-xl' /> My List</Button>
//                     </NavLink>
//                 </li>
//                 <li className='w-full'>
//                     <NavLink to='/orders' className={({isActive})=> isActive ? "active block" : "block"}>
//                         <Button className='flex items-center gap-3 w-full !text-gray-700 !text-left !justify-start !px-4 !py-2' ><IoBagCheckOutline className='text-xl' /> My Orders</Button>
//                     </NavLink>
//                 </li>
//                 <li className='w-full'>
//                     {/* <NavLink to='/my-account' exact={true} activeClassName='isActive'></NavLink> */}
//                     <Button onClick={handleLogout} className='flex items-center gap-3 w-full !text-gray-700 !text-left !justify-start !px-4 !py-2' ><IoIosLogOut className='text-xl' /> Logout</Button>
//                 </li>
//             </ul>
//         </div>

//     )
// }

// export default AccountSidebar




import React, { useState, useEffect, useContext } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const AccountSidebar = () => {

  const { backendUrl } = useContext(ShopContext);

  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // ✅ Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${backendUrl}/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [backendUrl]);

  // ✅ Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${backendUrl}/api/user/upload-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Profile photo updated!");
        setUser((prev) => ({
          ...prev,
          profilePhoto: data.imageUrl,
        }));
        setPreviewImage(null);
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) return null;

  const imageSrc =
    previewImage ||
    (user.profilePhoto
      ? `${backendUrl}${user.profilePhoto}`
      : assets.profileImg);

  return (
    <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
      <div className="w-full p-5 flex items-center justify-center flex-col">

        {/* ✅ Profile Image */}
        <label className="relative cursor-pointer group">
          <img
            src={imageSrc}
            alt="Profile"
            className={`w-28 h-28 rounded-full border-2 border-gray-300 object-cover transition 
            ${uploading ? "opacity-50" : "hover:opacity-80"}`}
          />

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full">
              <div className="w-6 h-6 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 opacity-0 group-hover:opacity-100 text-center transition">
            Change photo
          </div>
        </label>

        {/* ✅ Dynamic Name & Email */}
        <h3 className="text-gray-800 font-semibold pt-4">
          {user.name}
        </h3>

        <h5 className="text-[13px] text-gray-500 font-medium">
          {user.email}
        </h5>
      </div>

      {/* ✅ Sidebar Links */}
      <ul className="list-none bg-[#f1f1f1] myAccountTabs">
        <li className="w-full">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "active block" : "block"
            }
          >
            <Button className="flex items-center gap-4 w-full !text-gray-700 !text-left !justify-start !px-4 !py-2">
              <FaRegUser className="text-[16px]" /> My Profile
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? "active block" : "block"
            }
          >
            <Button className="flex items-center gap-3 w-full !text-gray-700 !text-left !justify-start !px-4 !py-2">
              <IoMdHeartEmpty className="text-xl" /> My List
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "active block" : "block"
            }
          >
            <Button className="flex items-center gap-3 w-full !text-gray-700 !text-left !justify-start !px-4 !py-2">
              <IoBagCheckOutline className="text-xl" /> My Orders
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <Button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full !text-gray-700 !text-left !justify-start !px-4 !py-2"
          >
            <IoIosLogOut className="text-xl" /> Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
