import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, TrendingUp, Award, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To bridge the gap between talented Kenyan professionals and organizations seeking exceptional talent.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Integrity, transparency, and dedication to empowering Kenya's workforce.",
    },
    {
      icon: TrendingUp,
      title: "Our Vision",
      description: "To become Kenya's most trusted and comprehensive job portal, driving economic growth through employment.",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "50,000+ Job Seekers",
      description: "A diverse pool of talented professionals across all industries",
    },
    {
      icon: Award,
      title: "2,500+ Companies",
      description: "From startups to multinational corporations trust KaziConnect",
    },
    {
      icon: Shield,
      title: "Verified Listings",
      description: "All job postings are verified to ensure authenticity and quality",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About KaziConnect Kenya</h1>
            <p className="text-xl text-primary-foreground/90">
              Empowering Kenya's workforce by connecting talent with opportunity since 2025
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                KaziConnect Kenya was born from a simple observation: Kenya is home to incredibly talented professionals, 
                yet many struggle to find opportunities that match their skills and ambitions. At the same time, employers 
                face challenges in reaching qualified candidates efficiently.
              </p>
              <p>
                We set out to solve this problem by creating a modern, accessible platform that makes job searching and 
                recruitment seamless for everyone. Our platform combines cutting-edge technology with deep understanding 
                of the Kenyan job market to deliver results that matter.
              </p>
              <p>
                Today, KaziConnect Kenya serves thousands of job seekers and hundreds of companies across Kenya, from 
                Nairobi to Mombasa, Kisumu to Nakuru, and everywhere in between. We're proud to play a role in building 
                Kenya's economic future, one connection at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">What Drives Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose KaziConnect</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mb-4">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Join thousands of professionals and companies already using KaziConnect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="min-w-[200px]">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="outline" className="min-w-[200px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Browse Jobs
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

export default About;
