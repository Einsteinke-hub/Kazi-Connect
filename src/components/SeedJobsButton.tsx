import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

const sampleJobs = (employerId: string) => [
  {
    title: "Frontend Developer",
    company: "Nairobi Tech Labs",
    company_email: "jobs@nairotechlabs.co.ke",
    company_phone: "+254712345678",
    location: "Nairobi",
    job_type: "Full-time",
    category: "Technology",
    salary_min: 80000,
    salary_max: 150000,
    description: "Build beautiful, responsive web interfaces using React and Tailwind. Collaborate with backend engineers and designers to deliver delightful user experiences.",
    requirements: "3+ years with React, TypeScript, Tailwind. Experience with REST APIs and state management.",
    employer_id: employerId,
    is_active: true,
    payment_status: "completed" as const,
    image_url: null as string | null,
  },
  {
    title: "Operations Manager",
    company: "Mombasa Logistics Co.",
    company_email: "careers@mombasalogistics.co.ke",
    company_phone: "+254723456789",
    location: "Mombasa",
    job_type: "Full-time",
    category: "Operations",
    salary_min: 100000,
    salary_max: 180000,
    description: "Lead daily logistics operations, optimize processes, and manage a team to ensure timely deliveries across the coast region.",
    requirements: "5+ years in operations/logistics, strong leadership and communication skills.",
    employer_id: employerId,
    is_active: true,
    payment_status: "completed" as const,
    image_url: null as string | null,
  },
  {
    title: "Customer Success Specialist",
    company: "Kisumu Cloud Services",
    company_email: "hr@kisumucloud.co.ke",
    company_phone: "+254734567890",
    location: "Kisumu (Hybrid)",
    job_type: "Contract",
    category: "Customer Support",
    salary_min: 60000,
    salary_max: 90000,
    description: "Support customers, onboard new clients, and ensure continued product adoption and satisfaction.",
    requirements: "Excellent communication, problem-solving mindset, experience with CRM tools.",
    employer_id: employerId,
    is_active: true,
    payment_status: "completed" as const,
    image_url: null as string | null,
  },
];

export function SeedJobsButton() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          variant: "destructive",
          title: "Login required",
          description: "Please log in to add sample jobs.",
        });
        setLoading(false);
        return;
      }

      const payload = sampleJobs(session.user.id);
      const { error } = await supabase.from("jobs").insert(payload);
      if (error) throw error;

      toast({ title: "Sample jobs added", description: "We added a few jobs to get you started." });
      // Simple refresh to show new data
      window.location.reload();
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSeed} disabled={loading} variant="outline">
      {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
      Add sample jobs
    </Button>
  );
}
