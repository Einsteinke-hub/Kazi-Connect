import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, Users, Building2, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useJobs } from "@/hooks/useJobs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading } = useJobs({ pageSize: 4 });

  const handleSearch = (keyword: string, location: string) => {
    // Navigate to jobs page with search params
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (location) params.set("location", location);
    navigate(`/jobs?${params.toString()}`);
  };

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return undefined;
    if (min && max) return `KES ${min.toLocaleString()} - ${max.toLocaleString()}`;
    if (min) return `From KES ${min.toLocaleString()}`;
    return `Up to KES ${max?.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: "10,000+" },
    { icon: Users, label: "Job Seekers", value: "50,000+" },
    { icon: Building2, label: "Companies", value: "2,500+" },
    { icon: TrendingUp, label: "Placements", value: "15,000+" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={heroImage} alt="Kenya professionals" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Find Your Dream Job in Kenya
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Connect with top employers across Kenya. Your next opportunity awaits.
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Opportunities</h2>
            <p className="text-xl text-muted-foreground">
              Discover exciting career opportunities from top Kenyan companies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {isLoading ? (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                Loading jobs...
              </div>
            ) : data && data.jobs.length > 0 ? (
              data.jobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  type={job.job_type}
                  salary={formatSalary(job.salary_min, job.salary_max)}
                  description={job.description}
                  postedAt={formatDate(job.created_at)}
                  logo={job.image_url || undefined}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                No jobs available at the moment. Check back soon!
              </div>
            )}
          </div>
          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => navigate("/jobs")}
            >
              View All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* For Job Seekers */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">For Job Seekers</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Create your professional profile for free</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Apply to thousands of job opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Get job alerts matching your preferences</span>
                  </li>
                </ul>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="w-full md:w-auto"
                  onClick={() => navigate(user ? "/profile" : "/register")}
                >
                  Create Your Profile
                </Button>
              </div>

              {/* For Employers */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">For Employers</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Post jobs for only $10</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Reach thousands of qualified candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Easy M-Pesa payment integration</span>
                  </li>
                </ul>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="w-full md:w-auto"
                  onClick={() => navigate("/post-job")}
                >
                  Post a Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
