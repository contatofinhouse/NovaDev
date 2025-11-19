export enum ServiceType {
  LANDING = 'Landing Page',
  CMS = 'CMS Integration',
  SAAS = 'SaaS Application'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isError?: boolean;
}

export interface ProjectBrief {
  title: string;
  summary: string;
  techStack: string[];
  estimatedTimeline: string;
  estimatedBudgetRange: string;
}
