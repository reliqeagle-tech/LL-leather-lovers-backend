
// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ShopContext } from "../context/ShopContext.jsx";
// import { assets } from "../assets/assets";

// const ProfilePage = () => {
//     const [user, setUser] = useState(null);
//     const [previewImage, setPreviewImage] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const { backendUrl } = useContext(ShopContext);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setUser(data.user);
//             } catch (error) {
//                 console.error(error);
//                 toast.error("Failed to fetch user info");
//             }
//         };
//         fetchUser();
//     }, [backendUrl]);

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         // Show instant preview
//         setPreviewImage(URL.createObjectURL(file));

//         const formData = new FormData();
//         formData.append("image", file);

//         try {
//             setUploading(true);
//             const token = localStorage.getItem("token");

//             const { data } = await axios.post(
//                 `${backendUrl}/api/user/upload-profile`,
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );

//             if (data.success) {
//                 toast.success("Profile photo updated!");
//                 setUser((prev) => ({ ...prev, profilePhoto: data.imageUrl }));
//                 setPreviewImage(null); // Reset local preview
//             } else {
//                 toast.error(data.message || "Failed to upload image");
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("Image upload failed");
//         } finally {
//             setUploading(false);
//         }
//     };

//     if (!user) {
//         return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
//     }

//     const profileSrc = previewImage || user.profilePhoto || assets.uploadprofilephoto;

//     return (
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>

//             <div className="flex items-center gap-6 border-b pb-6 mb-6">
//                 <label className="relative cursor-pointer group">
//                     <img src={profileSrc} alt="Profile" className={`w-28 h-28 rounded-full border-2 border-gray-300 object-cover transition
//           ${uploading ? "opacity-50" : "hover:opacity-80"
//                         }`}
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

//                 <div>
//                     <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
//                     <p className="text-gray-600">{user.email}</p>
//                 </div>
//             </div>

//             {/* // <div className="space-y-2 text-gray-700">
//             //     <p>
//             //         <span className="font-medium">Joined:</span>{" "}
//             //         {new Date(user.createdAt).toLocaleDateString()}
//             //     </p>
//             //     {user.role && (
//             //         <p>
//             //             <span className="font-medium">Role:</span> {user.role}
//             //         </p>
//             //     )}
//             // </div> */}
//             <div className="p-4 border rounded-xl bg-gray-50">
//           <h4 className="font-semibold mb-3 text-gray-800">
//             Account Details
//           </h4>
//           <p>
//             <strong>Joined:</strong>{" "}
//             {user.createdAt
//               ? new Date(user.createdAt).toLocaleDateString()
//               : "Unknown"}
//           </p>
//           <p>
//             <strong>Role:</strong> {user.isAdmin ? "Admin" : "Customer"}
//           </p>
//         </div>
//             <div className="mt-8">

//                 <button
//                     onClick={() => {
//                         localStorage.removeItem("token");
//                         window.location.href = "/login";
//                     }}
//                     className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
//                 >
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;

// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ShopContext } from "../context/ShopContext.jsx";
// import { assets } from "../assets/assets";

// const ProfilePage = () => {
//     const [user, setUser] = useState(null);
//     const [previewImage, setPreviewImage] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [editing, setEditing] = useState(false);
//     const [editForm, setEditForm] = useState({ name: "", email: "" });
//     const [changingPassword, setChangingPassword] = useState(false);
//     const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     const [saving, setSaving] = useState(false);
//     const [changingPw, setChangingPw] = useState(false);
//     const [currentDate, setCurrentDate] = useState("");
//     const { backendUrl } = useContext(ShopContext);

//     // ✅ useEffect to set current date on component mount (no backend needed)
//     useEffect(() => {
//         const today = new Date().toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric"
//         });
//         setCurrentDate(today);  // e.g., "November 10, 2025"
//     }, []);

//     // ✅ NEW: Load profile image from localStorage on mount
//     useEffect(() => {
//         const loadLocalImage = () => {
//             const savedImage = localStorage.getItem('profileImageBase64');
//             if (savedImage) {
//                 const imageUrl = `data:image/jpeg;base64,${savedImage}`;  // Adjust mime if needed
//                 setPreviewImage(imageUrl);
//                 // Optional: Update user state if you want to persist in user obj
//                 // setUser(prev => ({ ...prev, profilePhoto: imageUrl }));
//             }
//         };
//         loadLocalImage();
//     }, []);

//     // ✅ UPDATED: Handle local image storage (no backend call)
//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         // Validate file
//         if (file.size > 5 * 1024 * 1024) {  // 5MB limit for localStorage
//             toast.error("File too large (max 5MB for local storage)");
//             return;
//         }
//         if (!file.type.startsWith('image/')) {
//             toast.error("Please select an image file");
//             return;
//         }

//         // Show instant preview
//         const previewUrl = URL.createObjectURL(file);
//         setPreviewImage(previewUrl);

//         try {
//             setUploading(true);

//             // ✅ Convert to base64 and store locally
//             const base64 = await new Promise((resolve, reject) => {
//                 const reader = new FileReader();
//                 reader.readAsDataURL(file);  // Includes data:image/... prefix
//                 reader.onload = () => resolve(reader.result.split(',')[1]);  // Extract pure base64
//                 reader.onerror = error => reject(error);
//             });

//             // Store base64 (without prefix) in localStorage
//             localStorage.setItem('profileImageBase64', base64);
//             toast.success("Profile photo saved successfully!");  // No backend, so "saved"

//             // Optional: Update user state
//             setUser((prev) => ({ ...prev, profilePhoto: previewUrl }));

//             // Cleanup preview URL (base64 is stored, not the temp URL)
//             URL.revokeObjectURL(previewUrl);
//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to save image locally");
//             setPreviewImage(null);
//         } finally {
//             setUploading(false);
//         }
//     };

//     // Optional: Add clear local image function (e.g., on logout)
//     const clearLocalImage = () => {
//         localStorage.removeItem('profileImageBase64');
//         setPreviewImage(null);
//         setUser((prev) => ({ ...prev, profilePhoto: null }));
//         toast.info("Local profile photo cleared");
//     };


//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setUser(data.user);
//                 setEditForm({ name: data.user.name, email: data.user.email }); // Pre-fill edit form
//             } catch (error) {
//                 console.error(error);
//                 toast.error("Failed to fetch user info");
//             }
//         };
//         fetchUser();
//     }, [backendUrl]);

//     // const handleImageUpload = async (e) => {
//     //     const file = e.target.files[0];
//     //     if (!file) return;

//     //     // Show instant preview
//     //     setPreviewImage(URL.createObjectURL(file));

//     //     const formData = new FormData();
//     //     formData.append("image", file);

//     //     try {
//     //         setUploading(true);
//     //         const token = localStorage.getItem("token");

//     //         const { data } = await axios.post(
//     //             `${backendUrl}/api/user/upload-profile`,
//     //             formData,
//     //             {
//     //                 headers: {
//     //                     Authorization: `Bearer ${token}`,
//     //                     "Content-Type": "multipart/form-data",
//     //                 },
//     //             }
//     //         );

//     //         if (data.success) {
//     //             toast.success("Profile photo updated!");
//     //             setUser((prev) => ({ ...prev, profilePhoto: data.imageUrl }));
//     //             setPreviewImage(null); // Reset local preview
//     //         } else {
//     //             toast.error(data.message || "Failed to upload image");
//     //         }
//     //     } catch (error) {
//     //         console.error(error);
//     //         toast.error("Image upload failed");
//     //     } finally {
//     //         setUploading(false);
//     //     }
//     // };

//     const handleEditToggle = () => {
//         setEditing(!editing);
//         if (!editing) {
//             setEditForm({ name: user.name, email: user.email });
//         }
//     };

//     const handleEditChange = (e) => {
//         setEditForm({ ...editForm, [e.target.name]: e.target.value });
//     };

//     const handleSaveEdit = async () => {
//         if (editForm.name.trim() === "" || editForm.email.trim() === "") {
//             toast.error("Name and email are required");
//             return;
//         }
//         try {
//             setSaving(true);
//             const token = localStorage.getItem("token");
//             const { data } = await axios.put(
//                 `${backendUrl}/api/user/profile`,
//                 editForm,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (data.success) {
//                 setUser(data.user);
//                 setEditing(false);
//                 toast.success("Profile updated successfully!");
//             } else {
//                 toast.error(data.message || "Failed to update profile");
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("Update failed");
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handlePasswordChange = (e) => {
//         setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
//     };

//     const handleSavePassword = async () => {
//         if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//             toast.error("New passwords do not match");
//             return;
//         }
//         if (passwordForm.newPassword.length < 6) {
//             toast.error("New password must be at least 6 characters");
//             return;
//         }
//         try {
//             setChangingPw(true);
//             const token = localStorage.getItem("token");
//             const { data } = await axios.put(
//                 `${backendUrl}/api/user/change-password`,
//                 passwordForm,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (data.success) {
//                 setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
//                 setChangingPassword(false);
//                 toast.success("Password changed successfully!");
//             } else {
//                 toast.error(data.message || "Failed to change password");
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("Password change failed");
//         } finally {
//             setChangingPw(false);
//         }
//     };

// const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
// };

//     if (!user) {
//         return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
//     }

//     const profileSrc = previewImage || user.profilePhoto || assets.uploadprofilephoto;
//     const joinedDate = user.createdAt && !isNaN(Date.parse(user.createdAt))
//         ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
//         : "Unknown";

//     return (
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>

//             <div className="flex items-center gap-6 border-b pb-6 mb-6">
//                 <label className="relative cursor-pointer group">
//                     <img
//                         src={profileSrc}
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

//                 <div className="flex-1">
//                     {editing ? (
//                         <div className="space-y-2">
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={editForm.name}
//                                 onChange={handleEditChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Name"
//                             />
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={editForm.email}
//                                 onChange={handleEditChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Email"
//                             />
//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={handleSaveEdit}
//                                     disabled={saving}
//                                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//                                 >
//                                     {saving ? "Saving..." : "Save"}
//                                 </button>
//                                 <button
//                                     onClick={handleEditToggle}
//                                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     ) : (
//                         <>
//                             <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
//                             <p className="text-gray-600">{user.email}</p>
//                             <button
//                                 onClick={handleEditToggle}
//                                 className="text-blue-600 hover:underline text-sm mt-1"
//                             >
//                                 Edit Profile
//                             </button>
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* <div className="p-4 border rounded-xl bg-gray-50 mb-6">
//                 <h4 className="font-semibold mb-3 text-gray-800">Account Details</h4>
//                 <div className="space-y-2 text-gray-700">
//                     <p>
//                         <strong>Joined:</strong> {joinedDate}
//                     </p>
//                     <p>
//                         <strong>Role:</strong> {user.isAdmin ? "Admin" : "Customer"}
//                     </p>
//                 </div>
//             </div> */}

//                 <div className="p-4 border rounded-xl bg-gray-50 mb-6">
//                 <h4 className="font-semibold mb-3 text-gray-800">Account Details</h4>
//                 <div className="space-y-2 text-gray-700">
//                     {/* <p>
//                         <strong>Joined:</strong> {joinedDate}
//                     </p> */}
//                     <p>
//                         <strong>Role:</strong> {user.isAdmin ? "Admin" : "Customer"}
//                     </p>
//                     <p>  {/* ✅ Added current date display */}
//                         <strong>Joined:</strong> {currentDate}
//                     </p>
//                 </div>
//             </div>

//             <div className="space-y-6">
//                 <button
//                     onClick={() => setChangingPassword(!changingPassword)}
//                     className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left"
//                 >
//                     {changingPassword ? "Cancel" : "Change Password"} {changingPw && "..."}
//                 </button>

//                 {changingPassword && (
//                     <div className="space-y-3 p-4 border rounded-lg bg-white">
//                         <input
//                             type="password"
//                             name="currentPassword"
//                             value={passwordForm.currentPassword}
//                             onChange={handlePasswordChange}
//                             placeholder="Current Password"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <input
//                             type="password"
//                             name="newPassword"
//                             value={passwordForm.newPassword}
//                             onChange={handlePasswordChange}
//                             placeholder="New Password"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             value={passwordForm.confirmPassword}
//                             onChange={handlePasswordChange}
//                             placeholder="Confirm New Password"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <button
//                             onClick={handleSavePassword}
//                             disabled={changingPw}
//                             className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
//                         >
//                             {changingPw ? "Changing..." : "Change Password"}
//                         </button>
//                     </div>
//                 )}

//                 {/* Optional: Add links to other sections like Orders, Addresses */}
//                 <div className="grid grid-cols-1 ">
//                     <a
//                         href="/orders"
//                         className="block py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-center"
//                     >
//                         View Orders
//                     </a>
//                 </div>
//             </div>

//             <div className="mt-8 text-center">
//                 <button
//                     onClick={handleLogout}
//                     className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//                 >
//                     Logout
//                 </button>
//                 {/* ✅ Optional: Add clear button */}
//                 <button
//                     onClick={clearLocalImage}
//                     className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
//                 >
//                     Clear Local Photo
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;





// import React from 'react'
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// import { useContext } from 'react';
// // import { MyContext } from '../../App';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import AccountSidebar from '../components/AccountSidebar';
// import Title from '../components/Title';

// const MyAccount = () => {
//     // const context = useContext(MyContext);
//     const navigate = useNavigate();

//     // useEffect(()=>{
//     //     if(context?.isLogin===true){
//     //         navigate("/");
//     //     }
//     // },[])

//     // useEffect(()=>{
//     //     const token = localStorage.getItem("accessToken");
//     //     if(token === null){
//     //         navigate("/");
//     //     }
//     // },[context?.isLogin])
//   return (
//     <section className='py-10 w-full'>
//         <div className='container flex flex-col md:flex-row gap-5 m-auto'>
//             <div className='col1 md:w-[20%]'>
//                 <AccountSidebar />
//             </div>

//             <div className='col2 md:w-[60%]'>
//                 <div className="text-center p-4 text-2xl">
//           <Title text1={"MY"} text2={"PROFILE"} />
//         </div>
//                 <div className='card bg-white shadow-lg rounded-md p-5'>
//                     {/* <div className='border-b border-gray-300 pb-2'>
//                         <h2 className='text-gray-800 font-semibold text-lg'>My Profile</h2>
//                     </div> */}

//                     <form action="" className='mt-5'>
//                         <div className='flex items-center gap-5'>
//                             <div className='w-[50%]'>
//                                 <TextField  label="First Name" variant="outlined" size='small' className='w-full' />
//                             </div>
//                             <div className='w-[50%]'>
//                                 <TextField  label="Last Name" variant="outlined" size='small' className='w-full' />
//                             </div>
//                         </div>
//                         <div className='flex items-center mt-4'>
//                             <div className='w-[100%]'>
//                                 <TextField  label="Email" variant="outlined" size='small' className='w-full' />
//                             </div>
//                         </div>
//                         <div className='w-[50%] mt-4'>
//                             <TextField  label="Mob no." variant="outlined" size='small' className='w-full' />
//                         </div>
//                         <br />
//                         <div className='flex items-center gap-4'>
//                             <Button className='!bg-[#3872fa] !px-4 !text-white '>Save</Button>
//                             <Button className='!bg-[#3872fa] !px-4 !text-white btn-border'>Cancel</Button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </section>
//   )
// }

// export default MyAccount




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountSidebar from '../components/AccountSidebar';

const InputField = ({ label, type = "text", placeholder, value, onChange, icon }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-white/40 font-semibold uppercase tracking-widest"
      style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "2px" }}>
      {label}
    </label>
    <div className="relative group">
      {icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25
          group-focus-within:text-indigo-400 transition-colors duration-200 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg text-white/80 placeholder-white/20
          focus:outline-none transition-all duration-200"
        style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: "13px",
          padding: icon ? "11px 14px 11px 40px" : "11px 14px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "none",
        }}
        onFocus={e => {
          e.target.style.border = "1px solid rgba(99,102,241,0.5)";
          e.target.style.background = "rgba(99,102,241,0.05)";
          e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
        }}
        onBlur={e => {
          e.target.style.border = "1px solid rgba(255,255,255,0.09)";
          e.target.style.background = "rgba(255,255,255,0.04)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  </div>
);

const MyAccount = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
  });

  const handleChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }}
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-10">

      {/* Top separator */}
      <div className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

        {/* ── SIDEBAR ── */}
        <div className="md:w-[24%] shrink-0">
          <AccountSidebar />
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 min-w-0 max-w-4xl">

          {/* Page heading */}
          <div className="mb-7">
            <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-1"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "4px" }}>
              Account
            </p>
            <h1 className="text-white font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,40px)" }}>
              My{" "}
              <em className="text-indigo-400 italic font-light">Profile</em>
            </h1>
            <div className="w-10 h-px mt-3"
              style={{ background: "linear-gradient(90deg, #6366f1, transparent)" }} />
          </div>

          {/* ── PROFILE CARD ── */}
          <div className="rounded-2xl border border-white/[0.07] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)" }}>

            {/* Card top accent */}
            <div className="h-px w-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #a5b4fc, transparent)" }} />

            <div className="p-6 sm:p-8">

              {/* Avatar row */}
              <div className="flex items-center gap-5 mb-8 pb-8 border-b border-white/[0.06]">
                {/* <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0
                  border-2 border-indigo-500/40"
                  style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(129,140,248,0.8)" strokeWidth="1.2" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div> */}
                {/* <div>
                  <p className="text-white font-light"
                    style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px" }}>
                    {form.firstName || form.lastName
                      ? `${form.firstName} ${form.lastName}`.trim()
                      : "Your Name"}
                  </p>
                  <p className="text-white/30 mt-0.5"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px" }}>
                    {form.email || "your@email.com"}
                  </p>
                </div> */}
                {/* Member badge */}
                <div className="ml-auto hidden sm:flex items-center gap-1.5
                  bg-indigo-600/10 border border-indigo-500/20 rounded-full px-3 py-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#818cf8">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-indigo-300 font-semibold uppercase tracking-widest"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px" }}>
                    Premium Member
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="space-y-5">

                <p className="text-white/25 uppercase tracking-widest font-semibold"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "3px" }}>
                  Personal Information
                </p>

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="First Name" placeholder="John"
                    value={form.firstName} onChange={handleChange("firstName")}
                    icon={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    }
                  />
                  <InputField
                    label="Last Name" placeholder="Doe"
                    value={form.lastName} onChange={handleChange("lastName")}
                    icon={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    }
                  />
                </div>

                {/* Email */}
                <InputField
                  label="Email Address" type="email" placeholder="john@example.com"
                  value={form.email} onChange={handleChange("email")}
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  }
                />

                {/* Phone */}
                <div className="w-full sm:w-1/2">
                  <InputField
                    label="Mobile Number" type="tel" placeholder="+1 (415) 555-0132"
                    value={form.phone} onChange={handleChange("phone")}
                    icon={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.88a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                      </svg>
                    }
                  />
                </div>

                {/* Divider */}
                <div className="h-px w-full border-t border-white/[0.06]" />

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-1">
                  {/* Save */}
                  <button type="submit"
                    className="relative overflow-hidden inline-flex items-center gap-2
                      text-white rounded-lg px-7 py-2.5 font-semibold uppercase tracking-widest
                      hover:opacity-90 transition-all duration-200 group"
                    style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                      letterSpacing: "2px", background: "#6366f1"
                    }}>
                    <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100
                      origin-left transition-transform duration-300 rounded-lg" />
                    <svg className="relative z-10" width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span className="relative z-10">{saved ? "Saved!" : "Save Changes"}</span>
                  </button>

                  {/* Cancel */}
                  <button type="button"
                    onClick={() => setForm({ firstName: "", lastName: "", email: "", phone: "" })}
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white/70
                      rounded-lg px-5 py-2.5 border border-white/[0.08] hover:border-white/20
                      transition-all duration-200 font-semibold uppercase tracking-widest"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "2px" }}>
                    Cancel
                  </button>
                </div>

                {/* Success message */}
                {saved && (
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
                    rounded-lg px-4 py-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="#4ade80" strokeWidth="2" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-green-400"
                      style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px" }}>
                      Profile saved successfully!
                    </span>
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;