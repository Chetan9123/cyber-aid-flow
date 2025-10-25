import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold">CyberCrime Portal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Protecting citizens from cybercrime through rapid response and expert guidance.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Emergency Helpline: 1930</li>
              <li>Email: cybercrime@gov.in</li>
              <li>24/7 Support Available</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Cybersecurity Tips</li>
              <li>Report Fraud</li>
              <li>Legal Framework</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 National CyberCrime Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
