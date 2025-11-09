import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login, loginSchema, type LoginData } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      // Validate form data
      const validatedData = loginSchema.parse(formData);
      
      // Attempt login
      const { error } = await login(validatedData);

      if (error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        navigate("/");
      }
    } catch (error: any) {
      if (error.errors) {
        const formErrors: Partial<Record<keyof LoginData, string>> = {};
        error.errors.forEach((err: any) => {
          formErrors[err.path[0] as keyof LoginData] = err.message;
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
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mb-4">
                <Briefcase className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Log in to your KaziConnect account</p>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-hero hover:opacity-90 transition-smooth"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Sign up
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

export default Login;
