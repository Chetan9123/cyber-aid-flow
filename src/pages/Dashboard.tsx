import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, CheckCircle, XCircle, Search, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Complaint {
  id: string;
  name: string;
  crimeType: string;
  description: string;
  status: string;
  filedDate: string;
  aiGuidance?: {
    title: string;
    steps: string[];
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [authState, setAuthState] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("auth");
    if (!auth) {
      navigate("/auth");
      return;
    }
    
    const authData = JSON.parse(auth);
    setAuthState(authData);
    setIsAdmin(authData.role === "admin");

    // Load complaints from localStorage (mock database)
    const stored = localStorage.getItem("complaints");
    if (stored) {
      setComplaints(JSON.parse(stored));
    } else {
      // Add demo data
      const demoComplaints = [
        {
          id: "CC12345678",
          name: "Demo User",
          crimeType: "Financial Fraud (UPI/Banking)",
          description: "Unauthorized UPI transaction from my account",
          status: "Investigating",
          filedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          aiGuidance: {
            title: "Immediate Safety Measures",
            steps: [
              "✓ Contact your bank immediately",
              "✓ Block your cards and UPI",
              "✓ File FIR at local police station",
            ],
          },
        },
        {
          id: "CC87654321",
          name: "Demo User",
          crimeType: "Social Media Crime",
          description: "Fake profile using my photos",
          status: "Pending",
          filedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      setComplaints(demoComplaints);
      localStorage.setItem("complaints", JSON.stringify(demoComplaints));
    }
  }, [navigate]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "investigating":
        return <FileText className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "closed":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "outline" => {
    switch (status.toLowerCase()) {
      case "pending":
        return "secondary";
      case "investigating":
        return "default";
      case "resolved":
        return "outline";
      default:
        return "secondary";
    }
  };

  const filteredComplaints = complaints.filter(
    (c) =>
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.crimeType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      title: "Total Complaints",
      value: complaints.length,
      icon: FileText,
      description: "All complaints filed",
    },
    {
      title: "Pending",
      value: complaints.filter((c) => c.status === "Pending").length,
      icon: Clock,
      description: "Awaiting review",
    },
    {
      title: "Under Investigation",
      value: complaints.filter((c) => c.status === "Investigating").length,
      icon: FileText,
      description: "Active cases",
    },
  ];

  if (!authState) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4 bg-gradient-secure">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Complaint Dashboard</h1>
            <p className="text-muted-foreground">
              {isAdmin ? "View and manage all cybercrime complaints" : "Track your cybercrime complaints"}
            </p>
          </div>

          {!isAdmin && (
            <Card className="border-primary/20 bg-primary/5 mb-6">
              <CardContent className="flex items-center gap-3 py-4">
                <Lock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Limited Access</p>
                  <p className="text-xs text-muted-foreground">
                    Full complaint details are only visible to administrators
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <Card key={idx}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by complaint ID or crime type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Complaints List */}
          <div className="space-y-4">
            {filteredComplaints.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Complaints Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try adjusting your search" : "You haven't filed any complaints yet"}
                  </p>
                  <Button onClick={() => (window.location.href = "/file-complaint")}>File a Complaint</Button>
                </CardContent>
              </Card>
            ) : (
              filteredComplaints.map((complaint) => (
                <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">
                          {isAdmin ? complaint.crimeType : "Complaint #" + complaint.id.slice(2, 10)}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span className="font-mono">{complaint.id}</span>
                          <span>•</span>
                          <span>{new Date(complaint.filedDate).toLocaleDateString()}</span>
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusVariant(complaint.status)} className="flex items-center gap-1">
                        {getStatusIcon(complaint.status)}
                        {complaint.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  {isAdmin && (
                    <CardContent>
                      <p className="text-sm mb-4 line-clamp-2">{complaint.description}</p>

                      {complaint.aiGuidance && (
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mt-4">
                          <h4 className="font-semibold text-sm mb-2 text-primary">{complaint.aiGuidance.title}</h4>
                          <ul className="text-sm space-y-1">
                            {complaint.aiGuidance.steps.slice(0, 3).map((step, idx) => (
                              <li key={idx} className="text-muted-foreground">
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="ghost">
                          Download Report
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
