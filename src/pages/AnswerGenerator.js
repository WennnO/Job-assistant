import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Copy,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Save,
  Lightbulb,
  FileText,
  User,
  LogIn
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AnswerGenerator = () => {
  const { user } = useAuth();
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [generatedAnswers, setGeneratedAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // API base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  const loadResumes = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/resumes/my-resumes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setResumes(response.data.data.resumes);
      }
    } catch (error) {
      console.error('Failed to load resumes:', error);
    }
  }, [API_BASE_URL]);

  // Load user's resumes
  useEffect(() => {
    if (user) {
      loadResumes();
    }
  }, [user, loadResumes]);

  const commonQuestions = [
    'Why are you interested in this role?',
    'What makes you a good fit for this position?',
    'Tell me about yourself',
    'What are your greatest strengths?',
    'What is your biggest weakness?',
    'Where do you see yourself in 5 years?',
    'Why do you want to work for our company?',
    'What questions do you have for us?'
  ];

  const handleGenerateAnswers = async () => {
    if (!jobDescription.trim() || questions.length === 0) {
      toast.error('Please provide a job description and select questions');
      return;
    }

    if (!resumeText.trim()) {
      toast.error('Please provide your resume text or select a resume');
      return;
    }

    if (!user) {
      toast.error('Please sign in to generate answers');
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/api/agents/generate-answers`, {
        resumeText,
        jobDescription,
        questions
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const answers = response.data.data.answers || questions.map((question, index) => ({
          id: index + 1,
          question,
          answer: `Based on your resume and the job description, here's a tailored answer for "${question}". This response highlights your relevant experience and aligns with the company's needs...`,
          tips: [
            'Use specific examples from your experience',
            'Connect your skills to the job requirements',
            'Show enthusiasm for the role and company'
          ],
          feedback: null
        }));
        
        setGeneratedAnswers(answers);
        toast.success('Answers generated successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to generate answers');
      }
    } catch (error) {
      console.error('Generate answers error:', error);
      toast.error(error.response?.data?.message || 'Failed to generate answers');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAnswer = (answer) => {
    navigator.clipboard.writeText(answer);
    toast.success('Answer copied to clipboard!');
  };

  const handleFeedback = (answerId, feedback) => {
    setGeneratedAnswers(prev => 
      prev.map(answer => 
        answer.id === answerId 
          ? { ...answer, feedback }
          : answer
      )
    );
  };

  const handleEditAnswer = (answerId, newAnswer) => {
    setGeneratedAnswers(prev => 
      prev.map(answer => 
        answer.id === answerId 
          ? { ...answer, answer: newAnswer }
          : answer
      )
    );
    setEditingAnswer(null);
  };

  const toggleQuestion = (question) => {
    if (questions.includes(question)) {
      setQuestions(questions.filter(q => q !== question));
    } else {
      setQuestions([...questions, question]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Answer Generator</h1>
        <p className="text-gray-600">Generate tailored answers to common interview questions based on your resume and job description</p>
      </div>

      {/* Login Prompt for non-authenticated users */}
      {!user && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <User className="h-8 w-8 text-blue-600 mr-4" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Sign in for personalized answers</h3>
              <p className="text-blue-700 mb-4">
                Get AI-powered answers tailored to your specific resume and experience. Sign in to access the full features.
              </p>
              <div className="flex space-x-3">
                <Link to="/login" className="btn-primary flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
                <Link to="/register" className="btn-secondary">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Job Description */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to get tailored answers..."
              className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Resume Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Resume</h2>
              {user && resumes.length > 0 && (
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Select from uploaded resumes
                </button>
              )}
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here or select from uploaded resumes..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
            {user && (
              <div className="mt-2 text-sm text-gray-500">
                {resumes.length > 0 ? (
                  <span>{resumes.length} resume{resumes.length !== 1 ? 's' : ''} available</span>
                ) : (
                  <span>No resumes uploaded yet. <Link to="/resume-analyzer" className="text-primary-600 hover:text-primary-700">Upload one here</Link></span>
                )}
              </div>
            )}
          </div>

          {/* Question Selection */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Questions</h2>
            <div className="space-y-3">
              {commonQuestions.map((question) => (
                <label key={question} className="flex items-start">
                  <input
                    type="checkbox"
                    checked={questions.includes(question)}
                    onChange={() => toggleQuestion(question)}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">{question}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {questions.length} question{questions.length !== 1 ? 's' : ''} selected
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateAnswers}
            disabled={!jobDescription.trim() || !resumeText.trim() || questions.length === 0 || loading || !user}
            className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <MessageSquare className="h-5 w-5 mr-2" />
                Generate Answers
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {generatedAnswers.length > 0 ? (
            generatedAnswers.map((item) => (
              <div key={item.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopyAnswer(item.answer)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="Copy answer"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditingAnswer(item.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="Edit answer"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {editingAnswer === item.id ? (
                  <div className="space-y-4">
                    <textarea
                      defaultValue={item.answer}
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAnswer(item.id, document.querySelector('textarea').value)}
                        className="btn-primary flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingAnswer(null)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Lightbulb className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-900">Tips for this answer:</span>
                      </div>
                      <ul className="space-y-1">
                        {item.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-blue-800">• {tip}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Feedback */}
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">Was this helpful?</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleFeedback(item.id, 'positive')}
                          className={`p-2 rounded-lg ${
                            item.feedback === 'positive' 
                              ? 'bg-green-100 text-green-600' 
                              : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                          }`}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleFeedback(item.id, 'negative')}
                          className={`p-2 rounded-lg ${
                            item.feedback === 'negative' 
                              ? 'bg-red-100 text-red-600' 
                              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="card text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to generate answers?</h3>
              <p className="text-gray-600">
                Provide a job description and select questions to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {generatedAnswers.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Copy className="h-6 w-6 text-primary-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Copy All Answers</p>
                <p className="text-sm text-gray-600">Copy all generated answers to clipboard</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Save className="h-6 w-6 text-primary-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Save as Template</p>
                <p className="text-sm text-gray-600">Save these answers as a template</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw className="h-6 w-6 text-primary-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Regenerate All</p>
                <p className="text-sm text-gray-600">Generate new answers with updated content</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Resume Selection Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Resume</h3>
            <div className="space-y-3">
              {resumes.map((resume) => (
                <button
                  key={resume.id}
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem('token');
                      const response = await axios.get(`${API_BASE_URL}/api/resumes/${resume.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      
                      if (response.data.success) {
                        setResumeText(response.data.data.contentText || '');
                        setShowResumeModal(false);
                        toast.success('Resume loaded successfully!');
                      }
                    } catch (error) {
                      console.error('Failed to load resume:', error);
                      toast.error('Failed to load resume');
                    }
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{resume.filename}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(resume.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowResumeModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerGenerator;
