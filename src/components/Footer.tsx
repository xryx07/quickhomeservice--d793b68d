
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">QuickHomeService</h2>
            <p className="mb-4 text-footer-foreground/70">
              Your one-stop solution for all home service needs. We connect you with the best service providers in your area.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-footer-foreground/70 hover:text-footer-foreground">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-footer-foreground/70 hover:text-footer-foreground">Services</Link>
              </li>
              <li>
                <Link to="/become-provider" className="text-footer-foreground/70 hover:text-footer-foreground">Become a Provider</Link>
              </li>
              <li>
                <Link to="/contact" className="text-footer-foreground/70 hover:text-footer-foreground">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services?category=cleaning" className="text-footer-foreground/70 hover:text-footer-foreground">Cleaning</Link>
              </li>
              <li>
                <Link to="/services?category=electrician" className="text-footer-foreground/70 hover:text-footer-foreground">Electrician</Link>
              </li>
              <li>
                <Link to="/services?category=plumbing" className="text-footer-foreground/70 hover:text-footer-foreground">Plumbing</Link>
              </li>
              <li>
                <Link to="/services?category=beauty" className="text-footer-foreground/70 hover:text-footer-foreground">Beauty & Spa</Link>
              </li>
              <li>
                <Link to="/services?category=appliance" className="text-footer-foreground/70 hover:text-footer-foreground">Appliance Repair</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={20} className="mr-2 mt-1" />
                <span>support@quickhomeservice.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="mr-2 mt-1" />
                <span>+91 8770219859</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-footer-foreground/20 mt-12 pt-6 text-center text-footer-foreground/70">
          <p>&copy; {new Date().getFullYear()} QuickHomeService. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
