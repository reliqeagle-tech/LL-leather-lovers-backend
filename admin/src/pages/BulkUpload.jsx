import React, { useState } from "react";
import axios from "axios";

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV or JSON file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/bulk-upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token") 
         } 
        }

      );

      if (data.success) {
        setMessage(`✔ ${data.message}`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.log(error);
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <div className="p-10 w-full">
      <h2 className="text-2xl font-semibold mb-5">Bulk Upload Products (CSV / JSON)</h2>

      <div className="border p-6 rounded-lg w-[60%] bg-white shadow">
        <input
          type="file"
          accept=".csv, .json"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 block"
        />

        <button
          onClick={handleUpload}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Upload
        </button>

        {message && (
          <p className="mt-4 text-lg font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BulkUpload;
