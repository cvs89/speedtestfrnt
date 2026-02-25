"use client";

import { useState } from 'react';
import axios from 'axios';
import Report from '@/components/Report';

type ReportType = 'mobile' | 'desktop';

export default function Home() {
  const [url, setUrl] = useState('');
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reportType, setReportType] = useState<ReportType>('mobile');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReports(null);

    try {
      const response = await axios.get(`http://localhost:8000/api/speedtest`, {
        params: { url },
      });
      setReports(response.data);
    } catch (err: any) {
        if (err.response) {
            setError(`Error: ${err.response.data.detail || 'Failed to fetch speed test results.'}`);
        } else if (err.request) {
            setError('Error: No response from server. Is the backend running?');
        } else {
            setError(`Error: ${err.message}`);
        }
        console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Website Speed Test</h1>
        <div className="flex justify-center mb-8">
          <a
            href="https://buymeacoffee.com/chandraveea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-yellow-500 px-4 py-2 font-medium text-black hover:bg-yellow-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h8a2 2 0 0 1 2 2v3a4 4 0 0 1-4 4H7V8Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 10h1a2 2 0 1 1 0 4h-1" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 20h10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 4s-1 1.2-1 2.3c0 1 .5 1.7 1 2.2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4s-1 1.2-1 2.3c0 1 .5 1.7 1 2.2" />
            </svg>
            <span>Buy Me A Coffee</span>
          </a>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Enter website URL (e.g., https://www.google.com)"
              aria-label="Website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:bg-gray-400"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {loading && (
            <div className="mt-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4">Analyzing... this may take a minute.</p>
            </div>
        )}

        {reports && (
          <div className="mt-8">
            <div className="flex justify-center mb-4 border-b">
              <button
                onClick={() => setReportType('mobile')}
                className={`py-2 px-4 text-lg font-medium ${reportType === 'mobile' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500'}`}
              >
                Mobile
              </button>
              <button
                onClick={() => setReportType('desktop')}
                className={`py-2 px-4 text-lg font-medium ${reportType === 'desktop' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500'}`}
              >
                Desktop
              </button>
            </div>
            {reportType === 'mobile'
              ? <Report report={reports.mobile} device="Mobile" />
              : <Report report={reports.desktop} device="Desktop" />
            }
          </div>
        )}
      </div>
    </main>
  );
}
