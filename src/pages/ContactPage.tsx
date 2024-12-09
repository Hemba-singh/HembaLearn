import React, { useState } from 'react';
import Header from '../components/Header';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Snackbar, 
  Alert,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Send as SendIcon, 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  SupportAgent as SupportAgentIcon,
  ChatBubbleOutline as ChatIcon
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const contactSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address')
    .max(100, 'Email must not exceed 100 characters'),
  
  subject: yup
    .string()
    .trim()
    .required('Subject is required')
    .min(3, 'Subject must be at least 3 characters')
    .max(100, 'Subject must not exceed 100 characters'),
  
  message: yup
    .string()
    .trim()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must not exceed 500 characters')
});

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const { 
    control, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      // TODO: Replace with your actual backend API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset(); // Reset form after successful submission
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseNotification = () => {
    setSubmitSuccess(false);
    setSubmitError(false);
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: 'Email',
      content: 'support@hembalearn.com',
      link: 'mailto:support@hembalearn.com'
    },
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <LocationIcon />,
      title: 'Address',
      content: '123 Learning Street, Education City, ED 12345',
      link: 'https://maps.google.com/?q=123+Learning+Street,+Education+City,+ED+12345'
    }
  ];

  return (
    <>
      <Header />
      <Box>
        {/* Hero Section */}
        <Box 
          sx={{
            position: 'relative',
            backgroundColor: 'primary.main',
            color: 'white',
            py: { xs: 4, md: 45 },
            height: { xs: 'auto', md: '60vh' },
            minHeight: { xs: 400, md: 400 },
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Background Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(33,150,243,0.8) 0%, rgba(33,150,243,0.5) 100%)',
              zIndex: 1
            }}
          />

          {/* Content */}
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 0 } }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                fontSize: { xs: '1.8rem', md: 'h3.fontSize' }
              }}
            >
              We're Here to Help
            </Typography>
            
            <Typography 
              variant="body1" 
              component="p" 
              sx={{ 
                mb: 4, 
                color: 'rgba(255,255,255,0.9)',
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '0.9rem', md: 'h6.fontSize' }
              }}
            >
              Have a question, suggestion, or need support? Our dedicated team is ready to assist you. 
              Reach out and let's make your learning journey extraordinary.
            </Typography>

            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: { xs: 1, md: 2 },
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<SupportAgentIcon />}
                sx={{ 
                  px: { xs: 2, md: 3 }, 
                  py: { xs: 1, md: 1.5 },
                  boxShadow: 3,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Support Center
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ChatIcon />}
                sx={{ 
                  px: { xs: 2, md: 3 }, 
                  py: { xs: 1, md: 1.5 },
                  color: 'white',
                  borderColor: 'white',
                  mt: { xs: 1, sm: 0 },
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Live Chat
              </Button>
            </Box>
          </Container>

          {/* Decorative Shapes */}
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: 0,
              right: 0,
              height: 100,
              backgroundColor: 'background.default',
              transform: 'skewY(-3deg)',
              zIndex: 0
            }}
          />
        </Box>

        {/* Main Contact Content */}
        <section>
         <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, mt: { xs: 2, md: 4 }, mb: { xs: 2, md: 4 } }}>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, height: '100%' }}>
                <Typography variant="h5" component="h2" gutterBottom align="center">
                  Send Us a Message
                </Typography>
                <Typography variant="subtitle2" align="center" sx={{ mb: 3, fontSize: { xs: '0.8rem', md: 'subtitle1.fontSize' } }}>
                  Fill out the form below, and we'll get back to you soon.
                </Typography>
                
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Name"
                            variant="outlined"
                            required
                            size="small"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                          />
                        )}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            required
                            size="small"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                          />
                        )}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Controller
                        name="subject"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Subject"
                            variant="outlined"
                            required
                            size="small"
                            error={!!errors.subject}
                            helperText={errors.subject?.message}
                          />
                        )}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Controller
                        name="message"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Message"
                            multiline
                            rows={4}
                            variant="outlined"
                            required
                            error={!!errors.message}
                            helperText={errors.message?.message}
                          />
                        )}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        size="large"
                        disabled={isSubmitting}
                        startIcon={<SendIcon />}
                        sx={{ 
                          py: { xs: 1, md: 1.5 },
                          fontSize: { xs: '0.9rem', md: 'button.fontSize' }
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={5}>
              <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" component="h2" gutterBottom align="center">
                  Contact Details
                </Typography>
                
                {contactInfo.map((info, index) => (
                  <React.Fragment key={info.title}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        p: { xs: 1, md: 2 },
                        borderRadius: 2,
                        transition: 'background-color 0.3s',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.05)'
                        }
                      }}
                    >
                      <Box sx={{ mr: { xs: 1, md: 2 }, color: 'primary.main' }}>
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '0.9rem', md: 'subtitle1.fontSize' } }}>
                          {info.title}
                        </Typography>
                        <Tooltip title="Click to interact">
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            component="a"
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                              textDecoration: 'none', 
                              color: 'inherit',
                              fontSize: { xs: '0.75rem', md: 'body2.fontSize' },
                              '&:hover': {
                                color: 'primary.main'
                              }
                            }}
                          >
                            {info.content}
                          </Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                    {index < contactInfo.length - 1 && <Divider sx={{ my: 1 }} />}
                  </React.Fragment>
                ))}
                
                <Box mt="auto" textAlign="center" pt={2}>
                  <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.7rem', md: 'body2.fontSize' } }}>
                    Our support team is available Monday-Friday, 9am-5pm EST
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Success Notification */}
          <Snackbar 
            open={submitSuccess} 
            autoHideDuration={6000} 
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={handleCloseNotification} 
              severity="success" 
              sx={{ width: '100%' }}
            >
              Your message has been sent successfully!
            </Alert>
          </Snackbar>

          {/* Error Notification */}
          <Snackbar 
            open={submitError} 
            autoHideDuration={6000} 
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={handleCloseNotification} 
              severity="error" 
              sx={{ width: '100%' }}
            >
              Failed to send message. Please try again later.
            </Alert>
          </Snackbar>
         </Container>
        </section>
      </Box>
    </>
  );
};

export default ContactPage;
