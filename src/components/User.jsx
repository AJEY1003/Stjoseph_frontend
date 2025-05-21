import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [jobDescriptions, setJobDescriptions] = useState([]); // Array of {title, description}
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get-jobs/");
        // Expected response: array of {title, description}
        setJobDescriptions(res.data);
      } catch (err) {
        console.error("Failed to fetch job descriptions", err);
      }
    };

    fetchJobs();
  }, []);

  const handleFileChange = (e, index) => {
    setSelectedFiles({ ...selectedFiles, [index]: e.target.files[0] });
  };

  const handleUpload = async (index) => {
    const file = selectedFiles[index];
    if (!file) return alert("Please select a resume to upload.");

    const formData = new FormData();
    formData.append("file", file);  // must match backend param name
    formData.append("job_title", jobDescriptions[index].title); // must match backend param name

    try {
      const res = await axios.post("http://127.0.0.1:8000/resumes/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert(`✅ Uploaded successfully!\nName: ${res.data.name}\nFitness Score: ${res.data.score}`);
    } catch (err) {
      console.error("Upload failed", err);
      alert("❌ Upload failed. Check console for more details.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Job Descriptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobDescriptions.map((job, index) => (
          <div key={index} className="p-4 border rounded-lg shadow bg-white">
            <h3 className="font-semibold mb-2">{job.title}</h3>
            <p className="mb-2">{job.description}</p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, index)}
              className="mb-2"
            />
            <button
              onClick={() => handleUpload(index)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Upload Resume
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
