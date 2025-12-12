import React, { useState } from "react";
import axios from "axios";

const BulkUploadZip = () => {
  const [csv, setCsv] = useState(null);
  const [zip, setZip] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!csv || !zip) {
      setMessage("Please select BOTH CSV and ZIP files.");
      return;
    }

    const formData = new FormData();
    formData.append("csv", csv);
    formData.append("images", zip);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/bulk-upload-zip`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );

      setMessage(data.success ? `✔ ${data.message}` : `❌ ${data.message}`);
    } catch (err) {
      console.log(err);
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <div className="p-10 w-full">
      <h2 className="text-2xl font-semibold mb-5">Bulk Upload (CSV + ZIP)</h2>

      <div className="border p-6 rounded-lg w-[60%] bg-white shadow">
        <p className="font-medium mb-2">Upload CSV file</p>
        <input
          type="file"
          accept=".csv"
          className="mb-4"
          onChange={(e) => setCsv(e.target.files[0])}
        />

        <p className="font-medium mb-2">Upload ZIP with images</p>
        <input
          type="file"
          accept=".zip"
          className="mb-4"
          onChange={(e) => setZip(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Upload
        </button>

        {message && <p className="mt-4 text-lg font-medium">{message}</p>}
      </div>
    </div>
  );
};

export default BulkUploadZip;
