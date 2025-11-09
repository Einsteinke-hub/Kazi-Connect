import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useJobs } from "@/hooks/useJobs";
import { SeedJobsButton } from "@/components/SeedJobsButton";

const Jobs = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  
  const { data, isLoading } = useJobs({ 
    keyword, 
    location, 
    page, 
    pageSize: 6 
  });

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
    setLocation(searchParams.get("location") || "");
    setPage(1);
  }, [searchParams]);

  const handleSearch = (newKeyword: string, newLocation: string) => {
    setKeyword(newKeyword);
    setLocation(newLocation);
    setPage(1);
    
    const params = new URLSearchParams();
    if (newKeyword) params.set("keyword", newKeyword);
    if (newLocation) params.set("location", newLocation);
    setSearchParams(params);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Search Jobs</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="py-8 flex-1 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
              <div className="bg-card rounded-lg p-6 shadow-card sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm">Clear All</Button>
                </div>

                {/* Job Type */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Job Type</h3>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <Label htmlFor={type} className="text-sm cursor-pointer">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Location</h3>
                  <div className="space-y-2">
                    {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Remote'].map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox id={location} />
                        <Label htmlFor={location} className="text-sm cursor-pointer">
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Industry */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Industry</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Salary Range</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Salary" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-50k">Below KES 50,000</SelectItem>
                      <SelectItem value="50k-100k">KES 50,000 - 100,000</SelectItem>
                      <SelectItem value="100k-200k">KES 100,000 - 200,000</SelectItem>
                      <SelectItem value="200k+">Above KES 200,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </aside>

            {/* Jobs Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{data?.jobs.length || 0}</span> of <span className="font-semibold text-foreground">{data?.totalCount || 0}</span> jobs
                </p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                      <SelectItem value="salary-low">Lowest Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6">
                {isLoading ? (
                  <div className="text-center py-12 text-muted-foreground">
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
                  <div className="text-center py-12 text-muted-foreground space-y-4">
                    <p>No jobs found matching your criteria.</p>
                    <div>
                      <SeedJobsButton />
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {data && data.totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === data.totalPages || Math.abs(p - page) <= 1)
                      .map((p, idx, arr) => (
                        <>
                          {idx > 0 && arr[idx - 1] !== p - 1 && <span key={`ellipsis-${p}`} className="px-2 py-2">...</span>}
                          <Button 
                            key={p}
                            variant={p === page ? "default" : "outline"}
                            onClick={() => setPage(p)}
                            className={p === page ? "bg-primary text-primary-foreground" : ""}
                          >
                            {p}
                          </Button>
                        </>
                      ))
                    }
                    <Button 
                      variant="outline" 
                      onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                      disabled={page === data.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Jobs;
