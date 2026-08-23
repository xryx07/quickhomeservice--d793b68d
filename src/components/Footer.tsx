
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">QuickHomeService</h2>
            <p className="mb-4 text-primary-foreground/70">
              Your one-stop solution for all home service needs. We connect you with the best service providers in your area.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/70 hover:text-primary-foreground">Services</Link>
              </li>
              <li>
                <Link to="/become-provider" className="text-primary-foreground/70 hover:text-primary-foreground">Become a Provider</Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services?category=cleaning" className="text-primary-foreground/70 hover:text-primary-foreground">Cleaning</Link>
              </li>
              <li>
                <Link to="/services?category=electrician" className="text-primary-foreground/70 hover:text-primary-foreground">Electrician</Link>
              </li>
              <li>
                <Link to="/services?category=plumbing" className="text-primary-foreground/70 hover:text-primary-foreground">Plumbing</Link>
              </li>
              <li>
                <Link to="/services?category=beauty" className="text-primary-foreground/70 hover:text-primary-foreground">Beauty & Spa</Link>
              </li>
              <li>
                <Link to="/services?category=appliance" className="text-primary-foreground/70 hover:text-primary-foreground">Appliance Repair</Link>
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
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-primary-foreground/70">
          <p>&copy; {new Date().getFullYear()} QuickHomeService. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
