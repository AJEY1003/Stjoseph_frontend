import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = "http://127.0.0.1:8000";

export default function ResumeUpload() {
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchDescriptions() {
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/get-job-descriptions`);
        setJobDescriptions(res.data.descriptions);
      } catch (err) {
        console.error("Failed to fetch job descriptions", err);
      }
    }
    fetchDescriptions();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a resume PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_index", selectedJobIndex);

    try {
      const res = await axios.post(`${BACKEND_URL}/resumes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setResult(res.data);
    } catch (err) {
      alert("Error uploading resume: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Resume for Job Description</h2>
      <select
        value={selectedJobIndex}
        onChange={e => setSelectedJobIndex(Number(e.target.value))}
        className="mb-4 p-2 border rounded"
      >
        {jobDescriptions.map((desc, idx) => (
          <option key={idx} value={idx}>
            Job {idx + 1}: {desc.substring(0, 40)}...
          </option>
        ))}
      </select>
      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleSubmit} className="btn btn-primary">Upload Resume</button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-green-50">
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Score:</strong> {result.score}</p>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Email:</strong> {result.email}</p>
          <p><strong>Phone:</strong> {result.phone}</p>
        </div>
      )}
    </div>
  );
}
