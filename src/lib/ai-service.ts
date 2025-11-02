// AI model for cybercrime classification
// You can replace this with your actual AI model API integration

interface PredictionResult {
  predictedType: string;
  confidence: number;
  subCategories?: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

// This is a mock implementation - replace with your actual AI model API call
export async function predictCrimeType(description: string): Promise<PredictionResult> {
  // Mock AI classification logic
  const crimeTypes = [
    "Financial Fraud (UPI/Banking)",
    "Social Media Crime",
    "Identity Theft",
    "Cyberbullying/Harassment",
    "Data Breach",
    "Ransomware Attack",
    "Online Shopping Fraud",
    "Phishing/Scam Emails",
  ];

  // Simple keyword-based classification (replace with actual AI model)
  const keywords = {
    "Financial Fraud (UPI/Banking)": ["upi", "bank", "account", "transaction", "money", "payment"],
    "Social Media Crime": ["social", "media", "profile", "facebook", "instagram", "twitter"],
    "Identity Theft": ["identity", "personal", "documents", "card", "stolen"],
    "Cyberbullying/Harassment": ["harass", "bully", "threat", "message", "stalking"],
    "Data Breach": ["breach", "hack", "data", "leaked", "exposed"],
    "Ransomware Attack": ["ransom", "encrypt", "locked", "files", "bitcoin"],
    "Online Shopping Fraud": ["shopping", "order", "product", "delivery", "fake"],
    "Phishing/Scam Emails": ["email", "phishing", "scam", "link", "password"],
  };

  const descLower = description.toLowerCase();
  let maxMatches = 0;
  let predictedType = "Other";
  
  // Count keyword matches for each crime type
  Object.entries(keywords).forEach(([type, typeKeywords]) => {
    const matches = typeKeywords.filter(keyword => descLower.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      predictedType = type;
    }
  });

  // Mock confidence score based on keyword matches
  const confidence = Math.min((maxMatches / 3) * 100, 95);
  
  // Mock risk level based on confidence and keywords
  let riskLevel: 'low' | 'medium' | 'high' = 'medium';
  if (confidence > 80) riskLevel = 'high';
  if (confidence < 40) riskLevel = 'low';

  return {
    predictedType,
    confidence,
    riskLevel,
    subCategories: [], // Add relevant subcategories based on your AI model's capabilities
  };
}