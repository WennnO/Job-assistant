import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  Star,
  Briefcase,
  User,
  LogIn
} from 'lucide-react';

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const statusOptions = [
    { value: 'all', label: 'All Applications', count: 0 },
    { value: 'not_submitted', label: 'Not Submitted', count: 0 },
    { value: 'submitted', label: 'Submitted', count: 0 },
    { value: 'interview_requested', label: 'Interview Requested', count: 0 },
    { value: 'offer_received', label: 'Offer Received', count: 0 },
    { value: 'rejected', label: 'Rejected', count: 0 }
  ];

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockApplications = [
      {
        id: 1,
        company: 'TechCorp',
        position: 'Senior Software Engineer',
        status: 'interview_requested',
        appliedDate: '2024-01-15',
        location: 'San Francisco, CA',
        salary: '$120k - $150k',
        matchScore: 85,
        jobDescription: 'We are looking for a senior software engineer...',
        notes: 'Applied through LinkedIn referral',
        nextAction: 'Prepare for phone interview on Jan 20th'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        status: 'submitted',
        appliedDate: '2024-01-14',
        location: 'Remote',
        salary: '$90k - $120k',
        matchScore: 72,
        jobDescription: 'Join our fast-growing startup...',
        notes: 'Found through job board',
        nextAction: 'Wait for response'
      },
      {
        id: 3,
        company: 'BigTech Inc',
        position: 'AI Engineer',
        status: 'rejected',
        appliedDate: '2024-01-10',
        location: 'Seattle, WA',
        salary: '$130k - $160k',
        matchScore: 68,
        jobDescription: 'Work on cutting-edge AI projects...',
        notes: 'Need more ML experience',
        nextAction: 'Improve ML skills'
      },
      {
        id: 4,
        company: 'InnovateLab',
        position: 'Product Manager',
        status: 'offer_received',
        appliedDate: '2024-01-08',
        location: 'New York, NY',
        salary: '$110k - $140k',
        matchScore: 92,
        jobDescription: 'Lead product development...',
        notes: 'Great culture fit',
        nextAction: 'Review offer details'
      },
      {
        id: 5,
        company: 'DataFlow',
        position: 'Data Scientist',
        status: 'not_submitted',
        appliedDate: null,
        location: 'Austin, TX',
        salary: '$100k - $130k',
        matchScore: 78,
        jobDescription: 'Analyze large datasets...',
        notes: 'Draft application',
        nextAction: 'Submit application'
      }
    ];

    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, []);

  useEffect(() => {
    let filtered = applications;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Sort applications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'score':
          return b.matchScore - a.matchScore;
        default:
          return 0;
      }
    });

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter, sortBy]);


  const getStatusColor = (status) => {
    switch (status) {
      case 'not_submitted':
        return 'bg-gray-100 text-gray-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview_requested':
        return 'bg-blue-100 text-blue-800';
      case 'offer_received':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'not_submitted':
        return 'Not Submitted';
      case 'submitted':
        return 'Submitted';
      case 'interview_requested':
        return 'Interview Requested';
      case 'offer_received':
        return 'Offer Received';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600">Track and manage your job applications</p>
        </div>
        {user ? (
          <button className="btn-primary flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Application
          </button>
        ) : (
          <Link to="/register" className="btn-primary flex items-center">
            <User className="h-5 w-5 mr-2" />
            Sign Up to Track Applications
          </Link>
        )}
      </div>

      {/* Login Prompt for Non-logged in Users */}
      {!user && (
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <Briefcase className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Track Your Job Applications</h2>
                <p className="text-gray-600">Create an account to save and manage your job applications</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/login" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="company">Sort by Company</option>
              <option value="score">Sort by Match Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div key={application.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="h-6 w-6 text-primary-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{application.position}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusText(application.status)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 font-medium">{application.company}</p>
                    
                    <div className="flex items-center space-x-6 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {application.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {application.salary}
                      </div>
                      {application.appliedDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Applied {new Date(application.appliedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    
                    {application.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">"{application.notes}"</p>
                    )}
                    
                    {application.nextAction && (
                      <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Next Action:</strong> {application.nextAction}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-lg font-semibold text-gray-900">{application.matchScore}%</span>
                  </div>
                  <span className="text-xs text-gray-500">Match Score</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {user ? 'No applications found' : 'Sign in to track your applications'}
          </h3>
          <p className="text-gray-600 mb-4">
            {user ? (
              searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start by adding your first job application'
            ) : (
              'Create an account to start tracking your job applications and get personalized insights'
            )}
          </p>
          {user ? (
            <button className="btn-primary">
              <Plus className="h-5 w-5 mr-2" />
              Add Application
            </button>
          ) : (
            <div className="flex items-center justify-center space-x-3">
              <Link to="/login" className="btn-secondary">
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </Link>
              <Link to="/register" className="btn-primary">
                <User className="h-5 w-5 mr-2" />
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;
