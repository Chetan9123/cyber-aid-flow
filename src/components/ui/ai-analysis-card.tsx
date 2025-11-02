import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AIAnalysisProps {
  analysis: {
    predictedType: string;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high';
    subCategories?: string[];
  };
}

export function AIAnalysisCard({ analysis }: AIAnalysisProps) {
  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high':
        return <ShieldAlert className="h-4 w-4 text-destructive" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'low':
        return <ShieldCheck className="h-4 w-4 text-success" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getRiskColor = (risk: string): "destructive" | "secondary" | "default" | "outline" => {
    switch (risk) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">AI Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Detected Crime Type:</span>
            <Badge>{analysis.predictedType}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Confidence Score:</span>
            <Badge variant="outline">{analysis.confidence.toFixed(1)}%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Risk Level:</span>
            <div className="flex items-center gap-2">
              {getRiskIcon(analysis.riskLevel)}
              <Badge variant={getRiskColor(analysis.riskLevel)}>
                {analysis.riskLevel.toUpperCase()}
              </Badge>
            </div>
          </div>
          {analysis.subCategories && analysis.subCategories.length > 0 && (
            <div className="mt-2">
              <span className="text-sm font-medium">Related Categories:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {analysis.subCategories.map((category, index) => (
                  <Badge key={index} variant="outline">{category}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}