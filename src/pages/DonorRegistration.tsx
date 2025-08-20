import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DonorRegistration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    
    // Medical Information
    bloodType: "",
    weight: "",
    height: "",
    medicalConditions: "",
    medications: "",
    lastDonation: "",
    
    // Address Information
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    
    // Consent
    consentTerms: false,
    consentMedicalInfo: false,
    consentCommunication: false
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!formData.consentTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    // Mock registration - in real app would integrate with backend
    console.log("Donor registration:", formData);
    
    toast({
      title: "Registration Successful!",
      description: "Thank you for registering as a blood donor. We'll contact you soon."
    });
  };

  return (
    <div className="min-h-screen bg-medical-bg py-8">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-3 rounded-full">
              <UserPlus className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Donor Registration</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our community of life-savers. Your donation can help save up to three lives.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Please provide your basic personal details</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange("gender", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
                <CardDescription>Medical details for donation eligibility</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type *</Label>
                  <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (inches)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastDonation">Last Donation Date</Label>
                  <Input
                    id="lastDonation"
                    type="date"
                    value={formData.lastDonation}
                    onChange={(e) => handleInputChange("lastDonation", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    placeholder="List any medical conditions, surgeries, or chronic illnesses"
                    value={formData.medicalConditions}
                    onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea
                    id="medications"
                    placeholder="List all medications you are currently taking"
                    value={formData.medications}
                    onChange={(e) => handleInputChange("medications", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Your current address for contact purposes</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>Person to contact in case of emergency</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Contact Name *</Label>
                  <Input
                    id="emergencyName"
                    value={formData.emergencyName}
                    onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelation">Relationship *</Label>
                  <Input
                    id="emergencyRelation"
                    placeholder="e.g., Spouse, Parent, Sibling"
                    value={formData.emergencyRelation}
                    onChange={(e) => handleInputChange("emergencyRelation", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Consent */}
            <Card>
              <CardHeader>
                <CardTitle>Consent & Agreement</CardTitle>
                <CardDescription>Please review and accept the following terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consentTerms"
                    checked={formData.consentTerms}
                    onCheckedChange={(checked) => handleCheckboxChange("consentTerms", !!checked)}
                  />
                  <Label htmlFor="consentTerms" className="text-sm">
                    I agree to the Terms and Conditions and understand the donation process *
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consentMedicalInfo"
                    checked={formData.consentMedicalInfo}
                    onCheckedChange={(checked) => handleCheckboxChange("consentMedicalInfo", !!checked)}
                  />
                  <Label htmlFor="consentMedicalInfo" className="text-sm">
                    I consent to medical screening and blood testing
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consentCommunication"
                    checked={formData.consentCommunication}
                    onCheckedChange={(checked) => handleCheckboxChange("consentCommunication", !!checked)}
                  />
                  <Label htmlFor="consentCommunication" className="text-sm">
                    I agree to receive communication about donation opportunities
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button type="submit" size="lg" className="px-8">
                <Heart className="h-4 w-4 mr-2" />
                Register as Donor
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorRegistration;