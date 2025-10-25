import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, AlertCircle, Upload, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FileComplaint = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    crimeType: "",
    incidentDate: "",
    location: "",
    description: "",
    evidenceFiles: [] as File[],
  });

  const crimeTypes = [
    "Financial Fraud (UPI/Banking)",
    "Social Media Crime",
    "Identity Theft",
    "Cyberbullying/Harassment",
    "Data Breach",
    "Ransomware Attack",
    "Online Shopping Fraud",
    "Phishing/Scam Emails",
    "Other",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, evidenceFiles: Array.from(e.target.files) });
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all personal details",
          variant: "destructive",
        });
        return;
      }
    }
    if (step === 2) {
      if (!formData.crimeType || !formData.description) {
        toast({
          title: "Missing Information",
          description: "Please provide crime type and description",
          variant: "destructive",
        });
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = () => {
    // Mock AI guidance based on crime type
    const aiGuidance = {
      title: "Immediate Safety Measures",
      steps: [
        "✓ Do not engage further with the suspect",
        "✓ Preserve all evidence (screenshots, messages, transaction IDs)",
        "✓ Block the suspect's contact information",
        "✓ Report to your bank/payment provider immediately",
        "✓ Change all related passwords",
      ],
      estimatedTime: "Investigation typically takes 7-14 days",
      complaintId: `CC${Date.now().toString().slice(-8)}`,
    };

    toast({
      title: "Complaint Filed Successfully!",
      description: `Your complaint ID: ${aiGuidance.complaintId}`,
    });

    // Store in localStorage as mock database
    const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    complaints.push({
      ...formData,
      id: aiGuidance.complaintId,
      status: "Pending",
      filedDate: new Date().toISOString(),
      aiGuidance,
    });
    localStorage.setItem("complaints", JSON.stringify(complaints));

    setStep(4);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4 bg-gradient-secure">
        <div className="container mx-auto max-w-3xl">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`flex-1 h-1 mx-2 ${step > s ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Personal Details</span>
              <span>Incident Details</span>
              <span>Evidence & Submit</span>
            </div>
          </div>

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your information is kept confidential and secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <Button onClick={handleNext} className="w-full">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Incident Details */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Incident Details
                </CardTitle>
                <CardDescription>Provide as much detail as possible about the incident</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="crimeType">Type of Crime *</Label>
                  <Select value={formData.crimeType} onValueChange={(value) => handleInputChange("crimeType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crime type" />
                    </SelectTrigger>
                    <SelectContent>
                      {crimeTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="incidentDate">Date of Incident</Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => handleInputChange("incidentDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location (City/State)</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe what happened in detail..."
                    rows={6}
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleNext} className="flex-1">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Evidence Upload */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Evidence
                </CardTitle>
                <CardDescription>
                  Upload screenshots, documents, or any evidence related to the incident
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="evidence">Evidence Files (Optional)</Label>
                  <Input
                    id="evidence"
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: Images, PDF, Word documents (Max 10MB each)
                  </p>
                  {formData.evidenceFiles.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">Selected Files:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {formData.evidenceFiles.map((file, idx) => (
                          <li key={idx}>• {file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    Before You Submit
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Double-check all information is accurate</li>
                    <li>✓ Ensure you've provided detailed description</li>
                    <li>✓ Upload relevant evidence if available</li>
                    <li>✓ Keep all original evidence safe</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1">
                    Submit Complaint
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Success with AI Guidance */}
          {step === 4 && (
            <Card className="border-primary">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Complaint Filed Successfully!</CardTitle>
                <CardDescription>
                  Your complaint ID: <span className="font-mono font-bold">CC{Date.now().toString().slice(-8)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    AI-Powered Immediate Safety Measures
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Do not engage further with the suspect</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Preserve all evidence (screenshots, messages, transaction IDs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Block the suspect's contact information immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Report to your bank/payment provider if financial loss occurred</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Change all related passwords and enable 2FA</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Estimated Investigation Time:</strong> 7-14 days
                  </p>
                  <p className="text-sm mt-2">
                    You will receive updates via email and can track your complaint in the dashboard.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => navigate("/dashboard")} className="flex-1">
                    Go to Dashboard
                  </Button>
                  <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FileComplaint;
