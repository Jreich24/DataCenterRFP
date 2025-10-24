export interface BaseItem {
    id: string;
    title: string;
    content: string;
    link: string;
}

export type NewsItem = BaseItem & {
    source: string;
    publishedAt: Date;
    analysis?: string;
    metrics?: {
        powerCapacity?: number;
        investment?: number;
        squareFootage?: number;
        completionDate?: string;
        renewablePercentage?: number;
    };
    category?: {
        type: 'expansion' | 'acquisition' | 'sustainability' | 'technology';
        powerMarket: string;
        impact: 'high' | 'medium' | 'low';
        timeline: 'immediate' | 'short-term' | 'long-term';
        segment: 'hyperscale' | 'colocation' | 'enterprise';
    };
};

export type RFPItem = BaseItem & {
    organization: string;
    description: string;
    dueDate: Date;
    location: string;
    type: string;
    requirements?: {
        powerRequirements: {
            capacity: number;
            redundancy: string;
            reliability: string;
        };
        sustainability: {
            pueTarget: number;
            renewableRequirement: number;
            certifications: string[];
        };
        timeline: {
            submissions: string;
            expectedAward: string;
            completion: string;
        };
        technical: {
            cooling: string;
            connectivity: string;
            security: string;
        };
    };
    marketAnalysis?: {
        competitiveness: 'high' | 'medium' | 'low';
        complexityLevel: 'high' | 'medium' | 'low';
        marketAlignment: 'above' | 'at' | 'below market';
        keyRisks: string[];
        opportunities: string[];
    };
};

// Aliases for backward compatibility
export type News = NewsItem;
export type RFP = RFPItem;

export interface PerplexityAnalysis {
    analysis: string;
    confidence: number;
    sources?: string[];
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
    status: number;
}

export interface UsageStats {
    queries: number;
    cost: number;
    remaining: number;
    nextReset: Date;
}