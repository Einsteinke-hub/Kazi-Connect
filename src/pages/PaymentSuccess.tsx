import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(true);
  const sessionId = searchParams.get("session_id");
  const jobId = searchParams.get("job_id");

  useEffect(() => {
    if (sessionId && jobId) {
      activateJob();
    }
  }, [sessionId, jobId]);

  const activateJob = async () => {
    try {
      console.log(`Activating job ${jobId} with session ${sessionId}`);
      
      const { data, error } = await supabase
        .from("jobs")
        .update({
          is_active: true,
          payment_status: "completed",
          payment_reference: sessionId,
        })
        .eq("id", jobId)
        .select()
        .single();

      if (error) {
        console.error("Error activating job:", error);
        throw error;
      }

      console.log("Job activated successfully:", data);
      toast({
        title: "Payment Successful!",
        description: "Your job posting is now live and visible to candidates",
      });
    } catch (error: any) {
      console.error("Activation error:", error);
      toast({
        variant: "destructive",
        title: "Activation Error",
        description: error.message || "Failed to activate job posting. Please contact support.",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <div className="mx-auto mb-4">
              {processing ? (
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
              ) : (
                <CheckCircle className="h-16 w-16 text-green-500" />
              )}
            </div>
            <CardTitle>
              {processing ? "Processing Payment..." : "Payment Successful!"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {processing
                ? "Please wait while we activate your job posting..."
                : "Your job posting is now live and visible to job seekers. Candidates can now view and apply to your position."}
            </p>
            {!processing && sessionId && (
              <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                <p><strong>Payment Reference:</strong> {sessionId}</p>
                <p><strong>Status:</strong> <span className="text-green-600">Completed</span></p>
              </div>
            )}
            {!processing && (
              <div className="space-y-2">
                <Button onClick={() => navigate("/jobs")} className="w-full">
                  View Job Listings
                </Button>
                <Button
                  onClick={() => navigate("/profile")}
                  variant="outline"
                  className="w-full"
                >
                  Go to My Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
