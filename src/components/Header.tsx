import { Shield, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<any>(null);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("auth");
      if (auth) {
        setAuthState(JSON.parse(auth));
      } else {
        setAuthState(null);
      }
    };
    
    checkAuth();
    window.addEventListener("storage", checkAuth);
    
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuthState(null);
    navigate("/");
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-bold text-lg">CyberCrime Portal</h1>
            <p className="text-xs text-muted-foreground">National Complaint System</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          {authState && (
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
          )}
          {authState ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="font-medium">{authState.name}</span>
                {authState.role === "admin" && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Admin</span>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
