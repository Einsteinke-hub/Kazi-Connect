import { Link } from "react-router-dom";
import { Briefcase, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-hero p-2 rounded-lg">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary-foreground">KaziConnect</span>
            </div>
            <p className="text-secondary-foreground/80 text-sm">
              Kenya's premier job portal connecting talented professionals with top employers.
            </p>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="hover:text-primary-foreground transition-smooth">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary-foreground transition-smooth">
                  Create Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/post-job" className="hover:text-primary-foreground transition-smooth">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>einstenmarto30@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+254 759 136 851</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/80">
          <p>&copy; 2025 KaziConnect Kenya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
