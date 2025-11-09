import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Calendar, ArrowLeft, Phone, Mail, MessageCircle } from "lucide-react";
import { Loader2 } from "lucide-react";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return null;
    if (min && max) return `KES ${min.toLocaleString()} - ${max.toLocaleString()}`;
    if (min) return `From KES ${min.toLocaleString()}`;
    return `Up to KES ${max?.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
            <p className="text-muted-foreground mb-4">
              This job posting may have been removed or is no longer available.
            </p>
            <Button onClick={() => navigate("/jobs")}>Back to Jobs</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const salaryRange = formatSalary(job.salary_min, job.salary_max);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/jobs")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  {job.image_url && (
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <img
                        src={job.image_url}
                        alt={job.company}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
                    <p className="text-xl text-muted-foreground font-medium">
                      {job.company}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.job_type}
                  </Badge>
                  {salaryRange && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary flex items-center gap-1"
                    >
                      <DollarSign className="h-3 w-3" />
                      {salaryRange}
                    </Badge>
                  )}
                  <Badge variant="outline">{job.category}</Badge>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {job.requirements && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {job.requirements}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Company</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.company_phone ? (
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      size="lg"
                      asChild
                    >
                      <a href={`tel:${job.company_phone}`}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">{job.company_phone}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    No phone number available
                  </p>
                )}
                {job.company_email ? (
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      size="lg"
                      variant="secondary"
                      asChild
                    >
                      <a href={`mailto:${job.company_email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email Company
                      </a>
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">{job.company_email}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    No email available
                  </p>
                )}
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Posted: {formatDate(job.created_at)}</span>
                  </div>
                  {job.application_deadline && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {formatDate(job.application_deadline)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Company</p>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{job.location}</p>
                </div>
                <div>
                  <p className="font-medium">Job Type</p>
                  <p className="text-muted-foreground">{job.job_type}</p>
                </div>
                <div>
                  <p className="font-medium">Category</p>
                  <p className="text-muted-foreground">{job.category}</p>
                </div>
                {salaryRange && (
                  <div>
                    <p className="font-medium">Salary Range</p>
                    <p className="text-muted-foreground">{salaryRange}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetail;
