import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Filter,
  User,
  Heart,
  Clock
} from "lucide-react";

const DonorSearch = () => {
  const [searchFilters, setSearchFilters] = useState({
    bloodType: "",
    location: "",
    availability: "",
    searchQuery: ""
  });

  // Mock donor data
  const donors = [
    {
      id: 1,
      name: "John Smith",
      bloodType: "A+",
      location: "New York, NY",
      phone: "(555) 123-4567",
      email: "john.smith@email.com",
      lastDonation: "2023-11-15",
      totalDonations: 12,
      available: true,
      distance: "2.3 miles",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      bloodType: "O-",
      location: "Brooklyn, NY",
      phone: "(555) 234-5678",
      email: "sarah.j@email.com",
      lastDonation: "2023-12-20",
      totalDonations: 8,
      available: true,
      distance: "4.7 miles",
      verified: true
    },
    {
      id: 3,
      name: "Mike Chen",
      bloodType: "B+",
      location: "Queens, NY",
      phone: "(555) 345-6789",
      email: "mike.chen@email.com",
      lastDonation: "2024-01-10",
      totalDonations: 15,
      available: false,
      distance: "6.1 miles",
      verified: true
    },
    {
      id: 4,
      name: "Emily Davis",
      bloodType: "AB+",
      location: "Manhattan, NY",
      phone: "(555) 456-7890",
      email: "emily.davis@email.com",
      lastDonation: "2023-10-30",
      totalDonations: 5,
      available: true,
      distance: "1.8 miles",
      verified: false
    },
    {
      id: 5,
      name: "Robert Wilson",
      bloodType: "A-",
      location: "Bronx, NY",
      phone: "(555) 567-8901",
      email: "r.wilson@email.com",
      lastDonation: "2023-12-05",
      totalDonations: 22,
      available: true,
      distance: "8.2 miles",
      verified: true
    },
    {
      id: 6,
      name: "Lisa Brown",
      bloodType: "O+",
      location: "Staten Island, NY",
      phone: "(555) 678-9012",
      email: "lisa.brown@email.com",
      lastDonation: "2024-01-08",
      totalDonations: 9,
      available: true,
      distance: "12.5 miles",
      verified: true
    }
  ];

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const locations = ["New York, NY", "Brooklyn, NY", "Queens, NY", "Manhattan, NY", "Bronx, NY", "Staten Island, NY"];

  const filteredDonors = donors.filter(donor => {
    const matchesBloodType = !searchFilters.bloodType || donor.bloodType === searchFilters.bloodType;
    const matchesLocation = !searchFilters.location || donor.location === searchFilters.location;
    const matchesAvailability = !searchFilters.availability || 
      (searchFilters.availability === "available" && donor.available) ||
      (searchFilters.availability === "unavailable" && !donor.available);
    const matchesQuery = !searchFilters.searchQuery || 
      donor.name.toLowerCase().includes(searchFilters.searchQuery.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchFilters.searchQuery.toLowerCase());

    return matchesBloodType && matchesLocation && matchesAvailability && matchesQuery;
  });

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchFilters({
      bloodType: "",
      location: "",
      availability: "",
      searchQuery: ""
    });
  };

  const handleContactDonor = (donor: any) => {
    // Mock contact functionality
    console.log("Contacting donor:", donor);
  };

  const getAvailabilityStatus = (available: boolean, lastDonation: string) => {
    if (!available) return { text: "Unavailable", color: "bg-destructive" };
    
    const lastDonationDate = new Date(lastDonation);
    const today = new Date();
    const daysSinceLastDonation = Math.floor((today.getTime() - lastDonationDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastDonation < 56) {
      return { text: "Recently Donated", color: "bg-medical-warning" };
    }
    return { text: "Available", color: "bg-medical-success" };
  };

  return (
    <div className="min-h-screen bg-medical-bg">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Blood Donors</h1>
          <p className="text-muted-foreground">Search for registered blood donors by type and location</p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
            <CardDescription>Filter donors by blood type, location, and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Name or location..."
                    value={searchFilters.searchQuery}
                    onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select value={searchFilters.bloodType} onValueChange={(value) => handleFilterChange("bloodType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {bloodTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={searchFilters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select value={searchFilters.availability} onValueChange={(value) => handleFilterChange("availability", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Donors</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Found {filteredDonors.length} donor{filteredDonors.length !== 1 ? 's' : ''}
              </p>
              <Button variant="outline" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Donor Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => {
            const availabilityStatus = getAvailabilityStatus(donor.available, donor.lastDonation);
            
            return (
              <Card key={donor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{donor.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {donor.bloodType}
                          </Badge>
                          {donor.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${availabilityStatus.color} text-white text-xs`}>
                      {availabilityStatus.text}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{donor.location}</span>
                      <span className="text-xs">({donor.distance})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>{donor.totalDonations} donations</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Last: {donor.lastDonation}</span>
                    </div>

                    <div className="pt-3 space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={() => handleContactDonor(donor)}
                        disabled={!donor.available}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Donor
                      </Button>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredDonors.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No donors found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search filters to find more donors.
              </p>
              <Button onClick={clearFilters}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DonorSearch;