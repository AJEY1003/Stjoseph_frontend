import { useState } from 'react';
import ResumeUpload from './ResumeUpload';

export default function JobCard({ description }) {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="card bg-base-100 w-96 shadow-sm border">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Job Description"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Job Role</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => setShowUpload(true)}>
            Apply with your resume
          </button>
        </div>
        {showUpload && <ResumeUpload />}
      </div>
    </div>
  );
}