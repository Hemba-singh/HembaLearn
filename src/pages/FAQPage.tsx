import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, UserIcon, Bell, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const FAQPage: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const faqData = [
    {
      question: "What is HembaLearn?",
      answer: "HembaLearn is an innovative learning platform designed to help students and professionals enhance their skills through personalized, interactive learning experiences."
    },
    {
      question: "How do I get started?",
      answer: "Simply create an account, choose your learning path, and begin your educational journey. Our platform offers guided courses and personalized recommendations."
    },
    {
      question: "Is my data secure?",
      answer: "We prioritize data security and privacy. All personal information is encrypted and stored securely, and we adhere to strict data protection regulations."
    },
    {
      question: "What types of courses are available?",
      answer: "We offer a wide range of courses across various domains including technology, business, design, personal development, and more."
    },
    {
      question: "Can I access courses on mobile?",
      answer: "Yes! HembaLearn is fully responsive and works seamlessly on desktop, tablet, and mobile devices."
    },
    {
      question: "Do you offer certificates?",
      answer: "Upon successful completion of a course, you will receive a verifiable digital certificate that you can share with employers and on professional networks."
    }
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <img src="/images/MYlogo.png" alt="HembaLearn Logo" className="h-8 w-8" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                  Hemba<span className="text-sky-600">Learn</span>
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Courses
                </Link>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
                <Link to="/blog" className="hover:text-primary">Blog</Link>
                <Link to="/careers" className="hover:text-primary">Careers</Link>
                <Link to="/faq" className="hover:text-primary font-bold">FAQ</Link>
              </nav>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/notifications"
                    className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative"
                  >
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  </Link>
                  <div className="relative">
                    <button
                      onClick={() => {/* Toggle profile dropdown */}}
                      className="flex items-center gap-2 focus:outline-none group"
                    >
                      <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white transition-transform group-hover:scale-105">
                        <UserIcon className="h-5 w-5" />
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => navigate('/signin')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Frequently Asked Questions
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </>
  );
};

export default FAQPage;
