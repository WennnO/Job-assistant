import React, { useState } from 'react';
import {
  Upload,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Download,
  Edit,
  Lightbulb,
  BarChart3
} from 'lucide-react';

const ResumeAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile || !jobDescription.trim()) {
      alert('Please upload a resume and enter a job description');
      return;
    }

    setLoading(true);
    
    // Mock analysis - replace with actual API call
    setTimeout(() => {
      setAnalysis({
        matchScore: 78,
        strengths: [
          'Strong technical background in React and Node.js',
          '5+ years of software development experience',
          'Experience with cloud platforms (AWS, Azure)',
          'Strong problem-solving and analytical skills'
        ],
        improvements: [
          'Add more specific examples of leadership experience',
          'Highlight experience with microservices architecture',
          'Include metrics and quantifiable achievements',
          'Add relevant certifications (AWS, Kubernetes)'
        ],
        missingSkills: [
          'Docker containerization',
          'Kubernetes orchestration',
          'GraphQL API development',
          'Machine learning basics'
        ],
        recommendations: [
          'Consider taking a Docker certification course',
          'Add a projects section showcasing your best work',
          'Include specific metrics in your experience descriptions',
          'Tailor your skills section to match the job requirements'
        ],
        keywordAnalysis: {
          matched: ['JavaScript', 'React', 'Node.js', 'AWS', 'Agile', 'Git'],
          missing: ['Docker', 'Kubernetes', 'GraphQL', 'TypeScript', 'CI/CD']
        }
      });
      setLoading(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resume Analyzer</h1>
        <p className="text-gray-600">Get AI-powered feedback on your resume against job descriptions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Resume</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {uploadedFile ? uploadedFile.name : 'Click to upload resume'}
                </p>
                <p className="text-sm text-gray-500">
                  PDF, DOC, or DOCX files up to 10MB
                </p>
              </label>
            </div>
            {uploadedFile && (
              <div className="mt-4 flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                File uploaded successfully
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
            <div className="mt-2 text-sm text-gray-500">
              {jobDescription.length} characters
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!uploadedFile || !jobDescription.trim() || loading}
            className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <BarChart3 className="h-5 w-5 mr-2" />
                Analyze Resume
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {analysis && (
            <>
              {/* Match Score */}
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Match Score</h2>
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(analysis.matchScore)} mb-4`}>
                    <span className={`text-3xl font-bold ${getScoreColor(analysis.matchScore)}`}>
                      {analysis.matchScore}%
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {analysis.matchScore >= 80 
                      ? 'Excellent match! Your resume aligns well with this job posting.'
                      : analysis.matchScore >= 60 
                      ? 'Good match with room for improvement.'
                      : 'Consider tailoring your resume to better match the requirements.'
                    }
                  </p>
                </div>
              </div>

              {/* Strengths */}
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Strengths
                </h2>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                  Areas for Improvement
                </h2>
                <ul className="space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Skills */}
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  Missing Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 text-purple-500 mr-2" />
                  AI Recommendations
                </h2>
                <ul className="space-y-2">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keyword Analysis */}
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Keyword Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-green-700 mb-2">Matched Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordAnalysis.matched.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-red-700 mb-2">Missing Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordAnalysis.missing.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card">
                <div className="flex space-x-4">
                  <button className="flex-1 btn-primary flex items-center justify-center">
                    <Download className="h-5 w-5 mr-2" />
                    Download Report
                  </button>
                  <button className="flex-1 btn-secondary flex items-center justify-center">
                    <Edit className="h-5 w-5 mr-2" />
                    Edit Resume
                  </button>
                </div>
              </div>
            </>
          )}

          {!analysis && !loading && (
            <div className="card text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to analyze?</h3>
              <p className="text-gray-600">
                Upload your resume and paste a job description to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
