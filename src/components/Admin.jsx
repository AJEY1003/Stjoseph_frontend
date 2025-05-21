import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BACKEND_URL = "http://127.0.0.1:8000";

export default function Admin() {
  const [jobDescriptions, setJobDescriptions] = useState([{ title: "", description: "" }]);
  const [results, setResults] = useState([]);

  // Fetch results.csv as JSON on load
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/get-results-csv`);
        const text = await res.data; // already JSON if backend sends it later as JSON
        const csv = await res.data;

        const lines = csv.split("\n").slice(1); // skip header
        const data = lines.map(line => {
          const [name, email, phone, jobTitle, score] = line.split(",");
          return { name, email, phone, jobTitle, score: parseFloat(score) };
        }).filter(r => r.name); // filter empty lines
        setResults(data);
      } catch (err) {
        console.error("Failed to fetch results.csv:", err);
      }
    };

    fetchResults();
  }, []);

  const handleAdd = () => {
    setJobDescriptions([...jobDescriptions, { title: "", description: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...jobDescriptions];
    updated[index][field] = value;
    setJobDescriptions(updated);
  };

  const handleSubmit = async () => {
    try {
      const filtered = jobDescriptions.filter(job => job.title.trim() && job.description.trim());
      if (!filtered.length) return alert("Please enter at least one job.");

      await axios.post(`${BACKEND_URL}/admin/set-job-descriptions`, filtered);
      alert("✅ Job Descriptions Submitted");
    } catch (err) {
      console.error("Error sending descriptions:", err);
      alert("❌ Failed to post job descriptions.");
    }
  };

  const chartData = {
    labels: results.map(r => r.name),
    datasets: [{
      label: "Fitness Score",
      data: results.map(r => r.score),
      backgroundColor: "#3B82F6"
    }]
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {/* JOB POST FORM */}
      {jobDescriptions.map((job, idx) => (
        <div key={idx} className="mb-4 border p-3 rounded bg-white shadow-sm">
          <input
            type="text"
            placeholder={`Job Title ${idx + 1}`}
            value={job.title}
            onChange={(e) => handleChange(idx, "title", e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          <textarea
            placeholder={`Job Description ${idx + 1}`}
            value={job.description}
            onChange={(e) => handleChange(idx, "description", e.target.value)}
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>
      ))}
      <button className="btn btn-accent mr-2 mb-4" onClick={handleAdd}>+ Add Job Description</button>
      <button className="btn btn-primary" onClick={handleSubmit}>Post Descriptions</button>

      {/* CHART */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Resume Fitness Score Chart</h3>
        <Bar data={chartData} />
      </div>

      {/* TABLE */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Uploaded Candidates</h3>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Job Title</th>
              <th className="border px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{r.name}</td>
                <td className="border px-4 py-2">{r.email}</td>
                <td className="border px-4 py-2">{r.phone}</td>
                <td className="border px-4 py-2">{r.jobTitle}</td>
                <td className="border px-4 py-2">{r.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
