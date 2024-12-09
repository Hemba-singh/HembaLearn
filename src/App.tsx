import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotificationsPage from './pages/NotificationsPage.tsx';
import MobileMenu from './components/MobileMenu.tsx';
import { Footer } from './components/Footer.tsx';
import { AuthProvider } from './components/AuthProvider.tsx';
import ExploreCourses from './pages/ExploreCourses.tsx';
import HomePage from './pages/HomePage.tsx';
import SignInPage from './pages/SignInPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import { EmailVerificationPage } from './pages/EmailVerificationPage.tsx';
import { OnboardingPage } from './pages/OnboardingPage.tsx';
import { CoursePage } from './pages/CoursePage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import CareerPage from './pages/CareerPage.tsx';
import TermsOfService from './components/TermsOfService.tsx';
import PrivacyPolicy from './components/PrivacyPolicy.tsx';
import FAQPage from './pages/FAQPage.tsx';
import { useAuthStore } from './store/useAuthStore';

const AppLayout = () => (
  <div className="App min-h-screen flex flex-col">
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/search" element={<div>Search Results</div>} />
        <Route path="/explore" element={<ExploreCourses />} />
        <Route path="/courses" element={<ExploreCourses />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, signOut } = useAuthStore(); // Use the Zustand store

  return (
    <Router>
      <AuthProvider>
        <AppLayout />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)}
          user={user}
          onSignOut={signOut}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
