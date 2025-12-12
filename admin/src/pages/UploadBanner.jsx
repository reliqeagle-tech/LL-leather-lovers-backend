import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UploadBanner = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (!image) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post(`${backendUrl}/api/banner/add`, formData);
      toast.success("Banner uploaded successfully!");
      setImage(null);
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Upload Banner</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-3"
      />

      <button
        onClick={handleSubmit}
        className="ml-3 px-4 py-2 bg-black text-white rounded"
      >
        Upload Banner
      </button>
    </div>
  );
};

export default UploadBanner;
