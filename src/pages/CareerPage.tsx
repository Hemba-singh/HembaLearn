import React, { useState, useEffect, useMemo } from 'react';
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
  DialogActions,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import Header from '../components/Header';
import axios from 'axios';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  url: string;
}

const CareerPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        // Using a free, public job listings API
        const response = await axios.get('https://remotive.com/api/remote-jobs', {
          params: {
            limit: 20 // Fetch more jobs to have better filtering options
          }
        });
        
        // Transform the API response to match our JobListing interface
        const transformedJobs: JobListing[] = response.data.jobs.map((job: any) => ({
          id: job.id.toString(),
          title: job.title,
          company: job.company_name,
          location: job.job_type || 'Remote',
          type: job.job_type || 'Full-time',
          description: job.description,
          url: job.url
        }));

        setJobs(transformedJobs);
        setIsLoading(false);
      } catch (err) {
        console.error('Job fetch error:', err);
        setError('Failed to fetch jobs. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Memoized filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
      (typeFilter === '' || job.type.toLowerCase() === typeFilter.toLowerCase())
    );
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  const handleJobClick = (job: JobListing) => {
    setSelectedJob(job);
  };

  const handleCloseJobDialog = () => {
    setSelectedJob(null);
  };

  // Extract unique locations and job types
  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));
  const uniqueTypes = Array.from(new Set(jobs.map(job => job.type)));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Job Marketplace
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Explore exciting career opportunities across various industries
        </Typography>

        {/* Search and Filter Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 2, 
          mb: 4, 
          justifyContent: 'center' 
        }}>
          <TextField
            label="Search Jobs"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 300 }}
          />
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel>Location</InputLabel>
            <Select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              label="Location"
            >
              <MenuItem value="">All Locations</MenuItem>
              {uniqueLocations.map(location => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel>Job Type</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              label="Job Type"
            >
              <MenuItem value="">All Types</MenuItem>
              {uniqueTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : filteredJobs.length === 0 ? (
          <Alert severity="info">No jobs match your search criteria.</Alert>
        ) : (
          <Grid container spacing={3}>
            {filteredJobs.map((job) => (
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
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {job.company}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
                      <Chip label={job.location} size="small" color="primary" variant="outlined" />
                      <Chip label={job.type} size="small" color="secondary" variant="outlined" />
                    </Box>
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
        )}

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
                  <Chip label={selectedJob.company} color="primary" variant="outlined" />
                  <Chip label={selectedJob.type} color="secondary" variant="outlined" />
                  <Chip label={selectedJob.location} color="default" variant="outlined" />
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseJobDialog} color="primary">
                  Close
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  href={selectedJob.url}
                  target="_blank"
                  rel="noopener noreferrer"
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
