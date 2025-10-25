import { Shield, AlertTriangle, Lock, FileText, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Landing = () => {
  const crimeTypes = [
    { icon: Lock, title: "Financial Fraud", description: "Online banking scams, UPI fraud" },
    { icon: AlertTriangle, title: "Social Media Crimes", description: "Harassment, impersonation" },
    { icon: FileText, title: "Data Breach", description: "Unauthorized data access" },
    { icon: Users, title: "Cyberbullying", description: "Online harassment & threats" },
  ];

  const stats = [
    { label: "Complaints Filed", value: "12,450+", icon: FileText },
    { label: "Cases Resolved", value: "8,320+", icon: TrendingUp },
    { label: "Active Users", value: "25,600+", icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-cyber text-primary-foreground py-20 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMThjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Shield className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Report CyberCrime,<br />Get Instant Help
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            India's trusted platform for reporting cybercrime incidents. Get AI-powered guidance, 
            safety measures, and expert support within minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/file-complaint">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                File a Complaint
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/30 hover:bg-white/20">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Crime Types */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Common CyberCrime Types</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We handle various types of cybercrimes. Select your issue type to get started with your complaint.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crimeTypes.map((crime, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <crime.icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-lg">{crime.title}</CardTitle>
                  <CardDescription>{crime.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-secure">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and secure process to report cybercrime incidents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">File Complaint</h3>
              <p className="text-muted-foreground text-sm">
                Fill out the complaint form with incident details and upload evidence
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Get instant AI-powered guidance and safety recommendations
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-muted-foreground text-sm">
                Monitor your complaint status and receive updates in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-cyber text-primary-foreground border-0">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl mb-4">Need Help Now?</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                Don't wait. Report cybercrime immediately and protect yourself and others.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/file-complaint">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  File Your Complaint Now
                </Button>
              </Link>
              <p className="text-sm mt-4 opacity-80">Emergency Helpline: 1930 (Available 24/7)</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
