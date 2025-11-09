import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signUp, signUpSchema, type SignUpData } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const [seekerForm, setSeekerForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job_seeker" as const,
  });

  const [employerForm, setEmployerForm] = useState({
    companyName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employer" as const,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignUpData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();

  const handleSeekerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(seekerForm);
  };

  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit({
      ...employerForm,
      fullName: employerForm.fullName || employerForm.companyName,
    });
  };

  const handleSubmit = async (formData: Omit<SignUpData, "companyName"> & { companyName?: string }) => {
    setErrors({});
    setIsLoading(true);

    try {
      // Validate form data
      const validatedData = signUpSchema.parse(formData);
      
      // Attempt signup
      const { error } = await signUp(validatedData);

      if (error) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Account Created!",
          description: "You've successfully registered. Welcome to KaziConnect!",
        });
        navigate("/");
      }
    } catch (error: any) {
      if (error.errors) {
        const formErrors: Partial<Record<keyof SignUpData, string>> = {};
        error.errors.forEach((err: any) => {
          formErrors[err.path[0] as keyof SignUpData] = err.message;
        });
        setErrors(formErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mb-4">
                <Briefcase className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Join KaziConnect</h1>
              <p className="text-muted-foreground">Create your account and start your journey</p>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Choose your account type to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="seeker" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="seeker">Job Seeker</TabsTrigger>
                    <TabsTrigger value="employer">Employer</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="seeker">
                    <form onSubmit={handleSeekerSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="seeker-name">Full Name</Label>
                        <Input
                          id="seeker-name"
                          type="text"
                          placeholder="John Doe"
                          value={seekerForm.fullName}
                          onChange={(e) => setSeekerForm({ ...seekerForm, fullName: e.target.value })}
                          required
                        />
                        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="seeker-email">Email</Label>
                        <Input
                          id="seeker-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={seekerForm.email}
                          onChange={(e) => setSeekerForm({ ...seekerForm, email: e.target.value })}
                          required
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="seeker-password">Password</Label>
                        <Input
                          id="seeker-password"
                          type="password"
                          placeholder="Create a strong password"
                          value={seekerForm.password}
                          onChange={(e) => setSeekerForm({ ...seekerForm, password: e.target.value })}
                          required
                        />
                        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="seeker-confirm">Confirm Password</Label>
                        <Input
                          id="seeker-confirm"
                          type="password"
                          placeholder="Re-enter your password"
                          value={seekerForm.confirmPassword}
                          onChange={(e) => setSeekerForm({ ...seekerForm, confirmPassword: e.target.value })}
                          required
                        />
                        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-hero hover:opacity-90 transition-smooth"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Job Seeker Account"}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="employer">
                    <form onSubmit={handleEmployerSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input
                          id="company-name"
                          type="text"
                          placeholder="Your Company Ltd."
                          value={employerForm.companyName}
                          onChange={(e) => setEmployerForm({ ...employerForm, companyName: e.target.value })}
                          required
                        />
                        {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employer-full-name">Contact Person Name</Label>
                        <Input
                          id="employer-full-name"
                          type="text"
                          placeholder="John Doe"
                          value={employerForm.fullName}
                          onChange={(e) => setEmployerForm({ ...employerForm, fullName: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="employer-email">Work Email</Label>
                        <Input
                          id="employer-email"
                          type="email"
                          placeholder="hiring@company.com"
                          value={employerForm.email}
                          onChange={(e) => setEmployerForm({ ...employerForm, email: e.target.value })}
                          required
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="employer-password">Password</Label>
                        <Input
                          id="employer-password"
                          type="password"
                          placeholder="Create a strong password"
                          value={employerForm.password}
                          onChange={(e) => setEmployerForm({ ...employerForm, password: e.target.value })}
                          required
                        />
                        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="employer-confirm">Confirm Password</Label>
                        <Input
                          id="employer-confirm"
                          type="password"
                          placeholder="Re-enter your password"
                          value={employerForm.confirmPassword}
                          onChange={(e) => setEmployerForm({ ...employerForm, confirmPassword: e.target.value })}
                          required
                        />
                        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-hero hover:opacity-90 transition-smooth"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Employer Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Log in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Register;
