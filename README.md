# AI-Powered Job Application Assistant Frontend

A professional, modern React application for managing job applications with AI-powered features including resume analysis, answer generation, and application tracking.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login/register with JWT tokens
- **Onboarding Flow** - Comprehensive preference collection (values, roles, locations, skills, etc.)
- **Dashboard** - Overview of applications, interviews, and AI insights
- **Application Management** - Track job applications with status updates
- **Resume Analyzer** - AI-powered resume scoring against job descriptions
- **Answer Generator** - Tailored interview question responses
- **Profile Management** - Complete professional profile with experience, education, skills

### AI Agents Integration
- **Resume-to-JD Scoring Agent** - Analyzes resume against job descriptions
- **Tailored Answer Agent** - Generates personalized interview responses
- **Autofill Agent** - Securely stores and manages user profile data

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router, Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-job-assistant-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.js       # Main layout with sidebar navigation
├── contexts/           # React Context providers
│   └── AuthContext.js  # Authentication state management
├── pages/              # Main application pages
│   ├── Login.js        # User login page
│   ├── Register.js     # User registration page
│   ├── Onboarding.js   # User preference setup flow
│   ├── Dashboard.js    # Main dashboard with stats and insights
│   ├── Applications.js # Job application management
│   ├── ResumeAnalyzer.js # AI resume analysis tool
│   ├── AnswerGenerator.js # AI interview answer generator
│   └── Profile.js      # User profile management
├── App.js              # Main application component with routing
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Main brand color
- **Gray Scale**: Professional gray tones for text and backgrounds
- **Status Colors**: Green (success), Yellow (warning), Red (error)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Clean white cards with subtle shadows
- **Buttons**: Primary, secondary, and outline variants
- **Forms**: Consistent input styling with focus states
- **Navigation**: Sidebar with active states and icons

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🌐 API Integration

The frontend is designed to work with a Node.js/Express backend API. Key endpoints include:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/dashboard/overview` - Dashboard statistics
- `GET /api/applications/my-applications` - User's job applications
- `POST /api/agents/resume-scorer` - Resume analysis
- `POST /api/agents/generate-answers` - Answer generation

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Features Explained

### Onboarding Flow
A comprehensive 9-step process that collects:
1. **Values** - What users value in a role
2. **Roles** - Job types and specializations
3. **Locations** - Preferred work locations
4. **Experience** - Career level and leadership preferences
5. **Company Size** - Ideal company size ranges
6. **Industries** - Exciting and avoid industries
7. **Skills** - Technical and soft skills
8. **Salary** - Minimum salary expectations
9. **Status** - Current job search status

### AI-Powered Features
- **Resume Analysis**: Upload resume and job description for AI scoring
- **Answer Generation**: Get tailored responses to common interview questions
- **Match Scoring**: See how well your profile matches job requirements
- **Insights**: AI-generated recommendations for improvement

### Application Tracking
- **Status Management**: Track applications through the hiring pipeline
- **Progress Monitoring**: Visual progress indicators and statistics
- **Notes & Actions**: Add notes and track next actions
- **Search & Filter**: Find applications quickly with advanced filtering

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route protection based on authentication status
- **Input Validation**: Client-side form validation
- **Secure Storage**: Local storage for tokens with automatic cleanup

## 🚀 Deployment

The application can be deployed to various platforms:

### Netlify (Recommended for Frontend)
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`

### AWS S3 + CloudFront
1. Build the project: `npm run build`
2. Upload `build` folder contents to S3 bucket
3. Configure CloudFront distribution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Note**: This frontend is designed to work with a corresponding backend API. Make sure to have the backend running on the configured API URL for full functionality.