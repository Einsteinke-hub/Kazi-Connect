import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const PaymentCanceled = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobId = searchParams.get("job_id");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <CardTitle>Payment Canceled</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your payment was canceled. Your job posting has been saved as a draft
              and can be activated once payment is completed.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate("/post-job")} className="w-full">
                Try Again
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full"
              >
                Go to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentCanceled;
