// src/components/Report.tsx
interface LighthouseReport {
  categories: {
    performance: {
      score: number;
    };
    accessibility: {
      score: number;
    };
    'best-practices': {
      score: number;
    };
    seo: {
      score: number;
    };
  };
  audits: {
    'first-contentful-paint': {
      displayValue: string;
    };
    'largest-contentful-paint': {
      displayValue: string;
    };
    'interactive': {
      displayValue: string;
    };
    'total-blocking-time': {
      displayValue: string;
    };
    'cumulative-layout-shift': {
      displayValue: string;
    };
    'speed-index': {
      displayValue: string;
    };
    'server-response-time': {
      displayValue: string;
    };
    'screenshot-thumbnails': {
      details: {
        items: {
          data: string;
        }[];
      };
    };
  };
}

interface ReportProps {
  report: LighthouseReport;
  device: 'Mobile' | 'Desktop';
}

const Report: React.FC<ReportProps> = ({ report, device }) => {
  // Handle cases where the report might be incomplete
  if (!report || !report.categories || !report.audits) {
    return <div className="text-center mt-8">Report data is incomplete or unavailable.</div>;
  }

  const performanceScore = (report.categories.performance?.score ?? 0) * 100;
  const accessibilityScore = (report.categories.accessibility?.score ?? 0) * 100;
  const bestPracticesScore = (report.categories['best-practices']?.score ?? 0) * 100;
  const seoScore = (report.categories.seo?.score ?? 0) * 100;

  const fcp = report.audits['first-contentful-paint']?.displayValue ?? 'N/A';
  const lcp = report.audits['largest-contentful-paint']?.displayValue ?? 'N/A';
  const tti = report.audits['interactive']?.displayValue ?? 'N/A';
  const tbt = report.audits['total-blocking-time']?.displayValue ?? 'N/A';
  const cls = report.audits['cumulative-layout-shift']?.displayValue ?? 'N/A';
  const speedIndex = report.audits['speed-index']?.displayValue ?? 'N/A';
  const serverResponseTime = report.audits['server-response-time']?.displayValue ?? 'N/A';
  const thumbnails = report.audits['screenshot-thumbnails']?.details.items ?? [];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{device} Report</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="font-bold text-lg mb-2">Performance</h3>
          <p className={`text-5xl font-bold ${getScoreColor(performanceScore)}`}>
            {Math.round(performanceScore)}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="font-bold text-lg mb-2">Accessibility</h3>
          <p className={`text-5xl font-bold ${getScoreColor(accessibilityScore)}`}>
            {Math.round(accessibilityScore)}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="font-bold text-lg mb-2">Best Practices</h3>
          <p className={`text-5xl font-bold ${getScoreColor(bestPracticesScore)}`}>
            {Math.round(bestPracticesScore)}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="font-bold text-lg mb-2">SEO</h3>
          <p className={`text-5xl font-bold ${getScoreColor(seoScore)}`}>
            {Math.round(seoScore)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">First Contentful Paint</h3>
          <p className="text-3xl">{fcp}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Largest Contentful Paint</h3>
          <p className="text-3xl">{lcp}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Time to Interactive</h3>
          <p className="text-3xl">{tti}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Total Blocking Time</h3>
          <p className="text-3xl">{tbt}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Cumulative Layout Shift</h3>
          <p className="text-3xl">{cls}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Speed Index</h3>
            <p className="text-3xl">{speedIndex}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Server Response Time</h3>
            <p className="text-3xl">{serverResponseTime}</p>
        </div>
      </div>
      {thumbnails.length > 0 && (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Screenshot Thumbnails</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {thumbnails.map((thumbnail, index) => (
                <img key={index} src={thumbnail.data} alt={`Screenshot thumbnail ${index + 1}`} className="w-full h-auto rounded-lg border" />
            ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default Report;
