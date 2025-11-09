import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Logged out successfully",
      });
      navigate("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              KaziConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/jobs" className="text-foreground hover:text-primary transition-smooth">
              Find Jobs
            </Link>
            <Link to="/employers" className="text-foreground hover:text-primary transition-smooth">
              For Employers
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-smooth">
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
                <Link to="/post-job">
                  <Button variant="outline">Post Job</Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-hero hover:opacity-90 transition-smooth">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/jobs"
              className="block py-2 text-foreground hover:text-primary transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              to="/employers"
              className="block py-2 text-foreground hover:text-primary transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Employers
            </Link>
            <Link
              to="/about"
              className="block py-2 text-foreground hover:text-primary transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Profile
                    </Button>
                  </Link>
                  <Link to="/post-job" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Post Job
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-hero hover:opacity-90 transition-smooth">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
