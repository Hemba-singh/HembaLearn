import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { name: 'Courses', href: '/courses' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ];

  const courseCategories = [
    { name: 'Development', href: '/category/development' },
    { name: 'Business', href: '/category/business' },
    { name: 'Design', href: '/category/design' },
    { name: 'Marketing', href: '/category/marketing' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'FAQ', href: '/faq' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/hembalearn', label: 'Facebook' },
    { icon: Twitter, href: 'https://www.x.com/hembalearn', label: 'X' },
    { icon: Instagram, href: 'https://www.instagram.com/hembalearn', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/hembalearn', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/@hembalearn', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center">
              <img src="/image/MYlogo.png" alt="HembaLearn Logo" className="h-8 w-auto mr-2" />
              <span className="text-2xl font-bold text-white">HembaLearn</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Empowering learners worldwide with quality education and practical skills
              for a better future.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {courseCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <a
                href="mailto:support@hembalearn.com"
                className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="h-5 w-5 mr-2" />
                support@hembalearn.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
           &copy; {new Date().getFullYear()} HembaLearn. All rights reserved.
          </p>
          <p className="italic text-center text-gray-400">
            Developed by{' '}
            <a
              href="https://hemba-sanasam.framer.website/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Hemba sanasam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
