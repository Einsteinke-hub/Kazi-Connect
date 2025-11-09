import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Target, TrendingUp, Zap, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Employers = () => {
  const benefits = [
    {
      icon: Users,
      title: "Access to Top Talent",
      description: "Reach over 50,000 qualified job seekers across Kenya",
    },
    {
      icon: Target,
      title: "Targeted Recruitment",
      description: "Filter and find candidates that match your exact requirements",
    },
    {
      icon: Zap,
      title: "Fast & Easy",
      description: "Post a job in minutes with our streamlined process",
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "Only $10 per job posting - no hidden fees",
    },
    {
      icon: TrendingUp,
      title: "Increase Visibility",
      description: "Get your job openings in front of the right candidates",
    },
    {
      icon: CheckCircle,
      title: "Verified Platform",
      description: "M-Pesa payment integration for secure transactions",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Account",
      description: "Sign up with your company details in less than 2 minutes",
    },
    {
      step: "2",
      title: "Post Your Job",
      description: "Fill in job details, requirements, and company information",
    },
    {
      step: "3",
      title: "Pay via M-Pesa",
      description: "Secure payment of $10 using Stripe",
    },
    {
      step: "4",
      title: "Receive Applications",
      description: "Review qualified candidates and manage applications in your dashboard",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Next Great Hire
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Connect with qualified candidates across Kenya. Post jobs for just $10.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Hiring Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Employers Choose KaziConnect</h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to find and hire the best talent in Kenya
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="shadow-card hover:shadow-hover transition-smooth">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground">
                Start recruiting in 4 simple steps
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero text-primary-foreground text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground">
                No subscriptions, no hidden fees
              </p>
            </div>
            <Card className="shadow-hover max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="text-5xl font-bold text-primary mb-2">$10</div>
                    <div className="text-muted-foreground">per job posting</div>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>30-day listing duration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Unlimited applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Application management dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Candidate profile access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Secure M-Pesa payment</span>
                    </li>
                  </ul>
                  <Link to="/register">
                    <Button size="lg" className="w-full bg-gradient-hero hover:opacity-90 transition-smooth">
                      Post Your First Job
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Perfect Candidate?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Join hundreds of companies already hiring through KaziConnect Kenya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="min-w-[200px]">
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="min-w-[200px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Employers;
