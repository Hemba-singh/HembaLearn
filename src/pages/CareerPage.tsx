import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions 
} from '@mui/material';
import Header from '../components/Header';

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const CareerPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  // Mock job data - in a real application, this would come from an API
  useEffect(() => {
    const mockJobs: JobListing[] = [
      {
        id: 1,
        title: 'Senior Software Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        description: 'We are seeking a talented Senior Software Engineer to join our innovative team and help build cutting-edge learning technologies.',
        requirements: [
          '5+ years of software development experience',
          'Expertise in React and TypeScript',
          'Strong understanding of modern web technologies',
          'Passion for creating exceptional user experiences'
        ]
      },
      {
        id: 2,
        title: 'UX/UI Designer',
        department: 'Design',
        location: 'Hybrid',
        type: 'Full-time',
        description: 'Join our design team to create intuitive and engaging user interfaces for our learning platform.',
        requirements: [
          '3+ years of UX/UI design experience',
          'Proficiency in Figma and design systems',
          'Strong portfolio of digital product design',
          'Understanding of user-centered design principles'
        ]
      },
      {
        id: 3,
        title: 'Content Strategist',
        department: 'Content',
        location: 'Remote',
        type: 'Full-time',
        description: 'We need a creative Content Strategist to develop and curate engaging learning content across our platforms.',
        requirements: [
          'Excellent writing and communication skills',
          'Experience in educational content creation',
          'Understanding of learning design principles',
          'Ability to create compelling narratives'
        ]
      }
    ];

    setJobs(mockJobs);
  }, []);

  const handleJobClick = (job: JobListing) => {
    setSelectedJob(job);
  };

  const handleCloseJobDialog = () => {
    setSelectedJob(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Join Our Team
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Explore exciting opportunities to grow your career and make an impact
        </Typography>

        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} md={4} key={job.id}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2">
                    {job.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
                    <Chip label={job.department} size="small" color="primary" variant="outlined" />
                    <Chip label={job.type} size="small" color="secondary" variant="outlined" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {job.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={() => handleJobClick(job)}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Job Details Dialog */}
        <Dialog 
          open={!!selectedJob} 
          onClose={handleCloseJobDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedJob && (
            <>
              <DialogTitle>{selectedJob.title}</DialogTitle>
              <DialogContent>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={selectedJob.department} color="primary" variant="outlined" />
                  <Chip label={selectedJob.type} color="secondary" variant="outlined" />
                  <Chip label={selectedJob.location} color="default" variant="outlined" />
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedJob.description}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Key Requirements:
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {selectedJob.requirements.map((req, index) => (
                    <Typography key={index} component="li">
                      {req}
                    </Typography>
                  ))}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseJobDialog} color="primary">
                  Close
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  href={`mailto:careers@hembalearn.com?subject=Application for ${selectedJob.title}`}
                >
                  Apply Now
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default CareerPage;
