import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-blood-donation.jpg";
import { 
  Heart, 
  Users, 
  Search, 
  Shield, 
  UserPlus, 
  BarChart3,
  Droplets,
  Calendar,
  MapPin,
  CheckCircle
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: UserPlus,
      title: "Easy Registration",
      description: "Simple donor and recipient registration process with medical screening"
    },
    {
      icon: Search,
      title: "Smart Donor Search",
      description: "Find compatible donors by blood type, location, and availability"
    },
    {
      icon: BarChart3,
      title: "Inventory Management",
      description: "Track blood units, expiry dates, and maintain optimal stock levels"
    },
    {
      icon: Shield,
      title: "Secure & Verified",
      description: "Medical verification and secure handling of sensitive health data"
    }
  ];

  const stats = [
    { number: "1,247", label: "Registered Donors" },
    { number: "89", label: "Available Units" },
    { number: "456", label: "Lives Saved" },
    { number: "24/7", label: "Emergency Support" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-primary-glow/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                🩸 Saving Lives Together
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Connect Lives Through
                <span className="text-primary block">Blood Donation</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join our comprehensive blood donation management system. Register as a donor, 
                find compatible donors, or manage blood inventory with our secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/register">
                    <Heart className="h-5 w-5 mr-2" />
                    Become a Donor
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/donors">
                    <Search className="h-5 w-5 mr-2" />
                    Find Donors
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Blood donation hero"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="bg-medical-success p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Emergency Ready</p>
                    <p className="text-sm text-muted-foreground">24/7 Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-medical-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Blood Donation Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform provides all the tools needed for efficient blood donation 
              coordination, from donor registration to inventory management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-primary p-3 rounded-full w-fit mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join thousands of donors making a difference in their communities. 
            Your donation could be the gift of life someone desperately needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/register">
                <UserPlus className="h-5 w-5 mr-2" />
                Register Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/dashboard">
                <BarChart3 className="h-5 w-5 mr-2" />
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">BloodConnect</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Connecting donors with recipients to save lives through efficient 
                blood donation management.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/donors" className="hover:text-foreground">Find Donors</Link></li>
                <li><Link to="/register" className="hover:text-foreground">Register</Link></li>
                <li><Link to="/inventory" className="hover:text-foreground">Blood Stock</Link></li>
                <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  24/7 Support
                </p>
                <p>1-800-BLOOD-HELP</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BloodConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
