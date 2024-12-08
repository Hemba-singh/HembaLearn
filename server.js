const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Profile Data
const mockProfileData = {
  name: 'Alex Rodriguez',
  email: 'alex.rodriguez@example.com',
  bio: 'Full Stack Developer with a passion for creating innovative web solutions and pushing the boundaries of technology',
  location: 'New York, NY',
  occupation: 'Senior Full Stack Engineer',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  skills: [
    { name: 'React', level: 'advanced', endorsements: 25 },
    { name: 'Node.js', level: 'advanced', endorsements: 20 },
    { name: 'TypeScript', level: 'advanced', endorsements: 18 },
    { name: 'GraphQL', level: 'intermediate', endorsements: 12 },
    { name: 'Docker', level: 'intermediate', endorsements: 10 },
    { name: 'AWS', level: 'intermediate', endorsements: 8 }
  ],
  achievements: [
    { 
      title: 'Innovation Leadership Award', 
      description: 'Recognized for leading breakthrough technology initiatives', 
      date: '2023-09-15', 
      type: 'work',
      issuer: 'Tech Innovations Inc.',
      verificationUrl: 'https://example.com/verify/innovation-award'
    },
    {
      title: 'Open Source Contributor',
      description: 'Top contributor to major open-source projects',
      date: '2022-11-20',
      type: 'personal',
      verificationUrl: 'https://github.com/alexrodriguez'
    },
    {
      title: 'Machine Learning Certification',
      description: 'Advanced Certification in Machine Learning and AI',
      date: '2023-03-10',
      type: 'certification',
      issuer: 'Stanford Online',
      verificationUrl: 'https://example.com/verify/ml-cert'
    }
  ],
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexrodriguez', verified: true },
    { platform: 'GitHub', url: 'https://github.com/alexrodriguez', verified: true },
    { platform: 'Twitter', url: 'https://twitter.com/alextech', verified: false }
  ],
  contactPreferences: {
    emailVisibility: 'connections',
    messagePreference: 'connections',
    profileViewTracking: true,
    connectionRequestSetting: 'moderated'
  },
  professionalInterests: [
    'Cloud Computing', 
    'AI/ML', 
    'Serverless Architecture', 
    'Blockchain Technology',
    'DevOps',
    'Cybersecurity'
  ],
  languages: [
    'English', 
    'Spanish', 
    'Python (Programming)', 
    'JavaScript'
  ],
  lastUpdated: new Date().toISOString(),
  details: {
    description: 'Passionate technologist with a track record of delivering innovative solutions across multiple domains.',
    additionalInfo: {
      yearsOfExperience: 8,
      currentFocus: 'Scalable Web Applications',
      educationBackground: 'Computer Science, MIT'
    }
  }
};

// Profile API Endpoint
app.get('/api/profile', (req, res) => {
  // Simulate some server-side processing delay
  setTimeout(() => {
    res.json(mockProfileData);
  }, 500);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
