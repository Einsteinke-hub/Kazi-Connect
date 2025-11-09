import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard } from "lucide-react";

const PostJob = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    company_email: "",
    company_phone: "",
    location: "",
    job_type: "",
    category: "",
    salary_min: "",
    salary_max: "",
    description: "",
    requirements: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid file",
          description: "Please upload an image file",
        });
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5242880) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Image must be less than 5MB",
        });
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Double-check authentication
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    console.log("Session check:", { 
      hasSession: !!session, 
      hasUser: !!session?.user,
      userId: session?.user?.id,
      sessionError 
    });
    
    if (!session?.user) {
      console.error("No authenticated session found");
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to post a job",
      });
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${session.user.id}/${Date.now()}.${fileExt}`;
        
        console.log("Uploading image:", fileName);
        
        const { error: uploadError } = await supabase.storage
          .from('job-images')
          .upload(fileName, imageFile);

        if (uploadError) {
          console.error("Image upload error:", uploadError);
          throw uploadError;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('job-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
        console.log("Image uploaded successfully:", imageUrl);
      }

      const jobInsertData = {
        ...jobData,
        salary_min: jobData.salary_min ? parseInt(jobData.salary_min) : null,
        salary_max: jobData.salary_max ? parseInt(jobData.salary_max) : null,
        employer_id: session.user.id,
        is_active: false,
        payment_status: "pending",
        image_url: imageUrl,
      };

      console.log("Inserting job with data:", { 
        ...jobInsertData, 
        employer_id: session.user.id,
        hasAuthContext: !!session 
      });

      const { data: jobRecord, error: jobError } = await supabase
        .from("jobs")
        .insert([jobInsertData])
        .select()
        .single();

      if (jobError) {
        console.error("Job insert error:", jobError);
        throw new Error(`Failed to create job: ${jobError.message}`);
      }

      console.log("Job created successfully:", jobRecord);

      // Create Stripe checkout session
      setPaymentLoading(true);
      
      console.log("Creating payment session for job:", jobRecord.id);
      
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        'create-payment',
        {
          body: { jobId: jobRecord.id }
        }
      );

      if (paymentError) {
        console.error("Payment creation error:", paymentError);
        throw paymentError;
      }

      console.log("Payment session created:", paymentData);

      if (paymentData?.url) {
        // Redirect to Stripe checkout
        window.open(paymentData.url, '_blank');
        toast({
          title: "Redirecting to payment",
          description: "Complete your payment to activate the job listing",
        });
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create job posting",
      });
    } finally {
      setLoading(false);
      setPaymentLoading(false);
    }
  };


  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Post a New Job</CardTitle>
            <p className="text-sm text-muted-foreground">
              Only $10 per 30-day listing
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={jobData.title}
                  onChange={(e) =>
                    setJobData({ ...jobData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={jobData.company}
                  onChange={(e) =>
                    setJobData({ ...jobData, company: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company_email">Company Email *</Label>
                  <Input
                    id="company_email"
                    type="email"
                    value={jobData.company_email}
                    onChange={(e) =>
                      setJobData({ ...jobData, company_email: e.target.value })
                    }
                    placeholder="company@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_phone">Company Phone *</Label>
                  <Input
                    id="company_phone"
                    type="tel"
                    value={jobData.company_phone}
                    onChange={(e) =>
                      setJobData({ ...jobData, company_phone: e.target.value })
                    }
                    placeholder="0712345678"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={jobData.location}
                    onChange={(e) =>
                      setJobData({ ...jobData, location: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job_type">Job Type *</Label>
                  <Select
                    value={jobData.job_type}
                    onValueChange={(value) =>
                      setJobData({ ...jobData, job_type: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={jobData.category}
                  onChange={(e) =>
                    setJobData({ ...jobData, category: e.target.value })
                  }
                  placeholder="e.g., Technology, Healthcare, Finance"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary_min">Minimum Salary (KES)</Label>
                  <Input
                    id="salary_min"
                    type="number"
                    value={jobData.salary_min}
                    onChange={(e) =>
                      setJobData({ ...jobData, salary_min: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary_max">Maximum Salary (KES)</Label>
                  <Input
                    id="salary_max"
                    type="number"
                    value={jobData.salary_max}
                    onChange={(e) =>
                      setJobData({ ...jobData, salary_max: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={jobData.description}
                  onChange={(e) =>
                    setJobData({ ...jobData, description: e.target.value })
                  }
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={jobData.requirements}
                  onChange={(e) =>
                    setJobData({ ...jobData, requirements: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Job Image/Poster (Optional)</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-muted-foreground">
                  Upload a job poster or company image (Max 5MB, JPEG/PNG/WEBP)
                </p>
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-48 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading || paymentLoading}
                className="w-full"
              >
                {(loading || paymentLoading) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? (
                  "Saving Job..."
                ) : paymentLoading ? (
                  "Redirecting to Payment..."
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Post Job & Pay $10
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PostJob;
